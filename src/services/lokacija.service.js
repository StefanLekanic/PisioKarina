import base from "./base.service";

const instance = base.service(true);

export const getAll = () => {
  return instance.get("/lokacije");
};

export const getAllProstorijeById = (id) => {
  return instance.get(`/lokacije/${id}/prostorije`);
};

export default {
  getAll,
  getAllProstorijeById,
};
