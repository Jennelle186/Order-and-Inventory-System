import React, { useState, useEffect } from "react";
import {
  Container,
  Stack,
  Grid,
  List,
  ListItemText,
  TextField,
  Paper,
  Button,
  InputAdornment,
  IconButton,
  Card,
  CardHeader,
  Divider,
} from "@mui/material";
import { db } from "../../Firebase/utils";
import {
  collection,
  getDocs,
  QuerySnapshot,
  updateDoc,
  doc,
  increment,
  setDoc,
} from "firebase/firestore";
import CardComponent from "../Cards/CardComponent";
import SelectProduct from "../Selects/selectProduct";
import ClearIcon from "@mui/icons-material/Clear";

import ListItems from "./ListOfItems";
import CustomerInfo from "./CustomerInfo";

const Ordering = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [selectedProd, setSelectedProd] = useState();
  const handleChange = (event, value) => setSelectedProd(value);

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
        setProducts(arr);
        // setIsLoading(true);
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

  useEffect(() => {
    let x = [...products];
    x = x.filter((y) => {
      const key = searchKey.toLocaleLowerCase();
      const values = ["prodName", "size", "cat"];
      return values.some((val) => y[val].toLocaleLowerCase().includes(key));
    });
    setSearchList(x);
    setIsLoading(true);
  }, [searchKey, products]);

  const handleClear = () => {
    console.log("clear");
    setSearchKey("");
  };

  const handleAdd = (id, name, price, size, cat, color, quan = null) => {
    const productExist = cartItems.find(
      (item) => item.id === id && item.color === color
    );

    if (productExist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === id && item.color === color
            ? {
                ...productExist,
                quantity:
                  quan === "" || quan ? quan : +productExist.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { id, name, price, size, cat, color, quantity: 1 },
      ]);
    }
  };

  const handleRemove = (product) => {
    console.log(product.color, "remove");

    const ProductExist = cartItems.find(
      (item) => item.id === product.id && item.color === product.color
    );

    if (ProductExist.quantity === 1) {
      setCartItems(
        cartItems.filter(
          (item) => item.id !== product.id || item.color !== product.color
        )
      );
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id && item.color === product.color
            ? { ...ProductExist, quantity: ProductExist.quantity - 1 }
            : item
        )
      );
    }
  };

  const handleCartClearance = () => {
    setCartItems([]);
  };

  const amount = cartItems.reduce(
    (price, item) => price + item.quantity * item.price,
    0
  );
  const [discount, setDiscount] = useState(0);
  let totalAmount = Number(amount) - (Number(amount) * Number(discount)) / 100;

  return (
    <div>
      {/* <CardComponent title="Ordering">
        <SelectProduct
          value={selectedProd}
          onChange={handleChange}
          names={products}
        />
        <button onClick={updateData}>remove</button>
        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
      </CardComponent> */}
      <Container>
        <Card style={{ marginTop: "1rem" }} elevation={5}>
          <CardHeader title="Customer Information" />
          <CustomerInfo
            cartItems={cartItems}
            totalAmount={totalAmount}
            handleCartClearance={handleCartClearance}
          />
        </Card>
        <br />
        <Divider />
        <br />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Grid item xs={6} md={4}>
            <TextField
              variant="outlined"
              label="Search Product..."
              placeholder="Type either the product name, size, or category"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {searchKey.length >= 1 && (
                      <IconButton aria-label="clear" onClick={handleClear}>
                        <ClearIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
            />
            {searchKey}

            {searchList.map((item, index) => (
              <List key={item.id + item.color}>
                <Paper style={{ padding: "12px" }}>
                  <ListItemText
                    primary={item.prodName}
                    secondary={
                      item.size + "(Size)" + "  -  " + item.cat + "(Category)"
                    }
                  />

                  {Object.entries(item.colorMap).map((color, i) => (
                    <div key={i}>
                      {color[1] !== 0 ? ( //only show the colors if their qty !== 0
                        <>
                          <Stack direction="row" spacing={2}>
                            <Grid item xs>
                              {/* {color[1] !== 0 && (
                              <>
                                {color[0]} - {color[1]}
                              </>
                            )} */}
                              {color[0]} ({color[1]} pcs)
                            </Grid>

                            <Grid item xs>
                              <Button
                                onClick={(e) =>
                                  handleAdd(
                                    item.id,
                                    item.prodName,
                                    item.price,
                                    item.size,
                                    item.cat,
                                    color[0]
                                  )
                                }
                              >
                                Add
                              </Button>
                            </Grid>
                          </Stack>
                        </>
                      ) : (
                        <></>
                      )}
                      <br />
                    </div>
                  ))}
                </Paper>
              </List>
            ))}
          </Grid>

          <Grid item xs={8}>
            <ListItems
              cartItems={cartItems}
              handleCartClearance={handleCartClearance}
              handleRemove={handleRemove}
              handleAdd={handleAdd}
              discount={discount}
              amount={amount}
              setDiscount={setDiscount}
              totalAmount={totalAmount}
            />
          </Grid>
        </Stack>
      </Container>
    </div>
  );
};

export default Ordering;
