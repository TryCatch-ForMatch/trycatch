'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormInput } from '@/components/ui/form-input';

type Skill = {
  id: string;
  name: string;
};

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const inviteCode = searchParams.get('inviteCode') || '';

  const [skillsOptions, setSkillsOptions] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const [form, setForm] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    avatar: '',
    linkedin: '',
    github: '',
    bio: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (!email || !inviteCode) {
      router.push('/register');
    }

    async function fetchSkills() {
      const res = await fetch('/api/skill');
      if (res.ok) {
        const data = await res.json();
        setSkillsOptions(data);
      }
    }

    fetchSkills();
  }, [email, inviteCode, router]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSkillToggle(id: string) {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        email,
        inviteCode,
        skills: selectedSkills,
      }),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      setError(data.error || 'Erro ao cadastrar usuário.');
    }
  }

  return (
    <div>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <FormInput label="E-mail" name="email" value={email} disabled />
        <FormInput
          label="Código de Convite"
          name="inviteCode"
          value={inviteCode}
          disabled
        />

        <FormInput
          label="Nome"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Senha"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Confirmar Senha"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Avatar (URL)"
          name="avatar"
          type="url"
          value={form.avatar}
          onChange={handleChange}
        />

        <FormInput
          label="LinkedIn"
          name="linkedin"
          type="url"
          value={form.linkedin}
          onChange={handleChange}
        />

        <FormInput
          label="GitHub"
          name="github"
          type="url"
          value={form.github}
          onChange={handleChange}
        />

        <div>
          <label>Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div>
          <label>Selecione suas skills</label>
          {skillsOptions.map((skill) => (
            <div key={skill.id}>
              <label>
                <input
                  type="checkbox"
                  value={skill.id}
                  checked={selectedSkills.includes(skill.id)}
                  onChange={() => handleSkillToggle(skill.id)}
                />
                {skill.name}
              </label>
            </div>
          ))}
        </div>

        {error && <p>{error}</p>}

        <button type="submit">Finalizar Cadastro</button>
      </form>
    </div>
  );
}
