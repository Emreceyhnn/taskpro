import { IconButton, Menu, Stack, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { arrowCircle } from "../../lib/utils";

interface MoveMenuProps {
  alreadyInColumn: string;
  columns: { id: string; title: string }[];
  onMove: (columnId: string) => void;
}

export default function MoveMenu({
  alreadyInColumn,
  columns,
  onMove,
}: MoveMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      {/* TRIGGER */}
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
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            minWidth: 220,
            borderRadius: "12px",
            backgroundColor: theme.palette.background.paper,
            p: 1,
          },
        }}
      >
        {columns.map((col) => {
          const isActive = col.id === alreadyInColumn;

          return (
            <Stack
              key={col.id}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              px={2}
              py={1.2}
              sx={{
                borderRadius: "8px",
                cursor: isActive ? "default" : "pointer",
                opacity: isActive ? 0.6 : 1,
                "&:hover": {
                  backgroundColor: isActive
                    ? "transparent"
                    : "rgba(255,255,255,0.06)",
                },
              }}
              onClick={() => {
                if (isActive) return;
                onMove(col.id);
                handleClose();
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  color: isActive
                    ? theme.palette.icon.primary
                    : theme.palette.text.primary,
                }}
              >
                {col.title}
              </Typography>

              {!isActive && (
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
              )}
            </Stack>
          );
        })}
      </Menu>
    </>
  );
}
