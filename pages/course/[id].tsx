import HeaderAuth from "@/src/components/common/headerAuth";
import styles from "../../styles/coursePage.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import courseService, { CourseType } from "@/src/services/courseService";

const CoursePage = function () {
  const [course, setCourse] = useState<CourseType>();
  const router = useRouter();
  const { id } = router.query;

  const getCourse = useCallback(async () => {
    if (typeof id !== "string") return;

    const res = await courseService.getEpisodes(id);

    if (res.status === 200) {
      setCourse(res.data);
    }
  }, [id]);

  useEffect(() => {
    getCourse();
  }, [id]);

  return (
    <>
      <Head>
        <title>Vocabely - {course?.name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderAuth />
        <p>{course?.name}</p>
      </main>
    </>
  );
};

export default CoursePage;
