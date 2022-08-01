import axios from "axios";

export const sell_stock = async (username, stock_name, setUser) => {
  try {
    let user = null;
    let stock_price = 0;

    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/market/users/${username}/`)
      .then((res) => {
        user = res.data;
      });
    user.stocks[stock_name] -= 1;
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/market/stock/${stock_name}/`)
      .then((res) => {
        stock_price = res.data.price;
      });

    user.money += stock_price

    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);

    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/market/users/${username}/`,
      user
    );
    return user;
  } catch (err) {
    return err;
  }
};
