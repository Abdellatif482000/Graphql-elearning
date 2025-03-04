import "reflect-metadata";
import { Container } from "inversify";
import { AchievmentService } from "./serviceClass.js";
import { AchievmentResolver } from "./resolverClass.js";
import { log } from "console";

const AchievmentContainer = new Container();
AchievmentContainer.bind<AchievmentService>(AchievmentService).toSelf();
AchievmentContainer.bind<AchievmentResolver>(AchievmentResolver).toSelf();

export { AchievmentContainer };
