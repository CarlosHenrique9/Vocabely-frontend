import styles from "../../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import courseService from "../../../services/courseService";
import SlideComponent from "../../common/slideComponent";

const FeaturedCategory = function () {
  const { data, error } = useSWR("/featured", courseService.getFeaturedCourses);

  if (error) return <p>Erro ao carregar os cursos em destaque</p>;
  if (!data) return <p>Carregando...</p>;

  return (
    <>
      <p className={styles.titleCategory}>EM DESTAQUE</p>
      {data?.data?.length ? (
        <SlideComponent course={data.data} />
      ) : (
        <p className="h5 text-center pt-3">Nenhum curso em destaque disponível</p>
      )}
    </>
  );
};

export default FeaturedCategory;
