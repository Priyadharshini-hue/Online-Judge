import { useState } from "react";

export function useTestCaseState() {
  const [testCaseModalState, setTestCaseModalState] = useState({
    show: false,
    data: { input: "", output: "" },
    errors: { input: "", output: "" },
  });

  const handleShowTestCaseModal = () => {
    setTestCaseModalState({
      ...testCaseModalState,
      show: true,
    });
  };

  const handleCloseTestCaseModal = () => {
    setTestCaseModalState({
      ...testCaseModalState,
      show: false,
    });
  };

  const handleTestCaseInputChange = (e) => {
    const { name, value } = e.target;
    setTestCaseModalState({
      ...testCaseModalState,
      data: { ...testCaseModalState.data, [name]: value },
      errors: { ...testCaseModalState.errors, [name]: "" },
    });
  };

  const validateTestCase = () => {
    const errors = {};
    if (!testCaseModalState.data.input.trim()) {
      errors.input = "Input is required";
    }
    if (!testCaseModalState.data.output.trim()) {
      errors.output = "Output is required";
    }
    return errors;
  };

  const cleanData = (data) => {
    const cleanedInput = data.input
      .replace(/ +(?=\.|\n|$)/g, "")
      .replace(/\n\s*/g, "\n")
      .trim();
    const cleanedOutput = data.output
      .replace(/ +(?=\.|\n|$)/g, "")
      .replace(/\n\s*/g, "\n")
      .trim();
    return { input: cleanedInput, output: cleanedOutput };
  };

  return {
    validateTestCase,
    setTestCaseModalState,
    testCaseModalState,
    handleShowTestCaseModal,
    handleCloseTestCaseModal,
    handleTestCaseInputChange,
    cleanData,
  };
}
