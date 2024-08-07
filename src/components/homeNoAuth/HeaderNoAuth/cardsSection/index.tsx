import { Container } from "reactstrap";
import styles from "./styles.module.scss";

const cardsData = [
  {
    title: "INGLÊS",
    description: "No Vocabely, você aprimorará suas habilidades em inglês, desde a gramática básica até a conversação avançada. Explore a rica cultura anglo-saxônica através de filmes e séries.",
    className: styles.card1
  },
  {
    title: "ESPANHOL",
    description: "No Vocabely, você aprenderá espanhol focando no vocabulário do dia a dia, expressões idiomáticas e nuances culturais da América Latina e Espanha.",
    className: styles.card2
  },
  {
    title: "FRANCÊS",
    description: "No Vocabely, você mergulhará na língua francesa, aprimorando sua compreensão auditiva e gramatical, enquanto descobre a rica história e cultura da França.",
    className: styles.card3
  },
  {
    title: "ALEMÃO",
    description: "No Vocabely, você dominará o alemão através de lições interativas que abrangem desde a gramática rigorosa até a prática de conversação e cultura alemã contemporânea.",
    className: styles.card4
  },
  {
    title: "ITALIANO",
    description: "No Vocabely, você se encantará com o italiano, aprendendo sobre suas raízes romanas, tradições culinárias e desenvolvendo sua fluência com conteúdos autênticos.",
    className: styles.card5
  },
  {
    title: "JAPONÊS",
    description: "No Vocabely, você embarcará na aprendizagem do japonês, focando na escrita hiragana e katakana, enquanto explora a fascinante cultura pop e tradições milenares do Japão.",
    className: styles.card6
  }
];

const CardsSection = function () {
  return (
    <>
      <p className={styles.sectionTitle}>O QUE VOCÊ VAI APRENDER</p>
      <Container className="d-flex flex-wrap justify-content-center gap-4 pb-5">
        {cardsData.map((card, index) => (
          <div key={index} className={card.className}>
            <p className={styles.cardTitle}>{card.title}</p>
            <p className={styles.cardDescription}>{card.description}</p>
          </div>
        ))}
      </Container>
    </>
  );
};

export default CardsSection;
