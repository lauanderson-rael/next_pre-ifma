// Função para validar email
export const isValidEmail = (email: string): boolean => {
  // RFC 5322 simplified - evita ReDoS com backtracking
  const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return email.length <= 254 && emailRegex.test(email);
};

// Função para validar senha (mínimo 6 caracteres)
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

// Função para calcular porcentagem
export const calcularPorcentagem = (valor: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((valor / total) * 100);
};

// Função para formatar resposta para letra
export const getLetterFromIndex = (index: number): string => {
  return String.fromCodePoint(97 + index); // 97 é 'a'
};

// Função para obter índice da letra
export const getIndexFromLetter = (letter: string): number => {
  return letter.codePointAt(0)! - 97;
};

// Função para validar se todos os campos estão preenchidos
export const areAllFieldsFilled = (fields: Record<string, any>): boolean => {
  return Object.values(fields).every(value =>
    value !== null && value !== undefined && value !== ''
  );
};
