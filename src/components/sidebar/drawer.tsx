import { Box, Drawer, IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {
  children?: React.ReactNode;
}

export default function DrawerSideBar({ children }: Props) {
  /* ---------------------------------- STATE --------------------------------- */
  const [open, setOpen] = useState<boolean>(false);

  /* --------------------------------- TOGGLE --------------------------------- */
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  /* -------------------------------- VARIABLE -------------------------------- */
  const theme = useTheme();

  return (
    <>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ fontSize: 24, color: theme.palette.text.primary }} />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box onClick={(e) => e.stopPropagation()}>{children}</Box>
      </Drawer>
    </>
  );
}
