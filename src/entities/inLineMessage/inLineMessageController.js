import { writable } from "svelte/store";
import {
  inLineMessageTypes,
  getClassFromInLineMessageTypes,
  timeToCloseInLineMessage,
} from "../_libs";

const store = writable({
  type: "",
  message: "",
  class: "",
});

const closeMessage = () => {
  setTimeout(() => {
    store.set({
      type: "",
      message: "",
      class: "",
    });
  }, timeToCloseInLineMessage);
};

const inLineMessageStore = {
  subscribe: store.subscribe,
  activate: async (type, message) => {
    const typeClass = getClassFromInLineMessageTypes(type);
    if (typeClass === "" || message === "") {
      store.set({
        type: inLineMessageTypes.DANGER.name,
        message: "Wrong formart in-line message",
        class: inLineMessageTypes.DANGER.class,
      });
    } else {
      store.set({
        type,
        message,
        class: typeClass,
      });
      closeMessage();
    }
  },
  clear: () => {
    store.set({
      type: "",
      message: "",
      class: "",
    });
  },
};

export default inLineMessageStore;
