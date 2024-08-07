import useSWR from "swr";
import courseService from "../../../services/courseService";
import SlideComponent from "../../common/slideComponent";
import styles from "../../../../styles/slideCategory.module.scss";
import PageSpinner from "../../common/spinner";

const NewestCategory = function () {
  const { data, error } = useSWR("/newest", courseService.getNewestCourses);

  if (error) {
    return <div className="text-center text-danger">Erro ao carregar os cursos mais recentes. Tente novamente mais tarde.</div>;
  }

  if (!data) {
    return <PageSpinner />;
  }

  // Verifica se a lista de cursos está presente
  const courses = data.data || [];

  return (
    <>
      <p className={styles.titleCategory}>LANÇAMENTOS</p>
      {courses.length > 0 ? (
        <SlideComponent course={courses} />
      ) : (
        <p className="text-center">Nenhum lançamento disponível no momento.</p>
      )}
    </>
  );
};

export default NewestCategory;
