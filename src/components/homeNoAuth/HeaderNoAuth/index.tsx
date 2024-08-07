/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./styles.module.scss";
import { Button, Container } from "reactstrap";

const HeaderNoAuth = function () {
  return (
    <>
      <div className={styles.ctaSection}>
        <img src="/favicon.png" alt="Logo de chamada para ação" className={styles.imgCta} />
        <p>Cadastre-se para ter acesso aos cursos</p>
        <img src="/favicon.png" alt="Logo de chamada para ação" className={styles.imgCta} />
      </div>
      <Container className={styles.nav}>
        <img src="/vocabelyLogo.svg" alt="Logo do Vocabely" className={styles.imgLogoNav} />
        <div>
          <Link href="/login" passHref>
            <Button className={styles.navBtn} outline>Entrar</Button>
          </Link>
          <Link href="/register" passHref>
            <Button className={styles.navBtn} outline>Quero fazer parte</Button>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default HeaderNoAuth;
