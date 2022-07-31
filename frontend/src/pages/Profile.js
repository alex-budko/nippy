import React, { useContext } from "react";
import { UserContext } from "../user-context/UserContext";

function Profile() {
  const { user } = useContext(UserContext);
  const {username, email, password} = user

  return <div>{username}</div>;
}

export default Profile;
