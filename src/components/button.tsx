import { Box, Button, Typography, useTheme } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const StyledAddButton = (props: ButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      {...props}
      sx={{
        width: "100%",
        mt: 2,
        paddingBlock: 1.8,
        borderRadius: "8px",
        backgroundColor: theme.palette.buttonPrimary.buttonBg,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
        ...(props.sx || {}),
      }}
    >
      <Box
        sx={{
          borderRadius: "8px",
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: theme.palette.buttonPrimary.iconBgColor,
        }}
      >
        <AddIcon
          sx={{
            fontSize: 14,
            color: theme.palette.buttonPrimary.iconColor,
          }}
        />
      </Box>

      <Typography
        sx={{
          fontWeight: 500,
          fontSize: 14,
          letterSpacing: "-2%",
          color: theme.palette.buttonPrimary.primaryText,
        }}
      >
        {props.title}
      </Typography>
    </Button>
  );
};

export const StyledAddButtonVariant = (props: ButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      {...props}
      sx={{
        height: 56,
        paddingInline: 8,
        borderRadius: "8px",
        backgroundColor: theme.palette.buttonSecondary.buttonBg,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box
        sx={{
          borderRadius: "8px",
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: theme.palette.buttonSecondary.iconBg,
        }}
      >
        <AddIcon
          sx={{
            fontSize: 14,
            color: theme.palette.buttonSecondary.iconColor,
          }}
        />
      </Box>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: 14,
          letterSpacing: "-2%",
          color: theme.palette.buttonSecondary.primaryText,
        }}
      >
        {props.title}
      </Typography>
    </Button>
  );
};
