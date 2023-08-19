import { useContext, useEffect, useState } from "react";
// Mui
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// Components
import AuthModalForm from "./AuthModalForm";
import { Alert, CircularProgress } from "@mui/material";
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
  SIGN_IN: "signIn",
  SIGN_UP: "signUp",
};

export interface AuthButtonAndModalProps {
  type:
    | typeof AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN
    | typeof AUTH_BUTTON_AND_MODAL_TYPE.SIGN_UP;
}

const AuthButtonAndModal = ({
  type: authButtonAndModalType,
}: AuthButtonAndModalProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    data,
    isSuccess: AuthSucceded,
    isLoading,
    error,
  } = useContext(AuthenticationContext);

  useEffect(() => {
    if (AuthSucceded) {
      handleClose();
    }
  }, [AuthSucceded]);

  const commonAuthButtonStyles = `border p-1 px-4 rounded ${
    isLoading ? "cursor-not-allowed" : "cursor-pointer"
  }`;

  const customAuthButton = () => {
    switch (authButtonAndModalType) {
      case AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN:
        return (
          <button
            className={`${commonAuthButtonStyles} bg-blue-400 text-white mr-3`}
            onClick={handleOpen}
            disabled={isLoading}
          >
            Sign in
          </button>
        );
      case AUTH_BUTTON_AND_MODAL_TYPE.SIGN_UP:
        return (
          <button
            className={`${commonAuthButtonStyles}`}
            onClick={handleOpen}
            disabled={isLoading}
          >
            Sign up
          </button>
        );
    }
  };

  return (
    <div>
      {customAuthButton()}
      <Modal
        open={open}
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
                  : "Create Your Cafecitos Account"}
              </h2>
              <AuthModalForm formType={authButtonAndModalType} />
            </div>
            {error ? <Alert severity="error">{error}</Alert> : null}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AuthButtonAndModal;
