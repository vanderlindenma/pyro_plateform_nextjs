import "server-only";
import { createCipheriv, randomBytes, createDecipheriv } from "crypto";
import { z } from "zod";

export const EncryptedJsonSchema = z.object({
  iv: z.string().min(1, { message: "IV must not be empty." }),
  data: z.string(),
});

export type EncryptedJson = z.infer<typeof EncryptedJsonSchema>;

export async function encryptToJson({
  message,
  encryption_key,
}: {
  message: string;
  encryption_key: Buffer;
}): Promise<EncryptedJson> {
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes256", encryption_key, iv);

  const encrypted = cipher.update(message, "utf8", "hex") + cipher.final("hex");
  return { iv: iv.toString("hex"), data: encrypted };
}

export async function decryptFromJson({
  encrypted_json,
  encryption_key,
}: {
  encrypted_json: EncryptedJson;
  encryption_key: Buffer;
}): Promise<string> {
  const decipher = createDecipheriv(
    "aes256",
    encryption_key,
    Buffer.from(encrypted_json.iv, "hex")
  );

  const decrypted =
    decipher.update(encrypted_json.data, "hex", "utf8") +
    decipher.final("utf8");

  return decrypted.toString();
}
