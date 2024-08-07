import { CourseType } from "@/src/services/courseService";
import styles from "./styles.module.scss";
import { Button, Container } from "reactstrap";
import SlideComponent from "../../common/slideComponent";
import Link from "next/link";

interface Props {
  newestCourses: CourseType[];
}

const SlideSection = function ({ newestCourses }: Props) {
  return (
    <>
      <Container fluid className="d-flex flex-column align-items-center py-5">
        <p className={styles.sectionTitle}>AULAS JÁ DISPONÍVEIS</p>
        <SlideComponent course={newestCourses} />
        <Link href="/register" passHref>
          <Button outline color="light" className={styles.slideSectionBtn}>
            Cadastre-se para acessar!
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default SlideSection;
