import{_ as a,z as c,A as l,Y as e,C as d,U as i,a6 as s,Q as o}from"./framework-cb9358d9.js";const r={},t=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8d2b0103c1fa~tplv-t2oaga2asx-image.image",alt:""})],-1),v=e("br",null,null,-1),u={href:"https://www.zoo.team/article/webpack-dev-middleware",target:"_blank",rel:"noopener noreferrer"},p=e("h3",{id:"前言",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),d(" 前言")],-1),m={href:"https://www.webpackjs.com/configuration/dev-server/",target:"_blank",rel:"noopener noreferrer"},b=s(`<p>截至本文发表前，webpack-dev-middleware 的最新版本为 <code>webpack-dev-middleware@3.7.2</code>，本文的源码来自于此版本。本文会讲解 webpack-dev-middleware 的核心模块实现，相信大家把这篇文章看完，再去阅读源码，会容易理解很多。</p><h3 id="webpack-dev-middleware-是什么" tabindex="-1"><a class="header-anchor" href="#webpack-dev-middleware-是什么" aria-hidden="true">#</a> webpack-dev-middleware 是什么？</h3><p>要回答这个问题，我们先来看看如何使用这个包：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const wdm = require(&amp;#39;webpack-dev-middleware&amp;#39;);
const express = require(&amp;#39;express&amp;#39;);
const webpack = require(&amp;#39;webpack&amp;#39;);
const webpackConf = require(&amp;#39;./webapck.conf.js&amp;#39;);
const compiler = webpack(webpackConf);
const app = express();
app.use(wdm(compiler));
app.listen(8080);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),h={href:"http://www.expressjs.com.cn/",target:"_blank",rel:"noopener noreferrer"},x=e("code",null,"wdm(compiler)",-1),w=e("code",null,"app.use",-1),_=e("code",null,"wdm(compiler)",-1),g=e("code",null,"express",-1),k=e("code",null,"webpack",-1),f=e("code",null,"express",-1),j=e("h3",{id:"为什么要使用-webpack-dev-middleware",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#为什么要使用-webpack-dev-middleware","aria-hidden":"true"},"#"),d(" 为什么要使用 webpack-dev-middleware")],-1),y=e("code",null,"webpack",-1),q=e("code",null,"webpack",-1),S={href:"https://www.webpackjs.com/configuration/watch/",target:"_blank",rel:"noopener noreferrer"},R=e("code",null,"webpack",-1),E=e("code",null,"watch mode",-1),N=s(`<p>而 webpack-dev-middleware 拥有以下几点特性：</p><ul><li>以 <code>watch mode</code> 启动 <code>webpack</code>，监听的资源一旦发生变更，便会自动编译，生产最新的 <code>bundle</code></li><li>在编译期间，停止提供旧版的 <code>bundle</code> 并且将请求延迟到最新的编译结果完成之后</li><li><code>webpack</code> 编译后的资源会存储在内存中，当用户请求资源时，直接于内存中查找对应资源，减少去硬盘中查找的 IO 操作耗时</li></ul><p>而本文将主要围绕这三个特性和主流程逻辑进行分析。</p><h3 id="源码解读" tabindex="-1"><a class="header-anchor" href="#源码解读" aria-hidden="true">#</a> 源码解读</h3><p>让我们先来看下 webpack-dev-middleware 的源码目录：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>...
├── lib
│   ├── DevMiddlewareError.js
│   ├── index.js
│   ├── middleware.js
│   └── utils
│       ├── getFilenameFromUrl.js
│       ├── handleRangeHeaders.js
│       ├── index.js
│       ├── ready.js
│       ├── reporter.js
│       ├── setupHooks.js
│       ├── setupLogger.js
│       ├── setupOutputFileSystem.js
│       ├── setupRebuild.js
│       └── setupWriteToDisk.js
├── package.json
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code>lib</code> 目录下为源代码，一眼望去有近 10 多个文件要解读。但刨除 <code>utils</code> 工具集合目录，其核心源码文件其实只有两个 <code>index.js</code>、<code>middleware.js</code></p><p>下面我们就来分析核心文件 <code>index.js</code>、<code>middleware.js</code> 的源码实现</p><h3 id="入口文件-index-js" tabindex="-1"><a class="header-anchor" href="#入口文件-index-js" aria-hidden="true">#</a> 入口文件 index.js</h3><p>从上文我们已经得知 <code>wdm(compiler)</code> 返回的是一个 <code>express</code> 中间件，所以入口文件 <code>index.js</code> 则为一个中间件的容器包装函数。它接收两个参数，一个为 <code>webpack</code> 的 <code>compiler</code>、另一个为配置对象，经过一系列的处理，最后返回一个中间件函数。下面我将对 <code>index.js</code> 中的核心代码进行讲解：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>...
setupHooks(context);
...
// start watching
context.watching = compiler.watch(options.watchOptions, (err) =&amp;gt; {
  if (err) {
    context.log.error(err.stack || err);
    if (err.details) {
      context.log.error(err.details);
    }
  }
});
...
setupOutputFileSystem(compiler, context);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>index.js</code> 最为核心的是以上 3 个部分的执行，分别完成了我们上文提到的两点特性：</p><ul><li>以监控的方式启动 <code>webpack</code></li><li>将 <code>webpack</code> 的编译内容，输出至内存中</li></ul><h3 id="setuphooks" tabindex="-1"><a class="header-anchor" href="#setuphooks" aria-hidden="true">#</a> setupHooks</h3><p>此函数的作用是在 <code>compiler</code> 的 <code>invalid</code>、<code>run</code>、<code>done</code>、<code>watchRun</code> 这 4 个编译生命周期上，注册对应的处理方法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>context.compiler.hooks.invalid.tap(&amp;#39;WebpackDevMiddleware&amp;#39;, invalid);
context.compiler.hooks.run.tap(&amp;#39;WebpackDevMiddleware&amp;#39;, invalid);
context.compiler.hooks.done.tap(&amp;#39;WebpackDevMiddleware&amp;#39;, done);
context.compiler.hooks.watchRun.tap(
  &amp;#39;WebpackDevMiddleware&amp;#39;,
  (comp, callback) =&amp;gt; {
    invalid(callback);
  }
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在 <code>done</code> 生命周期上注册 <code>done</code> 方法，该方法主要是 <code>report</code> 编译的信息以及执行 <code>context.callbacks</code> 回调函数</li><li>在 <code>invalid</code>、<code>run</code>、<code>watchRun</code> 等生命周期上注册 <code>invalid</code> 方法，该方法主要是 <code>report</code> 编译的状态信息</li></ul><h3 id="compiler-watch" tabindex="-1"><a class="header-anchor" href="#compiler-watch" aria-hidden="true">#</a> compiler.watch</h3>`,18),D=e("code",null,"compiler",-1),F={href:"https://www.webpackjs.com/api/node/#%E7%9B%91%E5%90%AC-watching-",target:"_blank",rel:"noopener noreferrer"},M=e("code",null,"webpack",-1),T=e("h3",{id:"setupoutputfilesystem",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#setupoutputfilesystem","aria-hidden":"true"},"#"),d(" setupOutputFileSystem")],-1),H={href:"https://www.npmjs.com/package/memory-fs",target:"_blank",rel:"noopener noreferrer"},O=e("code",null,"compiler",-1),W=e("code",null,"webpack",-1),B=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>fileSystem = new MemoryFileSystem();
// eslint-disable-next-line no-param-reassign
compiler.outputFileSystem = fileSystem;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过以上 3 个部分的执行，我们以 <code>watch mode</code> 的方式启动了 <code>webpack</code>，一旦监测的文件变更，便会重新进行编译打包，同时我们又将文件的存储方法改为了内存存储，提高了文件的存储读取效率。最后，我们只需要返回 <code>express</code> 的中间件就可以了，而中间件则是调用 <code>middleware(context)</code> 函数得到的。下面，我们来看看 <code>middleware</code> 是如何实现的。</p><h3 id="middleware-js" tabindex="-1"><a class="header-anchor" href="#middleware-js" aria-hidden="true">#</a> middleware.js</h3><p>此文件返回的是一个 <code>express</code> 中间件函数的包装函数，其核心处理逻辑主要针对 <code>request</code> 请求，根据各种条件判断，最终返回对应的文件内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function goNext() {
  if (!context.options.serverSideRender) {
    return next();
  }
  return new Promise((resolve) =&amp;gt; {
    ready(
      context,
      () =&amp;gt; {
        // eslint-disable-next-line no-param-reassign
        res.locals.webpackStats = context.webpackStats;
        // eslint-disable-next-line no-param-reassign
        res.locals.fs = context.fs;
        resolve(next());
      },
      req
    );
  });
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，<code>middleware</code> 中定义了一个 <code>goNext()</code> 方法，该方法判断是否是服务端渲染。如果是，则调用 <code>ready()</code> 方法（此方法即为 <code>ready.js</code> 文件，作用为根据 <code>context.state</code> 状态判断直接执行回调还是将回调存储 <code>callbacks</code> 队列中）。如果不是，则直接调用 <code>next()</code> 方法，流转至下一个 <code>express</code> 中间件。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const acceptedMethods = context.options.methods || [&amp;#39;GET&amp;#39;, &amp;#39;HEAD&amp;#39;];
if (acceptedMethods.indexOf(req.method) === -1) {
  return goNext();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着，判断 <code>HTTP</code> 协议的请求的类型，若请求不包含于配置中（默认 <code>GET</code>、<code>HEAD</code> 请求），则直接调用 <code>goNext()</code> 方法处理请求：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>let filename = getFilenameFromUrl(
  context.options.publicPath,
  context.compiler,
  req.url
);
if (filename === false) {
  return goNext();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，根据请求的 <code>req.url</code> 地址，在 <code>compiler</code> 的内存文件系统中查找对应的文件，若查找不到，则直接调用 <code>goNext()</code> 方法处理请求：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>return new Promise((resolve) =&amp;gt; {
  // eslint-disable-next-line consistent-return
  function processRequest() {
    ...
  }
  ...
  ready(context, processRequest, req);
});

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，中间件返回一个 <code>Promise</code> 实例，而在实例中，先是定义一个 <code>processRequest</code> 方法，此方法的作用是根据上文中找到的 <code>filename</code> 路径获取到对应的文件内容，并构造 <code>response</code> 对象返回，随后调用 <code>ready(context, processRequest, req)</code> 函数，去执行 <code>processRequest</code> 方法。这里我们着重看下 <code>ready</code> 方法的内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if (context.state) {
  return fn(context.webpackStats);
}
context.log.info(\`wait until bundle finished: \${req.url || fn.name}\`);
context.callbacks.push(fn);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>非常简单的方法，判断 <code>context.state</code> 的状态，将直接执行回调函数 <code>fn</code>，或在 <code>context.callbacks</code> 中添加回调函数 <code>fn</code>。这也解释了上文提到的另一个特性 “在编译期间，停止提供旧版的 <code>bundle</code> 并且将请求延迟到最新的编译结果完成之后”。若 <code>webpack</code> 还处于编译状态，<code>context.state</code> 会被设置为 <code>false</code>，所以当用户发起请求时，并不会直接返回对应的文件内容，而是会将回调函数 <code>processRequest</code> 添加至 <code>context.callbacks</code> 中，而上文中我们说到在 <code>compile.hooks.done</code> 上注册了回调函数 <code>done</code>，等编译完成之后，将会执行这个函数，并循环调用 <code>context.callbacks</code>。</p><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>源码的阅读是一个非常枯燥的过程，但是它的收益也是巨大的。上文的源码解读主要分析的是 <code>webpack-dev-middleware</code> 它是如何实现它所拥有的特性、如何处理用户的请求等主要功能点，未包括其他分支逻辑处理、容错。还需读者在这篇文章基础之上，再去阅读详细的源码，望这篇文章能对你的阅读过程起到一定的帮助作用。</p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,17),C={href:"https://juejin.cn/post/6844903950508883982",target:"_blank",rel:"noopener noreferrer"},P={href:"https://juejin.cn/post/6844903988081475591",target:"_blank",rel:"noopener noreferrer"},A={href:"https://juejin.cn/post/6844904038555729927",target:"_blank",rel:"noopener noreferrer"},I=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),d(" 招贤纳士")],-1),V=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),L=e("p",null,[d("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),U=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image",alt:""})],-1);function z(G,Z){const n=o("ExternalLinkIcon");return c(),l("div",null,[t,e("p",null,[d("> 这是第 43 篇不掺水的原创，想获取更多原创好文，请扫 👆上方二维码关注我们吧~"),v,d(" > 本文首发于政采云前端团队博客："),e("a",u,[d("webpack-dev-middleware 源码解读"),i(n)])]),p,e("p",null,[d("Webpack 的使用目前已经是前端开发工程师必备技能之一。若是想在本地环境启动一个开发服务，大家只需在 webpack 的配置中，增加 "),e("a",m,[d("devServer"),i(n)]),d(" 的配置来启动。而 devServer 配置的本质是 webpack-dev-server 这个包提供的功能，而 webpack-dev-middleware 则是这个包的底层依赖。")]),b,e("p",null,[d("通过启动一个 "),e("a",h,[d("express"),i(n)]),d(" 服务，将 "),x,d(" 的结果通过 "),w,d(" 方法注册为 express 服务的中间函数。从这里，我们不难看出 "),_,d(" 的执行结果返回的是一个 "),g,d(" 的中间件。它作为一个容器，将 "),k,d(" 编译后的文件存储到内存中，然后在用户访问 "),f,d(" 服务时，将内存中对应的资源输出返回。")]),j,e("p",null,[d("熟悉 "),y,d(" 的同学都知道，"),q,d(" 可以通过 "),e("a",S,[d("watch mode"),i(n)]),d(" 方式启动，那为何我们不直接使用此方式来监听资源变化呢？答案就是，"),R,d(" 的 "),E,d(" 虽然能监听文件的变更，并且自动打包，但是每次打包后的结果将会存储到本地硬盘中，而 IO 操作是非常耗资源时间的，无法满足本地开发调试需求。")]),N,e("p",null,[d("此部分的作用是，调用 "),D,d(" 的 "),e("a",F,[d("watch"),i(n)]),d(" 方法，之后 "),M,d(" 便会监听文件变更，一旦检测到文件变更，就会重新执行编译。")]),T,e("p",null,[d("其作用是使用 "),e("a",H,[d("memory-fs"),i(n)]),d(" 对象替换掉 "),O,d(" 的文件系统对象，让 "),W,d(" 编译后的文件输出到内存中。")]),B,e("p",null,[e("a",C,[d("前端工程实践之可视化搭建系统（一）"),i(n)])]),e("p",null,[e("a",P,[d("可能是最全的 “文本溢出截断省略” 方案合集"),i(n)])]),e("p",null,[e("a",A,[d("图文并茂，为你揭开“单点登录“的神秘面纱"),i(n)])]),I,V,L,U])}const Y=a(r,[["render",z],["__file","webpack-dev-middleware 源码解读.html.vue"]]);export{Y as default};
