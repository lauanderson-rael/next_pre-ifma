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
}

export interface QuestionResponse {
  questions: Question[];
}
