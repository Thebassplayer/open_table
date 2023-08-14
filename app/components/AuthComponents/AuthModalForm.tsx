import React from "react";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import signUpFormSchema, {
  SignUpFormValues,
} from "../../../schemas/signUp.schema";
import signInFormSchema, {
  SignInFormValues,
} from "../../../schemas/signIn.schema";
import FormikInputComponent from "./FormikInputComponent";
import { AUTH_BUTTON_AND_MODAL_TYPE } from "./AuthButtonAndModal";

interface AuthModalFormProps {
  type:
    | typeof AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN
    | typeof AUTH_BUTTON_AND_MODAL_TYPE.SIGN_UP;
}

const AuthModalForm: React.FC<AuthModalFormProps> = ({ type }) => {
  const isSignIn = type === AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN;

  const initialValues: SignInFormValues | SignUpFormValues = isSignIn
    ? { email: "", password: "" }
    : {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        city: "",
        password: "",
      };

  const validationSchema = isSignIn
    ? toFormikValidationSchema(signInFormSchema)
    : toFormikValidationSchema(signUpFormSchema);

  const handleSubmit = async (values: SignInFormValues | SignUpFormValues) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isValid }) => (
        <Form>
          {!isSignIn && (
            <div className="my-3 flex justify-between text-sm">
              <FormikInputComponent
                name="first_name"
                className="w-[49%]"
                type="text"
                placeholder="First Name"
                errors={errors}
                touched={touched}
                tooltipPlacement="left"
              />
              <FormikInputComponent
                name="last_name"
                className="w-[49%]"
                type="text"
                placeholder="Last Name"
                errors={errors}
                touched={touched}
                tooltipPlacement="right"
              />
            </div>
          )}

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
            {!isSignIn && (
              <FormikInputComponent
                name="phone"
                className="w-[49%]"
                type="text"
                placeholder="Phone"
                errors={errors}
                touched={touched}
                tooltipPlacement="left"
              />
            )}
            {!isSignIn && (
              <FormikInputComponent
                name="city"
                className="w-[49%]"
                type="text"
                placeholder="City"
                errors={errors}
                touched={touched}
                tooltipPlacement="right"
              />
            )}
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
            {isSignIn ? "Sign In" : "Create Account"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthModalForm;
