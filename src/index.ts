import { Application, Documentation } from "@smoke-trees/postgres-backend";
import database from "./database";
import settings from "./settings";
import swaggerUiExpress from "swagger-ui-express";
import cors from "cors";
import { json } from "express";
import { AddressDao } from "./app/address/Address.dao";
import { AddressService } from "./app/address/Address.service";
import { AddressController } from "./app/address/Address.controller";
import { UserDao } from "./app/users/user.dao";
import { UserService } from "./app/users/user.service";
import { UserController } from "./app/users/user.controller";
import { CategoryTagsDao } from "./app/categoryTags/categoryTags.dao";
import { CategoryTagsService } from "./app/categoryTags/categoryTags.service";
import { CategoryTagsController } from "./app/categoryTags/categoryTags.controller";

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

app.addMiddleWare(cors());
app.addMiddleWare(json());

app.addController(userController);
app.addController(addressController);
app.addController(categoryTagsController);

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
