import { useUserStoreHook } from '@/store/modules/user';
import { Directive, DirectiveBinding } from 'vue';

// 按钮权限
export const hasPerm: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding){
		const {role, perms} = useUserStoreHook();
		// 「超级管理员」拥有所有的按钮权限
		if (roles.includes('ROOT')) {
			return true;
		}
 		// 「其他角色」按钮权限校验
		const {value} = binding;
		if (value) {
			const requiredPerms = value; // DOM绑定需要的按钮权限标识
			const hasPerm = perms?.some(perm => requiredPerms.includes(perm));
			if (!hasPerm) {
				el.parentNode && el.parentNode.removeChild(el);
			}
		} else {
			throw new Error("need perms! Like v-has-perm=\"['sys:user:add','sys:user:edit']\"");
		}
	}
}
