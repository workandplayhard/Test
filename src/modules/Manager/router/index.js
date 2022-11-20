import { ManagerPage } from "../components/ManagerPage";

export const ManagerRouter = [
  {
    path: "/",
    component: {
      template: '<div><router-view name="manager"/><router-view /></div>',
    },
    meta: { auth: false },
    children: [
      {
        name: "manager",
        path: "manager",
        component: ManagerPage,
        meta: { auth: false },
      },
    ],
  },
];
