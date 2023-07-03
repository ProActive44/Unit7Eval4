const { Schema, model } = require("mongoose");

const employeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  department: {
    type: String,
    enum: ["Tech", "Marketing", "Operations"],
    required: true,
  },
  salary: { type: Number, required: true },
});

const employeeModel = model("employee", employeeSchema);

module.exports = employeeModel;
