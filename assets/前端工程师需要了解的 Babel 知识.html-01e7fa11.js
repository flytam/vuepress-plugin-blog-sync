import{_ as l,z as s,A as t,Y as e,C as i,U as a,a6 as d,Q as r}from"./framework-cb9358d9.js";const u={},o=e("h2",{id:"",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#","aria-hidden":"true"},"#"),i(" **")],-1),c=e("p",null,'<table><tbody><tr><td bgcolor="#FDFFE7"><font size="4">原创不易，希望能关注下我们，再顺手点个赞~~<font></font></font></td></tr></tbody></table> **',-1),m={href:"https://www.zoo.team/article/babel",target:"_blank",rel:"noopener noreferrer"},v=d(`<p>在前端圈子里，对于 Babel，大家肯定都比较熟悉了。如果哪天少了它，对于前端工程师来说肯定是个噩梦。Babel 的工作原理是怎样的可能了解的人就不太多了。</p><p>本文将主要介绍 Babel 的工作原理以及怎么写一个 Babel 插件。</p><h3 id="babel-是怎么工作的" tabindex="-1"><a class="header-anchor" href="#babel-是怎么工作的" aria-hidden="true">#</a> Babel 是怎么工作的</h3><p><code>Babel</code> 是一个 <code>JavaScript</code> 编译器。</p><h4 id="做与不做" tabindex="-1"><a class="header-anchor" href="#做与不做" aria-hidden="true">#</a> 做与不做</h4><p>注意很重要的一点就是，<code>Babel</code> 只是转译新标准引入的语法，比如：</p><ul><li><p>箭头函数</p></li><li><p>let / const</p></li><li><p>解构</p></li></ul><p>哪些在 Babel 范围外？对于新标准引入的全局变量、部分原生对象新增的原型链上的方法，Babel 表示超纲了。</p><ul><li><p>全局变量</p><ul><li>Promise</li><li>Symbol</li><li>WeakMap</li><li>Set</li></ul></li><li><p>includes</p></li><li><p>generator 函数</p></li></ul><p>对于上面的这些 API，<code>Babel</code> 是不会转译的，需要引入 <code>polyfill</code> 来解决。</p><h3 id="babel-编译的三个阶段" tabindex="-1"><a class="header-anchor" href="#babel-编译的三个阶段" aria-hidden="true">#</a> Babel 编译的三个阶段</h3><p>Babel 的编译过程和大多数其他语言的编译器相似，可以分为三个阶段：</p><ul><li>解析（Parsing）：将代码字符串解析成抽象语法树。</li><li>转换（Transformation）：对抽象语法树进行转换操作。</li><li>生成（Code Generation）: 根据变换后的抽象语法树再生成代码字符串。</li></ul><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/15/16d355b990a35d0d~tplv-t2oaga2asx-image.image" alt=""></p><p>为了理解 <code>Babel</code>，我们从最简单一句 <code>console</code> 命令下手</p><h4 id="解析-parsing" tabindex="-1"><a class="header-anchor" href="#解析-parsing" aria-hidden="true">#</a> 解析（Parsing）</h4><p><code>Babel</code> 拿到源代码会把代码抽象出来，变成 <code>AST</code> （抽象语法树），学过编译原理的同学应该都听过这个词，全称是 <strong>Abstract Syntax Tree</strong>。</p><p>抽象语法树是源代码的抽象语法结构的树状表示，树上的每个节点都表示源代码中的一种结构，只所以说是抽象的，是因为抽象语法树并不会表示出真实语法出现的每一个细节，比如说，嵌套括号被隐含在树的结构中，并没有以节点的形式呈现，它们主要用于源代码的简单转换。</p><p><code>console.log(&amp;#39;zcy&amp;#39;)；</code> 的 AST 长这样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &amp;quot;type&amp;quot;: &amp;quot;Program&amp;quot;,
  &amp;quot;body&amp;quot;: [
    {
      &amp;quot;type&amp;quot;: &amp;quot;ExpressionStatement&amp;quot;,
      &amp;quot;expression&amp;quot;: {
        &amp;quot;type&amp;quot;: &amp;quot;CallExpression&amp;quot;,
        &amp;quot;callee&amp;quot;: {
          &amp;quot;type&amp;quot;: &amp;quot;MemberExpression&amp;quot;,
          &amp;quot;computed&amp;quot;: false,
          &amp;quot;object&amp;quot;: {
            &amp;quot;type&amp;quot;: &amp;quot;Identifier&amp;quot;,
            &amp;quot;name&amp;quot;: &amp;quot;console&amp;quot;
          },
          &amp;quot;property&amp;quot;: {
            &amp;quot;type&amp;quot;: &amp;quot;Identifier&amp;quot;,
            &amp;quot;name&amp;quot;: &amp;quot;log&amp;quot;
          }
        },
        &amp;quot;arguments&amp;quot;: [
          {
          &amp;quot;type&amp;quot;: &amp;quot;Literal&amp;quot;,
          &amp;quot;value&amp;quot;: &amp;quot;zcy&amp;quot;,
          &amp;quot;raw&amp;quot;: &amp;quot;&amp;#39;zcy&amp;#39;&amp;quot;
          }
        ]
      }
    }
  ],
  &amp;quot;sourceType&amp;quot;: &amp;quot;script&amp;quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),p=e("code",null,"AST",-1),b={href:"https://astexplorer.net/#",target:"_blank",rel:"noopener noreferrer"},h=e("h4",{id:"ast-是怎么来的",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#ast-是怎么来的","aria-hidden":"true"},"#"),i(" AST 是怎么来的")],-1),q=e("p",null,"整个解析过程分为两个步骤：",-1),g={href:"https://esprima.org/demo/parse.html",target:"_blank",rel:"noopener noreferrer"},f=e("li",null,[e("p",null,"语法分析：建立分析语法单元之间的关系")],-1),x=d(`<h4 id="分词" tabindex="-1"><a class="header-anchor" href="#分词" aria-hidden="true">#</a> 分词</h4><p>语法单元通俗点说就是代码中的最小单元，不能再被分割，就像原子是化学变化中的最小粒子一样。</p><p><code>Javascript</code> 代码中的语法单元主要包括以下这么几种：</p><ul><li><p>关键字：<code>const</code>、 <code>let</code>、 <code>var</code> 等</p></li><li><p>标识符：可能是一个变量，也可能是 if、else 这些关键字，又或者是 true、false 这些常量</p></li><li><p>运算符</p></li><li><p>数字</p></li><li><p>空格</p></li><li><p>注释：对于计算机来说，知道是这段代码是注释就行了，不关心其具体内容</p></li></ul><p>其实分词说白了就是简单粗暴地对字符串一个个遍历。为了模拟分词的过程，写了一个简单的 Demo，仅仅适用于和上面一样的简单代码。Babel 的实现比这要复杂得多，但是思路大体上是相同的。对于一些好奇心比较强的同学，可以看下具体是怎么实现的，链接在文章底部。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function tokenizer(input) {
  const tokens = [];
  const punctuators = [&amp;#39;,&amp;#39;, &amp;#39;.&amp;#39;, &amp;#39;(&amp;#39;, &amp;#39;)&amp;#39;, &amp;#39;=&amp;#39;, &amp;#39;;&amp;#39;];

  let current = 0;
  while (current &amp;lt; input.length) {

    let char = input[current];

    if (punctuators.indexOf(char) !== -1) {

      tokens.push({
        type: &amp;#39;Punctuator&amp;#39;,
        value: char,
      });
      current++;
      continue;
    }
    // 检查空格，连续的空格放到一起
    let WHITESPACE = /\\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    // 标识符是字母、$、_开始的
    if (/[a-zA-Z\\$\\_]/.test(char)) {
      let value = &amp;#39;&amp;#39;;

      while(/[a-zA-Z0-9\\$\\_]/.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: &amp;#39;Identifier&amp;#39;, value });
      continue;
    }

    // 数字从0-9开始，不止一位
    const NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = &amp;#39;&amp;#39;;
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: &amp;#39;Numeric&amp;#39;, value });
      continue;
    }

    // 处理字符串
    if (char === &amp;#39;&amp;quot;&amp;#39;) {
      let value = &amp;#39;&amp;#39;;
      char = input[++current];

      while (char !== &amp;#39;&amp;quot;&amp;#39;) {
        value += char;
        char = input[++current];
      }

      char = input[++current];

      tokens.push({ type: &amp;#39;String&amp;#39;, value });

      continue;
    }
    // 最后遇到不认识到字符就抛个异常出来
    throw new TypeError(&amp;#39;Unexpected charactor: &amp;#39; + char);
  }

  return tokens;
}

const input = \`console.log(&amp;quot;zcy&amp;quot;);\`

console.log(tokenizer(input));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[ 
  { 
    &amp;quot;type&amp;quot; :  &amp;quot;Identifier&amp;quot; , 
    &amp;quot;value&amp;quot; :  &amp;quot;console&amp;quot;
   }, 
  { 
    &amp;quot;type&amp;quot; :  &amp;quot;Punctuator&amp;quot; , 
    &amp;quot;value&amp;quot; :  &amp;quot;.&amp;quot;
   }, 
  { 
    &amp;quot;type&amp;quot; :  &amp;quot;Identifier&amp;quot; , 
    &amp;quot;value&amp;quot; :  &amp;quot;log&amp;quot;
   }, 
  { 
    &amp;quot;type&amp;quot; :  &amp;quot;Punctuator&amp;quot; , 
    &amp;quot;value&amp;quot; :  &amp;quot;(&amp;quot;
   }, 
  { 
    &amp;quot;type&amp;quot; :  &amp;quot;String&amp;quot; ,
    &amp;quot;value&amp;quot; :  &amp;quot;&amp;#39;zcy&amp;#39;&amp;quot;
   }, 
  { 
    &amp;quot;type&amp;quot; : &amp;quot;Punctuator&amp;quot; , 
    &amp;quot;value&amp;quot; :  &amp;quot;)&amp;quot;
   }, 
  { 
    &amp;quot;type&amp;quot; :  &amp;quot;Punctuator&amp;quot; , 
    &amp;quot;value&amp;quot; :  &amp;quot;;&amp;quot;
   } 
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>####语法分析：建立分析语法单元之间的关系</p><p>语义分析则是将得到的词汇进行一个立体的组合，确定词语之间的关系。考虑到编程语言的各种从属关系的复杂性，语义分析的过程又是在遍历得到的语法单元组，相对而言就会变得更复杂。</p><p>简单来说语法分析是对语句和表达式识别，这是个递归过程，在解析中，<code>Babel</code> 会在解析每个语句和表达式的过程中设置一个暂存器，用来暂存当前读取到的语法单元，如果解析失败，就会返回之前的暂存点，再按照另一种方式进行解析，如果解析成功，则将暂存点销毁，不断重复以上操作，直到最后生成对应的语法树。</p><h4 id="转换-transformation" tabindex="-1"><a class="header-anchor" href="#转换-transformation" aria-hidden="true">#</a> 转换（Transformation）</h4><h5 id="plugins" tabindex="-1"><a class="header-anchor" href="#plugins" aria-hidden="true">#</a> Plugins</h5><p>插件应用于 <code>babel</code> 的转译过程，尤其是第二个阶段 <code>Transformation</code>，如果这个阶段不使用任何插件，那么 <code>babel</code> 会原样输出代码。</p><h5 id="presets" tabindex="-1"><a class="header-anchor" href="#presets" aria-hidden="true">#</a> Presets</h5><p><code>Babel</code> 官方帮我们做了一些预设的插件集，称之为 <code>Preset</code>，这样我们只需要使用对应的 Preset 就可以了。每年每个 <code>Preset</code> 只编译当年批准的内容。 而 <code>babel-preset-env</code> 相当于 ES2015 ，ES2016 ，ES2017 及最新版本。</p><h5 id="plugin-preset-路径" tabindex="-1"><a class="header-anchor" href="#plugin-preset-路径" aria-hidden="true">#</a> Plugin/Preset 路径</h5><p>如果 Plugin 是通过 npm 安装，可以传入 Plugin 名字给 Babel，Babel 将检查它是否安装在 <code>node_modules</code> 中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;quot;plugins&amp;quot;: [&amp;quot;babel-plugin-myPlugin&amp;quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>也可以指定你的 Plugin/Preset 的相对或绝对路径。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;quot;plugins&amp;quot;: [&amp;quot;./node_modules/asdf/plugin&amp;quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="plugin-preset-排序" tabindex="-1"><a class="header-anchor" href="#plugin-preset-排序" aria-hidden="true">#</a> Plugin/Preset 排序</h5><p>如果两次转译都访问相同的节点，则转译将按照 Plugin 或 Preset 的规则进行排序然后执行。</p><ul><li>Plugin 会运行在 Preset 之前。</li><li>Plugin 会从第一个开始顺序执行。</li><li>Preset 的顺序则刚好相反(从最后一个逆序执行)。</li></ul><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &amp;quot;plugins&amp;quot;: [
    &amp;quot;transform-decorators-legacy&amp;quot;,
    &amp;quot;transform-class-properties&amp;quot;
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将先执行 <code>transform-decorators-legacy</code> 再执行 <code>transform-class-properties</code></p><p>但 preset 是反向的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &amp;quot;presets&amp;quot;: [
    &amp;quot;es2015&amp;quot;,
    &amp;quot;react&amp;quot;,
    &amp;quot;stage-2&amp;quot;
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会按以下顺序运行: <code>stage-2</code>， <code>react</code>， 最后 <code>es2015</code>。</p><p>那么问题来了，如果 <code>presets</code> 和 <code>plugins</code> 同时存在，那执行顺序又是怎样的呢？答案是先执行 <code>plugins</code> 的配置，再执行 <code>presets</code> 的配置。</p><p>所以以下代码的执行顺序为</p><ol><li><pre><code>\\@babel/plugin-proposal-decorators
</code></pre></li><li><pre><code>\\@babel/plugin-proposal-class-properties
</code></pre></li><li><pre><code>\\@babel/plugin-transform-runtime
</code></pre></li><li><pre><code>\\@babel/preset-env
</code></pre></li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// .babelrc 文件
{
  &amp;quot;presets&amp;quot;: [
    [
      &amp;quot;@babel/preset-env&amp;quot;
    ]
  ],
  &amp;quot;plugins&amp;quot;: [
    [&amp;quot;@babel/plugin-proposal-decorators&amp;quot;, { &amp;quot;legacy&amp;quot;: true }],
    [&amp;quot;@babel/plugin-proposal-class-properties&amp;quot;, { &amp;quot;loose&amp;quot;: true }],
    &amp;quot;@babel/plugin-transform-runtime&amp;quot;,
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="生成-code-generation" tabindex="-1"><a class="header-anchor" href="#生成-code-generation" aria-hidden="true">#</a> 生成（Code Generation）</h5><p>用 <code>babel-generator</code> 通过 AST 树生成 ES5 代码。</p><h3 id="如何编写一个-babel-插件" tabindex="-1"><a class="header-anchor" href="#如何编写一个-babel-插件" aria-hidden="true">#</a> 如何编写一个 <code>Babel</code> 插件</h3>`,37),_=e("code",null,"Babel",-1),y={href:"https://babeljs.io/docs/en/plugins#plugin-development",target:"_blank",rel:"noopener noreferrer"},B=d(`<h4 id="插件格式" tabindex="-1"><a class="header-anchor" href="#插件格式" aria-hidden="true">#</a> 插件格式</h4><p>先从一个接收了当前 <code>Babel</code> 对象作为参数的 <code>Function</code> 开始。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export default function(babel) {
  // plugin contents
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们经常会这样写</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export default function({ types: t }) {
    //
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着返回一个对象，其 <code>visitor</code> 属性是这个插件的主要访问者。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export default function({ types: t }) {
  return {
    visitor: {
      // visitor contents
    }
  };
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>visitor</code> 中的每个函数接收 2 个参数：<code>path</code> 和 <code>state</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export default function({ types: t }) {
  return {
    visitor: {
      CallExpression(path, state) {}
    }
  };
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="写一个简单的插件" tabindex="-1"><a class="header-anchor" href="#写一个简单的插件" aria-hidden="true">#</a> 写一个简单的插件</h4>`,10),P=e("code",null,"a",-1),S=e("code",null,"b",-1),T={href:"https://astexplorer.net/#",target:"_blank",rel:"noopener noreferrer"},A=e("code",null,"var a = 1",-1),k=d(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &amp;quot;type&amp;quot;: &amp;quot;Program&amp;quot;,
  &amp;quot;start&amp;quot;: 0,
  &amp;quot;end&amp;quot;: 10,
  &amp;quot;body&amp;quot;: [
    {
      &amp;quot;type&amp;quot;: &amp;quot;VariableDeclaration&amp;quot;,
      &amp;quot;start&amp;quot;: 0,
      &amp;quot;end&amp;quot;: 9,
      &amp;quot;declarations&amp;quot;: [
        {
          &amp;quot;type&amp;quot;: &amp;quot;VariableDeclarator&amp;quot;,
          &amp;quot;start&amp;quot;: 4,
          &amp;quot;end&amp;quot;: 9,
          &amp;quot;id&amp;quot;: {
            &amp;quot;type&amp;quot;: &amp;quot;Identifier&amp;quot;,
            &amp;quot;start&amp;quot;: 4,
            &amp;quot;end&amp;quot;: 5,
            &amp;quot;name&amp;quot;: &amp;quot;a&amp;quot;
          },
          &amp;quot;init&amp;quot;: {
            &amp;quot;type&amp;quot;: &amp;quot;Literal&amp;quot;,
            &amp;quot;start&amp;quot;: 8,
            &amp;quot;end&amp;quot;: 9,
            &amp;quot;value&amp;quot;: 1,
            &amp;quot;raw&amp;quot;: &amp;quot;1&amp;quot;
          }
        }
      ],
      &amp;quot;kind&amp;quot;: &amp;quot;var&amp;quot;
    }
  ],
  &amp;quot;sourceType&amp;quot;: &amp;quot;module&amp;quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从这里看，要找的节点类型就是 <code>VariableDeclarator</code> ，下面开始撸代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export default function({ types: t }) {
  return {
    visitor: {
      VariableDeclarator(path, state) {
        if (path.node.id.name == &amp;#39;a&amp;#39;) {
          path.node.id = t.identifier(&amp;#39;b&amp;#39;)
        }
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们要把 <code>id</code> 属性是 a 的替换成 b 就好了。但是这里不能直接 <code>path.node.id.name = &amp;#39;b&amp;#39;</code> 。如果操作的是Object，就没问题，但是这里是 AST 语法树，所以想改变某个值，就是用对应的 AST 来替换，现在我们用新的标识符来替换这个属性。</p><p>最后测试一下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import * as babel from &amp;#39;@babel/core&amp;#39;;
const c = \`var a = 1\`;

const { code } = babel.transform(c, {
  plugins: [
    function({ types: t }) {
      return {
        visitor: {
          VariableDeclarator(path, state) {
            if (path.node.id.name == &amp;#39;a&amp;#39;) {
              path.node.id = t.identifier(&amp;#39;b&amp;#39;)
            }
          }
        }
      }
    }
  ]
})

console.log(code); // var b = 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="实现一个简单的按需打包功能" tabindex="-1"><a class="header-anchor" href="#实现一个简单的按需打包功能" aria-hidden="true">#</a> 实现一个简单的按需打包功能</h4><p>例如我们要实现把 <code>import { Button } from &amp;#39;antd&amp;#39;</code> 转成 <code>import Button from &amp;#39;antd/lib/button&amp;#39;</code></p><p>通过对比 AST 发现，<code>specifiers</code> 里的 <code>type</code> 和 <code>source</code> 不同。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// import { Button } from &amp;#39;antd&amp;#39;
&amp;quot;specifiers&amp;quot;: [
    {
        &amp;quot;type&amp;quot;: &amp;quot;ImportSpecifier&amp;quot;,
        ...
    }
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// import Button from &amp;#39;antd/lib/button&amp;#39;
&amp;quot;specifiers&amp;quot;: [
    {
        &amp;quot;type&amp;quot;: &amp;quot;ImportDefaultSpecifier&amp;quot;,
        ...
    }
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import * as babel from &amp;#39;@babel/core&amp;#39;;
const c = \`import { Button } from &amp;#39;antd&amp;#39;\`;

const { code } = babel.transform(c, {
  plugins: [
    function({ types: t }) {
      return {
        visitor: {
          ImportDeclaration(path) {
            const { node: { specifiers, source } } = path;
            if (!t.isImportDefaultSpecifier(specifiers[0])) { // 对 specifiers 进行判断，是否默认倒入
              const newImport = specifiers.map(specifier =&amp;gt; (
                t.importDeclaration(
                  [t.ImportDefaultSpecifier(specifier.local)],
                  t.stringLiteral(\`\${source.value}/lib/\${specifier.local.name}\`)
                )
              ))
              path.replaceWithMultiple(newImport)
            }
          }
        }
      }
    }
  ]
})

console.log(code); // import Button from &amp;quot;antd/lib/Button&amp;quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然 <code>babel-plugin-import</code> 这个插件是有配置项的，我们可以对代码做以下更改</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export default function({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path, { opts }) {
        const { node: { specifiers, source } } = path;
        if (source.value === opts.libraryName) {
          // ...
        }
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="babel-常用-api" tabindex="-1"><a class="header-anchor" href="#babel-常用-api" aria-hidden="true">#</a> Babel 常用 API</h3><h4 id="babel-core" tabindex="-1"><a class="header-anchor" href="#babel-core" aria-hidden="true">#</a> @babel/core</h4><p><code>Babel</code> 的编译器，核心 API 都在这里面，比如常见的 <code>transform</code>、<code>parse</code>。</p><h4 id="babel-cli" tabindex="-1"><a class="header-anchor" href="#babel-cli" aria-hidden="true">#</a> @babel/cli</h4><p><code>cli</code> 是命令行工具, 安装了 <code>@babel/cli</code> 就能够在命令行中使用 <code>babel</code> 命令来编译文件。当然我们一般不会用到，打包工具已经帮我们做好了。</p><h4 id="babel-node" tabindex="-1"><a class="header-anchor" href="#babel-node" aria-hidden="true">#</a> @babel/node</h4><p>直接在 <code>node</code> 环境中，运行 ES6 的代码。</p><h4 id="babylon" tabindex="-1"><a class="header-anchor" href="#babylon" aria-hidden="true">#</a> babylon</h4><p><code>Babel</code> 的解析器。</p><h4 id="babel-traverse" tabindex="-1"><a class="header-anchor" href="#babel-traverse" aria-hidden="true">#</a> babel-traverse</h4><p>用于对 AST 的遍历，维护了整棵树的状态，并且负责替换、移除和添加节点。</p><h4 id="babel-types" tabindex="-1"><a class="header-anchor" href="#babel-types" aria-hidden="true">#</a> babel-types</h4><p>用于 AST 节点的 Lodash 式工具库, 它包含了构造、验证以及变换 AST 节点的方法，对编写处理 AST 逻辑非常有用。</p><h4 id="babel-generator" tabindex="-1"><a class="header-anchor" href="#babel-generator" aria-hidden="true">#</a> babel-generator</h4><p>Babel 的代码生成器，它读取 AST 并将其转换为代码和源码映射（sourcemaps）。</p><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>文章主要介绍了一下几个 <code>Babel</code> 的 API，和 <code>Babel</code> 编译代码的过程以及简单编写了一个 <code>babel</code> 插件。</p><h2 id="招贤纳士" tabindex="-1"><a class="header-anchor" href="#招贤纳士" aria-hidden="true">#</a> 招贤纳士</h2><p>招人，前端，隶属政采云前端大团队（ZooTeam），50 余个小伙伴正等你加入一起浪。如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“5年工作时间3年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手参与一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 <strong><code>ZooTeam@cai-inc.com</code></strong></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/29/16cddbe09f60b388~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,35),I={href:"https://juejin.cn/post/6844903938018263048",target:"_blank",rel:"noopener noreferrer"},E={href:"https://juejin.cn/post/6844903925716353031",target:"_blank",rel:"noopener noreferrer"},D={href:"https://juejin.cn/post/6844903933580673032",target:"_blank",rel:"noopener noreferrer"};function j(w,z){const n=r("ExternalLinkIcon");return s(),t("div",null,[o,c,e("p",null,[i("> 本文首发于政采云前端团队博客： "),e("a",m,[i("前端工程师需要了解的 Babel 知识"),a(n)])]),v,e("p",null,[i("上面的 "),p,i(" 描述了源代码的每个部分以及它们之间的关系，可以自己在这里试一下 "),e("a",b,[i("astexplorer"),a(n)]),i("。")]),h,q,e("ul",null,[e("li",null,[e("p",null,[i("分词：将整个代码字符串分割成语法单元数组 "),e("a",g,[i("在线分词工具"),a(n)]),i("。")])]),f]),x,e("p",null,[i("基础的东西讲了些，下面说下具体如何写插件，只做简单的介绍，感兴趣的同学可以看 "),_,i(" 官方的介绍。"),e("a",y,[i("Plugin Development"),a(n)])]),B,e("p",null,[i("我们先写一个简单的插件，把所有定义变量名为 "),P,i(" 的换成 "),S,i(" ，先从 "),e("a",T,[i("astexplorer"),a(n)]),i(" 看下 "),A,i(" 的 AST")]),k,e("p",null,[e("a",I,[i("看完这篇，你也能把 React Hooks 玩出花"),a(n)])]),e("p",null,[e("a",E,[i("Vue 组件数据通信方案总结"),a(n)])]),e("p",null,[e("a",D,[i("自动化 Web 性能优化分析方案"),a(n)])])])}const N=l(u,[["render",j],["__file","前端工程师需要了解的 Babel 知识.html.vue"]]);export{N as default};
