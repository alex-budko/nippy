import { Avatar, Button, HStack, Wrap, WrapItem } from "@chakra-ui/react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LogIn from "./auth_pages/LogIn";
import SignUp from "./auth_pages/SignUp";
import Sidebar from "./layout/Sidebar";
import Deposit from "./pages/Deposit";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Settings from "./pages/Settings";
function App() {
  let [a, setA] = useState(false);
  return (
    <Router>
      <Sidebar>
        <Wrap justify={"right"}>
          {a ? (
            <WrapItem>
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            </WrapItem>
          ) : (
            <>
              <WrapItem>
                <Button as={Link} to='/login' bgColor="green.600">Log In</Button>
              </WrapItem>
              <WrapItem>
                <Button as={Link} to='/signup' bgColor="red.600">Sign Up</Button>
              </WrapItem>
            </>
          )}
        </Wrap>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="buy" element={<Buy />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="explore" element={<Explore />} />
          <Route path="settings" element={<Settings />} />

          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />

        </Routes>
      </Sidebar>
    </Router>
  );
}

export default App;
