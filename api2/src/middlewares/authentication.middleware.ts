import { NextFunction, Request, Response } from "express";
import { keycloak } from "../keycloak";
import axios from "axios";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const requestParams = new URLSearchParams();
    requestParams.append("token", token);
    requestParams.append("client_id", keycloak.clientId);
    requestParams.append("client_secret", keycloak.clientSecret);

    const { data } = await axios.post(
      `${keycloak.keycloakUrl}/realms/${keycloak.realmName}/protocol/openid-connect/token/introspect`,
      requestParams
    );

    if (data.active) {
      next();
    } else {
      res.status(401).send("Unauthorized request.");
    }
  } catch (err) {
    res.status(401).send("Unauthorized request.");
  }
};
