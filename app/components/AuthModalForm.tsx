"use client";
import { useState } from "react";
import { AUTH_BUTTON_AND_MODAL_TYPE } from "./AuthButtonAndModal";

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

  let formContent = null;

  switch (authButtonAndModalType) {
    case AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN:
      formContent = (
        <>
          <div className="my-3 flex justify-between text-sm">
            <input
              name={"email"}
              className="border rounded p-2 py-3 w-full"
              type="email"
              placeholder="Email"
              value={inputs.email}
              onChange={handleChangeInput}
            />
          </div>
          <div className="my-3 flex justify-between text-sm">
            <input
              name={"password"}
              className="border rounded p-2 py-3 w-full"
              type="password"
              placeholder="Password"
              value={inputs.password}
              onChange={handleChangeInput}
            />
          </div>
          <button className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400">
            Sign In
          </button>
        </>
      );
      break;
    case AUTH_BUTTON_AND_MODAL_TYPE.SIGN_UP:
      formContent = (
        <>
          <div className="my-3 flex justify-between text-sm">
            <input
              name={"firstName"}
              className="border rounded p-2 py-3 w-[49%]"
              type="text"
              placeholder="First Name"
              value={inputs.firstName}
              onChange={handleChangeInput}
            />
            <input
              name={"lastName"}
              className="border rounded p-2 py-3 w-[49%]"
              type="text"
              placeholder="Last Name"
              value={inputs.lastName}
              onChange={handleChangeInput}
            />
          </div>
          <div className="my-3 flex justify-between text-sm">
            <input
              name={"email"}
              className="border rounded p-2 py-3 w-full"
              type="email"
              placeholder="Email"
              value={inputs.email}
              onChange={handleChangeInput}
            />
          </div>
          <div className="my-3 flex justify-between text-sm">
            <input
              name={"phone"}
              className="border rounded p-2 py-3 w-[49%]"
              type="text"
              placeholder="Phone"
              value={inputs.phone}
              onChange={handleChangeInput}
            />
            <input
              name={"city"}
              className="border rounded p-2 py-3 w-[49%]"
              type="text"
              placeholder="City"
              value={inputs.city}
              onChange={handleChangeInput}
            />
          </div>
          <div className="my-3 flex justify-between text-sm">
            <input
              name={"password"}
              className="border rounded p-2 py-3 w-full"
              type="password"
              placeholder="Password"
              value={inputs.password}
              onChange={handleChangeInput}
            />
          </div>
          <button className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400">
            Create Account
          </button>
        </>
      );
      break;
  }

  return (
    <div>
      <form>{formContent}</form>
    </div>
  );
};

export default AuthModalForm;
