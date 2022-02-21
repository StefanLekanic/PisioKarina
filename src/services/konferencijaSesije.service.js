import base from "./base.service";

const instance = base.service(true);

export const getAll = (id) => {
  return instance.get(`/konferencije/${id}/sesije`);
};

export default {
  getAll,
};
