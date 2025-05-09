// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  semi: false,
  tabWidth: 2,
  useTabs: false,
  printWidth: 100,
  plugins: ["prettier-plugin-astro", "prettier-plugin-packagejson"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
}
