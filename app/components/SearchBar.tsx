"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = (): JSX.Element => {
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (location === "") return;
    const path = location.toString().toLocaleLowerCase().trim();
    router.push(`/search?location=${path}`);
    setLocation("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="text-left text-lg py-3 m-auto flex justify-center">
      <input
        className="rounded  mr-3 p-2 w-[450px]"
        type="text"
        placeholder="State, city or town"
        value={location}
        onChange={e => setLocation(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        className="rounded bg-red-600 px-9 py-2 text-white"
        onClick={handleSearch}
      >
        Let's go
      </button>
    </div>
  );
};

export default SearchBar;
