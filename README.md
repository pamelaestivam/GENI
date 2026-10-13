# O que a Geni pode comer?

App em português (pt-BR) para pessoas com estoma após ressecção intestinal. A pessoa pesquisa um alimento e vê se ele é **indicado**, **com cautela** ou **para evitar** no caso dela.

O conteúdo vem do doc "Plano Alimentar Semanal para Pessoa Estomizada (pós-ressecção intestinal) – São Paulo".

## Como usar

É um site estático, sem dependências nem etapa de build. Abra `index.html` no navegador ou sirva a pasta:

```sh
npx http-server . -p 8080
```

## Para quem é

Primeira versão feita para a **Geni** (73 anos), com **colostomia**. As premissas vêm do doc: adulta, já liberada pelo cirurgião para comer por via oral, sem alergias nem restrições extras. O app abre na **Fase 1**; ela muda para a Fase 2 quando a equipe liberar. A escolha fica salva no próprio navegador (nada é enviado a servidor).

- **Fase 1**: dieta pobre em resíduos, até 6 a 8 semanas após a cirurgia.
- **Fase 2**: reintrodução gradual de fibras, com liberação da equipe.

Cada alimento mostra o veredito para ela, o motivo, os efeitos no estoma (firma, solta, gases, odor, risco de entupir…) e a classificação nas duas fases. A letra é grande e os botões têm área de toque ampla.

Os alimentos que **não estão no plano** aparecem como **sugestão** e não foram revisados por profissional de saúde.

## Instalar no celular

Com o app publicado num endereço `https`, no celular abra o endereço e use "Adicionar à tela inicial" (Android: menu do Chrome; iPhone: botão de compartilhar do Safari). Depois da primeira visita ele funciona sem internet.

## Arquivos

- `foods.js`: base de alimentos. Cada linha tem as classificações na string `r`, como `"EC"` (1º caractere = Fase 1, 2º = Fase 2; I = indicado, C = com cautela, E = evitar).
  - `pl(...)`: alimento que aparece no plano de origem.
  - `es(...)`: alimento que não aparece no plano; é uma sugestão pelos mesmos critérios.
- `app.js`: busca (sem acento, com tolerância a erro de digitação), fase e telas.
- `styles.css`, `index.html`: interface, com modo claro e escuro.
- `manifest.webmanifest`, `sw.js`, `icons/`: instalação no celular e modo offline. Ao mudar arquivos do app, troque o número em `CACHE` no `sw.js`.

## Aviso

O app é informativo e não substitui o médico, o estomaterapeuta ou o nutricionista. A classificação dos alimentos que não constam no plano é apenas uma sugestão e não foi revisada por profissional de saúde.
