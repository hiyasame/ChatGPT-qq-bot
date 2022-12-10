import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import fs from "fs-extra"
import puppeteer from "puppeteer";
import { config } from "dotenv";

config()

const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const highlightCSS = await fs.readFile(`./node_modules/highlight.js/styles/${process.env.HIGHLIGHT_STYLE || "github-dark"}.css`, "utf8")

const markdownIt: MarkdownIt = MarkdownIt({
    html: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return (
                    '<pre><code class="hljs">' +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    "</code></pre>"
                );
            } catch (__) { }
        }
        return (
            '<pre><code class="hljs">' +
            markdownIt.utils.escapeHtml(str) +
            "</code></pre>"
        );
    },
});

export default async function renderMarkdown(source: string): Promise<Buffer> {
    return html2Image(md2html(source))
}

export function md2html(source: string): string {

    // converted to HTML
    const rendered = markdownIt.render(source);

    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8" />
  <title>Convert Markdown to HTML with Node.js</title>
  <style>
    ${highlightCSS}
  </style>
  </head>
  <body>
  ${rendered}
  </body>
  </html>
  `;
}

export async function html2Image(source: string): Promise<Buffer> {
    const page = await browser.newPage()
    await page.setContent(source)
    try {
       return (await page.screenshot({ fullPage: true })) as Buffer 
    } finally {
        page.close()
    }
}

// const html = md2html(await fs.readFile("/home/rain/Rain/project/rust/relearn_rs/class4/README.md", "utf8"))
// await fs.writeFile("./res.png", await html2Image(html))
// browser.close()