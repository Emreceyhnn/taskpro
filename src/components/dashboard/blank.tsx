import { Box, Typography, useTheme } from "@mui/material";

export default function BlankPage() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          maxWidth: { md: 486, mobile: "90%" },
          textAlign: "center",
          maxHeight: 72,
          letterSpacing: "-2%",
          fontSize: 14,
          fontWeight: 400,
        }}
      >
        Before starting your project, it is essential{" "}
        <span
          style={{
            color: theme.palette.primary.main,
            fontWeight: 600,
          }}
        >
          to create a board to
        </span>{" "}
        visualize and track all the necessary tasks and milestones. This board
        serves as a powerful tool to organize the workflow and ensure effective
        collaboration among team members.
      </Typography>
    </Box>
  );
}
