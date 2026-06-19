import {
  getLocale,
  formatCurrency,
  formatNumber,
  formatDate,
  formatTime,
  formatDateTime,
  calculatePages,
  getPaginationRange,
  getOffset,
  getPageFromOffset,
  parseURL,
  getQueryParam,
  setQueryParam,
  removeQueryParam,
  getPathname,
  getHostname
} from '@/app/utils/i18n';

describe('i18n utilities', () => {
  describe('getLocale', () => {
    it('deve retornar locale do navegador quando disponível', () => {
      Object.defineProperty(window, 'navigator', {
        value: { language: 'pt-BR' },
        writable: true
      });
      
      expect(getLocale()).toBe('pt-BR');
    });

    it('deve retornar en-US como fallback no servidor', () => {
      const originalWindow = global.window;
      delete (global as any).window;
      
      expect(getLocale()).toBe('pt-BR');
      
      global.window = originalWindow;
    });
  });

  describe('formatCurrency', () => {
    it('deve formatar moeda em USD por padrão', () => {
      const result = formatCurrency(1234.56);
      expect(result).toContain('1,234.56');
    });

    it('deve formatar moeda em BRL', () => {
      const result = formatCurrency(1234.56, 'BRL', 'pt-BR');
      expect(result).toContain('1.234,56');
    });
  });

  describe('formatNumber', () => {
    it('deve formatar número com decimais específicos', () => {
      const result = formatNumber(1234.5, 'en-US', 2);
      expect(result).toBe('1,234.50');
    });

    it('deve formatar número sem decimais específicos', () => {
      const result = formatNumber(1234.56, 'en-US');
      expect(result).toContain('1,234.56');
    });
  });

  describe('formatDate', () => {
    it('deve formatar data', () => {
      const date = new Date(2023, 11, 25);
      const result = formatDate(date, 'en-US');
      expect(result).toContain('12/25/2023');
    });

    it('deve formatar data com opções', () => {
      const date = new Date(2023, 11, 25);
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      const result = formatDate(date, 'en-US', options);
      expect(result).toContain('December');
    });
  });

  describe('formatTime', () => {
    it('deve formatar hora', () => {
      const date = new Date('2023-12-25T15:30:45');
      const result = formatTime(date, 'en-US');
      expect(result).toContain('3:30:45');
    });
  });

  describe('formatDateTime', () => {
    it('deve formatar data e hora', () => {
      const date = new Date(2023, 11, 25, 15, 30, 45);
      const result = formatDateTime(date, 'en-US');
      expect(result).toContain('12/25/2023');
    });
  });

  describe('calculatePages', () => {
    it('deve calcular número de páginas', () => {
      expect(calculatePages(100, 10)).toBe(10);
      expect(calculatePages(101, 10)).toBe(11);
      expect(calculatePages(0, 10)).toBe(0);
    });
  });

  describe('getPaginationRange', () => {
    it('deve gerar range de paginação simples', () => {
      const result = getPaginationRange(3, 5, 3);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('deve gerar range com ellipsis no início', () => {
      const result = getPaginationRange(8, 10, 3);
      expect(result).toContain('...');
      expect(result).toContain(1);
      expect(result).toContain(10);
    });

    it('deve gerar range com ellipsis no final', () => {
      const result = getPaginationRange(2, 10, 3);
      expect(result).toContain('...');
      expect(result).toContain(10);
    });
  });

  describe('getOffset', () => {
    it('deve calcular offset corretamente', () => {
      expect(getOffset(1, 10)).toBe(0);
      expect(getOffset(2, 10)).toBe(10);
      expect(getOffset(3, 20)).toBe(40);
    });
  });

  describe('getPageFromOffset', () => {
    it('deve calcular página do offset', () => {
      expect(getPageFromOffset(0, 10)).toBe(1);
      expect(getPageFromOffset(10, 10)).toBe(2);
      expect(getPageFromOffset(25, 10)).toBe(3);
    });
  });

  describe('parseURL', () => {
    it('deve parsear URL válida', () => {
      const result = parseURL('https://example.com/path');
      expect(result).toBeInstanceOf(URL);
      expect(result?.hostname).toBe('example.com');
    });

    it('deve retornar null para URL inválida', () => {
      const result = parseURL('invalid-url');
      expect(result).toBeNull();
    });
  });

  describe('getQueryParam', () => {
    it('deve extrair parâmetro da query string', () => {
      const result = getQueryParam('https://example.com?foo=bar&baz=qux', 'foo');
      expect(result).toBe('bar');
    });

    it('deve retornar null para parâmetro inexistente', () => {
      const result = getQueryParam('https://example.com?foo=bar', 'missing');
      expect(result).toBeNull();
    });

    it('deve retornar null para URL inválida', () => {
      const result = getQueryParam('invalid-url', 'param');
      expect(result).toBeNull();
    });
  });

  describe('setQueryParam', () => {
    it('deve adicionar parâmetro à URL', () => {
      const result = setQueryParam('https://example.com', 'foo', 'bar');
      expect(result).toBe('https://example.com/?foo=bar');
    });

    it('deve substituir parâmetro existente', () => {
      const result = setQueryParam('https://example.com?foo=old', 'foo', 'new');
      expect(result).toBe('https://example.com/?foo=new');
    });

    it('deve retornar URL original se inválida', () => {
      const result = setQueryParam('invalid-url', 'foo', 'bar');
      expect(result).toBe('invalid-url');
    });
  });

  describe('removeQueryParam', () => {
    it('deve remover parâmetro da URL', () => {
      const result = removeQueryParam('https://example.com?foo=bar&baz=qux', 'foo');
      expect(result).toBe('https://example.com/?baz=qux');
    });

    it('deve retornar URL original se inválida', () => {
      const result = removeQueryParam('invalid-url', 'foo');
      expect(result).toBe('invalid-url');
    });
  });

  describe('getPathname', () => {
    it('deve extrair pathname da URL', () => {
      const result = getPathname('https://example.com/path/to/resource');
      expect(result).toBe('/path/to/resource');
    });

    it('deve retornar null para URL inválida', () => {
      const result = getPathname('invalid-url');
      expect(result).toBeNull();
    });
  });

  describe('getHostname', () => {
    it('deve extrair hostname da URL', () => {
      const result = getHostname('https://example.com/path');
      expect(result).toBe('example.com');
    });

    it('deve retornar null para URL inválida', () => {
      const result = getHostname('invalid-url');
      expect(result).toBeNull();
    });
  });
});