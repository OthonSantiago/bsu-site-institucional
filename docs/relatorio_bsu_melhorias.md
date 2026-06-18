# Relatório preliminar — Melhorias de Segurança, Design e Hospedagem

**Site avaliado:** https://bandasinfonicaunicamp.pythonanywhere.com/  
**Escopo:** análise externa do conteúdo público navegável. Não houve acesso ao código-fonte, banco de dados, painel administrativo, logs, servidor ou configuração de headers. Portanto, isto **não substitui pentest** nem revisão de código.

---

## 1. Diagnóstico resumido

O site já possui uma boa estrutura institucional, com páginas de Início, Sobre, Músicos, Agenda, Galeria, Notícias, Imprensa, Patrocínio, Booking e Contato. A proposta é correta para uma banda sinfônica universitária: apresentação institucional, agenda, corpo artístico, imprensa, patrocínio e contato.

O principal problema é que a experiência ainda parece uma primeira versão funcional, não um portal cultural consolidado. Há páginas vazias, inconsistências de conteúdo, links de evento com erro e alguns textos/nomes com erros de digitação. Para uso público e institucional, isso reduz percepção de autoridade.

---

## 2. Pontos positivos atuais

- Navegação principal bem definida.
- Estrutura de páginas adequada para banda/orquestra.
- Conteúdo institucional já cobre história, missão, regente, corpo artístico e agenda.
- Existe intenção de EPK, patrocínio e booking, o que é positivo para captação e relacionamento profissional.
- O site já usa HTTPS pelo domínio atual.

---

## 3. Problemas e melhorias prioritárias

| Prioridade | Item | Problema | Recomendação |
|---|---|---|---|
| Alta | Agenda | Home e agenda precisam estar sincronizadas. | Destacar na home o próximo concerto real. |
| Alta | Links de evento | Alguns cards/detalhes podem retornar erro. | Corrigir rotas ou remover links até a página existir. |
| Alta | Galeria | Página sem conteúdo reduz percepção institucional. | Criar ao menos um álbum com fotos de concerto, ensaio e bastidores. |
| Alta | Notícias | Página vazia ou pouco usada gera sensação de abandono. | Publicar releases ou esconder temporariamente do menu. |
| Média | Músicos | Lista longa, pouco escaneável. | Criar filtros por naipe, instrumento e função. |
| Média | Textos | Existem pontos de revisão editorial. | Revisar nomes, instrumentos e textos antes da publicação. |
| Média | Imprensa | EPK precisa ficar pronto para uso externo. | Disponibilizar release curto, release completo, fotos, logo e rider técnico. |

---

## 4. Melhorias de design propostas

### Direção visual

Criar uma identidade mais premium e cultural:

- Paleta: azul-marinho institucional, dourado, off-white e cinza suave.
- Tipografia: títulos com fonte serifada elegante; textos com fonte sans-serif moderna.
- Hero visual grande com foto de concerto, maestro ou banda.
- Cards de agenda com data grande e CTA claro.
- Página de músicos em cards com filtros por naipe.
- EPK com aparência profissional para imprensa, produtores e patrocinadores.
- Rodapé com navegação, contatos e canais oficiais.

### Nova estrutura sugerida

1. **Início**
   - Hero institucional
   - Próximo concerto
   - Sobre resumido
   - Destaques da temporada
   - Chamada para imprensa/patrocínio

2. **Agenda**
   - Próximos concertos
   - Histórico de apresentações
   - Programa, local e regência

3. **Sobre**
   - História
   - Missão institucional
   - Regente
   - Relação com Unicamp e Campinas

4. **Músicos**
   - Filtro por naipe
   - Cards de músicos
   - Bolsistas, convidados e equipe

5. **Imprensa / EPK**
   - Release curto
   - Release completo
   - Fotos oficiais
   - Logos
   - Rider técnico
   - Clipping

6. **Patrocínio**
   - Proposta de apoio cultural
   - Impacto institucional
   - Contrapartidas
   - Contato comercial

