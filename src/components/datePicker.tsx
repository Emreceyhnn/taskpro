import type { FieldProps } from "formik";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTheme } from "@mui/material";
import dayjs from "dayjs";

const FormikDatePicker = ({ field, form, ...props }: FieldProps) => {
  const theme = useTheme();
  return (
    <MuiDatePicker
      {...props}
      value={field.value}
      onChange={(value) => form.setFieldValue(field.name, value)}
      sx={{ maxWidth: 140, border: "none" }}
      minDate={dayjs()}
      slotProps={{
        textField: {
          variant: "standard",
          fullWidth: false,
          InputProps: {
            disableUnderline: true,
          },
        },
        openPickerIcon: {
          sx: {
            color: theme.palette.primary.main,
          },
        },
      }}
    />
  );
};

export default FormikDatePicker;
