import Link from "next/link";
import styles from "./styles.module.scss";
import { CourseType } from "../../../services/courseService";
import Image from "next/image";

interface Props {
  course: CourseType;
}

const SlideCard = function ({ course }: Props) {
  return (
    <Link href={`/course/${course.id}`} passHref>
      <div className={styles.slide}>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl}`}
          alt={course.name}
          className={styles.slideImg}
          width={300} // Ajuste o tamanho conforme necessário
          height={200} // Ajuste o tamanho conforme necessário
        />
        <p className={styles.slideTitle}>{course.name}</p>
        <p className={styles.slideDescription}>{course.synopsis}</p>
      </div>
    </Link>
  );
};

export default SlideCard;
