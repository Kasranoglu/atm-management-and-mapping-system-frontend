import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Welcome from "./pages/welcome";
import About from "./pages/about";
import Map from "./pages/map";
import CreateAtm from "./pages/createAtm";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/about" element={<About />} />
          <Route path="/map" element={<Map />} />
          <Route path="/create-atm" element={<CreateAtm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
