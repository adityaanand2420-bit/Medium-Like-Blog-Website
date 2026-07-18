import { Hono } from "hono";
import { AppEnv } from "../types/hono";
import { blogAuth } from "../middleware/blogAuthMiddleware";
import { createPostInput, updatePostInput, updatePostType } from "@adityaworkspace24/medium-common";

const blogRoutes = new Hono<AppEnv>();

blogRoutes.use("*", blogAuth);

blogRoutes.post("/blog/post", async (c) => {
  const body = await c.req.json();

  const validatedBody = createPostInput.safeParse(body);

  if(!validatedBody.success){
    return  c.json({ msg: "zod validation failed" },400);
  }
  try {
    const prisma = c.get("prisma");
    const userId = c.get("userId");
    const res = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
        authorId: userId,
      },
    });
    return c.json({
      msg: `post of ${res.title} has been saved with authorId => ${userId}`,
    },200);
  } catch (err) {
    console.error(err);
    return c.json({ msg: "somethig went wrong during `/blog` request" }, 500);
  }
});

blogRoutes.put("/blog/:id", async (c) => {
  const body:updatePostType = await c.req.json();
  const Postid : string =  c.req.param("id");
  if(!Postid){
    return c.json({msg : "enter postid(whicherver post u want to update) in params"},400)
  }

    const validatedBody  = updatePostInput.safeParse(body);
    if(!validatedBody.success){
      return  c.json({ msg: "zod validation failed" },400);
    }

  try {
    const prisma = c.get("prisma");

    const res = await prisma.post.update({
      where: {
        id: Postid
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    if(!res){
      return c.json({msg : "prisma.post.update ==> null"},404)
    }

    return c.json({ msg: `updated Post with id: ${Postid}`},200);
  } catch (err) {
    console.error(err);
    return c.json(
      { msg: "something went wrong while updating Post, try again!" },
      500,
    );
  }
});



blogRoutes.get("/blog/bulk", async (c) => {
    const prisma = c.get("prisma");
    const res = await prisma.post.findMany({
      select:{
        id : true,
        title : true,
        content : true,
        published  : true,
        author : {
          select : {
            name : true
            
          }
        }
      }
    });
    return c.json(res,200);
});



blogRoutes.get("/blog/:id", async (c) => {
    const id = c.req.param("id");
    const prisma = c.get("prisma");

    try {
        const res = await prisma.post.findUnique({
            where : {
                id : id
            },
            select:{
              id : true,
              title : true,
              content : true,
              published :true,
              author : {
                select :{
                  name :true
                }
              }
            }
        })
        if(res === null){
            return c.json({msg : "sorry the blog you are looking for doesn't exists"},404)
        }
        return c.json(res,200);

    } catch (err) {
        console.error(err);
        return c.json({msg : `somr=ething went wrong while getting blog of ${id}`},500);
    }
});

export { blogRoutes };
