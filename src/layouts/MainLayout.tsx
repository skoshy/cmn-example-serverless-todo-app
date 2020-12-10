import React from "react";
import Head from "next/head";
import { Grommet } from "grommet";
import { grommetTheme } from "src/styles";
import { SITE_NAME } from "src/constants";
import { cc } from "src/lib";
import { Grid } from "src/components/_helpers_/Grid";

const MainLayout = ({ pageTitle = SITE_NAME, children, className = "" }) => (
  <Grommet theme={grommetTheme}>
    <Head>
      {<title>{pageTitle ?? ""}</title>}
      <link
        href="https://fonts.googleapis.com/css?family=Karla:wght@400;700&amp;display=swap"
        rel="stylesheet"
      />
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>

    <Grid
      className={cc([
        "border-blue-400 border shadow-md p-8 m-8 h-full",
        className,
      ])}
    >
      {children}
    </Grid>
  </Grommet>
);

export default MainLayout;
