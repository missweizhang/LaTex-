"use client";

import Image from "next/image";

const eastAsianRegex = /[\u2E80-\u9FFF兀]/g; // This range covers most East Asian characters
const punctuationRegex =
  /[\s|A-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~，。︰：；、．？！…—─―－‧“”‘’（）《》〔〕﹝﹞【】「」『』©󠇠]/g;

const addPinyin = (articleText, searchText) => {
  // remove whitespace and punctuation from searchText
  searchText = searchText.replace(punctuationRegex, "");
  const regex = new RegExp(`[${searchText}]`, "g");

  // add pinyin
  return articleText.replace(regex, "\\xpinyin*{$&}");
};

const OverleafForm = () => {
  const handleSubmit = (e) => {
    let inputText = document.getElementById("inputTextArea").value;
    let outputTex = document.getElementById("outputTex");
    let searchText = document.getElementById("searchText").value;
    let title = document.getElementById("title").value;

    outputTex.value = `\\documentclass[letterpaper]{ctexart}\r\n\\usepackage{subfiles}\r\n\\usepackage{ragged2e}\r\n\\usepackage{hyperref}\r\n\\usepackage{graphicx}\r\n\\usepackage[export]{adjustbox}\r\n%\\graphicspath{ {.} }\r\n\r\n% margin and line spacing\r\n\\usepackage[left=0.7in, right=0.7in, top=1in, bottom=1in]{geometry}\r\n\\linespread{2.0}\r\n\r\n% header and footer\r\n\\usepackage{fancyhdr}\r\n\\pagestyle{fancy}\r\n\\fancyhf{}\r\n%\\renewcommand{\\headrulewidth}{0pt} % remove top horizontal bar\r\n\\lhead{\\ziju{0.2} }\r\n\\rhead{\\ziju{0.2} ${title}}\r\n\\cfoot{\\thepage} % page number in center of footer\r\n\r\n% font and pinyin\r\n\\usepackage{xcolor}\r\n\\usepackage{xpinyin}\r\n\\xpinyinsetup{ratio=0.5, format={\\color{blue}}}\r\n\\setCJKmainfont{FandolKai}\r\n\r\n% title font\r\n\\usepackage{titlesec}\r\n\\titleformat{\\section}\r\n  {\\huge\\color{darkgray}}\r\n  {\\thesection}{6pt}{\\Huge\\textbf}\r\n\\titleformat{\\subsection}[display]\r\n  {\\large\\color{purple}}\r\n  {\\thesubsection}{0.2em}{\\Large}\r\n\r\n  \r\n% environment for main text area\r\n\\newenvironment{chinesetext}\r\n{\\fontsize{16}{16}% font size\r\n\\ziju{0.1}% character spacing\r\n}{}\r\n\r\n%%%%%%%%%%%%%%%%%%%%%%%%%\r\n\r\n\\title{\\color{purple}%\r\n\\huge ${title}\\\\\r\n}\r\n\\author{}\r\n\\date{}\r\n\r\n\\begin{document}\r\n\\maketitle\r\n\\begin{chinesetext}\r\n${inputText}\r\n\r\n\\end{chinesetext}\r\n\r\n\\end{document}`;
    outputTex.value = addPinyin(outputTex.value, searchText);

    console.log(outputTex.value);
    alert("Redirecting to Overleaf");
    document.querySelector("form").submit();
  };

  return (
    <form
      action="https://www.overleaf.com/docs"
      method="post"
      target="_blank"
      className="flex flex-col md:flex-row gap-3 h-full w-full "
    >
      <input type="hidden" name="engine" value="xelatex" className="h-0" />
      <input id="outputTex" type="hidden" name="snip" className="h-0" />

      <textarea
        required
        id="inputTextArea"
        className="p-3 rounded-md w-full box-border bg-transparent border-2 border-slate-600 h-full min-h-[300px] md:min-h-[600px]"
        placeholder="请输入文章"
      ></textarea>
      <div className="flex flex-col gap-3">
        <textarea
          className="p-3 rounded-md bg-transparent border-2 border-slate-600 min-h-[100px] md:min-h-[300px]"
          id="searchText"
          name="searchText"
          placeholder="请输入生字"
        ></textarea>
        <input
          className="p-3 rounded-md bg-transparent border-2 border-slate-600 "
          type="text"
          id="title"
          name="title"
          placeholder="请输入标题"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-slate-600 px-2 py-2 rounded-md text-white hover:bg-slate-500"
        >
          Open in Overleaf
        </button>
        <div className="mt-1 md:mt-3 text-sm space-y-1">
          <h3 className="font-semibold text-base text-center">
            Further Editing
          </h3>
          <dl>
            <dt className="font-semibold inline mr-2">多音字</dt>
            <dd className="text-xs inline">
              把 <pre className="inline">\xpinyin*&#123;行&#125;</pre> 改成{" "}
              <pre className="inline">
                \xpinyin&#123;行&#125;&#123;hang2&#125;
              </pre>{" "}
              <strong>注意去掉 * 号</strong>。
            </dd>
          </dl>
          <dl>
            <dt className="font-semibold inline mr-2">小标题</dt>
            <dd className="text-xs inline">
              <pre className="inline">\section*&#123;标题&#125;</pre> 或{" "}
              <pre className="inline">\subsection*&#123;小标题&#125;</pre>
            </dd>
          </dl>
        </div>
      </div>
    </form>
  );
};

export default OverleafForm;
