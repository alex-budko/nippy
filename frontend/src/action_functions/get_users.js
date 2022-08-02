import axios from "axios";

export const get_users = async () => {
  try {
    let users = null;
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/market/users/`)
      .then((res) => {
        users = res;
      });
    return users.data;
  } catch (err) {
    return { error: err };
  }
};
