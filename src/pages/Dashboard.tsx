import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";

import SideBar from "../components/sidebar";
import Header from "../components/header";
import Dashboard from "../components/dashboard/main";
import { useEffect, useState } from "react";
import BlankPage from "../components/dashboard/blank";
import { getAllTasks } from "../api/dashboard";
import { mergeBoardData } from "../lib/utils";
import type { BoardWithColumns } from "../lib/utils";

export default function DashboardPage() {
  /* --------------------------------- states --------------------------------- */
  const [selectedBoard, setSelectedBoard] = useState<Partial<BoardWithColumns>>(
    {}
  );
  const [dashboardData, setDashboardData] = useState<BoardWithColumns[] | null>(
    null
  );

  /* --------------------------------- handler -------------------------------- */
  const handleSelectBoard = (board: BoardWithColumns | null) => {
    setSelectedBoard(board || {});
  };
  /* -------------------------------- variables ------------------------------- */
  const theme = useTheme();
  const isTabletView = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const data = async () => {
      const res = await getAllTasks();
      const parsedValue =
        mergeBoardData(res.boards, res.columns, res.tasks) ?? null;
      setDashboardData(parsedValue);
    };

    data();
  }, []);

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
          <SideBar boards={dashboardData} onChange={handleSelectBoard} />
        )}

        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Header boards={dashboardData} onChange={handleSelectBoard} />
          {selectedBoard._id ? (
            <Dashboard {...(selectedBoard as BoardWithColumns)} />
          ) : (
            <BlankPage />
          )}
        </Stack>
      </Box>
    </>
  );
}
