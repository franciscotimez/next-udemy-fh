import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { CssBaseline, ThemeProvider, Theme } from "@mui/material";
import { darkTheme, lightTheme, customTheme } from "../themes";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const themes: { [any: string]: Theme } = {
  dark: darkTheme,
  light: lightTheme,
  custom: customTheme,
};

function MyApp({ Component, pageProps }: AppProps) {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  useEffect(() => {
    const cookieTheme = Cookies.get("theme") || "light";
    const selectedTheme = themes[cookieTheme];
    setCurrentTheme(selectedTheme);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// // Deshabilita la optimizacion estatica, TRATAR DE NO USAR, tambien se puede usar por page
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const { theme } = appContext.ctx.req
//     ? (appContext.ctx.req as any).cookies
//     : { theme: "light" };

//   const validThemes = ["light", "dark", "custom"];

//   // console.log("GetInitialProps", { theme });

//   return {
//     theme: validThemes.includes(theme) ? theme : "dark",
//   };
// };

export default MyApp;
