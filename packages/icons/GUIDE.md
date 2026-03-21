# @mumukji/icons

아이콘 추가 가이드

---

## 아이콘 추가 방법

1. `src/svg/{category}/` 에 SVG 파일 추가
2. `pnpm generate:icons` 혹은 `pnpm build` 실행
   - `src/react/` 컴포넌트 자동 생성
   - `src/index.ts` 자동 업데이트
   - `README.md` 아이콘 목록 자동 업데이트
3. `apps/storybook/docs/iconography.mdx` 에 아이콘 추가
4. 변경된 파일 전체 커밋
   - `src/react/Icon*.tsx`
   - `src/index.ts`
   - `README.md`
   - `apps/storybook/docs/iconography.mdx`

---

## 네이밍 규칙

| SVG 파일                     | 컴포넌트 이름    | dist/svg          |
| ---------------------------- | ---------------- | ----------------- |
| `basic/icon-arrow-right.svg` | `IconArrowRight` | `arrow-right.svg` |
| `basic/icon-star-filled.svg` | `IconStarFilled` | `star-filled.svg` |
| `food/icon-korean.svg`       | `IconFoodKorean` | `food-korean.svg` |

> `basic` 카테고리는 컴포넌트 이름에 카테고리가 포함되지 않습니다. <br />
> `food` 카테고리는 `IconFood*` 형태로 생성됩니다.

### SVG 파일 규격

| 항목    | basic                           | food              |
| ------- | ------------------------------- | ----------------- |
| ViewBox | `0 0 24 24`                     | `0 0 48 48`       |
| 파일명  | `icon-{name}.svg`               | `icon-{name}.svg` |
| 색상    | 단색 (currentColor로 자동 변환) | 브랜드 컬러 유지  |

> 파일명은 반드시 `icon-` 접두사를 포함한 kebab-case로 작성해주세요.

---

## 스크립트

| 명령어                | 설명                                                          |
| --------------------- | ------------------------------------------------------------- |
| `pnpm generate:icons` | SVG → React 컴포넌트 변환 및 index.ts 생성 및 리드미 업데이트 |
| `pnpm build`          | 아이콘 생성 후 빌드 (`pnpm generate:icons` 포함)              |
| `pnpm clean`          | dist 폴더 제거                                                |

---

## 스토리북 업데이트

아이콘 추가 후 `apps/storybook/docs/iconography.mdx`에 직접 추가해주세요.

### 아이콘 추가

상단 import 구문과 `<IconGallery>` 블록 안에 각각 추가합니다.

```mdx
import { IconArrowRight, IconNewIcon } from '@mumukji/icons';

<IconGallery>
  <IconItem name='arrow-right'>
    <IconArrowRight />
  </IconItem>
  {/* 추가 */}
  <IconItem name='new-icon'>
    <IconNewIcon />
  </IconItem>
</IconGallery>
```

> `name`은 dist/svg 파일명 기준으로 작성해주세요. (`arrow-right.svg` → `arrow-right`)
