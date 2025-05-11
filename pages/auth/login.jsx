import { getCsrfToken, signIn } from 'next-auth/react';
import { useState } from 'react';

export default function Login({ csrfToken }) {
  const [err, setErr] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (res.error) setErr(res.error);
    else window.location.href = '/';
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-sm mx-auto">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <input name="email" type="email" placeholder="Email" required className="w-full" />
      <input name="password" type="password" placeholder="Пароль" required className="w-full" />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Войти</button>
      {err && <p className="text-red-500">{err}</p>}
    </form>
  );
}

export async function getServerSideProps(ctx) {
  return { props: { csrfToken: await getCsrfToken(ctx) } };
}
