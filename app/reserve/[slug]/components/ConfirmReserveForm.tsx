"use client";
import FormInputComponent from "@/app/components/AuthComponents/FormInputComponent";
import useReservation from "@/app/hooks/useReservation";
import reserveSchema, { ReserveFormValues } from "@/schemas/reserve.schema";
import { CircularProgress } from "@mui/material";
import { Formik, Form } from "formik";
import { useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";

interface ConfirmReserveFormProps {
  slug: string;
  partySize: string;
  date: string;
}

const ConfirmReserveForm = ({
  slug,
  partySize,
  date,
}: ConfirmReserveFormProps): JSX.Element => {
  const [day, time] = date.split("T");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const initialValues: ReserveFormValues = {
    bookerFirstName: "",
    bookerLastName: "",
    bookerPhone: "",
    bookerEmail: "",
    bookerOccasion: "",
    bookerRequest: "",
  };

  const { error, loading, createReservation } = useReservation();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(reserveSchema)}
      onSubmit={async values => {
        const reservation = await createReservation({
          slug,
          partySize,
          day,
          time,
          ...values,
          setBookingSuccess,
        });
        console.log(reservation);
      }}
    >
      {({ errors, touched, isValid, dirty }) => (
        <Form>
          <div className="grid grid-cols-2 gap-x-4 mt-10">
            <FormInputComponent
              name="bookerFirstName"
              type="text"
              placeholder="First Name"
              errors={errors}
              touched={touched}
              tooltipPlacement="left"
              disabled={bookingSuccess}
            />
            <FormInputComponent
              name="bookerLastName"
              type="text"
              placeholder="Last Name"
              errors={errors}
              touched={touched}
              tooltipPlacement="right"
              disabled={bookingSuccess}
            />
            <FormInputComponent
              name="bookerPhone"
              type="text"
              placeholder="Phone"
              errors={errors}
              touched={touched}
              tooltipPlacement="left"
              disabled={bookingSuccess}
            />
            <FormInputComponent
              name="bookerEmail"
              type="email"
              placeholder="Email"
              errors={errors}
              touched={touched}
              tooltipPlacement="right"
              disabled={bookingSuccess}
            />
            <FormInputComponent
              name="bookerOccasion"
              type="text"
              placeholder="Occasion (optional)"
              errors={errors}
              touched={touched}
              tooltipPlacement="right"
              disabled={bookingSuccess}
            />
            <FormInputComponent
              name="bookerRequest"
              type="text"
              placeholder="Request (optional)"
              errors={errors}
              touched={touched}
              tooltipPlacement="right"
              disabled={bookingSuccess}
            />
          </div>
          {bookingSuccess ? (
            <button
              disabled={bookingSuccess}
              className="bg-green-600 w-full p-3 text-white font-bold rounded"
            >
              Your reservation was successful!
            </button>
          ) : (
            <button
              type="submit"
              disabled={!isValid || !dirty || loading}
              className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
            >
              {loading ? (
                <CircularProgress color="inherit" />
              ) : (
                "Complete reservation"
              )}
            </button>
          )}

          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the
            CafecitosDeBarrio.com Terms of Use and Privacy Policy. Standard text
            message rates may apply. You may opt out of receiving text messages
            at any time.
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default ConfirmReserveForm;
