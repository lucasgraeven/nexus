import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import {
  makeStyles,
  tokens,
  NavDrawer,
  NavDrawerBody,
  NavItem,
  NavDrawerHeader,
  AppItem,
} from "@fluentui/react-components";
import {
  Grid20Regular,
  Folder20Regular,
  People20Regular,
  TaskListSquareLtr20Regular,
} from "@fluentui/react-icons";
import logo from "../assets/logo.svg";

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
          <AppItem icon={<img src={logo} width={20} height={20} alt="Nexus" />}>
            Nexus
          </AppItem>
        </NavDrawerHeader>
        <NavDrawerBody>
          {navItems.map(({ to, label, icon }) => (
            <NavItem key={to} value={to} icon={icon}>
              {label}
            </NavItem>
          ))}
        </NavDrawerBody>
      </NavDrawer>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
