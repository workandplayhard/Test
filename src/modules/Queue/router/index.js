import { QueuePage } from "../components/QueuePage";

export const QueueRouter = [
  {
    path: "/",
    component: {
      template: '<div><router-view name="queue"/><router-view /></div>',
    },
    meta: { auth: false },
    children: [
      {
        name: "queue",
        path: "queue",
        component: QueuePage,
        meta: { auth: false },
      },
    ],
  },
];
