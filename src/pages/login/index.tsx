import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form/form';
import LogoIcon from '@/components/ui/icon/logo';
import InputwithLabel from '@/components/ui/inputs/input-with-label';
import InputWithSuffix from '@/components/ui/inputs/input-with-suffix';
import Label from '@/components/ui/label';
import { useToast } from '@/components/ui/toast';
import { Typography } from '@/components/ui/typhography';
import FeedbackError from '@/components/ui/typhography/feedback-error-input';
import { env } from '@/lib/variables/env';
import { useAuthLoginMutation } from '@/redux/api/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { formLoginSchema, FormLoginSchema, getLoginErrorMessage, getLoginResult } from './hooks/hooks';

export default function LoginPage() {
  const form = useForm<FormLoginSchema>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { mutateLogin, isLoading } = useFetchLogin();
  const toast = useToast();

  const navigate = useNavigate();

  const onSave = async (values: FormLoginSchema) => {
    try {
      const response = await mutateLogin(values).unwrap();
      const result = getLoginResult(response);
      toast.open('success', result.message);
      navigate('/example/dashboard');
    } catch (error: unknown) {
      const errorMessage = getLoginErrorMessage(error);
      toast.open('error', errorMessage);
    }
  };

  return (
    <>
      <section className="h-screen w-full bg-knitto-blue-100 flex justify-center items-center">
        <div className="absolute left-5 top-5">
          <LogoIcon />
        </div>
        <FormProvider {...form}>
          <div className="w-[400px] mx-auto p-[48px] bg-white rounded-[8px]">
            <Typography as="h3" className="text-black-100">
              {env.VITE_APP_NAME}
            </Typography>
            <div className="mt-[32px]">
              <FormWrapper errors={form.formState.errors} className="flex flex-col gap-y-[20px]" onSubmit={form.handleSubmit(onSave)}>
                <Controller
                  control={form.control}
                  name="username"
                  render={({ field }) => {
                    return (
                      <div>
                        <InputwithLabel required label="Username" placeholder="Username" classNameInput="h-[44px]" {...field} />
                        {form.formState.errors.username?.message && <FeedbackError text={form.formState.errors.username?.message} />}
                      </div>
                    );
                  }}
                />
                <Controller
                  control={form.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <div>
                        <Label>Password</Label>
                        <InputWithSuffix required placeholder="Password" type="password" classNameInput="h-[44px]" {...field} />
                        {form.formState.errors.password?.message && <FeedbackError text={form.formState.errors.password?.message} />}
                      </div>
                    );
                  }}
                />

                <Button type="submit" className="mt-[28px] h-[41px] w-full flex justify-center items-center p-0!" loading={isLoading}>
                  LOGIN
                </Button>
              </FormWrapper>
            </div>
          </div>
        </FormProvider>
      </section>
    </>
  );
}

const useFetchLogin = () => {
  const [mutateLogin, { isLoading }] = useAuthLoginMutation();

  return {
    mutateLogin,
    isLoading,
  };
};
