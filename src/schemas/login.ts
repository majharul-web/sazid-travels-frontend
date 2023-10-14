import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6).max(32).required("Password is required"),
});
export const signupSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  name: yup.string().required("User name is required"),
  password: yup.string().min(6).max(32).required("Password is required"),
});
