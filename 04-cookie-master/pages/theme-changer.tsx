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
} from "@mui/material";
import Cookies from "js-cookie";

import { Layout } from "../components/layouts";

interface Props {
  theme: string;
}

const ThemeChangerPage: NextPage<Props> = (props) => {
  const [currentTheme, setCurrentTheme] = useState(props.theme);

  const onThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value;

    console.log({ selectedTheme });

    setCurrentTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    Cookies.set("theme", selectedTheme);
  };

  useEffect(() => {
    console.log("LocalStorage: ", localStorage.getItem("theme"));
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

  return {
    props: {
      theme,
    },
  };
};
export default ThemeChangerPage;
