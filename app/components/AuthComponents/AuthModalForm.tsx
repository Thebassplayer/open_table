"use client";
import { useState } from "react";
import { AUTH_BUTTON_AND_MODAL_TYPE } from "./AuthButtonAndModal";
import { Formik, Form, Field } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import signUpFormSchema from "@/schemas/signup.schema";
import FormikInputComponent from "./FormikInputComponent";

export interface AuthModalFormProps {
  type:
    | typeof AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN
    | typeof AUTH_BUTTON_AND_MODAL_TYPE.SIGN_UP;
}

interface AuthModalFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}

const AuthModalForm = ({
  type: authButtonAndModalType,
}: AuthModalFormProps) => {
  const [inputs, setInputs] = useState<AuthModalFormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  let formikForm = null;

  switch (authButtonAndModalType) {
    case AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN:
      formikForm = (
        <>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              city: "",
              password: "",
            }}
            validationSchema={toFormikValidationSchema(signUpFormSchema)}
            onSubmit={async values => {
              await new Promise(resolve => setTimeout(resolve, 500));
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ errors, touched, isValid }) => (
              <Form>
                <div className="my-3 flex flex-col justify-between text-sm">
                  <FormikInputComponent
                    name="email"
                    className="w-full"
                    type="email"
                    placeholder="Email"
                    errors={errors}
                    touched={touched}
                    tooltipPlacement="left"
                  />
                  <FormikInputComponent
                    name="password"
                    className="w-full"
                    type="password"
                    placeholder="Password"
                    errors={errors}
                    touched={touched}
                    tooltipPlacement="left"
                  />
                </div>
                <button
                  type="submit"
                  className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                  disabled={!isValid}
                >
                  Sign In
                </button>
              </Form>
            )}
          </Formik>
        </>
      );
      break;
    case AUTH_BUTTON_AND_MODAL_TYPE.SIGN_UP:
      formikForm = (
        <>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              city: "",
              password: "",
            }}
            validationSchema={toFormikValidationSchema(signUpFormSchema)}
            // validate={values => {
            //   const result = signUpFormSchema.safeParse(values);
            //   if (result.success) return;

            //   console.log(result.error.issues);
            // }}
            onSubmit={async values => {
              await new Promise(resolve => setTimeout(resolve, 500));
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ errors, touched, isValid }) => (
              <Form>
                <div className="my-3 flex justify-between text-sm">
                  <FormikInputComponent
                    name="firstName"
                    className="w-[49%]"
                    type="text"
                    placeholder="First Name"
                    errors={errors}
                    touched={touched}
                    tooltipPlacement="left"
                  />
                  <FormikInputComponent
                    name="lastName"
                    className="w-[49%]"
                    type="text"
                    placeholder="Last Name"
                    errors={errors}
                    touched={touched}
                    tooltipPlacement="right"
                  />
                </div>
                <div className="my-3 flex justify-between text-sm">
                  <FormikInputComponent
                    name="email"
                    className="w-full"
                    type="email"
                    placeholder="Email"
                    errors={errors}
                    touched={touched}
                    tooltipPlacement="left"
                  />
                </div>
                <div className="my-3 flex justify-between text-sm">
                  <FormikInputComponent
                    name="phone"
                    className="w-[49%]"
                    type="text"
                    placeholder="Phone"
                    errors={errors}
                    touched={touched}
                    tooltipPlacement="left"
                  />
                  <FormikInputComponent
                    name="city"
                    className="w-[49%]"
                    type="text"
                    placeholder="City"
                    errors={errors}
                    touched={touched}
                    tooltipPlacement="right"
                  />
                </div>
                <div className="my-3 flex justify-between text-sm">
                  <FormikInputComponent
                    name="password"
                    className="w-full"
                    type="password"
                    placeholder="Password"
                    errors={errors}
                    touched={touched}
                    tooltipPlacement="left"
                  />
                </div>
                <button
                  type="submit"
                  className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                  disabled={!isValid}
                >
                  Create Account
                </button>
              </Form>
            )}
          </Formik>
        </>
      );
      break;
  }

  return <>{formikForm}</>;
};

export default AuthModalForm;
