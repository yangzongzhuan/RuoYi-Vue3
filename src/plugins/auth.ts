import useUserStore from '@/store/modules/user';

function authPermission(permission: any) {
    const all_permission = '*:*:*';
    const permissions = useUserStore().permissions;
    if (permission && permission.length > 0) {
        return permissions.some(v => {
            return all_permission === v || v === permission;
        });
    } else {
        return false;
    }
}

function authRole(role: string) {
    const super_admin = 'admin';
    const roles = useUserStore().roles;
    if (role && role.length > 0) {
        return roles.some(v => {
            return super_admin === v || v === role;
        });
    } else {
        return false;
    }
}

export default {
    // 验证用户是否具备某权限
    hasPermi(permission: any) {
        return authPermission(permission);
    },
    // 验证用户是否含有指定权限，只需包含其中一个
    hasPermiOr(permissions: any[]) {
        return permissions.some(item => {
            return authPermission(item);
        });
    },
    // 验证用户是否含有指定权限，必须全部拥有
    hasPermiAnd(permissions: any[]) {
        return permissions.every(item => {
            return authPermission(item);
        });
    },
    // 验证用户是否具备某角色
    hasRole(role: any) {
        return authRole(role);
    },
    // 验证用户是否含有指定角色，只需包含其中一个
    hasRoleOr(roles: any[]) {
        return roles.some(item => {
            return authRole(item);
        });
    },
    // 验证用户是否含有指定角色，必须全部拥有
    hasRoleAnd(roles: any[]) {
        return roles.every(item => {
            return authRole(item);
        });
    },
};