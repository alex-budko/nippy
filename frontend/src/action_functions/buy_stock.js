import axios from "axios";

export const buy_stock = async (
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
    if (user.money - stock_price * quantity < 0) {
      throw "not_enough_money"
    }
    if (stock_name in user.stocks) {
      user.stocks[stock_name] += quantity;
    } else {
      user.stocks[stock_name] = quantity;
    }
    user.money -= stock_price * quantity;

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
