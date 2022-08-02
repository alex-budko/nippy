export const logout = async (setUser) => {
  localStorage.removeItem("user");
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  setUser({ username: "", email: "", money: 0, stocks: {} });
};
