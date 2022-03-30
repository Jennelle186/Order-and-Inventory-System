import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme, Stack, Grid } from "@mui/material";
import ButtonForm from "../Button/ButtonForm";

import { db } from "../../Firebase/utils";
import {
  collection,
  getDocs,
  collectionGroup,
  query,
  getDoc,
  orderBy,
} from "firebase/firestore";

const History = (props) => {
  const [product, setProduct] = useState([]);
  const { state } = useLocation(); //document ID here & not sure with this yet
  const navigate = useNavigate();

  //fetching the products document
  //other solution for the history is that upon clicking on a product, this will show all the history of the product
  //might also need to add a function for the subcollection in editing a product but instead of createdAt, it will be editedAt
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
        filter: true,
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
      name: "createdDate",
      label: "Date when modified",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value) {
            return new Date(value?.seconds * 1000).toLocaleDateString();
          } else {
            return "hello";
          }
        },
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
        {/* <Stack direction="row" justifyContent="start">
          <Grid item xs={1}>
            <ButtonForm onClick={() => navigate(-1)}>go back</ButtonForm>
          </Grid>{" "}
        </Stack> */}

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
