import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import styles from "../../../../../styles/profile.module.scss";
import { FormEvent, useEffect, useState } from "react";
import profileService from "@/src/services/profileService";
import ToastComponent from "../../toast";
import { useRouter } from "next/router";

const UserForm = function () {
  const router = useRouter();
  const [color, setColor] = useState<string>("");
  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [initialEmail, setInitialEmail] = useState<string>("");
  const [created_at, setCreated_at] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await profileService.fetchCurrent();
        setFirstName(user.firstName || "");
        setLastName(user.lastName || "");
        setPhone(user.phone || "");
        setEmail(user.email || "");
        setInitialEmail(user.email || "");
        setCreated_at(user.createdAt || "");
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUserUpdate = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    try {
      const res = await profileService.userUpdate({
        firstName,
        lastName,
        phone,
        email,
        created_at,
      });

      if (res === 200) {
        setToastIsOpen(true);
        setErrorMessage("Informações alteradas com sucesso!");
        setColor("bg-success");
        if (email !== initialEmail) {
          sessionStorage.clear();
          router.push("/");
        }
      } else {
        setToastIsOpen(true);
        setErrorMessage("Você não pode mudar para esse email!");
        setColor("bg-danger");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      setToastIsOpen(true);
      setErrorMessage("Ocorreu um erro ao atualizar as informações.");
      setColor("bg-danger");
    } finally {
      setTimeout(() => setToastIsOpen(false), 3000);
    }
  };

  // Formatação da data
  const date = created_at ? new Date(created_at) : new Date();
  const month = date.toLocaleDateString("default", { month: "long" });

  if (loading) return <p>Loading...</p>; // Exibir carregando enquanto os dados estão sendo recuperados

  return (
    <>
      <Form onSubmit={handleUserUpdate} className={styles.form}>
        <div className={styles.formName}>
          <p className={styles.nameAbbreviation}>
            {firstName.slice(0, 1)}
            {lastName.slice(0, 1)}
          </p>
          <p className={styles.userName}>{`${firstName} ${lastName}`}</p>
        </div>
        <div className={styles.memberTime}>
          <img
            src="/favicon.png"
            alt="iconProfile"
            className={styles.memberTimeImg}
          />
          <p className={styles.memberTimeText}>
            Membro desde <br />
            {`${date.getDate()} de ${month} de ${date.getFullYear()}`}
          </p>
        </div>
        <hr />
        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label className={styles.label} for="firstName">
              NOME
            </Label>
            <Input
              name="firstName"
              type="text"
              id="firstName"
              placeholder="Qual o seu primeiro nome?"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="lastName">
              SOBRENOME
            </Label>
            <Input
              name="lastName"
              type="text"
              id="lastName"
              placeholder="Qual o seu último nome?"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="phone">
              WHATSAPP / TELEGRAM
            </Label>
            <Input
              name="phone"
              type="tel"
              id="phone"
              placeholder="(xx) 9xxxx-xxxx"
              required
              className={styles.input}
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="email">
              E-MAIL
            </Label>
            <Input
              name="email"
              type="email"
              id="email"
              placeholder="Coloque o seu email"
              required
              className={styles.input}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormGroup>
          <Button className={styles.formBtn} outline>
            Salvar Alterações
          </Button>
        </div>
      </Form>
      <ToastComponent color={color} isOpen={toastIsOpen} message={errorMessage} />
    </>
  );
};

export default UserForm;
