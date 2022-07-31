import { Container, Grid, ThemeProvider } from "@mui/material";
import { CardMainPage } from "./components/Card/Card";
import { CardColumn } from "./components/CardColumn/CardColumn";
import { Header } from "./components/Header/Header";
import theme from "./theme/theme";
import { PriorityTypes, TimeVariants } from "./types/types";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container sx={{ py: 8 }}>
        <Grid container spacing={3} justifyContent="center">
          <CardColumn time={TimeVariants.past}>
            <CardMainPage
              title="Example Title"
              time={TimeVariants.past}
              date={Date.now()}
              priority={PriorityTypes.high}
            />
            <CardMainPage
              title="Example Title"
              time={TimeVariants.past}
              date={Date.now()}
              priority={PriorityTypes.medium}
            />
          </CardColumn>
          <CardColumn time={TimeVariants.now}>
            <CardMainPage
              title="Example Title"
              time={TimeVariants.now}
              date={Date.now()}
              priority={PriorityTypes.low}
            />
          </CardColumn>
          <CardColumn time={TimeVariants.future}></CardColumn>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
