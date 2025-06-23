import { createTheme } from "@mui/material/styles";

const temaSerasa = createTheme({
  palette: {
    primary: {
      main: "#eaf6e9", // pra mudar a cor do menu
    },
    secondary: {
      main: "#ff6600", // laranja Serasa 
    },
    background: {
      default: "#f5f7fa",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default temaSerasa;
