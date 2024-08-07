import styles from "../../../../../styles/profile.module.scss";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import ToastComponent from "../../toast";
import { FormEvent, useEffect, useState } from "react";
import profileService from "@/src/services/profileService";

const PasswordForm = function () {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await profileService.fetchCurrent();
        setCurrentPassword(user.currentPassword || "");
        setNewPassword(user.newPassword || "");
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handlePasswordUpdate = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setToastIsOpen(true);
      setErrorMessage("Senha e confirmação de senha diferentes!");
      setColor("bg-danger");
      setTimeout(() => setToastIsOpen(false), 3000);
      return;
    }

    if (currentPassword === newPassword) {
      setToastIsOpen(true);
      setErrorMessage("Não coloque a nova senha igual à senha antiga!");
      setColor("bg-danger");
      setTimeout(() => setToastIsOpen(false), 3000);
      return;
    }

    try {
      const res = await profileService.passwordUpdate({
        currentPassword,
        newPassword,
      });

      if (res === 204) {
        setToastIsOpen(true);
        setErrorMessage("Senha alterada com sucesso");
        setColor("bg-success");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else if (res === 400) {
        setToastIsOpen(true);
        setErrorMessage("Senha atual incorreta!");
        setColor("bg-danger");
      }

      setTimeout(() => setToastIsOpen(false), 3000);
    } catch (error) {
      console.error("Error updating password:", error);
      setToastIsOpen(true);
      setErrorMessage("Ocorreu um erro ao atualizar a senha.");
      setColor("bg-danger");
      setTimeout(() => setToastIsOpen(false), 3000);
    }
  };

  return (
    <>
      <Form onSubmit={handlePasswordUpdate} className={styles.form}>
        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label className={styles.label} for="currentPassword">
              SENHA ATUAL
            </Label>
            <Input
              name="currentPassword"
              type="password"
              id="currentPassword"
              placeholder="******"
              required
              minLength={6}
              maxLength={12}
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.currentTarget.value)}
              className={styles.input}
            />
          </FormGroup>
        </div>
        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label className={styles.label} for="newPassword">
              NOVA SENHA
            </Label>
            <Input
              name="newPassword"
              type="password"
              id="newPassword"
              placeholder="******"
              required
              minLength={6}
              maxLength={12}
              value={newPassword}
              onChange={(event) => setNewPassword(event.currentTarget.value)}
              className={styles.inputFlex}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="confirmNewPassword">
              CONFIRMAR NOVA SENHA
            </Label>
            <Input
              name="confirmNewPassword"
              type="password"
              id="confirmNewPassword"
              placeholder="******"
              required
              minLength={6}
              maxLength={12}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.currentTarget.value)}
              className={styles.inputFlex}
            />
          </FormGroup>
          <Button type="submit" className={styles.formBtn} outline>
            Salvar Alterações
          </Button>
        </div>
      </Form>
      <ToastComponent color={color} isOpen={toastIsOpen} message={errorMessage} />
    </>
  );
};

export default PasswordForm;
