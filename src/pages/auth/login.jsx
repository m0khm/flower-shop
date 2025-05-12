// src/pages/auth/login.jsx
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // пытаемся залогиниться через credentials-провайдер
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res.error) {
      // выводим сообщение об ошибке
      alert(res.error);
    } else {
      // при успешном входе перенаправляем на главную
      window.location.href = '/';
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-semibold mb-6 text-center">Вход</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Пароль"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
        />
        <Button className="w-full">Войти</Button>
      </form>
      <p className="mt-4 text-center">
        Ещё нет аккаунта?{' '}
        <Link href="/auth/register">
          <a className="text-green-600 hover:underline">Зарегистрироваться</a>
        </Link>
      </p>
    </div>
  );
}
