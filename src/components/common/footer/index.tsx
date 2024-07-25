/* eslint-disable @next/next/no-img-element */
import { Container } from "reactstrap";
import styles from "./styles.module.scss";

const Footer = function () {
  return <>
	<Container className={styles.footer}>
	  <img src="/logoLangflix.svg" alt="logoFooter" className={styles.footerLogo} />
    <a href="https://instagram.com" target={"blank"} className={styles.footerLink}>LANGFLIX.COM</a>
  </Container>
</>
};

export default Footer
