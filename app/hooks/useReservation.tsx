import { useState } from "react";
import axios from "axios";

interface useReservationProps {
  slug: string;
  partySize: string;
  day: string;
  time: string;
  bookerFirstName: string;
  bookerLastName: string;
  bookerPhone: string;
  bookerEmail: string;
  bookerOccasion?: string;
  bookerRequest?: string;
  setBookingSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const useReservation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReservation = async ({
    slug,
    partySize,
    day,
    time,
    bookerFirstName,
    bookerLastName,
    bookerPhone,
    bookerEmail,
    bookerOccasion,
    bookerRequest,
    setBookingSuccess,
  }: useReservationProps) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/restaurant/${slug}/reserve`,
        {
          bookerFirstName,
          bookerLastName,
          bookerPhone,
          bookerEmail,
          bookerOccasion,
          bookerRequest,
        },
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );

      setLoading(false);
      setBookingSuccess(true);
      return response.data;
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return { loading, error, createReservation };
};

export default useReservation;
