import * as yup from 'yup';

export const loginSchema = yup.object({
  name: yup.string().required('El usuario es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
});
