import { atom } from "recoil";

export const userAtom = atom({
  key: "userAtom",
  default: {
    firstname: "",
    lastname: "",
    email: "",
    balance: 0,
    _id: "",
    createdAt: "",
    updatedAt: "",
  },
});
export const errorMessage = atom({
  key: "errorMessage",
  default: "",
});
