import vue from "@vitejs/plugin-vue";

import { UserConfig, ConfigEnv, loadEnv } from "vite";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

import UnoCSS from 'unocss/vite';

import path from "path";
const pathSrc = path.resolve(__dirname, "src");

export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());

  return {
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },
		css: {
			// css预处理器
			preprocessorOptions: {
				scss: {
					javascriptEnabled: true,
					additionalData: `@use "@/styles/variables.scss" as *;`
				}
			}
		},
		server: {
			port: +env.VITE_APP_PORT,
			proxy: {
				// 表面肉眼看到的请求地址: http://localhost:3000/dev-api/api/v1/users/me
				// 真实访问的代理目标地址: http://vapi.youlai.tech/api/v1/users/me
				[env.VITE_APP_BASE_API]: {
					target: 'http://vapi.youlai.tech',
					changeOrigin: true,
					rewrite: path => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
				}
			}
		},
    plugins: [
      vue(),
      AutoImport({
        // 自动导入vue相关函数，如: ref, reactive, toref等
        imports: ["vue"],
        eslintrc: {
          enabled: true, // 是否自动生成eslint规范， 建议生成后设置false
          filepath: "./eslint-auto-import.json", // 指定自动导入函数eslint规则的文件
        },
				resolvers: [
					// 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({})
				],
				vueTemplate: true, // 是否在vue模版中自动导入
        dts: path.resolve(pathSrc, "types", "auto-imports.d.ts"), // 指定自动导入函数TS类型声明文件路径
      }),
      Components({
				resolvers: [
					// 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"] // element-plus图标库，其他图标库 https://icon-sets.iconify.design/
          }),
				],
        dts: path.resolve(pathSrc, "types", "components.d.ts"), // 指定自动导入组件TS类型声明文件路径
      }),
			Icons({
        // 自动安装图标库
        autoInstall: true,
      }),
			UnoCSS({/* options */}),
			createSvgIconsPlugin({
				// 指定需要缓存的图标文件夹
				iconDirs: [path.resolve(pathSrc, 'assets/icons')],
				// 指定symbolId格式
				symbolId: 'icon-[dir]-[name]'
			}),
    ],
  };
};
