import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { deleteBoardApi } from "../../api/dashboard";
import { useState } from "react";
import CircularIndeterminate from "../loading";

interface DeleteBoardDialogProps {
  open: boolean;
  onClose: () => void;
  boardTitle?: string;
  boardId: string;
  onReset: () => void;
}

export default function DeleteBoardDialog({
  open,
  onClose,
  boardId,
  boardTitle,
  onReset,
}: DeleteBoardDialogProps) {
  const theme = useTheme();

  /* --------------------------------- states --------------------------------- */
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteBoardApi(boardId);
      if (res.status === 200) {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    } finally {
      onReset();
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      disableRestoreFocus
      disableEnforceFocus
      disableAutoFocus
      PaperProps={{
        sx: {
          borderRadius: "8px",
          bgcolor: theme.palette.background.paper,
        },
      }}
    >
      <Box p={3} position="relative">
        {/* Close icon */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Content */}
        <Stack spacing={2}>
          <Typography fontSize={18} fontWeight={600}>
            Delete board
          </Typography>

          <Typography fontSize={14} color={theme.palette.text.secondary}>
            Are you sure you want to delete <b>{boardTitle ?? "this board"}</b>?
            This action cannot be undone.
          </Typography>
        </Stack>

        {/* Actions */}
        <Stack direction="row" justifyContent="flex-end" spacing={1} mt={3}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          {loading ? (
            <CircularIndeterminate />
          ) : (
            <Button onClick={handleDelete} variant="contained" color="error">
              Delete
            </Button>
          )}
        </Stack>
      </Box>
    </Dialog>
  );
}
