import React, { useEffect, useState } from "react";
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
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

import { useNavigate } from "react-router-dom";

import { db } from "../../Firebase/utils";
import {
  query,
  where,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import StocksAlert from "../StocksAlerts/StocksAlert";

const BoxDashboards = ({ totalAmount }) => {
  const navigate = useNavigate();
  const [pending, setPending] = useState();
  const [delivered, setDelivered] = useState();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const getPending = async () => {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("orderStatus", "==", "Pending"));
      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot.docs.length, "pending orders");

      if (isMounted) {
        setPending(querySnapshot.docs.length);
      }
    };

    const getDelivered = async () => {
      const docRef = doc(db, "orders", "counts");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        if (isMounted) {
          setDelivered(docSnap.data().deliveredOrder);
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };

    const getProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      if (isMounted) {
        setProduct(arr);
      }
    };

    getPending().catch((err) => {
      if (!isMounted) return;
      console.error("failed to fetch data", err);
    });

    getDelivered().catch((err) => {
      if (!isMounted) return;
      console.error("failed to fetch data", err);
    });

    getProducts().catch((err) => {
      if (!isMounted) return;
      console.error("failed to fetch data", err);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  //not sure with this yet
  // useEffect(async () => {
  //   const ordersRef = collection(db, "orders");
  //   const q = query(ordersRef, where("orderStatus", "==", "Pending"));
  //   const querySnapshot = await getDocs(q);
  //   console.log(querySnapshot.docs.length, "pending orders");
  //   setPending(querySnapshot.docs.length);
  // }, []);

  const newProduct = product.filter((item) => {
    return Object.values(item.colorMap).every((color) => color < 10);
  });

  return (
    <Container style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <Box sx={{ "& h1": { m: 0 } }}>
        <Grid container spacing={2} justify="flex-start">
          <Grid item xs={12} sm={6} md={4} lg={3}>
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
                      style={{ color: "red" }}
                      fontSize="large"
                    />
                    <Typography variant={"h6"} gutterBottom>
                      {pending} Pending Orders
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
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
                    <LocalShippingIcon
                      fontSize="large"
                      style={{ color: "orange" }}
                    />
                    <Typography variant={"h6"} gutterBottom>
                      {delivered} Delivered Orders
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                ":hover": {
                  boxShadow: 20, // theme.shadows[20]
                },
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={2}>
                  <PointOfSaleIcon color="success" fontSize="large" />
                  <Typography variant={"h6"} gutterBottom>
                    Sales ₱{" "}
                    {totalAmount.toLocaleString(navigator.language, {
                      minimumFractionDigits: 2,
                    })}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                ":hover": {
                  boxShadow: 20, // theme.shadows[20]
                },
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={2}>
                  <PointOfSaleIcon color="success" fontSize="large" />
                  <Typography
                    variant={"h6"}
                    gutterBottom
                    onClick={() => navigate("/stocks", { state: newProduct })}
                  >
                    {newProduct.length} for Restocks
                  </Typography>

                  {/* use a navigate here  */}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default BoxDashboards;
