import { Container, Grid, ThemeProvider } from "@mui/material";
import { CardMainPage } from "./components/Card/Card";
import { Header } from "./components/Header/Header";
import theme from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container sx={{ pt: 8 }} maxWidth={false}>
        <Grid
          container
          columns={3}
          sx={{ width: "80%", margin: "auto" }}
          gap={3.5}
        >
          <Grid item xs={1}>
            <CardMainPage title="Example Title" />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
