import { QueueRouter } from "@/modules/Queue/router";

const install = (Vue, options = {}) => {
  if (install.installed) return;
  install.installed = true;

  const { router } = options;

  if (router) {
    for (const route of QueueRouter) {
      router.addRoute(route);
    }
  } else {
    throw Error("[QueueModule]: router instance is not provided");
  }
};

export const QueueModule = {
  name: "QueueModule",
  deps: ["EnvModule"],
  install,
};
