import {
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
import CloseIcon from "@mui/icons-material/Close";
import {
  Field,
  Form,
  Formik,
  type FieldProps,
  type FormikHelpers,
} from "formik";
import { StyledTextField } from "../../lib/styled";

import { icons, backgrounds } from "../../lib/utils";
import { StyledAddButton } from "../button";
import { addBoardApi, type AddBoardType } from "../../api/dashboard";
import { useState } from "react";
import CircularIndeterminate from "../loading";

interface Params {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
}

export default function AddBoard(params: Params) {
  const { isOpen, onClose, onReset } = params;

  /* --------------------------------- states --------------------------------- */
  const [loading, setLoading] = useState<boolean>(false);

  /* -------------------------------- variables ------------------------------- */
  const theme = useTheme();

  /* --------------------------------- handler -------------------------------- */
  const handleSubmit = async (
    values: AddBoardType,
    actions: FormikHelpers<AddBoardType>,
  ) => {
    try {
      setLoading(true);
      const res = await addBoardApi(values);
      if (res.status === 201) {
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

  /* ------------------------------- validation ------------------------------- */
  const AddBoardValidation = Yup.object({
    title: Yup.string()
      .min(2, "Title is too short")
      .max(50, "Title is too long")
      .required("Title is required"),
  });

  const Icons = (src: string) => {
    return (
      <svg
        width={18}
        height={18}
        style={
          {
            "--color1": theme.palette.text.secondary,
          } as React.CSSProperties
        }
      >
        <use href={src} />
      </svg>
    );
  };

  const CheckedIcons = (src: string) => {
    return (
      <svg
        width={20}
        height={20}
        style={
          {
            "--color1": theme.palette.text.primary,
          } as React.CSSProperties
        }
      >
        <use href={src} />
      </svg>
    );
  };

  const Backgrounds = (src: string) => {
    return (
      <img
        src={src}
        width={28}
        height={28}
        alt={src}
        style={{ borderRadius: "8px" }}
      />
    );
  };

  const CheckedBackgrounds = (src: string) => {
    return (
      <img
        src={src}
        width={32}
        height={32}
        alt={src}
        style={{ borderRadius: "8px" }}
      />
    );
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
      PaperProps={{
        sx: {
          backgroundImage: "none",
          bgcolor: theme.palette.background.default,
          borderRadius: 2,
          maxWidth: "350px",
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
        <Typography>New Board</Typography>
        <Stack>
          <Formik<AddBoardType>
            initialValues={{
              title: "",
              icon: icons[0].key,
              background: backgrounds[0].key,
            }}
            validationSchema={AddBoardValidation}
            onSubmit={handleSubmit}
          >
            <Form>
              <Stack spacing={3} mt={3}>
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
                <Stack direction={"column"} alignItems={"start"} gap={"4px"}>
                  <FormLabel
                    sx={{
                      fontWeight: 400,
                      fontSize: "14px",
                      letterSpacing: "-2%",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Icons
                  </FormLabel>
                  <Field name="icon">
                    {({ field }: FieldProps) => (
                      <RadioGroup row {...field}>
                        {icons.map((p) => (
                          <FormControlLabel
                            key={p.key}
                            value={p.key}
                            sx={{ m: 0 }}
                            control={
                              <Radio
                                disableRipple
                                icon={Icons(p.value)}
                                checkedIcon={CheckedIcons(p.value)}
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
                <Stack
                  direction={"column"}
                  alignItems={"start"}
                  gap={"4px"}
                  maxWidth={"80%"}
                >
                  <FormLabel
                    sx={{
                      fontWeight: 400,
                      fontSize: "14px",
                      letterSpacing: "-2%",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Background
                  </FormLabel>
                  <Field name="background">
                    {({ field }: FieldProps) => (
                      <RadioGroup row {...field}>
                        {backgrounds.map((p) => (
                          <FormControlLabel
                            key={p.key}
                            value={p.key}
                            sx={{ m: 0 }}
                            control={
                              <Radio
                                disableRipple
                                icon={Backgrounds(p.value)}
                                checkedIcon={CheckedBackgrounds(p.value)}
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
                {loading ? (
                  <CircularIndeterminate />
                ) : (
                  <StyledAddButton title="Create" type="submit" />
                )}
              </Stack>
            </Form>
          </Formik>
        </Stack>
      </Stack>
    </Dialog>
  );
}
