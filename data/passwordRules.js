// Password requirements, used by both the validation and the checklist
export const PASSWORD_RULES = [
    { label: 'At least 10 characters', test: (value) => value.length >= 10 },
    { label: 'A number', test: (value) => /[0-9]/.test(value) },
    { label: 'A symbol', test: (value) => /[^A-Za-z0-9\s]/.test(value) },
    { label: 'A lowercase letter', test: (value) => /[a-z]/.test(value) },
    { label: 'An uppercase letter', test: (value) => /[A-Z]/.test(value) },
];