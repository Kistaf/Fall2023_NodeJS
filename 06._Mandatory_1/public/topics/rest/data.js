export const subjects = [
  {
    title: "REST",
    description: `
        REST (Representational State Transfer) er et sœt af principper som bruges
        i forbindelse med design af web services. Ved at have en fast skabelon
        er det lettere for forskellige systemer at kommunikere med hinanden over internettet.
        Et af hovedprincipperne i REST er, at alt er en resource. Det kan vœre alt fra
        en user, produkt, bjerg, dyr osv. Derfor er interaktionen med en REST applikation
        også en interaktion med resourcer. Resourcer vil altid vœre angivet i flertal,
        og arbejde sig ned i ental alt efter, hvordan man tilgår en resourcesamling.
        REST bygger oven på HTTP's metoder. Alt efter hvordan man vil interagere med en resource i form af endpoints,
        vil man skulle bruge forskellige HTTP metoder. Når man designer en REST applikation,
        skal resource-endpoints gerne følge en bestemt rœkkefølge, da det gør det lettere at forstå,
        hvor henne i designet man er. Strukturen er som følgende prœsenteret.
    `,
  },
  {
    title: "GET 1",
    description: `
        En GET returnerer en hel resourcesamling, hvis andet ikke er specificeret.
    `,
    code: {
      snippet: `
        /users   |   returnerer hele users resourcen
        `,
      lang: "language-txt",
    },
  },
  {
    title: "GET 2",
    description: `
        En GET kan også returnere en delvis resourcesamling, hvis man fx. gerne
        kun vil returnere et enkelt resource-entry. Måden hvorpå man angiver,
        at det er en specifik del af resourcen, som bliver returneret, er underordnet.
        Det vigtigste er, at man er konsistent i igennem hele sit REST design.
    `,
    code: {
      snippet: `
        /users/:id   |   returnerer en enkelt user.
        `,
      lang: "language-txt",
    },
  },
  {
    title: "POST",
    description: `
        POST følger efter GET.
    `,
    code: {
      snippet: `
        /users   |   opretter et nyt resource-entry.
        `,
      lang: "language-txt",
    },
  },
  {
    title: "PATCH",
    description: `
        PATCH følger efter POST. Per REST definition skal PATCH altid
        ramme et specifikt resource-entry. Dette skal derfor vœre angivet i URL'et.
        Måden hvorpå man angiver, at det er et specifik resource-entry, er underordnet.
        Det vigtigste er, at man er konsistent i igennem hele sit REST design.
        Resource-identifier må stadig godt vœre vedlagt i en request body, men det er et krav,
        at det er angivet i URL'et.
    `,
    code: {
      snippet: `
        /users/:id   |   opdaterer en specifik resource.
        `,
      lang: "language-txt",
    },
  },
  {
    title: "PUT",
    description: `
        PUT følger efter POST ligesom PATCH. Per REST definition skal PUT altid
        ramme et specifikt resource-entry. Dette skal derfor vœre angivet i URL'et.
        Måden hvorpå man angiver, at det er et specifik resource-entry, er underordnet.
        Det vigtigste er, at man er konsistent i igennem hele sit REST design.
        Resource-identifier må stadig godt vœre vedlagt i en request body, men det er et krav,
        at det er angivet i URL'et.
    `,
    code: {
      snippet: `
        /users/:id   |   opdaterer en specifik resource
        `,
      lang: "language-txt",
    },
  },
  {
    title: "DELETE",
    description: `
        DELETE følger efter PATCH og PUT. Per REST definition skal DELETE altid
        ramme et specifikt resource-entry. Dette skal derfor vœre angivet i URL'et.
        Måden hvorpå man angiver, at det er et specifik resource-entry, er underordnet.
        Det vigtigste er, at man er konsistent i igennem hele sit REST design.

    `,
    code: {
      snippet: `
        /users/:id   |   sletter et specifikt resource-entry.
        `,
      lang: "language-txt",
    },
  },
];
