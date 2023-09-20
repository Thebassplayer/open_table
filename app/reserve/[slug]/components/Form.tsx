"use client";
import { useEffect, useState } from "react";

const Form = (): JSX.Element => {
  const [inputs, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerPhoneNumber: "",
    bookerEmail: "",
    bookerOccasion: "",
    bookerRequest: "",
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerPhoneNumber &&
      inputs.bookerEmail
    ) {
      return setDisabled(false);
    } else {
      return setDisabled(true);
    }
  }, [inputs]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      <input
        name="bookerFirstName"
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="First name"
        onChange={handleChangeInput}
        value={inputs.bookerFirstName}
      />
      <input
        name="bookerLastName"
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Last name"
        onChange={handleChangeInput}
        value={inputs.bookerLastName}
      />
      <input
        name="bookerPhoneNumber"
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Phone number"
        onChange={handleChangeInput}
        value={inputs.bookerPhoneNumber}
      />
      <input
        name="bookerEmail"
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Email"
        onChange={handleChangeInput}
        value={inputs.bookerEmail}
      />
      <input
        name="bookerOccasion"
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Occasion (optional)"
        onChange={handleChangeInput}
        value={inputs.bookerOccasion}
      />
      <input
        name="bookerRequest"
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Requests (optional)"
        onChange={handleChangeInput}
        value={inputs.bookerRequest}
      />
      <button
        disabled={disabled}
        className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
      >
        Complete reservation
      </button>
      <p className="mt-4 text-sm">
        By clicking “Complete reservation” you agree to the
        CafecitosDeBarrio.com Terms of Use and Privacy Policy. Standard text
        message rates may apply. You may opt out of receiving text messages at
        any time.
      </p>
    </div>
  );
};

export default Form;
