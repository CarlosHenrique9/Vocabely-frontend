/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.scss";
import { Container, Row, Col, Button } from "reactstrap";
import Link from "next/link";

const PresentationSection = function () {
  return (
    <>
      <Container className="py-4">
        <Row>
          <Col
            md
            className="d-flex flex-column justify-content-center align-items-start"
          >
            <p className={styles.subTitle}>ACESSO ILIMITADO</p>
            <p className={styles.title}>
              Tenha acesso às melhores
              <br /> aulas de idiomas.
            </p>
            <p className={styles.description}>
              Estude de onde estiver, a qualquer momento, e continue <br />
              sua comunicação.
            </p>
            <Link href="/register" passHref>
              <Button className={styles.btnCta} outline>
                ACESSE AGORA
                <img
                  src="/buttonPlay.svg"
                  alt="Ícone de reprodução"
                  className={styles.btnImg}
                />
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center pt-4">
            <img
              src="/HomeNoAuth/iconArrowDown.svg"
              alt="Seta para baixo"
              className={styles.arrowDown}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export { PresentationSection };
