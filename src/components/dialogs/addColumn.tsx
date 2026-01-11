import { Dialog, IconButton, Stack, Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Field, Form, Formik, type FormikHelpers } from "formik";
import { StyledTextField } from "../../lib/styled";

import { StyledAddButton } from "../button";
import { addColumnApi, type AddColumnType } from "../../api/dashboard";

interface Params {
  isOpen: boolean;
  onClose: () => void;
  boardId: string;
}

export default function AddColumnDialog(params: Params) {
  const { isOpen, onClose, boardId } = params;

  /* -------------------------------- variables ------------------------------- */
  const theme = useTheme();

  /* --------------------------------- handler -------------------------------- */
  const handleSubmit = async (
    values: AddColumnType,
    actions: FormikHelpers<AddColumnType>
  ) => {
    try {
      console.log(values);
      const res = await addColumnApi(values);

      if (res?.success) {
        console.log("sıkıntı kardeşim ya");
      }
      actions.resetForm();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          backgroundImage: "none",
          bgcolor: theme.palette.background.default,
          borderRadius: 2,
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 5, right: 5 }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      <Stack p={3} direction={"column"} spacing={1}>
        <Typography>Add Column</Typography>
        <Stack>
          <Formik<AddColumnType>
            initialValues={{
              boardId: boardId,
              name: "",
            }}
            onSubmit={handleSubmit}
          >
            <Form>
              <Stack spacing={3} mt={3}>
                <Field
                  as={StyledTextField}
                  name="name"
                  type="text"
                  variant="outlined"
                  placeholder="Title"
                  fullWidth
                  required
                  sx={{
                    maxHeight: 49,
                  }}
                />
                <StyledAddButton title="Add" type="submit" />
              </Stack>
            </Form>
          </Formik>
        </Stack>
      </Stack>
    </Dialog>
  );
}
