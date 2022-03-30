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
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

//firebase
import { db } from "../../Firebase/utils";
import { collection, getDocs } from "firebase/firestore";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const StocksAlert = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

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

    getProducts().catch((err) => {
      if (!isMounted) return;
      console.error("failed to fetch data", err);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const newProduct = product.filter((item) => {
    return Object.values(item.colorMap).every((color) => color < 10);
  });

  return (
    <Container>
      <Typography variant="subtitle1">Products that need restocking</Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {product &&
          product.map((item, i) => {
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
      </Grid>
    </Container>
  );
};

export default StocksAlert;
