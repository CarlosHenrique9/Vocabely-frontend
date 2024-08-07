import styles from "../../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import courseService from "../../../services/courseService";
import SlideComponent from "../../common/slideComponent";
import PageSpinner from "../../common/spinner"; // Ajuste no caminho da importação

const FeaturedCategory = function () {
  const { data, error } = useSWR("/featured", courseService.getFeaturedCourses);

  // Tratamento de erro mais amigável e estilizado
  if (error) {
    return <p className="text-center text-danger">Ocorreu um erro ao carregar os cursos em destaque. Tente novamente mais tarde.</p>;
  }

  // Exibição do spinner enquanto os dados estão carregando
  if (!data) {
    return <PageSpinner />;
  }

  // Verificação robusta de dados
  const courses = Array.isArray(data?.data) ? data.data : [];

  return (
    <>
      <p className={styles.titleCategory}>EM DESTAQUE</p>
      {courses.length > 0 ? (
        <SlideComponent course={courses} />
      ) : (
        <p className="h5 text-center pt-3">Nenhum curso em destaque disponível</p>
      )}
    </>
  );
};

export default FeaturedCategory;
