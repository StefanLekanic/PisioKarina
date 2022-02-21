import base from "./base.service";

const instance = base.service(true);

export const getAll = (id1, id2) => {
  return instance.get(`/konferencije/${id1}/sesije/${id2}/dogadjaji`);
};

export default {
  getAll,
};
