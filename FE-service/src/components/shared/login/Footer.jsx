const Footer = () => {
  const styles = {
    footer: {
      marginTop: "10px",
      textAlign: "center",
      color: "white",
    },
    link: {
      color: "blue",
      textDecoration: "none",
      margin: "0 10px",
    },
    paragraph: {
      color: "white",
      margin: "5px 0",
    },
  };

  return (
    <footer style={styles.footer}>
      <a
        href="https://github.com/rciesielski3"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.link}
      >
        GitHub
      </a>
      <a
        href="https://rciesielski3.github.io/portfolio/"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.link}
      >
        Portfolio
      </a>
      <a
        href="https://www.linkedin.com/in/rafa%C5%82-ciesielski-820309100/"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.link}
      >
        LinkedIn
      </a>
      <p style={styles.paragraph}>Copyright © 2024</p>
      <p style={styles.paragraph}>Author: Rafał Ciesielski</p>
    </footer>
  );
};

export default Footer;
