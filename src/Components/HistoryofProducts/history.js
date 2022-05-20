import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme, Stack, Grid, Button } from "@mui/material";
import ButtonForm from "../Button/ButtonForm";

import { db } from "../../Firebase/utils";
import {
  collection,
  getDocs,
  collectionGroup,
  query,
  getDoc,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

const History = (props) => {
  const [product, setProduct] = useState([]);
  const { state } = useLocation(); //document ID here & not sure with this yet
  const navigate = useNavigate();

  //fetching the products document
  useEffect(() => {
    let isMounted = true;

    const getProducts = async () => {
      const listProducts = query(
        collectionGroup(db, "history"),
        orderBy("createdDate", "desc")
      );
      const querySnapshot = await getDocs(listProducts);
      const arr = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
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

  //Displaying the data by columns. The "name" must be a data exactly the same from what was saved in the database
  const columns = [
    // {
    //   name: "id",
    //   label: "Category",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    {
      name: "cat",
      label: "Category",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "prodName",
      label: "Product Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "size",
      label: "Size",
      options: {
        filter: true,
        sort: true,
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
    {
      name: "price",
      label: "Price",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return "₱" + value + ".00";
        },
      },
    },
    {
      name: "supplier",
      label: "Supplier",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "createdDate",
      label: "Date when modified",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value) {
            return new Date(value?.seconds * 1000).toLocaleDateString();
          } else {
            return "";
          }
        },
      },
    },
    // {
    //   name: "Delete",
    //   options: {
    //     filter: false,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         //button to pass the ID of the row to delete it
    //         <Button
    //           color="error"
    //           onClick={(e) => {
    //             console.log(tableMeta.rowData[0]);
    //             try {
    //               deleteDoc(doc, (db, "history", tableMeta.rowData[0]));
    //             } catch (err) {
    //               console.log(err);
    //             }
    //           }}
    //         >
    //           Delete
    //         </Button>
    //       );
    //     },
    //   },
    // },
  ];

  const options = {
    filter: true,
    selectableRows: "none",
    download: false,
    responsive: "standard",
  };
  return (
    <div>
      <Grid style={{ padding: "1rem" }}>
        <ThemeProvider theme={createTheme()}>
          <MUIDataTable
            title={"History of the Products"}
            options={options}
            columns={columns}
            data={product}
          />
        </ThemeProvider>
      </Grid>
    </div>
  );
};

export default History;
