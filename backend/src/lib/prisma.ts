import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import "dotenv/config";
import type { Context, Next } from "hono";


//intializing a middlerwaare using a middleware 




function withPrisma(c: Context, next: Next) {
//   if (!c.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL is not set");
// }

    const prisma = new PrismaClient({
  accelerateUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

  if (!c.get("prisma")) {
    c.set("prisma", prisma);
  }
  return next();
}

export default withPrisma;










