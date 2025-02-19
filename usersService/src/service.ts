import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { log } from "console";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export class AuthService {
  async register(userData: any): Promise<any> {
    // ----------- hashing Pass ---------------
    const salt = await bcrypt.genSalt(10);
    const hashedPass: string = await bcrypt.hash(
      userData.password as string,
      salt
    );

    // ----------- user Reisteration ---------------

    if (userData.role === "user") {
      return {
        userID: uuidv4(),
        email: userData.email,
        username: userData.username,
        role: userData.role,
        password: hashedPass,
      };
    }

    // ----------- admin Reisteration ---------------
    if (userData.role === "admin") {
      return {
        email: userData.email,
        username: userData.usernamme,
        role: userData.role,
        password: hashedPass,
      };
    }
  }
  // async signin(
  //   req: Request,
  //   res: Response,
  //   role: string,
  //   userData: signinInterface
  // ) {
  //   let foundUser: any;
  //   //  --------- get user data from db --------
  //   if (role === "user") {
  //     foundUser = await customerModel.findOne({ email: userData.email });
  //   }
  //   if (role === "admin") {
  //     foundUser = await adminModel.findOne({ email: userData.email });
  //   }
  //   console.log(foundUser);
  //   // ------ check password -------------
  //   let isPasswordMatch = await bcrypt.compare(
  //     userData.password,
  //     foundUser.password
  //   );

  //   // ------- generate token and init session --------
  //   if (isPasswordMatch) {
  //     const token = await AuthHelper.generateToken({
  //       userID: foundUser.id,
  //       userRole: role,
  //     });
  //     await AuthHelper.setCookiesAndSession(req, res, token, foundUser, role);
  //     return {
  //       message: "Sign in successfully",
  //       data: {
  //         email: foundUser.email,
  //         fullname: foundUser.fullName,
  //         token: token,
  //       },
  //     };
  //   } else {
  //     return { message: "password not match" };
  //   }
  // }

  // async generateToken(jwtPayload: object): Promise<string> {
  //   if (!process.env.JWT_SECRET) {
  //     throw new Error("JWT_SECRET is not defined in the configuration.");
  //   }
  //   console.log("tokenSK", process.env.JWT_SECRET);
  //   let token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
  //     expiresIn: "1h",
  //   });
  //   return token;
  // }

  // async verifyToken(token: string) {
  //   if (!token) return "Token not found";

  //   const decodedHeader = jwt.decode(token, { complete: true });

  //   const key = await jwks.getSigningKey(decodedHeader?.header.kid);
  //   const publicKey = key.getPublicKey();

  //   jwt.verify(token, publicKey, (err, decoded) => {
  //     if (err) {
  //       console.error("Token verification failed:", err);
  //     } else {
  //       console.log("Token verified successfully:", decoded);
  //     }
  //   });
  // }
}
