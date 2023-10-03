export const subjects = [
  {
    title: "Array.prototype.map()",
    description: `
        Map-metoden returnerer et nyt array med resultaterne fra den angiven callback-funktion.
        Ved at bruge map undgår at skulle oprette ekstra variabler samt dumme fejl som Index Out of Bounds.
    `,
    code: {
      snippet: `
        const someArr = [1,2,3]
        const someNewArr = someArr.map((num, i) => num * i)
        console.log(someNewArr) // [0, 2, 6]
        `,
      lang: "language-js",
    },
    extra: [
      {
        subtitle: "Index",
        text: `
            Vi kan tilgå det itererede element, men samtidig også dets indeks, uden vi skal oprette en separat variabel
            til at holde styr på dette.
        `,
      },
    ],
  },
  {
    title: "Array.prototype.filter()",
    description: `
        Filter-metoden returnerer et nyt array med resultaterne fra den angiven condition callback-funktion.
    `,
    code: {
      snippet: `
        const someArr = [1,2,3]
        const someNewArr = someArr.filter((num) => num % 2 === 0)
        console.log(someNewArr) // [2]
        `,
      lang: "language-js",
    },
    extra: [
      {
        subtitle: "Index",
        text: `
            Vi kan tilgå det itererede element, men samtidig også dets indeks, uden vi skal oprette en separat variabel
            til at holde styr på dette.
        `,
      },
    ],
  },
  {
    title: "Array.prototype.reduce()",
    description: `
        Reduce-funktionens formål er, at reducere et array ned til en enkelt værdi.
        Dette sker ved, at en reducer-funktion kaldes for hvert element, en efter en,
        hvor resultaterne akkumuleres til en enkelt værdi som tilsidst returneres.
    `,
    code: {
      snippet: `
        const someArr = [1,2,3,4,5]
        const sum = someArr.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
        console.log(sum) // [15]
        `,
      lang: "language-js",
    },
    extra: [
      {
        subtitle: "Index",
        text: `
            Vi kan også tilgå indekset for det itererede element.
        `,
      },
      {
        subtitle: "Initial value",
        text: "Vi kan angive en initial value - i dette tilfælde er denne 0.",
      },
    ],
  },
  {
    title: "Array.prototype.forEach()",
    description: `
        Der itereres over hvert element, hvorpå en callback-funktion kaldes.
        Modsat map, filter og reduce, så returneres der ikke noget fra en forEach-funktion. 
        forEach-funktionens funktionalitet er derfor lig et normalt for loop. Modsat et normalt for loop
        skal vi ikke være bekymret for dumme fejl som Index Out of Bonds eller hvorvidt of/in skal bruges i en normal forEach.
    `,
    code: {
      snippet: `
        const someArr = [1,2,3]
        someArr.forEach((num, i) => console.log(num * i))

        // console output
        // 0
        // 2
        // 6
        `,
      lang: "language-js",
    },
    extra: [
      {
        subtitle: "Index",
        text: `
            Vi kan tilgå det itererede element, men samtidig også dets indeks, uden vi skal oprette en separat variabel
            til at holde styr på dette.
        `,
      },
    ],
  },
];
