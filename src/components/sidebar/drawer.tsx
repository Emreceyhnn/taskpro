import { Drawer, IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {
  children?: React.ReactNode;
}

export default function DrawerSideBar({ children }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const theme = useTheme();

  return (
    <>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ fontSize: 24, color: theme.palette.text.primary }} />
      </IconButton>
      <Drawer open={open} onClick={toggleDrawer(false)}>
        {children}
      </Drawer>
    </>
  );
}
