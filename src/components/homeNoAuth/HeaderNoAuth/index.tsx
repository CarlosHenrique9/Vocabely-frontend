/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./styles.module.scss";
import { Button, Container} from "reactstrap";

const HeaderNoAuth = function () {
  return (
	<>
		<div className={styles.ctaSection}>
			<img src="/favicon.png" alt="logoCta" className={styles.imgCta}/>
      <p>Cadastre-se para ter acesso aos cursos</p>
			<img src="favicon.png" alt="logoCta" className={styles.imgCta}/>
		</div>
		<Container className={styles.nav}>
			<img src="vocabely.svg" alt="logoLangflix" className={styles.imgLogoNav}/>
			<div>
				<Link href="/login">
					<Button className={styles.navBtn} outline>Entrar</Button>
				</Link>
				<Link href="/register">
					<Button className={styles.navBtn} outline>Quero fazer parte</Button>
				</Link>
			</div>
		</Container>
  </>
);
};

export default HeaderNoAuth;
