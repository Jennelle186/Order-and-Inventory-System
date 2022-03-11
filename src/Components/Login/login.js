import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardComponent from "../Cards/CardComponent";
import {
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo from "../../assets/logo.jpg";
import ButtonForm from "../Button/ButtonForm";

//firebase
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth, signInWithGoogle, db } from "../../Firebase/utils";
import { doc, setDoc, collection } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  // const googleHandler = async () => {
  //   signInWithGoogle.setCustomParameters({ prompt: "select_account" });
  //   signInWithPopup(auth, signInWithGoogle)
  //     .then(async (result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       // redux action? --> dispatch({ type: SET_USER, user });

  //       console.log(user);
  //       const { isNewUser } = getAdditionalUserInfo(result);

  //       if (isNewUser) {
  //         await addUser(user.uid);
  //       } else {
  //         console.log("User already exists");
  //       }
  //     })

  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // };

  // const addUser = async (userId) => {
  //   const userRef = doc(db, "users", userId);
  //   return await setDoc(userRef, {
  //     id: userId,
  //     docAddedAt: Date.now(),
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    console.log(email, password, "1");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/Dashboard");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <>
      <CardComponent title="Lines Hub Admin User">
        <form onSubmit={handleSubmit}>
          <Grid container direction={"column"} spacing={2}>
            <Grid align="center">
              <Avatar src={logo} sx={{ width: "120px", height: "120px" }} />
            </Grid>
            <Grid item xs>
              <TextField
                type="text"
                id="standard1"
                label="Email"
                fullWidth
                required
                autoComplete
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs>
              <TextField
                id="Password"
                label="Password"
                variant="outlined"
                fullWidth
                required
                type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs>
              <ButtonForm type="submit">Login</ButtonForm>
            </Grid>

            {/* <Grid item xs>
              <ButtonForm onClick={googleHandler}>Login with Gmail</ButtonForm>
            </Grid> */}

            <Grid item xs>
              <Link to="/forgot-password">
                <Typography variant="subtitle2" align="center">
                  Forgot Password?
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </CardComponent>
    </>
  );
};

export default Login;
