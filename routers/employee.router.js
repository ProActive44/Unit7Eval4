const express = require("express");
const employeeModel = require("../models/employee.model");

const employeeRouter = express.Router();

employeeRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, department, salary } = req.body;

    const new_employee = new employeeModel({
      firstName,
      lastName,
      email,
      department,
      salary,
    });

    await new_employee.save();
    res.status(200).send({ msg: "Employee Created successful" });
  } catch (error) {
    res.status(500).send({ msg: "Failed to Create Employee" });
  }
});

employeeRouter.get("/", async (req, res) => {
  try {
    const { page, limit, sort, order, firstName, department } = req.query;

    const pageNo = parseInt(page) || 1;
    const limitNo = parseInt(limit) || 5;
    const skip = (pageNo - 1) * limitNo;

    const sortOption = {};
    const filter = {};

    if (department) {
      filter.department = department;
    }
    if (firstName) {
      filter.firstName = firstName;
    }

    if (sort) {
      sortOption[sort] = order === "desc" ? -1 : 1;
    }

    const data = await employeeModel
      .find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    if (!data) {
      res.status(400).send({ msg: "Employees not Present" });
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ msg: "Error fetching the data" });
  }
});

employeeRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const data = await employeeModel.findById(id);
    if (!data) {
      res.status(400).send({ msg: "Employee not found" });
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ msg: "Error fetching the data" });
  }
});

employeeRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.paramsid;
    const employee = await employeeModel.findById(id);
    if (!employee) {
      res.status(400).send({ msg: "Employee not found" });
    }

    await employee.remove();
    res.status(200).send({ msg: "employee deleted successfully" });
  } catch (error) {
    res.status(500).send({ msg: "Error deleting the data" });
  }
});

employeeRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { firstName, lastName, email, department, salary } = req.body;

    const employee = await employeeModel.findById(id);

    if (!employee) {
      res.status(400).send({ msg: "Employee not found" });
    }

    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.email = email;
    employee.department = department;
    employee.salary = salary;

    await employee.save();
    res.status(200).send({ msg: "Employee updated successful" });

    res.status(200).send({ msg: "employee deleted successfully" });
  } catch (error) {
    res.status(500).send({ msg: "Error deleting the data" });
  }
});

module.exports = employeeRouter;
