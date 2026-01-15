import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";

import SideBar from "../components/sidebar";
import Header from "../components/header";
import Dashboard from "../components/dashboard/main";
import { useEffect, useState } from "react";
import BlankPage from "../components/dashboard/blank";
import { getAllTasks } from "../api/dashboard";
import { backgrounds, mergeBoardData } from "../lib/utils";
import type { BoardWithColumns } from "../lib/utils";

export default function DashboardPage() {
  /* --------------------------------- states --------------------------------- */
  const [selectedBoard, setSelectedBoard] = useState<BoardWithColumns | null>(
    null
  );
  const [dashboardData, setDashboardData] = useState<BoardWithColumns[] | null>(
    null
  );

  const [isEmpty, SetIsEmpty] = useState<boolean>(false);

  /* --------------------------------- handler -------------------------------- */
  const handleSelectBoard = (board: BoardWithColumns | null) => {
    setSelectedBoard(board);
  };

  const handleReset = async () => {
    const res = await getAllTasks();
    SetIsEmpty(res?.isEmpty);
    const parsedValue =
      mergeBoardData(res.boards, res.columns, res.tasks) ?? null;

    setDashboardData(parsedValue);

    if (selectedBoard && parsedValue) {
      const updatedBoard = parsedValue.find((b) => b._id === selectedBoard._id);
      setSelectedBoard(updatedBoard ?? null);
    }
  };

  const handleFilterData = (item: string) => {
    if (!dashboardData || !selectedBoard) return;

    if (item === "") {
      const originalBoard = dashboardData.find(
        (b) => b._id === selectedBoard._id
      );
      setSelectedBoard(originalBoard ?? null);
      return;
    }

    const sourceBoard = dashboardData.find((b) => b._id === selectedBoard._id);

    if (!sourceBoard) return;

    const filteredBoard: BoardWithColumns = {
      ...sourceBoard,
      columns: sourceBoard.columns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.priority === item),
      })),
    };

    setSelectedBoard(filteredBoard);
  };

  /* -------------------------------- variables ------------------------------- */
  const theme = useTheme();
  const isTabletView = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const data = async () => {
      const res = await getAllTasks();
      SetIsEmpty(res?.isEmpty);
      const parsedValue =
        mergeBoardData(res.boards, res.columns, res.tasks) ?? null;
      setDashboardData(parsedValue);
    };

    data();
  }, []);

  const bgKey = selectedBoard?.background as keyof typeof backgrounds;

  return (
    <>
      <Box
        sx={{
          background:
            bgKey &&
            backgrounds[bgKey] &&
            typeof backgrounds[bgKey] === "object" &&
            "value" in backgrounds[bgKey]
              ? `url(${(backgrounds[bgKey] as { value: string }).value})`
              : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100dvw",
          minHeight: "100dvh",
          display: "flex",
        }}
      >
        {!isTabletView && (
          <SideBar
            boards={dashboardData}
            onChange={handleSelectBoard}
            onReset={handleReset}
            isEmpty={isEmpty}
          />
        )}
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Header
            boards={dashboardData}
            onChange={handleSelectBoard}
            isEmpty={isEmpty}
            onReset={handleReset}
          />
          {isEmpty ? (
            <BlankPage />
          ) : selectedBoard ? (
            <Dashboard
              data={selectedBoard}
              onReset={handleReset}
              filter={handleFilterData}
            />
          ) : (
            <BlankPage />
          )}
        </Stack>
      </Box>
    </>
  );
}
