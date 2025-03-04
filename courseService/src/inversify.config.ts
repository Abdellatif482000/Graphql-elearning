import "reflect-metadata";
import { Container } from "inversify";
import { CourseHelper } from "./helper.js";
import { CourseResolver } from "./resolverClass.js";
import { log } from "console";

const CourseContainer = new Container();
CourseContainer.bind<CourseHelper>(CourseHelper).toSelf();
CourseContainer.bind<CourseResolver>(CourseResolver).toSelf();

export { CourseContainer };
