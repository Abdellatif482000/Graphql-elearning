import "reflect-metadata";
import { injectable, inject } from "inversify";
import { UserService } from "./serviceClass.js";
import { UserContainer } from "./inversify.config.js";
import { log } from "console";

import prismaPkg from "@prisma/client";
const { PrismaClient } = prismaPkg;

const prisma = new PrismaClient();

@injectable()
export class UserResolver {
  public userService: UserService;

  constructor(@inject(UserService) userService: UserService) {
    if (!userService) {
      throw new Error("UserService is not injected");
    }
    this.userService = userService;
  }

  async signup(payload: any): Promise<any> {
    const hashedPass = await this.userService.hashPass(payload.password);
    // ----------- user Reisteration ---------------

    const saveUserModel = await prisma.user.create({
      data: {
        // userID: userModel.userID,
        email: payload.email,
        username: payload.username,
        password: hashedPass,
        role: payload.role,
      },
    });

    return saveUserModel;
  }

  async signin(role: string, payload: any): Promise<any> {
    const foundUser = await prisma.user.findFirst({
      where: {
        email: payload.email,
      },
    });

    const hashedPass: string = foundUser?.password as string;
    const plainPass = payload.password;

    const isPasswordMatch = await this.userService.checkPass(
      plainPass,
      hashedPass
    );

    if (isPasswordMatch) {
      const token = await this.userService.generateToken({
        username: foundUser?.username,
        role: role,
      });

      return { token: token };
    }
  }
}
