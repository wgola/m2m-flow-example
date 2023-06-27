import dotenv from "dotenv";

dotenv.config();

export const keycloak = {
  keycloakUrl: process.env.KEYCLOAK_URL,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  realmName: "m2m-example",
};
