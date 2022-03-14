import { writable } from "svelte/store";
import { authModel, authUser, verifyUser } from "./authModel";
import { requestStatus, inLineMessageTypes } from "../_libs";
import inLineMessageStore from "../inLineMessage/inLineMessageController";

const store = writable(authModel);

const status = writable(requestStatus.NO_REQUEST);

export const authStatus = {
  subscribe: status.subscribe,
  reset: () => {
    status.set(requestStatus.NO_REQUEST);
  },
};

const statusVerify = writable(requestStatus.NO_REQUEST);

export const authStatusVerify = {
  subscribe: statusVerify.subscribe,
  reset: () => {
    statusVerify.set(requestStatus.NO_REQUEST);
  },
};

const authStore = {
  subscribe: store.subscribe,
  authUser: async (userName, email) => {
    if (!userName || !email) {
      inLineMessageStore.activate(
        inLineMessageTypes.DANGER.name,
        "Missing User name or Email"
      );
    } else {
      status.set(requestStatus.REQUESTING);
      const data = await authUser(userName, email);
      store.update((currentState) => {
        return { ...currentState, ...data };
      });
      status.set(requestStatus.REQUEST_SUCCESS);
    }
  },
  authSetLocationBeforeRedirecting: (location) => {
    store.update((currentState) => {
      return { ...currentState, locationBeforeRedirecting: location };
    });
  },
  authResetLocationBeforeRedirecting: () => {
    store.update((currentState) => {
      return { ...currentState, locationBeforeRedirecting: "" };
    });
  },
  authVerifyUser: async () => {
    statusVerify.set(requestStatus.REQUESTING);
    const loginData = await verifyUser();
    store.update((currentState) => {
      return { ...currentState, ...loginData };
    });
    statusVerify.set(requestStatus.REQUEST_SUCCESS);
  },
  authReset: () =>
    store.set({
      id: "",
      name: "",
      username: "",
      email: "",
      isAuthenticated: false,
      locationBeforeRedirecting: "",
      accessToken: "",
      role: "",
    }),
};

export default authStore;
