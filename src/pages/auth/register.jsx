import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Компонент должен быть обычной функцией, не async
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      window.location.href = '/auth/login';
    } else {
      const { message } = await res.json();
      alert(`Ошибка: ${message}`);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 border rounded">
      <h1 className="text-xl font-semibold mb-4">Регистрация</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Пароль"
          className="w-full border px-3 py-2 rounded"
        />
        <Button className="w-full">Создать аккаунт</Button>
      </form>
      <p className="mt-4 text-center">
        Уже есть аккаунт?{' '}
        <Link href="/auth/login">
          <a className="text-green-600 hover:underline">Войти</a>
        </Link>
      </p>
    </div>
  );
}
