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

interface DeleteBoardDialogProps {
  open: boolean;
  onClose: () => void;
  cardTitle?: string;
  cardId?: string;
}

export default function DeleteCardDialog({
  open,
  onClose,
  cardId,
  cardTitle,
}: DeleteBoardDialogProps) {
  const theme = useTheme();

  const handleDelete = () => {
    console.log(`${cardId} deleted`);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
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
            Delete Card
          </Typography>

          <Typography fontSize={14} color={theme.palette.text.secondary}>
            Are you sure you want to delete <b>{cardTitle ?? "this board"}</b>?
            This action cannot be undone.
          </Typography>
        </Stack>

        {/* Actions */}
        <Stack direction="row" justifyContent="flex-end" spacing={1} mt={3}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}
