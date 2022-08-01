import axios from "axios";

export const get_profile = async (username) => {
  try {
    let user = null;
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/market/users/${username}/`)
      .then((res) => {
        user = res;
      });
    return user;
  } catch (err) {
    return { error: err };
  }
};
