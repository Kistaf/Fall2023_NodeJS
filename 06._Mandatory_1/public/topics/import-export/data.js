export const subjects = [
  {
    title: "Import & Export",
    description: `
    Traditionelt set, så har man eksporteret med module.exports i NodeJS og importeret med require.
    I frontend sœtter man ofte Javascript til at bruge module-type i stedet,
    og man kan derved eksportere enkeltvise funktioner og ligeledes bruge den mere almindelige “import”-syntaks.
    Ved begge dele kan man deconstructe hvad man importerer,
    så man kan vælge kun at importere enkeltvise funktioner / variabler fra et modul,
    og derved undgå unødvendig memory-allocation.
    Da der netop er forskel på, hvordan der traditionelt importeres / eksporteres i NodeJS, og hvordan man gør det i frontend,
    så er det også svært at dele en javascript-fil mellem de to.
    Det kunne være noget som en validation-funktion, hvor man vil være nødsaget til at have samme fil i to forskellige formater.
    Derfor vil man aller helst bruge import / export for både backend og frontend.
    For at dette kan lade sig gøre tilføjes keyen og vœrdien "type": "module" til package.json.
    Dermed kan der nu også bruges import & export i NodeJS, og man vil da kunne bruge det samme
    format igennem både frontend og backend og ligeledes dele vigtige funktioner og variabler.
    `,
    code: {
      snippet: `
        {
            ... package.json
            "type": "module",
        }
        `,
      lang: "language-json",
    },
  },
  {
    title: "Traditionelt import & export",
    description: `
        Traditionelt har man importert ved at bruge require og eksporteret ved at
        bruge module.exports. Exports sker som en samlet export, og man kan derfor
        ikke eksportere funktioner og variabler enkeltvis.
    `,
    code: {
      snippet: `
        // app.js
        const { randomUUID } = require("./utils")

        // eller
        const utils = require("./utils")
        utils.randomUUID()

        ---

        // utils.js
        function randomUUID() {
            return "hello world"
        }

        module.exports = {
            randomUUID
        }
        `,
      lang: "language-js",
    },
  },
  {
    title: "Moderne import & export",
    description: `
        I moderne Javascript kan man importere og eksportere ved at bruge
        import og export. Ved export kan man eksportere enkeltvise funktioner og variabler
        uden, at det skal ske på en samlet omgang, men man kan også gøre det samlet, eller
        sœtte en default export for filen.
    `,
    code: {
      snippet: `
        // app.js
        import { randomUUID } from "./utils"

        // eller
        import utils from "./utils"
        utils.randomUUID()

        ---

        // utils.js
        export function randomUUID() {
            return "hello world"
        }

        // eller
        export default {
            randomUUID
        }
        `,
      lang: "language-js",
    },
  },
];
