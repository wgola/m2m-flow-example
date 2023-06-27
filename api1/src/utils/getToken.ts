import axios from "axios";
import { keycloak } from "../keycloak";
import { LocalStorage } from "node-localstorage";
import { getCurrentEpoch } from "./getCurrentEpoch";

const localStorage = new LocalStorage("./localStorage");

export const getToken = async (): Promise<String> => {
  if (
    localStorage.getItem("token") &&
    parseInt(localStorage.getItem("tokenExpiration")) - 10 > getCurrentEpoch()
  ) {
    return localStorage.getItem("token");
  }

  const requestParams = new URLSearchParams();
  requestParams.append("grant_type", "client_credentials");
  requestParams.append("client_id", keycloak.clientId);
  requestParams.append("client_secret", keycloak.clientSecret);

  const { data } = await axios.post(
    `${keycloak.keycloakUrl}/realms/${keycloak.realmName}/protocol/openid-connect/token`,
    requestParams
  );

  localStorage.setItem("token", data.access_token);
  localStorage.setItem("tokenExpiration", getCurrentEpoch() + data.expires_in);

  return data.access_token;
};
