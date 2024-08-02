import styles from "../../../../../styles/profile.module.scss";
import { Button, Form } from "reactstrap";
import { FormGroup } from "reactstrap";
import { Input } from "reactstrap";
import { Label } from "reactstrap";

const PasswordForm= function () {
  return <>
	<Form className={styles.form}>
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
        maxLenth={12}
        max
	      className={styles.inputFlex}
	      />
	    </FormGroup>

      <Button className={styles.formBtn} outline>
	      Salvar Alterações
      </Button>
    </div>
  </Form>
</>
};

export default PasswordForm;
