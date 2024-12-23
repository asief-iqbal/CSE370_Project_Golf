import mongoose from "mongoose";
const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    userType: String
})
const EmployeeModel = mongoose.model("Employee", EmployeeSchema);
export default EmployeeModel;