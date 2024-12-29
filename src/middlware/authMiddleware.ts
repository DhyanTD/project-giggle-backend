import { NextFunction, Request, Response } from "express";
import { ProductDao } from "../app/product/product.dao";
import { UserDao } from "../app/users/user.dao";
import { ErrorCode, log, Result } from "@smoke-trees/postgres-backend";
import { ContextProvider } from "@smoke-trees/smoke-context";
import { UserType } from "../app/users/IUser";
import settings from "../settings";
import jwt from 'jsonwebtoken'
import { ParsedQs } from "qs"

export class AuthMiddleware {
  userDao: UserDao;
  productDao: ProductDao;
  constructor(
    userDao: UserDao,
    productDao: ProductDao
  ) {
    this.userDao = userDao;
    this.productDao = productDao
  }


  generateAuthMiddleware({
    adminOnly = false,
    contextOnly = false,
    userIdLoc,
  }: {
    adminOnly?: boolean;
    userIdLoc?: (req: Request) => string | ParsedQs | string[] | ParsedQs[] | undefined;
    contextOnly?: boolean;
  }) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {

        const token = req.get("Authorization")?.split(" ")[1];

        if (!token) {
          const result = new Result(
            true,
            ErrorCode.NotAuthorized,
            "Not Authorized"
          );
          res.status(result.getStatus()).json(result);
          return;
        }
        const tokenDecode = jwt.verify(token, settings.jwtSecret, {
          algorithms: ["HS256"],
        }) as { id: string };
        const user = await this.userDao.read(tokenDecode.id);
        if (user.status.error || !user.result) {
          const result = new Result(
            true,
            ErrorCode.NotAuthorized,
            "Not Authorized"
          );
          res.status(result.getStatus()).json(result);
          return;
        }
        ContextProvider.setContext({
          values: user?.result,
        });
        if (contextOnly) {
          next();
          return;
        }

        if (user.result.type === UserType.admin) {
          next();
          return;
        }
        if (adminOnly) {
          const result = new Result(
            true,
            ErrorCode.NotAuthorized,
            "Not Authorized"
          );
          res.status(result.getStatus()).json(result);
          return;
        }

        if (userIdLoc) {
          const userId = userIdLoc(req);
          if (!userId) {
            const result = new Result(
              true,
              ErrorCode.NotAuthorized,
              "Not Authorized"
            );
            res.status(result.getStatus()).json(result);
            return;
          }
          if (userId !== tokenDecode.id) {
            const result = new Result(
              true,
              ErrorCode.NotAuthorized,
              "Not Authorized"
            );
            res.status(result.getStatus()).json(result);
            return;
          }
        }

        next();
        return;
      } catch (e) {
        log.error("Error in middleware", "generateAuthMiddleware", e);
        const result = new Result(
          true,
          ErrorCode.NotAuthorized,
          "Not Authorized"
        );
        res.status(result.getStatus()).json(result);
        return;
      }
    };
  }

}
