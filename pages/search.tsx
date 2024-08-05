import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import { Container } from "reactstrap";
import courseService, { CourseType } from "@/src/services/courseService";
import HeaderAuth from "../src/components/common/headerAuth";
import SearchCard from "@/src/components/common/searchCard";
import Footer from "@/src/components/common/footer";
import styles from "../styles/search.module.scss";

const Search = function () {
  const router = useRouter();
  const searchName: string | undefined = typeof router.query.name === "string" ? router.query.name : undefined;
  const [searchResult, setSearchResult] = useState<CourseType[]>([]);

  const searchCourses = useCallback(async () => {
    if (searchName) {
      const res = await courseService.getSearch(searchName);
      setSearchResult(res.data.courses);
    }
  }, [searchName]);

  useEffect(() => {
    searchCourses();
  }, [searchCourses]);

  return (
    <>
      <Head>
        <title>Vocabely - {searchName}</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <HeaderAuth />
        </div>
        <div className={styles.searchContainer}>
          {searchResult.length > 0 ? (
            <Container className="d-flex flex-wrap justify-content-center gap-5 py-4">
              {searchResult.map((course) => (
                <SearchCard key={course.id} course={course} />
              ))}
            </Container>
          ) : (
            <p className={styles.noSearchText}>Nenhum resultado encontrado!</p>
          )}
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </main>
    </>
  );
}

export default Search;
