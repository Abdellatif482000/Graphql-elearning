import "reflect-metadata";
import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { log, dir } from "console";
import { decodedToken } from "types";
dotenv.config();

@injectable()
export class CourseHelper {
  async verifyToken(token: string) {
    try {
      if (!token) return "Token not found";
      //
      const decode: any = jwt.verify(token, process.env.JWT_SECRET as string);
      if (decode) {
        return decode;
      }
    } catch (err) {
      throw new Error("Not Verified");
    }
  }

  async checkCourseDetailsValues(courseDetails: any) {
    let courseDetailsValues = false;

    Object.keys(courseDetails).forEach((key: any) => {
      if (!courseDetails[key]) {
        // log(key);
        throw new Error(`Key: ${key}, Value:'${courseDetails[key]}' `);
      } else {
        courseDetailsValues = true;
      }
    });
    return courseDetailsValues;
  }
  async checkParagraphsValues(paragraphs: any) {
    let paragraphsValues = false;
    //
    for (let p in paragraphs) {
      Object.keys(paragraphs[p]).forEach((key: any) => {
        if (!paragraphs[p][key]) {
          throw new Error(
            `parag num: ${p} Key: ${key}, Value:'${paragraphs[p][key]}' `
          );
        } else {
          paragraphsValues = true;
        }
      });
      return paragraphsValues;
    }
  }

  async findUpdatedFields(updatedData: any) {
    return Object.keys(updatedData).reduce((notEmptyFields: any, key: any) => {
      if (updatedData[key]) {
        notEmptyFields[key] = updatedData[key];
      }
      return notEmptyFields;
    }, {});
  }
}
