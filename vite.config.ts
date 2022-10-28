import Path from "path";
import { defineConfig, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import V from "rollup-plugin-visualizer";
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

const plugins: PluginOption[] = [
  vue(),
  // build({
  //   vuePath: "//assets.cooocc.com/libs/vue.js",
  //   buildProject: true
  // }),
  // @ts-ignore
  V({
    filename: "dist/v.html",
    open: process.env?.NODE_ENV === "production"
  }),
  Components({
    resolvers: [VantResolver()]
  }),
];

export default defineConfig(() => {
  return {
    base: process.env?.NODE_ENV === 'produiction' ? "bonsai/" : "",
    plugins,
    envDir: "envs",
    resolve: {
      alias: {
        "@Api": Path.resolve(__dirname, "src/api/modules"),
        "@Service": Path.resolve(__dirname, "src/service"),
        "@Components": Path.resolve(__dirname, "src/components"),
        "@Views": Path.resolve(__dirname, "src/views"),
        "@Foundation": Path.resolve(__dirname, "src/foundation"),
        "@Store": Path.resolve(__dirname, "src/store"),
        "@Typings": Path.resolve(__dirname, "src/typings")
      }
    },
    build: {
      minify: false,
      rollupOptions: {
        output: {
          chunkFileNames(chunkInfo) {
            const firstModulePath = Object.keys(chunkInfo.modules)[0];
            if (firstModulePath.includes("node_modules")) {
              return `assets/js/modules/${chunkInfo.name}-[hash].js`;
            }

            return `assets/js/apps/${chunkInfo.name}-[hash].js`;
          },
          manualChunks: {
            "vant": ["vant"],
            "vue": ["vue", "plugin-vue:export-helper"],
            "vite": ["vite/modulepreload-polyfill"],
            "vue-router": ["vue-router"],
            "dayjs": ["dayjs"],
          }
        }
      }
    }
  }
})
