// types.ts
export interface Answer {
  id: number;
  correct: boolean;
  text: string;
}

export interface Question {
  id: number;
  title: string;
  description: string;
  answers: Answer[];
  image_urls?: string[];
}

export interface QuestionResponse {
  questions: Question[];
}

export interface UserAnswer {
  question_id: number;
  answer_id: number;
  selected_letter: string;
}

export interface SimulateResult {
  correct: boolean;
  correct_answer: string;
  selected_answer: string;
  question_id: number;
}

export interface Score {
  correct: number;
  total: number;
}