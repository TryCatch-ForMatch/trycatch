import fs from 'fs';
import path from 'path';

const readmePath = path.resolve('README.md');
let content = fs.readFileSync(readmePath, 'utf8');

// Corrige todas as imagens dos contribuidores
content = content.replace(
  /<img\s+([^>]*src="https:\/\/avatars\.githubusercontent\.com[^>]*)>/g,
  (match, attrs) => {
    // Garante width fixo e adiciona estilo
    let newAttrs = attrs;

    // Força o width a 100px
    if (/width="\d+px;?"/.test(newAttrs)) {
      newAttrs = newAttrs.replace(/width="\d+px;?"/, 'width="100px;"');
    } else {
      newAttrs += ' width="100px;"';
    }

    // Adiciona ou substitui o style para border-radius
    if (/style="/.test(newAttrs)) {
      newAttrs = newAttrs.replace(/style="([^"]*)"/, (m, s) => {
        // Se já tiver border-radius, não adiciona de novo
        if (/border-radius/.test(s)) return `style="${s}"`;
        return `style="${s} border-radius: 50%;"`;
      });
    } else {
      newAttrs += ' style="border-radius: 50%;"';
    }

    return `<img ${newAttrs}>`;
  }
);

fs.writeFileSync(readmePath, content, 'utf8');
console.log(
  '✅ Imagens de contribuidores atualizadas com border-radius e tamanho padronizado!'
);
