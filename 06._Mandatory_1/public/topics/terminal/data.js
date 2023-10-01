export const subjects = [
  {
    title: "mkdir",
    description: `
      mkdir opretter en ny mappe i dit nuværende directory eller angiven sti.
    `,
    code: {
      snippet: `
        mkdir hello_world
        mkdir app/hello_world
        `,
      lang: "language-bash",
    },
  },
  {
    title: "touch",
    description: `
      touch opretter en ny fil i dit nuværende directory eller angiven sti.
    `,
    code: {
      snippet: `
        touch hello_world.js
        touch app/hello_world.js
        `,
      lang: "language-bash",
    },
  },
  {
    title: "cd",
    description: `
      cd tillader en at navigere rundt til forskellige destinationer i ens terminal.
      Man kan forestille sig det som et stort trœ. Man starter fra roden og bevœger
      sig langsomt ude af grenene.
    `,
    code: {
      snippet: `
        cd ..        et step tilbage
        cd ../..     to steps tilbage
        cd app/      frem til en valgt destination
      `,
      lang: "language-bash",
    },
  },
  {
    title: "ls",
    description: `
      Lister alt indhold i det nuvœrende directory eller angivet directory.
    `,
    code: {
      snippet: `
        ls
        ls app/
      `,
      lang: "language-bash",
    },
  },
  {
    title: "ls -la",
    description: `
      Lister alt indhold i det nuvœrende directory eller angivet directory.
      Vise samtidig også hidden files samt permissions.
    `,
    code: {
      snippet: `
        ls -la
        ls -la app/
      `,
      lang: "language-bash",
    },
  },
  {
    title: "ls -le",
    description: `
      Lister alt indhold i det nuvœrende directory eller angivet directory.
      Viser permissions mens ikke hidden files.
    `,
    code: {
      snippet: `
        ls -le
        ls -le app/
      `,
      lang: "language-bash",
    },
  },
  {
    title: "rm -rf",
    description: `
      Sletter en angiven fil eller mappe. (INGEN WARNING)
    `,
    code: {
      snippet: `
        rm -rf app.js
        rm -rf app/
      `,
      lang: "language-bash",
    },
    extra: [
      {
        subtitle: "Flags",
        text: `
          Flaget -i kan bruges for at blive promptet bekrœftelse for hvert element, som skal slettes.
        `,
      },
    ],
  },
  {
    title: "pwd",
    description: `
      Lister stien for ens nuvœrende directory.
    `,
    code: {
      snippet: `
        pwd
      `,
      lang: "language-bash",
    },
  },
];
