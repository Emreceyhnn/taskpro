import { useEffect } from "react";
import { confirmGoogleOAuth } from "../api/auth";
import { Box, CircularProgress, Stack, useTheme } from "@mui/material";
import landingHero from "../assets/authpage.webp";

export default function GoogleCallback() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return;

    confirmGoogleOAuth(code).then(() => {
      window.location.href = "/dashboard";
    });
  }, []);

  const theme = useTheme();

  return (
    <Box sx={{ minWidth: "100vw", minHeight: "100dvh" }} bgcolor={"#fff"}>
      <Box
        sx={{
          background:
            "linear-gradient(180deg, rgba(196, 196, 196, 0) 25%, #BEDBB0 92.19%)",
          minWidth: "100vw",
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
          <img src={landingHero} width={162} height={162} />
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <CircularProgress
              sx={{
                color: theme.palette.buttonPrimary.iconColor,
              }}
            />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
