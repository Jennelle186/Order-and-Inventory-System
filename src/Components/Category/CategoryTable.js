import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
//firebase
import { db } from "../../Firebase/utils";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

import Modal from "../Modal/Modal";
import Loading from "../Loading/loading";

const CategoryTable = () => {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const [uid, setUid] = useState();
  const [loading, setLoading] = useState(false);
  //modal-----
  const [isOpen, setisOpen] = useState(false);

  const handleOpen = (id) => {
    setUid(id);
    setisOpen(true);
  };

  const handleClose = () => {
    setisOpen(false);
  };
  //--------

  useEffect(() => {
    let isMounted = true;

    const getCategory = async () => {
      const querySnapshot = await getDocs(collection(db, "category"));
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      if (isMounted) {
        setCategory(arr);
        setLoading(true);
      }
    };

    getCategory().catch((err) => {
      if (!isMounted) return;
      console.error("failed to fetch data", err);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const deleteCategory = async (id) => {
    const categoryDoc = doc(db, "category", id);
    await deleteDoc(categoryDoc);
  };

  const options = {
    filter: true,
    selectableRows: "none",
    download: false,
    responsive: "standard",
  };

  const columns = [
    {
      name: "id",
      label: "System ID",
      options: {
        filter: true,
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
      },
    },
    {
      name: "options",
      label: "Options",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value + " ";
        },
      },
    },

    // {
    //   name: "Edit",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <Button
    //           color="success"
    //           onClick={() =>
    //             navigate("/edit-category", { state: tableMeta.rowData[0] })
    //           }
    //         >
    //           Edit
    //         </Button>
    //       );
    //     },
    //   },
    // },
    {
      name: "Delete",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              color="error"
              onClick={() => {
                handleOpen(tableMeta.rowData[0]);
              }}
            >
              Delete
            </Button>
          );
        },
      },
    },
  ];

  let sample = "Are you sure you want to delete this category?";

  return (
    <div style={{ marginTop: "1rem" }}>
      {loading ? (
        <MUIDataTable
          title="List of categories"
          options={options}
          data={category}
          columns={columns}
        />
      ) : (
        <Loading />
      )}

      <Modal
        id={uid}
        title="Confirmation"
        subtitle={sample}
        isOpen={isOpen}
        handleClose={handleClose}
        deleteProductCallBack={deleteCategory}
      />
    </div>
  );
};

export default CategoryTable;
