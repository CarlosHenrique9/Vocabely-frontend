import { CourseType } from "@/src/services/courseService";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";

interface Props {
  course: CourseType;
}

const SearchCard = function ({ course }: Props) {
  return (
    <Link href={`/course/${course.id}`} passHref>
      <div className={styles.searchCard}>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl}`}
          alt={course.name}
          className={styles.searchCardImg}
          width={300} 
          height={200}
        />
        <p className={styles.searchCardTitle}>{course.name}</p>
        <p className={styles.searchCardDescription}>{course.synopsis}</p>
      </div>
    </Link>
  );
};

export default SearchCard;
