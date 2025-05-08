import React, { useState } from "react";
import Button from "@mui/material/Button";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const DashboardBox = ({ color, grow, title, count, icon }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Button
      className="dashboardBox"
      style={{
        backgroundImage: `linear-gradient(to right, ${color?.[0]} , ${color?.[1]})`,
      }}
    >
      <span className="chart">
        {grow ? <TrendingUpIcon /> : <TrendingDownIcon />}
      </span>

      <div className="d-flex w-100">
        <div className="col1">
          <h4 className="text-white mb-0">{title}</h4>
          <span className="text-white">{count > 0 ? count : 0}</span>
        </div>

        <div className="ml-auto">
          {icon && <span className="icon">{icon}</span>}
        </div>
      </div>
    </Button>
  );
};

export default DashboardBox;