import { Close } from "@mui/icons-material";
import { Link, Modal, Stack, TextField, Typography } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { actions } from "../../redux/slices/auth";
import { CloseButton } from "../Buttons/Buttons.styled";
import { LoginFormStyled } from "./Modal.styled";

export const ModalLogin: FC = () => {
  const { open } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [isLogin, setIsLogin] = useState(true);

  const toggleLoginMode = () => {
    setIsLogin((prev) => !prev);
  };

  const handleClose = useCallback(() => {
    dispatch(actions.toggleModal(false));
  }, [dispatch]);

  return (
    <Modal open={open} onClose={handleClose}>
      <LoginFormStyled sx={{ width: { xs: "80%", sm: "50%" } }}>
        <Stack direction="row" justifyContent="space-between" mb={5}>
          <Typography>
            {isLogin
              ? "Please log in to continue"
              : "Please create your account"}
          </Typography>
          <CloseButton onClick={handleClose}>
            <Close />
          </CloseButton>
        </Stack>
        <Stack component="form" spacing={5} mb={5}>
          <TextField label="Login" required size="small" autoFocus />
          <TextField label="Password" required size="small" />
          {!isLogin && (
            <TextField label="Confirm password" required size="small" />
          )}
        </Stack>
        <Link
          component="button"
          underline="hover"
          variant="body2"
          onClick={() => toggleLoginMode()}
        >
          {isLogin ? "I have no account yet" : "I already have an account"}
        </Link>
      </LoginFormStyled>
    </Modal>
  );
};
