import { ProductDao } from "../app/product/product.dao";
import { UserDao } from "../app/users/user.dao";

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
}
