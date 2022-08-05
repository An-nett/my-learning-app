import { Container, ThemeProvider } from "@mui/material";
import { Header } from "./components/Header/Header";
// import { MainPage } from "./pages/main";
import { SkillPage } from "./pages/skill";
import theme from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container sx={{ py: 8 }}>
        {/* <MainPage /> */}
        <SkillPage />
      </Container>
    </ThemeProvider>
  );
}

export default App;
