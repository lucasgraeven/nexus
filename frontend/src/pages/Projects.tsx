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

function Projects() {
  const styles = useStyles();
  return (
    <div>
      <Text block className={styles.title}>
        Projects
      </Text>
      <Text block className={styles.subtitle}>
        Your projects will appear here.
      </Text>
    </div>
  );
}

export default Projects;
