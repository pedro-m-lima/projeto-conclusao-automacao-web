# Projeto Conclusão Automação Web

Projeto de testes de interface com Cypress e JavaScript para o [Automation Exercise](https://www.automationexercise.com). Implementa os casos 1, 2, 3, 4, 5, 8, 9, 10, 15 e 16 da página [Test Cases](https://www.automationexercise.com/test_cases).

## Requisitos

- Node.js 22, npm e Google Chrome.
- Acesso à internet para instalar as dependências e acessar o site.
- No Linux, as [dependências de sistema do Cypress](https://docs.cypress.io/app/get-started/install-cypress#Linux-Prerequisites).

## Instalação e execução

```bash
git clone https://github.com/pedro-m-lima/projeto-conclusao-automacao-web.git
cd projeto-conclusao-automacao-web
npm ci
npm test
```

O comando `npm test` executa todos os testes no Google Chrome em modo headless, sem abrir a janela do navegador.

Para abrir a interface do Cypress:

```bash
npm run cy:open
```

Selecione **E2E Testing**, escolha um navegador e abra o arquivo desejado.

Para executar um grupo específico:

```bash
npm run test:usuarios
npm run test:produtos
npm run test:pedidos
```

## Casos implementados

| Caso | Cenário | Arquivo |
| --- | --- | --- |
| 01 | Cadastro e exclusão de usuário | `usuarios.cy.js` |
| 02 | Login com dados corretos | `usuarios.cy.js` |
| 03 | Login com dados incorretos | `usuarios.cy.js` |
| 04 | Logout | `usuarios.cy.js` |
| 05 | Cadastro com e-mail existente | `usuarios.cy.js` |
| 08 | Lista e detalhes de produto | `produtos.cy.js` |
| 09 | Pesquisa de produtos | `produtos.cy.js` |
| 10 | Inscrição pela página inicial | `produtos.cy.js` |
| 15 | Cadastro antes da compra | `pedidos.cy.js` |
| 16 | Login antes da compra | `pedidos.cy.js` |

## Organização

- `cypress/e2e`: cenários de teste separados por funcionalidade.
- `cypress/fixtures/usuario.json`: dados fictícios usados nos cadastros.
- `cypress/support/commands.js`: comandos compartilhados de cadastro, login, exclusão e compra.
- `cypress/support/e2e.js`: configuração do relatório e bloqueio de requisições de anúncios.
- `cypress.config.js`: endereço do site, tempos de espera e relatório.
- `.github/workflows/testes.yml`: execução automática no GitHub Actions.

Os testes geram e-mails únicos e não dependem da ordem de execução. Nos cenários que exigem uma conta existente, a API do próprio site prepara o cadastro. As ações e verificações de cada cenário são realizadas pela interface. O `afterEach` remove as contas de teste, inclusive se uma verificação falhar. Os casos 01 e 15 fazem o cadastro pela interface.

Os seletores priorizam os atributos `data-qa`, IDs e textos visíveis. O Cypress aguarda os elementos e as verificações sem pausas fixas. Requisições de anúncios são bloqueadas para evitar sobreposição na página; as respostas da aplicação não são simuladas. Os testes não ignoram erros JavaScript e não possuem tentativas automáticas.

Nos pedidos são usados dados de pagamento fictícios no ambiente de demonstração. A confirmação verifica o título `Order Placed!` e a mensagem `Congratulations! Your order has been confirmed!` da página final do site.

## Relatórios

Depois da execução, abra `cypress/reports/index.html` no navegador. O relatório apresenta os cenários aprovados e reprovados, duração e capturas de tela em caso de falha. Os vídeos ficam em `cypress/videos` e as capturas de falha em `cypress/screenshots`.

## GitHub Actions

A execução acontece a cada push ou pull request para `main`. Também pode ser iniciada pela aba **Actions**, selecionando **Testes Cypress → Run workflow**.

Ao terminar, abra a execução e baixe o artefato **relatorio-cypress**. Ele contém o relatório HTML e os vídeos, além das capturas de tela quando houver falhas. Extraia o arquivo antes de abrir o relatório. Os artefatos ficam disponíveis por 14 dias, inclusive quando algum teste falha.

## Entrega

O projeto pode ser baixado em **Code → Download ZIP** no GitHub. O repositório não inclui `node_modules`, arquivos de ambiente ou relatórios gerados. Para executar o ZIP, extraia, abra um terminal na pasta e rode `npm ci` seguido de `npm test`.

Os testes acessam um site público externo. Mudanças na aplicação ou indisponibilidade da rede podem afetar uma execução.
