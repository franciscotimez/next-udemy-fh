import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "../themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { theme } = appContext.ctx.req
    ? (appContext.ctx.req as any).cookies
    : { theme: "light" };

  const validThemes = ["light", "dark", "custom"];

  console.log("GetInitialProps", { theme });

  return {
    theme: validThemes.includes(theme) ? theme : "dark",
  };
};

export default MyApp;
