import Head from "next/head";
import HeaderGeneric from "@/src/components/common/headerGeneric";
import styles from "../styles/registerLogin.module.scss";
import { Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import Footer from "@/src/components/common/footer";
import { FormEvent, useEffect, useState } from "react";
import authService from "@/src/services/authService";
import { useRouter } from "next/router";
import ToastComponent from "@/src/components/common/toast";

const Register = function () {
  const router = useRouter();
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("vocabely-token")) {
      router.push("/home");
    }
  }, [router]);

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName")?.toString() || "";
    const lastName = formData.get("lastName")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const birth = formData.get("birth")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const confirmPassword = formData.get("confirmPassword")?.toString() || "";

    if (password !== confirmPassword) {
      setToastIsOpen(true);
      setToastMessage("Senha e confirmação diferentes.");
      setTimeout(() => setToastIsOpen(false), 3000);
      return;
    }

    try {
      const response = await authService.register({ firstName, lastName, phone, birth, email, password });
      const { data, status } = response;

      if (status === 201) {
        router.push("/login?success=true");
      } else {
        setToastIsOpen(true);
        setToastMessage(data?.message || "Registration failed. Please try again.");
        setTimeout(() => setToastIsOpen(false), 3000);
      }
    } catch (error) {
      setToastIsOpen(true);
      setToastMessage("An error occurred during registration. Please try again.");
      setTimeout(() => setToastIsOpen(false), 3000);
      console.error("Registration error:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Vocabely - Registro</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />
        <script src="https://jsuites.net/v4/jsuites.js"></script>
      </Head>
      <main className={styles.main}>
        <HeaderGeneric logoUrl="/" btnUrl="/login" btnContent="Quero fazer login" />
        <Container className="py-5">
          <p className={styles.formTitle}>Bem-vindo(a) ao Vocabely!</p>
          <Form className={styles.form} onSubmit={handleRegister}>
            <FormGroup>
              <Label for="firstName" className={styles.label}>NOME</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Qual o seu nome?"
                required
                maxLength={20}
                className={styles.inputName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName" className={styles.label}>SOBRENOME</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Qual o seu sobrenome?"
                required
                maxLength={20}
                className={styles.inputName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone" className={styles.label}>WHATSAPP / TELEGRAM</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(xx) 9xxxx-xxxx"
                required
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email" className={styles.label}>E-MAIL</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Digite o seu email"
                required
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="birth" className={styles.label}>DATA DE NASCIMENTO</Label>
              <Input
                id="birth"
                name="birth"
                type="date"
                required
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" className={styles.label}>SENHA</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Digite a sua senha (Min: 6 | Max: 20)"
                required
                minLength={6}
                maxLength={20}
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword" className={styles.label}>CONFIRME SUA SENHA</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirme a sua senha"
                required
                minLength={6}
                maxLength={20}
                className={styles.input}
              />
            </FormGroup>
            <Button type="submit" outline className={styles.formBtn}>CADASTRAR</Button>
          </Form>
        </Container>
        <Footer />
        <ToastComponent color="bg-danger" isOpen={toastIsOpen} message={toastMessage} />
      </main>
    </>
  );
};

export default Register;
