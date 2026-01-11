import { Box } from "@mui/material";
import LoginForm from "../../components/forms/LoginForm";

export default function LoginPage() {
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
        <LoginForm />
      </Box>
    </Box>
  );
}
