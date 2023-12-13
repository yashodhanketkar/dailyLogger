import {
  Box,
  Container,
  CssBaseline,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { Header } from "../components/ui";
import { theme } from "../contexts/theme";
import { PageRouter } from "../routes";

export const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters maxWidth={false}>
        <CssBaseline />
        <Stack justifyContent={"space-between"} direction={"column"}>
          <Header />
          <Box marginBottom={"auto"} padding={2}>
            <PageRouter />
          </Box>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};
