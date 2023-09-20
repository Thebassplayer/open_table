import { Time, convertToDisplayTime } from "@/utils/convertToDisplayTime";
import moment from "moment";

interface HeaderProps {
  image: string;
  name: string;
  date: string;
  partySize: string;
}

const Header = ({ image, name, date, partySize }: HeaderProps): JSX.Element => {
  const [day, time] = date.split("T");

  const formattedDate = moment(day).format("ddd, MMM DD");
  console.log(formattedDate);
  return (
    <div>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img src={image} alt="" className="w-32 h-18 rounded" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{formattedDate}</p>
            <p className="mr-6">{convertToDisplayTime(time as Time)}</p>
            <p className="mr-6">{`${partySize} ${
              +partySize === 1 ? "person" : "people "
            }`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
