'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';

export function InviteForm() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('USER');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiTryCatch.post('/invite', { email, role });

      const data = await response.data;

      if (response.status === 201) {
        toast.success(`Código de convite gerado: ${data.data.code}`);
        setEmail('');
      } else {
        toast.error(data.error || 'Erro ao criar convite.');
      }
    } catch (error) {
      console.error('Erro ao enviar convite:', error);
      toast.error('Erro na requisição. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto mt-4 max-w-md rounded-2xl p-6 shadow-lg">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Criar Convite</h2>

          <div className="space-y-1">
            <Label htmlFor="email">E-mail do convidado</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome@email.com"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="role">Função</Label>
            <Select
              defaultValue={role}
              onValueChange={(value: 'USER' | 'ADMIN' | 'MENTOR') =>
                setRole(value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="MENTOR">Mentor</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Enviando...' : 'Criar Convite'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
