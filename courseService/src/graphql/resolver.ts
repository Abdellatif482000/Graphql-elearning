import { CourseResolver } from "../resolverClass.js";
import { log } from "console";
import { CourseContainer } from "../inversify.config.js";

const resolverClass = CourseContainer.get(CourseResolver);

const resolvers = {
  User: {
    enrollments: async () => await resolverClass.userEnrollments(),
  },
  Query: {
    courses: async (_: any, args: any, context: any) =>
      await resolverClass.courses(),
    coursesByCategory: async (_: any, args: any, context: any) =>
      await resolverClass.coursesByCategory(),
    coursesByInstructor: async (_: any, args: any, context: any) =>
      await resolverClass.coursesByInstructor(),
    courseById: async (_: any, args: any, context: any) =>
      await resolverClass.courseById(),

    enrollmentsByCourse: async (_: any, args: any, context: any) =>
      await resolverClass.enrollmentsByCourse(),
  },

  Mutation: {
    enrollCourse: async (_: any, args: any, context: any) =>
      resolverClass.enrollCourse(),
    createCourse: async (_: any, args: any, context: any) =>
      resolverClass.createCourse(context.token, args),
    updateCourseDetailes: async (_: any, args: any, context: any) =>
      resolverClass.updateCourseDetailes(
        context.token,

        args.courseDetails
      ),

    updateParagraph: async (_: any, args: any, context: any) =>
      resolverClass.updateParagraph(
        context.token,

        args.paragraph
      ),
    deleteCourse: async (_: any, args: any, context: any) =>
      resolverClass.deleteCourse(context.token, args.courseID),
  },
};

export default resolvers;
