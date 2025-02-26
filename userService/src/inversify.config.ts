import "reflect-metadata";
import { Container } from "inversify";
import { UserService } from "./serviceClass.js";
import { UserResolver } from "./resolverClass.js";
import { log } from "console";

const UserContainer = new Container();
UserContainer.bind<UserService>(UserService).toSelf();
UserContainer.bind<UserResolver>(UserResolver).toSelf();

export { UserContainer };
