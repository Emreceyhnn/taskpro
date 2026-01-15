import { Box, Button, Stack, Typography } from "@mui/material";
import landingHero from "../assets/authpage.webp";
import logo from "../assets/icon.svg";
import { getGoogleOAuthUrl } from "../api/auth";
import { Link as RouterLink } from "react-router-dom";

export default function LandingPage() {
  const handleGoogleLogin = async () => {
    const url = await getGoogleOAuthUrl();
    window.location.href = url;
  };

  return (
    <Box sx={{ minWidth: "100dvw", minHeight: "100dvh" }} bgcolor={"#fff"}>
      <Box
        sx={{
          background:
            "linear-gradient(180deg, rgba(196, 196, 196, 0) 25%, #BEDBB0 92.19%)",
          minWidth: "100dvw",
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          direction={"column"}
          alignItems={"center"}
          maxWidth={473}
          spacing={4}
        >
          <img src={landingHero} width={162} height={162} loading="eager" />
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <img src={logo} width={48} height={48} alt="logo" />
            <Typography
              sx={{
                fontWeight: 600,
                fontStyle: "SemiBold",
                fontSize: "40px",
                letterSpacing: "-4%",
                color: "#161616",
              }}
            >
              Task Pro
            </Typography>
          </Stack>
          <Typography
            sx={{
              maxWidth: { md: "auto", mobile: "90dvw" },
              fontWeight: 400,
              fontSize: "14px",
              letterSpacing: "-2%",
              color: "#161616",
              textAlign: "center",
            }}
          >
            Supercharge your productivity and take control of your tasks with
            Task Pro - Don't wait, start achieving your goals now!
          </Typography>

          <Stack spacing={1}>
            <Button
              component={RouterLink}
              to="/auth/sign-up"
              variant="contained"
              sx={{
                minWidth: 370,
                bgcolor: "#161616",
                color: "#fff",
                fontWeight: 500,
                fontSize: "14px",
                letterSpacing: "-2%",
                borderRadius: "8px",
                paddingBlock: 1.5,
              }}
            >
              Register
            </Button>
            <Button
              component={RouterLink}
              to="/auth/sign-in"
              variant="text"
              sx={{
                minWidth: 370,
                color: "#161616",
                fontWeight: 500,
                fontSize: "14px",
                letterSpacing: "-2%",
                borderRadius: "8px",
                paddingBlock: 1.5,
                border: "none",
              }}
            >
              Login
            </Button>

            <Button
              onClick={handleGoogleLogin}
              fullWidth
              variant="contained"
              sx={{
                minWidth: 370,
                paddingBlock: 1.5,
                textTransform: "none",
                color: "#3c4043",
                backgroundColor: "#fff",
                borderRadius: "8px",
                gap: 1,
              }}
            >
              <Box
                component="img"
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                sx={{ width: 18, height: 18 }}
              />
              <Typography
                sx={{
                  color: "#161616",
                  fontWeight: 500,
                  fontSize: "14px",
                  letterSpacing: "-2%",
                  borderRadius: "8px",
                  border: "none",
                }}
              >
                Google ile giriş yap
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
