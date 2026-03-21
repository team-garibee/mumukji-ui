/** @type {import('@commitlint/types').UserConfig} */

export default {
  parserPreset: {
    parserOpts: {
      headerPattern: '^(?<type>.+):\\s(?<subject>.+)$',
      headerCorrespondence: ['type', 'subject'],
    },
  },
  rules: {
    'type-case': [0],
    'subject-case': [0],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        '✨ Feat', // 새로운 기능/페이지 추가
        '🐛 Fix', // 버그 수정
        '♻️ Refactor', // 코드 리팩토링
        '⚙️ Chore', // 설정, 빌드, 패키지 설치, 아이콘, 이미지 파일 추가
        '🎨 Style', // 스타일/포맷팅 변경
        '📝 Docs', // 문서 관련 수정
        '🚚 Rename', // 파일/디렉토리명 변경
        '🔥 Remove', // 코드/파일 삭제
        '🚀 Release', // 릴리즈
      ],
    ],
  },
};
