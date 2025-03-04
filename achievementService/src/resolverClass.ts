import { injectable, inject } from "inversify";
import { AchievmentService } from "./serviceClass.js";

import prismaPkg from "@prisma/client";
import { log } from "console";
const { PrismaClient } = prismaPkg;

const prisma = new PrismaClient();

@injectable()
export class AchievmentResolver {
  public achievmentService: AchievmentService;

  constructor(@inject(AchievmentService) achievmentService: AchievmentService) {
    if (!achievmentService) {
      throw new Error("AchievmentService is not injected");
    }
    this.achievmentService = achievmentService;
  }
}
