import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function Register() {
  const [err, setErr] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const { message } = await res.json();
      setErr(message);
    } else {
      await signIn('credentials', {
        redirect: false,
        email: body.email,
        password: body.password,
      });
      window.location.href = '/';
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-sm mx-auto">
      <input name="name" type="text" placeholder="Имя" required className="w-full" />
      <input name="email" type="email" placeholder="Email" required className="w-full" />
      <input name="password" type="password" placeholder="Пароль" required className="w-full" />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
        Зарегистрироваться
      </button>
      {err && <p className="text-red-500">{err}</p>}
    </form>
  );
}
