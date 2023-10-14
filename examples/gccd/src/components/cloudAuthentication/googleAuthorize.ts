import { GeneralSign, importPKCS8 } from "jose";

const GOOGLE_TOKEN_URL = "https://www.googleapis.com/oauth2/v4/token";
const alg = "RS256";

export const googleAuthorize = async ({ credentials }: any) => {
  try {
    const iat = Math.floor(new Date().getTime() / 1000);
    const payload = {
      iss: credentials.client_email,
      scope: "https://www.googleapis.com/auth/cloud-platform",
      aud: GOOGLE_TOKEN_URL,
      exp: iat + 3600,
      iat,
    };
    const ecPrivateKey = await importPKCS8(credentials.private_key, alg);

    const jws = await new GeneralSign(
      new TextEncoder().encode(JSON.stringify(payload))
    )
      .addSignature(ecPrivateKey)
      .setProtectedHeader({ alg })
      .sign();

    const sig = jws.signatures[0];
    const response = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: `${sig.protected}.${jws.payload}.${sig.signature}`,
      }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    if (response.ok) {
      const jsonData = await response.json();
      // console.log("result", jsonData);
      return jsonData;
    }
    throw response;
  } catch (error) {
    throw error;
  }
};