7. **Contato / Booking**
   - Formulário externo ou e-mail institucional
   - Dados de contato
   - Redes sociais

---

## 5. Melhorias de segurança

### 5.1 Recomendação principal

Se o site for apenas institucional, a recomendação é migrar para uma arquitetura **estática** via GitHub Pages.

Isso reduz a superfície de ataque porque remove:

- Backend exposto sem necessidade.
- Banco de dados público.
- Painel administrativo web.
- Sessões de usuário.
- Dependências server-side.
- Risco de falhas comuns em formulários dinâmicos mal protegidos.

### 5.2 Pontos de atenção se continuar dinâmico

Caso o site continue em PythonAnywhere, Django, Flask ou similar, revisar:

- Headers de segurança: CSP, X-Frame-Options, Referrer-Policy, X-Content-Type-Options e Permissions-Policy.
- CSRF em formulários.
- Rate limit em contato, booking e newsletter.
- Proteção anti-spam.
- Sanitização de entradas.
- Proteção de painel administrativo.
- Atualização de dependências.
- Logs e monitoramento básico.
- Backup e rollback.

### 5.3 Formulários no GitHub Pages

GitHub Pages não executa backend próprio. Portanto, formulários devem usar:

- E-mail institucional via `mailto:` para MVP.
- Google Forms ou Microsoft Forms.
- Formspree, Basin, Netlify Forms ou serviço similar.
- Backend separado somente se houver necessidade real.

---

## 6. Proposta de migração para GitHub Pages

### Estrutura inicial recomendada

```txt
bsu-site-institucional/
├── index.html
├── README.md
├── docs/
│   └── relatorio_bsu_melhorias.md
└── assets/
    ├── css/
    ├── img/
    └── js/
```

### Fase 1 — Publicação rápida

- Subir `index.html` estático na raiz.
- Ativar GitHub Pages pela branch `main`.
- Usar a URL pública do GitHub Pages como preview.
- Validar com a equipe.

### Fase 2 — Organização técnica

- Separar CSS em `assets/css/style.css`.
- Separar imagens em `assets/img/`.
- Criar páginas internas.
- Padronizar componentes visuais.

### Fase 3 — Conteúdo real

- Substituir placeholders por fotos reais.
- Revisar agenda.
- Validar nomes dos músicos e instrumentos.
- Criar releases de imprensa.
- Criar página de patrocínio.

### Fase 4 — Profissionalização

- Configurar domínio personalizado.
- Melhorar SEO.
- Adicionar Open Graph para compartilhamento.
- Criar sitemap.
- Validar acessibilidade.
- Criar processo de publicação.

---

## 7. Roadmap de issues sugeridas

### Fase 1 — Correções rápidas

- Corrigir links quebrados / páginas 404.
- Corrigir erros de digitação nos nomes dos instrumentos.
- Alinhar agenda da home com a página de agenda.
- Remover ou ocultar páginas vazias temporariamente.

### Fase 2 — Redesign visual

- Definir paleta institucional.
- Criar hero mais forte.
- Melhorar cards de agenda.
- Criar seção de impacto institucional.
- Melhorar rodapé e CTAs.

### Fase 3 — Segurança e publicação

- Migrar para site estático.
- Remover dependências de backend desnecessárias.
- Revisar formulários externos.
- Configurar GitHub Pages.
- Configurar HTTPS/domínio.

### Fase 4 — Conteúdo

- Criar página de músicos por naipe.
- Criar página de imprensa / EPK.
- Criar página de patrocínio.
- Criar galeria.
- Criar modelo de notícia.

---

## 8. Conclusão

A melhor estratégia é transformar o site em uma presença institucional estática, segura e de fácil manutenção. O GitHub Pages atende bem ao cenário de preview e pode virar o ambiente oficial se o site permanecer apenas informativo.

A maior prioridade agora é validar a direção visual, corrigir inconsistências de conteúdo e publicar o preview para aprovação da equipe.
