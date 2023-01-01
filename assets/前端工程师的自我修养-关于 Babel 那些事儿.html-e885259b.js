import{_ as l,z as t,A as r,Y as e,C as a,U as i,a6 as s,Q as d}from"./framework-cb9358d9.js";const o={},u=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/22/17239e3edd804567~tplv-t2oaga2asx-image.image",alt:""})],-1),p=e("br",null,null,-1),c={href:"https://www.zoo.team/article/babel-2",target:"_blank",rel:"noopener noreferrer"},b=s('<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/1/1709497bf20d96c0~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>随着 Nodejs 的崛起，编译这个昔日在 Java、C++ 等语言中流行的词，在前端也逐渐火了起来，现在一个前端项目在开发过程中没有编译环节，总感觉这个项目是没有灵魂的。说起前端编译就不得不提前端编译界的扛把子 Babel ，大部分前端攻城狮对 Babel 并不陌生，但是在这个 Ctrl+C 和 Ctrl+V 的年代，大多数人对它也只是知道、了解或者听过，少数可能配置过 Babel，但也仅此而已。作为一个有想法和灵魂的前端攻城狮仅仅知道这些是不够的，你需要对 Babel 有一个系统的了解，今天就来聊聊 Babel 那些事儿。</p><h2 id="什么是-babel" tabindex="-1"><a class="header-anchor" href="#什么是-babel" aria-hidden="true">#</a> 什么是 Babel？</h2><p>官方的解释 Babel 是一个 JavaScript 编译器，用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前版本和旧版本的浏览器或其他环境中。简单来说 Babel 的工作就是：</p><ul><li>语法转换</li><li>通过 Polyfill 的方式在目标环境中添加缺失的特性</li><li>JS 源码转换</li></ul><h2 id="babel-的基本原理" tabindex="-1"><a class="header-anchor" href="#babel-的基本原理" aria-hidden="true">#</a> Babel 的基本原理</h2>',7),m={href:"https://segmentfault.com/a/1190000016231512?utm_source=tag-newest",target:"_blank",rel:"noopener noreferrer"},v=s('<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/1/170949352d2ba854~tplv-t2oaga2asx-image.image" alt="图片"></p><p>整个过程很清晰，但是，好多东西都是看着简单，但是实现起来贼复杂，比如这里说到的 AST，要是你觉得你对 AST 已经信手拈来了，老哥麻烦在下面留下联系方式，我要来找你要简历。言归正传，这里提一下，Babel 只负责编译新标准引入的新语法，比如 Arrow function、Class、ES Module 等，它不会编译原生对象新引入的方法和 API，比如 Array.includes，Map，Set 等，这些需要通过 Polyfill 来解决，文章后面会提到。</p><h2 id="babel-的使用" tabindex="-1"><a class="header-anchor" href="#babel-的使用" aria-hidden="true">#</a> Babel 的使用</h2><p><strong>运行 babel 所需的基本环境</strong></p><ol><li><p>babel/cli</p><p><code>npm install i \\-S @babel/cli</code></p><p>@babel/cli 是 Babel 提供的内建命令行工具。提到 @babel/cli 这里就不得不提一下 @babel/node ，这哥俩虽然都是命令行工具，但是使用场景不同，babel/cli 是安装在项目中，而 @babel/node 是全局安装。</p></li><li><p>@babel/core</p><p><code>npm install i \\-S @babel/core</code></p><p>安装完 @babel/cli 后就在项目目录下执行<code>babel test.js</code>会报找不到 @babel/core 的错误，因为 @babel/cli 在执行的时候会依赖 @babel/core 提供的生成 AST 相关的方法，所以安装完 @babel/cli 后还需要安装 @babel/core。</p><p>安装完这两个插件后，如果在 Mac 环境下执行会出现 <code>command not found: babel</code>，这是因为 @babel/cli是安装在项目下，而不是全局安装，所以无法直接使用 Babel 命令,需要在 package.json 文件中加上下面这个配置项:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;quot;scripts&amp;quot;: {\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><p>&quot;babel&quot;:&quot;babel&quot; } ```</p><pre><code>然后执行 `npm run babel ./test.js`，顺利生成代码，此时生成的代码并没有被编译，因为 Babel 将原来集成一体的各种编译功能分离出去，独立成插件，要编译文件需要安装对应的插件或者预设，我们经常看见的什么 \\@babel/preset-stage-0、\\@babel/preset-stage-1，\\@babel/preset-env 等就是干这些活的。那这些插件和预设怎么用呢？下面就要说到 Babel 的配置文件了，这些插件需要在配置文件中交代清楚，不然 Babel 也不知道你要用哪些插件和预设。\n</code></pre><p><strong>安装完基本的包后，就是配置 Babel 配置文件，Babel 的配置文件有四种形式</strong>：</p><ol><li><p>babel.config.js</p><p>在项目的根目录（<code>package.json</code> 文件所在目录）下创建一个名为 babel.config.js 的文件，并输入如下内容。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>module.exports = function (api) {\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><p>api.cache(true); const presets = [ ... ]; const plugins = [ ... ]; return { presets, plugins }; } ```</p><pre><code>[具体 babel.config.js 配置](https://www.babeljs.cn/docs/config-files#project-wide-configuration)\n</code></pre><ol start="2"><li><p>.babelrc</p><p>在你的项目中创建名为 <code>.babelrc</code> 的文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><p>&quot;presets&quot;: [...], &quot;plugins&quot;: [...] } ```</p><pre><code>[.babelrc文档](https://www.babeljs.cn/docs/config-files#file-relative-configuration)\n</code></pre>',14),g={start:"3"},h=e("p",null,".babelrc.js",-1),x={href:"https://www.babeljs.cn/docs/configuration#babelrc",target:"_blank",rel:"noopener noreferrer"},q=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const presets = [ ... ];
const plugins = [ ... ];
module.exports = { presets, plugins };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),f=e("p",null,"package.json",-1),_={href:"https://www.babeljs.cn/docs/configuration#babelrc",target:"_blank",rel:"noopener noreferrer"},y=e("code",null,"package.json",-1),j=e("div",{class:"language-text line-numbers-mode","data-ext":"text"},[e("pre",{class:"language-text"},[e("code",null,`{
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),w=s(`<p>... &quot;babel&quot;: { &quot;presets&quot;: [ ... ], &quot;plugins&quot;: [ ... ], } } \`\`\`</p><p>四种配置方式作用都一样，你就合着自己的口味来，那种看着顺眼，你就翻它。</p><h2 id="插件-plugins" tabindex="-1"><a class="header-anchor" href="#插件-plugins" aria-hidden="true">#</a> 插件(Plugins)</h2><p>插件是用来定义如何转换你的代码的。在 Babel 的配置项中填写需要使用的插件名称，Babel 在编译的时候就会去加载 node_modules 中对应的 npm 包，然后编译插件对应的语法。</p><p>.babelrc</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &amp;quot;plugins&amp;quot;: [&amp;quot;transform-decorators-legacy&amp;quot;, &amp;quot;transform-class-properties&amp;quot;]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="插件执行顺序" tabindex="-1"><a class="header-anchor" href="#插件执行顺序" aria-hidden="true">#</a> 插件执行顺序</h3><p>插件在预设(Presets) 前运行。</p><p>插件的执行顺序是从左往右执行。也就是说在上面的示例中，Babel 在进行 AST 遍历的时候会先调用 transform-decorators-legacy 插件中定义的转换方法，然后再调用 transform-class-properties 中的方法。</p><h3 id="插件传参" tabindex="-1"><a class="header-anchor" href="#插件传参" aria-hidden="true">#</a> 插件传参</h3><p>参数是由插件名称和参数对象组成的一个数组。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &amp;quot;plugins&amp;quot;: [
        [
            &amp;quot;@babel/plugin-proposal-class-properties&amp;quot;, 
            { &amp;quot;loose&amp;quot;: true }
        ]
    ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="插件名称" tabindex="-1"><a class="header-anchor" href="#插件名称" aria-hidden="true">#</a> 插件名称</h3><p>插件名称如果为 <code>@babel/plugin-XX</code>，可以使用短名称<code>@babel/XX</code> ，如果为 <code>babel-plugin-xx</code>，可以直接使用 <code>xx</code>。</p><h3 id="自定义插件" tabindex="-1"><a class="header-anchor" href="#自定义插件" aria-hidden="true">#</a> 自定义插件</h3><p>大部分时间我们都是在用别人的写的插件，但是有时候我们总是想秀一下，自己写一个 Babel 插件，那应该怎么操作呢？</p><ol><li>插件加载</li></ol><p>要致富先修路，要用自己写的插件首先得知道怎么使用自定义的插件。一种方式是将自己写的插件发布到 npm 仓库中去，然后本地安装，然后在 Babel 配置文件中配置插件名称就好了:</p><p><code>npm install @babel/plugin-myPlugin</code></p><p>.babelrc</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
 &amp;quot;plugins&amp;quot;: [&amp;quot;@babel/plugin-myPlugin&amp;quot;]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外一种方式就是不发布，直接将写好的插件放在项目中，然后在 babel 配置文件中通过访问相对路径的方式来加载插件：</p><p>.babelrc</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
 &amp;quot;plugins&amp;quot;: [&amp;quot;./plugins/plugin-myPlugin&amp;quot;]
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一种通过 npm 包的方式一般是插件功能已经完善和稳定后使用，第二种方式一般在开发阶段，本地调试时使用。</p><ol start="2"><li>编写插件</li></ol><p>插件实际上就是在处理 AST 抽象语法树，所以编写插件只需要做到下面三点：</p><ul><li><p>确认我们要修改的节点类型</p></li><li><p>找到 AST 中需要修改的属性</p></li><li><p>将 AST 中需要修改的属性用新生成的属性对象替换</p></li></ul><p>好像少了生成 AST 对象和生成源码的步骤，不急，后面会讲。说一千道一万不如一个例子来的实在，下面实现一个预计算(在编译阶段将表达式计算出来)的插件：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const result = 1 + 2;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>转换成：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const result = 3;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,32),B={href:"https://astexplorer.net/",target:"_blank",rel:"noopener noreferrer"},P=s(`<p>转换前：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/1/170949352d8e1ebc~tplv-t2oaga2asx-image.image" alt="图片"></p><p>转换后：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/1/170949352f5e06fc~tplv-t2oaga2asx-image.image" alt="图片"></p><p>找到差别，然后就到了用代码来解决问题的时候了</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>let babel = require(&amp;#39;@babel/core&amp;#39;);
let t = require(&amp;#39;babel-types&amp;#39;);
let preCalculator={
   visitor: {
       BinaryExpression(path) {
           let node = path.node;
           let left = node.left;
           let operator = node.operator;
           let right = node.right;
           if (!isNaN(left.value) &amp;amp;&amp;amp; !isNaN(right.value)) {
               let result = eval(left.value + operator + right.value);
              //生成新节点，然后替换原先的节点
               path.replaceWith(t.numericLiteral(result));
                //递归处理 如果当前节点的父节点配型还是表达式 
                if (path.parent &amp;amp;&amp;amp; path.parent.type == &amp;#39;BinaryExpression&amp;#39;) {
                   preCalculator.visitor.BinaryExpression.call(null,path.parentPath);
               }
           }
       }
   }
}

const result = babel.transform(&amp;#39;const sum = 1+2+3&amp;#39;,{
   plugins:[
       preCalculator
   ]
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),S={href:"https://blog.csdn.net/yimixgg/article/details/90023121",target:"_blank",rel:"noopener noreferrer"},k={href:"https://www.npmjs.com/package/babel-types",target:"_blank",rel:"noopener noreferrer"},C=s(`<p>上面这样写只是为了我们开发测试方便，其实最终的完整体是下面这样的：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const types = require(&amp;#39;babel-types&amp;#39;);
const visitor = {
   BinaryExpression(path) {//需要处理的节点路径
           let node=path.node;
           let left=node.left;
           let operator=node.operator;
           let right=node.right;
           if (!isNaN(left.value) &amp;amp;&amp;amp; !isNaN(right.value)) {
               let result=eval(left.value+operator+right.value);
               path.replaceWith(t.numericLiteral(result));
               if (path.parent&amp;amp;&amp;amp; path.parent.type == &amp;#39;BinaryExpression&amp;#39;) {
                   preCalculator.visitor.BinaryExpression.call(null,path.parentPath);
               }
           }
   }
}
module.exports = function(babel){
   return {
       visitor
   }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在插件中只需要修改匹配上的 AST 属性，不需要关注源码到 AST 以及新 AST 到源码的过程，这些都是 Babel 去干的事，我们干好自己的活就好了，其他的交给 babel。这也就解释了我上面的步骤中为嘛没有 AST 的生成和源码的生成，那就不是我们在插件中干的事儿。</p><h2 id="预设-presets" tabindex="-1"><a class="header-anchor" href="#预设-presets" aria-hidden="true">#</a> 预设（Presets）</h2>`,4),A={href:"https://www.babeljs.cn/docs/babel-preset-react",target:"_blank",rel:"noopener noreferrer"},T={href:"https://www.babeljs.cn/docs/babel-plugin-syntax-jsx",target:"_blank",rel:"noopener noreferrer"},E={href:"https://www.babeljs.cn/docs/babel-plugin-transform-react-jsx",target:"_blank",rel:"noopener noreferrer"},N={href:"https://www.babeljs.cn/docs/babel-plugin-transform-react-display-name",target:"_blank",rel:"noopener noreferrer"},I=s(`<p>当然我们也可以手动的在 plugins 中配置一系列的 plugin 来达到目的，就像这样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &amp;quot;plugins&amp;quot;:[&amp;quot;@babel/plugin-syntax-jsx&amp;quot;,&amp;quot;@babel/plugin-transform-react-jsx&amp;quot;,&amp;quot;@babel/plugin-transform-react-display-name&amp;quot;]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是这样一方面显得不那么优雅，另一方面增加了使用者的使用难度。如果直接使用预设就清新脱俗多了~</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &amp;quot;presets&amp;quot;:[&amp;quot;@babel/preset-react&amp;quot;]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="预设-presets-的执行顺序" tabindex="-1"><a class="header-anchor" href="#预设-presets-的执行顺序" aria-hidden="true">#</a> 预设(Presets)的执行顺序</h3><p>前面提到插件的执行顺序是从左往右，而预设的执行顺序恰好反其道行之，它是从右往左</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &amp;quot;presets&amp;quot;: [
    &amp;quot;a&amp;quot;,
    &amp;quot;b&amp;quot;,
    &amp;quot;c&amp;quot;
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它的执行顺序是 c、b、a，是不是有点奇怪，这主要是为了确保向后兼容，因为大多数用户将 &quot;es2015&quot; 放在 &quot;stage-0&quot; 之前。</p><h3 id="自定义预设-presets" tabindex="-1"><a class="header-anchor" href="#自定义预设-presets" aria-hidden="true">#</a> 自定义预设(Presets)</h3><p>这种场景一般很少，在这个拿来主义的时代，插件我们都很少写，就更别说自定义预设了。不过前面插件我们都说了怎么写了，预设咱也不能冷落她呀。</p><p>前面提到预设就是已有插件的组合，主要就是为了避免使用者配置过多的插件，通过预设把插件收敛起来，其实写起来特别简单，前提是你已经确定好要用哪些插件了。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import { declare } from &amp;quot;@babel/helper-plugin-utils&amp;quot;;
import pluginA from &amp;quot;myPluginA&amp;quot;;
import pluginB from &amp;quot;myPluginB&amp;quot;
export default declare((api, opts) =&amp;gt; {
  const pragma = opts.pragma;
  return {
    plugins: [
      [
        pluginA,
        {pragma}//插件传参
      ],
      pluginB
    ]
  };
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实就是把 Babel 配置中的 plugins 配置放到 presets 中了，实质上还是在配置 Plugins，只是写 Presets 的人帮我们配置好了。</p><h3 id="那些她认识你而你不认识她的预设" tabindex="-1"><a class="header-anchor" href="#那些她认识你而你不认识她的预设" aria-hidden="true">#</a> 那些她认识你而你不认识她的预设</h3><ol><li><p><strong>@babel/preset-stage-xxx</strong></p><p>@babel/preset-stage-xxx 是 ES 在不同阶段语法提案的转码规则而产生的预设，随着被批准为 ES 新版本的组成部分而进行相应的改变（例如 ES6/ES2015）。</p><p>提案分为以下几个阶段：</p></li></ol>`,15),F={href:"https://www.babeljs.cn/docs/babel-preset-stage-0",target:"_blank",rel:"noopener noreferrer"},J={href:"https://www.babeljs.cn/docs/babel-preset-stage-1",target:"_blank",rel:"noopener noreferrer"},R={href:"https://www.babeljs.cn/docs/babel-preset-stage-2",target:"_blank",rel:"noopener noreferrer"},D={href:"https://www.babeljs.cn/docs/babel-preset-stage-3",target:"_blank",rel:"noopener noreferrer"},V=e("li",null,"stage-4 - 完成（Finished）：将添加到下一个年度版本发布中",-1),L=s(`<ol start="2"><li><p><strong>@babel/preset-es2015</strong></p><p>preset-es2015 是仅包含 ES6 功能的 Babel 预设。</p><p>实际上在 Babel7 出来后上面提到的这些预设 stage-x，preset-es2015 都可以废弃了，因为 @babel/preset-env 出来一统江湖了。</p></li><li><p><strong>@babel/preset-env</strong></p><p>前面两个预设是从 ES 标准的维度来确定转码规则的，而 @babel/preset-env 是根据浏览器的不同版本中缺失的功能确定代码转换规则的，在配置的时候我们只需要配置需要支持的浏览器版本就好了，@babel/preset-env 会根据目标浏览器生成对应的插件列表然后进行编译：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><p>&quot;presets&quot;: [ [&quot;env&quot;, { &quot;targets&quot;: { &quot;browsers&quot;: [&quot;last 10 versions&quot;, &quot;ie &gt;= 9&quot;] } }], ], ... } \`\`\`</p><pre><code>在默认情况下 \\@babel/preset-env 支持将 JS 目前最新的语法转成 ES5，但需要注意的是，如果你代码中用到了还没有成为 JS 标准的语法，该语法暂时还处于 stage 阶段，这个时候还是需要安装对应的 stage 预设，不然编译会报错。

\`\`\`
{
</code></pre><p>&quot;presets&quot;: [ [&quot;env&quot;, { &quot;targets&quot;: { &quot;browsers&quot;: [&quot;last 10 versions&quot;, &quot;ie &gt;= 9&quot;] } }], ], &quot;stage-0&quot; }<br> \`\`\`</p><pre><code>虽然可以采用默认配置，但如果不需要照顾所有的浏览器，还是建议你配置目标浏览器和环境，这样可以保证编译后的代码体积足够小，因为在有的版本浏览器中，新语法本身就能执行，不需要编译。\\@babel/preset-env 在默认情况下和 preset-stage-x 一样只编译语法，不会对新方法和新的原生对象进行转译，例如：

\`\`\`
const arrFun = ()=&amp;gt;{}
const arr = [1,2,3]
console.log(arr.includes(1))
\`\`\`

转换后

\`\`\`
&amp;quot;use strict&amp;quot;;

var arrFun = function arrFun() {};

var arr = [1, 2, 3];
console.log(arr.includes(1));
\`\`\`

箭头函数被转换了，但是 Array.includes 方法，并没有被处理，这个时候要是程序跑在低版本的浏览器上，就会出现 \`includes is not function\` 的错误。这个时候就需要 polyfill 闪亮登场了。
</code></pre><h2 id="polyfill" tabindex="-1"><a class="header-anchor" href="#polyfill" aria-hidden="true">#</a> Polyfill</h2><p><code>polyfill</code> 的翻译过来就是垫片，垫片就是垫平不同浏览器环境的差异，让大家都一样。</p><p><strong>@babel/polyfill</strong></p><p><code>@babel/polyfill</code> 模块可以模拟完整的 ES5 环境。</p><p>安装:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npm install --save @babel/polyfill

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意 @babel/polyfill 不是在 Babel 配置文件中配置，而是在我们的代码中引入。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import &amp;#39;@babel/polyfill&amp;#39;;
const arrFun = ()=&amp;gt;{}
const arr = [1,2,3]
console.log(arr.includes(1))
Promise.resolve(true)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>require(&amp;quot;@babel/polyfill&amp;quot;);
var arrFun = function arrFun() {};
var arr = [1, 2, 3];
console.log(arr.includes(1));
Promise.resolve(true);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样在低版本的浏览器中也能正常运行了。</p><p>不知道大家有没有发现一个问题，这里是<code>require(&amp;quot;@babel/polyfill&amp;quot;)</code>将整个 @babel/polyfill 加载进来了，但是在这里我们需要处理 Array.includes 和 Promise 就好了，如果这样就会导致我们最终打出来的包体积变大，显然不是一个最优解。要是能按需加载就好了。其实 Babel 早就为我们想好了。</p><p><strong>useBuiltIns</strong></p><p>回过头来再说 @babel/preset-env，他出现的目的就是实现民族大统一，连 stage-x 都干掉了，又怎么会漏掉 Polyfill 这一功能，在 @babel/preset-env 的配置项中提供了 useBuiltIns 这一参数，只要在使用 @babel/preset-env 的时候带上他，Babel 在编译的时候就会自动进行 Polyfill ，不再需要手动的在代码中引入@babel/polyfill 了，同时还能做到按需加载</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &amp;quot;presets&amp;quot;: [
    &amp;quot;@babel/preset-flow&amp;quot;,
    [
      &amp;quot;@babel/preset-env&amp;quot;,
      {
        &amp;quot;targets&amp;quot;: {
          &amp;quot;node&amp;quot;: &amp;quot;8.10&amp;quot;
        },
        &amp;quot;corejs&amp;quot;: &amp;quot;3&amp;quot;, // 声明 corejs 版本
        &amp;quot;useBuiltIns&amp;quot;: &amp;quot;usage&amp;quot;
      }
    ]
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，这里需要配置一下 corejs 的版本号，不配置编译的时候会报警告。讲都讲到这里了就再顺便提一嘴 useBuiltIns 的机构参数：</p><ul><li>false：此时不对Polyfill 做操作，如果引入 @babel/polyfill 则不会按需加载，会将所有代码引入</li><li>usage：会根据配置的浏览器兼容性，以及你代码中使用到的 API 来进行 Polyfill ，实现按需加载</li><li>entry：会根据配置的浏览器兼容性，以及你代码中使用到的 API 来进行 Polyfill ，实现按需加载，不过需要在入口文件中手动加上<code>import &amp;#39; @babel/polyfill&amp;#39;</code></li></ul><p>编译后：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;quot;use strict&amp;quot;;
require(&amp;quot;core-js/modules/es.array.includes&amp;quot;);
require(&amp;quot;core-js/modules/es.object.to-string&amp;quot;);
require(&amp;quot;core-js/modules/es.promise&amp;quot;);
var arrFun = function arrFun() {};
var arr = [1, 2, 3];
console.log(arr.includes(1));
Promise.resolve(true);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个时候我们再借助 Webpack 编译后，产出的代码体积会大大减小。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/1/170949352f362c18~tplv-t2oaga2asx-image.image" alt="图片"></p><p>说完了上面这些你以为我就说完了吗？</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/1/1709493532936c3a~tplv-t2oaga2asx-image.image" alt="图片"></p><p>其实 Babel 在编译中会使用一些辅助函数，比如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class Person {
  constructor(){}
  say(word){
    console.log(&amp;quot;:::&amp;quot;,word)
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;quot;use strict&amp;quot;;
require(&amp;quot;core-js/modules/es.object.define-property&amp;quot;);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(&amp;quot;Cannot call a class as a function&amp;quot;); } }
function _defineProperties(target, props) { for (var i = 0; i &amp;lt; props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (&amp;quot;value&amp;quot; in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
var Person =
/*#__PURE__*/
function () {
  function Person() {
    _classCallCheck(this, Person);
  }
  _createClass(Person, [{
    key: &amp;quot;say&amp;quot;,
    value: function say(word) {
      console.log(&amp;quot;:::&amp;quot;, word);
    }
  }]);
  return Person;
}();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些方法会被 <code>inject</code> 到每个文件中，没法做到复用，这样也会导致打包体积的增加。</p><p>没事儿，逢山开路遇水搭桥，是时候让<code>@babel/plugin-transform-runtime</code> 登场了。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/1/17094935330a142c~tplv-t2oaga2asx-image.image" alt="图片"></p><p><strong>@babel/plugin-transform-runtime</strong></p><p>@babel/plugin-transform-runtime 可以让 Babel 在编译中复用辅助函数，从而减小打包文件体积，不信你看：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>顺便说一下，这一对 CP 要同时出现，形影不离，所以安装的时候你就一起装上吧~</p><p>配置 Babel：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &amp;quot;presets&amp;quot;: [
        [
            &amp;quot;@babel/preset-env&amp;quot;,
            {
                &amp;quot;useBuiltIns&amp;quot;: &amp;quot;usage&amp;quot;,
                &amp;quot;corejs&amp;quot;: 3
            }
        ]
    ],
    &amp;quot;plugins&amp;quot;: [
       &amp;quot;@babel/plugin-transform-runtime&amp;quot;
    ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;quot;use strict&amp;quot;;
var _interopRequireDefault = require(&amp;quot;@babel/runtime/helpers/interopRequireDefault&amp;quot;);
var _classCallCheck2 = _interopRequireDefault(require(&amp;quot;@babel/runtime/helpers/classCallCheck&amp;quot;));
var _createClass2 = _interopRequireDefault(require(&amp;quot;@babel/runtime/helpers/createClass&amp;quot;));
var Person =
/*#__PURE__*/
function () {
  function Person() {
    (0, _classCallCheck2[&amp;quot;default&amp;quot;])(this, Person);
  }
  (0, _createClass2[&amp;quot;default&amp;quot;])(Person, [{
    key: &amp;quot;say&amp;quot;,
    value: function say(word) {
      console.log(&amp;quot;:::&amp;quot;, word);
    }
  }]);
  return Person;
}();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些用到的辅助函数都从 @babel/runtime 中去加载，这样就可以做到代码复用了。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/1/17094935902ac61f~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h2><p>在这个拿来主义的社会，有时候知其然的同时也需要知其所以然。希望这篇关于 Babel 知识的梳理对你有帮助。</p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,48),M={href:"https://juejin.cn/post/6844903950508883982",target:"_blank",rel:"noopener noreferrer"},X={href:"https://juejin.cn/post/6844903988081475591",target:"_blank",rel:"noopener noreferrer"},U={href:"https://juejin.cn/post/6844904038555729927",target:"_blank",rel:"noopener noreferrer"},W=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),a(" 招贤纳士")],-1),z=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),Z=e("p",null,[a("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),O=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image",alt:""})],-1);function Q(Y,G){const n=d("ExternalLinkIcon");return t(),r("div",null,[u,e("p",null,[a("> 这是第 40 篇不掺水的原创，想获取更多原创好文，请扫 👆上方二维码关注我们吧~"),p,a(" > 本文首发于政采云前端团队博客："),e("a",c,[a("前端工程师的自我修养-关于 Babel 那些事儿"),i(n)])]),b,e("p",null,[a("原理很简单，核心就是 "),e("a",m,[a("AST (抽象语法树)"),i(n)]),a("。首先将源码转成抽象语法树，然后对语法树进行处理生成新的语法树，最后将新语法树生成新的 JS 代码，整个编译过程可以分为 3 个阶段 parsing (解析)、transforming (转换)、generating (生成)，都是在围绕着 AST 去做文章，话不多说上图：")]),v,e("ol",g,[e("li",null,[h,e("p",null,[a("与 "),e("a",x,[a(".babelrc"),i(n)]),a(" 的配置相同，你可以使用 JavaScript 语法编写。")]),q]),e("li",null,[f,e("p",null,[a("还可以选择将 "),e("a",_,[a(".babelrc"),i(n)]),a(" 中的配置信息写到 "),y,a(" 文件中")]),j])]),w,e("p",null,[a("在写插件前你需要明确转换前后的 AST 长什么样子，就好像整容一样，你总得选个参考吧。 "),e("a",B,[a("AST explorer"),i(n)]),a(" 你值得拥有。")]),P,e("p",null,[a("上面这段代码，Babel 在编译的时候会"),e("a",S,[a("深度遍历"),i(n)]),a(" AST 对象的每一个节点，采用访问者的模式，每个节点都会去访问插件定义的方法，如果类型和方法中定义的类型匹配上了，就进入该方法修改节点中对应属性。在节点遍历完成后，新的 AST 对象也就生成了。"),e("a",k,[a("babel-types"),i(n)]),a(" 提供 AST 树节点类型对象。")]),C,e("p",null,[a("预设就是一堆插件(Plugin)的组合，从而达到某种转译的能力，就比如 react 中使用到的 "),e("a",A,[a("@babel/preset-react"),i(n)]),a(" ，它就是下面几种插件的组合。")]),e("ul",null,[e("li",null,[e("a",T,[a("@babel/plugin-syntax-jsx"),i(n)])]),e("li",null,[e("a",E,[a("@babel/plugin-transform-react-jsx"),i(n)])]),e("li",null,[e("a",N,[a("@babel/plugin-transform-react-display-name"),i(n)])])]),I,e("ul",null,[e("li",null,[e("a",F,[a("stage-0"),i(n)]),a(" - 设想（Strawman）：只是一个想法，可能有 Babel 插件，stage-0 的功能范围最广大，包含 stage-1 , stage-2 以及 stage-3 的所有功能")]),e("li",null,[e("a",J,[a("stage-1"),i(n)]),a(" - 建议（Proposal）：这是值得跟进的")]),e("li",null,[e("a",R,[a("stage-2"),i(n)]),a(" - 草案（Draft）：初始规范")]),e("li",null,[e("a",D,[a("stage-3"),i(n)]),a(" - 候选（Candidate）：完成规范并在浏览器上初步实现")]),V]),L,e("p",null,[e("a",M,[a("前端工程实践之可视化搭建系统（一）"),i(n)])]),e("p",null,[e("a",X,[a("可能是最全的 “文本溢出截断省略” 方案合集"),i(n)])]),e("p",null,[e("a",U,[a("图文并茂，为你揭开“单点登录“的神秘面纱"),i(n)])]),W,z,Z,O])}const K=l(o,[["render",Q],["__file","前端工程师的自我修养-关于 Babel 那些事儿.html.vue"]]);export{K as default};
