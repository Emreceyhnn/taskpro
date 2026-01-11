import type { FieldProps } from "formik";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";

const FormikDatePicker = ({ field, form, ...props }: FieldProps) => {
  return (
    <MuiDatePicker
      {...props}
      value={field.value}
      onChange={(value) => form.setFieldValue(field.name, value)}
      sx={{ maxWidth: 140, border: "none" }}
      slotProps={{
        textField: {
          variant: "standard",
          fullWidth: false,
          InputProps: {
            disableUnderline: true,
          },
        },
      }}
    />
  );
};

export default FormikDatePicker;
