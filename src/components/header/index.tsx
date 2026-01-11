import {
  Box,
  Button,
  Stack,
  Typography,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import avatar from "../../assets/desktop/1.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useThemeMode } from "../../lib/ThemeContext";
import SideBar from "../sidebar";
import DrawerSideBar from "../sidebar/drawer";
import type { BoardWithColumns } from "../../lib/utils";

const themes = ["dark", "light", "violet"] as const;

export interface HeaderParams {
  boards: BoardWithColumns[] | null;
  onChange: (board: BoardWithColumns | null) => void;
}

export default function Header(params: HeaderParams) {
  /* -------------------------------- VARIABLES ------------------------------- */
  const theme = useTheme();
  const isTabletView = useMediaQuery(theme.breakpoints.down("md"));

  /* --------------------------------- STATES --------------------------------- */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { mode, setMode } = useThemeMode();
  const open = Boolean(anchorEl);

  /* -------------------------------- HANDLERS -------------------------------- */
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      p={3}
      width="100%"
      display="flex"
      justifyContent={isTabletView ? "space-between" : "flex-end"}
      alignItems="center"
      bgcolor={theme.palette.background.header}
    >
      {isTabletView && (
        <DrawerSideBar>
          <SideBar boards={params.boards} onChange={params.onChange} />
        </DrawerSideBar>
      )}
      <Stack spacing={2} direction="row" alignItems="center">
        <Button
          onClick={handleOpen}
          endIcon={
            <KeyboardArrowDownIcon
              sx={{
                fontSize: 16,
                color: theme.palette.text.primary,
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            />
          }
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "14px",
              color: theme.palette.text.primary,
            }}
          >
            Theme
          </Typography>
        </Button>

        {/* MENU */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {themes.map((item) => (
            <MenuItem
              key={item}
              onClick={() => setMode(item)}
              sx={{
                "&:hover": {
                  backgroundColor: "none",
                },
                fontWeight: 500,
                color:
                  mode === item
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </MenuItem>
          ))}
        </Menu>

        {/* USER */}
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "14px",
            color: theme.palette.text.primary,
          }}
        >
          Emre Ceyhan
        </Typography>

        <Box
          component="img"
          src={avatar}
          alt="avatar"
          width={32}
          height={32}
          sx={{ borderRadius: "8px" }}
        />
      </Stack>
    </Box>
  );
}
