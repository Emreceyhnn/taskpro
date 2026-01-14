import { Dialog, IconButton, Stack, Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Field, Form, Formik, type FormikHelpers } from "formik";
import { StyledTextField } from "../../lib/styled";
import * as Yup from "yup";
import { StyledAddButton } from "../button";
import { EditColumn, type EditColumnType } from "../../api/dashboard";
import { useState } from "react";
import CircularIndeterminate from "../loading";

interface Params {
  isOpen: boolean;
  onClose: () => void;
  columnId: string;
  name: string;
  onReset: () => void;
}

export default function EditColumnDialog(params: Params) {
  const { isOpen, onClose, name, columnId, onReset } = params;

  /* --------------------------------- states --------------------------------- */
  const [loading, setLoading] = useState<boolean>(false);

  /* -------------------------------- variables ------------------------------- */
  const theme = useTheme();

  /* --------------------------------- handler -------------------------------- */
  const handleSubmit = async (
    values: EditColumnType,
    actions: FormikHelpers<EditColumnType>
  ) => {
    try {
      setLoading(true);
      const res = await EditColumn(values);
      if (res.status === 200) {
        setLoading(false);
      }
      actions.resetForm();
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      onClose();
      onReset();
    }
  };

  /* ------------------------------- validation ------------------------------- */
  const validation = Yup.object({
    name: Yup.string()
      .min(2, "Title is too short")
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
        <Typography>Edit Column</Typography>
        <Stack>
          <Formik<EditColumnType>
            initialValues={{
              _id: columnId,
              name: name,
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
                  <StyledAddButton title="Edit" type="submit" />
                )}
              </Stack>
            </Form>
          </Formik>
        </Stack>
      </Stack>
    </Dialog>
  );
}
