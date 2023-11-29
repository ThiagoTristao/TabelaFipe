import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Typography variant="h4">TABELA FIPE</Typography>
        <Typography variant="h5">Consulte o valor de um veiculo de forma gratuita</Typography>
      </Box>
    </>
  );
}