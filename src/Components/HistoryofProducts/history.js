import React from "react";
import MUIDataTable from "mui-datatables";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme, Stack, Grid } from "@mui/material";
import ButtonForm from "../Button/ButtonForm";

const History = (props) => {
  const { state } = useLocation(); //document ID here & not sure with this yet
  const navigate = useNavigate();
  console.log(state, "document ID");

  const columns = [
    {
      name: "cat",
      label: "Category",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      // name: "cat",
      label: "Product Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      // name: "cat",
      label: "Size",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      // name: "cat",
      label: "Color & Stocks",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      // name: "cat",
      label: "Price",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      // name: "cat",
      label: "Date Created",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const options = {
    filter: true,
    selectableRows: "none",
    responsive: "simple",
  };
  return (
    <div>
      <Grid style={{ padding: "1rem" }}>
        <Stack direction="row" justifyContent="start">
          <Grid item xs={1}>
            <ButtonForm onClick={() => navigate(-1)}>go back</ButtonForm>
          </Grid>{" "}
        </Stack>

        <ThemeProvider theme={createTheme()}>
          <MUIDataTable title={"History"} options={options} columns={columns} />
        </ThemeProvider>
      </Grid>
    </div>
  );
};

export default History;
