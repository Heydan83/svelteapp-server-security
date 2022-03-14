import { writable } from "svelte/store";

const store = writable({
  title: "",
  body: "",
  show: false,
  btnFalseText: "",
  btnTrueText: "",
  response: false,
});

const modalStore = {
  subscribe: store.subscribe,
  modalSet: (title, body, btnFalseText, btnTrueText) => {
    store.update((currentState) => {
      return { ...currentState, title, body, btnFalseText, btnTrueText };
    });
  },
  modalShow: () => {
    store.update((currentState) => {
      return { ...currentState, show: true };
    });
  },
  modalClose: () => {
    store.update((currentState) => {
      return { ...currentState, response: false, show: false };
    });
  },
  modalSetResponse: (response) => {
    store.update((currentState) => {
      return { ...currentState, response };
    });
  },
};

export default modalStore;
