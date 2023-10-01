export const subjects = [
  {
    title: "Semantic versioning",
    description: `
      Semantic versioning er et versionssystem som integrerer betydningen af
      en version ind i selve versionsnummeret. Derved er det let at gennemskue
      betydningen af en version og hvorvidt det er nødvendigt og sikkert at opdatere.
      Semantic versioning er splittet op i 3 dele. Major version, minor version og patch version.
    `,
    code: {
      snippet: `
        {
            "version": "1.0.0" first majoor stable release
            "version": "1.0.1" patch release fixing bug(s) in version 1.0.0
            "version": "1.1.0" minor release that adds a new feature
            "version": "2.0.0" major release that introduces breaking changes
        }
        `,
      lang: "language-json",
    },
  },
  {
    title: "Clean Code",
    description: `
      Clean Code er let at lœse, forstå og vedligeholde. Koden er organiseret
      og den er en konsistent på tvœrs af applikationen. Derved opnår man en
      kodebase, som er let at arbejde med, og som er effektiv. Clean Code indebœrer
      mange principer og karaktaristika, men nogle af de vigtigste heraf at tage til sig er:
      readability, maintainability, testability, extensibility. Disse kan man
      blandt andet opnå ved at bruge meningsfulde og tydelige funktions- og variabelnavne,
      vœre konsistent i formatering, undgå unødvendig kompleksitet samt sikre sig,
      at kode er modulœrt og derved lettere at vedligeholde.
    `,
    code: {
      snippet: `
        // example of non clean code
        function someFunc(x,y){
          return x + y
        }

        // example of clean code
        function sum(firstNumber, secondNumber) {
          if (typeof firstNumber !== 'number' || typeof secondNumber !== 'number') {
            throw new Error('Input is invalid');
          }

          return a + b;
        }

      `,
      lang: "language-js",
    },
  },
  {
    title: "Vercel",
    description: `
      En Express applikation kan let hostes på Vercel ved at oprette en vercel.json
      fil i roden af projektet med følgende indhold.
    `,
    code: {
      snippet: `
        {
          "version": 2,
          "builds": [
              {
                  "src": "app.js", (main file)
                  "use": "@vercel/node"
              }
          ],
          "routes": [
              {
                  "src": "/(.*)",
                  "dest": "app.js" (main file)
              }
          ]
        }
      `,
      lang: "language-json",
    },
  },
  {
    title: "Nodemon",
    description: `
      Nodemon er en nyttig package at bruge, da den sørger for,
      at ens NodeJS applikation genstarter hver gang en fil opdateres.
    `,
    code: {
      snippet: `
        nodemon &lt;file>
        nodemon .         Kører main file, hvis man er i samme directory.
      `,
      lang: "language-bash",
    },
  },
  {
    title: "Gitignore",
    description: `
      Gitignore eller (.gitignore) er en fil, som man kan tilføje til sit projekt.
      Filen sørger for, at angivne directories og filer ikke bliver tilføjet til commits
      og derved ikke bliver lagt op på fx. Github.
    `,
    code: {
      snippet: `
        node_modules/
        .env
      `,
      lang: "language-text",
    },
  },
  {
    title: "Client server model",
    description: `
      Client server model
    `,
  },
  {
    title: "Type coercion",
    description: `
      Type coercion
    `,
  },
];
