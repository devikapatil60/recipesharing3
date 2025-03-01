import React from "react";

const Terms = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Terms & Conditions</h1>
      <p style={styles.paragraph}>
        Welcome to <strong>TasteHub</strong>, your go-to platform for discovering and sharing delicious recipes. 
        By using our platform, you agree to the following terms.
      </p>

      <h2 style={styles.subheading}>1. User Responsibilities</h2>
      <p style={styles.paragraph}>
        - Users must provide accurate information when submitting recipes. <br />
        - Content must be original and should not infringe on copyrights. <br />
        - Any abusive, offensive, or spam content will be removed.
      </p>

      <h2 style={styles.subheading}>2. Content Usage</h2>
      <p style={styles.paragraph}>
        Recipes shared on TasteHub remain the property of the user but may be used for promotional purposes on our platform.
      </p>

      <h2 style={styles.subheading}>3. Privacy Policy</h2>
      <p style={styles.paragraph}>
        We respect your privacy. Read our <a href="/privacy" style={styles.link}>Privacy Policy</a> to understand how we handle your data.
      </p>

      <h2 style={styles.subheading}>4. Changes to Terms</h2>
      <p style={styles.paragraph}>
        These terms may be updated from time to time. Continued use of TasteHub implies acceptance of the latest version.
      </p>

      <p style={styles.footer}>Last updated: February 2025</p>
    </div>
  );
};


const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
    background: "#1f1c16", 
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    fontFamily: "'Arial', sans-serif",
    lineHeight: "1.6",
    color: "#f1f1f1",
    border: "1px solid #e91e63",
  },
  heading: {
    textAlign: "center",
    color: "#e91e63", 
  },
  subheading: {
    color: "#ff9800",
    marginTop: "20px",
  },
  paragraph: {
    fontSize: "16px",
    color: "#ddd", 
  },
  link: {
    color: "#ff9800", 
    textDecoration: "none",
    fontWeight: "bold",
  },
  footer: {
    marginTop: "30px",
    fontSize: "14px",
    textAlign: "center",
    color: "#bbb",
  },
};

export default Terms;
