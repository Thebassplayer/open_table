import React from "react";

const UserAvatar = ({
  userInitials,
}: {
  userInitials: string;
}): JSX.Element => {
  return (
    <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
      <h2 className="text-white text-2xl">{userInitials}</h2>
    </div>
  );
};

export default UserAvatar;
