import axios from "axios";

export const get_messages = async () => {
  try {
    let messages = [];
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/market/messages/`)
      .then((res) => {
        messages = res.data;
      });
    return messages;
  } catch (err) {
    return { error: err };
  }
};
