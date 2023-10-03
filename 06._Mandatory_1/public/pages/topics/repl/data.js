export const subjects = [
  {
    title: "REPL",
    description: `
        REPL (Read-Eval-Print-Loop) er et simpelt interaktivt miljø, som tillader
        en at eksekvere enkeltvise stykker kode i et givent programmeringssprog
        uden videre forudgående opsœtning påkrœvet. En REPL' cyklus er bygget op således:
        Den lœser ens input, evaluerer dette og til sidst printer resultatet. Denne cyklus loopes
        indtil man forlader miljøet.
    `,
  },
  {
    title: "Hvordan tilgår man en REPL",
    description: `
        Alt efter sprog er det forskelligt, hvordan en REPL åbnes - fœlles for dem
        alle er dog, at det sker igennem terminalen som standard. For NodeJS er det tilfœldet,
        at man skal skrive følgende i ens terminal for at åbne NodeJS' REPL.
    `,
    code: {
      snippet: `
            node
        `,
      lang: "language-bash",
    },
  },
  {
    title: "Hvordan forlader man en REPL",
    description: `
        Den typiske måde at forlade en REPL i en terminal er ved følgende shortcut.
    `,
    code: {
      snippet: `
            CTRL + c (x2)
        `,
      lang: "language-bash",
    },
  },
];
