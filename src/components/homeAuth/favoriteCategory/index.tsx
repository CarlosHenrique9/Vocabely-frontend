import useSWR from "swr";
import styles from "../../../../styles/slideCategory.module.scss";
import courseService from "@/src/services/courseService";
import SlideComponent from "../../common/slideComponent";
import PageSpinner from "../../common/spinner";

const FavoritesCourses = function () {
  const { data, error } = useSWR("/favCourses", courseService.getFavCourses);

  // Tratamento de erro e exibição de mensagem de erro amigável
  if (error) {
    return <p className="text-center text-danger">Ocorreu um erro ao carregar os cursos favoritos. Tente novamente mais tarde.</p>;
  }

  // Exibição do spinner enquanto os dados estão carregando
  if (!data) {
    return <PageSpinner />;
  }

  // Desestruturando data para simplificar o acesso
  const { courses } = data?.data || {};

  return (
    <>
      <p className={styles.titleCategory}>Minha Lista</p>
      {Array.isArray(courses) && courses.length > 0 ? (
        <SlideComponent course={courses} />
      ) : (
        <p className="h5 text-center pt-3">
          <strong>Você não tem nenhum curso na lista</strong>
        </p>
      )}
    </>
  );
};

export default FavoritesCourses;
