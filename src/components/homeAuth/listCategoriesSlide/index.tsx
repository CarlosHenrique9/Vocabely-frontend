import styles from "../../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import SlideComponent from "../../common/slideComponent";
import categoriesService from "@/src/services/categoriesService";

interface Props {
  categoryId: number;
  categoryName: string;
}

const ListCategoriesSlide = function ({ categoryId, categoryName }: Props) {
  const { data, error } = useSWR(`/categoriesCourses?categoryId=${categoryId}`, categoriesService.getCourses);

  if (error) return <p>Erro ao carregar os cursos</p>;
  if (!data) return <p>Carregando...</p>;

  return (
    <>
      <p className={styles.titleCategory}>{categoryName}</p>
      <SlideComponent course={data.data.courses} />
    </>
  );
};

export default ListCategoriesSlide;
