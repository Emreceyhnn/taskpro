import "@mui/material/styles";

declare module "@mui/material/styles" {
  /* ================= ICON ================= */
  interface TypeIcon {
    primary: string;
    secondary: string;
  }

  /* ================= TEXT ================= */
  interface TypeText {
    greenText: string;
    sideBarText: string;
  }

  /* =============== BACKGROUND ============== */
  interface TypeBackground {
    dashboardBg: string;
    sidebar: string;
    header: string;
    hoverBg: string;
  }

  /* ============== BUTTONS ================= */
  interface TypeButtonPrimary {
    buttonBg: string;
    buttonBgHover: string;
    iconColor: string;
    iconBgColor: string;
    primaryText: string;
  }

  interface TypeButtonSecondary {
    buttonBg: string;
    buttonBgHover: string;
    iconColor: string;
    iconBg: string;
    primaryText: string;
  }

  /* ================= LOGO ================= */
  interface TypeLogo {
    color1: string;
    color2: string;
    text: string;
  }

  /* ================= SCROLL =============== */
  interface TypeScroll {
    color: string;
    hover: string;
    background: string;
  }
}
