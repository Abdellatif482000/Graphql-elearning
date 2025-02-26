import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { log } from "console";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { signinInterface, signupInterface } from "./types.js";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class UserService {
  async hashPass(userPass: string) {
    // ----------- hashing Pass ---------------
    const salt = await bcrypt.genSalt(10);
    const hashedPass: string = await bcrypt.hash(userPass as string, salt);
    return hashedPass;
  }

  async checkPass(plainPass: string, hashedPass: string) {
    let isPasswordMatch = await bcrypt.compare(plainPass, hashedPass);
    return isPasswordMatch;
  }

  async generateToken(jwtPayload: object): Promise<string> {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in the configuration.");
    }
    // console.log("tokenSK", process.env.JWT_SECRET);
    let token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  }

  async verifyToken(token: string) {
    try {
      if (!token) return "Token not found";

      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      if (decode) {
        return decode;
      }
    } catch (err) {
      throw new Error("Not Verified");
    }
  }
}
