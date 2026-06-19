import { Button, Typography } from '@knittotextile/react-ui';
import LogoIcon from '@/components/ui/icon/logo';
import { useToast } from '@knittotextile/react-ui';

export default function TemplateLogin() {
  const toast = useToast();

  const onClickLogin = () => {
    toast.show({ variant: 'success', message: 'Login berhasil' });
  };

  return (
    <>
      <section className="h-screen w-full bg-knitto-blue-100 flex justify-center items-center">
        <div className="absolute left-5 top-5">
          <LogoIcon />
        </div>

        <div className="w-[400px] mx-auto p-[48px] bg-white dark:bg-black-80 dark:border dark:border-black-60 rounded-[8px] shadow-md">
          <div className="flex flex-col gap-y-10">
            <Typography as="h3" className="text-black-100 dark:text-greyish-semi-white">
              Learning Management System
            </Typography>
            <Button className="w-full flex justify-center" rounded onClick={onClickLogin}>
              LOG IN
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
