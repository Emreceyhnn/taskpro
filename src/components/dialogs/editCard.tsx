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
import * as Yup from "yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import { Field, Form, Formik, type FormikHelpers } from "formik";
import type { FieldProps } from "formik";
import { StyledTextField, StyledTextFieldMultiLine } from "../../lib/styled";
import FormikDatePicker from "../datePicker";
import { StyledAddButton } from "../button";
import { editCardApi, type EditCardType } from "../../api/dashboard";
import dayjs from "dayjs";
import { useState } from "react";
import CircularIndeterminate from "../loading";

interface Params {
  isOpen: boolean;
  onClose: () => void;
  task: EditCardType;
  onReset: () => void;
}

export default function EditCardDialog(params: Params) {
  const { isOpen, onClose, task, onReset } = params;

  /* --------------------------------- states --------------------------------- */
  const [loading, setLoading] = useState<boolean>(false);

  /* -------------------------------- variables ------------------------------- */
  const theme = useTheme();
  const PRIORITIES = [
    { value: "high", color: "#BEDBB0" },
    { value: "medium", color: "#E09CB5" },
    { value: "low", color: "#8FA1D0" },
    { value: "none", color: theme.palette.icon.secondary },
  ] as const;

  /* --------------------------------- handler -------------------------------- */
  const handleSubmit = async (
    values: EditCardType,
    actions: FormikHelpers<EditCardType>,
  ) => {
    try {
      setLoading(true);
      const res = await editCardApi(values);
      if (res.status === 200) {
        setLoading(false);
      }
      actions.resetForm();
    } catch (err) {
      setLoading(false);
      console.log(err);
    } finally {
      onReset();
      onClose();
    }
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

  /* ------------------------------- validation ------------------------------- */
  const validation = Yup.object({
    title: Yup.string()
      .min(2, "Title is too short")
      .max(50, "Title is too long")
      .required("Title is required"),
    description: Yup.string()
      .min(2, "Description is too short")
      .required("Description is required"),
  });

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
        <Typography color={theme.palette.text.primary}>Edit Card</Typography>
        <Stack>
          <Formik<EditCardType>
            initialValues={{
              _id: task._id,
              title: task.title,
              description: task.description,
              priority: task.priority,
              deadline: task.deadline ? dayjs(task.deadline) : null,
            }}
            validationSchema={validation}
            onSubmit={handleSubmit}
          >
            <Form>
              <Stack spacing={2} mt={3}>
                <Field name="title">
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

                <Field name="description">
                  {({ field, meta }: any) => (
                    <StyledTextFieldMultiLine
                      {...field}
                      type="text"
                      multiline
                      rows={7}
                      variant="outlined"
                      placeholder="Description"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>

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
