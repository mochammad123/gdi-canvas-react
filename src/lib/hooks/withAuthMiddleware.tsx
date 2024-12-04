import { useUserLogin } from './hooks';

export default function withAuthMiddleware<TProps extends object>(WrappedComponent: React.ComponentType<TProps>) {
  return (props: TProps) => {
    const { authorized, unauthorized } = useUserLogin();
    const isLoginPage = window.location.pathname === '/';
    const redirectToLogin = () => {
      window.location.href = '/';
    };

    const redirectToDashboard = () => {
      window.location.href = '/admin/dashboard';
    };

    // redirect to dashboard page when user already login and on login page
    if (isLoginPage && authorized) {
      redirectToDashboard();
      return;
    }

    // redirect to login page when unauthorized
    if (!isLoginPage && unauthorized) {
      redirectToLogin();
      return;
    }

    return <WrappedComponent {...props} />;
  };
}
