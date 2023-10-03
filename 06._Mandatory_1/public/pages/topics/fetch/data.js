export const subjects = [
  {
    title: "fetch",
    description: `
        Fetch giver mulighed for at interagere med andre services over
        HTTP protokollen. Det giver mulighed for at lave de sædvanlige HTTP requests som GET, POST,
        PATCH, PUT og DELETE. Fetch kommer med mange forskellige indstillinger - alt fra
        vedlæggelse af en request body, cookie parsing gennem credential samt content-type i headers.
    `,
  },
  {
    title: "fetch - uden async/await",
    description: `
        Hvis det underlæggende system ikke tillader async/await, kan man
        i stedet håndtere en fetch request ved at chaine / parse resultater videre i form
        af .then. Det er først i nyere Javascript versioner, at det er blevet muligt at bruge
        async/await, og derfor har dette været den valgte tilgang til fetch.
    `,
    code: {
      snippet: `
        fetch("someURL")
            .then((response) => response.json())
            .then((result) => console.log(result))
      `,
      lang: "language-js",
    },
  },
  {
    title: "fetch - med async/await",
    description: `
        Med ES8 blev async/await introduceret. I den forbindelse blev det nu muligt 
        at angive funktioner som async, hvortil await nu kunne bruges. Dermed blev
        det nu muligt at awaite fetch-kald og derved vente på promiset til at blive resolved
        i stedet for at skulle følge den daværende tilgang med at chaine .then.
    `,
    code: {
      snippet: `
        async function foo() {
            const response = await fetch("someURL")
            const result = await response.json()
            console.log(result)
        }
      `,
      lang: "language-js",
    },
  },
  {
    title: "Hvilken en er bedst?",
    description: `
        I sidste ende er det ligegyldigt hvilken en af tilgangene, man anvender.
        De udfører præcis den samme opgave. Der kan dog argumenteres for,
        at async/await-metoden er mere clean code, da man slipper for at skulle
        tyde adskillige .then.
    `,
  },
  {
    title: "fetch - GET",
    description: `
        GET requests er default for fetch - derfor er det ikke nødvendigt at angive
        metode-typen som en option. Dermed ikke sagt, at man ikke sagtens kan gøre dette.
    `,
    code: {
      snippet: `
        fetch("someURL")
      `,
      lang: "language-js",
    },
  },
  {
    title: "fetch - POST",
    description: `
        Hvis man vil lave en post request, er det nødvendigt at angive metode-typen.
        Dette gøres som en option key i fetch' andet parameter argument.
        Ligeledes, hvis man gerne vil sende en request body med, kan man gøre det her.
        Her skal man være opmærksom på, hvilken content-type fetch-kaldet er sat til i headeren,
        og dermed også hvilken type request bodien skal være af.
    `,
    code: {
      snippet: `
        fetch("someURL", {
            method: "POST",
            body: JSON.stringify({ foo: "bar" }),
            headers: {
                "content-type": "application/json"
            }
        })
      `,
      lang: "language-js",
    },
  },
  {
    title: "fetch - PATCH",
    description: `
        Følger samme princip som POST.
    `,
  },
  {
    title: "fetch - PUT",
    description: `
        Følger samme princip som POST.
    `,
  },
  {
    title: "fetch - DELETE",
    description: `
        Følger samme princip som POST.
    `,
  },
];
