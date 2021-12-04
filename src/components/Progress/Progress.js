import React from "react";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Progress(props) {
  return (
    <CircularProgress
      variant="indeterminate"
      disableShrink
      sx={{
        color: "#00acc1",
        animationDuration: "550ms",
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: "round",
        },
      }}
      size={40}
      thickness={4}
      {...props}
    />
  );
}
