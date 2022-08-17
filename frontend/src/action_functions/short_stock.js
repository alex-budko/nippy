import axios from "axios";

export const short_stock = async (
  username,
  stock_name,
  stock_price,
  quantity = 1,
  setUser
) => {
  try {
    let user = null;
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/market/users/${username}/`)
      .then((res) => {
        user = res.data;
      });

    if (stock_name in user.shorted_stocks) {
      user.shorted_stocks[stock_name] =
        +user.shorted_stocks[stock_name] + +quantity;
    } else {
      user.shorted_stocks[stock_name] = +quantity;
    }
    user.money += stock_price * +quantity;
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);

    await axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/market/users/${username}/`,
        user
      )
      .then((res) => {
        return res;
      });
  } catch (err) {
    return err;
  }
};
