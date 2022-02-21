import base from "./base.service";

const instance = base.service(true);

export const getAll = () => {
  return instance.get("/konferencije");
};

export const insert = (konferencija) => {
  return instance.post("/konferencije", konferencija).then((res) => res.data);
};

export const getLastInsertedID = () => {
  return instance.get("/konferencije/id");
};

export default {
  getAll,
  insert,
  getLastInsertedID,
};
