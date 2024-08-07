/* eslint-disable @next/next/no-img-element */
import HeaderAuth from "@/src/components/common/headerAuth";
import styles from "../../styles/coursePage.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import courseService, { CourseType } from "@/src/services/courseService";
import { Button, Container } from "reactstrap";
import PageSpinner from "@/src/components/common/spinner";
import EpisodeList from "@/src/components/episodeList";
import Footer from "@/src/components/common/footer";

const CoursePage = function () {
  const [course, setCourse] = useState<CourseType>();
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!sessionStorage.getItem("vocabely-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  const getCourse = useCallback(async () => {
    if (typeof id !== "string") return;

    const res = await courseService.getEpisodes(id);
    if (res.status === 200) {
      setCourse(res.data);
      setLiked(res.data.liked);
      setFavorited(res.data.favorited);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getCourse();
    }
  }, [id, getCourse]);

  const handleLikeCourse = async () => {
    if (liked) {
      await courseService.removeLike(id as string);
      setLiked(false);
    } else {
      await courseService.like(id as string);
      setLiked(true);
    }
  };

  const handleFavCourse = async () => {
    if (favorited) {
      await courseService.removeFav(id as string);
      setFavorited(false);
    } else {
      await courseService.addToFav(id as string);
      setFavorited(true);
    }
  };

  if (course === undefined) return <PageSpinner />;

  return (
    <>
      <Head>
        <title>Vocabely - {course?.name}</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <main>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl || ''})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "450px",
          }}
        >
          <HeaderAuth />
        </div>
        <Container className={styles.courseInfo}>
          <p className={styles.courseTitle}>{course?.name || 'Loading...'}</p>
          <p className={styles.courseDescription}>{course?.synopsis || 'Loading...'}</p>
          <Button
            outline
            className={styles.courseBtn}
            disabled={course?.episodes?.length === 0}
          >
            ASSISTA AGORA!
            <img
              src="/buttonPlay.svg"
              alt="buttonImg"
              className={styles.buttonImg}
            />
          </Button>
          <div className={styles.interactions}>
            <img
              src={liked ? "/course/iconLiked.svg" : "/course/iconLike.svg"}
              alt={liked ? "likedImage" : "likeImage"}
              className={styles.interactionImages}
              onClick={handleLikeCourse}
            />
            <img
              src={favorited ? "/course/iconFavorited.svg" : "/course/iconAddFav.svg"}
              alt={favorited ? "favorited" : "addFav"}
              className={styles.interactionImages}
              onClick={handleFavCourse}
            />
          </div>
        </Container>
        <Container className={styles.episodeInfo}>
          <p className={styles.episodeDivision}>EPISÓDIOS</p>
          <p className={styles.episodeLength}>
            {course?.episodes?.length} episódios
          </p>
          {course?.episodes?.length === 0 ? (
            <p>
              <strong>Não temos episódios ainda, volte outra hora! &#128579;</strong>
            </p>
          ) : (
            course?.episodes?.map((episode) => (
              <EpisodeList key={episode.id} episode={episode} course={course} />
            ))
          )}
        </Container>
        <Footer />
      </main>
    </>
  );
};

export default CoursePage;
