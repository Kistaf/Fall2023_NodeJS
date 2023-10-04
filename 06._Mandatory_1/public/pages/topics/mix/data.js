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
    title: "Klient- servermodellen",
    description: `
      Klient-servermodellen omhandler kommunikationen mellem to enheder over
      internettet. Klienten sender en request til serveren, og serveren melder
      tilbage med et svar. Selve navnet kan vœre lidt misvisende, da man let kan tro,
      at dette fx. kun er tilfœldet for en frontend til en backend. Faktum er dog,
      at det ligeså godt kunne vœre en backend til en backend. Pointen med modellen er
      at tydeliggøre, at en part sender en request, og den anden part svarer på requesten.
    `,
  },
  {
    title: "Type coercion",
    description: `
      Type coercion handler om, at Javascript prøver at fortolke og konvertere
      vœrdier fra en datatype til en anden. Det kan ske af to processer. En implicit
      og en eksplicit proces. Den implicitte proces er den, som automatisk bliver foretaget
      af Javascript, hvis man prøver at lœgge et number til en string. Den eksplicitte
      er den process, som man manuelt kalder i form af String(), Number(), boolean() osv,
      hvis man fx. ønsker at konvertere en string til number.
    `,
    code: {
      snippet: `
        // implicit
        2 + "2" // "22"

        // explicit
        2 + Number("2") // 4
      `,
      lang: "language-js",
    },
  },
  {
    title: "Serverside rendering",
    description: `
      Ideen i serverside rendering er, at man gerne vil generere og rendere
      HTML-sider på serveren, sådan at den load bliver taget af klienten. Dette
      kan vœre med at at gøre brugeroplevelsen bedre for brugeren på klientsiden,
      da man bl.a. kan mindske loadtime ved SSR. Nogle andre goder ved serverside
      rendering (SSR) tœller også SEO optimization og adgang til server-side resourcer som 
      en databaseadgang osv. I og med, at det er en fuldt ud renderet HTML-side,
      som klienten modtager, så er det lettere at crawle og indeksere siden, og derved
      vil man opnå SEO optimization. Alt efter om siden er static eller dynamic,
      kan SSR også vœre med til at spare på resourcer, da man kan
      generere og rendere HTML-siden ved server start og derefter returnere
      den uden yderlige resourceforbrug, da den ikke vil skulle genereres og renderes igen.
    `,
  },
  {
    title: "Environment variables",
    description: `
      Environment variables (miljøvariabler) er variabler i key-value form. Det vil sige,
      at de består af en nøgle og dens tilsvarende vœrdi. De er smarte at anvende i en
      applikation, da de giver mulighed for at adskille vise sensitive eller 
      situationsbestemte informationer fra applikationen.
      Det kunne vœre API-Keys, database-informationer, porte osv. Man kan definere
      miljøvariabler på forskellige niveauer. Alt fra på selve systemet som en systemsmiljøvariabel,
      i filformat eller for en specifik proces. Man kan tilgå miljøvariabler igennem Javascript
      via process.env.
    `,
    code: {
      snippet: `
        PORT=8080 node app.js // specific process

        process.env.PORT // 8080
        process.env.KEY // undefined
      `,
      lang: "language-js",
    },
  },
];
