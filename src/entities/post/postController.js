import { writable } from "svelte/store";
import { postModel, postGetRequest, postPutRequest } from "./postModel";
import { requestStatus, httpRequestStatus } from "../_libs";
import inLineMessageStore from "../inLineMessage/inLineMessageController";
import { inLineMessageTypes } from "../_libs";

const store = writable(postModel);

const statusGet = writable(requestStatus.NO_REQUEST);
const statusPut = writable(requestStatus.NO_REQUEST);

export const postGetStatus = {
  subscribe: statusGet.subscribe,
  reset: () => {
    statusGet.set(requestStatus.NO_REQUEST);
  },
};

export const postPutStatus = {
  subscribe: statusPut.subscribe,
  reset: () => {
    statusPut.set(requestStatus.NO_REQUEST);
  },
};

const postStore = {
  subscribe: store.subscribe,
  postGet: async (accessToken, postId) => {
    statusGet.set(requestStatus.REQUESTING);
    const data = await postGetRequest(accessToken, postId);
    store.set({ ...data });
    statusGet.set(requestStatus.REQUEST_SUCCESS);
  },
  postPost: async (accessToken, id, title, body, userId) => {
    statusPut.set(requestStatus.REQUESTING);
    const response = await postPutRequest(accessToken, id, title, body, userId);
    if (response === httpRequestStatus.OK) {
      store.set({ id, userId, title, body });
      statusPut.set(requestStatus.REQUEST_SUCCESS);
      inLineMessageStore.activate(
        inLineMessageTypes.SUCCESS.name,
        "Post modified!"
      );
    }
  },
  postsReset: () => store.set(postModel),
};

export default postStore;
