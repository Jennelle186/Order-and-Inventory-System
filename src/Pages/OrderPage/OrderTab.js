import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import PendingOrders from "../../Components/OrderTable/PendingOrders";
import DeliveredOrders from "../../Components/OrderTable/DeliveredOrders";
import ReadyToBeDelivered from "../../Components/OrderTable/ReadyToBeDelivered";
import Cancelled from "../../Components/OrderTable/CancelledOrders";
import ReturnedOrders from "../../Components/OrderTable/ReturnedOrders";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const OrderTab = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Pending" {...a11yProps(0)} />
          <Tab label="Ready to be Delivered" {...a11yProps(1)} />
          <Tab label="Delivered" {...a11yProps(2)} />
          <Tab label="Cancelled" {...a11yProps(3)} />
          <Tab label="Returned" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PendingOrders />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ReadyToBeDelivered />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DeliveredOrders />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Cancelled />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ReturnedOrders />
      </TabPanel>
    </Box>
  );
};

export default OrderTab;
