import React from "react";
import renderTitleFromSlug from "@/app/utils/renderTitleFromSlug";

const Header = ({ name }: { name: string }): JSX.Element => {
  const headerTitle = renderTitleFromSlug(name);

  return (
    <div className="h-96 overflow-hidden">
      <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
        <h1 className="text-7xl text-white captitalize text-shadow text-center">
          {headerTitle}
        </h1>
      </div>
    </div>
  );
};

export default Header;
