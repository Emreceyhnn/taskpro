import {
  Box,
  Dialog,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import * as Yup from "yup";
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
import { updateUser, type CurrentUserProfileType } from "../../api/auth";
import CircularIndeterminate from "../loading";

/* ---------------------------------- TYPES --------------------------------- */

interface Params {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  userData: CurrentUserProfileType;
}

export default function EditProfileDialog(params: Params) {
  const { isOpen, onClose, userData, onReset } = params;

  /* --------------------------------- states --------------------------------- */
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  /* -------------------------------- variables ------------------------------- */
  const theme = useTheme();

  /* --------------------------------- handler -------------------------------- */
  const handleSubmit = async (
    values: CurrentUserProfileType,
    actions: FormikHelpers<CurrentUserProfileType>
  ) => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", values.name || "");
      formData.append("email", values.email || "");

      if (values.password) {
        formData.append("password", values.password);
      }

      if (values.photo !== undefined) {
        formData.append("photo", values.photo || "");
      }

      if (values.profilePhotoFile) {
        formData.append("profilePhotoFile", values.profilePhotoFile);
      }

      const res = await updateUser(formData as any);
      if (res.status === 200) {
        setLoading(false);
      }

      actions.resetForm();
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      onReset();
      onClose();
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  /* ------------------------------- validations ------------------------------ */

  const EditProfile = Yup.object({
    name: Yup.string().min(2, "Name is too short").required("Name is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .matches(/[a-z]/, "At least one lowercase letter required")
      .matches(/[A-Z]/, "At least one uppercase letter required")
      .matches(/[^a-zA-Z0-9]/, "At least one special character required"),
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
      <Stack p={3} direction={"column"} spacing={1}>
        <Typography>Edit Profile</Typography>
        <Stack>
          <Formik<CurrentUserProfileType>
            initialValues={{
              photo: userData.photo || "",
              name: userData.name,
              email: userData.email,
              password: "",
              profilePhotoFile: null,
            }}
            validationSchema={EditProfile}
            onSubmit={handleSubmit}
          >
            <Form>
              <Stack width="100%" alignItems="center">
                <Field name="profilePhotoFile">
                  {({ form }: FieldProps<File | null>) => {
                    const file = form.values.profilePhotoFile;
                    const preview = file
                      ? URL.createObjectURL(file)
                      : userData.photo;

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
                <Field name="name">
                  {({ field, meta }: any) => (
                    <StyledTextField
                      {...field}
                      type="text"
                      placeholder="Enter your name"
                      fullWidth
                      sx={{
                        maxHeight: 49,
                      }}
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>

                <Field name="email">
                  {({ field, meta }: any) => (
                    <StyledTextField
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      fullWidth
                      sx={{
                        maxHeight: 49,
                      }}
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <Field name="password">
                  {({ field, meta }: any) => (
                    <StyledTextField
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Field>
                {loading ? (
                  <CircularIndeterminate />
                ) : (
                  <StyledAddButton title="Save" type="submit" />
                )}
              </Stack>
            </Form>
          </Formik>
        </Stack>
      </Stack>
    </Dialog>
  );
}
