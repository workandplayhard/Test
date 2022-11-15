import SignIn from '@/modules/auth/components/SignIn';

export const authRouter = [
  {
    path: '/sign-in',
    name: 'signIn',
    component: SignIn,
    meta: {
      guestOnly: true
    }
  }
];
