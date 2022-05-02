import React from "react";

import Header from "../Header/Header";
import OrderReport from "../OrderTable/today";
import BoxDashboards from "../BoxDashboard/BoxDashboard";

import { Grid, Button } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import pdf from "../../assets/User-Manual.pdf";

const Homepage = () => {
  return (
    <>
      <Header />

      <Grid style={{ padding: "1rem" }}>
        {/* sample is logo picture, change this to pdf */}

        <a href={pdf} target="_blank" style={{ textDecoration: "none" }}>
          <Button variant="outlined" startIcon={<MenuBookIcon />}>
            User Manual
          </Button>
        </a>

        <OrderReport />
      </Grid>
    </>
  );
};

export default Homepage;
