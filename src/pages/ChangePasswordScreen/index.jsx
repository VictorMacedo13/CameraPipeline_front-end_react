import SidebarMenu from "../../components/SideBarMenu";
import "./styles.css";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import UserService from "../../services/user";
import { toast } from "react-toastify";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const validateFields = () => {
    var regexSpace = /^\S*$/;

    let valid = {
      flag: true,
      text: "",
    };

    if (currentPassword === "") {
      valid.flag = false;
      valid.text = "Digite sua senha atual.";
    } else if (!regexSpace.test(newPassword)) {
      valid.flag = false;
      valid.text = "Senha não pode conter caracteres vazios.";
    } else if (newPassword.length < 6) {
      valid.flag = false;
      valid.text = "Sua nova senha deve conter no mínimo seis dígitos.";
    } else if (newPassword !== confirmNewPassword) {
      valid.flag = false;
      valid.text = "Senha não confirmada.";
    }
    return valid;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (validateFields().flag) {
      try {
        await toast.promise(
          UserService.changePassword({
            oldpassword: currentPassword,
            newpassword: confirmNewPassword,
          }),
          {
            pending: {
              render({ data }) {
                return (
                  <text id="" className="">
                    Processando
                  </text>
                );
              },
            },
            success: {
              render({ data }) {
                return (
                  <text id="toastMsg" className="">
                    Senha alterada com sucesso!
                  </text>
                );
              },
            },
          }
        );
        clearInputs();
      } catch (error) {
        if (error.response.data.code === "ERR_SAME_PASSWORD") {
          toast.error(
            <text id="toastMsg">
              Sua nova senha não pode ser igual a anterior.
            </text>
          );
        } else {
          toast.error(
            <text id="toastMsg">Ocorreu um erro tentar alterar sua senha.</text>
          );
        }
      }
    } else {
      toast.error(<text id="toastMsg">{validateFields().text}</text>);
    }
  };

  const clearInputs = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const getUser = () => localStorage.getItem("login");

  return (
    <div className="content">
      <SidebarMenu page="change-password" />
      <Form
        className="d-flex justify-content-center align-items-center flex-column form-bg"
        onSubmit={handleSignUp}
        id="change-password"
      >
        <h2 className="mb-5 txt-color">Alterar senha</h2>
        <h5 className="mb-4 txt-color">Usuário: {getUser()}</h5>
        <Form.Group
          className="mb-4 d-flex flex-column"
          controlId="formBasicPassword"
        >
          <Form.Label className="mb-0">Senha atual</Form.Label>
          <Form.Control
            className="px-4 py-1 mb-2 inputPerson"
            type="password"
            placeholder="Insira sua senha atual"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <Form.Label className="mb-0">Nova senha</Form.Label>
          <Form.Control
            className="px-4 py-1 mb-2 inputPerson"
            type="password"
            placeholder="Insira sua nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Form.Label className="mb-0">Confirme a nova senha</Form.Label>
          <Form.Control
            className="px-4 py-1 mb-2 inputPerson"
            type="password"
            placeholder="Confirme sua nova senha"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </Form.Group>

        <Button className="mx-4 btn no-shadow btn-color" type="submit">
          Alterar
        </Button>
      </Form>
    </div>
  );
}

export default ChangePassword;
