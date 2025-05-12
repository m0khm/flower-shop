
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Register() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass }),
    });
    location.href = '/auth/login';
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto space-y-4">
      <h1 className="text-xl">Регистрация</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" className="w-full" />
      <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required placeholder="Пароль" className="w-full" />
      <Button className="w-full">Создать аккаунт</Button>
    </form>
  );
}
