import { makeStyles, tokens, Text } from "@fluentui/react-components";

const useStyles = makeStyles({
  title: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "8px",
    color: tokens.colorNeutralForeground1,
  },
  subtitle: { color: tokens.colorNeutralForeground3 },
});

function Team() {
  const styles = useStyles();
  return (
    <div>
      <Text block className={styles.title}>
        Team
      </Text>
      <Text block className={styles.subtitle}>
        Your team will appear here.
      </Text>
    </div>
  );
}

export default Team;
