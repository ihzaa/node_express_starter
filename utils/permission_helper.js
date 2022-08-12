module.exports = {
  actions: ["view", "create", "update", "delete"],
  special_permissions: {
    "Super-Admin": "have all permission",
  },
  module_permissions: {
    user_config: ["user_config_role", "user_config_user"],
  },
  get_all_permission() {
    let module_permission = {};
    Object.keys(this.module_permissions).forEach((module_name) => {
      module_permission[module_name] = [];
      this.module_permissions[module_name].forEach((permission_name) => {
        this.actions.forEach((action) => {
          module_permission[module_name].push(`${action} ${permission_name}`);
        });
      });
    });

    return module_permission;
  },
};
