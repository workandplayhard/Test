import { ManagerRouter } from "@/modules/Manager/router";

const install = (Vue, options = {}) => {
  if (install.installed) return;
  install.installed = true;

  const { router } = options;

  if (router) {
    for (const route of ManagerRouter) {
      router.addRoute(route);
    }
  } else {
    throw Error("[ManagerModule]: router instance is not provided");
  }
};

export const ManagerModule = {
  name: "ManagerModule",
  deps: ["EnvModule"],
  install,
};
