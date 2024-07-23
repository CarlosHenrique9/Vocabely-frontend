import Head from "next/head";
import styles from "../styles/homeNoAuth.module.scss"
import HeaderNoAuth from "@/src/components/homeNoAuth/HeaderNoAuth";
import { PresentationSection } from "@/src/components/homeNoAuth/presentationSection";
import CardsSection from "@/src/components/homeNoAuth/HeaderNoAuth/cardsSection";


const HomeNoAuth = function () {
  return (
    <>
      <Head>
        <title>Langlix</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
				<meta property="og:title" content="Langflix" key="title" />
				<meta name="description" content="Tenha acesso aos melhores conteúdos de idiomas de uma forma simples e fácil." />
      </Head>
      <main>
		<div className={styles.sectionBackground}>
			<HeaderNoAuth />
			<PresentationSection />
		</div>
		<CardsSection />
	</main>
</>
  );
};

export default HomeNoAuth;
