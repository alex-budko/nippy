import axios from "axios";

export async function send_message(name, email, message) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    name,
    email,
    message,
  });
  try {
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/market/contact/`,
      body,
      config
    );
    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}
