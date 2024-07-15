import Head from "next/head";
import styles from "../styles/homeNoAuth.module.scss" 
import HeaderNoAuth from "@/src/components/homeNoAuth/HeaderNoAuth";

const HomeNotAuth = function () {
  return (
    <>
      <Head>
        <title>Onebitflix</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
				<meta property="og:title" content="Langflix" key="title" />
				<meta name="description" content="Tenha acesso aos melhores conteúdos de idiomas de uma forma simples e fácil." />
      </Head>
      <main>
	<HeaderNoAuth />
      </main>
    </>
  );
};

export default HomeNotAuth;