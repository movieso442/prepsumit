/**
 * Validates an email address using a standard regular expression.
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates the account request body fields.
 * Returns an object with { isValid: boolean, error?: string }
 */
export function validateAccountRequest(body) {
  if (!body) {
    return { isValid: false, error: "Missing request body." };
  }

  const { fullName, email, selectedPlan, answers } = body;

  if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
    return { isValid: false, error: "Full Name is required." };
  }

  if (!email || !isValidEmail(email)) {
    return { isValid: false, error: "A valid Email address is required." };
  }

  if (!selectedPlan || typeof selectedPlan !== 'string' || !selectedPlan.trim()) {
    return { isValid: false, error: "Selected Plan is required." };
  }

  // If answers is provided, validate its structure (it should be an array of { question, answer })
  if (answers !== undefined) {
    if (!Array.isArray(answers)) {
      return { isValid: false, error: "Answers must be an array of questions and responses." };
    }
    for (const item of answers) {
      if (!item || typeof item !== 'object' || !item.question) {
        return { isValid: false, error: "Invalid survey question structure." };
      }
    }
  }

  return { isValid: true };
}
