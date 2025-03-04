import "reflect-metadata";
import { CourseHelper } from "./helper.js";
import prismaPkg from "@prisma/client";
import { inject, injectable } from "inversify";
import { error, log } from "console";
const { PrismaClient } = prismaPkg;
import { createdCourse, decodedToken } from "./types.js";
import e from "express";
import { includes } from "lodash";
import { JwtPayload } from "jsonwebtoken";
const prisma = new PrismaClient();

@injectable()
export class CourseResolver {
  public courseHelper: CourseHelper;

  constructor(@inject(CourseHelper) courseHelper: CourseHelper) {
    if (!courseHelper) {
      throw new Error("CourseHelper is not injected");
    }
    this.courseHelper = courseHelper;
  }

  async courses() {}
  async enrollments() {}
  async coursesByCategory() {}
  async coursesByInstructor() {}
  async courseById() {}

  async userEnrollments() {}
  async enrollmentsByCourse() {}

  async enrollCourse() {}
  async createCourse(token: string, courseData: any) {
    const verifyToken: any = await this.courseHelper.verifyToken(token);
    if (verifyToken.role === "ADMIN" || verifyToken?.role === "INSTRUCTOR") {
      // Check empty values

      const checkCourseDetailsValues =
        await this.courseHelper.checkCourseDetailsValues(
          courseData.courseDetails
        );
      const checkParagraphsValues =
        await this.courseHelper.checkParagraphsValues(courseData.paragraphs);

      if (checkParagraphsValues && checkCourseDetailsValues) {
        try {
          const saveCourse = await prisma.course.create({
            data: {
              courseID: courseData.courseDetails.courseID,
              instructorID: courseData.courseDetails.instructorID,
              courseTitle: courseData.courseDetails.courseTitle,
              description: courseData.courseDetails.description,
              category: courseData.courseDetails.category,
              // createdAt: "",
              createdAt: new Date().toISOString(),
              paragraphs: {
                create: courseData.paragraphs.map((parag: any) => ({
                  paragID: parag.paragID,
                  title: parag.title,
                  content: parag.content,
                  image: parag.image,
                })),
              },
            },
            include: { paragraphs: true },
          });
          return saveCourse;
        } catch (err: any) {
          throw new Error(err);
        }
      }
    }
  }
  async updateCourseDetailes(
    token: string,

    updatedDetails: any
  ) {
    const verifyToken: any = await this.courseHelper.verifyToken(token);
    const updatedFields = await this.courseHelper.findUpdatedFields(
      updatedDetails
    );

    if (verifyToken?.role === "ADMIN" || verifyToken?.role === "INSTRUCTOR") {
      if (updatedDetails.courseID) {
        const foundCourse = await prisma.course.update({
          where: { courseID: updatedDetails.courseID },
          data: updatedFields,
        });
        return foundCourse;
      }
    }
  }
  async updateParagraph(
    token: string,

    updatedParagraph: any
  ) {
    const verifyToken: any = await this.courseHelper.verifyToken(token);
    const updatedFields = await this.courseHelper.findUpdatedFields(
      updatedParagraph
    );
    if (verifyToken?.role === "ADMIN" || verifyToken?.role === "INSTRUCTOR") {
      if (updatedParagraph.paragID) {
        // log(updatedFields);
        const foundCourse = await prisma.paragraph.update({
          where: { paragID: updatedParagraph.paragID },
          data: updatedFields,
        });
        return foundCourse;
      }
    }
  }
  async deleteCourse(token: string, courseID: string) {
    const verifyToken: any = await this.courseHelper.verifyToken(token);

    if (verifyToken?.role === "ADMIN" || verifyToken?.role === "INSTRUCTOR") {
      try {
        const deleteCourse = await prisma.course.delete({
          where: { courseID: courseID },
        });
        log(deleteCourse);
        return `course ${courseID} deleted`;
      } catch (error: any) {
        throw new Error(`Course ${courseID} not found`);
      }
    }
  }
}
