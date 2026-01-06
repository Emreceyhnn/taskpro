import { useEffect } from "react";
import { confirmGoogleOAuth } from "../api/auth";

export default function GoogleCallback() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return;

    confirmGoogleOAuth(code).then(() => {
      window.location.href = "/playground";
    });
  }, []);

  return <p>Google ile giriş yapılıyor...</p>;
}
