import { Dialog, IconButton, Stack, Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Field, Form, Formik, type FormikHelpers } from "formik";
import {
  StyledButton,
  StyledTextField,
  StyledTextFieldMultiLine,
} from "../../lib/styled";

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

  /* --------------------------------- handler -------------------------------- */
  const handleSubmit = (
    values: NeedHelpValues,
    actions: FormikHelpers<NeedHelpValues>
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
      <Stack p={3} direction={"column"}>
        <Typography>Need Help</Typography>
        <Stack>
          <Formik<NeedHelpValues>
            initialValues={{
              email: "",
              comment: "",
            }}
            onSubmit={handleSubmit}
          >
            <Form>
              <Stack spacing={2} mt={3}>
                <Field
                  as={StyledTextField}
                  name="email"
                  type="email"
                  variant="outlined"
                  placeholder="Enter your email"
                  fullWidth
                  required
                />
                <Field
                  as={StyledTextFieldMultiLine}
                  name="comment"
                  multiline
                  rows={3}
                  variant="outlined"
                  placeholder="Enter your comment"
                  fullWidth
                  required
                />
                <StyledButton>Send</StyledButton>
              </Stack>
            </Form>
          </Formik>
        </Stack>
      </Stack>
    </Dialog>
  );
}
