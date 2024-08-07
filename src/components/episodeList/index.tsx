import styles from "./styles.module.scss";
import { CourseType, EpisodeType } from "../../services/courseService";
import { useRouter } from "next/router";

interface Props {
  episode: EpisodeType;
  course: CourseType;
}

const EpisodeList = ({ episode, course }: Props) => {
  const router = useRouter();

  // Função para converter segundos em minutos e segundos no formato MM:SS
  const handleSecondsToMin = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Função auxiliar para garantir dois dígitos
    const toString = (num: number) => num.toString().padStart(2, "0");

    return `${toString(minutes)}:${toString(seconds)}`;
  };

  // Navega para o player do episódio
  const handleEpisodePlayer = () => {
    router.push(`/course/episode/${episode.order - 1}?courseid=${course.id}&episodeid=${episode.id}`);
  };

  return (
    <div className={styles.episodeCard} onClick={handleEpisodePlayer}>
      <div className={styles.episodeOrderTime}>
        <p className={styles.episodeOrder}>Episódio Nº {episode.order}</p>
        <p className={styles.episodeTime}>{handleSecondsToMin(episode.secondsLong)}</p>
      </div>
      <div className={styles.episodeTitleDescription}>
        <p className={styles.episodeTitle}>{episode.name}</p>
        <p className={styles.episodeDescription}>{episode.synopsis}</p>
      </div>
    </div>
  );
};

export default EpisodeList;
