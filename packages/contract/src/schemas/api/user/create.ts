import { z } from "zod";
import { userSchema } from "../../entities/user.js";

export const createUserRequestSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

export const createUserResponseSchema = userSchema;

export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;
export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;
