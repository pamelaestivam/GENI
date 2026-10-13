# Posso comer?

App em português (pt-BR) para pessoas com estoma após ressecção intestinal. A pessoa pesquisa um alimento e vê se ele é **indicado**, **com cautela** ou **para evitar** no caso dela.

O conteúdo vem do doc "Plano Alimentar Semanal para Pessoa Estomizada (pós-ressecção intestinal) – São Paulo".

## Como usar

É um site estático, sem dependências nem etapa de build. Abra `index.html` no navegador ou sirva a pasta:

```sh
npx http-server . -p 8080
```

## O que o app considera

O perfil fica salvo no próprio navegador (nada é enviado a servidor):

- **Fase 1**: dieta pobre em resíduos, até 6 a 8 semanas após a cirurgia.
- **Fase 2**: reintrodução gradual de fibras, com liberação da equipe.
- **Tipo de estoma**: ileostomia ou colostomia. Se a pessoa não informar, na Fase 2 vale a regra mais cautelosa (ileostomia).
- **Intolerância à lactose** e **diabetes**: rebaixam a classificação de alimentos com lactose ou açúcar.

Cada alimento mostra o veredito para o perfil, o motivo, os efeitos no estoma (firma, solta, gases, odor, risco de entupir…) e a classificação em cada fase.

## Arquivos

- `foods.js`: base de alimentos. Cada linha tem as três classificações (`Fase 1`, `Fase 2 colostomia`, `Fase 2 ileostomia`) na string `r`, como `"ECE"` (I = indicado, C = com cautela, E = evitar).
  - `pl(...)`: alimento que aparece no plano de origem.
  - `es(...)`: alimento que não aparece no plano; foi classificado pelos mesmos critérios e é marcado como estimado no app.
- `app.js`: busca (sem acento, com tolerância a erro de digitação), perfil e telas.
- `styles.css`, `index.html`: interface, com modo claro e escuro.

## Aviso

O app é informativo e não substitui o médico, o estomaterapeuta ou o nutricionista. A classificação dos alimentos que não constam no plano é uma estimativa e deve ser revisada por um profissional de saúde antes de ser divulgada.
