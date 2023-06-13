import type { App } from 'vue';
import { createPinia } from 'pinia';
// 全局注册 store
const store = createPinia();
export function setupStore(app: App<Element>) {
	app.use(store);
}
export { store };
