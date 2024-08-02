import useSWR from "swr";
import courseService from "../../../services/courseService";
import SlideComponent from "../../common/slideComponent";
import styles from "../../../../styles/slideCategory.module.scss";
import PageSpinner from "../../common/spinner";

const NewestCategory = function () {
  const { data, error } = useSWR("/newest", courseService.getNewestCourses);

  if (error) return <div>Erro ao carregar os cursos</div>;
  if (!data) {
    return <PageSpinner />
  }
  
  return (
    <>
      <p className={styles.titleCategory}>LANÇAMENTOS</p>
      <SlideComponent course={data?.data} />
    </>
  );
}

export default NewestCategory;
