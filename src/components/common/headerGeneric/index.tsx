/* eslint-disable @next/next/no-img-element */
import { Button, Container } from "reactstrap";
import styles from "./styles.module.scss";
import Link from "next/link";
interface Props {
  logoUrl: string;
  btnUrl: string;
  btnContent: string;
}

const HeaderGeneric = function ({ btnContent, btnUrl, logoUrl }: Props) {
  return (
    <div className={styles.header}>
      <Container className={styles.headerContainer}>
        <Link href="/" passHref>
          <img
            src= "/logoUrl.svg"
            alt="Vocabely Logo"
            className={styles.headerLogo}
          />
        </Link>
        <Link href={btnUrl} passHref>
          <Button outline color="light" className={styles.headerBtn}>
            {btnContent}
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default HeaderGeneric;
