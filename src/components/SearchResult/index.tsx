import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Typography,
} from "@mui/material";
import { MyContext } from "@/context/context";
import { getFipeInfo } from "@/services/api";

export default function SearchResult() {
  const { fipeForm, loading, setLoading, setStep } = useContext(MyContext);
  const { setValue, getValues } = fipeForm;
  const [fipeInfo, setFipeInfo] = useState<any>("");

  const handleNewConsult = () => {
    setValue("selectedBrand", "");
    setValue("selectedModel", "");
    setValue("selectedYear", "");
    setValue("brandCode", "");
    setValue("modelCode", "");
    setValue("yearCode", "");
    setStep("fipePage");
  };

  const fetchFipeInfos = async () => {
    setLoading(true);
    try {
      const resp = await getFipeInfo(
        getValues("brandCode"),
        getValues("modelCode"),
        getValues("yearCode")
      );
      setFipeInfo(resp.data);
    } catch {
      console.log("errr");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFipeInfos();
  }, []);

  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <Card sx={{ minWidth: "100%", backgroundColor: "#DCF5F2", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
          <CardContent>
            <Typography variant="h5" fontWeight={"bold"}>
              Tabela Fipe: Preço {getValues("selectedModel")}{" "}
              {getValues("selectedYear")}
            </Typography>
            <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
        >
            <Chip
              label={
                <Typography variant="h6" fontWeight={"bold"} color={"white"}>
                  {fipeInfo?.price}
                </Typography>
              }
              sx={{backgroundColor: "lightseagreen", marginTop: "2%", marginBottom: "2%"}}
            />
            <Typography color={"darkgray"} variant="subtitle2">
              Este é o preço de compra do veículo
            </Typography>
            </Box>
          </CardContent>
          <Button size="large" variant="contained" onClick={handleNewConsult} sx={{color: "white", marginBottom: "1%"}}>
            Nova Consulta
          </Button>
      </Card>
    );
  }
}
