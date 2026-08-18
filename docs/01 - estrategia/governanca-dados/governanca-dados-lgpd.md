# Documento Estratégico — Governança de Dados e LGPD
 
**Classificação:** Documento Estratégico
**Camada:** 1 — Documentos Estratégicos
**Status:** Versão 2 — expandido para cobrir dados de reputação
 
> ⚠️ **Este documento não é parecer jurídico.** Ele registra decisões de produto e
> engenharia sobre tratamento de dados pessoais e a interpretação adotada pelo
> projeto. Antes de a plataforma operar com base ampla de usuários reais, o
> conteúdo deve ser revisado por profissional habilitado — especialmente as
> seções 4 (bases legais) e 7 (direitos do titular).
 
---
 
## 1. Objetivo
 
Estabelecer os princípios de proteção de dados do TryCatch e as regras concretas
de tratamento, retenção e exclusão, com atenção particular aos **dados de
reputação** — que são a categoria mais sensível da plataforma, por serem
informação pessoal produzida por terceiros sobre uma pessoa identificada.
 
Este documento governa decisões de produto, arquitetura e comunicação. Ele não
descreve implementação.
 
---
 
## 2. Escopo
 
Cobre:
 
- Categorias de dados tratados;
- Finalidade de cada tratamento;
- Regras de retenção e exclusão;
- Direitos do titular e como são atendidos;
- Tratamento de dados de reputação e feedback;
- Compromissos de segurança e auditoria.
Fora de escopo:
 
- Implementação técnica de criptografia, backup ou infraestrutura;
- Redação final de termos de uso e política de privacidade (derivam deste
  documento);
- Contratos com operadores e subprocessadores.
---
 
## 3. Categorias de dados tratados
 
| Categoria | Exemplos | Origem | Sensibilidade |
|---|---|---|---|
| Cadastrais | nome, e-mail, username, avatar | Titular | Média |
| Perfil profissional | bio, skills, certificados, GitHub, LinkedIn | Titular | Baixa (publicação voluntária) |
| Disponibilidade | dias e horários | Titular | Baixa |
| Participação | projetos, stacks assumidas, entregas | Sistema | Média |
| **Reputação** | **corroborações e feedback escrito recebidos** | **Terceiros** | **Alta** |
| Acesso e auditoria | logs estruturados com identificadores | Sistema | Média |
| Convites | e-mail, quem convidou, data de uso | Titular e ADMIN | Média |
 
**A categoria de reputação recebe tratamento diferenciado ao longo deste
documento** porque combina três características que nenhuma outra reúne: é
produzida por outra pessoa, descreve conduta de um indivíduo identificado, e pode
ter efeito sobre oportunidades profissionais.
 
---
 
## 4. Bases legais adotadas
 
| Tratamento | Base legal adotada |
|---|---|
| Cadastro e autenticação | Execução de contrato (uso da plataforma) |
| Perfil e portfólio público | Consentimento — controlado por toggles granulares |
| Participação em projetos | Execução de contrato |
| Feedback e corroborações | Legítimo interesse, com salvaguardas descritas na seção 6 |
| Logs e auditoria | Legítimo interesse (segurança e rastreabilidade) |
| E-mails transacionais | Execução de contrato |
 
> ⚠️ A base de legítimo interesse para feedback é a que mais exige validação
> jurídica. Ela pressupõe: finalidade legítima e informada, mínimo necessário,
> expectativa razoável do titular e possibilidade de oposição. As salvaguardas da
> seção 6 existem justamente para sustentá-la.
 
---
 
## 5. Princípios
 
- **Minimização** — coletar apenas o necessário para a finalidade declarada;
- **Finalidade explícita** — nenhum dado coletado para um fim é reaproveitado em
  outro sem nova base;
- **Transparência** — a pessoa sabe o que é coletado, por quem é visto e o que
  acontece se ela sair;
- **Controle do titular** — visibilidade pública é sempre opt-in ou reversível;
- **Não exposição de identificador interno** — `id` nunca aparece em rota pública;
- **Rastreabilidade** — ações críticas registradas em log estruturado, sem
  conteúdo pessoal;
