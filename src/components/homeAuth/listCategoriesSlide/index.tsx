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
    `/categories/${categoryId}`, () => categoriesService.getCourses(categoryId)
  );

  if (error) return <p>Erro ao carregar os cursos da categoria {categoryName}</p>;
  if (!data) {
    return <PageSpinner />
  }

  return (
    <>
    <p className={styles.titleCategory}>{categoryName}</p>
    <SlideComponent course={data.data.courses} />
    </>
  );
};

export default ListCategoriesSlide;
