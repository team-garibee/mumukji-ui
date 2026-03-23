# @mumukji/icons

머먹지(Mumukji) 서비스의 브랜드 아이덴티티를 담은 공식 아이콘 패키지입니다.
일관된 디자인 시스템을 위해 모든 아이콘은 `24x24`(일반) 또는 `48x48`(음식) ViewBox를 기준으로 설계되었습니다.

## Features

- **React Ready**: 즉시 사용 가능한 React 컴포넌트 제공
- **TypeScript**: 모든 컴포넌트에 대한 타입 정의 포함
- **Optimized**: SVGO를 통해 최적화된 SVG 파일
- **Dual Format**: React 컴포넌트 및 원본 SVG 파일 지원

---

## 설치

```bash
# npm 사용 시
npm install @mumukji/icons

# pnpm 사용 시
pnpm add @mumukji/icons
```

---

## 사용

### React 컴포넌트

- 기본적으로 `currentColor`를 따르므로, 부모 요소의 글자 색상을 변경하거나 `color` props를 통해 색상을 조절할 수 있습니다.
- `IconFood`로 시작하는 아이콘들은 브랜드 고유의 컬러를 포함하고 있습니다. 이 아이콘들은 color 속성에 영향을 받지 않고 원본 그래픽을 유지합니다.

```tsx
import { IconArrowRight } from '@mumukji/icons';
// 개별 경로 import도 지원합니다.
import { IconArrowRight } from '@mumukji/icons/IconArrowRight';

export default function Example() {
  return (
    <>
      <IconArrowRight size={24} />
      <IconArrowRight size={48} color='red' />
    </>
  );
}
```

#### Icon Props

| **Prop**    | **Type** | **Default**    | **Description**                   |
| ----------- | -------- | -------------- | --------------------------------- |
| `size`      | `number` | `24` / `48`    | 아이콘의 가로/세로 크기           |
| `color`     | `string` | `currentColor` | 아이콘의 색상 (일반 아이콘 한정)  |
| `className` | `string` | -              | 추가적인 스타일링을 위한 클래스명 |

### SVG 직접 사용

```tsx
import arrowRight from '@mumukji/icons/IconArrowRight';
```

---

## 아이콘 목록

### 일반 아이콘

|                                                                  Preview                                                                  |    Component     |        SVG        |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :--------------: | :---------------: |
| <img src="https://raw.githubusercontent.com/team-garibee/mumukji-ui/main/packages/icons/src/svg/basic/icon-arrow-right.svg" width="24" /> | `IconArrowRight` | `arrow-right.svg` |

### 음식 아이콘

|                                                                Preview                                                                |     Component      |         SVG         |
| :-----------------------------------------------------------------------------------------------------------------------------------: | :----------------: | :-----------------: |
|  <img src="https://raw.githubusercontent.com/team-garibee/mumukji-ui/main/packages/icons/src/svg/food/icon-asian.svg" width="24" />   |  `IconFoodAsian`   |  `food-asian.svg`   |
|  <img src="https://raw.githubusercontent.com/team-garibee/mumukji-ui/main/packages/icons/src/svg/food/icon-bunsik.svg" width="24" />  |  `IconFoodBunsik`  |  `food-bunsik.svg`  |
| <img src="https://raw.githubusercontent.com/team-garibee/mumukji-ui/main/packages/icons/src/svg/food/icon-chicken.svg" width="24" />  | `IconFoodChicken`  | `food-chicken.svg`  |
| <img src="https://raw.githubusercontent.com/team-garibee/mumukji-ui/main/packages/icons/src/svg/food/icon-chinese.svg" width="24" />  | `IconFoodChinese`  | `food-chinese.svg`  |
|   <img src="https://raw.githubusercontent.com/team-garibee/mumukji-ui/main/packages/icons/src/svg/food/icon-diet.svg" width="24" />   |   `IconFoodDiet`   |   `food-diet.svg`   |
| <img src="https://raw.githubusercontent.com/team-garibee/mumukji-ui/main/packages/icons/src/svg/food/icon-fastfood.svg" width="24" /> | `IconFoodFastfood` | `food-fastfood.svg` |
| <img src="https://raw.githubusercontent.com/team-garibee/mumukji-ui/main/packages/icons/src/svg/food/icon-japanese.svg" width="24" /> | `IconFoodJapanese` | `food-japanese.svg` |
|  <img src="https://raw.githubusercontent.com/team-garibee/mumukji-ui/main/packages/icons/src/svg/food/icon-korean.svg" width="24" />  |  `IconFoodKorean`  |  `food-korean.svg`  |
| <img src="https://raw.githubusercontent.com/team-garibee/mumukji-ui/main/packages/icons/src/svg/food/icon-western.svg" width="24" />  | `IconFoodWestern`  | `food-western.svg`  |

## License

`MIT`
