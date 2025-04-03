import { HouseModel } from "../models/house.model.js";

const findById = async (id) => {
  try {
    const house = await HouseModel.findById(id);
    return house || null;
  } catch {
    return null;
  }
};

const findAll = async () => await HouseModel.find();

const create = async (data) => {
  const house = new HouseModel(data);
  return await house.save();
};

const update = async (id, data) => {
  return await HouseModel.findByIdAndUpdate(id, data, { new: true });
};

const changeStatus = async (id, status) => {
  return await HouseModel.findByIdAndUpdate(id, { status }, { new: true });
};

export default { findById, findAll, create, update, changeStatus };
