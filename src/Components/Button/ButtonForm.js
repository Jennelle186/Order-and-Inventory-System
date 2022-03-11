import React from "react";
import { Button } from "@mui/material";

const styles = {
  btn: {
    backgroundColor: "#fbc106",
    color: "#1f1009",
  },
};
const ButtonForm = ({ children, ...otherProps }) => {
  return (
    <Button
      variant="contained"
      size="large"
      fullWidth
      {...otherProps}
      style={styles.btn}
    >
      {children}
    </Button>
  );
};

export default ButtonForm;
