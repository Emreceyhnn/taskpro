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
import CloseIcon from "@mui/icons-material/Close";
import {
  Field,
  Form,
  Formik,
  type FieldProps,
  type FormikHelpers,
} from "formik";
import { StyledTextField } from "../../lib/styled";

import { icons, backgrounds, type BoardWithColumns } from "../../lib/utils";
import { StyledAddButton } from "../button";

interface Params {
  isOpen: boolean;
  onClose: () => void;
  board: BoardWithColumns;
}

interface AddBoard {
  title: string;
  icon: string;
  background: string;
}

export default function EditBoard({ isOpen, onClose, board }: Params) {
  /* -------------------------------- variables ------------------------------- */
  const theme = useTheme();

  /* --------------------------------- handler -------------------------------- */
  const handleSubmit = (values: AddBoard, actions: FormikHelpers<AddBoard>) => {
    console.log(values);
    actions.resetForm();
  };

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
          <Formik<AddBoard>
            initialValues={{
              title: board.title,
              icon: board.icon,
              background: board.background,
            }}
            onSubmit={handleSubmit}
          >
            <Form>
              <Stack spacing={3} mt={3}>
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
                            value={p.value}
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
                            value={p.value}
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

                <StyledAddButton title="Edit" />
              </Stack>
            </Form>
          </Formik>
        </Stack>
      </Stack>
    </Dialog>
  );
}
