import axios from "axios";
import jwt_decode from "jwt-decode";

export const login = async (email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    email,
    password,
  });

  let user = null;

  try {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/token/`, body, config)
      .then((res) => {
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);

        const user_data = jwt_decode(res.data.access);

        user = {
          username: user_data["username"],
          email: user_data["email"],
          money: user_data["money"],
          stocks: user_data["stocks"],
          shorted_money: user_data["shorted_money"],
          shorted_stocks: user_data["shorted_stocks"],
        };
        localStorage.setItem("user", JSON.stringify(user));
      });

    return user
    
  } catch (err) {
    return { error: err };
  }
};
