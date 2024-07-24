module.exports = {
    plugins: [
        [
            require("postcss-preset-env")({
                stage: 1,
            }),
            require("autoprefixer"),
            require("cssnano")({
                preset: "default",
            }),
        ],
    ],
};
