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
import { login } from "../../api/auth";
import CircularIndeterminate from "../loading";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  /* -------------------------------- VARIABLES ------------------------------- */
  const navigate = useNavigate();

  /* --------------------------------- STATES --------------------------------- */
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  /* -------------------------------- HANDLERS -------------------------------- */
  const handleSubmit = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    try {
      setLoading(true);

      const res = await login(values);

      if (res.status === 200) {
        navigate("/dashboard");
        return;
      }

      if (res.status === 401) {
        actions.setFieldError("password", "Email or password is incorrect");
      }
    } catch (error) {
      console.log(error);
      actions.setFieldError("password", "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const LoginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
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
              color: "rgba(255, 255, 255, 0.5)",
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
              color: "#FFFFFF",
            }}
          >
            Login
          </Typography>
        </Stack>

        <Formik<LoginFormValues>
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={LoginSchema}
        >
          <Form>
            <Stack spacing={2} mt={3}>
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

              <Field
                as={StyledTextFieldAuth}
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                placeholder="Enter your password"
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton onClick={handleShowPassword}>
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
              {loading ? (
                <CircularIndeterminate />
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: "4px",
                    width: "100%",
                    backgroundColor: "#BEDBB0",
                    fontWeight: 500,
                    fontSize: "14px",
                    letterSpacing: "-0.02em",
                    padding: "12px",
                    borderRadius: 8,
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
                  }}
                >
                  Log In Now
                </Button>
              )}
            </Stack>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
}
