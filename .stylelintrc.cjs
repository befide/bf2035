module.exports = {
  extends: [
    "stylelint-config-tailwindcss",
    "stylelint-prettier/recommended",
    "stylelint-order",
  ],
  rules: {
    "prettier/prettier": true,
  },
  rules: {
    "order/order": ["custom-properties", "declarations"],
    "order/properties-order": ["width", "height"],
  },
}
