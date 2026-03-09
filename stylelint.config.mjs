/** @type {import("stylelint").Config} */

export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-css-modules',
    'stylelint-config-property-sort-order-smacss',
  ],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global'] },
    ],
    'selector-class-pattern': null,
    'scss/dollar-variable-pattern': null,
    'scss/comment-no-empty': true,
    'scss/no-duplicate-dollar-variables': true,
    'color-no-invalid-hex': true,
    'shorthand-property-no-redundant-values': true,
  },
};
