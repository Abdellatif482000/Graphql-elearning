export interface createdCourse {
  courseID: string;
  instructorID: string;
  courseTitle: string;
  description: string;
  category: string;
  createdAt: string;
  paragraphs: [paragraph];
}

export interface paragraph {
  paragID: string;
  title: string;
  content: string;
  image: string;
}

export enum Role {
  STUDENT = "STUDENT",
  ADMIN = "ADMIN",
  INSTRUCTOR = "INSTRUCTOR",
}

export interface decodedToken {
  userID: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}
