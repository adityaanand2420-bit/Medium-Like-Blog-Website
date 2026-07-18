import z from "zod";

export const signupInput = z.object({
  name: z.string().optional(),
  email: z.email(),
  password: z.string().min(5),
});

export type SignupType = z.infer<typeof signupInput>

export const signinInput = z.object({
  email: z.email(),
  password: z.string().min(5),
});

export type SigninType = z.infer<typeof signinInput>

export const createPostInput = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
});

export type CreatePostType = z.infer<typeof createPostInput>

export const updatePostInput = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
});

export type updatePostType = z.infer<typeof updatePostInput>