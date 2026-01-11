import { Box, Stack, useTheme } from "@mui/material";

import SideBar from "../components/sidebar/main";
import Header from "../components/header/main";

import EditBoard from "../components/dialogs/editBoard";
import Filter from "../components/dashboard/filter";
import MoveMenu from "../components/dashboard/cardForwarder";
import { StyledButton } from "../lib/styled";
import ListItemSkeleton from "../components/sidebar/skeleton";

export default function Playground() {
  /* -------------------------------- variables ------------------------------- */
  const theme = useTheme();

  const item = {
    title: "project",
    icon: "projectIcon",
    background: "1",
    boardId: "14314141",
  };

  return (
    <>
      <Box
        bgcolor={theme.palette.background.paper}
        sx={{
          width: "100vw",
          height: "100vh",
          flexDirection: "row",
          display: "flex",
        }}
      >
        <Box>
          <ListItemSkeleton />
        </Box>
      </Box>
    </>
  );
}
