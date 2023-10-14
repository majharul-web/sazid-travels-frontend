"use client";
import { Button, Col, Input, Row, message } from "antd";
import loginImage from "../../assets/login-image.png";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/login";
import FormTextArea from "../Forms/FormTextArea";
import { useCustomerSignUpMutation } from "@/redux/api/customerApi";
import Link from "next/link";
import { ENUM_USER_ROLE } from "@/types";

type FormValues = {
  id: string;
  password: string;
};

const SingUpPage = () => {
  const [customerSignUp] = useCustomerSignUpMutation();
  const router = useRouter();

  // console.log(isLoggedIn());

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    data.role = ENUM_USER_ROLE.CUSTOMER;

    try {
      const res = await customerSignUp({ ...data }).unwrap();

      if (res?.id) {
        router.push("/login");
        message.success("User signed up successfully!");
      } else {
        message.error("Unable to create user");
      }
    } catch (err) {
      // Log the error for debugging
      console.log("Error caught:", err);

      if (err.error) {
        message.error(err.error.message);
      } else if (err.message) {
        message.error(err.message);
      } else {
        message.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <Row
      justify='center'
      align='middle'
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={16} lg={10}>
        <div>
          <Image src={loginImage} style={{ width: "100%", height: "auto" }} alt='login image' />
        </div>
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: "15px 0px",
          }}
        >
          Create your account
        </h1>
        <div>
          <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
            <div>
              <FormInput
                name='email'
                type='text'
                size='large'
                label='Email Id'
                placeholder='email'
                required
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput name='name' type='text' size='large' label='User Name' placeholder='name' required />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name='password'
                type='password'
                size='large'
                label='User Password'
                placeholder='password'
                required
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name='contactNo'
                type='number'
                size='large'
                label='Contact No'
                placeholder='contact No'
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormTextArea name='address' label='Address' placeholder='address...' />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Button type='primary' htmlType='submit'>
                Sing Up
              </Button>
              <Link href='/login'>Already have an account?</Link>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default SingUpPage;
