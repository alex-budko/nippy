import axios from "axios";

export const get_stocks = async () => {
  try {
    let data = []
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/market/stocks/`)
      .then((res) => {
        data = res.data
      });
    return data
  } catch (err) {
    return { error: err };
  }
};
