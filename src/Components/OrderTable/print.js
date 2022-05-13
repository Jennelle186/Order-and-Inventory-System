import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Divider,
  Avatar,
  Stack,
} from "@mui/material";
import logo from "../../assets/logo.jpg";

import { db } from "../../Firebase/utils";
import { getDoc, doc } from "firebase/firestore";

const Print = (rowData) => {
  const [order, setOrder] = useState([]);

  const getOrder = async () => {
    const docRef = doc(db, "orders", rowData.rowData);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const arr = [];
      arr.push({
        ...docSnap.data(),
      });

      setOrder(arr);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(async () => {
    (async () => {
      await getOrder();

      // await other async operations here.
    })(); // This immediately runs the func async.
  }, []);

  return (
    <div>
      {/* {rowData.rowData} */}
      <Grid container justify="center">
        <Grid item xs={12} style={{ padding: "8px" }}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="logo1"
                src={logo}
                sx={{ height: 50, width: 50, marginBottom: "1rem" }}
              />
              <Typography
                variant="h5"
                style={{ marginTop: ".5rem", color: "#03020b" }}
              >
                Lines Printing Services
              </Typography>
            </Stack>
            {order &&
              order.map((order, index) => (
                <div key={index}>
                  {" "}
                  <Grid item xs={12}>
                    {" "}
                    <Typography variant="subtitle2">
                      Order ID: {rowData.rowData}
                    </Typography>
                    <Typography variant="subtitle2">
                      Order created at:{" "}
                      {new Date(
                        order.orderCreatedAt?.seconds * 1000
                      ).toDateString()}
                    </Typography>
                    <Typography variant="subtitle2">
                      State: {order.mode}
                    </Typography>
                    <Typography variant="subtitle2">
                      {order.mode} date:{" "}
                      {new Date(
                        order.deliveryDate?.seconds * 1000
                      ).toDateString()}
                    </Typography>
                    <Typography variant="subtitle2">
                      Order: {order.stateOrder} order
                    </Typography>
                    <Typography variant="subtitle2">
                      Instructions: {order.instructions}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" align="center">
                      Customer Details
                    </Typography>
                  </Grid>
                  <Divider />
                  <Grid item xs={12}>
                    <Stack direction="row" spacing={2}>
                      <Typography>First Name: {order.firstName}</Typography>
                      <Typography>Last Name: {order.lastName} </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Phone Number:{order.number}</Typography>
                    <Typography>
                      House No and Street Address:{" "}
                      {order.houseNo + ", " + order.streetAddress}{" "}
                    </Typography>
                    <Typography>Barangay: {order.barangay}</Typography>
                    <Typography>Landmark: {order.landMark}</Typography>
                  </Grid>
                  {/* ----------------------------------------------------------------- */}
                  <Typography variant="h6" align="center">
                    Order Details
                  </Typography>
                  <Divider />
                  <TableContainer>
                    <Table
                      aria-label="spanning table"
                      style={{ minWidth: "340px" }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Product Name</TableCell>
                          <TableCell align="right">Qty.</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="right">Sum</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {order.cartItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">
                              ₱{" "}
                              {item.price.toLocaleString(navigator.language, {
                                minimumFractionDigits: 2,
                              })}
                            </TableCell>
                            <TableCell align="right">
                              ₱
                              {item.price *
                                item.quantity.toLocaleString(
                                  navigator.language,
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}
                            </TableCell>
                          </TableRow>
                        ))}

                        <TableRow>
                          <TableCell rowSpan={3} />
                          <TableCell colSpan={2}>Total Amount</TableCell>
                          <TableCell align="right">
                            ₱{" "}
                            {order.totalAmount.toLocaleString(
                              navigator.language,
                              {
                                minimumFractionDigits: 2,
                              }
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2}>Downpayment</TableCell>
                          <TableCell align="right">
                            ₱{" "}
                            {order.downpayment?.toLocaleString(
                              navigator.language,
                              {
                                minimumFractionDigits: 2,
                              }
                            ) || "0.00"}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2}>Outstanding balance</TableCell>
                          <TableCell align="right">
                            Php{" "}
                            {order.credit?.toLocaleString(navigator.language, {
                              minimumFractionDigits: 2,
                            })}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              ))}
          </Grid>
          {/* -------------------------------------------------------------- */}

          <div
            style={{
              textAlign: "center",
              marginTop: "2rem",
              marginBottom: "1rem",
              margin: "1rem",
            }}
          >
            <Typography color="primary" variant="subtitle1">
              LINES PRINTING SERVICES
            </Typography>
            <Typography variant="subtitle1">
              E Locson Drive, Talon-Talon, Zamboanga City, Zamboanga Del Sur
              <br />
              Call us at 0917 676 5010 / 0917 676 5011
              <br />
              Linesprintingservices@gmail.com <br /> Lines Hub (Facebook)
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Print;
