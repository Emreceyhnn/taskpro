import {
  Box,
  Dialog,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import { Field, Form, Formik, type FormikHelpers } from "formik";
import type { FieldProps } from "formik";
import { StyledTextField, StyledTextFieldMultiLine } from "../../lib/styled";
import FormikDatePicker from "../datePicker";
import { type Dayjs } from "dayjs";
import { StyledAddButton } from "../button";

interface Params {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  priority: "high" | "medium" | "low" | "none" | "";
  deadline: Dayjs | null;
}

interface EditCard {
  title: string;
  description: string;
  priority: "high" | "medium" | "low" | "none" | "";
  deadline: Dayjs | null;
}

export default function EditCardDialog(params: Params) {
  const { isOpen, onClose, title, description, priority, deadline } = params;

  /* -------------------------------- variables ------------------------------- */
  const theme = useTheme();
  const PRIORITIES = [
    { value: "high", color: "#8FA1D0" },
    { value: "medium", color: "#E09CB5" },
    { value: "low", color: "#BEDBB0" },
    { value: "none", color: theme.palette.text.disabled },
  ] as const;

  /* --------------------------------- handler -------------------------------- */
  const handleSubmit = (values: EditCard, actions: FormikHelpers<EditCard>) => {
    console.log(values);
    actions.resetForm();
  };

  /* ------------------------------- components ------------------------------- */

  const UncheckedIcon = (color: string) => (
    <Box
      sx={{
        width: 14,
        height: 14,
        borderRadius: "50%",
        backgroundColor: color,
      }}
    />
  );

  const CheckedIcon = (color: string) => (
    <Box
      sx={{
        width: 14,
        height: 14,
        borderRadius: "50%",
        border: `1px solid ${color}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: color,
        }}
      />
    </Box>
  );

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      PaperProps={{
        sx: {
          maxWidth: "350px",
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
        <CloseIcon
          fontSize="small"
          sx={{ color: theme.palette.text.primary }}
        />
      </IconButton>
      <Stack p={3} direction={"column"} spacing={1}>
        <Typography color={theme.palette.text.primary}>Add Card</Typography>
        <Stack>
          <Formik<EditCard>
            initialValues={{
              title: title,
              description: description,
              priority: priority,
              deadline: deadline,
            }}
            onSubmit={handleSubmit}
          >
            <Form>
              <Stack spacing={2} mt={3}>
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
                <Field
                  as={StyledTextFieldMultiLine}
                  name="description"
                  multiline
                  rows={7}
                  variant="outlined"
                  placeholder="Description"
                  fullWidth
                  required
                />
                <Stack direction={"column"} alignItems={"start"} gap={"4px"}>
                  <FormLabel
                    sx={{
                      fontWeight: 400,
                      fontSize: "12px",
                      letterSpacing: "-2%",
                    }}
                  >
                    Priority
                  </FormLabel>
                  <Field name="priority">
                    {({ field }: FieldProps) => (
                      <RadioGroup row {...field}>
                        {PRIORITIES.map((p) => (
                          <FormControlLabel
                            key={p.value}
                            value={p.value}
                            sx={{ m: 0 }}
                            control={
                              <Radio
                                disableRipple
                                icon={UncheckedIcon(p.color)}
                                checkedIcon={CheckedIcon(p.color)}
                                sx={{ p: 0.5 }}
                              />
                            }
                            label=""
                          />
                        ))}
                      </RadioGroup>
                    )}
                  </Field>
                </Stack>
                <Stack direction={"column"} alignItems={"start"} gap={"4px"}>
                  <FormLabel
                    sx={{
                      fontWeight: 400,
                      fontSize: "12px",
                      letterSpacing: "-2%",
                    }}
                  >
                    Deadline
                  </FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Field name="deadline" component={FormikDatePicker} />
                  </LocalizationProvider>
                </Stack>

                <StyledAddButton title="Edit" />
              </Stack>
            </Form>
          </Formik>
        </Stack>
      </Stack>
    </Dialog>
  );
}
