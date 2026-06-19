import { Button, Select, Typography } from '@knittotextile/react-ui';
import { FormWrapper } from '@/components/ui/form/form';
import LogoIcon from '@/components/ui/icon/logo';
import InputwithLabel from '@/components/ui/inputs/input-with-label';
import InputWithSuffix from '@/components/ui/inputs/input-with-suffix';
import FeedbackError from '@/components/ui/form/feedback-error-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { branchOptions, formLoginCabangSchema, FormLoginCabangSchema } from './hooks/login-cabang';

export default function TemplateLogin() {
  const form = useForm<FormLoginCabangSchema>({
    resolver: zodResolver(formLoginCabangSchema),
    defaultValues: {
      username: '',
      password: '',
      branch: '',
    },
  });

  const onSave = (values: FormLoginCabangSchema) => {
    console.log(values);
  };

  return (
    <>
      <section className="h-screen w-full bg-knitto-blue-100 flex justify-center items-center">
        <div className="absolute left-5 top-5">
          <LogoIcon />
        </div>
        <FormProvider {...form}>
          <div className="w-[400px] mx-auto p-[48px] bg-white dark:bg-black-80 dark:border dark:border-black-60 rounded-[8px] shadow-md">
            <Typography as="h3" className="text-black-100 dark:text-greyish-semi-white">
              Auth Login
            </Typography>
            <div className="mt-[32px]">
              <FormWrapper errors={form.formState.errors} className="flex flex-col gap-y-[18px]" onSubmit={form.handleSubmit(onSave)}>
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
                        <Typography as="global-report-title" className="inline-block text-black-100 dark:text-greyish-semi-white">
                          Password
                        </Typography>
                        <InputWithSuffix required placeholder="Password" type="password" classNameInput="h-[44px]" {...field} />
                        {form.formState.errors.password?.message && <FeedbackError text={form.formState.errors.password?.message} />}
                      </div>
                    );
                  }}
                />

                <Controller
                  control={form.control}
                  name="branch"
                  render={({ field }) => {
                    return (
                      <div>
                        <Select
                          label="Cabang"
                          placeHolder="Pilih cabang"
                          options={branchOptions}
                          value={field.value || null}
                          onChangeSingleOption={(value) => form.setValue('branch', (value as string) ?? '')}
                          onResetSelection={() => form.setValue('branch', '')}
                        />
                        {form.formState.errors.branch?.message && <FeedbackError text={form.formState.errors.branch?.message} />}
                      </div>
                    );
                  }}
                />

                <Button type="submit" className="mt-[28px] h-[41px] w-full flex justify-center items-center p-0!">
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
