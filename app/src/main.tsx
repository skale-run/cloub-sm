import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { applyThemeToDocument } from "./theme.js";
import "./index.css";
import App from "./App.tsx";
import { AthletePortalModalProvider } from "./features/auth/AthletePortalModalContext.tsx";
import i18n from "./lib/i18n.ts";

applyThemeToDocument();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <AthletePortalModalProvider>
        <App />
      </AthletePortalModalProvider>
    </I18nextProvider>
  </StrictMode>,
);
