import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { AppEnv } from "../types/hono";
import { JWTPayload } from "hono/utils/jwt/types";

interface MyPayload extends JWTPayload {
  id: string;
  name: string | null;
}

export async function blogAuth(c: Context<AppEnv>, next: Next) {
  const AuthHeader = c.req.header("Authorization") || "";

 
  if (!AuthHeader.startsWith("Bearer") || AuthHeader === "") {
    return c.json({ msg: "deformed authorization header" }, 400);
  }
  try {
    const token: string = AuthHeader.split(" ")[1];

    const response = (await verify(
      token,
      c.env.Jwt_Secret,
      "HS256",
    )) as MyPayload;
    if (response.id) {
        c.set("userId",response.id);
      await next();
       console.log("Response finished");
    }
    return c.json({ msg: "unauthorized" }, 401);
  } catch (err) {
    console.error(err);
    return c.json({ msg: "Authorization token is not present" }, 401);
  }
}
