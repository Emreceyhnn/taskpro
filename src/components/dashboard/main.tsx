import { Box, Stack, Typography, useTheme } from "@mui/material";
import Column from "./column";
import type { BoardParams } from "../../lib/types";
import { useState } from "react";
import AddColumnDialog from "../dialogs/addColumn";
import { StyledAddButtonVariant } from "../button";
import Filter from "./filter";

export default function Dashboard(params: BoardParams) {
  /* --------------------------------- PARAMS --------------------------------- */
  const { columns = [], title } = params;

  /* --------------------------------- STATES --------------------------------- */
  const [isAddDialogOpen, setAddDialogOpen] = useState<boolean>(false);

  /* -------------------------------- handlers -------------------------------- */
  const dialogHandler = () => {
    setAddDialogOpen(false);
  };

  /* -------------------------------- VARIABLES ------------------------------- */
  const theme = useTheme();
  /* ---------------------------------- utils --------------------------------- */

  const columnsName = columns.map((i) => ({
    title: i.title,
    id: i.columnId,
  }));

  return (
    <>
      <Stack p={"10px 24px 10px 24px"} direction={"column"} gap={"38px"}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 500,
              color: theme.palette.text.primary,
            }}
          >
            {title}
          </Typography>
          <Filter />
        </Stack>

        <Box width={"100%"}>
          <Stack direction={"row"} overflow={"hidden"} width="100%">
            <Stack
              direction={"row"}
              gap={"34px"}
              overflow={"auto"}
              width="100%"
            >
              {columns.map((i) => (
                <Column key={i.columnId} {...i} columnNames={columnsName} />
              ))}
              <StyledAddButtonVariant
                title="Add another column"
                onClick={() => {
                  setAddDialogOpen(true);
                }}
                sx={{
                  flex: {
                    xs: "0 0 calc(100%)",
                    mobile: "0 0 calc(50% - 17px)",
                    md: "0 0 calc(50% - 110px)",
                    lg: "0 0 calc(33% - 90px)",
                    xl: "0 0 calc(25%)",
                    xxl: "0 0 calc(25% - 110px)",
                  },
                }}
              />
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <AddColumnDialog isOpen={isAddDialogOpen} onClose={dialogHandler} />
    </>
  );
}
