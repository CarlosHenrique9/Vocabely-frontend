import { Container } from "reactstrap";
import styles from "./styles.module.scss";

const CardsSection = function () {
  return <>
    <p className={styles.sectionTitle}>O QUE VOCÊ VAI APRENDER</p>
    <Container className="d-flex flex-wrap justify-content-center gap-4 pb-5">
      <div className={styles.card1}>
        <p className={styles.cardTitle}>INGLÊS</p>
        <p className={styles.cardDescription}>
          No Vocabely, você aprimorará suas habilidades em inglês, desde a gramática básica até a conversação avançada. Explore a rica cultura anglo-saxônica através de filmes e séries.
        </p>
      </div>
      <div className={styles.card2}>
        <p className={styles.cardTitle}>ESPANHOL</p>
        <p className={styles.cardDescription}>
          No Vocabely, você aprenderá espanhol focando no vocabulário do dia a dia, expressões idiomáticas e nuances culturais da América Latina e Espanha.
        </p>
      </div>
      <div className={styles.card3}>
        <p className={styles.cardTitle}>FRANCÊS</p>
        <p className={styles.cardDescription}>
          No Vocabely, você mergulhará na língua francesa, aprimorando sua compreensão auditiva e gramatical, enquanto descobre a rica história e cultura da França.
        </p>
      </div>
      <div className={styles.card4}>
        <p className={styles.cardTitle}>ALEMÃO</p>
        <p className={styles.cardDescription}>
          No Vocabely, você dominará o alemão através de lições interativas que abrangem desde a gramática rigorosa até a prática de conversação e cultura alemã contemporânea.
        </p>
      </div>
      <div className={styles.card5}>
        <p className={styles.cardTitle}>ITALIANO</p>
        <p className={styles.cardDescription}>
          No Vocabely, você se encantará com o italiano, aprendendo sobre suas raízes romanas, tradições culinárias e desenvolvendo sua fluência com conteúdos autênticos.
        </p>
      </div>
      <div className={styles.card6}>
        <p className={styles.cardTitle}>JAPONÊS</p>
        <p className={styles.cardDescription}>
          No Vocabely, você embarcará na aprendizagem do japonês, focando na escrita hiragana e katakana, enquanto explora a fascinante cultura pop e tradições milenares do Japão.
        </p>
      </div>
    </Container>
  </>;
};

export default CardsSection;
