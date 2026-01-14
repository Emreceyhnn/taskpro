import { Box, Button, Stack, Typography } from "@mui/material";
import landingHero from "../assets/authpage.png";
import { Link as RouterLink } from "react-router-dom";

export default function NotFound() {
  return (
    <Box sx={{ minWidth: "100vw", minHeight: "100vh" }} bgcolor={"#fff"}>
      <Box
        sx={{
          background:
            "linear-gradient(180deg, rgba(196, 196, 196, 0) 25%, #BEDBB0 92.19%)",
          minWidth: "100vw",
          minHeight: "100vh",
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
            <Typography
              sx={{
                fontWeight: 600,
                fontStyle: "SemiBold",
                fontSize: "40px",
                letterSpacing: "-4%",
                color: "#161616",
              }}
            >
              Not Found
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <Button
              component={RouterLink}
              to="/"
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
              Home
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
