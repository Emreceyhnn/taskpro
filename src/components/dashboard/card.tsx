import {
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { PRIORITIES, type ColumnNames } from "../../lib/types";
import { formatDateDayjs } from "../../lib/utils";
import { useState } from "react";
import EditCardDialog from "../dialogs/editCard";
import DeleteCardDialog from "../dialogs/deleteCard";
import MoveMenu from "./cardForwarder";
import { cardForwarder, type EditCardType } from "../../api/dashboard";
import dayjs from "dayjs";

interface TaskSectionType {
  tasks: EditCardType;
  columnNames: ColumnNames[];
  onReset: () => void;
}

export default function Card(params: TaskSectionType) {
  /* --------------------------------- params --------------------------------- */
  const { columnNames, tasks, onReset } = params;

  /* -------------------------------- variables ------------------------------- */
  const theme = useTheme();

  /* ---------------------------------- STATE --------------------------------- */
  const [isEditDialog, setEditDialog] = useState<boolean>(false);
  const [isDeleteDialog, setDeleteDialog] = useState<boolean>(false);

  /* --------------------------------- HANDLER -------------------------------- */
  const editHandler = () => {
    setEditDialog(false);
  };

  const deleteHandler = () => {
    setDeleteDialog(false);
  };

  const handlerForwarder = (movedColumn: string) => {
    cardForwarder({
      _id: tasks._id,
      columnId: movedColumn,
    });
    onReset();
  };

  const isToday = (date?: string | Date) => {
    if (!date) return false;
    return dayjs(date).isSame(dayjs(), "day");
  };

  const deadlineToday = isToday(tasks.deadline);

  const isClose = deadlineToday;

  return (
    <>
      <Box
        sx={{
          height: 156,
          bgcolor: theme.palette.background.paper,
          borderRadius: "8px",
          position: "relative",
        }}
      >
        <Stack
          sx={{
            paddingInline: "24px",
            paddingBlock: "14px",
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "-2%",
              color: theme.palette.text.primary,
            }}
          >
            {tasks.title}
          </Typography>
          <Typography
            sx={{
              minHeight: 38,
              fontWeight: 400,
              fontSize: 12,
              letterSpacing: "-2%",
              color: theme.palette.text.secondary,

              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {tasks.description}
          </Typography>
          <Divider
            sx={{
              color: theme.palette.text.secondary,
              width: "100%",
              marginBlock: 1,
            }}
          />
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Stack direction={"column"} alignItems={"start"} spacing={1}>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "8px",
                    letterSpacing: "-2%",
                    color: theme.palette.text.secondary,
                  }}
                >
                  Priority
                </Typography>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      backgroundColor:
                        PRIORITIES[tasks.priority as keyof typeof PRIORITIES],
                      borderRadius: "50%",
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "10px",
                      color: theme.palette.text.primary,
                      textTransform: "capitalize",
                    }}
                  >
                    {tasks.priority}
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction={"column"} alignItems={"start"} spacing={1}>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "8px",
                    letterSpacing: "-2%",
                    color: theme.palette.text.secondary,
                  }}
                >
                  Deadline
                </Typography>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "10px",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {tasks.deadline
                      ? formatDateDayjs(tasks.deadline.toString())
                      : "N/A"}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              {isClose && (
                <NotificationsNoneIcon
                  sx={{ fontSize: 16, color: theme.palette.primary.main }}
                />
              )}

              <MoveMenu
                alreadyInColumn={tasks.columnId ?? ""}
                columns={columnNames}
                onMove={(columnId) => {
                  handlerForwarder(columnId);
                }}
              />
              <IconButton
                sx={{ padding: 0, margin: 0 }}
                onClick={() => {
                  setEditDialog(true);
                }}
              >
                <EditIcon
                  sx={{ fontSize: 16, color: theme.palette.icon.secondary }}
                />
              </IconButton>
              <IconButton
                sx={{ padding: 0, margin: 0 }}
                onClick={() => {
                  setDeleteDialog(true);
                }}
              >
                <DeleteIcon
                  sx={{ fontSize: 16, color: theme.palette.icon.secondary }}
                />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
        <Box
          sx={{
            position: "absolute",
            width: "4px",
            height: "100%",
            borderRadius: "8px 0 0 8px",
            top: 0,
            left: 0,
            bgcolor: PRIORITIES[tasks.priority as keyof typeof PRIORITIES],
          }}
        />
      </Box>
      <EditCardDialog
        isOpen={isEditDialog}
        onClose={editHandler}
        task={tasks}
        onReset={onReset}
      />
      <DeleteCardDialog
        open={isDeleteDialog}
        onClose={deleteHandler}
        cardId={tasks._id}
        cardTitle={tasks.title}
        onReset={onReset}
      />
    </>
  );
}
