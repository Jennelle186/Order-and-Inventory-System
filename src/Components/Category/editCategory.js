import React, { useState, useEffect } from "react";
import { Stack, Grid, TextField, Typography } from "@mui/material";
import CardComponent from "../Cards/CardComponent";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonForm from "../Button/ButtonForm";

//firebase
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../Firebase/utils";

const EditCategory = () => {
  const [cat, setCat] = useState([]);
  const { state } = useLocation(); //document ID here
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [categoryEdit, setCategoryEdit] = useState();

  useEffect(() => {
    let isMounted = true;
    const getCategory = async () => {
      const docRef = doc(db, "category", state);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const arr = [];
        arr.push({
          ...docSnap.data(),
        });
        setCat(arr);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
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

  //to save this in firestore when editing
  const changeHandler = (index) => (e) => {
    const { name, value } = e.target;
    setCat((cat) =>
      cat.map((prod, i) =>
        i === index
          ? {
              ...prod,
              [name]: value,
            }
          : prod
      )
    );
  };

  // const handleSubmit = (index) => async (e) => {
  //   e.preventDefault();

  //   const ref = doc(db, "category", state);
  //   // await updateDoc(ref, {
  //   //   ...cat[index],
  //   // });

  //   // await updateDoc(ref, {
  //   //   options: arrayUnion(options),
  //   // });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ref = doc(db, "category", state);
    await updateDoc(ref, {
      cat: categoryEdit,
      options: options,
    });

    console.log("updated");
  };

  return (
    <div>
      <Stack direction="row" justifyContent="start">
        <Grid item xs={1}>
          <ButtonForm onClick={() => navigate(-1)}>go back</ButtonForm>
        </Grid>{" "}
      </Stack>
      <CardComponent title="Edit Category">
        {cat &&
          cat.map((category, index) => (
            <form onSubmit={handleSubmit}>
              <Grid container direction={"column"} spacing={2}>
                <Grid item xs>
                  <TextField
                    defaultValue={category.cat}
                    type="text"
                    // value={category.cat}
                    value={categoryEdit}
                    variant="outlined"
                    label="Category"
                    name="cat" //<---- name attribute similar to the variable saved in db
                    fullWidth
                    onChange={(e) => setCategoryEdit(e.target.value)}
                  />
                </Grid>
                {category.value === "yes" ? (
                  <>
                    <Grid item>
                      <Typography>Options</Typography>
                    </Grid>

                    <Grid item>
                      {category.options.map((i) => (
                        <TextField
                          type="text"
                          defaultValue={i}
                          value={options[i]}
                          variant="outlined"
                          fullWidth
                          onChange={(e) => setOptions(e.target.value)}
                        />
                      ))}
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
              </Grid>
              <br />
              <Grid item xs>
                {" "}
                <ButtonForm type="submit">Submit</ButtonForm>
              </Grid>
            </form>
          ))}
      </CardComponent>
    </div>
  );
};

export default EditCategory;
