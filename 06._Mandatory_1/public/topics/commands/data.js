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
    ],
  },
  {
    title: "npm init",
    description: `
      Initialiser en ny package.json
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
      Kør den angiven fil.
    `,
    code: {
      snippet: `
        node hello_world.js
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
];
