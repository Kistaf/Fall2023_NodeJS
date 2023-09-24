export const subjects = [
  {
    title: "Standard Function",
    description: `
      Dette er standard-metoden at skrive en funktion på, og nok også den,
      som de fleste kan nikke ja til at genkende.
    `,
    code: {
      snippet: `
        function foo() {
          return "bar"
        }
      `,
      lang: "language-js",
    },
    extra: [
      {
        subtitle: "Hoisting",
        text: "Hoisting gælder for standard funktioner. Derfor er det underordnet om funktionen er deklareret forinden i filen før den bliver kaldt.",
      },
    ],
  },
  {
    title: "Anonymous function",
    description: `
      Anonymous functions er funktioner, som ikke er associaseret med et
      navn.
    `,
    code: {
      snippet: `
        const foo = function() {
          return "bar"
        }
      `,
      lang: "language-js",
    },
    extra: [
      {
        subtitle: "Hoisting",
        text: "Hoisting gælder ikke for anonymous functions. Derfor skal de enten være importeret eller deklareret forinden i filen før de bliver kaldt.",
      },
    ],
  },
  {
    title: "Arrow function",
    description: `
      Arrow functions bliver mere og mere almindelige at bruge. De er smarte
      til one-liners og er et trait fra functional programming. Derfor
      bruges de også i indbygget funktioner på objekter. Disse funktioner
      tæller map, filter, reduce, forEach, any etc.
    `,
    code: {
      snippet: `
        const foo = () => {
          return "bar"
        }
      `,
      lang: "language-js",
    },
    extra: [
      {
        subtitle: "Hoisting",
        text: "Hoisting gælder ikke for arrow functions. Derfor skal de enten være importeret eller deklareret forinden i filen før de bliver kaldt.",
      },
    ],
  },
  {
    title: "Callbacks",
    description: `
      Callbacks er nyttige, da vi kan parse funktioner videre til andre
      funktioner således, at callback-funktionen fx kan blive kørt ved
      bestemte parametre eller med forskellige værdier.
    `,
    code: {
      snippet: `
        const genericGenerator = (generator, num) => {
          return generator(num)
        }

        const foobarGenerator = (num) => {
          if (num > 10) {
            return "foo"
          } else {
            return "bar"
          }
        }

        genericGenerator(foobarGenerator, 11)
      `,
      lang: "language-js",
    },
  },
];
