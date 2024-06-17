import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../../context/LoginContext";
import ModalComponent from "../modal/ModalComponent";

const ProtectedRoute = ({ component: Component }) => {
  const { isLoggedIn } = useContext(LoginContext);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setModalOpen(true);
    }
  }, [isLoggedIn]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <Component />
      ) : (
        <ModalComponent
          open={modalOpen}
          onClose={handleCloseModal}
          title="Authentication required!"
          message="Please log in or register to access this content."
        />
      )}
    </>
  );
};

export default ProtectedRoute;
