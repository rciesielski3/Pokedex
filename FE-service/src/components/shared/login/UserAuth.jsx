import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegistrationForm";

const UserAuth = ({ children }) => {
  const [isLoginFormVisible, setLoginFormVisible] = useState(false);
  const [isRegisterFormVisible, setRegisterFormVisible] = useState(false);

  const handleLogin = () => {
    setLoginFormVisible(true);
    setRegisterFormVisible(false);
  };

  const handleRegister = () => {
    setRegisterFormVisible(true);
    setLoginFormVisible(false);
  };

  const handleCloseLoginForm = () => {
    setLoginFormVisible(false);
  };

  const handleCloseRegisterForm = () => {
    setRegisterFormVisible(false);
  };

  return (
    <>
      {children({ handleLogin, handleRegister })}
      {isLoginFormVisible && <LoginForm onClose={handleCloseLoginForm} />}
      {isRegisterFormVisible && (
        <RegisterForm onClose={handleCloseRegisterForm} />
      )}
    </>
  );
};

export default UserAuth;
