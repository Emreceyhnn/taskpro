import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { currentUser } from "../api/auth";

export default function Playground() {
  useEffect(() => {
    const data = async () => {
      const res = await currentUser();
      console.log(res);
    };

    data();
  }, []);
  return (
    <>
      <Box></Box>
    </>
  );
}
