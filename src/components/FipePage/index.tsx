import Head from "next/head";
import Header from "@/components/Header";
import FipeTable from "@/components/FipeTable";
import { Box } from "@mui/material";
import { MyContext } from "@/context/context";
import React, { useContext } from "react";
import SearchResult from "@/components/SearchResult";

export default function FipePage() {
  const { step } = useContext(MyContext);
  return (
    <>
      <Head>
        <title>FIPE</title>
      </Head>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Box width={step === "searchResult" ? "100%" : null}>
          {step === "fipePage" && (
            <>
              <Header />
              <FipeTable />
            </>
          )}
          {step === "searchResult" && <SearchResult />}
        </Box>
      </Box>
    </>
  );
}
