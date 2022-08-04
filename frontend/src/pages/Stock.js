import { Divider, Heading, HStack, VStack } from "@chakra-ui/react";
import { FundamentalData, TechnicalAnalysis } from "react-tradingview-embed";
import { useParams } from "react-router";

function Stock() {
  const { stock } = useParams();
  return (
    <VStack spacing={"3"}>
      <Heading>{stock}</Heading>
      <Divider width={'80%'} />
      <HStack>
      <FundamentalData
        widgetProps={{
          theme: "dark",
          interval: "1m",
          width: 425,
          isTransparent: false,
          height: 450,
          symbol: stock,
          showIntervalTabs: true,
          locale: "en",
          colorTheme: "light",
        }}
      />      <TechnicalAnalysis
        widgetProps={{
          theme: "dark",
          interval: "1m",
          width: 425,
          isTransparent: false,
          height: 450,
          symbol: stock,
          showIntervalTabs: true,
          locale: "en",
          colorTheme: "light",
        }}
      />
      </HStack>
      
      ;
    </VStack>
  );
}

export default Stock;
