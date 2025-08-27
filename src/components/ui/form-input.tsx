import { InputHTMLAttributes } from 'react';

type FormInputProps = {
  label: string;
  name: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function FormInput({ label, name, error, ...props }: FormInputProps) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} {...props} />
      {error && <p>{error}</p>}
    </div>
  );
}
