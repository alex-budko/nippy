import {
  Avatar,
  Box,
  Button,
  useColorMode,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LogIn from "./auth_pages/LogIn";
import SignUp from "./auth_pages/SignUp";
import Sidebar from "./layout/Sidebar";
import Deposit from "./pages/Deposit";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Settings from "./pages/Settings";

import { ChatIcon, CloseIcon } from "@chakra-ui/icons";

import { UserContext } from "./user-context/UserContext";

import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import Stock from "./pages/Stock";
import { TickerTape } from "react-tradingview-embed";
import Chat from "./chat/Chat";
import Privacy from "./pages/settings/Privacy";

function App() {

  const [T, setT] = useState(
    <TickerTape
      widgetProps={{
        border: "3px solid black",
        showSymbolLogo: true,
        colorTheme: "dark",
        isTransparent: false,
        displayMode: "regular",
        locale: "en",
      }}
    />
  );

  const T_ = useCallback(() => {
    return T;
  }, [T, setT]);

  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : { username: "", email: "", money: 0, stocks: {} }
  );

  const [showChat, setShowChat] = useState(false);

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
            <Box minW={"92%"} zIndex="2">
              <T_ />
            </Box>

            {user.username !== "" ? (
              <WrapItem _hover={{ cursor: "pointer" }}>
                <Avatar
                  mb={"2"}
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
            <Route path="privacy" element={<Privacy />} />
            <Route path="explore" element={<Explore />} />
            <Route path="settings" element={<Settings />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<LogIn />} />
            <Route path="stock/:stock" element={<Stock />} />
            <Route path="profile/:username" element={<Profile />} />
          </Routes>
        </Sidebar>
        <Wrap style={{zIndex: 5}} position={"fixed"} bottom="10" right="10" justify={"right"}>
          <Button
            w="50px"
            h="40px"
            as={!showChat ? ChatIcon : CloseIcon}
            onClick={() => setShowChat(!showChat)}
          />
          {showChat && <Chat />}
        </Wrap>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
