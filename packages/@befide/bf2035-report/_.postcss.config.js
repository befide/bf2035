import autoprefixer from "autoprefixer"
// import postcssPresetEnv from "postcss-preset-env";
import cssnano from "cssnano"
const config = {
  plugins: [
    //   postcssPresetEnv({
    //   stage: 3,
    //   features: {
    //     'nesting-rules': true,
    //     'custom-media-queries': true,
    //     'media-query-ranges': true
    //   }
    // }),
    autoprefixer(),
    cssnano(),
  ],
}
export default config
