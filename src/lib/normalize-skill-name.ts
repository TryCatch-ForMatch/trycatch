export function normalizeSkillName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\+\+/g, 'plusplus')
    .replace(/#/g, 'sharp')
    .replace(/\.net/g, 'dotnet')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}
