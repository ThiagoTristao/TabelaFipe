import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  Box,
  FormHelperText,
  Snackbar,
} from "@mui/material";
import { MyContext } from "@/context/context";
import { getBrands, getModels, getYears } from "@/services/api";
import { Controller } from "react-hook-form";

export default function FipeTable() {
  const { fipeForm, loading, setLoading, setStep } = useContext(MyContext);
  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    clearErrors,
    formState: { errors },
  } = fipeForm;
  const [brands, setBrands] = useState();
  const [models, setModels] = useState();
  const [years, setYears] = useState();
  const [showToast, setShowToast] = useState(false);

  const handleSetBrand = async (event:any) => {
    const value = event.target.value;
    setValue("selectedBrand", value);
    clearErrors("selectedBrand");
    setValue("selectedModel", "");
    setValue("selectedYear", "");
    setValue("modelCode", "");
    setValue("yearCode", "");
    const brandCode = await findBrand(value);
    setValue("brandCode", brandCode);
    fetchGetModels(getValues("brandCode"));
  };

  const handleSetModel = async (event:any) => {
    const value = event.target.value;
    setValue("selectedModel", value);
    clearErrors("selectedModel");
    setValue("selectedYear", "");
    setValue("yearCode", "");
    const modelCode = await findModel(value);
    setValue("modelCode", modelCode);
    fetchGetYears(getValues("brandCode"), getValues("modelCode"));
  };

  const handleSetYear = async (event:any) => {
    const value = event.target.value;
    setValue("selectedYear", value);
    const yearCode = await findYear(value);
    setValue("yearCode", yearCode);
    clearErrors("selectedYear");
  };

  const findBrand = async (value:string) => {
    const index = brands.findIndex((element:any) => element.name === value);
    return brands[index].code;
  };

  const findModel = async (value:string) => {
    const index = models.findIndex((element:any) => element.name === value);
    return models[index].code;
  };

  const findYear = async (value:string) => {
    const index = years.findIndex((element:any) => element.name === value);
    return years[index].code;
  };

  const onSubmit = () => setStep("searchResult");

  const fetchGetBrands = async () => {
    setLoading(true);
    try {
      const resp = await getBrands();
      setBrands(resp.data);
    } catch {
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchGetModels = async (brandCode: string) => {
    setLoading(true);
    try {
      const resp = await getModels(brandCode);
      setModels(resp.data);
    } catch {
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchGetYears = async (brandCode: string, modelCode: string) => {
    setLoading(true);
    try {
      const resp = await getYears(brandCode, modelCode);
      setYears(resp.data);
    } catch {
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGetBrands();
    setValue("selectedBrand", "");
    setValue("selectedModel", "");
    setValue("selectedYear", "");
    setValue("brandCode", "");
    setValue("modelCode", "");
    setValue("yearCode", "");
  }, []);

  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <>
        {showToast && (
          <Snackbar
            open={showToast}
            autoHideDuration={6000}
            message="Ocorreu um erro ao consultar os dados, por favor, tente novamente mais tarde"
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card sx={{ minWidth: "100%" }}>
            <CardContent>
              <FormControl
                fullWidth
                margin="dense"
                error={errors.selectedBrand ? true : false}
              >
                <InputLabel>Marca</InputLabel>
                <Controller
                  name="selectedBrand"
                  control={control}
                  defaultValue=""
                  render={() => (
                    <Select
                      label="Marca"
                      onChange={handleSetBrand}
                      value={getValues("selectedBrand")}
                    >
                      {brands?.map((element) => (
                        <MenuItem key={element.code} value={element.name}>
                          {element.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  rules={{ required: true }}
                />
                {errors.selectedBrand && (
                  <FormHelperText>Selecione a marca!</FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                margin="dense"
                error={errors.selectedModel ? true : false}
              >
                <InputLabel>Modelo</InputLabel>
                <Controller
                  name="selectedModel"
                  control={control}
                  defaultValue=""
                  render={() => (
                    <Select
                      label="Modelo"
                      onChange={handleSetModel}
                      value={getValues("selectedModel")}
                    >
                      {models?.map((element) => (
                        <MenuItem key={element.code} value={element.name}>
                          {element.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  rules={{ required: true }}
                />
                {errors.selectedModel && (
                  <FormHelperText>Selecione o modelo!</FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                margin="dense"
                error={errors.selectedYear ? true : false}
              >
                <InputLabel>Ano</InputLabel>
                <Controller
                  name="selectedYear"
                  control={control}
                  defaultValue=""
                  render={() => (
                    <Select
                      label="Ano"
                      onChange={handleSetYear}
                      value={getValues("selectedYear")}
                    >
                      {years?.map((element) => (
                        <MenuItem key={element.code} value={element.name}>
                          {element.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  rules={{ required: true }}
                />
                {errors.selectedYear && (
                  <FormHelperText>Selecione o ano!</FormHelperText>
                )}
              </FormControl>
            </CardContent>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <CardActions>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  type="submit"
                >
                  Consultar Preço
                </Button>
              </CardActions>
            </Box>
          </Card>
        </form>
      </>
    );
  }
}
