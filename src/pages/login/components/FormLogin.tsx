import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Input from '@/components/ui/inputs/input';
import InputWithSuffix from '@/components/ui/inputs/input-with-suffix';
import Label from '@/components/ui/label';
import { Typography } from '@/components/ui/typhography';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formLoginSchema = z.object({
  username: z.string().min(1, { message: 'Username wajib diisi' }),
  password: z.string().min(1, { message: 'Password wajib diisi' }),
});

export interface IFormLogin extends z.infer<typeof formLoginSchema> {}

export default function FormLogin({ onSubmitLogin, isLoading }: { isLoading: boolean; onSubmitLogin: (data: IFormLogin) => void }) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<IFormLogin>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    progressive: true,
  });

  const onSubmit = handleSubmit(onSubmitLogin);

  const isValidated = !!Object.keys(errors).length;

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const [username, password] = watch(['username', 'password']);

  return (
    <Card className="w-[25rem] mx-auto p-12">
      <CardTitle className="text-left mb-8">{import.meta.env.VITE_APP_NAME}</CardTitle>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div>
            <Label className="mb-1">Username</Label>
            <Input {...register('username', { required: true })} className="!h-11" placeholder="Username" />
            <Typography as="global-description" className="text-red-500 min-h-6">
              {!username && errors.username?.message && errors.username?.message}
            </Typography>
          </div>

          <div>
            <Label className="mb-1">Password</Label>
            <InputWithSuffix {...register('password', { required: true })} classNameInput="!h-11" type="password" placeholder="Password" />
            <Typography as="global-description" className="text-red-500 min-h-6">
              {!password && errors.password?.message && errors.password?.message}
            </Typography>
          </div>

          <Button type="submit" className="w-full mt-5 h-[2.5625rem] flex justify-center items-center" disabled={isLoading}>
            LOGIN
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
