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
import { PRIORITIES, type CardParams } from "../../lib/types";
import { arrowCircle } from "../../lib/utils";
import { useState } from "react";
import EditCardDialog from "../dialogs/editCard";
import DeleteCardDialog from "../dialogs/deleteCard";
import MoveMenu from "./cardForwarder";

export default function Card(params: CardParams) {
  /* --------------------------------- params --------------------------------- */
  const {
    title,
    cardId,
    description,
    priorities,
    deadline,
    isClose,
    columnNames,
    columnId,
    boardId,
  } = params;

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
            {title}
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
            {description}
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
                      backgroundColor: PRIORITIES[priorities],
                      borderRadius: "50%",
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "10px",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {priorities}
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
                    {deadline}
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
                columns={columnNames}
                onMove={(columnId) => {
                  console.log("Moved to column:", columnId);
                }}
                renderTrigger={(openMenu) => (
                  <IconButton
                    sx={{ padding: 0, margin: 0 }}
                    onClick={(e) => openMenu(e.currentTarget)}
                  >
                    <svg
                      width={18}
                      height={18}
                      style={
                        {
                          "--color1": theme.palette.icon.secondary,
                        } as React.CSSProperties
                      }
                    >
                      <use href={arrowCircle} />
                    </svg>
                  </IconButton>
                )}
              />
              <IconButton sx={{ padding: 0, margin: 0 }}>
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
            bgcolor: PRIORITIES[priorities],
          }}
        />
      </Box>
      <DeleteCardDialog
        open={isDeleteDialog}
        onClose={deleteHandler}
        cardId={cardId}
        cardTitle={title}
      />
    </>
  );
}
