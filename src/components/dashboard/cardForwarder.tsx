import { IconButton, Menu, Stack, Typography, useTheme } from "@mui/material";
import { arrowCircle } from "../../lib/utils";
import { useState } from "react";

interface MoveMenuProps {
  columns: { id: string; title: string }[];
  onMove: (columnId: string) => void;
  renderTrigger: (openMenu: (el: HTMLElement) => void) => React.ReactNode;
}

export default function MoveMenu({ columns, onMove }: MoveMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const theme = useTheme();

  return (
    <>
      {/* TRIGGER ICON */}
      <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <svg
          width={18}
          height={18}
          style={
            {
              "--color1": theme.palette.icon.secondary,
            } as React.CSSProperties
          }
        >
          <use href={arrowCircle} />
        </svg>
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
            minWidth: 220,
            borderRadius: "12px",
            background: theme.palette.background.paper,
            color: "#fff",
            p: 1,
          },
        }}
      >
        {columns.map((col) => (
          <Stack
            key={col.id}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            px={2}
            py={1.2}
            sx={{
              cursor: "pointer",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.06)",
              },
            }}
            onClick={() => {
              onMove(col.id);
              setAnchorEl(null);
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                color:
                  col.title === "In progress"
                    ? theme.palette.text.greenText
                    : theme.palette.text.primary,
              }}
            >
              {col.title}
            </Typography>

            <IconButton
              size="small"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <svg
                width={18}
                height={18}
                style={
                  {
                    "--color1": theme.palette.icon.secondary,
                  } as React.CSSProperties
                }
              >
                <use href={arrowCircle} />
              </svg>
            </IconButton>
          </Stack>
        ))}
      </Menu>
    </>
  );
}
