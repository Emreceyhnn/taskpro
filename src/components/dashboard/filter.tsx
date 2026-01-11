import {
  Box,
  IconButton,
  Menu,
  Stack,
  Typography,
  Radio,
  useTheme,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function Filter() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [priority, setPriority] = useState<string>("");

  const open = Boolean(anchorEl);

  const theme = useTheme();

  return (
    <>
      {/* FILTER ICON */}
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        disableRipple
        sx={{
          mr: 3,
          p: 0,
          border: 0,
          outline: "none",
          backgroundColor: "transparent",

          "&:hover": {
            backgroundColor: "transparent",
          },

          "&:focus": {
            outline: "none",
            backgroundColor: "transparent",
          },

          "&:focus-visible": {
            outline: "none",
            backgroundColor: "transparent",
          },

          "&:active": {
            backgroundColor: "transparent",
          },
        }}
      >
        <FilterAltOutlinedIcon sx={{ color: theme.palette.text.primary }} />
        <Typography sx={{ ml: 0.5, color: theme.palette.text.primary }}>
          Filter
        </Typography>
      </IconButton>

      {/* MENU */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            width: 280,
            borderRadius: "12px",
            background: theme.palette.background.paper,
            color: "#fff",
            p: 2,
          },
        }}
      >
        {/* HEADER */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            fontSize={18}
            fontWeight={600}
            sx={{ color: theme.palette.text.primary }}
          >
            Filters
          </Typography>
          <IconButton size="small" onClick={() => setAnchorEl(null)}>
            <CloseIcon
              sx={{ color: theme.palette.icon.secondary, fontSize: 18 }}
            />
          </IconButton>
        </Stack>

        <Box mt={2} mb={1} height="1px" bgcolor="rgba(255,255,255,0.08)" />

        {/* LABEL COLOR */}
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              fontSize={14}
              fontWeight={500}
              sx={{ color: theme.palette.text.primary }}
            >
              Label color
            </Typography>
            <Typography
              fontSize={14}
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
                color: theme.palette.text.primary,
              }}
              onClick={() => setPriority("")}
            >
              Show all
            </Typography>
          </Stack>

          {[
            { label: "Without priority", value: "", color: "#6b6b6b" },
            { label: "Low", value: "low", color: "#8fa1d0" },
            { label: "Medium", value: "medium", color: "#e09cb5" },
            { label: "High", value: "high", color: "#bedbb0" },
          ].map((item) => (
            <Stack
              key={item.label}
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ cursor: "pointer" }}
              onClick={() => setPriority(item.value)}
            >
              <Radio
                checked={priority === item.value}
                size="small"
                sx={{
                  color: item.color,
                  "&.Mui-checked": { color: item.color },
                }}
              />
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: item.color,
                }}
              />
              <Typography
                fontSize={14}
                sx={{ color: theme.palette.text.primary }}
              >
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Menu>
    </>
  );
}
