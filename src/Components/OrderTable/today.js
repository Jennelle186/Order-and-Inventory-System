import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemText,
  Typography,
  TableFooter,
} from "@mui/material";

import { db } from "../../Firebase/utils";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

import Loading from "../Loading/loading";

const TodayReport = () => {
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const getOrders = async () => {
      const querySnapshot = await getDocs(collection(db, "orders"));
      // const q = query(querySnapshot, orderBy("orderCreatedAt"));
      // console.log(q, "q");
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      if (isMounted) {
        setOrders(arr);
        setLoading(true);
      }
    };

    getOrders().catch((err) => {
      if (!isMounted) return;
      console.error("failed to fetch data", err);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const columns = [
    {
      name: "id",
      label: "System ID", //or the order ID here
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },

    {
      name: "firstName",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "houseNo",
      label: "HouseNo",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "streetAddress",
      label: "House No & Street Address",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              {tableMeta.rowData[2]} - {tableMeta.rowData[3]}
            </div>
          );
        },
      },
    },
    {
      name: "barangay",
      label: "Barangay",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "landMark",
      label: "Landmark",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "cartItems",
      label: "Orders",
      options: {
        filter: true,
        sort: true,
        display: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
      },
    },
    {
      name: "cartItems",
      label: "Orders",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return Object.entries(
            value.reduce((prev, item) => {
              if (!prev[item.id]) prev[item.id] = { ...item, nest: [] };
              prev[item.id].nest.push(item);
              return prev;
            }, {})
          ).map(([id, obj], idx) => (
            <List key={id + obj.color}>
              <ListItemText primary={obj.name + " " + obj.size} />

              <li>
                {obj.nest.map((nest, idx) => (
                  <li key={idx}>
                    <ListItemText
                      secondary={nest.color + " (" + nest.quantity + " pcs)"}
                    />
                  </li>
                ))}
              </li>
            </List>
          ));
        },
      },
    },
    {
      name: "totalAmount",
      label: "Total Amount",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
      },
    },
    // {
    //   name: "orderCreatedAt",
    //   label: "Ordered date",
    //   options: {
    //     filter: true,
    //     sort: true,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return new Date(value.seconds * 1000).toDateString();
    //     },
    //   },
    // },

    {
      name: "number",
      label: "Phone Number",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "orderCreatedAt",
      label: "Month",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return new Date(value.seconds * 1000).toLocaleString("en-us", {
            month: "long",
          });
        },
      },
    },
    {
      name: "orderCreatedAt",
      label: "Date",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return new Date(value.seconds * 1000).toLocaleString("en-us", {
            day: "numeric",
          });
        },
      },
    },
    {
      name: "orderCreatedAt",
      label: "Year",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return new Date(value.seconds * 1000).toLocaleString("en-us", {
            year: "numeric",
          });
        },
      },
    },
    {
      name: "instructions",
      label: "Instructions",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
  ];

  function handleTableChange(action, tableState) {
    // console.log("handleTableChange:... ", tableState.displayData);
    const totalAmount = calculateTotalSum(tableState.displayData);
    setTotal(totalAmount);
  }

  const calculateTotalSum = (data) => {
    const totalAmount = data
      .map((a) => a.data[8])
      .reduce((a, b) => (a += b), 0);
    return totalAmount;
  };

  const options = {
    filter: true,
    filterType: "multiselect",
    selectableRows: "none",
    responsive: "vertical",
    expandableRows: true,
    onTableChange: handleTableChange,
    onTableInit: handleTableChange,
    renderExpandableRow: (rowData, rowMeta) => {
      console.log(rowData);
      return (
        <tr>
          <td colSpan={4}>
            <TableContainer>
              <Table style={{ margin: "0 auto" }}>
                <TableHead>
                  <TableCell align="right">Product</TableCell>
                  <TableCell align="right">Color</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Unit Price</TableCell>
                </TableHead>
                <TableBody>
                  {rowData[6].map((row) => {
                    return (
                      <TableRow key={row.id + row.color}>
                        <TableCell component="th" scope="row" align="right">
                          {row.name + " " + row.size}
                        </TableCell>
                        <TableCell align="right">{row.color}</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">
                          {" "}
                          ₱{" "}
                          {Number(row.quantity) *
                            Number(row.price).toLocaleString(
                              navigator.language,
                              {
                                minimumFractionDigits: 2,
                              }
                            )}
                          .00
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                  {" "}
                  <Typography> Instructions: {rowData[13]}</Typography>
                </TableFooter>
              </Table>
            </TableContainer>
          </td>
        </tr>
      );
    },
  };

  return (
    <div>
      {loading ? (
        <>
          {" "}
          <Typography variant="subtitle1">
            Total amount : ₱{" "}
            {total.toLocaleString(navigator.language, {
              minimumFractionDigits: 2,
            })}
          </Typography>
          <MUIDataTable
            title={"Reports"}
            columns={columns}
            data={orders}
            options={options}
          />
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </div>
  );
};

export default TodayReport;
