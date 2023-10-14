import SingUpPage from "@/components/SignUp/SingUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UMS | SignUp",
};

const SignUp = () => {
  return (
    <>
      <SingUpPage />
    </>
  );
};

export default SignUp;
