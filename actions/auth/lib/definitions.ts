import { z } from "zod";
import { EncryptedJsonSchema } from "@/lib/encryption";

// Preprocess converts string/Date to a Unix timestamp (seconds)
const unixTimestampPreprocess = z.preprocess(
  (val) => {
    if (typeof val === "string" || val instanceof Date) {
      return Math.floor(new Date(val).getTime() / 1000);
    }
    return val;
  },
  z.number()
);

export const LoginFormSchema = z.object({
  username: z.string().min(1, { message: "Username field must not be empty." }),
  password: z.string().min(1, { message: "Password field must not be empty." }),
});

export const ApiAccessTokenResponseSchema = z.object({
  access_token: z
    .string()
    .min(1, { message: "Access token must not be empty." }),
  token_type: z.literal("bearer"),
});
export type ApiAccessTokenResponse = z.infer<
  typeof ApiAccessTokenResponseSchema
>;

export type FormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const SessionPayloadSchema = z.object({
  user: z.object({
    username: z.string().min(1, { message: "Username must not be empty." }),
    encrypted_password: EncryptedJsonSchema,
    encrypted_api_token: EncryptedJsonSchema,
  }),
  expires: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Expires must be a valid date string.",
  }),
  iat: unixTimestampPreprocess.optional(),
  exp: unixTimestampPreprocess.optional(),
});

export type SessionPayload = z.infer<typeof SessionPayloadSchema>;
