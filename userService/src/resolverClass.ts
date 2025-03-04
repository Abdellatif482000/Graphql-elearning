import "reflect-metadata";
import { injectable, inject } from "inversify";
import { UserHelper } from "./helper.js";
import { UserContainer } from "./inversify.config.js";
import { log } from "console";
import { Role } from "types.js";
import prismaPkg from "@prisma/client";
import { Token } from "graphql";
const { PrismaClient } = prismaPkg;

const prisma = new PrismaClient();

@injectable()
export class UserResolver {
  public userHelper: UserHelper;

  constructor(@inject(UserHelper) userHelper: UserHelper) {
    if (!userHelper) {
      throw new Error("UserHelper is not injected");
    }
    this.userHelper = userHelper;
  }

  async registerUser(role: Role, payload: any): Promise<any> {
    const hashedPass = await this.userHelper.hashPass(payload.password);
    // ----------- user Reisteration ---------------

    const saveUserModel = await prisma.user.create({
      data: {
        userID: payload.userID,
        email: payload.email,
        username: payload.username,
        password: hashedPass,
        createdAt: new Date().toISOString(),
        role,
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

    const isPasswordMatch = await this.userHelper.checkPass(
      plainPass,
      hashedPass
    );

    if (isPasswordMatch) {
      const token = await this.userHelper.generateToken({
        userID: foundUser?.userID,
        username: foundUser?.username,
        role: role,
      });

      return {
        token: token,
        userData: {
          userID: foundUser?.userID,
          username: foundUser?.username,
          email: foundUser?.email,
          role: foundUser?.role,
          createdAt: foundUser?.createdAt,
        },
      };
    }
  }

  async userByIDForAdmin(token: string, targetUserID: string) {
    const verifyToken: any = await this.userHelper.verifyToken(token);
    if (verifyToken) {
      // check role
      if (verifyToken.role === "admin") {
        const targetUser = await prisma.user.findFirst({
          where: { userID: targetUserID },
        });
        return targetUser;
      }
    }
  }

  async usersListForAdmin(token: string) {
    const verifyToken: any = await this.userHelper.verifyToken(token);
    if (verifyToken) {
      // check role
      if (verifyToken.role === "admin") {
        const usersList = await prisma.user.findMany();
        return usersList;
      }
    }
  }
}
