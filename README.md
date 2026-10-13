# Posso comer?

App em português (pt-BR) para pessoas com estoma após ressecção intestinal. A pessoa pesquisa um alimento e vê se ele é **indicado**, **com cautela** ou **para evitar** no caso dela.

O conteúdo vem do doc "Plano Alimentar Semanal para Pessoa Estomizada (pós-ressecção intestinal) – São Paulo".

## Como usar

É um site estático, sem dependências nem etapa de build. Abra `index.html` no navegador ou sirva a pasta:

```sh
npx http-server . -p 8080
```

## Para quem é

Primeira versão feita para a **Geni** (73 anos). As premissas vêm do doc: adulta, já liberada pelo cirurgião para comer por via oral, sem alergias nem restrições extras. O app abre na **Fase 1** e, como ainda não se sabe se o estoma é ileostomia ou colostomia, na Fase 2 usa a regra mais cautelosa (ileostomia).

## O que o app considera

O que ela escolhe fica salvo no próprio navegador (nada é enviado a servidor):

- **Fase 1**: dieta pobre em resíduos, até 6 a 8 semanas após a cirurgia.
- **Fase 2**: reintrodução gradual de fibras, com liberação da equipe.
- **Tipo de estoma**: ileostomia, colostomia ou "ainda não sei".

Cada alimento mostra o veredito para ela, o motivo, os efeitos no estoma (firma, solta, gases, odor, risco de entupir…) e a classificação em cada fase. A letra é grande e os botões têm área de toque ampla.

## Arquivos

- `foods.js`: base de alimentos. Cada linha tem as três classificações (`Fase 1`, `Fase 2 colostomia`, `Fase 2 ileostomia`) na string `r`, como `"ECE"` (I = indicado, C = com cautela, E = evitar).
  - `pl(...)`: alimento que aparece no plano de origem.
  - `es(...)`: alimento que não aparece no plano; foi classificado pelos mesmos critérios e é marcado como estimado no app.
- `app.js`: busca (sem acento, com tolerância a erro de digitação), perfil e telas.
- `styles.css`, `index.html`: interface, com modo claro e escuro.

## Aviso

O app é informativo e não substitui o médico, o estomaterapeuta ou o nutricionista. A classificação dos alimentos que não constam no plano é uma estimativa e deve ser revisada por um profissional de saúde antes de ser divulgada.
