import { render, fireEvent, act } from '@testing-library/react';
import Carousel from './carousel';

jest.useFakeTimers();

describe('Carousel', () => {
  const mockImages = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  it('deve renderizar quando não há imagens', () => {
    const { getByText } = render(<Carousel images={[]} />);
    expect(getByText('No images to display')).toBeInTheDocument();
  });

  it('deve renderizar todas as imagens', () => {
    const { container } = render(<Carousel images={mockImages} />);
    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(3);
  });

  it('deve navegar para próxima imagem', () => {
    const { getByLabelText } = render(<Carousel images={mockImages} />);
    const nextButton = getByLabelText('Next slide');
    
    fireEvent.click(nextButton);
    
    const slideContainer = document.querySelector('.flex.transition-transform') as HTMLElement;
    expect(slideContainer.style.transform).toBe('translateX(-100%)');
  });

  it('deve navegar para imagem anterior', () => {
    const { getByLabelText } = render(<Carousel images={mockImages} />);
    const nextButton = getByLabelText('Next slide');
    const prevButton = getByLabelText('Previous slide');
    
    fireEvent.click(nextButton);
    fireEvent.click(prevButton);
    
    const slideContainer = document.querySelector('.flex.transition-transform') as HTMLElement;
    expect(slideContainer.style.transform).toBe('translateX(-0%)');
  });

  it('deve circular do último para o primeiro slide', () => {
    const { getByLabelText } = render(<Carousel images={mockImages} />);
    const nextButton = getByLabelText('Next slide');
    
    // Vai para o último slide
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    
    // Do último volta para o primeiro
    fireEvent.click(nextButton);
    
    const slideContainer = document.querySelector('.flex.transition-transform') as HTMLElement;
    expect(slideContainer.style.transform).toBe('translateX(-0%)');
  });

  it('deve navegar por indicadores', () => {
    const { getByLabelText } = render(<Carousel images={mockImages} />);
    const indicator = getByLabelText('Go to slide 3');
    
    fireEvent.click(indicator);
    
    const slideContainer = document.querySelector('.flex.transition-transform') as HTMLElement;
    expect(slideContainer.style.transform).toBe('translateX(-200%)');
  });

  it('deve pausar autoplay ao hover', () => {
    const { container } = render(
      <Carousel images={mockImages} autoPlay={true} autoPlayInterval={1000} />
    );
    
    const carouselContainer = container.firstChild as HTMLElement;
    
    act(() => {
      fireEvent.mouseEnter(carouselContainer);
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    const slideContainer = document.querySelector('.flex.transition-transform') as HTMLElement;
    expect(slideContainer.style.transform).toBe('translateX(-0%)');
  });

  it('deve retomar autoplay ao sair do hover', () => {
    const { container } = render(
      <Carousel images={mockImages} autoPlay={true} autoPlayInterval={500} />
    );
    
    const carouselContainer = container.firstChild as HTMLElement;
    
    act(() => {
      fireEvent.mouseEnter(carouselContainer);
      fireEvent.mouseLeave(carouselContainer);
    });

    act(() => {
      jest.advanceTimersByTime(600);
    });
    
    const slideContainer = document.querySelector('.flex.transition-transform') as HTMLElement;
    expect(slideContainer.style.transform).toBe('translateX(-100%)');
  });

  it('não deve mostrar controles para uma única imagem', () => {
    const { queryByLabelText } = render(<Carousel images={['single.jpg']} />);
    
    expect(queryByLabelText('Next slide')).not.toBeInTheDocument();
    expect(queryByLabelText('Previous slide')).not.toBeInTheDocument();
  });

  it('não deve mostrar indicadores quando desabilitado', () => {
    const { queryByLabelText } = render(
      <Carousel images={mockImages} showIndicators={false} />
    );
    
    expect(queryByLabelText('Go to slide 1')).not.toBeInTheDocument();
  });

  it('não deve mostrar controles quando desabilitado', () => {
    const { queryByLabelText } = render(
      <Carousel images={mockImages} showControls={false} />
    );
    
    expect(queryByLabelText('Next slide')).not.toBeInTheDocument();
    expect(queryByLabelText('Previous slide')).not.toBeInTheDocument();
  });

  it('deve aplicar className personalizada', () => {
    const { container } = render(
      <Carousel images={mockImages} className=" custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});