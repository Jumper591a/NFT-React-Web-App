const mongoose = require("mongoose");
const { model, Schema } = require("mongoose");

MouseEvent.exports = {
  M: (modelName) => mongoose.model(modelName),
  initMongo: () => {
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

    model("Department", DepartmentsSchema, "departments");
    model("Employee", EmployeesSchema, "employees");
    model("Company", CompanySchema, "companies");
  },
};
