import { Container, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { MainPage } from "./pages/main";
import { SkillPage } from "./pages/skill";
import theme from "./theme/theme";
import { URL } from "./types/types";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container sx={{ py: 8 }} maxWidth={false}>
        <Routes>
          <Route path={URL.MAIN} element={<MainPage />} />
          <Route path={URL.SKILL} element={<SkillPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
