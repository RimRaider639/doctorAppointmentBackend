const mg = require("mongoose");

const appointmentSchema = mg.Schema({
  name: { type: String, required: true },
  image: { type: String, default: `https://i.stack.imgur.com/l60Hf.png` },
  specialization: {
    type: String,
    enum: ["Cardiologist", "Dermatologist", "Pediatrician", "Psychiatrist"],
    required: true,
  },
  experience: { type: Number, required: true },
  location: { type: String, required: true },
  date: { type: mg.Schema.Types.Date, default: new Date().toString() },
  slots: { type: Number, required: true, default: 0 },
  fee: { type: Number, required: true },
});

const Appointment = mg.model("appointment", appointmentSchema);

module.exports = Appointment;
