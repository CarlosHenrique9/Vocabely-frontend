import HeaderGeneric from "@/src/components/common/headerGeneric";
import styles from "../styles/registerLogin.module.scss";
import Head from "next/head";

const Register = function () {
  return (
    <>
			<Head>
        <title>Langflix - Registro</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <main>
	   <HeaderGeneric logoUrl="/" btnUrl="/login" btnContent="Quero fazer login"/>
</main>
    </>
  );
};

export default Register;
