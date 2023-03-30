import { Link, Typography, Box } from "@mui/material";
import React from "react";

const TitleBar = ({ animate, title, translate, color }) => {
  return (
    <Box
      bgcolor={"primary"}
      sx={{
        backgroundColor: color,
        padding: 1,
        display: "flex",
        gap: 1,
        translate: `${animate ? "" : translate}`,
        transitionDuration: "2s",
        // boxShadow: "0 4px 2px -2px gray",
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>
      {title && (
        <Link href='#' underline='none'>
          Explore more!
        </Link>
      )}
    </Box>
  );
};

export default TitleBar;
