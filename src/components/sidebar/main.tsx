import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SideBarListItem from "./listItem";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import plant from "../../assets/plant.png";
import type { BoardParams } from "../../lib/types";
import { useState } from "react";
import AddBoard from "../dialogs/addBoard";
import NeedHelpDialog from "../dialogs/needHelp";
import LogOutDialog from "../dialogs/logOut";
import { iconLogo } from "../../lib/utils";
import ListItemSkeleton from "./skeleton";

export interface SidebarParams {
  boards: BoardParams[];
  onChange: (board: BoardParams) => void;
}

export default function SideBar({ boards, onChange }: SidebarParams) {
  const [activeBoardId, setActiveBoardId] = useState<string>("");
  const [addBoardDialog, setAddBoardDialog] = useState<boolean>(false);
  const [needHelpDialog, setNeedHelpDialog] = useState<boolean>(false);
  const [logOutDialog, setLogOutDialog] = useState<boolean>(false);

  const theme = useTheme();

  /* -------------------------------- HANDLERS -------------------------------- */
  const handleSelectBoard = (board: BoardParams) => {
    setActiveBoardId(board.boardId);
    onChange(board);
  };

  const handleDialog = () => {
    setAddBoardDialog(false);
  };

  const handleNeedDialog = () => {
    setNeedHelpDialog(false);
  };

  const handleLogOut = () => {
    setLogOutDialog(false);
  };

  return (
    <>
      <Box
        maxWidth={260}
        minHeight={"100vh"}
        bgcolor={theme.palette.background.sidebar}
        flexDirection={"column"}
        display={"flex"}
      >
        <Stack p={3}>
          <Stack spacing={1} direction={"row"} alignItems={"center"}>
            <svg width="32" height="32">
              <use
                href={iconLogo}
                style={
                  {
                    "--color1": theme.palette.logo.color1,
                    "--color2": theme.palette.logo.color2,
                  } as React.CSSProperties
                }
              />
            </svg>

            <Typography
              sx={{
                fontWeight: 600,
                fontStyle: "SemiBold",
                fontSize: "16px",
                letterSpacing: "-4%",
                color: theme.palette.logo.text,
              }}
            >
              Task Pro
            </Typography>
          </Stack>
          <Stack mt={"60px"}>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "14px",
                letterSpacing: "-2%",
                color: theme.palette.text.secondary,
              }}
            >
              My boards
            </Typography>
            <Divider
              sx={{ paddingBlock: 1, color: theme.palette.text.secondary }}
            />
            <Stack
              direction={"row"}
              paddingBlock={2}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                sx={{
                  maxWidth: 80,
                  fontWeight: 500,
                  fontSize: "14px",
                  letterSpacing: "-2%",
                  color: theme.palette.text.sideBarText,
                }}
              >
                Create a new board
              </Typography>
              <IconButton
                onClick={() => {
                  setAddBoardDialog(true);
                }}
                sx={{
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "36px",
                  bgcolor: theme.palette.primary.main,
                }}
              >
                <AddIcon
                  sx={{
                    fontSize: 20,
                    color: theme.palette.primary.contrastText,
                  }}
                />
              </IconButton>
            </Stack>
            <Divider sx={{ color: theme.palette.text.secondary }} />
          </Stack>
        </Stack>
        <Stack mt={1.5} maxHeight={"60vh"} overflow={"hidden"}>
          {boards
            ? boards.map((board) => (
                <SideBarListItem
                  key={board.boardId}
                  board={board}
                  isActive={activeBoardId === board.boardId}
                  onClick={() => handleSelectBoard(board)}
                />
              ))
            : Array.from({ length: 3 }).map((_, i) => (
                <ListItemSkeleton key={i} />
              ))}
        </Stack>
        <Stack mt={"auto"} p={3} spacing={2}>
          <Box
            sx={{
              position: "relative",
              cursor: "pointer",
              "&:hover .help-content": {
                opacity: 1,
                transform: "translateY(0)",
                pointerEvents: "auto",
              },
            }}
          >
            <Box
              className="help-content"
              sx={{
                position: "absolute",
                bottom: "90%",
                left: 0,
                width: "100%",
                bgcolor: theme.palette.background.hoverBg,
                borderRadius: "8px 8px 0 0",
                p: 2.5,
                opacity: 0,
                transform: "translateY(5px)",
                pointerEvents: "none",
                transition: "all 0.25s ease",
                "&:hover .helpLabel": {
                  borderRadius: "0 0 8px 8px",
                },
              }}
            >
              <img src={plant} width={70} height={78} alt="plant" />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: theme.palette.text.primary,
                }}
              >
                If you need help with{" "}
                <span
                  style={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  }}
                >
                  TaskPro
                </span>
                , check out our support resources or reach out to our customer
                support team.
              </Typography>
            </Box>

            <Stack
              className="helpLabel"
              direction="row"
              spacing={1}
              alignItems="center"
              bgcolor={theme.palette.background.paper}
              borderRadius="8px"
              sx={{
                "&:hover": {
                  borderRadius: "0 0 8px 8px",
                },
              }}
            >
              <IconButton
                sx={{
                  borderRadius: "8px",
                }}
                onClick={() => {
                  setNeedHelpDialog(true);
                }}
              >
                <HelpOutlineIcon
                  sx={{ fontSize: 20, color: theme.palette.text.primary }}
                />
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "12px",
                    letterSpacing: "-2%",
                    color: theme.palette.text.primary,
                  }}
                >
                  Need help?
                </Typography>
              </IconButton>
            </Stack>
          </Box>

          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              gap: 1,
              p: 0,
            }}
            onClick={() => {
              setLogOutDialog(true);
            }}
          >
            <LogoutIcon
              sx={{ fontSize: 32, color: theme.palette.text.sideBarText }}
            />
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "16px",
                letterSpacing: "-2%",
                color: theme.palette.text.primary,
              }}
            >
              Log Out
            </Typography>
          </Button>
        </Stack>
      </Box>
      <NeedHelpDialog isOpen={needHelpDialog} onClose={handleNeedDialog} />
      <AddBoard isOpen={addBoardDialog} onClose={handleDialog} />
      <LogOutDialog open={logOutDialog} onClose={handleLogOut} />
    </>
  );
}
