import "server-only";

export type apiCredentials = {
  username: string;
  password: string;
};

const api_url = process.env.API_URL || "";

export async function apiRequestAccessToken({
  username,
  password,
}: apiCredentials): Promise<Response> {
  // NOTE
  // The details of the api call below are specitif to the authentication API
  // this template was build for originally. You will need to replace the code
  // below by your own bespoke authentication logic.

  const body = new URLSearchParams();
  body.append("grant_type", "");
  body.append("username", username);
  body.append("password", password);
  body.append("scope", "");
  body.append("client_id", "");
  body.append("client_secret", "");

  const res = await fetch(`${api_url}/login/access-token`, {
    method: "POST",
    body: body,
    headers: {
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return res;
}
