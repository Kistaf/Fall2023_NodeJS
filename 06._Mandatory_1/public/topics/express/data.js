export const subjects = [
  {
    title: "Express",
    description: `
      Express er et populært backend webframework som giver os mulighed for blandt andet
      at arbejde med HTTP protokollen og websockets. Express giver mulighed for 
      at lave de sædvanlige GET, POST, PATCH, PUT og DELETE requests.
      Express kommer med mange features som fx. middleware og third-party extensions og er generelt 
      et intuitivt og let framework at lære.
    `,
  },
  {
    title: "Starter template",
    description: `
        Template til en starter express applikation
    `,
    code: {
      snippet: `
        const express = require("express");
        //import express from express; (requires "type": "module" in package.json)
        const app = express();
        app.use(express.json());

        app.get("/", (req, res) => {
            res.send({ message: "Hello world" });
        });

        const PORT = 8080;
        app.listen(PORT, (error) => {
            if (error) {
                console.log("Failed to start server", error);
                return;
            }
            console.log("Server running on port:", PORT);
        });
        `,
      lang: "language-js",
    },
  },
  {
    title: "Route params",
    description: `
      En dynamisk express route består af request params. Disse kan fx. bruges til
      individuelle sider for en given resource. Vi tilgår params for en route ved at tilgå request params objektet. 
    `,
    code: {
      snippet: `
      app.get("/users/:id", (req, res) => {
        const id = req.params.id

        const { id } = req.params
      })
        `,
      lang: "language-js",
    },
    extra: [
      {
        subtitle: "Deconstructing",
        text: `
          Hvis antallet af route params tæller op til flere, så kan det oftest
          være fornuftigt at deconstructe request params objektet fremfor at tilgå parameterne enkeltvis.
        `,
      },
    ],
  },
  {
    title: "Route body",
    description: `
      En request body kan indeholde data, som fx. credentials til et login-system.
      Vi modtager dataen som JSON, hvor Express sørger for, at vi kan håndtere dataen som et objekt.
    `,
    code: {
      snippet: `
      app.post("/login", (req, res) => {
        const username = req.body.username
        const password = req.body.password

        const { username, password } = req.body
      })
        `,
      lang: "language-js",
    },
    extra: [
      {
        subtitle: "Deconstructing",
        text: `
          Hvis request bodien tæller adskillige keys, så kan det oftest
          være fornuftigt at deconstructe bodien fremfor at tilgå parameterne enkeltvis.
        `,
      },
    ],
  },
  {
    title: "Query params",
    description: `
      En Query Param er en parameter, som man kan tilknytte en URL.
      Man ser oftest query params brugt til filtrering af data eller
      til afgrænsning. En query param angives ved at tilføje et "?" efterfulgt
      af query parameter navnet og derefter værdien. Skal flere query params angives,
      separeres de af "&".
    `,
    code: {
      snippet: `
      app.get("/mountains/filter", (req, res) => { // "/mountains/filter?height=1000&location=Nepal
        const height = req.query.height
        const location = req.query.location

        const { height, location } = req.query
      })
        `,
      lang: "language-js",
    },
    extra: [
      {
        subtitle: "Deconstructing",
        text: `
          Hvis antallet af query parametre tæller op til flere, så kan det oftest
          være fornuftigt at deconstructe Query Param objektet fremfor at tilgå parameterne enkeltvis.
        `,
      },
    ],
  },
  {
    title: "GET Request",
    description: `
      En standard GET request ser således ud.
    `,
    code: {
      snippet: `
      app.get("/users", (req, res) => {
      })
        `,
      lang: "language-js",
    },
  },
  {
    title: "POST Request",
    description: `
      En standard POST request ser således ud.
    `,
    code: {
      snippet: `
      app.post("/users", (req, res) => {
      })
        `,
      lang: "language-js",
    },
  },
  {
    title: "PATCH Request",
    description: `
      En standard PATCH request ser således ud.
    `,
    code: {
      snippet: `
      app.patch("/users/:id", (req, res) => {
      })
        `,
      lang: "language-js",
    },
  },
  {
    title: "PUT Request",
    description: `
      En standard PUT request ser således ud.
    `,
    code: {
      snippet: `
      app.put("/users/:id", (req, res) => {
      })
        `,
      lang: "language-js",
    },
  },
  {
    title: "DELETE Request",
    description: `
      En standard DELETE request ser således ud.
    `,
    code: {
      snippet: `
      app.delete("/users/:id", (req, res) => {
      })
        `,
      lang: "language-js",
    },
  },
  {
    title: "HTML",
    description: `
      Hvis man påtœnker at bygge en applikation, som kan serve HTML-sider,
      så vil det vœre en god ide, at sœtte en folder-struktur for sin applikation.
      Derfor vil alle static-filer placeres i et public-directory.
      Herfra kan man sende filen som et response med en absolute path til filen.
    `,
    code: {
      snippet: `
        import path frm "path"

        app.get("/admin", (req, res) => {
          res.sendFile(path.resolve("./public/admin.html"));
        })
      `,
      lang: "language-js",
    },
  },
  {
    title: "Static files",
    description: `
      For at static filer som css og js kan tilgåes,
      skal man tilføje følgende middleware til sin app.js
    `,
    code: {
      snippet: `
        app.use(express.static("public"))
      `,
      lang: "language-js",
    },
  },
];
