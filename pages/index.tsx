import Head from "next/head";
import styles from "../styles/homeNoAuth.module.scss"
import HeaderNoAuth from "@/src/components/homeNoAuth/HeaderNoAuth";
import { PresentationSection } from "@/src/components/homeNoAuth/presentationSection";
import CardsSection from "@/src/components/homeNoAuth/HeaderNoAuth/cardsSection";
import SlideSection from "@/src/components/homeNoAuth/slideSection";
import { GetStaticProps } from "next";
import courseService, { CourseType } from "@/src/services/courseService";
import { ReactNode } from "react";

interface IndexPageProps {
  children?: ReactNode;
  course: CourseType[];
}

const HomeNoAuth = ({course}: IndexPageProps) => {
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
    <SlideSection newestCourses={course}/>
	</main>
</>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await courseService.getNewestCourses();
  return {
    props: {
      course: res.data,
    },
    revalidate: 3600 * 24,
  };
};

export default HomeNoAuth;
