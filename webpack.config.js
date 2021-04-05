const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const isProductionBuild = process.env.NODE_ENV === "production";

const mode = isProductionBuild ? "production" : "development";
const devtool = isProductionBuild ? undefined : "source-map";

console.log(`Build mode: ${mode}`);

const entryPoints = {
    main: path.join(__dirname, "src", "main", "main.ts"),
    preload: path.join(__dirname, "src", "common", "preload.ts"),
    renderer: path.join(__dirname, "src", "renderer", "renderer.ts"),
};

const targets = {
    main: "electron-main",
    preload: "electron-preload",
    renderer: "electron-renderer",
};

const baseConfig = {
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "bundle"),
    },
    mode,
    devtool,
};

const mainConfig = {
    entry: {
        main: entryPoints.main,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    target: targets.main,
};

const preloadConfig = {
    entry: {
        preload: entryPoints.preload,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    target: targets.preload,
};

const rendererConfig = {
    entry: {
        renderer: entryPoints.renderer,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.png$/,
                use: ["file-loader"],
            },
        ],
    },
    resolve: {
        alias: {
            "@": path.join(__dirname, "src", "renderer"),
            vue$: "vue/dist/vue.esm.js",
        },
        extensions: [".ts", ".js"],
    },
    plugins: [new VueLoaderPlugin()],
    target: targets.renderer,
};

module.exports = [
    Object.assign({}, baseConfig, mainConfig),
    Object.assign({}, baseConfig, preloadConfig),
    Object.assign({}, baseConfig, rendererConfig),
];
