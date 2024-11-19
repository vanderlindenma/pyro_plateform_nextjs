import { z } from "zod";
import { EncryptedJsonSchema } from "@/lib/encryption";

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
  expires: z.date(),
});

export type SessionPayload = z.infer<typeof SessionPayloadSchema>;

// export type SessionPayload = {
//   user: {
//     username: string;
//     encrypted_password: EncryptedJson;
//     encrypted_api_token: EncryptedJson;
//   };
//   expires: Date;
// };
