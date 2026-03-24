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
};

const SKIP_KEYS = ['$themes', '$metadata'];

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
  if (typeof obj !== 'object' || obj === null) { return obj; }
  if ('value' in obj && 'type' in obj) { return parseValue(obj.value); }

  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    result[key] = extractValues(val);
  }
  return result;
};

const generateTokens = async () => {
  try {
    await fs.mkdir(PATHS.PRIMITIVES_DIR, { recursive: true });

    const raw = await fs.readFile(PATHS.PRIMITIVE_JSON, 'utf8');
    const json = JSON.parse(raw);

    const lines = [];

    for (const [key, value] of Object.entries(json)) {
      if (SKIP_KEYS.includes(key)) { continue; }

      const exportName = toCamelCase(key);
      const extracted = extractValues(value);
      const serialized = JSON.stringify(extracted, null, 2);

      lines.push(`export const ${exportName} = ${serialized} as const;`);
    }

    const content = lines.join('\n\n') + '\n';
    await fs.writeFile(
      path.join(PATHS.PRIMITIVES_DIR, 'primitive.ts'),
      content,
    );

    const tokenName = path.basename(PATHS.PRIMITIVE_JSON, '.json');
    console.log(`✅ ${tokenName} 토큰이 성공적으로 생성되었습니다!`);
  } catch (error) {
    console.error('❌ 토큰 생성 중 에러 발생:', error);
    process.exit(1);
  }
};

generateTokens();