- **Não punitividade** — dado de reputação não é usado para restringir acesso.
---
 
## 6. Regras específicas de dados de reputação
 
Esta seção resolve a contradição existente entre a garantia de exclusão de conta
e a regra de imutabilidade do feedback.
 
### 6.1 O conflito
 
- Este documento garante ao titular a exclusão de sua conta.
- O documento de Feedback determina que feedback não é editável nem excluível.
Ambas as regras são corretas isoladamente e incompatíveis se aplicadas ao mesmo
conjunto de dados sem distinção.
 
### 6.2 A distinção que resolve
 
**Um registro de feedback contém dados pessoais de duas pessoas diferentes, com
titularidades distintas:**
 
- para o **avaliado**, o conteúdo é dado sobre si;
- para o **avaliador**, a autoria é dado sobre si.
A pessoa que sai da plataforma é titular do que **recebeu**, não do que **deu**
sobre outras pessoas.
 
### 6.3 Regra adotada — anonimização assimétrica
 
Ao excluir a conta:
 
| Dado | Destino | Por quê |
|---|---|---|
| Feedbacks recebidos (texto) | **Excluídos** | São dados sobre o titular |
| Corroborações recebidas | **Excluídas** | Idem |
| Feedbacks dados a terceiros (texto) | **Preservados**, autoria anonimizada | São dados sobre outras pessoas |
| Corroborações dadas a terceiros | **Preservadas**, autoria anonimizada | Idem |
| Contadores das outras pessoas | **Recalculados** | O atestado continua contando como "1 pessoa", sem vínculo |
 
O campo `fromUserId` é substituído por marcador de conta removida. **A
anonimização é irreversível.**
 
### 6.4 Por que a autoria não pode simplesmente ser apagada junto
 
Apagar as avaliações que a pessoa deu implicaria que qualquer participante pode
destruir a reputação construída por seus colegas apenas encerrando a própria
conta. Isso transformaria a exclusão de conta em vetor de dano a terceiros.
 
### 6.5 Dever de informação prévia
 
**Esta regra deve ser comunicada antes da avaliação, não no momento da saída.**
 
Obrigatório constar em:
 
- Termos de uso;
- FAQ (`conteudos-informativos-e-educacionais.md`);
- Tela de avaliação, em texto curto e visível.
Texto de referência:
 
> As avaliações que você deixa para outras pessoas permanecem na plataforma mesmo
> que você encerre sua conta, sem sua identificação. As avaliações que você
> recebeu são apagadas junto com a conta.
 
### 6.6 Identidade do avaliador
 
- Registrada de forma permanente enquanto a conta existir;
- **Nunca exibida publicamente**;
- **Nunca exibida ao avaliado**;
- Acessível a ADMIN somente mediante denúncia ou apuração de conduta, com o acesso
  registrado em log.
### 6.7 Direito de oposição
 
O titular pode:
 
- desativar a exibição pública de toda a reputação (`showFeedback = false`);
- solicitar apuração de feedback que considere abusivo, desrespeitoso ou falso.
Feedback que viole as regras da plataforma é **ocultado** por ADMIN, com registro
de motivo — nunca editado. Ocultação remove o registro de qualquer agregação
pública.
 
O titular **não pode** excluir seletivamente feedback verdadeiro que não lhe
agrade: isso esvaziaria a finalidade do sistema. O controle disponível é ligar ou
desligar o bloco inteiro.
 
### 6.8 Publicação de texto
 
Texto de feedback só se torna público quando **as duas condições** se cumprem:
 
1. o autor autorizou a publicação no momento da escrita;
2. o avaliado optou por exibi-lo.
Nenhuma das duas partes publica sozinha.
 
---
 
## 7. Direitos do titular e como são atendidos
 
