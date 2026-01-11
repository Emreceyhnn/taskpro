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

interface Params {
  open: boolean;
  onClose: () => void;
}

export default function LogOutDialog(params: Params) {
  /* -------------------------------- variables ------------------------------- */
  const theme = useTheme();

  /* --------------------------------- handler -------------------------------- */

  const handleLogOut = () => {
    console.log("logout");
  };
  return (
    <Dialog
      open={params.open}
      onClose={params.onClose}
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
          onClick={params.onClose}
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
            Are you sure you want to <b>{"Log Out"}</b>?
          </Typography>
        </Stack>

        {/* Actions */}
        <Stack direction="row" justifyContent="flex-end" spacing={1} mt={3}>
          <Button onClick={params.onClose} variant="outlined">
            Cancel
          </Button>

          <Button onClick={handleLogOut} variant="contained" color="error">
            Log Out
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}
