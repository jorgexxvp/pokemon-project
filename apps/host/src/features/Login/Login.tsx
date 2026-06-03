import { yupResolver } from '@hookform/resolvers/yup';
import { LockKeyhole, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../../toolbox';
import { ResponseType, useLoginStore } from '@nx-mfe-template/toolbox';
import { InputText, CustomButton, ThemeButton } from '@nx-mfe-template/ui';

const Login = () => {
  const { fetchAuth, response } = useLoginStore();

  const loginForm = useForm<{ name: string; password: string }>({
    resolver: yupResolver(loginSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = loginForm;

  return (
    <main className="relative z-10 grow flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-10 flex items-center justify-center gap-4">
          <h1 className="text-5xl font-semibold tracking-tight mb-2">
            Pokedex
          </h1>
          <ThemeButton />
        </div>

        <div className="bg-(--color-bg-card)/90 border border-(--color-border-soft) rounded-xl p-8 shadow-2xl backdrop-blur-md">
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data) => fetchAuth(data))}
          >
            <InputText
              label="Usuario"
              methods={loginForm}
              name="name"
              icon={<User />}
              error={errors.name?.message}
              placeholder="Ingrese su usuario"
            />
            <InputText
              label="Contraseña"
              methods={loginForm}
              name="password"
              type="password"
              error={errors.password?.message}
              placeholder="Ingrese su contraseña"
              icon={<LockKeyhole />}
            />

            <div className="flex flex-col gap-2">
              <CustomButton
                type="submit"
                text="Continuar"
                disabled={response.type === ResponseType.LOADING}
                loading={response.type === ResponseType.LOADING}
              />

              {response.type === ResponseType.ERROR && (
                <p className="text-sm text-red-500 font-bold text-end">
                  {response.message}
                </p>
              )}
              {response.type === ResponseType.SUCCESS && (
                <p className="text-sm text-green-500 font-bold text-end">
                  {response.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
