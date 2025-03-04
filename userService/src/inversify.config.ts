import "reflect-metadata";
import { Container } from "inversify";
import { UserHelper } from "./helper.js";
import { UserResolver } from "./resolverClass.js";
import { log } from "console";

const UserContainer = new Container();
UserContainer.bind<UserHelper>(UserHelper).toSelf();
UserContainer.bind<UserResolver>(UserResolver).toSelf();

export { UserContainer };
