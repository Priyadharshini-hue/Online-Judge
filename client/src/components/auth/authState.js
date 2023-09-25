import { useState } from "react";

export function useForgotPasswordFormState() {
  const [forgotPasswordFormState, SetForgotPasswordFormState] = useState({
    email: "",
    errorMessage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    SetForgotPasswordFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateField(value);
  };

  const validateField = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const errorMessage = emailPattern.test(email)
      ? ""
      : "Invalid email address";

    SetForgotPasswordFormState((prevState) => ({
      ...prevState,
      errorMessage: errorMessage,
    }));
  };

  return {
    forgotPasswordFormState,
    SetForgotPasswordFormState,
    handleInputChange,
  };
}

export function useResetPasswordFormState() {
  const [resetPasswordFormState, setResetPasswordFormState] = useState({
    password: "",
    confirmPassword: "",
    errorMessage: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResetPasswordFormState((prevState) => ({
      ...prevState,
      [name]: value,
      errorMessage: {
        ...prevState.errorMessage,
        [name]: "",
      },
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const errorMessage = generateErrorMessage(name, value);

    setResetPasswordFormState((prevState) => ({
      ...prevState,
      errorMessage: {
        ...prevState.errorMessage,
        [name]: errorMessage,
      },
    }));
  };

  const generateErrorMessage = (name, value) => {
    if (value.includes(" ")) {
      return "Password should not contain whitespace";
    } else if (name === "password" && value.length < 8) {
      return "Password is too short (min. 8 characters)";
    } else if (
      name === "confirmPassword" &&
      value !== resetPasswordFormState.password
    ) {
      return "Passwords do not match";
    }
    return "";
  };

  return {
    resetPasswordFormState,
    setResetPasswordFormState,
    handleInputChange,
  };
}
