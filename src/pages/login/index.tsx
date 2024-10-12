import LogoIcon from '@/components/icon/logo';
import KNUI from '@/components/KNUI';
import { handleError } from '@/lib/utils';
import { COOKIES_NAME, KNUI_LABEL } from '@/lib/variables/constants';
import { useAuthLoginMutation } from '@/redux/api/auth';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import FormLogin, { type IFormLogin } from './components/FormLogin';
export default function LoginPage() {
  const navigate = useNavigate();
  const [mutateLogin, { isLoading }] = useAuthLoginMutation();

  const onSubmitLogin = async (payload: IFormLogin) => {
    try {
      // const response = await mutateLogin(payload).unwrap();
      // Cookies.set(COOKIES_NAME.Token, response.result.token);
      window.location.href = 'admin/dashboard';
    } catch (e: unknown) {
       handleError(e);
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
