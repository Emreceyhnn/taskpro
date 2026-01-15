import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

export default function CircularIndeterminate() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        mt: 2,
        paddingBlock: 1.8,
        borderRadius: "8px",
        backgroundColor: theme.palette.buttonPrimary.buttonBg,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
      }}
    >
      <CircularProgress
        sx={{
          color: theme.palette.buttonPrimary.iconColor,
        }}
      />
    </Box>
  );
}
