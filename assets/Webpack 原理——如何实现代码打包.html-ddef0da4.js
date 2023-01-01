import{_ as t,z as r,A as d,Y as e,C as n,U as a,a6 as s,Q as l}from"./framework-cb9358d9.js";const o={},p=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4eb6a01e6564840817b127265b07edd~tplv-k3u1fbpfcp-zoom-1.image",alt:""})],-1),c=e("p",null,[e("img",{src:"https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a22f7eaf4ae54e4d909fbbd2045a8d73~tplv-k3u1fbpfcp-watermark.image?",alt:"无一.webp"})],-1),u={href:"https://www.zoo.team/article/webpack-reason",target:"_blank",rel:"noopener noreferrer"},m=s(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>作为一个前端“攻城狮”，Webpack 再熟悉不过了，Webpack 能做的事太多了，可以将所有资源（包括 JS，TS，JSX，图像，字体和 CSS 等）打包后置于依赖关系中，使你可以按照需求引用依赖来使用资源。Webpack 很出色的完成了转译前端多种文件资源，分析复杂模块依赖的工作，并且我们还可以自定义 loader，自由的加载我们自己的资源，那 Webpack 是如何实现打包的呢？今天来我们一起来看下。</p><h2 id="想要知道-webpack-打包原理的我们需要提前知道两个知识点" tabindex="-1"><a class="header-anchor" href="#想要知道-webpack-打包原理的我们需要提前知道两个知识点" aria-hidden="true">#</a> 想要知道 Webpack 打包原理的我们需要提前知道两个知识点</h2><p><strong>1、什么是 require？</strong></p><p>说到 require 首先想到的可能就是 import，import 是 es6 的一个语法标准,</p><p>– require 是运行时调用，因此 require 理论上可以运用在代码的任何地方；</p><p>– import 是编译时调用，因此必须放在文件开头；</p><p>在我们使用 Webpack 进行编译的时候会使用 babel 把 import 转译成 require，在 CommonJS 中，有一个全局性方法 require()，用于加载模块, AMD、CMD 也采用的 require 方式来引用。</p><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var add = require(&amp;#39;./a.js&amp;#39;);
add(1,2)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>简单看来 require 其实就是一个函数，引用的 <code>./a.js</code> 只是函数的一个参数。</p><p><strong>2、什么是 exports？</strong></p>`,12),b={href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export",target:"_blank",rel:"noopener noreferrer"},v=s(`<h2 id="了解了require-和-exports-接下来我们就可以开始打包" tabindex="-1"><a class="header-anchor" href="#了解了require-和-exports-接下来我们就可以开始打包" aria-hidden="true">#</a> 了解了require 和 exports，接下来我们就可以开始打包</h2><p>我们先看看下面我们打包后的代码结构，我们可以发现经过打包后会出现 require 和 exports。</p><p>并不是所有的浏览器都能执行 require exports，必须自己去实现一下 require 和 exports 才能保证代码的正常运行。打包后的代码就是一个自执行函数，参数有依赖信息，以及文件的 code，执行的函数体通过 eval 执行 code。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de4eab60f54e4fb896c788f99e7bbeb9~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>总体设计图如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d9766c87c714b279a07e0336b8a6493~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><h3 id="第一步-编写我们的配置文件" tabindex="-1"><a class="header-anchor" href="#第一步-编写我们的配置文件" aria-hidden="true">#</a> 第一步：编写我们的配置文件</h3><p>配置文件中配置了我们打包的入口 entry 以及打包后的出口 output 为后面的生成文件做好准备。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const path = require(&amp;quot;path&amp;quot;);
module.exports = {
  entry: &amp;quot;./src/index.js&amp;quot;,
  output: {
    path: path.resolve(__dirname, &amp;quot;./dist&amp;quot;),//打包后输出的文件地址，需要绝对路径因此需要path
    filename:&amp;quot;main.js&amp;quot;
  },
  mode:&amp;quot;development&amp;quot;
  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="第二步-模块分析" tabindex="-1"><a class="header-anchor" href="#第二步-模块分析" aria-hidden="true">#</a> 第二步：模块分析</h3><p><strong>整体思路</strong>：可以总结来说就是利用 fs 文件读取入口文件 通过 AST 获取到 import 依赖的文件的路径，如果依赖文件 依然有依赖一直递归下去直至依赖分析清楚，维护在一个 map 里面。</p><p><strong>细节拆解</strong>：有人会有疑惑为什么用 AST 因为 AST 天生有这个功能，它的 ImportDeclaration 能帮我们快速过滤出 import 语法，当然用正则匹配也是可以的，毕竟文件读取完就是一个字符串，通过编写牛逼的正则获取文件依赖路径，但是不够 elegant。</p><h4 id="step1-新建-index-js-a-js-b-js-依赖关系如下" tabindex="-1"><a class="header-anchor" href="#step1-新建-index-js-a-js-b-js-依赖关系如下" aria-hidden="true">#</a> step1：新建 index.js，a.js，b.js 依赖关系如下</h4><p>index.js文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import { str } from &amp;quot;./a.js&amp;quot;;
console.log(\`\${str} Webpack\`)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>a.js文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import { b} from &amp;quot;./b.js&amp;quot;
export const str = &amp;quot;hello&amp;quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>b.js 文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export const b=&amp;quot;bbb&amp;quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="step2-编写-webpack" tabindex="-1"><a class="header-anchor" href="#step2-编写-webpack" aria-hidden="true">#</a> step2：编写 Webpack</h4><p><strong>模块分析</strong>：利用 AST 的 @babel/parser 将文件读取的字符串转换成 AST 树，@babel/traverse 进行语法分析，利用 ImportDeclaration 过滤出 import 找出文件依赖。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    const content = fs.readFileSync(entryFile, &amp;quot;utf-8&amp;quot;);
    const ast = parser.parse(content, { sourceType: &amp;quot;module&amp;quot; });
  
    const dirname = path.dirname(entryFile);
    const dependents = {};
    traverse(ast, {
      ImportDeclaration({ node }) {
        // 过滤出import
        const newPathName = &amp;quot;./&amp;quot; + path.join(dirname, node.source.value);
        dependents[node.source.value] = newPathName;
      }
    })
    const { code } = transformFromAst(ast, null, {
      presets: [&amp;quot;@babel/preset-env&amp;quot;]
    })
    return {
      entryFile,
      dependents,
      code
    }
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c0b00b7739e4fd588c64d945067b7fc~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>利用递归或是循环逐个 import 文件进行依赖分析，这块注意，我们是使用 for 循环实现了分析所有依赖，之所以循环可以分析所有依赖，注意 modules 的长度是变化的，当有依赖的时候 .modules.push 新的依赖，modules.length 就会变化。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> for (let i = 0; i &amp;lt; this.modules.length; i++) {
      const item = this.modules[i];
      const { dependents } = item;
      if (dependents) {
        for (let j in dependents) {
​
          this.modules.push(this.parse(dependents[j]));
        }
​
      }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="第三步-编写-webpackbootstrap-函数-生成输出文件" tabindex="-1"><a class="header-anchor" href="#第三步-编写-webpackbootstrap-函数-生成输出文件" aria-hidden="true">#</a> 第三步：编写 WebpackBootstrap 函数+生成输出文件</h3><p><strong>编写</strong> <strong>WebpackBootstrap</strong> <strong>函数</strong>：这里我们需要做的首先是 WebpackBootstrap 函数，编译后我们源代码的 import 会被解析成 require 浏览器既然不认识 require ，那我们就先声明它，毕竟 require 就是一个方法，在编写函数的时候还需要注意的是作用域隔离，防止变量污染。我们代码中 exports 也需要我们声明一下，保证代码在执行的时候 exports 已经存在。</p><p><strong>生成输出文件</strong>：生成文件的地址我们在配置文件已经写好了，再用 fs.writeFileSync 写入到输出文件夹即可。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  file(code) {
    const filePath = path.join(this.output.path, this.output.filename)
    const newCode = JSON.stringify(code);
    // 生成bundle文件内容
    const bundle = \`(function(modules){
      function require(module){
        function pathRequire(relativePath){
          return require(modules[module].dependents[relativePath])
        }
        const exports={};
        (function(require,exports,code){
          eval(code)
        })(pathRequire,exports,modules[module].code);
        return exports
      }
      require(&amp;#39;\${this.entry}&amp;#39;)
    })(\${newCode})\`;
      //  WebpackBoostrap
    // 生成文件。放入dist 目录
    fs.writeFileSync(filePath,bundle,&amp;#39;utf-8&amp;#39;)
  }
  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b962059433d544bab10fbcf782526c3a~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><h3 id="第四步-分析执行顺序" tabindex="-1"><a class="header-anchor" href="#第四步-分析执行顺序" aria-hidden="true">#</a> 第四步：分析执行顺序</h3><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f14770d340864223b609dd2b74a22b4c~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>我们可以在浏览器的控制台运行一下打包后的结果，如果能正常应该会打印出 hello Webpack。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e47f8a3b62543f78196cf40da57597b~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>通过以上的分析，我们应该对 Webpack 的大概流程有基本的了解，利用 AST 去解析代码只是本次演示的一种方式，不是 Webpack 的真实实现，Webpack 他自己有自己的 AST 解析方式，万变不离其宗都是拿到模块依赖，Webpack 生态是很完整，有兴趣的童鞋可以考虑以下三个问题：</p><ul><li>如果出现组件循环引用那又应该如何处理？</li><li>Webpack 是如何加载 loader 的？</li><li>犹大大极力推荐的 vite 可以实现按需打包，大大降低开发时候打包速度，如果是 webapck 又是应该如何实现？</li></ul><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2><p>[在 Vue 中为什么不推荐用 index 做 key](https://juejin.cn/post/7026119446162997261 &quot;在 Vue 中为什么不推荐用 index 做 key&quot;)</p><p>[浅析Web录屏技术方案与实现](https://juejin.cn/post/7028723258019020836 &quot;浅析Web录屏技术方案与实现&quot;)</p><h2 id="开源作品" tabindex="-1"><a class="header-anchor" href="#开源作品" aria-hidden="true">#</a> 开源作品</h2><ul><li>政采云前端小报</li></ul>`,43),h={href:"https://www.zoo.team/openweekly/",target:"_blank",rel:"noopener noreferrer"},f=e("ul",null,[e("li",null,"商品选择 sku 插件")],-1),g={href:"https://github.com/zcy-inc/skuPathFinder-back",target:"_blank",rel:"noopener noreferrer"},x=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),n(" 招贤纳士")],-1),k=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 60 余个前端小伙伴，平均年龄 27 岁，近 4 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),_=e("p",null,[n("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),q=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98d3aa3d1f8646a8bcda8cfd9e335a4b~tplv-k3u1fbpfcp-zoom-1.image",alt:""})],-1);function j(w,y){const i=l("ExternalLinkIcon");return r(),d("div",null,[p,c,e("p",null,[n("> 这是第 122 篇不掺水的原创，想获取更多原创好文，请搜索公众号关注我们吧~ 本文首发于政采云前端博客："),e("a",u,[n("Webpack 原理——如何实现代码打包"),a(i)])]),m,e("p",null,[n("在这里我们可以认为 exports 是一个对象，"),e("a",b,[n("MDN export "),a(i)]),n("可以看下具体用法。")]),v,e("p",null,[e("strong",null,[n("开源地址 "),e("a",h,[n("www.zoo.team/openweekly/"),a(i)])]),n(" (小报官网首页有微信交流群)")]),f,e("p",null,[e("strong",null,[n("开源地址 "),e("a",g,[n("https://github.com/zcy-inc/skuPathFinder-back/"),a(i)])])]),x,k,_,q])}const S=t(o,[["render",j],["__file","Webpack 原理——如何实现代码打包.html.vue"]]);export{S as default};
