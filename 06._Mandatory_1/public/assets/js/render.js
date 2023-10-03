export const render = (target, subject) => {
  const htmlString = subject
    .map(
      (subject) => `
        <div class="space-y-4 pt-12 pb-14 last:pb-0">
            <div>
                <h4 class="text-xl text-[#0f172a] dark:text-[#f1f5f9] font-bold">${
                  subject.title
                }</h4>
                <p class="dark:text-[#e2e8f0] text-[#334155] leading-7">${
                  subject.description
                }</p>
            </div>
            ${
              subject.code
                ? `
                    <pre>
                        <code class="${subject.code.lang} rounded-md">
                            ${subject.code.snippet}
                        </code>
                    </pre>
                  `
                : ""
            }
            ${subject.extra ? `${extraElements(subject.extra)}` : ""}
        </div>
    `
    )
    .join("");
  target.innerHTML = DOMPurify.sanitize(htmlString);
};

function extraElements(extra) {
  return extra
    .map(
      (x) => `
        <div class="flex flex-col space-y-1">
          <h3 class="text-[#0f172a]/90 dark:text-[#f1f5f9]/95 text-md font-bold">${x.subtitle}</h3>
          <p class="dark:text-[#e2e8f0] text-[#334155] leading-7">${x.text}</p>
        </div>
    `
    )
    .join("");
}
