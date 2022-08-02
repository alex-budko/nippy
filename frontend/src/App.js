import { Avatar, Button, useColorMode, Wrap, WrapItem } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
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
import Leaderboard from "./pages/Leaderboard";

function App() {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : { username: "", email: "", money: 0, stocks: {} }
  );

  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === "light") {
      toggleColorMode();
    }
  });

  const _user = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <UserContext.Provider value={_user}>
        <Sidebar>
          <Wrap justify={"right"}>
            {user.username !== "" ? (
              <WrapItem _hover={{ cursor: "pointer" }}>
                <Avatar
                mb={'2'}
                  as={Link}
                  to={`/profile/${user.username}`}
                  name={`${user.username}`}
                />
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
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<LogIn />} />

            <Route path="profile/:username" element={<Profile />} />
          </Routes>
        </Sidebar>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
