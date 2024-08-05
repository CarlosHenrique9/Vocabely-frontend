/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import styles from "../../../styles/episodePlayer.module.scss";
import Head from "next/head";
import HeaderGeneric from "@/src/components/common/headerGeneric";
import { useEffect, useState } from "react";
import courseService, { CourseType } from "@/src/services/courseService";
import PageSpinner from "@/src/components/common/spinner";
import { Button, Container } from "reactstrap";
import ReactPlayer from "react-player";

const EpisodePlayer = function () {
  const router = useRouter();
  const [course, setCourse] = useState<CourseType>();
  const episodeOrder = parseFloat(router.query.id?.toString() || "0");
  const courseId = router.query.courseid?.toString() || "";

  const getCourse = async function () {
    if (!courseId) return;

    try {
      const res = await courseService.getEpisodes(courseId);
      if (res.status === 200) {
        setCourse(res.data);
      } else {
        console.error("Failed to fetch course:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const handleLastEpisode = () => {
    if (episodeOrder > 0) {
      const newEpisodeOrder = episodeOrder - 1;
      router.push(`/course/episode/${newEpisodeOrder}?courseid=${courseId}`);
    }
  };

  const handleNextEpisode = () => {
    if (course?.episodes && episodeOrder + 1 < course.episodes.length) {
      const newEpisodeOrder = episodeOrder + 1;
      router.push(`/course/episode/${newEpisodeOrder}?courseid=${courseId}`);
    }
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);

  if (!course || !course.episodes || episodeOrder >= course.episodes.length) {
    return <PageSpinner />;
  }

  return (
    <>
      <Head>
        <title>Vocabely - {course.episodes[episodeOrder].name}</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <main>
      <HeaderGeneric
        logoUrl="/logoVocabely.svg"
        btnContent={`Voltar para o curso`}
        btnUrl={`/course/${courseId}`}
      />


        <Container className="d-flex flex-column align-items-center gap-3 pt-3">
          <p className={styles.episodeTitle}>
            {course.episodes[episodeOrder].name}
          </p>
          {typeof window !== "undefined" && (
            <ReactPlayer
              className={styles.player}
              url={`${
                process.env.NEXT_PUBLIC_BASEURL
              }/episodes/stream?videoUrl=${
                course.episodes[episodeOrder].videoUrl
              }&token=${sessionStorage.getItem("vocabely-token")}`}
              controls
            />
          )}
          <div className={styles.episodeButtonDiv}>
            <Button
              className={styles.episodeButton}
              disabled={episodeOrder === 0}
              onClick={handleLastEpisode}
            >
              <img
                src="/episode/iconArrowLeft.svg"
                alt="setaEsquerda"
                className={styles.arrowImg}
              />
            </Button>
            <Button
              className={styles.episodeButton}
              disabled={episodeOrder + 1 === course.episodes.length}
              onClick={handleNextEpisode}
            >
              <img
                src="/episode/iconArrowRight.svg"
                alt="setaDireita"
                className={styles.arrowImg}
              />
            </Button>
          </div>
          <p className="text-center py-4">
            {course.episodes[episodeOrder].synopsis}
          </p>
        </Container>
      </main>
    </>
  );
};

export default EpisodePlayer;
