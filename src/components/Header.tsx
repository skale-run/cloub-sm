import { CalendarDays, GaugeCircle, Menu } from "lucide-react";
import "./Header.css";

const readiness = {
  label: "Readiness",
  value: "82 / 100",
  status: "Ready to push",
};

const milestone = {
  label: "Next milestone",
  title: "Continental trials heat",
  countdown: "12 days out",
};

type HeaderProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  pageTitle: string;
};

function Header({ isSidebarOpen, onToggleSidebar, pageTitle }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__container">
        <div className="app-header__title-group">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="app-header__menu-button"
            aria-label={`${isSidebarOpen ? "Close" : "Open"} navigation`}
            aria-expanded={isSidebarOpen}
            aria-controls="app-sidebar"
          >
            <Menu aria-hidden size={20} />
          </button>

          <h1 className="app-header__title">{pageTitle}</h1>
        </div>

        <div className="app-header__metrics">
          <div className="app-header__metric">
            <span className="app-header__metric-icon">
              <GaugeCircle aria-hidden size={20} />
            </span>
            <div className="app-header__metric-content">
              <span className="app-header__metric-label">{readiness.label}</span>
              <span className="app-header__metric-value">{readiness.value}</span>
              <span className="app-header__metric-status">{readiness.status}</span>
            </div>
          </div>

          <span className="app-header__divider" aria-hidden />

          <div className="app-header__metric">
            <span className="app-header__metric-icon">
              <CalendarDays aria-hidden size={20} />
            </span>
            <div className="app-header__metric-content">
              <span className="app-header__metric-label">{milestone.label}</span>
              <span className="app-header__metric-value">{milestone.title}</span>
              <span className="app-header__metric-status">{milestone.countdown}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
