import React, { useState, useEffect } from "react";
import {
  Container,
  List,
  ListItemText,
  Stack,
  Card,
  Typography,
  Grid,
  ListItemIcon,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import MUIDataTable from "mui-datatables";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const StocksAlert = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleRowClick = (rowData, rowMeta) => {
    navigate("/edit-products", { state: rowData[0] });
  };

  const options = {
    filter: true,
    selectableRows: "none",
    onRowClick: handleRowClick,
    download: false,
    responsive: "standard",
  };

  const columns = [
    {
      name: "id",
      label: "System ID",
      options: {
        filter: false,
        sort: true,
        display: false,
      },
    },
    {
      name: "cat",
      label: "Category",
      options: {
        filter: true,
        sort: true,
        display: true,
      },
    },
    {
      name: "size",
      label: "Size",
      options: {
        filter: true,
        sort: true,
        display: true,
      },
    },
    {
      name: "prodName",
      label: "Product Name",
      options: {
        filter: true,
        sort: true,
        display: true,
      },
    },
    {
      name: "colorMap",
      label: "Color & Stocks",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return Object.entries(value).map(([key, value]) => {
            return (
              <p key={key}>
                {key} - {value} pieces
              </p>
            );
          });
        },
      },
    },
  ];

  return (
    <Container>
      {/* <Typography variant="subtitle1">Products that need restocking</Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {state &&
          state.map((item, i) => {
            const obj = item.colorMap;

            for (let x in obj) {
              if (obj[x] < 10) {
                return (
                  <Grid item xs={2} sm={4} md={4} key={i}>
                    <Stack direction="row" spacing={2}>
                      <Typography>
                        {item.prodName} {item.size}
                      </Typography>
                      <Typography variant="subtitle">({item.cat})</Typography>
                      <ListItemIcon>
                        <ArrowForwardIcon
                          onClick={(e) =>
                            navigate("/edit-products", { state: item.id })
                          }
                          sx={{
                            ":hover": {
                              color: " green", // theme.shadows[20]
                            },
                          }}
                        />
                      </ListItemIcon>
                    </Stack>
                    {Object.entries(item.colorMap).map((color) => (
                      <>
                        {color[1] < 10 && (
                          <>
                            <ListItemText
                              secondary={`${color[0]} - ${color[1]}pcs`}
                            />
                          </>
                        )}
                      </>
                    ))}
                  </Grid>
                );
              }
            }
          })}
      </Grid> */}

      <div style={{ marginTop: "1.5rem", margin: "12px" }}>
        <ThemeProvider theme={createTheme()}>
          <MUIDataTable
            title={"Products for Restocks"}
            options={options}
            data={state}
            columns={columns}
          />
        </ThemeProvider>
      </div>
    </Container>
  );
};

export default StocksAlert;
