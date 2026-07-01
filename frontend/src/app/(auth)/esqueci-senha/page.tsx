import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ForgotPasswordPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Esqueci minha senha</CardTitle>
        <CardDescription>Estrutura preparada para recuperação de senha.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <p>
          O fluxo de envio de e-mail de recuperação será conectado ao backend quando o endpoint de reset
          estiver disponível.
        </p>
        <p>
          Enquanto isso, volte para a página de{' '}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            login
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  );
}
