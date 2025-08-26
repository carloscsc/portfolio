# 🧪 Testes e Validação

## 🎯 Visão Geral dos Testes

Implementar testes abrangentes é essencial para garantir que a internacionalização funcione corretamente em todos os cenários.

## 🔍 Tipos de Testes

### **1. Testes Unitários**

- Componentes individuais
- Hooks personalizados
- Funções utilitárias

### **2. Testes de Integração**

- Fluxo de navegação
- Troca de idiomas
- Carregamento de traduções

### **3. Testes E2E**

- Experiência completa do usuário
- Cenários reais de uso
- Performance

## 🧪 Configuração de Testes

### **Setup do Jest**

```javascript:jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
};

module.exports = createJestConfig(customJestConfig);
```

### **Setup do Jest**

```javascript:jest.setup.js
import '@testing-library/jest-dom';
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## 🧩 Testes de Componentes

### **Teste do Navbar**

```typescript:__tests__/components/navbar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Navbar } from '@/components/navbar';
import messages from '@/app/i18n/locales/en.json';

// Mock do next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/en',
}));

// Mock do next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => messages[key] || key,
  useLocale: () => 'en',
}));

describe('Navbar', () => {
  const renderNavbar = () => {
    return render(
      <NextIntlClientProvider messages={messages}>
        <Navbar />
      </NextIntlClientProvider>
    );
  };

  it('renders navigation links', () => {
    renderNavbar();

    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('displays language selector', () => {
    renderNavbar();

    expect(screen.getByLabelText('Language')).toBeInTheDocument();
  });

  it('shows current language as active', () => {
    renderNavbar();

    const englishFlag = screen.getByAltText('English');
    expect(englishFlag).toBeInTheDocument();
  });

  it('opens mobile menu when hamburger is clicked', () => {
    renderNavbar();

    const hamburgerButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(hamburgerButton);

    expect(screen.getByText('Services')).toBeInTheDocument();
  });
});
```

### **Teste do Language Selector**

```typescript:__tests__/components/language-selector.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { LanguageSelector } from '@/components/language-selector';
import messages from '@/app/i18n/locales/en.json';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => '/en',
}));

jest.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

describe('LanguageSelector', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders current language', () => {
    render(
      <NextIntlClientProvider messages={messages}>
        <LanguageSelector />
      </NextIntlClientProvider>
    );

    expect(screen.getByAltText('English')).toBeInTheDocument();
  });

  it('changes language when clicked', () => {
    render(
      <NextIntlClientProvider messages={messages}>
        <LanguageSelector />
      </NextIntlClientProvider>
    );

    const dropdownTrigger = screen.getByRole('button');
    fireEvent.click(dropdownTrigger);

    const portugueseOption = screen.getByText('Português');
    fireEvent.click(portugueseOption);

    expect(mockPush).toHaveBeenCalledWith('/pt-BR');
  });
});
```

## 🎯 Testes de Hooks

### **Teste do useLanguageSwitcher**

```typescript:__tests__/hooks/use-language-switcher.test.ts
import { renderHook, act } from '@testing-library/react';
import { useLanguageSwitcher } from '@/hooks/use-language-switcher';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => '/en/blog',
}));

jest.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

describe('useLanguageSwitcher', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('returns current locale', () => {
    const { result } = renderHook(() => useLanguageSwitcher());

    expect(result.current.currentLocale).toBe('en');
  });

  it('switches language correctly', () => {
    const { result } = renderHook(() => useLanguageSwitcher());

    act(() => {
      result.current.switchLanguage('pt-BR');
    });

    expect(mockPush).toHaveBeenCalledWith('/pt-BR/blog');
  });

  it('handles complex paths', () => {
    const { result } = renderHook(() => useLanguageSwitcher());

    act(() => {
      result.current.switchLanguage('nl');
    });

    expect(mockPush).toHaveBeenCalledWith('/nl/blog');
  });
});
```

## 🌐 Testes de Traduções

### **Teste de Validação de Traduções**

```typescript:__tests__/translations/validation.test.ts
import fs from 'fs';
import path from 'path';

const localesDir = path.join(process.cwd(), 'app/i18n/locales');

