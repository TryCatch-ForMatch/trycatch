name: ✍️ Tarefa Simples
description: Reporte um problema técnico encontrado.
title: '[BUG]'
labels: ['task']
assignees: []
body:
  - type: textarea
    id: descricao
    attributes:
      label: '📝 Descrição do problema'
      description: 'Descreva o problema em uma ou duas frases. O que precisa ser feito?'
      placeholder: 'Ex.: Botão criar projetos não funciona.'
    validations:
      required: true
  - type: textarea
    id: criterios
    attributes:
      label: '🚨​​ Qual o impacto no projeto?'
      description: 'O que o problema causa dentro do projeto?'
      placeholder: 'Ex.: O usuário fica impossibilitado de criar novos projetos.'
    validations:
      required: true
  - type: textarea
    id: contexto
    attributes:
      label: '💽​ Como reproduzir?'
      description: ''
      placeholder: 'Ex.: '
    validations:
      required: false
  - type: textarea
    id: contexto
    attributes:
      label: '🕵️​ Critério de aceite'
      description: ''
      placeholder: ''
    validations:
      required: false
