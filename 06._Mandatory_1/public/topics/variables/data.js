export const subjects = [
  {
    title: "var",
    description: `
      var er den originale måde at lave en variabel på. Det er stadig muligt at bruge
      var, men det er ikke anbefaldet, og man bør kun bruger var såfremt det er nødvendigt
      for en given situation. var kan føre til unødvendige problemer, da det er, hvad man kalder "function scoped".
      Det vil sige, at en var variabel kan tilgåes overalt i en funktion, hvor den er deklareret, også selvom
      at den er deklareret i en block. En var variabel kan reassignes, hvilket vil sige, at dens reference kan 
      ændres senere hen.
    `,
    code: {
      snippet: `
        var hello = "world"

        // bad practice
        function foo() {
          var bar = true
          if (someCondition) {
            var bar = false
          }
          console.log(bar) // false
        }
        `,
      lang: "language-js",
    },
  },
  {
    title: "let",
    description: `
      Modsat var er let block-scoped. let kan derfor kun tilgåes i den block,
      som den er deklareret i. Derved er det mere forudsigeligt at arbejde med let.
      En let variabel kan ligesom en var variabel reassignes, og vi kan derfor godt
      ændre referencen som variablen peger på.
      Det er derfor anbefaldet altid at bruge en let variebel over en var variabel, hvis man kræver mulighed for 
      reassignment.
    `,
    code: {
      snippet: `
        let someArr = ["foo"]

        // reassignment
        someArr = ["foo", "bar"] // ok

        // okay, unlike var
        function foo() {
          let bar = true
          if (someCondition) {
            let bar = false
          }
          console.log(bar) // true
        }
        `,
      lang: "language-js",
    },
  },
  {
    title: "const",
    description: `
      Selvom man nok ville tro det, så er værdien af en const variabel ikke "konstant".
      Det er dog gældende, at vi ikke kan redefinere referencen, som variablen peger på.
      Vi sagtens pushe til et const array, men vi kan ikke ændre hvilket array variablen peger på.
      Ligesom let er const block-scopet, og det er derfor forudsigeligt at arbejde.
    `,
    code: {
      snippet: `
        const someArr = []

        someArr.push("foobar") // ok

        // reassignment
        someArr = ["foo", "bar"] // not ok
        `,
      lang: "language-js",
    },
  },
];