describe('Translation files', () => {
  const locales = ['en', 'pt-BR', 'nl'];

  it('all locale files exist', () => {
    locales.forEach(locale => {
      const filePath = path.join(localesDir, `${locale}.json`);
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });

  it('all locale files are valid JSON', () => {
    locales.forEach(locale => {
      const filePath = path.join(localesDir, `${locale}.json`);
      const content = fs.readFileSync(filePath, 'utf-8');

      expect(() => JSON.parse(content)).not.toThrow();
    });
  });

  it('all locales have the same keys', () => {
    const translationKeys: Record<string, string[]> = {};

    locales.forEach(locale => {
      const filePath = path.join(localesDir, `${locale}.json`);
      const content = fs.readFileSync(filePath, 'utf-8');
      const translations = JSON.parse(content);

      translationKeys[locale] = getNestedKeys(translations);
    });

    const referenceKeys = translationKeys['en'];

    locales.forEach(locale => {
      if (locale === 'en') return;

      const missingKeys = referenceKeys.filter(key =>
        !translationKeys[locale].includes(key)
      );

      const extraKeys = translationKeys[locale].filter(key =>
        !referenceKeys.includes(key)
      );

      expect(missingKeys).toEqual([]);
      expect(extraKeys).toEqual([]);
    });
  });
});

function getNestedKeys(obj: any, prefix = ''): string[] {
  const keys: string[] = [];

  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys.push(...getNestedKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }

  return keys;
}
```

## 🚀 Testes E2E com Playwright

### **Configuração do Playwright**

```typescript:playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### **Teste E2E de Navegação**

```typescript:e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between languages', async ({ page }) => {
    await page.goto('/en');

    // Verificar se está na página em inglês
    await expect(page.locator('h1')).toContainText('Carlos S. Cantanzaro');
    await expect(page.locator('nav')).toContainText('Services');

    // Trocar para português
    await page.click('[aria-label="Português (Brasil)"]');
    await page.waitForURL('/pt-BR');

    // Verificar se está na página em português
    await expect(page.locator('nav')).toContainText('Serviços');

    // Trocar para holandês
    await page.click('[aria-label="Nederlands"]');
    await page.waitForURL('/nl');

    // Verificar se está na página em holandês
    await expect(page.locator('nav')).toContainText('Diensten');
  });

  test('should maintain current page when switching languages', async ({ page }) => {
    await page.goto('/en/blog');

    // Trocar idioma mantendo na página do blog
    await page.click('[aria-label="Português (Brasil)"]');
    await page.waitForURL('/pt-BR/blog');

    // Verificar se ainda está na página do blog
    await expect(page.locator('h1')).toContainText('Blog');
  });

  test('should detect browser language', async ({ page }) => {
    // Simular navegador em português
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
    });

    await page.goto('/');

    // Deve redirecionar para português
    await expect(page).toHaveURL('/pt-BR');
  });
});
```

### **Teste E2E de Formulários**

```typescript:e2e/forms.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should submit form in different languages', async ({ page }) => {
    // Testar em inglês
    await page.goto('/en');
    await page.click('a[href="#contact"]');

    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('textarea[name="message"]', 'Hello, I would like to work with you.');

    await page.click('button[type="submit"]');

    await expect(page.locator('.toast')).toContainText('Message sent successfully!');

    // Testar em português
    await page.click('[aria-label="Português (Brasil)"]');
    await page.waitForURL('/pt-BR');

    await page.fill('input[name="name"]', 'João Silva');
    await page.fill('input[name="email"]', 'joao@exemplo.com');
    await page.fill('textarea[name="message"]', 'Olá, gostaria de trabalhar com você.');

    await page.click('button[type="submit"]');

    await expect(page.locator('.toast')).toContainText('Mensagem enviada com sucesso!');
  });
});
```

## 📊 Testes de Performance

### **Teste de Lighthouse**

```typescript:e2e/performance.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('should meet Core Web Vitals', async ({ page }) => {
    await page.goto('/en');

    const performanceMetrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const metrics = {};

          entries.forEach((entry) => {
            metrics[entry.name] = entry.startTime;
          });

          resolve(metrics);
        }).observe({ entryTypes: ['navigation', 'paint'] });
      });
    });

    // Verificar métricas de performance
    expect(performanceMetrics['first-contentful-paint']).toBeLessThan(2000);
  });

  test('should load translations efficiently', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/en');
    await page.click('[aria-label="Português (Brasil)"]');
    await page.waitForURL('/pt-BR');

    const loadTime = Date.now() - startTime;

    // Troca de idioma deve ser rápida
    expect(loadTime).toBeLessThan(1000);
  });
});
```

## 🔧 Testes de Acessibilidade

### **Teste de Acessibilidade**

```typescript:e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/en');

    // Verificar seletor de idioma
    await expect(page.locator('[aria-label="Language"]')).toBeVisible();

    // Verificar navegação
    await expect(page.locator('nav')).toHaveAttribute('role', 'navigation');

    // Verificar links
    const links = page.locator('nav a');
    for (let i = 0; i < await links.count(); i++) {
      const link = links.nth(i);
      const ariaLabel = await link.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/en');

    // Navegar com Tab
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();

    // Trocar idioma com Enter
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL('/pt-BR');
  });
});
```

## 📋 Scripts de Teste

### **Package.json Scripts**

```json:package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:translations": "jest translations",
    "test:accessibility": "playwright test accessibility.spec.ts"
  }
}
```

## 📊 Relatórios de Teste

### **Configuração de Cobertura**

```javascript:jest.config.js
module.exports = {
  // ... outras configurações

  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
    'hooks/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
  ],

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  coverageReporters: ['text', 'lcov', 'html'],
};
```

## 📋 Checklist de Testes

- [ ] Testes unitários configurados
- [ ] Testes de componentes implementados
- [ ] Testes de hooks criados
- [ ] Validação de traduções
- [ ] Testes E2E configurados
- [ ] Testes de performance
- [ ] Testes de acessibilidade
- [ ] Cobertura de código configurada
- [ ] Scripts de teste criados
- [ ] Relatórios de teste configurados
- [ ] CI/CD integrado
- [ ] Testes automatizados rodando
