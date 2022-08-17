import axios from "axios";

export const return_stock = async (username, stock_name, quantity, setUser) => {
  try {
    let user = null;
    let stock_price = 0;

    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/market/users/${username}/`)
      .then((res) => {
        user = res.data;
      });
    
    //if stock is not owed, no need to return
    if (!(stock_name in user.shorted_stocks) || user.shorted_stocks[stock_name] === 0) return 

    user.shorted_stocks[stock_name] -= +quantity;

    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/market/stock/${stock_name}/`)
      .then((res) => {
        stock_price = res.data.price;
      });

    user.money -= stock_price * +quantity;

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
