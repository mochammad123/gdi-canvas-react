import LogoIcon from '@/components/ui/icon/logo';
import { useAuthLoginMutation } from '@/redux/api/auth';
import { useNavigate } from 'react-router-dom';
import FormLogin, { type IFormLogin } from './components/FormLogin';
import { useToast } from '@/components/ui/toast';
export default function LoginPage() {
  const navigate = useNavigate();
  const [mutateLogin, { isLoading }] = useAuthLoginMutation();
  const toast = useToast();

  const onSubmitLogin = async (payload: IFormLogin) => {
    try {
      // const response = await mutateLogin(payload).unwrap();
      // Cookies.set(COOKIES_NAME.Token, response.result.token);
      window.location.href = 'admin/dashboard';
    } catch (e: unknown) {
      toast.open('info', JSON.stringify(e));
    }
  };

  return (
    <div className="bg-knitto-blue-100 min-h-screen relative flex justify-center items-center">
      <div className="absolute left-6 top-6">
        <LogoIcon />
      </div>
      <FormLogin isLoading={isLoading} onSubmitLogin={onSubmitLogin} />
    </div>
  );
}
