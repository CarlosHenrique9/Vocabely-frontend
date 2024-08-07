import Head from "next/head";
import styles from "@/styles/profile.module.scss";
import UserForm from "@/src/components/common/profile/user";
import PasswordForm from "@/src/components/common/profile/password";
import { Col, Container, Row, Button } from "reactstrap";
import HeaderAuth from "@/src/components/common/headerAuth";
import Footer from "@/src/components/common/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PageSpinner from "@/src/components/common/spinner";

const UserInfo = () => {
  const [form, setForm] = useState("userForm");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem("vocabely-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Head>
        <title>Vocabely - Meus Dados</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <main className={styles.gridContainer}>
        <div className={styles.header}>
          <HeaderAuth />
        </div>
        <Container className={styles.gridContainer}>
          <p className={styles.title}>Minha Conta</p>
          <Row className="pt-3 pb-5">
            <Col md={4} className={styles.btnColumn}>
              <Button
                outline
                className={styles.renderFormBtn}
                style={{ color: form === "userForm" ? "#fbbf24" : "white" }}
                onClick={() => setForm("userForm")}
              >
                DADOS PESSOAIS
              </Button>
              <Button
                outline
                className={styles.renderFormBtn}
                style={{ color: form === "passwordForm" ? "#fbbf24" : "white" }}
                onClick={() => setForm("passwordForm")}
              >
                SENHA
              </Button>
            </Col>
            <Col md>
              {form === "userForm" ? <UserForm /> : <PasswordForm />}
            </Col>
          </Row>
        </Container>
        <div className={styles.footer}>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default UserInfo;
