import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
} from "@mui/material";

// const SelectProduct = ({ value, onChange, names }) => {
//   return (
//     <FormControl fullWidth>
//       <InputLabel htmlFor="vaccinator-name">Products</InputLabel>
//       <Select value={value} onChange={onChange} fullWidth>
//         {names &&
//           names.map((index) => (
//             <MenuItem
//               key={index.id}
//               value={index.id}
//               // defaultValue={}
//             >
//               {index.prodName + " " + index.size}
//             </MenuItem>
//           ))}
//       </Select>
//     </FormControl>
//   );
// };

// export default SelectProduct;

const SelectProduct = ({ value, onChange, names }) => {
  //do not show the value of category if it is === S-XL
  const options = names.map(
    (object) =>
      object.prodName +
      " - " +
      object.size +
      `${object.cat === "CM" || object.cat === "ML" ? "- " + object.cat : ""}` +
      " "
    // +
    // object.color
  );

  return (
    <>
      <Autocomplete
        disablePortal
        isOptionEqualToValue={(option, value) => option?.label === value?.label}
        id="combo-box-demo"
        options={options}
        fullWidth
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} label="Products" />}
        required
      />
    </>
  );
};

export default SelectProduct;
