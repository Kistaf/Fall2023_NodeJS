export const subjects = [
  {
    title: "String",
    description: `
        En string er en sekvens af karaktere indrammet i single quotes ('), double quotes (") eller backticks (\`).
    `,
    code: {
      snippet: `
        "Hello world"
        'Hello world'
        \`Hello world\`
        `,
      lang: "language-js",
    },
  },
  {
    title: "Number",
    description: `
        Number-datatypen inkluderer integers, floating-point tal og videnskabelige notation.
    `,
    code: {
      snippet: `
        1 // integer
        1.5 // floating-point number
        1e10 // scientific notation
        `,
      lang: "language-js",
    },
  },
  {
    title: "BigInt",
    description: `
        BigInt er et nummer som er for stort til at være repræsenteret af number-datatypen.
    `,
    code: {
      snippet: `
      const hugeNumber = BigInt(923839298023089109280)
        `,
      lang: "language-js",
    },
  },
  {
    title: "Boolean",
    description: `
        En boolsk værdi, som enten er sandt eller falsk.
        Vi anvender booleans som conditions i fx. if statements, filter-functions osv.
    `,
    code: {
      snippet: `
      const someValue = true
      const someOtherValue = false
        `,
      lang: "language-js",
    },
  },
  {
    title: "Undefined",
    description: `
        Undefined er enten en værdi som endnu ikke er tildelt til en variabel,
        eller en property som ikke eksisterer på et objekt.
    `,
    code: {
      snippet: `
      let x; // undefined

      const someObject = {
        hello: "world"
      }

      someObject.name // undefined
        `,
      lang: "language-js",
    },
  },
  {
    title: "Null",
    description: `
        En null-værdi indikerer en bevidst mangel af en værdi.
        Enten ved at en variabel bevidst er sat til null,
        eller hvis vi fx. forventer et objekt fra en API route, men der ikke er noget relevant objekt at returnere.
    `,
    code: {
      snippet: `
      let x = null
        `,
      lang: "language-js",
    },
  },
  {
    title: "Symbol",
    description: `
        Symbol er en unik værdi som bruges til at identificere en property eller et objekt.
        Man kan fx. bruge Symbol til at tilføje unikke keys til et objekt, sådan at der ikke kollideres
        med andet kode, som tilføjer til objektet.
    `,
    code: {
      snippet: `
      const someSymbol = Symbol("someSymbol")
        `,
      lang: "language-js",
    },
  },
  {
    title: "Object",
    description: `
        Et objekt er en samling af data og properties. Vi bruger ofte objekter til at 
        repræsentere virkelige entitier som brugere, produkter, ordrer osv.
        Et objekt består af keys og deres associeret data. Disse keys og værdier kan læses, ændres og slettes.
    `,
    code: {
      snippet: `
      const user = {
        name: "Some Name",
        age: 100,
      }
        `,
      lang: "language-js",
    },
  },
];
