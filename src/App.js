import 'normalize.css';
import "./styles.css";
import "./prismjs/custom-light.css";
// import "./prismjs/custom-dark.css";
import { documentToSVG, elementToSVG, inlineResources, formatXML } from 'dom-to-svg';
import domtoimage from "dom-to-image";
import copy from "copy-text-to-clipboard";
import { useEffect, useRef } from "react";
import Prism from "prismjs";
import FileSaver from 'file-saver';
import html2canvas from 'html2canvas';
const getImage = async (dom) => {
  const fontFamily = "JetBrains Mono";
  // return domtoimage.toBlob(dom);
  return domtoimage
    .toSvg(dom)
    .then(
      (dataURL) =>
        dataURL
          .replace(/&nbsp;/g, "&#160;")
          // https://github.com/tsayen/dom-to-image/blob/fae625bce0970b3a039671ea7f338d05ecb3d0e8/src/dom-to-image.js#L551
          .replace(/%23/g, "#")
          .replace(/%0A/g, "\n")
          // https://stackoverflow.com/questions/7604436/xmlparseentityref-no-name-warnings-while-loading-xml-into-a-php-file
          .replace(/&(?!#?[a-z0-9]+;)/g, "&amp;")
      // remove other fonts which are not used
      .replace(
        new RegExp(
          '@font-face\\s+{\\s+font-family: (?!"*' + fontFamily + ").*?}",
          "g"
        ),
        ""
      )
    )
    .then((uri) => uri.slice(uri.indexOf(",") + 1))
    .then((data) => new Blob([data], { type: "image/svg+xml" }));
  // // domtoimage
  //   .toPng(dom)
  //   .then(function (dataUrl) {
  //     var img = new Image();
  //     img.src = dataUrl;
  //     document.body.appendChild(img);
  //   })
  //   .catch(function (error) {
  //     console.error("oops, something went wrong!", error);
  //   });
  // domtoimage
  //   .toPng(document.querySelector("#test"))
  //   .then(function (dataUrl) {
  //     // console.log(dataUrl.replace("data:image/svg+xml;charset=utf-8,", ""));
  //     // copy(dataUrl.replace("data:image/svg+xml;charset=utf-8,", ""));
  //   })
  //   .catch(function (error) {
  //     console.error("oops, something went wrong!", error);
  //   });
};
const copySVG = async (dom) => {
  // const link = document.createElement('a');

  // getImage(dom).then(blob => FileSaver.saveAs(blob, "test.svg")).catch(console.error);;

  html2canvas(dom).then(function(canvas) {
    document.body.appendChild(canvas);
  });

  // const svgDocument = elementToSVG(dom)
  // await inlineResources(svgDocument.documentElement);
  // // Get SVG string
  // const svgString = new XMLSerializer().serializeToString(svgDocument);
  // copy(svgString);

  
  // getImage(dom).then(blob => window.URL.createObjectURL(blob))
  // .then(url => {
  //   link.href = url
  //   document.body.appendChild(link)
  //   link.click()
  //   link.remove()
  // }).catch(console.error);
}
export default function App() {
  // const copySVG = async () => {
  //   const svgDocument = elementToSVG(document.querySelector('#test'))
  //   await inlineResources(svgDocument.documentElement);
  //   // Get SVG string
  //   const svgString = new XMLSerializer().serializeToString(svgDocument);
  //   copy(svgString);
  // };
  const container = useRef(null);
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="App">
      <div>
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>

      <h3>Inline Code</h3>
      <p>
        This is some{" "}
        <code className="language-javascript">{`inline code`}</code> in a
        paragraph.
      </p>

      <h3>Javascript</h3>
      <pre className="language-javascript"  >
        <code>
          {`import {x, y} as p from 'point';
const ANSWER = 42;

class Car extends Vehicle {
  constructor(speed, cost) {
    super(speed);

    var c = Symbol('cost');
    this[c] = cost;

    this.intro = \`This is a car runs at
      \${speed}.\`;
  }
}

for (let num of [1, 2, 3]) {
  console.log(num + 0b111110111);
}

function $initHighlight(block, flags) {
  try {
    if (block.className.search(/\bno\-highlight\b/) != -1)
      return processBlock(block.function, true, 0x0F) + ' class=""';
  } catch (e) {
    /* handle exception */
    var e4x =
        <div>Example
            <p>1234</p></div>;
  }
  for (var i = 0 / 2; i < classes.length; i++) {
  // "0 / 2" should not be parsed as regexp
    if (checkCondition(classes[i]) === undefined)
      return /\d+[\s/]/g;
  }
  console.log(Array.every(classes, Boolean));
}

export  $initHighlight;
`}
        </code>
      </pre>
      <button onClick={() => copySVG(container.current)}>Download SVG</button>

      <pre className="language-javascript"  ref={container}>
        <code>
          {`var ProfileLink = React.createClass({
  render: function() {
    return (
      <a href={'https://www.facebook.com/' + this.props.username}>
        {this.props.username}
      </a>
    );
  }
});`}
        </code>
      </pre>
      <h3>HTML</h3>
      <pre className="language-html">
        <code>{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Hello world</title>
  <link href='http://fonts.googleapis.com/css?family=Roboto:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="index.css" />
</head>
<body>
  <div id="app"></div>
  <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/2.5.1/less.min.js"></script>
  <script src="vendor/prism.js"></script>
  <script src="examples.bundle.js"></script>
</body>
</html>      
      `}</code>
      </pre>
      <h3>CSS</h3>
      <pre className="language-css">
        <code>{`/*********************************************************
* General
*/
pre[class*="language-"],
code {
  color: #5c6e74;
  font-size: 13px;
  text-shadow: none;
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  line-height: 1.5;
  tab-size: 4;
  hyphens: none;
}
pre[class*="language-"]::selection,
code::selection {
  text-shadow: none;
  background: #b3d4fc;
}
@media print {
  pre[class*="language-"],
  code {
    text-shadow: none;
  }
}
pre[class*="language-"] {
  padding: 1em;
  margin: .5em 0;
  overflow: auto;
  background: #f8f5ec;
}
:not(pre) > code {
  padding: .1em .3em;
  border-radius: .3em;
  color: #db4c69;
  background: #f9f2f4;
}      
      `}</code>
      </pre>
    </div>
  );
}
