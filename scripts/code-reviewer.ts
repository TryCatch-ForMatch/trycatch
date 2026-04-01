import { GoogleGenAI } from '@google/genai';
import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
// Importamos o módulo 'os' para pegar o nome da máquina
import * as os from 'node:os';
import * as path from 'node:path';
import * as readline from 'node:readline';

// 0. Carrega o arquivo .env.local do seu projeto
import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd());

const ai = new GoogleGenAI({});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => rl.question(query, resolve));
};

function getChangedFiles(): string[] {
  try {
    const trackedOutput = execSync('git diff --name-only HEAD').toString();
    const untrackedOutput = execSync(
      'git ls-files --others --exclude-standard'
    ).toString();
    const combinedOutput = trackedOutput + '\n' + untrackedOutput;

    return combinedOutput
      .split('\n')
      .map((file) => file.trim())
      .filter(
        (file) =>
          file !== '' && fs.existsSync(file) && /\.(ts|tsx|js|jsx)$/.test(file)
      );
  } catch (e) {
    console.error('⚠️ Erro ao tentar ler o Git:', e);
    return [];
  }
}

function getAllFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;

  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (
      file === 'node_modules' ||
      file === '.next' ||
      file === '.git' ||
      file === 'dist' ||
      file === 'docs' ||
      file === 'codereview_reports'
    )
      return;

    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunked: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size));
  }
  return chunked;
}

// Envia um lote de arquivos para a IA analisar exigindo o formato estrito
async function analyzeBatch(
  files: string[],
  batchIndex: number,
  totalBatches: number,
  computerName: string,
  currentDate: string
): Promise<string> {
  console.log(
    `🧠 [Lote ${batchIndex}/${totalBatches}] Enviando ${files.length} arquivo(s) para o Gemini...`
  );

  let codeContext = '';
  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8');
    codeContext += `\n\n--- ARQUIVO: ${file} ---\n${content}`;
  });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Você é um Engenheiro de Software Sênior especializado em TypeScript, Next.js e Node.js.
                            Gere um relatório de code review focado neste lote de arquivos.
                            
                            ⚠️ REGRAS OBRIGATÓRIAS DE FORMATAÇÃO DO RELATÓRIO ⚠️
                            Você deve seguir RIGOROSAMENTE a seguinte estrutura visual em Markdown para a sua resposta. Não invente novas seções, use exatamente estas e preencha as tabelas com os problemas encontrados no código fornecido.
                            
                            Substitua as informações entre colchetes pelas análises reais geradas por você.

                            --- INÍCIO DO MOLDE ---
                            
                            ## Relatório de Code Review - Projeto \`trycatch\`

                            **Data:** ${currentDate}
                            **Tecnologias Foco:** TypeScript, Next.js, Node.js

                            Este relatório de code review visa identificar oportunidades de melhoria na arquitetura, organização, manutenibilidade, performance e segurança do projeto \`trycatch\`, analisando especificamente o código-fonte fornecido neste lote.

                            ---

                            ### 🏗️ Arquitetura e Organização de Pastas

                            [Faça um parágrafo de introdução curto aqui analisando a estrutura de pastas implícita nos arquivos lidos ou nos problemas encontrados].

                            | Descrição do Problema | Sugestão de Melhoria |
                            | :-------------------- | :------------------- |
                            | [Descreva o problema de arquitetura, arquivos mal localizados ou acoplamento] | [Sugira a melhoria exata com exemplos de caminhos de pasta] |

                            ---

                            ### 🛡️ Segurança

                            | Arquivo/Linha Afetada | Grau de Severidade | O que está errado e POR QUÊ | Sugestão de Correção com o Bloco de Código Exato |
                            | :-------------------- | :----------------- | :-------------------------- | :----------------------------------------------- |
                            | [Caminho do Arquivo] | [Baixo/Médio/Alto/Crítico] | [Explicação do risco] | [Exemplo de código corrigido] |

                            ---

                            ### 🚀 Performance

                            | Arquivo/Linha Afetada | Grau de Severidade | O que está errado e POR QUÊ | Sugestão de Correção com o Bloco de Código Exato |
                            | :-------------------- | :----------------- | :-------------------------- | :----------------------------------------------- |
                            | [Caminho do Arquivo] | [Baixo/Médio/Alto/Crítico] | [Explicação do gargalo] | [Exemplo de código corrigido] |

                            ---

                            ### 🔧 Manutenibilidade

                            | Arquivo/Linha Afetada | Grau de Severidade | O que está errado e POR QUÊ | Sugestão de Correção com o Bloco de Código Exato |
                            | :-------------------- | :----------------- | :-------------------------- | :----------------------------------------------- |
                            | [Caminho do Arquivo] | [Baixo/Médio/Alto/Crítico] | [Explicação] | [Exemplo de código corrigido] |

                            ---

                            ### 🎨 Clean Code / Boas Práticas

                            | Arquivo/Linha Afetada | Grau de Severidade | O que está errado e POR QUÊ | Sugestão de Correção com o Bloco de Código Exato |
                            | :-------------------- | :----------------- | :-------------------------- | :----------------------------------------------- |
                            | [Caminho do Arquivo] | [Baixo/Médio/Alto/Crítico] | [Explicação] | [Exemplo de código corrigido] |

                            ---

                            ### Conclusão

                            [Faça um breve parágrafo de conclusão encorajador contendo um resumo da saúde do código analisado neste lote].
                            
                            --- FIM DO MOLDE ---

                            CÓDIGO PARA ANÁLISE DO LOTE ${batchIndex}:
                            ${codeContext}`,
            },
          ],
        },
      ],
    });

    return response.text || '';
  } catch (error) {
    console.error(`❌ Erro no Lote ${batchIndex}:`, error);
    return `\n\n# ❌ Erro ao analisar o Lote ${batchIndex}\n`;
  }
}

