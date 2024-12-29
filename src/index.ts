import { Application, Documentation, morgan } from "@smoke-trees/postgres-backend";
import database from "./database";
import settings from "./settings";
import swaggerUiExpress from "swagger-ui-express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { AddressDao } from "./app/address/Address.dao";
import { AddressService } from "./app/address/Address.service";
import { AddressController } from "./app/address/Address.controller";
import { UserDao } from "./app/users/user.dao";
import { UserService } from "./app/users/user.service";
import { UserController } from "./app/users/user.controller";
import { CategoryTagsDao } from "./app/categoryTags/categoryTags.dao";
import { CategoryTagsService } from "./app/categoryTags/categoryTags.service";
import { CategoryTagsController } from "./app/categoryTags/categoryTags.controller";
import { OrdersDao } from "./app/orders/orders.dao";
import { OrdersService } from "./app/orders/orders.service";
import { OrdersController } from "./app/orders/orders.controller";
import { ContextProvider } from "@smoke-trees/smoke-context";
import { Request } from "express";
import bodyParser from "body-parser";
import { AuthMiddleware } from "./middlware/authMiddleware";
import { ProductDao } from "./app/product/product.dao";
import { ProductService } from "./app/product/product.service";
import { ProductController } from "./app/product/product.controller";

const app = new Application(settings, database);

const userDao = new UserDao(database);
const userService = new UserService(userDao);
const userController = new UserController(app, userService);

const addressDao = new AddressDao(database);
const addressService = new AddressService(addressDao);
const addressController = new AddressController(app, addressService);

const categoryTagsDao = new CategoryTagsDao(database);
const categoryTagsService = new CategoryTagsService(categoryTagsDao);
const categoryTagsController = new CategoryTagsController(app, categoryTagsService);

const productDao = new ProductDao(database);
const productService = new ProductService(productDao);
const productController = new ProductController(app, productService);


const authMiddleware = new AuthMiddleware(userDao, productDao);


const ordersDao = new OrdersDao(database);
const ordersService = new OrdersService(ordersDao, productDao);
const ordersController = new OrdersController(app, ordersService, authMiddleware);



app.addMiddleWare(cors());
app.addMiddleWare(morgan);

app.addController(userController);
app.addController(addressController);
app.addController(categoryTagsController);
app.addController(ordersController);
app.addController(productController);

app.addMiddleWare((req: Request, res, next) => {
  if (req.originalUrl === "/order/stripeWebhook") {
    bodyParser.text({ type: "application/json" })(req, res, next);
  } else {
    bodyParser.json()(req, res, next);
  }
});

app.addMiddleWare(
  ContextProvider.getMiddleware({
    extractKeyValuePairs: (req?: Request) => {
      if (!req) return {};
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return {};
      const claims = jwt.decode(token);
      if (!claims || typeof claims === "string") return {};
      const values = { token, ...claims } as any;
      return values;
    },
  })
);

Documentation.addServers([
  {
    url: "http://localhost:8080",
    description: "Local server",
  },
]);

Documentation.addTags([
  {
    name: "User",
    description: "User related endpoints",
  },
]);

Documentation.addInfo({
  title: "Postgres Backend Template",
  description: "This is a template for a postgres backend",
  version: "1.0.0",
});

//console.log(JSON.stringify(Documentation.getAPIJson()))
//

app
  .getApp()
  .use(
    "/docs",
    swaggerUiExpress.serveWithOptions({ cacheControl: true, maxAge: 64800 })
  );
app.getApp().get("/docs", swaggerUiExpress.setup(Documentation.getAPIJson()));

app.loadMiddleware();
app.loadControllers();

database.connect();

app.run();
