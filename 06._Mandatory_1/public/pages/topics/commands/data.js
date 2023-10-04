export const subjects = [
  {
    title: "npm install <package> | npm uninstall <package>",
    description: `
      Installer eller afinstaller en package.
    `,
    code: {
      snippet: `
        npm install &ltpackage>

        npm uninstall &ltpackage>
        `,
      lang: "language-bash",
    },
    extra: [
      {
        subtitle: "Version",
        text: "En specifik version kan indikeres ved at benytte @version efter package-navet.",
      },
      {
        subtitle: "Flags",
        text: "Man kan specificere flag ved installation. Dette kunne fx. vœre -g, -D osv.",
      },
    ],
  },
  {
    title: "npm init",
    description: `
      Initialiserer en ny package.json. En package.json er nœrmest hjertet af et NodeJS projekt.
      Filen indeholder alt fra metadata om projektet til script og dependencies.
      Metadata tœller informationer som projektnavn, version, beskrivelse, forfatter osv.
      Scripts er forudbestemte processer, som man kan køre, og de kan indeholde at, 
      som man selv kan skrive i terminalen. Typisk vil man fx. definere startup-scripts 
      for production og development, migration scripts til for ens database same test-scripts.
      Dependencies lister alle de packages, som man har installeret for projektet. En gren
      af dependencies er devDependencies, hvor man kan specificere dependencies, som kun
      vil vœre installeret i development og ikke i produktion.
    `,
    code: {
      snippet: `
        npm init

        {
          "name": "",
          "version": "",
          "description": "",
          "main": "",
          "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
          },
          "keywords": [],
          "author": "",
          "license": "",
          "dependencies": {}
        }
        `,
      lang: "language-json",
    },
    extra: [
      {
        subtitle: "Default",
        text: "Ved at benytte flagget '-y' udfyldes der med default værdier.",
      },
    ],
  },
  {
    title: "node <file>",
    description: `
      Kør den angiven fil. Man kan ligeledes tilknytte miljøvariabler til en applikation ved startup.
    `,
    code: {
      snippet: `
        node app.js
        
        PORT=8080 node app.js # with variables
      `,
      lang: "language-bash",
    },
    extra: [
      {
        subtitle: "Main file",
        text: "Hvis man er i samme directory som main file, vil man også kunne køre node .",
      },
    ],
  },
  {
    title: "node version",
    description: `
      Tjek hvilken version den nuvœrende NodeJS instans kører på.
    `,
    code: {
      snippet: `
        node --version
        node -v
      `,
    },
  },
  {
    title: "node",
    description: `
      Tilgå NodeJS' REPL miljø.
    `,
    code: {
      snippet: `
        node
      `,
      lang: "language-bash",
    },
  },
];
