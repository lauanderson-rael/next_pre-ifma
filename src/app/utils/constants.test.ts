import {
  SUBJECTS,
  QUESTION_TYPES,
  DIFFICULTY_LEVELS,
  SCORE_THRESHOLDS,
  COLORS,
  API_ENDPOINTS,
  getSubjectColor,
  getDifficultyLabel,
} from './constants';

describe('Constants', () => {
  describe('SUBJECTS', () => {
    test('should have valid subjects array', () => {
      expect(SUBJECTS).toBeDefined();
      expect(Array.isArray(SUBJECTS)).toBe(true);
    });

    test('should contain expected subjects', () => {
      expect(SUBJECTS).toContain('Português');
      expect(SUBJECTS).toContain('Matemática');
      expect(SUBJECTS).toContain('História');
    });

    test('should have at least 8 subjects', () => {
      expect(SUBJECTS.length).toBeGreaterThanOrEqual(8);
    });
  });

  describe('QUESTION_TYPES', () => {
    test('should have valid question types array', () => {
      expect(QUESTION_TYPES).toBeDefined();
      expect(Array.isArray(QUESTION_TYPES)).toBe(true);
    });

    test('should contain multiple choice type', () => {
      expect(QUESTION_TYPES).toContain('multiple-choice');
    });

    test('should contain true-false type', () => {
      expect(QUESTION_TYPES).toContain('true-false');
    });
  });

  describe('DIFFICULTY_LEVELS', () => {
    test('should have EASY level', () => {
      expect(DIFFICULTY_LEVELS.EASY).toBe(1);
    });

    test('should have MEDIUM level', () => {
      expect(DIFFICULTY_LEVELS.MEDIUM).toBe(2);
    });

    test('should have HARD level', () => {
      expect(DIFFICULTY_LEVELS.HARD).toBe(3);
    });

    test('should have all difficulty levels in ascending order', () => {
      expect(DIFFICULTY_LEVELS.EASY).toBeLessThan(DIFFICULTY_LEVELS.MEDIUM);
      expect(DIFFICULTY_LEVELS.MEDIUM).toBeLessThan(DIFFICULTY_LEVELS.HARD);
    });
  });

  describe('SCORE_THRESHOLDS', () => {
    test('should have EXCELLENT threshold at 90', () => {
      expect(SCORE_THRESHOLDS.EXCELLENT).toBe(90);
    });

    test('should have VERY_GOOD threshold at 80', () => {
      expect(SCORE_THRESHOLDS.VERY_GOOD).toBe(80);
    });

    test('should have GOOD threshold at 70', () => {
      expect(SCORE_THRESHOLDS.GOOD).toBe(70);
    });

    test('should have SATISFACTORY threshold at 60', () => {
      expect(SCORE_THRESHOLDS.SATISFACTORY).toBe(60);
    });

    test('should have thresholds in descending order', () => {
      expect(SCORE_THRESHOLDS.EXCELLENT).toBeGreaterThan(SCORE_THRESHOLDS.VERY_GOOD);
      expect(SCORE_THRESHOLDS.VERY_GOOD).toBeGreaterThan(SCORE_THRESHOLDS.GOOD);
      expect(SCORE_THRESHOLDS.GOOD).toBeGreaterThan(SCORE_THRESHOLDS.SATISFACTORY);
    });
  });

  describe('COLORS', () => {
    test('should have PRIMARY color', () => {
      expect(COLORS.PRIMARY).toBeDefined();
      expect(COLORS.PRIMARY).toMatch(/^#[0-9A-F]{6}$/i);
    });

    test('should have SUCCESS color', () => {
      expect(COLORS.SUCCESS).toBeDefined();
    });

    test('should have ERROR color', () => {
      expect(COLORS.ERROR).toBeDefined();
    });

    test('should have all required colors', () => {
      expect(COLORS.PRIMARY).toBeDefined();
      expect(COLORS.SUCCESS).toBeDefined();
      expect(COLORS.WARNING).toBeDefined();
      expect(COLORS.ERROR).toBeDefined();
      expect(COLORS.NEUTRAL).toBeDefined();
    });
  });

  describe('API_ENDPOINTS', () => {
    test('should have QUESTIONS endpoint', () => {
      expect(API_ENDPOINTS.QUESTIONS).toBe('/simulates/questions');
    });

    test('should have SUBMIT_ANSWER endpoint', () => {
      expect(API_ENDPOINTS.SUBMIT_ANSWER).toBe('/simulates/answer');
    });

    test('should have LOGIN endpoint', () => {
      expect(API_ENDPOINTS.LOGIN).toBe('/users/login');
    });

    test('should have PROFILE endpoint', () => {
      expect(API_ENDPOINTS.PROFILE).toBe('/users/profile');
    });

    test('endpoints should start with /', () => {
      Object.values(API_ENDPOINTS).forEach(endpoint => {
        expect(endpoint.startsWith('/')).toBe(true);
      });
    });
  });

  describe('getSubjectColor', () => {
    test('should return color for Português', () => {
      expect(getSubjectColor('Português')).toBe('#FF6B6B');
    });

    test('should return color for Matemática', () => {
      expect(getSubjectColor('Matemática')).toBe('#4ECDC4');
    });

    test('should return color for História', () => {
      expect(getSubjectColor('História')).toBe('#F7B731');
    });

    test('should return default color for unknown subject', () => {
      expect(getSubjectColor('Unknown')).toBe('#999999');
    });

    test('should return hex color format', () => {
      const color = getSubjectColor('Português');
      expect(color).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  describe('getDifficultyLabel', () => {
    test('should return "Fácil" for level 1', () => {
      expect(getDifficultyLabel(1)).toBe('Fácil');
    });

    test('should return "Médio" for level 2', () => {
      expect(getDifficultyLabel(2)).toBe('Médio');
    });

    test('should return "Difícil" for level 3', () => {
      expect(getDifficultyLabel(3)).toBe('Difícil');
    });

    test('should return "Desconhecido" for unknown level', () => {
      expect(getDifficultyLabel(999)).toBe('Desconhecido');
    });

    test('should return "Desconhecido" for level 0', () => {
      expect(getDifficultyLabel(0)).toBe('Desconhecido');
    });
  });
});
