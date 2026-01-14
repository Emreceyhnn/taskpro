import { Box, Stack, Typography, useTheme } from "@mui/material";
import Column from "./column";

import { useState } from "react";
import AddColumnDialog from "../dialogs/addColumn";
import { StyledAddButtonVariant } from "../button";
import Filter from "./filter";
import type { BoardWithColumns } from "../../lib/utils";

interface Params {
  data: BoardWithColumns;
  onReset: () => void;
  filter: (item: string) => void;
}

export default function Dashboard({ data, onReset, filter }: Params) {
  /* --------------------------------- PARAMS --------------------------------- */

  const { columns = [], title, _id } = data ?? {};

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
    title: i.name,
    id: i._id,
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
          <Filter filter={filter} />
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
                <Column
                  key={i._id}
                  columnNames={columnsName}
                  columns={i}
                  onReset={onReset}
                />
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
      <AddColumnDialog
        isOpen={isAddDialogOpen}
        onClose={dialogHandler}
        boardId={_id}
        onReset={onReset}
      />
    </>
  );
}
