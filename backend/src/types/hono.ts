import { PrismaClient } from "@prisma/client";


//LEARN ABOUT THESE TYPES : https://projects.100xdevs.com/tracks/blog/blog-8

export type AppBindings = {
  DATABASE_URL: string;
  Jwt_Secret: string;
};

export type AppVariables = {
  prisma: PrismaClient;
  userId : string
};

export type AppEnv = {
  Bindings: AppBindings;
  Variables: AppVariables;
};


export type blogBody = {
  title : string
  content : string
  published : boolean
}