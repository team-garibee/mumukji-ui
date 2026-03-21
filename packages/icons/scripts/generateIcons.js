/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { transform } from '@svgr/core';
import { optimize } from 'svgo';
import prettierConfig from '../../../prettier.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATHS = {
  SVG_DIR: path.resolve(__dirname, '../src/svg'),
  REACT_DIR: path.resolve(__dirname, '../src/react'),
  INDEX_FILE: path.resolve(__dirname, '../src/index.ts'),
  DIST_SVG_DIR: path.resolve(__dirname, '../dist/svg'),
  README_FILE: path.resolve(__dirname, '../README.md'),
};

const COLOR_ICON_CATEGORY = 'food';

/** kebab-case → PascalCase 변환 */
const toPascalCase = (str) => {
  return str.replace(/(^\w|-\w)/g, (text) =>
    text.replace(/-/, '').toUpperCase(),
  );
};

/** 파일명 생성 유틸 */
const getIconNames = (file, category) => {
  const isFood = category === COLOR_ICON_CATEGORY;

  const baseName = file.replace('icon-', '').replace('.svg', '');
  const distSvgName = isFood ? `food-${baseName}.svg` : `${baseName}.svg`;
  const componentName = `Icon${toPascalCase(isFood ? `food-${baseName}` : baseName)}`;

  return {
    isFood,
    distSvgName,
    componentName,
  };
};

/** SVGO 공용 설정 */
const getSvgoConfig = (isFood) => ({
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          convertPathData: { floatPrecision: 3 },
          convertShapeToPath: true,
          mergePaths: true,
        },
      },
    },
    ...(isFood
      ? []
      : [{ name: 'convertColors', params: { currentColor: true } }]),
    'removeDimensions',
  ],
});

/** 아이콘 변환 템플릿 */
const iconTemplate = (variables, { tpl }) => {
  const isFood = variables.componentName.includes(COLOR_ICON_CATEGORY);
  const defaultSize = isFood ? 48 : 24;
  const sizeAssignment = `size = ${defaultSize}`;

  return tpl`
import type { SVGProps } from "react";
${'\n'}
export const ${variables.componentName} = ({ 
  ${sizeAssignment}, 
  ...props 
}: SVGProps<SVGSVGElement> & { size?: number }) => (
  ${variables.jsx}
);
`;
};

/** React 컴포넌트 변환 */
const transformReact = async (svgCode, componentName) => {
  return await transform(
    svgCode,
    {
      plugins: ['@svgr/plugin-jsx', '@svgr/plugin-prettier'],
      dimensions: false,
      icon: false,
      typescript: true,
      template: iconTemplate,
      jsxRuntime: 'automatic',
      exportType: 'named',
      prettierConfig: { ...prettierConfig },
      svgProps: {
        width: '{size}',
        height: '{size}',
        'aria-hidden': 'true',
        focusable: 'false',
      },
    },
    { componentName },
  );
};

/** README 아이콘 목록 섹션 업데이트 */
const updateReadme = async (iconRows) => {
  const readme = await fs.readFile(PATHS.README_FILE, 'utf8');

  const basicRows = iconRows.filter(
    ({ category }) => category !== COLOR_ICON_CATEGORY,
  );
  const foodRows = iconRows.filter(
    ({ category }) => category === COLOR_ICON_CATEGORY,
  );

  const buildTable = (rows) => {
    if (rows.length === 0) {
      return '_아직 추가된 아이콘이 없어요_';
    }
    return [
      '| Preview | Component | SVG |',
      '| :---: | :---: | :---: |',
      ...rows.map(
        ({ svgPath, componentName, distSvgName }) =>
          `| <img src="${svgPath}" width="24" /> | \`${componentName}\` | \`${distSvgName}\` |`,
      ),
    ].join('\n');
  };

  const newSection = [
    '## 아이콘 목록',
    '',
    '### 일반 아이콘',
    '',
    buildTable(basicRows),
    '',
    '### 음식 아이콘',
    '',
    buildTable(foodRows),
    '',
  ].join('\n');

  const START_MARKER = '## 아이콘 목록';
  const startIdx = readme.indexOf(START_MARKER);
  const endIdx = readme.indexOf('\n## ', startIdx + START_MARKER.length);

  const before = readme.slice(0, startIdx);
  const after = endIdx !== -1 ? readme.slice(endIdx) : '';

  await fs.writeFile(PATHS.README_FILE, before + newSection + after, 'utf-8');
};

/** 메인 실행 함수 */
const generateIcons = async () => {
  try {
    await Promise.all([
      fs.mkdir(PATHS.REACT_DIR, { recursive: true }),
      fs.mkdir(PATHS.DIST_SVG_DIR, { recursive: true }),
    ]);
    const categories = await fs.readdir(PATHS.SVG_DIR);
    const indexContent = [];
    const iconRows = [];

    for (const category of categories) {
      const categoryPath = path.join(PATHS.SVG_DIR, category);
      const stat = await fs.stat(categoryPath);
      if (!stat.isDirectory()) {
        continue;
      }

      const files = await fs.readdir(categoryPath);

      for (const file of files) {
        if (!file.endsWith('.svg')) {
          continue;
        }

        const filePath = path.join(categoryPath, file);
        const svgCode = await fs.readFile(filePath, 'utf8');

        const { isFood, distSvgName, componentName } = getIconNames(
          file,
          category,
        );

        // 최적화된 SVG dist에 저장
        const { data: optimizedSvg } = optimize(svgCode, {
          path: filePath,
          ...getSvgoConfig(isFood),
        });
        await fs.writeFile(
          path.join(PATHS.DIST_SVG_DIR, distSvgName),
          optimizedSvg,
        );

        // 리액트 컴포넌트 변환 및 src에 저장
        const jsCode = await transformReact(optimizedSvg, componentName);
        await fs.writeFile(
          path.join(PATHS.REACT_DIR, `${componentName}.tsx`),
          jsCode,
        );

        indexContent.push(
          `export { ${componentName} } from './react/${componentName}';`,
        );

        iconRows.push({
          category,
          svgPath: `./src/svg/${category}/${file}`,
          componentName,
          distSvgName,
        });
      }
    }

    indexContent.sort();
    await Promise.all([
      fs.writeFile(PATHS.INDEX_FILE, indexContent.join('\n') + '\n'),
      updateReadme(iconRows),
    ]);

    console.log('✅ 모든 아이콘이 성공적으로 생성되었습니다!');
  } catch (error) {
    console.error('❌ 아이콘 생성 중 에러 발생:', error);
    process.exit(1);
  }
};

generateIcons();
