// ============================================
// Email Validation
// ============================================

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateEmail(email: string): string | null {
  if (!email) {
    return 'Email é obrigatório';
  }
  if (!isValidEmail(email)) {
    return 'Email inválido';
  }
  return null;
}

// ============================================
// Password Validation
// ============================================

export interface PasswordRequirements {
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
}

const DEFAULT_PASSWORD_REQUIREMENTS: PasswordRequirements = {
  minLength: 6,
  requireUppercase: false,
  requireLowercase: false,
  requireNumbers: false,
  requireSpecialChars: false,
};

export function validatePassword(
  password: string,
  requirements: PasswordRequirements = DEFAULT_PASSWORD_REQUIREMENTS
): string | null {
  const { minLength, requireUppercase, requireLowercase, requireNumbers, requireSpecialChars } = {
    ...DEFAULT_PASSWORD_REQUIREMENTS,
    ...requirements,
  };

  if (!password) {
    return 'Senha é obrigatória';
  }

  if (minLength && password.length < minLength) {
    return `Senha deve ter no mínimo ${minLength} caracteres`;
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    return 'Senha deve conter pelo menos uma letra maiúscula';
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    return 'Senha deve conter pelo menos uma letra minúscula';
  }

  if (requireNumbers && !/\d/.test(password)) {
    return 'Senha deve conter pelo menos um número';
  }

  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Senha deve conter pelo menos um caractere especial';
  }

  return null;
}

// ============================================
// Name Validation
// ============================================

export function validateName(name: string): string | null {
  if (!name) {
    return 'Nome é obrigatório';
  }
  if (name.length < 2) {
    return 'Nome deve ter pelo menos 2 caracteres';
  }
  if (name.length > 100) {
    return 'Nome muito longo';
  }
  return null;
}

// ============================================
// Generic Required Field
// ============================================

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value || value.trim() === '') {
    return `${fieldName} é obrigatório`;
  }
  return null;
}
