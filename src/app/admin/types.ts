
export interface FormInputsType {
  title: string;
  description: string;
  year: string;
  subject: string;
  answers: string[];
  correctIndex: number;
  image?: FileList | null;
};

export interface QuestionType {
  id: string;
  title: string;
  description: string;
  answers: {
    id: number;
    correct: boolean;
    text: string;
  }[];
};
