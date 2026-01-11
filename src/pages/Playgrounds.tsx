import { Box, Dialog, useTheme } from "@mui/material";

import { useState } from "react";
import ComponentFirst from "../TESTS/comp1";
import DialogForm from "../TESTS/comp1 copy";

export interface DialogData {
  id: string;
  title: string;
  description: string;
  date: string;
}

export default function Playground() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<DialogData | null>(null);

  const handleOpenDialog = (data: DialogData) => {
    setActiveItem(data); // 🔥 hangi child tıklandı
    setOpen(true); // 🔥 dialog aç
  };

  const handleClose = () => {
    setOpen(false);
    setActiveItem(null);
  };
  const items: DialogData[] = [
    { id: "1", title: "A", description: "AA", date: "2026-01-01" },
    { id: "2", title: "B", description: "BB", date: "2026-01-02" },
  ];
  return (
    <>
      {items.map((item) => (
        <ComponentFirst
          key={item.id}
          data={item}
          onOpenDialog={handleOpenDialog}
        />
      ))}

      <Dialog open={open} onClose={handleClose}>
        {activeItem && <DialogForm initialValues={activeItem} />}
      </Dialog>
    </>
  );
}
