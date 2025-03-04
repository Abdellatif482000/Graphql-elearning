export interface signupInterface {
  email: string;
  username: string;
  password: string;
  role: string;
}

export interface signinInterface {
  email: string;
  password: string;
}

export interface userSessionData {
  id: number;
  username: string;
  email: string;
  role: "admin" | "customer";
}

export interface ScoreCreateInput {}

export enum Role {
  STUDENT = "STUDENT",
  ADMIN = "ADMIN",
  INSTRUCTOR = "INSTRUCTOR",
}
