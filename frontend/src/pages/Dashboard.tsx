import { makeStyles, tokens, Text } from "@fluentui/react-components";

const useStyles = makeStyles({
  title: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "8px",
    color: tokens.colorNeutralForeground1,
  },
  subtitle: {
    color: tokens.colorNeutralForeground3,
  },
});

function Dashboard() {
  const styles = useStyles();

  return (
    <div>
      <Text block className={styles.title}>
        Dashboard
      </Text>
      <Text block className={styles.subtitle}>
        Welcome to Nexus
      </Text>
    </div>
  );
}

export default Dashboard;
