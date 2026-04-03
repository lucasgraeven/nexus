import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import {
  makeStyles,
  tokens,
  NavDrawer,
  NavDrawerBody,
  NavItem,
  NavDrawerHeader,
  NavDrawerFooter,
  AppItem,
  Button,
} from "@fluentui/react-components";
import {
  Grid20Regular,
  Folder20Regular,
  People20Regular,
  TaskListSquareLtr20Regular,
  WeatherMoon20Regular,
  WeatherSunny20Regular,
} from "@fluentui/react-icons";
import logoDark from "../assets/logo-dark.svg";
import logoLight from "../assets/logo-light.svg";
import { useTheme } from "../contexts/ThemeContext";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
  },
  drawer: {
    width: "260px",
    minWidth: "260px",
  },
  main: {
    flex: "1",
    overflow: "auto",
    padding: "32px",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  footer: {
    padding: "12px",
  },
});

const navItems = [
  { to: "/", label: "Dashboard", icon: <Grid20Regular /> },
  { to: "/projects", label: "Projects", icon: <Folder20Regular /> },
  { to: "/tasks", label: "Tasks", icon: <TaskListSquareLtr20Regular /> },
  { to: "/team", label: "Team", icon: <People20Regular /> },
];

function Layout() {
  const styles = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={styles.root}>
      <NavDrawer
        open
        type="inline"
        className={styles.drawer}
        selectedValue={location.pathname}
        onNavItemSelect={(_, data) => navigate(data.value as string)}
      >
        <NavDrawerHeader>
          <AppItem
            icon={
              <img
                src={isDark ? logoDark : logoLight}
                width={20}
                height={20}
                alt="Nexus"
              />
            }
          >
            Nexus
          </AppItem>
        </NavDrawerHeader>
        <NavDrawerBody>
          {navItems.map(({ to, label, icon }) => (
            <NavItem
              key={to}
              value={to}
              icon={
                <span
                  style={{
                    color:
                      location.pathname === to
                        ? tokens.colorBrandForegroundLink
                        : "inherit",
                  }}
                >
                  {icon}
                </span>
              }
            >
              {label}
            </NavItem>
          ))}
        </NavDrawerBody>
        <NavDrawerFooter className={styles.footer}>
          <Button
            appearance="subtle"
            icon={isDark ? <WeatherSunny20Regular /> : <WeatherMoon20Regular />}
            onClick={toggleTheme}
          >
            {isDark ? "Light mode" : "Dark mode"}
          </Button>
        </NavDrawerFooter>
      </NavDrawer>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
