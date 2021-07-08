//? Es6 imports => requires node version 12.2 and above I believe (Check bookmarked links in slack for a future solution to upgrading node easily).
// import * as mongoose from "mongoose";
// const {connect, model, Schema} = mongoose;
// import * as app from `express`

//! require imports for mongoose and express.
const mongoose = require("mongoose");
const { model, Schema } = require("mongoose");
const app = require("express")();

//*=========================================================
//!         CONNECTING TO MONGODB DATABASE
//*=========================================================

mongoose.connect("mongodb://localhost:27017/firstDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//*===========================================================================================================
//? (rules to how a data table [or in this case a JSON Collection since MongoDB is a noSql type] is defined.)
//!                                 DEFINING A SCHEMA FOR LATER USE.
//*===========================================================================================================

const DepartmentsSchema = new Schema({
  name: String,
  location: String,
});
const EmployeesSchema = new Schema({
  firstName: String,
  lastName: String,
  mobile: String,
  //* Foreign key example => department holds an object => object is of type ObjectId and 'ref' is what table you are referencing from.
  department: [{ type: Schema.Types.ObjectId, ref: "Department" }],
});
const CompanySchema = new Schema({
  name: String,
  address: String,
  employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
});

//*=================================================================================================
//? (creating the data table (JSON Collection) and giving it its name and its schema rule set)
//!                                 DEFINING OUR MODELS.
//*=================================================================================================

const Departments = model("Department", DepartmentsSchema, "departments");
const Employees = model("Employee", EmployeesSchema, "employees");
const Companys = model("Company", CompanySchema, "companys");

//*=============================================================================
//!                      STARTS UP THE BACKEND APPLICATION
//*=============================================================================

app.use("/", async (req, res) => {
  //* Removing Departments data to reset then inserting data into Department table.
  await Departments.deleteMany({});
  await Departments.create({
    name: "IT",
    location: "building A",
  });
  await Departments.create({
    name: "Marketing",
    location: "building B",
  });

  //* Removing Employees data to reset then inserting data into Department table.
  await Employees.deleteMany({});
  await Employees.create({
    firstName: "tommy",
    lastName: "R",
    mobile: "123",
    //* Querying Departments table to link the IT department ID.
    department: await Departments.findOne({ name: "IT" }),
  });
  await Employees.create({
    firstName: "jon",
    lastName: "R",
    mobile: "456",
    department: await Departments.findOne({ name: "Marketing" }),
  });

  //* Removing Employees data to reset then inserting data into Department table.
  await Companys.deleteMany({});
  await Companys.create({
    name: "Apple",
    address: "100 poppylane",
    //* Querying Departments table to link the IT department ID.
    employees: await Employees.find(),
  });

  res.json({
    departments: await Departments.find(),
    employees: await Employees.find(),
    //* Can add 2nd arg to the populate() func => the key that you only want to show. Ex: name, location, id, etc.
    employeesWithDep: await Employees.find().populate("department"),
    company: await Companys.find(),
    companyWithEmp: await Companys.find().populate("employees"),
    //* populating a level deeper would require to pass a object to populate() and a populate Attribute.
    companyWithEmpAndDep: await Companys.find().populate({
      path: "employees",
      model: "Employee",
      populate: { path: "department", model: "Department" },
    }),

    //? Can do more after executing the command.
    //!   .exec((err, department) => {
    //!     console.log("Department " + department);
    //!   }),
  });
});

//*========================================================================
//!   NEEDED FOR OUR APPLICATION TO LISTEN TO THE CORRECT PORT
//*========================================================================

app.listen(3050, () => console.log("listening on port 3050"));
