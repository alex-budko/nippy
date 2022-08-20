import axios from "axios";

export const update_stocks = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    success: "true",
  });
  try {
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/market/update_stock_data/`,
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
