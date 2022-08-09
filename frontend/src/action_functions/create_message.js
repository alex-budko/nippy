import axios from "axios";

export const create_message = async (username, text) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    user: username,
    text,
  });
  try {
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/market/message/`,
        body,
        config
      )
      .then((res) => {
        return res;
      });
  } catch (err) {
    return { error: err };
  }
};
