import axios from "axios";
import { httpRequestStatus } from "../_libs";
import { inLineMessageTypes } from "../_libs";
import inLineMessageStore from "../inLineMessage/inLineMessageController";

export const postModel = {
  id: "",
  userId: "",
  title: "",
  body: "",
};

export async function postGetRequest(accessToken, postId) {
  try {
    const response = await axios.get(`/posts/${postId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.status === httpRequestStatus.OK) {
      const data = response.data;

      return data;
    } else {
      throw new Error(
        `Error while consulting the server: ${response.status}, ${response.statusText}`
      );
    }
  } catch (err) {
    inLineMessageStore.activate(inLineMessageTypes.DANGER.name, err);
  }
}

export async function postPutRequest(accessToken, id, title, body, userId) {
  const data = { id, title, body, userId };
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    const response = await axios.put(`/posts/${id}`, data, { headers });

    if (response.status === httpRequestStatus.OK) {
      return response.status;
    } else {
      throw new Error(
        `Error while consulting the server: ${response.status}, ${response.statusText}`
      );
    }
  } catch (err) {
    inLineMessageStore.activate(inLineMessageTypes.DANGER.name, err);
  }
}
