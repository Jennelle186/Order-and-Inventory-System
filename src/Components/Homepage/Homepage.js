import React from "react";

import Header from "../Header/Header";
import OrderReport from "../OrderTable/today";

import { Grid } from "@mui/material";

const Homepage = () => {
  return (
    <>
      <Header />
      <Grid style={{ padding: "1rem" }}>
        <OrderReport />
      </Grid>
    </>
  );
};

export default Homepage;
