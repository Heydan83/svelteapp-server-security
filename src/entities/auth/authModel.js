import axios from "axios";
import { httpRequestStatus } from "../_libs";
import { inLineMessageTypes } from "../_libs";
import inLineMessageStore from "../inLineMessage/inLineMessageController";
import { push } from "svelte-spa-router";

export const authModel = {
  id: "",
  name: "",
  username: "",
  email: "",
  isAuthenticated: false,
  locationBeforeRedirecting: "",
  accessToken: "",
  role: "",
};

export async function authUser(userName, email) {
  try {
    const response = await axios.post("/users/login", {
      username: userName,
      email,
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === httpRequestStatus.OK) {
      const data = response.data;
      let { message, ...filteredData } = data;
      if (message !== "authenticated")
        throw new Error(`Error while consulting the server: ${message}`);

      filteredData = { ...filteredData, isAuthenticated: true };
      return filteredData;
    } else {
      throw new Error(
        `Error while consulting the server: ${response.status}, ${response.statusText}`
      );
    }
  } catch (err) {
    inLineMessageStore.activate(inLineMessageTypes.DANGER.name, err);
  }
}

export async function verifyUser() {
  try {
    const response = await axios.post("/users/token");

    if (response.status === httpRequestStatus.OK) {
      const data = response.data;
      let { message, ...loginUser } = data;
      if (message === "no refresh token") {
        return { isAuthenticated: false };
      }

      return { ...loginUser, isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
      // throw new Error(
      //   `Error while consulting the server: ${response.status}, ${response.statusText}`
      // );
    }
  } catch (err) {}
}
