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
import { useEffect, useState } from "react";
import avatar from "../../assets/desktop/1.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useThemeMode } from "../../lib/ThemeContext";
import SideBar from "../sidebar";
import DrawerSideBar from "../sidebar/drawer";
import type { BoardWithColumns } from "../../lib/utils";
import EditProfileDialog from "../dialogs/editProfile";
import {
  currentUser,
  updateUser,
  type CurrentUserProfileType,
} from "../../api/auth";
import type { ThemeMode } from "../../lib/theme";

const themes = ["dark", "light", "violet"] as const;

export interface HeaderParams {
  boards: BoardWithColumns[] | null;
  onChange: (board: BoardWithColumns | null) => void;
  isEmpty: boolean;
  onReset: () => void;
}

export default function Header(params: HeaderParams) {
  /* -------------------------------- VARIABLES ------------------------------- */
  const theme = useTheme();
  const isTabletView = useMediaQuery(theme.breakpoints.down("md"));

  /* --------------------------------- STATES --------------------------------- */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { mode, setMode } = useThemeMode();
  const open = Boolean(anchorEl);
  const [userData, SetUserData] = useState<CurrentUserProfileType | null>(null);

  /* -------------------------------- HANDLERS -------------------------------- */
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleResetData = async () => {
    const data = await currentUser();
    setMode(data.data.theme);
    SetUserData(data.data);
  };

  const handleChangeThemeMode = async (value: string) => {
    if (!["light", "dark", "violet"].includes(value)) return;

    const theme = value as ThemeMode;

    await updateUser({ theme });
    setMode(theme);
  };

  /* -------------------------------- LIFECYCLE ------------------------------- */
  useEffect(() => {
    const getData = async () => {
      const data = await currentUser();
      setMode(data.data.theme);
      SetUserData(data.data);
    };

    getData();
  }, []);

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
          <SideBar
            boards={params.boards}
            onChange={params.onChange}
            isEmpty={params.isEmpty}
            onReset={params.onReset}
          />
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
              onClick={() => handleChangeThemeMode(item)}
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
          component={Button}
          onClick={() => {
            setDialogOpen(true);
          }}
          sx={{
            fontWeight: 500,
            fontSize: "14px",
            color: theme.palette.text.primary,
          }}
        >
          {userData?.name}
        </Typography>

        <Box
          component="img"
          src={userData?.photo || avatar}
          onClick={() => {
            setDialogOpen(true);
          }}
          alt="avatar"
          width={32}
          height={32}
          sx={{ borderRadius: "8px" }}
        />
      </Stack>
      {userData && (
        <EditProfileDialog
          isOpen={dialogOpen}
          onClose={handleDialogClose}
          userData={userData}
          onReset={handleResetData}
        />
      )}
    </Box>
  );
}
