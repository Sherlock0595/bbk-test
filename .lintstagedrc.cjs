module.exports = {
  '*.{js,ts,vue}': ['eslint --fix --quiet .', 'nuxt typecheck .'],
  '*.{css,scss,vue}': ['stylelint --fix --allow-empty-input'],
};
