document.addEventListener("DOMContentLoaded", function (event) {
  const preview = document.getElementById("preview");
  preview.innerHTML = marked(markText);
  const editor = document.getElementById("editor");
  editor.innerHTML = markText;

  editor.addEventListener("keyup", (e) => {
    e.preventDefault();
    console.log("editor", e.target.value);
    preview.innerHTML = marked(e.target.value);
  });
});

let markText =
  "# Welcome to my React Markdown Previewer\
  \n## This is a sub-heading...\
  \n### And here's some other cool stuff: Heres some code, `<div></div>`, between 2 backticks.\n\
  ```\n\
    // this is multi-line code:\n\
    function anotherExample(firstLine, lastLine) {\n\
      if (firstLine == '```' && lastLine == '```') {\n\
        return multiLineCode;\n\
      }\n\
    }\n\
  ```\n\
  You can also make text **bold**... whoa!\n<br/>\
  Or _italic_.\n<br />\
  Or... wait for it... **_both!_**\n<br/>\
  And feel free to go crazy ~~crossing stuff out~~.\n<br /><br/>\n\
  There's also [links](https://www.freecodecamp.com), and\n\
  > Block Quotes!<br/>\n\n\
And if you want to get really crazy, even tables:\n\n\
Wild Header | Crazy Header | Another Header?\n\
------------ | ------------- | -------------\n\
Your content can | be here, and it | can be here....\n\
And here. | Okay. | I think we get it.\n\n<br/>\
- And of course there are lists.\n\
  - Some are bulleted.\n\
     - With different indentation levels.\n\
        - That look like this.\n\n\
1. And there are numbererd lists too.\n\
2. Use just 1s if you want!\n\
3. And last but not least, let's not forget embedded images:<br/>\n\n\
![React Logo w/ Text](https://4.bp.blogspot.com/-_YSVTe2ekBU/XKMntJDH0ZI/AAAAAAAAXNk/3d48i_XShWwvoMNj0YJWp2J4_Woh9dzGgCLcBGAs/s1600/reactjs%2Btutorial.png)\n\
";
