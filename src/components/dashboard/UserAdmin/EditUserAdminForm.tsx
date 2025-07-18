import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { X } from 'lucide-react';
import { Skill } from '@prisma/client';
import { FullUser } from '@/types/user';

interface EditUserAdminFormProps {
  user: FullUser;
  onClose: () => void;
  onSuccess: () => void;
}

export  function EditUserAdminForm({
  user,
  onClose,
  onSuccess,
}: EditUserAdminFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    avatar: user.avatar || '',
    linkedin: user.linkedin || '',
    github: user.github || '',
    bio: user.bio || '',
    role: user.role || 'USER',
    skills: user.skills?.map((s) => s.skill.id) || [],
  });

  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch('/api/skill');
        if (!res.ok) throw new Error('Erro ao carregar as skills.');
        const data = await res.json();
        setSkills(data);
      } catch (error) {
        console.error('Erro ao carregar as skills:', error);
        setError('Erro ao carregar as skills.');
      }
    };

    fetchSkills();
  }, []);

  const handleChange = (
    field: keyof typeof formData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = (skillId: string) => {
    if (!formData.skills.includes(skillId)) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, skillId] }));
    }
  };

  const handleRemoveSkill = (skillId: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((id) => id !== skillId),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/user-admin/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao atualizar usuário.');

      setSuccess('Usuário atualizado com sucesso!');
      onSuccess();
      onClose();
      router.refresh();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      setError('Erro ao atualizar usuário.');
    } finally {
      setLoading(false);
    }
  };

  const availableSkills = skills.filter(
    (skill) => !formData.skills.includes(skill.id)
  );

  return (
    <Card className="rounded-2xl p-6 shadow-lg">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <Label>Nome</Label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label>LinkedIn</Label>
              <Input
                value={formData.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label>GitHub</Label>
              <Input
                value={formData.github}
                onChange={(e) => handleChange('github', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label>Skills</Label>
            <Select onValueChange={handleAddSkill} value="">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione uma skill" />
              </SelectTrigger>
              <SelectContent>
                {availableSkills.map((skill) => (
                  <SelectItem key={skill.id} value={skill.id}>
                    {skill.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="mt-3 flex flex-wrap gap-2">
              {formData.skills.map((skillId) => {
                const skill = skills.find((s) => s.id === skillId);
                return (
                  <span
                    key={skillId}
                    className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-xs"
                  >
                    {skill?.name || skillId}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skillId)}
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      <X size={12} />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>

          <div className="space-y-1">
            <Label>Bio</Label>
            <Textarea
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label>Avatar (URL)</Label>
              <Input
                value={formData.avatar}
                onChange={(e) => handleChange('avatar', e.target.value)}
              />
              {formData.avatar && (
                <Image
                  src={formData.avatar}
                  alt="Avatar Preview"
                  className="mt-2 h-16 w-16 rounded-full border object-cover"
                />
              )}
            </div>

            <div className="space-y-1">
              <Label>Permissão</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleChange('role', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a permissão" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">Usuário</SelectItem>
                  <SelectItem value="ADMIN">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            {error && (
              <p className="text-sm font-medium text-red-500">{error}</p>
            )}
            {success && (
              <p className="text-sm font-medium text-green-500">{success}</p>
            )}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
