import { Avatar, Button, Wrap, WrapItem } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LogIn from "./auth_pages/LogIn";
import SignUp from "./auth_pages/SignUp";
import Sidebar from "./layout/Sidebar";
import Deposit from "./pages/Deposit";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Settings from "./pages/Settings";

import { UserContext } from "./user-context/UserContext";

import Profile from "./pages/Profile";

function App() {
  const [user, setUser] = useState(null);

  const _user = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <UserContext.Provider value={_user}>
        <Sidebar>
          <Wrap justify={"right"}>
            {user ? (
              <WrapItem>
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              </WrapItem>
            ) : (
              <>
                <WrapItem>
                  <Button as={Link} to="/login" bgColor="green.600">
                    Log In
                  </Button>
                </WrapItem>
                <WrapItem>
                  <Button as={Link} to="/signup" bgColor="red.600">
                    Sign Up
                  </Button>
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

            <Route path="profile/:name" element={<Profile />} />
          </Routes>
        </Sidebar>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
