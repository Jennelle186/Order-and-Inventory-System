import React from "react";
import { Stack, Button, Grid, ThemeProvider, createTheme } from "@mui/material";
import { Link } from "react-router-dom";
import ProductTable from "../../Components/ProductTable/ProductTable";

import History from "../../Components/HistoryofProducts/history";

const ProductsPage = () => {
  return (
    <div>
      <Grid style={{ padding: "1rem" }}>
        <Stack direction="row" justifyContent="end">
          <Link
            to="/add-products"
            style={{ textDecoration: "none", marginRight: "1rem" }}
          >
            <Button variant="outlined" color="primary">
              Add Product
            </Button>
          </Link>

          <Link to="/category" style={{ textDecoration: "none" }}>
            <Button variant="outlined" color="secondary">
              Category
            </Button>
          </Link>
        </Stack>{" "}
        <ThemeProvider theme={createTheme()}>
          {" "}
          <ProductTable />
        </ThemeProvider>
        {/* <History /> */}
      </Grid>
    </div>
  );
};

export default ProductsPage;
