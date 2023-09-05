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
import FormInputComponent from "./FormInputComponent";
import { AUTH_BUTTON_AND_MODAL_TYPE } from "../../constants";
import SignFormButton from "./SignFormButton";
// Hooks
import useAuth from "@/app/hooks/useAuth";

export type FormType =
  | typeof AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN
  | typeof AUTH_BUTTON_AND_MODAL_TYPE.SIGN_UP;

interface AuthModalFormProps {
  formType: FormType;
}

const AuthModalForm: React.FC<AuthModalFormProps> = ({ formType }) => {
  if (!formType) return null;

  const { signIn, signUp } = useAuth();

  const getInitialValues = () => {
    switch (formType) {
      case AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN:
        return { email: "", password: "" } as SignInFormValues;
      case AUTH_BUTTON_AND_MODAL_TYPE.SIGN_UP:
        return {
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          city: "",
          password: "",
        } as SignUpFormValues;
      default:
        return {} as SignUpFormValues;
    }
  };

  const validationSchema = () => {
    switch (formType) {
      case AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN:
        return toFormikValidationSchema(signInFormSchema);
      case AUTH_BUTTON_AND_MODAL_TYPE.SIGN_UP:
        return toFormikValidationSchema(signUpFormSchema);
      default:
        return {};
    }
  };

  const handleSubmit = async (values: SignInFormValues | SignUpFormValues) => {
    if (formType === AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN) {
      signIn(values as SignInFormValues);
    } else {
      const { confirm_password, ...signUpValues } = values as SignUpFormValues;
      signUp(signUpValues);
    }
  };

  return (
    <Formik
      initialValues={getInitialValues()}
      validationSchema={validationSchema()}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isValid, dirty, handleSubmit }) => (
        <Form>
          {formType === AUTH_BUTTON_AND_MODAL_TYPE.SIGN_UP && (
            <>
              <div className="my-3 flex justify-between text-sm">
                <FormInputComponent
                  name="first_name"
                  className="w-[49%]"
                  type="text"
                  placeholder="First Name"
                  errors={errors}
                  touched={touched}
                  tooltipPlacement="left"
                />
                <FormInputComponent
                  name="last_name"
                  className="w-[49%]"
                  type="text"
                  placeholder="Last Name"
                  errors={errors}
                  touched={touched}
                  tooltipPlacement="right"
                />
              </div>

              <div className="my-3 flex justify-between text-sm">
                <FormInputComponent
                  name="phone"
                  className="w-[49%]"
                  type="text"
                  placeholder="Phone"
                  errors={errors}
                  touched={touched}
                  tooltipPlacement="left"
                />
                <FormInputComponent
                  name="city"
                  className="w-[49%]"
                  type="text"
                  placeholder="City"
                  errors={errors}
                  touched={touched}
                  tooltipPlacement="right"
                />
              </div>
            </>
          )}

          <div className="my-3 flex justify-between text-sm">
            <FormInputComponent
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
            <FormInputComponent
              name="password"
              className="w-full"
              type="password"
              placeholder="Password"
              errors={errors}
              touched={touched}
              tooltipPlacement="left"
            />
          </div>

          {formType === AUTH_BUTTON_AND_MODAL_TYPE.SIGN_UP && (
            <div className="my-3 flex justify-between text-sm">
              <FormInputComponent
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

          <SignFormButton
            formType={formType}
            isValid={isValid}
            dirty={dirty}
            handleSubmit={handleSubmit}
          />
        </Form>
      )}
    </Formik>
  );
};

export default AuthModalForm;
