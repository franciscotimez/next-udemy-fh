import React, { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import {
  Card,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";

import { Layout } from "../components/layouts";

interface Props {
  theme: string;
}

const ThemeChangerPage: NextPage<Props> = ({ theme }) => {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const onThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value;

    console.log({ selectedTheme });

    setCurrentTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    Cookies.set("theme", selectedTheme);
  };

  const onClick = async () => {
    const { data } = await axios.get("/api/hello");
    console.log({ data });
  };

  useEffect(() => {
    console.log("LocalStorage: ", localStorage.getItem("theme"));
    console.log("Cookies: ", Cookies.get("theme"));
  }, []);

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Tema</FormLabel>
            <RadioGroup value={currentTheme} onChange={onThemeChange}>
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="light"
              />
              <FormControlLabel value="dark" control={<Radio />} label="dark" />
              <FormControlLabel
                value="custom"
                control={<Radio />}
                label="custom"
              />
            </RadioGroup>
          </FormControl>

          <Button onClick={onClick}>Solicitud</Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { theme = "light" } = req.cookies;
  console.log({ theme });

  const validThemes = ["light", "dark", "custom"];
  return {
    props: {
      theme: validThemes.includes(theme) ? theme : "dark",
    },
  };
};
export default ThemeChangerPage;
