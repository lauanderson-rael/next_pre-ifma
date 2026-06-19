import { render } from '@testing-library/react';
import ProgressBar from '@/app/filters/simulate/components/Progressbar';

describe('ProgressBar', () => {
  it('deve renderizar o progresso atual', () => {
    const { getByText } = render(
      <ProgressBar respostasCount={3} totalQuestions={10} questaoAtual={2} />
    );
    expect(getByText('Progresso: 3/10')).toBeInTheDocument();
  });

  it('deve renderizar a barra com largura correta', () => {
    const { container } = render(
      <ProgressBar respostasCount={5} totalQuestions={10} questaoAtual={4} />
    );
    const innerBar = container.querySelector('.bg-blue-600');
    expect(innerBar).toHaveStyle('width: 50%');
  });

  it('deve renderizar 0% quando nenhuma resposta foi dada', () => {
    const { container } = render(
      <ProgressBar respostasCount={0} totalQuestions={10} questaoAtual={0} />
    );
    const innerBar = container.querySelector('.bg-blue-600');
    expect(innerBar).toHaveStyle('width: 0%');
  });

  it('deve renderizar 100% quando todas as respostas foram dadas', () => {
    const { container } = render(
      <ProgressBar respostasCount={10} totalQuestions={10} questaoAtual={9} />
    );
    const innerBar = container.querySelector('.bg-blue-600');
    expect(innerBar).toHaveStyle('width: 100%');
  });
});
