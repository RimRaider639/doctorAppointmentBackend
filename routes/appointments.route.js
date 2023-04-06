const express = require("express");
const Appointment = require("../models/appointment.model");
const appointmentRouter = express.Router();

appointmentRouter.post("/", async (req, res, next) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.send({ message: "Appointment successfully created!" });
  } catch (error) {
    res.status(500);
    res.send({ message: "Some Error Occured", error: error.message });
  }
});

appointmentRouter.patch("/:id", async (req, res, next) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: "Appointment successfully updated" });
  } catch (error) {
    res.status(500);
    res.send({ message: "Some Error Occured", error: error.message });
  }
});

appointmentRouter.get("/", async (req, res, next) => {
  const { specialization, name, sort, page, limit } = req.query;
  const filters = {};
  if (specialization) Object.assign(filters, { specialization });
  if (name) Object.assign(filters, { name: { $regex: name, $options: "i" } });
  try {
    const result = await Appointment.find(filters)
      .sort({ date: sort })
      .skip(page * limit)
      .limit(limit);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send({ message: "Some Error Occured", error: error.message });
  }
});

module.exports = appointmentRouter;
