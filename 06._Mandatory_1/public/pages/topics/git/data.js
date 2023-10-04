export const subjects = [
  {
    title: "Git",
    description: `
        Git er et versionsstyringssystem, som giver muligheden for at arbejde
        på et projekt påtvœrs af computere og systemer. Git integreres ofte
        med et tredjepartssystem som Github, Gitlab, Bitbucket osv.
        Git holder styr på œndringer i filer, og tracker altså tilføjelser og sletninger påtvœrs
        af et projekts kode. Hvert projektmedlem kan sidde med en fuld version af
        den nuvœrende primœre projektkode på sin egen computer.
        Når de så har lavet œndringer, kan denne nye version samles
        med den primœre kode, og andre medlemmer kan derved få adgang til de nyeste
        œndringer igennem fx. Github.
    `,
  },
  {
    title: "Git init",
    description: `
        Initialiserer et nyt git repository. En .git fil vil blive oprettet, 
        og det er denne fil, som kommer til at indeholde alt fra commits til œndringer.
    `,
    code: {
      snippet: `
            git init
        `,
      lang: "language-bash",
    },
  },
  {
    title: "Git add",
    description: `
        Git add kommandoen vil tilføje filer/mapper som staged. Dette vil sige,
        at disse filer/mapper vil blive inkluderet i den nœste commit. Man kan
        køre kommandoen på flere forskellige måder. Enten ved at tilføje enkeltvise
        filer eller ved at tilføje alle filer på en gang.
    `,
    code: {
      snippet: `
            git add app.js # single file

            git add . # all changed files in current directory and subdirectories.
        `,
      lang: "language-bash",
    },
  },
  {
    title: "Git commit",
    description: `
        Git commit kan lettes forklares ved, at kommandoen samler de nuvœrende staged
        filer/mapper og pakker dem sammen til en pakke. Med committen (pakken) kan
        man tilknytte en besked, så man kan få en overordnet ide om, hvilke tilføjelser
        og rettelser pakken bringer.
    `,
    code: {
      snippet: `
            git commit -m "Initialized a new NodeJS project"
        `,
      lang: "language-bash",
    },
  },
  {
    title: "Git push",
    description: `
        Git push tager alle de nuvœrende lokale commits (pakker) og sender dem
        til et remote repository som fx. Github. Dermed vil ens lokale œndriger
        blive samlet med resten af projektkoden, hvor andre så kan tilgå den.
        Når man pusher, skal man tilføje to argumenter. Hvilken remote repository
        man vil pushe til, og hvilken branch der skal pushes til. Remote repository
        vil oftest blive sat som en del af processen ved at oprette et git projekt,
        men kan også sœttes senere hen.
    `,
    code: {
      snippet: `
        git push &lt;remote_repository> &lt;branch>
        
        # origin = remote repository
        # if origin is not set - example for Github
        git remote add origin https://github.com/&lt;username>/&lt;repository>.git

        # master = primary branch for the project
        git push origin master
        `,
      lang: "language-bash",
    },
  },
];