async function main() {
  console.clear();
  console.log('🤖 Agente de Code Review Inteligente');
  console.log('====================================');

  console.log('Escolha o que deseja revisar:');
  console.log('[1] Apenas os arquivos alterados (Git Diff)');
  console.log('[2] Escolher uma pasta/módulo específico');
  console.log('[3] Todo o projeto (Dividido em lotes de 10 arquivos)');

  const choice = await question('\nEscolha uma opção: ');
  let filesToReview: string[] = [];

  if (choice.trim() === '1') {
    filesToReview = getChangedFiles();
  } else if (choice.trim() === '2') {
    console.log('\nPastas comuns detectadas ou mapeadas:');
    console.log('[1] src/app (Páginas e APIs)');
    console.log('[2] src/components (Componentes visuais)');
    console.log('[3] Digitar um caminho personalizado');

    const folderChoice = await question('\nEscolha o módulo: ');

    if (folderChoice.trim() === '1') {
      filesToReview = getAllFiles(path.join(process.cwd(), 'src', 'app'));
    } else if (folderChoice.trim() === '2') {
      filesToReview = getAllFiles(
        path.join(process.cwd(), 'src', 'components')
      );
    } else if (folderChoice.trim() === '3') {
      const customPath = await question(
        'Digite o caminho da pasta (ex: src/lib): '
      );
      filesToReview = getAllFiles(path.join(process.cwd(), customPath));
    }
  } else if (choice.trim() === '3') {
    filesToReview = getAllFiles(process.cwd());
  } else {
    console.log('❌ Opção inválida.');
    rl.close();
    return;
  }

  if (filesToReview.length === 0) {
    console.log('ℹ️ Nenhum arquivo encontrado para revisão nesta seleção.');
    rl.close();
    return;
  }

  console.log(
    `\n📄 Total de arquivos mapeados para revisão: ${filesToReview.length}`
  );

  // Pegando informações da máquina e do tempo
  const computerName = os.hostname();
  const currentDate = new Date().toISOString().split('T')[0]; // Formato AAAA-MM-DD

  const fileBatches = chunkArray(filesToReview, 10);
  let fullReport = `# 📊 Relatório Consolidado de Code Review\n`;
  fullReport += `*Executado por: ${computerName}*\n\n---\n`;

  for (let i = 0; i < fileBatches.length; i++) {
    const batchReport = await analyzeBatch(
      fileBatches[i],
      i + 1,
      fileBatches.length,
      computerName,
      currentDate
    );
    fullReport +=
      `\n\n# 📦 Resultados do Lote ${i + 1}\n` + batchReport + `\n\n---`;
  }

  const reportsDir = path.join(process.cwd(), 'docs', 'codereview_reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const now = new Date();
  const timestamp = now
    .toISOString()
    .replace('T', '_')
    .replace(/\..+/, '')
    .replaceAll(':', '-');
  const reportPath = path.join(reportsDir, `review_${timestamp}.md`);

  fs.writeFileSync(reportPath, fullReport);

  console.log(`\n🎉 Relatório final gerado com sucesso!`);
  console.log(`📂 Salvo em: ${reportPath}`);
  rl.close();
}

main();
