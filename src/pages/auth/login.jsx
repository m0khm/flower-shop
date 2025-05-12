import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    await signIn('credentials', { redirect: true, email, password: pass, callbackUrl: '/' });
  };

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto space-y-4">
      <h1 className="text-xl">Вход</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" className="w-full" />
      <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required placeholder="Пароль" className="w-full" />
      <Button className="w-full">Войти</Button>
    </form>
  );
}
