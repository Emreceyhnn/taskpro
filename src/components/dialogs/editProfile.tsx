import {
  Box,
  Dialog,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Field, Form, Formik, type FormikHelpers } from "formik";
import type { FieldProps } from "formik";
import { StyledTextField } from "../../lib/styled";
import { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { StyledAddButton } from "../button";

/* ---------------------------------- TYPES --------------------------------- */

interface Params {
  isOpen: boolean;
  onClose: () => void;
  profilePhoto: string;
  name: string;
  email: string;
  password: string;
}

interface EditProfile {
  profilePhotoFile: File | null;
  profilePhoto: string;
  name: string;
  email: string;
  password: string;
}

export default function EditProfileDialog(params: Params) {
  const { isOpen, onClose, profilePhoto, name, email, password } = params;

  /* --------------------------------- states --------------------------------- */
  const [showPassword, setShowPassword] = useState<boolean>(false);

  /* -------------------------------- variables ------------------------------- */
  const theme = useTheme();

  /* --------------------------------- handler -------------------------------- */
  const handleSubmit = (
    values: EditProfile,
    actions: FormikHelpers<EditProfile>
  ) => {
    console.log(values);
    actions.resetForm();
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
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
      <Stack p={3} direction={"column"} spacing={1}>
        <Typography>Edit Profile</Typography>
        <Stack>
          <Formik<EditProfile>
            initialValues={{
              profilePhoto: profilePhoto,
              name: name,
              email: email,
              password: password,
              profilePhotoFile: null,
            }}
            onSubmit={handleSubmit}
          >
            <Form>
              <Stack width="100%" alignItems="center">
                <Field name="profilePhotoFile">
                  {({ form }: FieldProps<File | null>) => {
                    const file = form.values.profilePhotoFile;
                    const preview = file
                      ? URL.createObjectURL(file)
                      : profilePhoto;

                    return (
                      <Box
                        bgcolor={theme.palette.background.paper}
                        sx={{
                          width: 68,
                          height: 68,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "8px",
                          position: "relative",
                        }}
                      >
                        {preview ? (
                          <Box
                            component="img"
                            src={preview}
                            alt="profile"
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        ) : (
                          <PersonIcon
                            sx={{
                              fontSize: 68,
                              color: theme.palette.background.default,
                            }}
                          />
                        )}

                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          id="profile-photo-upload"
                          onChange={(e) => {
                            const selectedFile = e.currentTarget.files?.[0];
                            if (selectedFile) {
                              form.setFieldValue(
                                "profilePhotoFile",
                                selectedFile
                              );
                            }
                          }}
                        />

                        <Box
                          sx={{
                            position: "absolute",
                            bottom: -12,
                            width: 24,
                            height: 24,
                            bgcolor: theme.palette.primary.main,
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              document
                                .getElementById("profile-photo-upload")
                                ?.click()
                            }
                          >
                            <AddIcon
                              sx={{
                                fontSize: 10,
                                color: theme.palette.primary.contrastText,
                              }}
                            />
                          </IconButton>
                        </Box>
                      </Box>
                    );
                  }}
                </Field>
              </Stack>
              <Stack spacing={3} mt={3}>
                <Field
                  as={StyledTextField}
                  name="name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  required
                  sx={{
                    maxHeight: 49,
                  }}
                />
                <Field
                  as={StyledTextField}
                  name="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  sx={{
                    maxHeight: 49,
                  }}
                />
                <Field
                  as={StyledTextField}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          onClick={handleShowPassword}
                          sx={{ borderRadius: "8px" }}
                        >
                          {showPassword ? (
                            <VisibilityIcon
                              sx={{
                                color: "rgba(255,255,255,0.6)",
                                fontSize: 24,
                              }}
                            />
                          ) : (
                            <VisibilityOffIcon
                              sx={{
                                color: "rgba(255,255,255,0.6)",
                                fontSize: 24,
                              }}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <StyledAddButton title="Save" />
              </Stack>
            </Form>
          </Formik>
        </Stack>
      </Stack>
    </Dialog>
  );
}
