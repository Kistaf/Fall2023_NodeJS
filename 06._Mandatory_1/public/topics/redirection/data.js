export const subjects = [
  {
    title: "Redirection",
    description: `
        Redirection er en god egenskab at kende til. Det kan være nyttigt i adskillige scenarier.
        Alt ligefra et successfuldt login for derved at skulle redirectes til en admin side,
        til navigering mellem forskellige sider uden om serveren.
    `,
  },
  {
    title: "Server",
    description: `
        Man kan let redirecte på serveren. Dog skal man huske at returnere et redirect og dermed lukke scopet,
        hvis det ikke sker som det sidste response i scopet. Dette kunne fx. være som følge af et if-statement.
        En header-fejl vil opstå, hvis man ikke gør dette, da headeren allerede vil være sendt, og der derfor
        ikke kan tilføjes mere data til den.
    `,
    code: {
      snippet: `
        app.get("/login", (req, res) => {
            // ... login logic
            if (forgotPassword) {
                return res.redirect("/forgotpassword")
            }
            res.redirect("/admin")
        })
    `,
      lang: "language-js",
    },
    extra: [
      {
        subtitle: "OBS",
        text: "Der kan kun redirectes fra serveren, hvis der er tale om en GET request.",
      },
    ],
  },
  {
    title: "Client - location",
    description: `
        Man kan redirecte via ren klientside javascript ved manuelt at sætte klientens href lokation.
    `,
    code: {
      snippet: `
        window.location.href = "/home"
        `,
      lang: "language-js",
    },
  },
  {
    title: "Client - a-tag",
    description: `
        Et simpelt redirect kan ske i form af et anchor-tag og en specificeret href lokation.
    `,
    code: {
      snippet: `
      &lt;a href="/login">Login page&lt;/a>
        `,
      lang: "language-html",
    },
  },
];
