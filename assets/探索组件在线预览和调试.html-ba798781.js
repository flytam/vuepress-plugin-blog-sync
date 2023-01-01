import{_ as s,z as l,A as d,Y as e,C as i,U as a,a6 as r,Q as t}from"./framework-cb9358d9.js";const o={},c=r(`<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bfefad3ee3474e3a8a461251aaddceb4~tplv-k3u1fbpfcp-watermark.image?" alt="政采云技术团队.png"></p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0f54a21fcf14baa85523b4ccbba2a52~tplv-k3u1fbpfcp-watermark.image?" alt="梓安.png"></p><p>&gt; 这是第 160 篇不掺水的原创，想获取更多原创好文，请搜索公众号【政采云前端团队】关注我们吧~</p><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><p>前端人员在开发过程中，如何快速<strong>感知</strong>到组件的功能和属性？现状是通过阅读组件相关文档，好在基础组件库的文档相对完整和清晰，手动补全示例。业务组件相关文档目前只能在内部 NPM 私库上查看，静态的 API 文档，没有组件的 Demo。对于非前端人员，如何预览和调试组件呢？比如：某一天，产品想提前调研其它业务线的业务组件功能能否满足业务诉求；业务组件开发完成，测试和设计可以介入组件相关功能的验证；运营人员可以在低代码搭建平台，预览和调试相关组件等。</p><p>基于以上痛点问题，我们从需求点出发，逐步探索实现方案。</p><h2 id="需求" tabindex="-1"><a class="header-anchor" href="#需求" aria-hidden="true">#</a> 需求</h2><h3 id="场景分析" tabindex="-1"><a class="header-anchor" href="#场景分析" aria-hidden="true">#</a> 场景分析</h3><h4 id="功能" tabindex="-1"><a class="header-anchor" href="#功能" aria-hidden="true">#</a> 功能</h4><ul><li>组件预览</li><li>组件调试 面向不同的用户群体，组件功能调试的交互分为两种，一种是<strong>代码调试</strong>，即通过代码编辑器修改示例代码，另一种是组件 <strong>schema 调试</strong>，通过 schema JSON 数据来描述组件的属性，然后 通过 schema 渲染器渲染成组件属性面板，这样非研发人员也可以方便的调试组件功能。</li></ul><h4 id="分类" tabindex="-1"><a class="header-anchor" href="#分类" aria-hidden="true">#</a> 分类</h4><ul><li>基础组件</li><li>业务组件</li><li>低代码组件 大致整理了下：</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08984f1dad7d4d50b3ab0a58ccfa16ac~tplv-k3u1fbpfcp-zoom-1.image" alt="组件预览和调试-组件分类-导出.png"></p><p>这里的<strong>低代码组件</strong>是指提供给低代码搭建平台使用的自定义组件，目前公司的低代码搭建平台主要有“鲁班”，对此感兴趣的小伙伴可以翻一下往期关于 <strong>“鲁班”</strong> 的文章。</p><p>针对组件<strong>schema 调试</strong>，低代码组件本身自带 schema 文件，如：“鲁班”自定义组件会有一份 schema.json 文件，需要开发者去编写和维护这份文件。</p><p>如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &amp;quot;props&amp;quot;: {
    &amp;quot;linkList&amp;quot;: {
      &amp;quot;group&amp;quot;: &amp;quot;链接配置&amp;quot;,
      &amp;quot;title&amp;quot;: &amp;quot;链接列表&amp;quot;,
      &amp;quot;type&amp;quot;: &amp;quot;array&amp;quot;,
      &amp;quot;fields&amp;quot;: [
        {
          &amp;quot;name&amp;quot;: &amp;quot;imageAddress&amp;quot;,
          &amp;quot;title&amp;quot;: &amp;quot;图链接图片地址&amp;quot;,
          &amp;quot;type&amp;quot;: &amp;quot;string&amp;quot;
        },
        {
          &amp;quot;name&amp;quot;: &amp;quot;imageLink&amp;quot;,
          &amp;quot;title&amp;quot;: &amp;quot;链接跳转地址&amp;quot;,
          &amp;quot;type&amp;quot;: &amp;quot;string&amp;quot;
        }   
      ]
    }
  },
  &amp;quot;models&amp;quot;: {
    &amp;quot;linkList&amp;quot;: [
      {
        &amp;quot;imageAddress&amp;quot;: &amp;quot;&amp;quot;,
        &amp;quot;imageLink&amp;quot;: &amp;quot;&amp;quot;
      },
      {
        &amp;quot;imageAddress&amp;quot;: &amp;quot;&amp;quot;,
        &amp;quot;imageLink&amp;quot;: &amp;quot;&amp;quot;
       }
    ]
  }   
}
​
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，业务组件也需要同一份 schema 协议的 JSON 文件，这样就可以动态调试组件的属性。但是，不会让开发组件的同学去手动编写。</p><p>自动生成 schema 文件大致思路：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44db4b0c13c34831872c27bf7ea8b22c~tplv-k3u1fbpfcp-zoom-1.image" alt="组件在线预览和调试-自动生成 schema 文件-导出.png"></p><h4 id="应用" tabindex="-1"><a class="header-anchor" href="#应用" aria-hidden="true">#</a> 应用</h4><ul><li>基础组件的示例在线预览和调试</li><li>业务组件的 Demo 在线预览和调试</li></ul><h3 id="面向人群" tabindex="-1"><a class="header-anchor" href="#面向人群" aria-hidden="true">#</a> 面向人群</h3><ul><li>研发</li><li>非研发：产品、测试、运营 研发主要用到组件的调试功能，而像运营和产品这样非研发人员，他们的诉求简单快捷，就是直接预览该组件，并且可以通过修改组件的 props 看到实时效果，那么问题来了，如何修改组件当前的 props 属性？玩过低代码的同学应该很清楚，有个组件<strong>属性面板</strong>。基于以上，我们可能需要代码编辑面板、组件属性面板以及组件功能模块。</li></ul><p>大致画了下页面的结构图：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd38c6f6cf1449d7a3787312587e0124~tplv-k3u1fbpfcp-zoom-1.image" alt="组件在线预览和调试-界面图-导出.png"></p><h2 id="调研" tabindex="-1"><a class="header-anchor" href="#调研" aria-hidden="true">#</a> 调研</h2><h3 id="市面上成熟的产品" tabindex="-1"><a class="header-anchor" href="#市面上成熟的产品" aria-hidden="true">#</a> 市面上成熟的产品</h3><ul><li>Stackblitz 一款非常优秀的在线 IDE，移植了很多 VS Code 的功能和特性。目前支持了很多框架模版，如：React、Angular、Vue3、Next.js、Nuxt3 及自定义模版等，其中， StackBlitz 提供的 WebContainers 可以在浏览器端运行 Node.js 环境。</li><li>CodeSandbox 为 Web 应用程序而开发而构建的在线编辑器，同样也提供了多种模版方便开发者使用。大部分核心代码也开源了，网上也有相关的原理解析和搭建在线 IDE 方案的资料，有兴趣的同学可以去看看。</li></ul><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>需求和应用场景已经很明确了，考虑到不同的用户群体，交互方式也有差别，重点是组件调试功能的差异性，对于研发人员可通过代码编辑器去修改代码达到调试效果，非研发人员则通过修改属性面板的组件属性值。而市面上的成熟产品会提供一些设计思路，具体实现方案下面会细讲。</p><h2 id="方案" tabindex="-1"><a class="header-anchor" href="#方案" aria-hidden="true">#</a> 方案</h2><p>从页面结构图，我们先聊下代码编辑器、组件属性面板、工具栏、预览区的设计方案。</p><h4 id="代码编辑器" tabindex="-1"><a class="header-anchor" href="#代码编辑器" aria-hidden="true">#</a> 代码编辑器</h4><p>目前主流的有两种：</p><ul><li>MonacoEditor</li><li>Codemirror MonacoEditor 相对来说功能强大，集成度高，但随之带来的是比较重，而 Codemirror 轻量小巧，核心文件压缩后仅 70+ KB 左右，根据所需要支持的语言按需打包。</li></ul><p>两种代码编辑器都能满足我们的需求，在线修改一些组件 Demo 的部分代码，其实 Codemirror 够用了。</p><h4 id="组件属性面板" tabindex="-1"><a class="header-anchor" href="#组件属性面板" aria-hidden="true">#</a> 组件属性面板</h4><p>了解低代码搭建平台的朋友应该很熟悉了，其实就是通过表单去动态修改组件的属性参数，因此，需要一份通用的 schema 协议，来描述组件的自定义属性。可以由<strong>鲁班</strong>和大数据搭建平台那边提供 schema 数据，我们负责渲染即可。</p><p>大致列了下组件属性的类型和操作表单类型的对应关系：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30bc75c06daa4ec1a76c4c17c4617fc2~tplv-k3u1fbpfcp-zoom-1.image" alt="组件预览和调试-属性面板-导出.png"></p><h4 id="工具栏" tabindex="-1"><a class="header-anchor" href="#工具栏" aria-hidden="true">#</a> 工具栏</h4><p>工具栏包含的主要功能有：</p><ul><li>账号登陆</li><li>接口代理 业务组件和低代码组件需要被调试时，比如测试人员需要介入测试组件功能，需要用到<strong>账号登陆</strong>和<strong>接口代理功能</strong>。组件内涉及到业务接口的请求头需要携带当前登陆用户的 token 信息，先通过请求 oauth 接口拿到对应的 token，然后塞到请求头的 Authorization 字段上。</li></ul><p>上面实现的前提是需要一个代理服务，在本地开发环境我们可以用 <strong>http-proxy</strong>插件创建本地代理服务，那么问题来了，在浏览器端如何做代理服务？</p><p>目前主流的方案都是通过 Chrome 插件形式，需要用户手动填写代理接口等信息。在我们的场景下，这个方案对用户体验显然不够友好。还有个方案可以利用浏览器的黑科技 —— <strong>Service Worker</strong>，它可以拦截网页发出的请求，并能自定义返回内容，相当于在浏览器内部实现了一个反向代理。</p><h4 id="预览区" tabindex="-1"><a class="header-anchor" href="#预览区" aria-hidden="true">#</a> 预览区</h4><p>核心会涉及到两点：</p><ul><li>容器</li><li>通信 容器是指页面容器，业界通用做法都是通过 iframe，将编译好的组件代码挂载到 iframe 里一个 root 节点上，主要有环境隔离和动态生成预览页面的访问链接作用。编辑器、核心包、预览区之间的通信可以用 postMessage。</li></ul><p>通信时序图：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d3c6df9ec5e494ebc6559c25d467036~tplv-k3u1fbpfcp-zoom-1.image" alt="组件预览和调试-通信.png"></p><h4 id="核心包" tabindex="-1"><a class="header-anchor" href="#核心包" aria-hidden="true">#</a> 核心包</h4><p>设计思路，主要参考了 CodeSandbox 的核心源码，主要涉及到代码转译和代码执行。核心模块有 Manger、Transpiler、Preset、Transpiled-module、Runtime。</p><p>架构图：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c1842b6b80e446dbe3d62debd4e314a~tplv-k3u1fbpfcp-zoom-1.image" alt="组件预览和调试架构图-导出.png"></p><p>大致流程：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4de5229d7f9747138764c3d681c04d13~tplv-k3u1fbpfcp-zoom-1.image" alt="组件在线预览和调试-核心包流程图-导出.png"></p><h4 id="manger-模块" tabindex="-1"><a class="header-anchor" href="#manger-模块" aria-hidden="true">#</a> Manger 模块</h4><p>顾名思义“管理者“，即管理其它核心模块，主要负责代码转译和执行的一系列过程。</p><p>核心方法有：</p><ul><li><code>addTranspiledModule</code></li><li><code>resolveTranspiledModuleSync</code></li><li><code>resolveTranspiledModuleAsync</code></li><li><code>evaluateTranspiledModule</code> 首先将转译后的模块缓存起来放到 <code>transpiledModules</code> 对象 ，需要的话可以从缓存里同步或异步加载转译后的模块，如果需要执行转译的模块，可以调用 <code>evaluateTranspiledModule</code> 方法。</li></ul><p><code>transpiledModules</code> 的类型定义：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>type IModule = {
  path: string;
  url?: any;
  code: string;
  requires?: Array&amp;lt;string&amp;gt;;
  parent?: Module;
};
​
interface ITranspiledModules {
    [path: string]: {
      module: IModule;
      tModules: {
        [query: string]: ITranspiledModule; // ITranspiledModule 类型定义放在 Transpiled-module 模块
      };
    };
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="transpiler-模块" tabindex="-1"><a class="header-anchor" href="#transpiler-模块" aria-hidden="true">#</a> Transpiler 模块</h4><p>类比 Webpack 的 loader，对指定类型的文件进行编译，如：Babel、Typescript、vue、tsx、jsx 等。</p><p>介绍下部分内置的 Transpiler 模块：</p><ul><li><code>babelTranspiler</code></li><li><code>stylesTranspiler</code></li><li><code>rawTranspiler</code></li><li><code>noopTranspiler</code></li><li><code>vueTranspiler</code> <code>rawTranspiler</code> 跟 Webpack 的 raw-loader 作用一样，将模块的内容作为字符串导入，从而实现静态资源内联。</li></ul><p>实现原理也很简单：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>module.exports = JSON.stringify(sourceCode)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>babelTranspiler</code> 这里实现了简化版，script 标签引入 bable-standalone.js，拿到全局对象 Babel。</p><p>部分核心代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import babelPluginRenameImports from &amp;#39;./plugins/babel-plugin-rename-imports&amp;#39;;
​
const transpiledCode = window.Babel.transform(code, {
  plugins: [babelPluginRenameImports],
  presets: [&amp;#39;es2015&amp;#39;, &amp;#39;es2016&amp;#39;, &amp;#39;es2017&amp;#39;],
}).code;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>vueTranspiler</code> ，这里默认是 vue2.0 版本，核心依赖了 <code>vue-template-compiler</code>、<code>vue-template-es2015-compiler</code>。</p><p>将 vue 单文件组件转换为 SFC 对象：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import * as compiler from &amp;#39;vue-template-compiler&amp;#39;;
import type {SFCDescriptor} from &amp;#39;vue-template-compiler&amp;#39;;
​
const sfc:SFCDescriptor = compiler.parseComponent(content, { pad: &amp;#39;line&amp;#39; });
​
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解析 Vue template 部分核心代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import * as compiler from &amp;#39;vue-template-compiler&amp;#39;;
import transpile from &amp;#39;vue-template-es2015-compiler&amp;#39;;   
  
function vueTemplateCompiler(html, options) {
  const bubleOptions = options.buble;
  const vueOptions = options.vueOptions || {};
  const userModules = vueOptions.compilerModules || options.compilerModules;
  const stripWith = bubleOptions.transforms.stripWith !== false;
  const { stripWithFunctional } = bubleOptions.transforms;
  const staticRenderFns = compiled.staticRenderFns.map((fn) =&amp;gt; 
     toFunction(fn, stripWithFunctional)
  ); // 静态渲染函数放到数组中
  const compilerOptions: compiler.CompilerOptionsWithSourceRange = {
    preserveWhitespace: options.preserveWhitespace, // 是否保留HTML标记之间的所有空白字符
    modules: defaultModules.concat(userModules || []), // 自定义编译模版 
    directives: vueOptions.compilerDirectives || options.compilerDirectives || {}, // 自定义指令 
    comments: options.hasComment, // 是否保留注释
    scopeId: options.hasScoped ? options.id : null, / 
  };
  const compiled = compiler.compile(html, compilerOptions);
  
  // 生成渲染函数和静态子树
  let code = transpile(
    &amp;#39;var render = &amp;#39; +
      toFunction(compiled.render, stripWithFunctional) +
    &amp;#39;\\n&amp;#39; +
    &amp;#39;var staticRenderFns = [&amp;#39; + 
      staticRenderFns.join(&amp;#39;,&amp;#39;) +
     &amp;#39;]&amp;#39;) + &amp;#39;\\n&amp;#39;;
    // mark with stripped (this enables Vue to use correct runtime proxy detection)
    if (stripWith) {
      code += \`render._withStripped = true\\n\`;
    }
​
    const exports = \`{ render: render, staticRenderFns: staticRenderFns }\`;
    code += \`module.exports = \${exports}\`;
  
    return code;
}
​
function toFunction(code, stripWithFunctional) {
  return &amp;#39;function (&amp;#39; + (stripWithFunctional ? &amp;#39;_h,_vm&amp;#39; : &amp;#39;&amp;#39;) + &amp;#39;) {&amp;#39; + code + &amp;#39;}&amp;#39;;
}
​
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Vue 在渲染阶段将模板编译为 AST，然后根据 AST 生成 render 函数，底层通过调用 render 函数会生成 VNode 创建虚拟 DOM。</p><h4 id="preset-模块" tabindex="-1"><a class="header-anchor" href="#preset-模块" aria-hidden="true">#</a> Preset 模块</h4><p>组件预设构建模版，针对不同组件的框架类型，如：Vue2、React 等，预设默认该类型组件所需的 <code>Transpiler</code> 模块。类似于 vue-cli、create-react-app。</p><p>核心方法：</p><ul><li><code>registerTranspiler</code></li><li><code>getTranspilers</code> <code>registerTranspiler</code> 作用是注册 Transpiler 模块。</li></ul><p>部分伪代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vuePreset.registerTranspiler(
  (module) =&amp;gt; /.(m|c)?jsx?$/.test(module.path),
  [{ transpiler: babelTranspiler }]
);
vuePreset.registerTranspiler(
  (module) =&amp;gt; /.vue$/.test(module.path),
  [{ transpiler: vueTranspiler }]
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="transpiled-module-模块" tabindex="-1"><a class="header-anchor" href="#transpiled-module-模块" aria-hidden="true">#</a> Transpiled-module 模块</h4><p>即转译后的模块，维护转译的结果、代码执行的结果、依赖的模块信息，负责驱动具体模块的转译(调用 Transpiler)和执行。</p><h4 id="runtime-模块" tabindex="-1"><a class="header-anchor" href="#runtime-模块" aria-hidden="true">#</a> Runtime 模块</h4><p>执行转译后的模块入口，使用 eval 执行入口文件，若遇到 require 函数，加载转译后的依赖模块然后使用 eval 执行执行。</p><p>核心代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export default function (
  code: string,
  require: Function,
  module: { exports: any },
  env: Object = {},
  globals: Object = {},
  { asUMD = false }: { asUMD?: boolean } = {}
) {
  const { exports } = module;
  
  const g = typeof window === &amp;#39;undefined&amp;#39; ? self : window;
  const global = g;
  g.global = global;
  
  // 兼容 Node.js 环境，列举了一部分
  const process = {
    env: { NODE_ENV: &amp;#39;development&amp;#39;, ...env },
    cwd: () =&amp;gt; { return &amp;#39;/&amp;#39; },
    umask: () =&amp;gt; { return 0 }
  };
  
  // 全局变量
  const allGlobals: { [key: string]: any } = {
    require, // require 函数
    module,
    exports,
    process,
    global,
    ...globals,
  };
​
  // 是否 UMD 模块
  if (asUMD) {
    delete allGlobals.module;
    delete allGlobals.exports;
    delete allGlobals.global;
  }
  
  const allGlobalKeys = Object.keys(allGlobals);
  const globalsCode = allGlobalKeys.length ? allGlobalKeys.join(&amp;#39;, &amp;#39;) : &amp;#39;&amp;#39;;
  const globalsValues = allGlobalKeys.map((k) =&amp;gt; allGlobals[k]);
  
  const newCode = \`(function $csb$eval(\` + globalsCode + \`) {\` + code + \`\\n})\`;
  (0, eval)(newCode).apply(allGlobals.global, globalsValues);
​
}
​
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="小结-1" tabindex="-1"><a class="header-anchor" href="#小结-1" aria-hidden="true">#</a> 小结</h3><p>从页面功能模块到组件的构建核心包设计，相信各位看官已经有了初步的了解。有两点没有提到，在这里简单补充下。</p><p>第一点是依赖包的数据源问题，简单粗暴点就是创建 manifest 文件，事先预存一份底层通用的依赖包数据，如：Babel 插件相关等，如果需要动态添加依赖包，可以使用 import-maps 特性。</p><p>第二点在 Transpiler 模块没有提到针对 react 组件的构建方案，添加相关 Babel 插件就好了，如：<code>transform-runtime</code> 、<code>@babel/plugin-transform-react-jsx-source</code> 等。</p><h2 id="最后" tabindex="-1"><a class="header-anchor" href="#最后" aria-hidden="true">#</a> 最后</h2><p>背景、需求、调研、方案这四个层面，其中背景和需求更多是从产品的角度去思考和设计，这样做出来的东西才更符合用户需求和提升用户体验。我们技术人员不仅仅只关心技术层面的设计，更多时候还要从产品的角度去思考。</p><p>组件作为项目开发不可分割的一部分，从基础组件到业务组件，我们前端开发人员每天都在跟组件打交道。围绕着组件我们可以有很多专题，如何打造高质量组件？如何提升组件的复用率？如何提升组件的感知度？等等，贯穿组件的整个生命周期，那么如何治理好组件，需要我们共同努力和思考。</p><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,98),p={href:"https://github.com/codesandbox/codesandbox-client/tree/master/packages/sandpack-core",target:"_blank",rel:"noopener noreferrer"},u={href:"https://www.yuque.com/wangxiangzhong/aob8up/nb1gp2",target:"_blank",rel:"noopener noreferrer"},m=e("h2",{id:"推荐阅读",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#推荐阅读","aria-hidden":"true"},"#"),i(" 推荐阅读")],-1),v={href:"https://juejin.cn/post/7143025612267978760",target:"_blank",rel:"noopener noreferrer"},b={href:"https://juejin.cn/post/7140422304920109092",target:"_blank",rel:"noopener noreferrer"},h={href:"https://juejin.cn/post/7135217402983235592",target:"_blank",rel:"noopener noreferrer"},g={href:"https://juejin.cn/post/7132628898453880840",target:"_blank",rel:"noopener noreferrer"},f={href:"https://www.zoo.team/article/http-referer",target:"_blank",rel:"noopener noreferrer"},x=e("h2",{id:"开源作品",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#开源作品","aria-hidden":"true"},"#"),i(" 开源作品")],-1),_=e("ul",null,[e("li",null,"政采云前端小报")],-1),q={href:"https://www.zoo.team/openweekly/",target:"_blank",rel:"noopener noreferrer"},k=e("ul",null,[e("li",null,"商品选择 sku 插件")],-1),T={href:"https://github.com/zcy-inc/skuPathFinder-back",target:"_blank",rel:"noopener noreferrer"},j=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),i(" 招贤纳士")],-1),y=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 90 余个前端小伙伴，平均年龄 27 岁，近 4 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),w=e("p",null,[i("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),M=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98d3aa3d1f8646a8bcda8cfd9e335a4b~tplv-k3u1fbpfcp-zoom-1.image",alt:""})],-1);function C(S,F){const n=t("ExternalLinkIcon");return l(),d("div",null,[c,e("p",null,[e("a",p,[i("CodeSandbox 核心源码"),a(n)])]),e("p",null,[e("a",u,[i("CodeSandbox浏览器端的webpack是如何工作的？"),a(n)])]),m,e("p",null,[e("a",v,[i("规范升级 NPM 包"),a(n)])]),e("p",null,[e("a",b,[i("你想知道的前后端协作规范都在这了"),a(n)])]),e("p",null,[e("a",h,[i("带你了解 Tree Shaking"),a(n)])]),e("p",null,[e("a",g,[i("厉害！这篇正则表达式竟写的如此详尽"),a(n)])]),e("p",null,[e("a",f,[i("学习 HTTP Referer"),a(n)])]),x,_,e("p",null,[e("strong",null,[i("开源地址 "),e("a",q,[i("www.zoo.team/openweekly/"),a(n)])]),i(" (小报官网首页有微信交流群)")]),k,e("p",null,[e("strong",null,[i("开源地址 "),e("a",T,[i("https://github.com/zcy-inc/skuPathFinder-back/"),a(n)])])]),j,y,w,M])}const O=s(o,[["render",C],["__file","探索组件在线预览和调试.html.vue"]]);export{O as default};
