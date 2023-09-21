import { useState } from 'react';

export function useProblemState() {
    const [problemState, setProblemState] = useState({
        title: '',
        statement: '',
        difficulty: '',
        testCases: [],
        errors: {},
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProblemState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (name === "title" || name === "statement") {
            validateField(name, value);
        }
    };

    const validateField = (fieldName, value) => {
        const maxCharacters = fieldName === "title" ? 120 : 1000;
        const errorMessage = generateErrorMessage(fieldName, value, maxCharacters);
        setProblemState((prevState) => ({
            ...prevState,
            errors: {
                ...prevState.errors,
                [fieldName]: errorMessage,
            },
        }));
    };

    const generateErrorMessage = (fieldName, value, maxCharacters) => {
        if (value.length > maxCharacters) {
            return `You have reached your maximum limit of ${maxCharacters} characters allowed for ${fieldName}`;
        }
        return '';
    }; 

    return {
        problemState,
        setProblemState,
        handleInputChange,
        validateField,
        generateErrorMessage
    };
}
