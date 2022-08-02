import axios from "axios";

export const signup = async (username, email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    username,
    email,
    password,
  });

  let user = null;

  try {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/market/users/`, body, config)
      .then((res) => {
        console.log(res)

        const user_data = res.data

        user = {
          username: user_data["username"],
          email: user_data["email"],
          money: user_data["money"],
        };
        localStorage.setItem("user", JSON.stringify(user));
      });

    return user
    
  } catch (err) {
    return { error: err };
  }
};
