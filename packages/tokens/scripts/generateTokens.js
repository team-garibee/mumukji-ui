/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATHS = {
  PRIMITIVE_JSON: path.resolve(__dirname, '../src/primitive.json'),
  PRIMITIVES_DIR: path.resolve(__dirname, '../src/primitives'),
  CSS_DIR: path.resolve(__dirname, '../dist/css'),
};

const SKIP_KEYS = ['$themes', '$metadata'];

/** camelCase → kebab-case 변환 */
const toKebabCase = (str) =>
  str.replace(/([A-Z])/g, (char) => `-${char.toLowerCase()}`);

/** 'font-size' 같은 형식을 'fontSize'로 변환 */
const toCamelCase = (str) =>
  str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());

/** 숫자로 변환 가능한 값은 숫자로, 아니면 문자열 그대로 반환 */
const parseValue = (value) => {
  const num = Number(value);
  return !isNaN(num) ? num : value;
};

/**
 * 피그마 토큰 형식에서 실제 값만 꺼내서 반환
 * { value: '#fff', type: 'color' } → '#fff'
 * 중첩된 객체는 재귀로 처리
 */
const extractValues = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  if ('value' in obj && 'type' in obj) {
    return parseValue(obj.value);
  }

  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    result[key] = extractValues(val);
  }
  return result;
};

/** spacing, radius는 px 단위 적용 */
const CATEGORIES_WITH_PX = new Set(['spacing', 'radius']);

/** font-size: 36px 미만은 rem 사용, 나머지는 px 사용 */
const BASE_FONT_SIZE = 16;
const REM_THRESHOLD = 36;

/** font-family는 문자열로 */
const CATEGORIES_WITH_QUOTES = new Set(['font-family']);

/**
 * 추출된 토큰 객체를 CSS 커스텀 프로퍼티 목록으로 변환
 * { primary: { 50: '#fff' } } → ['--color-primary-50: #fff']
 */
const flattenToCssVars = (obj, prefix, rootCategory) => {
  const vars = [];
  for (const [key, value] of Object.entries(obj)) {
    const varName = `${prefix}-${toKebabCase(String(key))}`;
    if (typeof value === 'object' && value !== null) {
      vars.push(...flattenToCssVars(value, varName, rootCategory));
    } else {
      const needsPx =
        CATEGORIES_WITH_PX.has(rootCategory) && typeof value === 'number';
      const needsQuotes = CATEGORIES_WITH_QUOTES.has(rootCategory);
      const isFontSize =
        rootCategory === 'font-size' && typeof value === 'number';
      const cssValue = needsPx
        ? `${value}px`
        : isFontSize
          ? value < REM_THRESHOLD
            ? `${value / BASE_FONT_SIZE}rem`
            : `${value}px`
          : needsQuotes
            ? `'${String(value)}'`
            : String(value);
      vars.push(`  ${varName}: ${cssValue};`);
    }
  }
  return vars;
};

const generateTokens = async () => {
  try {
    await fs.mkdir(PATHS.PRIMITIVES_DIR, { recursive: true });
    await fs.mkdir(PATHS.CSS_DIR, { recursive: true });

    const raw = await fs.readFile(PATHS.PRIMITIVE_JSON, 'utf8');
    const json = JSON.parse(raw);

    const tsLines = [];
    const cssVars = [];

    for (const [key, value] of Object.entries(json)) {
      if (SKIP_KEYS.includes(key)) {
        continue;
      }

      const exportName = toCamelCase(key);
      const rootCategory = toKebabCase(exportName);
      const extracted = extractValues(value);

      // TS 상수 생성
      const serialized = JSON.stringify(extracted, null, 2);
      tsLines.push(`export const ${exportName} = ${serialized} as const;`);

      // CSS 변수 생성
      cssVars.push(
        ...flattenToCssVars(extracted, `--${rootCategory}`, rootCategory),
      );
    }

    // primitive.ts 저장
    const tsContent = tsLines.join('\n\n') + '\n';
    await fs.writeFile(
      path.join(PATHS.PRIMITIVES_DIR, 'primitive.ts'),
      tsContent,
    );

    // dist/css/ 경로로 primitive.css 저장
    const cssContent = `:root {\n${cssVars.join('\n')}\n}\n`;
    await fs.writeFile(path.join(PATHS.CSS_DIR, 'primitive.css'), cssContent);

    const tokenName = path.basename(PATHS.PRIMITIVE_JSON, '.json');
    console.log(
      `✅ ${tokenName} 토큰이 성공적으로 생성되었습니다! (TS + SCSS)`,
    );
  } catch (error) {
    console.error('❌ 토큰 생성 중 에러 발생:', error);
    process.exit(1);
  }
};

generateTokens();