| Direito | Como é atendido | Status |
|---|---|---|
| Acesso aos próprios dados | Dashboard privado + exportação | 🔴 exportação não implementada |
| Correção | Edição de perfil e portfólio | 🟢 |
| Exclusão de conta | Fluxo de exclusão com regra da seção 6.3 | 🔴 não implementado |
| Portabilidade | Exportação em formato legível | 🔴 não implementado |
| Oposição | Toggles de visibilidade; denúncia de feedback | 🟡 parcial |
| Informação sobre tratamento | Termos, FAQ, avisos em tela | 🟡 parcial |
 
> ⚠️ **Divergência conhecida, registrada conforme Documento 0, seção 4:** a versão
> anterior deste documento afirmava que a exclusão de conta era um direito
> atendido. **Ela não está implementada.** A afirmação foi corrigida acima.
> Enquanto o fluxo não existir, pedidos de exclusão devem ser tratados
> manualmente por ADMIN, seguindo a regra 6.3, com registro da execução.
 
---
 
## 8. Retenção
 
| Dado | Retenção |
|---|---|
| Conta ativa | Enquanto durar o vínculo |
| Dados de conta excluída | Removidos, exceto o previsto em 6.3 |
| Feedback anonimizado | Indeterminado (deixou de ser dado pessoal do autor) |
| Logs estruturados | Prazo a definir — **decisão em aberto** |
| Convites usados | Mantidos para auditoria, com e-mail anonimizável a pedido |
| InviteRequest rejeitada | Prazo a definir — **decisão em aberto** |
 
---
 
## 9. Segurança
 
- Autenticação via NextAuth com senha em hash;
- Controle de permissão por papel (`ADMIN`, `USER`, `MENTOR`) verificado no
  backend em toda rota;
- Logs estruturados sem senha, token, e-mail completo ou conteúdo pessoal —
  registram identificadores, não conteúdo;
- Portfólio privado retorna 404 idêntico ao de usuário inexistente, não revelando
  existência de conta;
- Objeto `User` do Prisma nunca retornado íntegro em resposta de API.
> ⚠️ **Dívida conhecida:** nenhuma rota usa `select`/`omit` do Prisma atualmente,
> e objetos `User` saem com hash de senha (ver SEC-03). Isso **contradiz o
> compromisso acima** e é falha de segurança ativa, não apenas dívida técnica.
> Correção prioritária.
 
---
 
## 10. Relação com outros documentos
 
Orienta:
 
- `docs/02 - produto/feedback/feedback-reputacao.md`
- `docs/02 - produto/portfolio/portfolio.md`
- `docs/02 - produto/conteudos/conteudos-informativos-e-educacionais.md`
- `docs/03 - tecnico/modelagem/modelagem-dados.md`
Alinhado a:
 
- Documento 0 — Visão Geral, Governança e Arquitetura da Documentação;
- Documento Estratégico — Planejamento de Qualidade de Software;
- Documento Estratégico — Acessibilidade e Inclusão Digital.
---
 
## 11. Antipadrões
 
- Coletar dado "porque pode ser útil depois";
- Publicar dado pessoal por padrão sem opt-in;
- Tratar feedback como dado exclusivo do avaliado ou exclusivo do avaliador;
- Permitir que a saída de uma pessoa apague reputação de terceiros;
- Informar regra de retenção apenas no momento da exclusão;
- Registrar conteúdo pessoal em log;
- Prometer direito não implementado.
---
 
## 12. Decisões em aberto
 
- Prazo de retenção de logs;
- Prazo de retenção de `InviteRequest` rejeitada;
- Formato da exportação de dados;
- Existe fluxo de denúncia de feedback pelo avaliado? (afeta painel admin)
- Validação jurídica das bases legais da seção 4.
---
 
## 13. Histórico de decisões
 
| Versão | Decisão |
|---|---|
| v1 | Princípios gerais de minimização, finalidade e auditoria |
| v2 | Reputação reconhecida como categoria de sensibilidade alta |
| v2 | Adotada anonimização assimétrica na exclusão de conta |
| v2 | Definido dever de informação prévia sobre permanência do feedback dado |
| v2 | Publicação de texto exige consentimento das duas partes |
| v2 | Corrigida afirmação sobre exclusão de conta — direito ainda não implementado |
| v2 | Registrada contradição entre compromisso de proteção e a dívida SEC-03 |