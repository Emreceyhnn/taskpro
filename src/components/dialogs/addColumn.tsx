import { Dialog, IconButton, Stack, Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Field, Form, Formik, type FormikHelpers } from "formik";
import { StyledTextField } from "../../lib/styled";

import { StyledAddButton } from "../button";

interface Params {
  isOpen: boolean;
  onClose: () => void;
}

interface AddColumn {
  title: string;
}

export default function AddColumnDialog(params: Params) {
  const { isOpen, onClose } = params;

  /* -------------------------------- variables ------------------------------- */
  const theme = useTheme();

  /* --------------------------------- handler -------------------------------- */
  const handleSubmit = (
    values: AddColumn,
    actions: FormikHelpers<AddColumn>
  ) => {
    console.log(values);
    actions.resetForm();
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
          <Formik<AddColumn>
            initialValues={{
              title: "",
            }}
            onSubmit={handleSubmit}
          >
            <Form>
              <Stack spacing={3} mt={3}>
                <Field
                  as={StyledTextField}
                  name="title"
                  type="text"
                  variant="outlined"
                  placeholder="Title"
                  fullWidth
                  required
                  sx={{
                    maxHeight: 49,
                  }}
                />
                <StyledAddButton title="Add" />
              </Stack>
            </Form>
          </Formik>
        </Stack>
      </Stack>
    </Dialog>
  );
}
