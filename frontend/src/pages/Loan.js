import {
    Box,
    Button,
    Center,
    Divider,
    Heading,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    VStack,
    Wrap,
    WrapItem,
  } from "@chakra-ui/react";
  import React, { Fragment, useContext, useEffect, useState } from "react";
  
  //trading view widget
  import { SingleTicker } from "react-tradingview-embed";
  
  import { buy_stock } from "../action_functions/buy_stock";
  import NotAuthenticated from "../auth_pages/NotAuthenticated";
  import { UserContext } from "../user-context/UserContext";
  import { moneyConvert } from "../utils/moneyConvert";
  import { get_stocks } from "../action_functions/get_stocks";
  import { sell_stock } from "../action_functions/sell_stock";


function Loan() {
  return (
    <>Empty</>
  )
}

export default Loan