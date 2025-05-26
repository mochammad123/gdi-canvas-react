import { Button } from '@/components/ui/button';
import LogoIcon from '@/components/ui/icon/logo';
import { Typography } from '@/components/ui/typhography';

export default function TemplateLogin() {
  const onClickLogin = () => {
    alert('login');
  };

  return (
    <>
      <section className="h-screen w-full bg-knitto-blue-100 flex justify-center items-center">
        <div className="absolute left-5 top-5">
          <LogoIcon />
        </div>

        <div className="w-[400px] mx-auto p-[48px] bg-white rounded-[8px]">
          <div className="flex flex-col gap-y-10">
            <Typography as="h3" className="text-black-100">
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
