/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.scss";
import useSWR from "swr";
import courseService, { CourseType } from "../../../services/courseService";
import { Button, Container } from "reactstrap";
import Link from "next/link";
import HeaderAuth from "../../common/headerAuth";
import PageSpinner from "../../common/spinner";

const FeaturedSection = function () {
  const { data, error } = useSWR("/featured", courseService.getFeaturedCourses);

  // Exibe uma mensagem de erro mais amigável
  if (error) return <p className="text-center text-danger">Ocorreu um erro ao carregar os cursos em destaque. Tente novamente mais tarde.</p>;

  // Exibe o spinner enquanto os dados estão carregando
  if (!data) return <PageSpinner />;

  // Garantir que temos pelo menos um curso para renderizar
  const firstCourse = data?.data?.[0];

  return (
    <>
      {firstCourse ? (
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${firstCourse.thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "480px",
          }}
          key={firstCourse.id}
        >
         <HeaderAuth />
          <Container className="pt-4">
            <p className={styles.title}>{firstCourse.name}</p>
            <p className={styles.description}>{firstCourse.synopsis}</p>
            <Link href={`/courses/${firstCourse.id}`}>
              <Button outline color="light" className={styles.button}>
                ACESSE AGORA!
                <img src="/buttonPlay.svg" alt="Play button" className={styles.buttonImg} />
              </Button>
            </Link>
          </Container>
        </div>
      ) : (
        <p className="text-center">Nenhum curso disponível</p>
      )}
    </>
  );
};

export default FeaturedSection;
