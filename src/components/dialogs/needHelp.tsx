import { Dialog, IconButton, Stack, Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Field, Form, Formik, type FormikHelpers } from "formik";
import {
  StyledButton,
  StyledTextField,
  StyledTextFieldMultiLine,
} from "../../lib/styled";
import * as Yup from "yup";
import { useState } from "react";
import CircularIndeterminate from "../loading";
import { needHelpApi } from "../../api/needHelp";

/* ---------------------------------- TYPES --------------------------------- */
interface Params {
  isOpen: boolean;
  onClose: () => void;
}

interface NeedHelpValues {
  email: string;
  comment: string;
}

export default function NeedHelpDialog(params: Params) {
  const { isOpen, onClose } = params;

  /* -------------------------------- variables ------------------------------- */
  const theme = useTheme();

  /* --------------------------------- states --------------------------------- */
  const [loading, setLoading] = useState<boolean>(false);

  /* --------------------------------- handler -------------------------------- */
  const handleSubmit = async (
    values: NeedHelpValues,
    actions: FormikHelpers<NeedHelpValues>
  ) => {
    try {
      setLoading(true);
      await needHelpApi(values);
      actions.resetForm();
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  /* ------------------------------- validation ------------------------------- */
  const validation = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    comment: Yup.string()
      .min(2, "Comment is too short")
      .max(255, "Comment max contain 255 characters")
      .required("Comment is required"),
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
      <Stack p={3} direction={"column"}>
        <Typography>Need Help</Typography>
        <Stack>
          <Formik<NeedHelpValues>
            initialValues={{
              email: "",
              comment: "",
            }}
            validationSchema={validation}
            onSubmit={handleSubmit}
          >
            <Form>
              <Stack spacing={2} mt={3}>
                <Field name="email">
                  {({ field, meta }: any) => (
                    <StyledTextField
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <Field name="comment">
                  {({ field, meta }: any) => (
                    <StyledTextFieldMultiLine
                      {...field}
                      type="text"
                      multiline
                      rows={3}
                      variant="outlined"
                      placeholder="Comment"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
                {loading ? (
                  <CircularIndeterminate />
                ) : (
                  <StyledButton type="submit">Send</StyledButton>
                )}
              </Stack>
            </Form>
          </Formik>
        </Stack>
      </Stack>
    </Dialog>
  );
}
