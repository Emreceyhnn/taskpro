import * as Yup from "yup";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import type { FormikHelpers } from "formik";
import { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { StyledTextFieldAuth } from "../../lib/styled";
import { register } from "../../api/auth";
import CircularIndeterminate from "../loading";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  /* -------------------------------- VARIABLES ------------------------------- */
  const navigate = useNavigate();

  /* --------------------------------- STATES --------------------------------- */
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  /* -------------------------------- HANDLERS -------------------------------- */
  const handleSubmit = async (
    values: RegisterFormValues,
    actions: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      setLoading(true);
      const res = await register(values);
      if (res.status === 201) {
        setLoading(false);
        navigate("/auth/sign-in");
      }

      actions.resetForm();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  /* ------------------------------- validation ------------------------------- */
  const RegisterSchema = Yup.object({
    name: Yup.string().min(2, "Name is too short").required("Name is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .matches(/[a-z]/, "At least one lowercase letter required")
      .matches(/[A-Z]/, "At least one uppercase letter required")
      .matches(/[^a-zA-Z0-9]/, "At least one special character required")
      .required("Password is required"),
  });

  return (
    <Box
      maxWidth={{ sm: 450, xs: "95%" }}
      width={"100%"}
      bgcolor={"#151515"}
      borderRadius={"8px"}
    >
      <Box p="40px">
        <Stack direction="row" spacing={2} mb={5}>
          <Typography
            component={RouterLink}
            to="/auth/sign-up"
            sx={{
              fontWeight: 500,
              fontSize: "18px",
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
            }}
          >
            Register
          </Typography>

          <Typography
            component={RouterLink}
            to="/auth/sign-in"
            sx={{
              fontWeight: 500,
              fontSize: "18px",
              letterSpacing: "-0.02em",
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            Login
          </Typography>
        </Stack>

        <Formik<RegisterFormValues>
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={RegisterSchema}
        >
          <Form>
            <Stack spacing={2} mt={3}>
              <Field name="name">
                {({ field, meta }: any) => (
                  <StyledTextFieldAuth
                    {...field}
                    type="text"
                    placeholder="Enter your name"
                    fullWidth
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>

              <Field name="email">
                {({ field, meta }: any) => (
                  <StyledTextFieldAuth
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                    fullWidth
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>

              <Field name="password">
                {({ field, meta }: any) => (
                  <StyledTextFieldAuth
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
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    mt: "4px",
                    width: "100%",
                    backgroundColor: "#BEDBB0",
                    fontWeight: 500,
                    fontSize: "14px",
                    letterSpacing: "-0.02em",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "none",

                    "&:hover": {
                      backgroundColor: "#9DC888",
                      boxShadow: "none",
                    },

                    "&:active": {
                      boxShadow: "none",
                      outline: "none",
                    },

                    "&:focus": {
                      outline: "none",
                    },

                    "&:focus-visible": {
                      outline: "none",
                      boxShadow: "none",
                    },

                    "&.Mui-focusVisible": {
                      outline: "none",
                      boxShadow: "none",
                    },
                  }}
                >
                  Register Now
                </Button>
              )}
            </Stack>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
}
