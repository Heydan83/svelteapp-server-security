import { writable } from "svelte/store";
import { getUsers } from "./usersModel";
import { requestStatus } from "../_libs";

const { subscribe, set, update } = writable([
  {
    id: "",
    name: "",
    username: "",
    address: {},
    phone: "",
    website: "",
    company: {},
  },
]);

export const usersStatus = writable(requestStatus.NO_REQUEST);

export const usersStore = {
  subscribe,
  getUsers: async () => {
    usersStatus.set(requestStatus.REQUESTING);
    const data = await getUsers();
    set(data);
  },
  resetUser: () =>
    set([
      {
        id: "",
        name: "",
        username: "",
        address: {},
        phone: "",
        website: "",
        company: {},
      },
    ]),
};
