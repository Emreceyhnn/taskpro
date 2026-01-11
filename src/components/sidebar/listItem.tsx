import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { icons, type BoardWithColumns } from "../../lib/utils";
import DeleteBoardDialog from "../dialogs/deleteBoard";
import { useState } from "react";
import EditBoard from "../dialogs/editBoard";

export interface SideBarListItemType {
  board: BoardWithColumns;
  isActive: boolean;
  onClick: () => void;
}

export default function SideBarListItem({
  board,
  isActive,
  onClick,
}: SideBarListItemType) {
  /* --------------------------------- PARAMS --------------------------------- */
  const { title, icon } = board;

  /* -------------------------------- VARIABLE -------------------------------- */
  const theme = useTheme();

  /* ---------------------------------- STATE --------------------------------- */
  const [isEditDialogOpen, SetEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, SetDeleteDialogOpen] = useState<boolean>(false);

  /* --------------------------------- HANDLER -------------------------------- */
  const handleEditDialogClose = () => {
    SetEditDialogOpen(false);
  };

  const handleDeleteDialogClose = () => {
    SetDeleteDialogOpen(false);
  };

  return (
    <>
      <Box
        height={61}
        position="relative"
        onClick={onClick}
        sx={{
          cursor: "pointer",
          bgcolor: isActive
            ? theme.palette.background.hoverBg
            : theme.palette.background.sidebar,
        }}
        display="flex"
        alignItems="center"
      >
        <Stack
          width="100%"
          p={3}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <svg width="18" height="18">
              <use
                href={icons.find((i) => i.key === icon)?.value}
                style={
                  {
                    "--color1": theme.palette.text.sideBarText,
                  } as React.CSSProperties
                }
              />
            </svg>

            <Typography
              fontWeight={500}
              fontSize={14}
              color={theme.palette.text.sideBarText}
              sx={{ textWrap: "nowrap" }}
            >
              {title}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <IconButton
              size="small"
              onClick={() => {
                SetEditDialogOpen(true);
              }}
            >
              <EditIcon
                fontSize="small"
                sx={{ color: theme.palette.icon.secondary }}
              />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                SetDeleteDialogOpen(true);
              }}
            >
              <DeleteIcon
                fontSize="small"
                sx={{ color: theme.palette.icon.secondary }}
              />
            </IconButton>
          </Stack>
        </Stack>

        {isActive && (
          <Box
            sx={{
              position: "absolute",
              right: -4,
              width: 8,
              height: "100%",
              bgcolor: theme.palette.primary.main,
              borderRadius: 8,
            }}
          />
        )}
      </Box>
      <EditBoard
        isOpen={isEditDialogOpen}
        onClose={handleEditDialogClose}
        board={board}
      />
      <DeleteBoardDialog
        boardId={board._id}
        boardTitle={board.title}
        open={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
      />
    </>
  );
}
