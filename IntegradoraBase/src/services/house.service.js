import houseRepo from "../repositories/house.repository.js";

const getAllHouses = async () => await houseRepo.findAll();

const getHouseById = async (id) => await houseRepo.findById(id);

const createHouse = async (data) => await houseRepo.create(data);

const updateHouse = async (id, data) => await houseRepo.update(id, data);

const toggleHouseStatus = async (id) => {
  const house = await houseRepo.findById(id);
  if (!house) throw new Error("❌ Casa no encontrada.");
  const newStatus = house.status === "activo" ? "inactivo" : "activo";
  return await houseRepo.changeStatus(id, newStatus);
};

export default {
  getAllHouses,
  getHouseById,
  createHouse,
  updateHouse,
  toggleHouseStatus
};
