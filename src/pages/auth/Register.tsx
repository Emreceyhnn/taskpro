import { Box } from "@mui/material";
import RegisterForm from "../../components/forms/RegisterForm";

export default function RegisterPage() {
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
        <RegisterForm />
      </Box>
    </Box>
  );
}
