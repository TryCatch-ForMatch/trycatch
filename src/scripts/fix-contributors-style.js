import fs from 'fs';

const file = 'CONTRIBUTORS.md';
let content = fs.readFileSync(file, 'utf-8');

// aplica estilo padrão a todas as imagens de contribuidores
content = content.replace(
  /<img src="(.*?)" width="(\d+)px;" alt="(.*?)"\/>/g,
  '<img src="$1" width="$2" height="$2" style="object-fit: cover; border-radius: 50%;" alt="$3"/>'
);

fs.writeFileSync(file, content);
console.log('✅ Estilo das imagens padronizado!');
