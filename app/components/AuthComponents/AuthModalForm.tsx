"use client";
// Formik
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
// Schemas
import signUpFormSchema, {
  SignUpFormValues,
} from "../../../schemas/signUp.schema";
import signInFormSchema, {
  SignInFormValues,
} from "../../../schemas/signIn.schema";
// Components
import FormikInputComponent from "./FormikInputComponent";
import { AUTH_BUTTON_AND_MODAL_TYPE } from "./AuthButtonAndModal";
// Hooks
import useAuth from "@/app/hooks/useAuth";

interface AuthModalFormProps {
  formType:
    | typeof AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN
    | typeof AUTH_BUTTON_AND_MODAL_TYPE.SIGN_UP;
}

const AuthModalForm: React.FC<AuthModalFormProps> = ({ formType }) => {
  const { signIn, signUp } = useAuth();
  const isSignIn = formType === AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN;

  const initialValues = isSignIn
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
    if (isSignIn) {
      signIn(values as SignInFormValues);
    } else {
      const { confirm_password, ...rest } = values as SignUpFormValues;
      signUp();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isValid, dirty }) => (
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
          </div>

          {!isSignIn && (
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
          )}

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

          {!isSignIn && (
            <div className="my-3 flex justify-between text-sm">
              <FormikInputComponent
                name="confirm_password"
                className="w-full"
                type="password"
                placeholder="Confirm Password"
                errors={errors}
                touched={touched}
                tooltipPlacement="left"
              />
            </div>
          )}

          <button
            type="submit"
            className={`uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 ${
              (!isValid || !dirty) && "disabled:bg-gray-400"
            }`}
            disabled={!isValid || !dirty}
          >
            {isSignIn ? "Sign In" : "Create Account"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthModalForm;
