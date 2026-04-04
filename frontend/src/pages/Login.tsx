import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  makeStyles,
  tokens,
  Text,
  Input,
  Button,
  Spinner,
} from "@fluentui/react-components";
import { useLogin } from "../hooks/useAuth";
import logoDark from "../assets/logo-dark.svg";
import logoLight from "../assets/logo-light.svg";
import { useTheme } from "../contexts/ThemeContext";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  card: {
    width: "380px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusXLarge,
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    color: tokens.colorNeutralForeground1,
  },
  subtitle: {
    color: tokens.colorNeutralForeground3,
    fontSize: "14px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "500",
    color: tokens.colorNeutralForeground2,
  },
  error: {
    color: tokens.colorPaletteRedForeground1,
    fontSize: "13px",
  },
});

function Login() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { mutate: login, isPending, error } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSuccess: () => navigate("/"),
      },
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.header}>
          <img
            src={isDark ? logoDark : logoLight}
            width={32}
            height={32}
            alt="Nexus"
          />
          <Text className={styles.title}>Nexus</Text>
        </div>

        <div>
          <Text block className={styles.title} style={{ fontSize: "18px" }}>
            Welcome back
          </Text>
          <Text block className={styles.subtitle}>
            Sign in to your account
          </Text>
        </div>

        <div className={styles.field}>
          <Text className={styles.label}>Email</Text>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <Text className={styles.label}>Password</Text>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        {error && (
          <Text className={styles.error}>Invalid email or password</Text>
        )}

        <Button
          appearance="primary"
          onClick={handleLogin}
          disabled={isPending}
          icon={isPending ? <Spinner size="tiny" /> : undefined}
        >
          {isPending ? "Signing in..." : "Sign in"}
        </Button>
      </div>
    </div>
  );
}

export default Login;
