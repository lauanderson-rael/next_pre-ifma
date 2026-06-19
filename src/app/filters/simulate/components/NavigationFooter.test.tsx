import { render, fireEvent } from '@testing-library/react';
import NavigationFooter from './NavigationFooter';

describe('NavigationFooter', () => {
  const defaultProps = {
    questaoAtual: 0,
    totalQuestions: 5,
    isUltimaQuestao: false,
    todasRespondidas: false,
    submitting: false,
    children: <div>children content</div>,
    onAnterior: jest.fn(),
    onProxima: jest.fn(),
    onFinalizar: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar botoes de navegacao', () => {
    const { getByText } = render(<NavigationFooter {...defaultProps} />);
    expect(getByText('Anterior')).toBeInTheDocument();
    expect(getByText('Próxima')).toBeInTheDocument();
  });

  it('deve mostrar numero da questao atual e total', () => {
    const { getByText } = render(
      <NavigationFooter {...defaultProps} questaoAtual={2} totalQuestions={10} />
    );
    expect(getByText('3 de 10')).toBeInTheDocument();
  });

  it('deve desabilitar botao Anterior quando na primeira questao', () => {
    const { getByText } = render(
      <NavigationFooter {...defaultProps} questaoAtual={0} />
    );
    expect(getByText('Anterior')).toBeDisabled();
  });

  it('deve habilitar botao Anterior quando nao esta na primeira questao', () => {
    const { getByText } = render(
      <NavigationFooter {...defaultProps} questaoAtual={2} />
    );
    expect(getByText('Anterior')).not.toBeDisabled();
  });

  it('deve desabilitar botao Proxima quando na ultima questao', () => {
    const { getByText } = render(
      <NavigationFooter {...defaultProps} questaoAtual={4} totalQuestions={5} />
    );
    expect(getByText('Próxima')).toBeDisabled();
  });

  it('deve habilitar botao Proxima quando nao esta na ultima questao', () => {
    const { getByText } = render(
      <NavigationFooter {...defaultProps} questaoAtual={1} totalQuestions={5} />
    );
    expect(getByText('Próxima')).not.toBeDisabled();
  });

  it('deve chamar onAnterior ao clicar em Anterior', () => {
    const onAnterior = jest.fn();
    const { getByText } = render(
      <NavigationFooter {...defaultProps} questaoAtual={2} onAnterior={onAnterior} />
    );
    fireEvent.click(getByText('Anterior'));
    expect(onAnterior).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onProxima ao clicar em Proxima', () => {
    const onProxima = jest.fn();
    const { getByText } = render(
      <NavigationFooter {...defaultProps} questaoAtual={1} onProxima={onProxima} />
    );
    fireEvent.click(getByText('Próxima'));
    expect(onProxima).toHaveBeenCalledTimes(1);
  });

  it('nao deve mostrar botao Finalizar quando nao esta na ultima questao', () => {
    const { queryByText } = render(
      <NavigationFooter {...defaultProps} isUltimaQuestao={false} />
    );
    expect(queryByText('Finalizar Simulado')).not.toBeInTheDocument();
  });

  it('deve mostrar botao Finalizar na ultima questao', () => {
    const { getByText } = render(
      <NavigationFooter {...defaultProps} isUltimaQuestao={true} />
    );
    expect(getByText('Finalizar Simulado')).toBeInTheDocument();
  });

  it('deve desabilitar e mostrar "Enviando..." quando submitting', () => {
    const { getByText } = render(
      <NavigationFooter {...defaultProps} isUltimaQuestao={true} submitting={true} />
    );
    const btn = getByText('Enviando...');
    expect(btn).toBeDisabled();
  });

  it('deve desabilitar Finalizar quando nem todas respondidas', () => {
    const { getByText } = render(
      <NavigationFooter {...defaultProps} isUltimaQuestao={true} todasRespondidas={false} />
    );
    expect(getByText('Finalizar Simulado')).toBeDisabled();
  });

  it('deve habilitar Finalizar quando todas respondidas e nao esta enviando', () => {
    const { getByText } = render(
      <NavigationFooter {...defaultProps} isUltimaQuestao={true} todasRespondidas={true} submitting={false} />
    );
    expect(getByText('Finalizar Simulado')).not.toBeDisabled();
  });

  it('deve chamar onFinalizar ao clicar em Finalizar', () => {
    const onFinalizar = jest.fn();
    const { getByText } = render(
      <NavigationFooter {...defaultProps} isUltimaQuestao={true} todasRespondidas={true} onFinalizar={onFinalizar} />
    );
    fireEvent.click(getByText('Finalizar Simulado'));
    expect(onFinalizar).toHaveBeenCalledTimes(1);
  });

  it('deve renderizar children', () => {
    const { getByText } = render(
      <NavigationFooter {...defaultProps}>
        <div>custom content</div>
      </NavigationFooter>
    );
    expect(getByText('custom content')).toBeInTheDocument();
  });
});
