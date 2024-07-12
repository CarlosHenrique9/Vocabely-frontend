/* eslint-disable react/no-children-prop */
import Head from "next/head";
import styles from "../styles/homeNoAuth.module.scss" 

const HomeNotAuth = function () {
  return (
		<>
			<Head children={undefined}></Head>
			<main></main>
		</>
  )
};

export default HomeNotAuth;