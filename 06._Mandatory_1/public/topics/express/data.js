export const subjects = [
  {
    title: "Starter template",
    description: `
        Template til en starter express applikation
    `,
    code: {
      snippet: `
        import express from express;
        const app = express();
        const PORT = 8080

        app.get("/", (req, res) => {
            res.send({ message: "Hello world" });
        });

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
];
