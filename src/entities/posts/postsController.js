import { writable } from "svelte/store";
import { postsModel, postsGetRequest } from "./postsModel";
import { requestStatus, inLineMessageTypes } from "../_libs";

const store = writable(postsModel);

const status = writable(requestStatus.NO_REQUEST);

export const postsStatus = {
  subscribe: status.subscribe,
  reset: () => {
    status.set(requestStatus.NO_REQUEST);
  },
};

const postsStore = {
  subscribe: store.subscribe,
  postsGet: async (accessToken) => {
    status.set(requestStatus.REQUESTING);
    const data = await postsGetRequest(accessToken);
    store.set([...data]);
    status.set(requestStatus.REQUEST_SUCCESS);
  },
  postsReset: () => store.set(postsModel),
};

export default postsStore;
