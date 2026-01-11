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
import dayjs from "dayjs";
import { StyledAddButton } from "../button";
import { addCardApi, type AddCardType } from "../../api/dashboard";

interface Params {
  isOpen: boolean;
  onClose: () => void;
  boardId: string;
  columnId: string;
}

export default function AddCardDialog(params: Params) {
  const { isOpen, onClose, columnId, boardId } = params;

  /* -------------------------------- variables ------------------------------- */
  const theme = useTheme();
  const PRIORITIES = [
    { value: "high", color: "#8FA1D0" },
    { value: "medium", color: "#E09CB5" },
    { value: "low", color: "#BEDBB0" },
    { value: "none", color: theme.palette.text.disabled },
  ] as const;

  /* --------------------------------- handler -------------------------------- */
  const handleSubmit = async (
    values: AddCardType,
    actions: FormikHelpers<AddCardType>
  ) => {
    try {
      const res = await addCardApi(values);

      if (res?.success) {
        console.log("sıkıntı kardeşim ya");
      }
      actions.resetForm();
      onClose();
    } catch (error) {
      console.error(error);
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
          <Formik<AddCardType>
            initialValues={{
              columnId: columnId,
              boardId: boardId,
              title: "",
              description: "",
              priority: "",
              deadline: dayjs(),
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
                <StyledAddButton title="Add" type="submit" />
              </Stack>
            </Form>
          </Formik>
        </Stack>
      </Stack>
    </Dialog>
  );
}
