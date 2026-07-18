import { Hono } from "hono";
import { AppEnv } from "../types/hono";
import { verify, sign } from "hono/jwt";
import { signinInput, signupInput } from "@adityaworkspace24/medium-common";

type SignupProps = {
  name?: string;
  email: string;
  password: string;
};

const authRoutes = new Hono<AppEnv>();

authRoutes.get("/me", async (c) => {
  const BearerToken = c.req.header("Authorization");

  if (!BearerToken || !BearerToken.startsWith("Bearer") || BearerToken === "") {
    return c.json({ msg: "Authorization token is not present" }, 400);
  }

  const token = BearerToken.split(" ")[1];
  try {
    const verifyToken = await verify(token, c.env.Jwt_Secret, "HS256");
    if (verifyToken) {
      return c.json({msg : "token present"},200);
    }
  } catch (err) {
    return c.json({ msg: "not authorized" }, 401);
  }
});

authRoutes.post("/signup", async (c) => {
  const prisma = c.get("prisma");
  const body: SignupProps = await c.req.json();
  const validatedBody = signupInput.safeParse(body);
  if (!validatedBody.success) {
    return c.json({ msg: "zod validation failed" });
  }

  if (
    body.email == null ||
    body.password == null ||
    body.email === "" ||
    body.password === ""
  ) {
    return c.json({ msg: "enter email, password or name(optional)" }, 400);
  }

  try {
    const res = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign({ id: res.id, name: res.name }, c.env.Jwt_Secret);

    return c.json({ msg: "data has been added", token: token }, 200);
  } catch (err) {
    console.error(err);
    return c.json({ msg: "something went wrong during post SIgnup" }, 500);
  }
});

authRoutes.post("/signin", async (c) => {
  const prisma = c.get("prisma");

  const body: SignupProps = await c.req.json();
  const validatedBody = signinInput.safeParse(body);
  if (!validatedBody.success) {
    return c.json({ msg: "zod validation failed" }, 400);
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) {
      return c.json({ msg: "user not find ,signup" },404);
    }
    const token = await sign(
      { id: user.id, name: user.name },
      c.env.Jwt_Secret,
      "HS256",
    );

    return c.json({ msg: "successfully login", token: token });
  } catch (err) {
    console.error(err);
    return c.json({ msg: "something went wrong during post Signin" }, 500);
  }
});

export { authRoutes };
