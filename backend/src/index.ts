import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { authRoutes } from './routes/authRoutes';
import { blogRoutes } from './routes/blogRoutes';
import withPrisma from './lib/prisma';
import { AppEnv } from './types/hono';



const app = new Hono<AppEnv>().basePath("/hono/api");
app.use("*",cors());
app.use("*",withPrisma);


app.route("/",authRoutes);
app.route("/",blogRoutes);

export default app;
