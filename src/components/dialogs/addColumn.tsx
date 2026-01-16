import { Dialog, IconButton, Stack, Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Field, Form, Formik, type FormikHelpers } from "formik";
import { StyledTextField } from "../../lib/styled";
import * as Yup from "yup";
import { StyledAddButton } from "../button";
import { addColumnApi, type AddColumnType } from "../../api/dashboard";
import { useState } from "react";
import CircularIndeterminate from "../loading";

interface Params {
  isOpen: boolean;
  onClose: () => void;
  boardId: string;
  onReset: () => void;
}

export default function AddColumnDialog(params: Params) {
  const { isOpen, onClose, boardId, onReset } = params;

  /* --------------------------------- states --------------------------------- */
  const [loading, setLoading] = useState<boolean>(false);

  /* -------------------------------- variables ------------------------------- */
  const theme = useTheme();

  /* --------------------------------- handler -------------------------------- */
  const handleSubmit = async (
    values: AddColumnType,
    actions: FormikHelpers<AddColumnType>,
  ) => {
    try {
      setLoading(true);
      const res = await addColumnApi(values);
      if (res.status === 201) {
        setLoading(false);
      }

      actions.resetForm();
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      onReset();
      onClose();
    }
  };

  /* ------------------------------- validation ------------------------------- */
  const validation = Yup.object({
    name: Yup.string()
      .min(2, "Title is too short")
      .max(30, "Title is too long")
      .required("Title is required"),
  });

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
            validationSchema={validation}
            onSubmit={handleSubmit}
          >
            <Form>
              <Stack spacing={3} mt={3}>
                <Field name="name">
                  {({ field, meta }: any) => (
                    <StyledTextField
                      {...field}
                      type="text"
                      placeholder="Title"
                      fullWidth
                      sx={{
                        maxHeight: 49,
                      }}
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>

                {loading ? (
                  <CircularIndeterminate />
                ) : (
                  <StyledAddButton title="Add" type="submit" />
                )}
              </Stack>
            </Form>
          </Formik>
        </Stack>
      </Stack>
    </Dialog>
  );
}
