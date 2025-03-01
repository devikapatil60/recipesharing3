import React from "react";

const Privacy = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Privacy Policy</h1>
      <p style={styles.paragraph}>
        At <strong>TasteHub</strong>, we value your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when using our platform.
      </p>

      <h2 style={styles.subheading}>1. Information We Collect</h2>
      <p style={styles.paragraph}>
        - Personal details like name, email, and profile information when you register. <br />
        - Recipes and other content you share on our platform. <br />
    
      </p>

      <h2 style={styles.subheading}>2. How We Use Your Information</h2>
      <p style={styles.paragraph}>
        - To personalize your experience and recommend recipes. <br />
        - To improve our services and develop new features. <br />
      </p>

      <h2 style={styles.subheading}>3. Data Protection</h2>
      <p style={styles.paragraph}>
        We take appropriate security measures to protect your data but cannot guarantee complete security due to online risks.
      </p>

      <h2 style={styles.subheading}>4. Sharing Your Information</h2>
      <p style={styles.paragraph}>
        We do not sell or share your personal data with third parties except when required by law or for essential service functionality.
      </p>

      <h2 style={styles.subheading}>5. Your Rights</h2>
      <p style={styles.paragraph}>
        - You can request access to the personal data we store about you. <br />
        - You may opt out of marketing emails by adjusting your settings.
      </p>

      <h2 style={styles.subheading}>6. Changes to This Policy</h2>
      <p style={styles.paragraph}>
        We may update this Privacy Policy. Continued use of TasteHub after changes implies your acceptance of the updated policy.
      </p>

      <h2 style={styles.subheading}>7. Contact Us</h2>
      <p style={styles.paragraph}>
        If you have any questions, please contact us at 
        <a href="mailto:support@tastehub.com" style={styles.link}> support@tastehub.com</a>.
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

export default Privacy;
