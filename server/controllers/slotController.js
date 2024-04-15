import Slot from "../models/Slot.js";

export const createSlot = async (req, res) => {
  try {
    const newSlot = new Slot(req.body);
    await newSlot.save();
    res.status(200).send({
      message: "slot saved successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "something went wrong !",
      success: false,
    });
  }
};

export const getAllSlots = async (req, res) => {
  try {
    const slots = await Slot.find();
    res.status(200).send({
      message: "Slots retrieved successfully",
      success: true,
      data: slots,
    });
  } catch (error) {
    res.status(500).send({
      message: "something went wrong!",
      success: false,
    });
  }
};

export const getSlot = async (req, res) => {
  try {
    const result = await Slot.findById(req.params.slotID);
    res.status(200).send({
      message: "slot retrieved successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: "something went wrong!",
      success: false,
    });
  }
};
