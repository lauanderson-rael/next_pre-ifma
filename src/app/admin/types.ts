
export interface FormInputsType {
  title: string;
  description: string;
  year: string;
  subject: string;
  type_question: string,
  answers: string[];
  correctIndex: number;
  images?: FileList | null;
};

export interface QuestionType {
  id: string;
  title: string;
  description: string;
  year: string;
  subject: string;
  type_question: string,
  image_urls?: string[];
  answers: {
    id: number;
    correct: boolean;
    text: string;
  }[];
};
