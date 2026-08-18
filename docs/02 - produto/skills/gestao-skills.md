# Documento de Produto --- Gestão de Skills

Classificação: Documento de Produto / Funcionalidade\
Camada: 2 --- Produto\
**Status do documento:** Versão consolidada baseada no schema.prisma  
**Status da implementação:** 🟢 completa — CRUD no painel e vínculo com usuários e projetos  
**Estado consolidado:** ver [estado-das-funcionalidades.md](../estado-das-funcionalidades.md)

------------------------------------------------------------------------

## 1. Identificação

Entidades envolvidas: 
- Skill 
- UserSkill 
- ProjectSkill

------------------------------------------------------------------------

## 2. Contexto e Objetivo

A gestão de skills permite mapear habilidades técnicas associadas a
usuários e projetos.

Resolve: 
- Falta de clareza sobre competências individuais; 
- Dificuldade de formar equipes adequadas; 
- Ausência de rastreabilidade entre habilidade declarada e projeto executado.

------------------------------------------------------------------------

## 3. Entidade Skill

Representa uma habilidade específica.

Campos: 
- id 
- name (único) 
- iconUrl 
- createdAt 
- updatedAt

------------------------------------------------------------------------

## 4. UserSkill

Relaciona usuário e habilidade.

Permite: 
- Construção do perfil técnico; 
- Filtro de usuários por habilidade.

------------------------------------------------------------------------

## 5. ProjectSkill

Relaciona projeto e habilidade desejada.

Permite: 
- Definição de requisitos mínimos; 
- Match entre perfil e projeto.

------------------------------------------------------------------------

## 6. Regras de Negócio

-   Skill é única por nome.
-   Um usuário pode possuir múltiplas skills.
-   Um projeto pode exigir múltiplas skills.
-   Skill não define percentual (isso é responsabilidade de Stack).

------------------------------------------------------------------------

## 7. Métricas Relacionadas

-   Skills mais utilizadas em projetos.
-   Correlação entre skill declarada e feedback recebido.
-   Taxa de match skill ↔ projeto.
