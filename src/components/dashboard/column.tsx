import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { ColumnsParams } from "../../lib/types";
import Card from "./card";
import { useState } from "react";
import AddCardDialog from "../dialogs/addCard";
import EditColumnDialog from "../dialogs/editColumn";
import DeleteColumnDialog from "../dialogs/deleteColumn";
import { StyledAddButton } from "../button";

export default function Column(params: ColumnsParams) {
  /* --------------------------------- params --------------------------------- */
  const { columnId, title, cards, columnNames } = params;

  /* --------------------------------- STATES --------------------------------- */
  const [isEditDialog, setEditDialog] = useState<boolean>(false);
  const [isDeleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [isAddDialog, setAddDialog] = useState<boolean>(false);

  /* -------------------------------- variables ------------------------------- */
  const theme = useTheme();

  const editHandler = () => {
    setEditDialog(false);
  };

  const deleteHandler = () => {
    setDeleteDialog(false);
  };

  const addCardHandler = () => {
    setAddDialog(false);
  };

  return (
    <>
      <Box
        flex={{
          xs: "0 0 calc(100%)",
          mobile: "0 0 calc(50% - 17px)",
          md: "0 0 calc(50% - 110px)",
          lg: "0 0 calc(33% - 90px)",
          xl: "0 0 calc(25%)",
          xxl: "0 0 calc(25% - 110px)",
        }}
      >
        {/**Header */}
        <Stack
          height={"auto"}
          p={1.6}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          bgcolor={theme.palette.background.paper}
          borderRadius={"8px"}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 14,
              color: theme.palette.text.primary,
            }}
          >
            {title}
          </Typography>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <IconButton
              onClick={() => {
                setEditDialog(true);
              }}
            >
              <EditIcon
                sx={{ fontSize: 16, color: theme.palette.icon.secondary }}
              />
            </IconButton>
            <IconButton
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
        <Stack
          sx={{
            mt: 1,
            gap: 3,
            maxHeight: "63vh",
          }}
        >
          <Stack
            direction={"column"}
            spacing={1}
            paddingBlock={2}
            sx={{ overflowY: "auto", overflowX: "hidden" }}
          >
            {cards.map((i) => (
              <Card key={i.cardId} {...i} columnNames={columnNames} />
            ))}
          </Stack>
        </Stack>
        <StyledAddButton
          title="Add another card"
          onClick={() => {
            setAddDialog(true);
          }}
          sx={{ minWidth: "100%" }}
        />
      </Box>

      <AddCardDialog
        isOpen={isAddDialog}
        onClose={addCardHandler}
        columnId={columnId}
      />

      <EditColumnDialog
        isOpen={isEditDialog}
        onClose={editHandler}
        columnId={columnId}
        title={title}
      />

      <DeleteColumnDialog
        open={isDeleteDialog}
        onClose={deleteHandler}
        columnId={columnId}
        columnTitle={title}
      />
    </>
  );
}
