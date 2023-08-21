"use client";
import { useContext, useEffect, useState } from "react";
// Mui
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// Components
import AuthModalForm from "./AuthModalForm";
import AuthNav from "./AuthNav";
import { Alert } from "@mui/material";
// Context
import { AuthenticationContext } from "@/app/context/AuthContext";

const boxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const AUTH_BUTTON_AND_MODAL_TYPE = {
  SIGN_IN: "SIGNIN",
  SIGN_UP: "SINGUP",
};

export interface AuthNavBarAndModalProps {
  type:
    | typeof AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN
    | typeof AUTH_BUTTON_AND_MODAL_TYPE.SIGN_UP;
}

const AuthNavBarAndModal = ({
  type: authButtonAndModalType,
}: AuthNavBarAndModalProps): JSX.Element => {
  const { isSignIn, isSignUp, isLoggedIn, isLoading, errorData } = useContext(
    AuthenticationContext
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  useEffect(() => {
    if (isSignIn || isSignUp || isLoggedIn) {
      handleClose();
    }
  }, [isSignIn, isSignUp, isLoggedIn]);

  return (
    <div>
      <AuthNav
        authButtonAndModalType={authButtonAndModalType}
        handleOpen={handleOpen}
      />
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <div className="p-2 h-[600px]">
            <div className="uppercase font-bold text-center pb-2 mb-2">
              <p className="text-sm">
                {authButtonAndModalType === AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN
                  ? "Sign in"
                  : "Create Account"}
              </p>
            </div>
            <div className="m-auto">
              <h2 className="text-2xl font-light text-center">
                {authButtonAndModalType === AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN
                  ? "Log Into Your Account"
                  : "Create Your CafecitosDeBarrio.com Account"}
              </h2>
              <AuthModalForm formType={authButtonAndModalType} />
            </div>
            {errorData ? <Alert severity="error">{errorData}</Alert> : null}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AuthNavBarAndModal;
