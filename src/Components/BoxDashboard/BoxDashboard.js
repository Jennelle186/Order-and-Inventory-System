import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const BoxDashboards = () => {
  return (
    <Container style={{ marginTop: "1rem" }}>
      <Box sx={{ "& h1": { m: 0 } }}>
        <Grid container spacing={2} justify="flex-start">
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/Pending-Orders" style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  ":hover": {
                    boxShadow: 20, // theme.shadows[20]
                  },
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2}>
                    <PendingActionsIcon
                      style={{ color: "orange" }}
                      fontSize="large"
                    />
                    <Typography variant={"h6"} gutterBottom>
                      12 Pending Orders
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} order={{ xs: 3, sm: 2 }}>
            <Link to="/Delivered-Orders" style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  ":hover": {
                    boxShadow: 20, // theme.shadows[20]
                  },
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2}>
                    <LocalShippingIcon color="success" fontSize="large" />
                    <Typography variant={"h6"} gutterBottom>
                      12 Delivered Orders
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} order={{ xs: 2, sm: 3 }}>
            <Card>
              <h1>{1}</h1>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default BoxDashboards;
