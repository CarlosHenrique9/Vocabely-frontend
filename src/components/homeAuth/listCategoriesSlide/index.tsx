import styles from "../../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import categoriesService, { CategoryType } from "../../../services/categoriesService";
import SlideComponent from "../../common/slideComponent";
import PageSpinner from "../../common/spinner";

interface Props {
  categoryId: number;
  categoryName: string;
}

const ListCategoriesSlide = function ({ categoryId, categoryName }: Props) {
  const { data, error } = useSWR(
    `/categories/${categoryId}`,
    () => categoriesService.getCourses(categoryId)
  );

  if (error) {
    return <p className="text-center text-danger">Erro ao carregar os cursos da categoria "{categoryName}". Tente novamente mais tarde.</p>;
  }

  if (!data) {
    return <PageSpinner />;
  }

  // Verifica se a lista de cursos está presente
  const courses = data.data.courses || [];

  return (
    <>
      <p className={styles.titleCategory}>{categoryName}</p>
      {courses.length > 0 ? (
        <SlideComponent course={courses} />
      ) : (
        <p className="text-center">Nenhum curso disponível nesta categoria.</p>
      )}
    </>
  );
};

export default ListCategoriesSlide;
