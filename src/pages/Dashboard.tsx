import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";

import SideBar from "../components/sidebar/main";
import Header from "../components/header/main";
import Dashboard from "../components/dashboard/main";
import { mockBoardData } from "../lib/data";
import type { BoardParams } from "../lib/types";
import { useState } from "react";
import BlankPage from "../components/dashboard/blank";

export default function DashboardPage() {
  /* --------------------------------- states --------------------------------- */
  const [selectedBoard, setSelectedBoard] = useState<Partial<BoardParams>>({});

  /* --------------------------------- handler -------------------------------- */
  const handleSelectBoard = (board: BoardParams) => {
    setSelectedBoard(board);
  };
  /* -------------------------------- variables ------------------------------- */
  const theme = useTheme();
  const isTabletView = useMediaQuery(theme.breakpoints.down("md"));

  const data = mockBoardData;
  return (
    <>
      <Box
        bgcolor={theme.palette.background.dashboardBg}
        sx={{
          width: "100vw",
          height: "100vh",
          flexDirection: "row",
          display: "flex",
        }}
      >
        {!isTabletView && (
          <SideBar boards={data} onChange={handleSelectBoard} />
        )}

        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Header boards={data} onChange={handleSelectBoard} />
          {selectedBoard.boardId ? (
            <Dashboard {...(selectedBoard as BoardParams)} />
          ) : (
            <BlankPage />
          )}
        </Stack>
      </Box>
    </>
  );
}
