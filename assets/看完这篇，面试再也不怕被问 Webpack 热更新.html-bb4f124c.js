import{_ as s,z as t,A as d,Y as e,C as a,U as n,a6 as l,Q as c}from"./framework-cb9358d9.js";const r={},o=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8d2b0103c1fa~tplv-t2oaga2asx-image.image",alt:""})],-1),p=e("h2",{id:"",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#","aria-hidden":"true"},"#"),a(" **")],-1),m=e("p",null,'<table><tbody><tr><td bgcolor="#FDFFE7"><font size="4">原创不易，希望能关注下我们，再顺手点个赞~~<font></font></font></td></tr></tbody></table> **',-1),v={href:"http://www.zoo.team/article/webpack",target:"_blank",rel:"noopener noreferrer"},u=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/9/16e509eb8b992826~tplv-t2oaga2asx-image.image",alt:"米亚.png"})],-1),b=e("h2",{id:"前言",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),a(" 前言")],-1),h=e("p",null,"Webpack热更新（ Hot Module Replacement，简称 HMR，后续均以 HMR 替代），无需完全刷新整个页面的同时，更新所有类型的模块，是 Webpack 提供的最有用的功能之一。",-1),g=e("p",null,"HMR 作为一个 Webpack 内置的功能，可以通过 --hot 或者 HotModuleReplacementPlugin 开启。",-1),k=e("p",null,"刷新分为两种：一种是页面刷新，不保留页面状态，就是简单粗暴，直接window.location.reload()；另一种是基于 WDS（Webpack-dev-server）的模块热替换，只需要局部刷新页面上发生变化的模块，同时可以保留当前的页面状态，比如复选框的选中状态、输入框的输入等。",-1),f=e("p",null,"HMR 的好处，在日常开发工作中体会颇深：节省宝贵的开发时间、提升开发体验。引用官网的描述来概述一下：",-1),_={href:"https://Webpack.docschina.org/concepts/modules/",target:"_blank",rel:"noopener noreferrer"},x=l(`<p>在开发环境，可以将 HMR 作为 LiveReload 的替代。那么，HMR到底是怎么实现热更新的呢？下面通过观察编译构建过程，以及分析源代码来了解一下。</p><p>本次探索依赖公司前端 Vue 项目开发脚手架配置：Webpack + Webpack-Dev-Middleware + Webpack-Hot-Middleware + Express。</p><h2 id="webpack-构建" tabindex="-1"><a class="header-anchor" href="#webpack-构建" aria-hidden="true">#</a> webpack 构建</h2><p>项目启动之后，会进行首次构建打包，控制台中会输出整个的构建过程，可以观察到一个 Hash 值 3606e1ab1ddcf6626797。</p><p>​</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/25/16d68c441799042d~tplv-t2oaga2asx-image.image" alt="image-20190925192508536"></p><p>在每次代码的修改后，保存时都会在控制台上出现 compiling…字样，可以在控制台中观察到：</p><ul><li><p>Hash 值更新：4f8c0eff7ac051c13277；</p></li><li><p>新生成文件：3606e1ab1ddcf6626797.hot-update.json</p></li><li><p>main1.3606e1ab1ddcf6626797.hot-update.js。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/25/16d68c4417805d72~tplv-t2oaga2asx-image.image" alt="image-20190925192526730"></p><p>如果没有任何改动，直接保存，控制台输出编译打包信息，Hash 值没有发生变化，仍旧是 4f8c0eff7ac051c13277。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/25/16d68c4420889f8a~tplv-t2oaga2asx-image.image" alt="image-20190925192738074"></p><p>再次修改代码保存，控制台输出编译打包信息。根据文件名可以发现，上次输出的 Hash 值被作为本次编译新生成的 Hmr 文件标识。同样，本次输出的 Hash 值会被作为下次热更新的标识。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/25/16d68c4421b90acb~tplv-t2oaga2asx-image.image" alt="image-20190925192752213"></p></li></ul><h3 id="webpack-watch" tabindex="-1"><a class="header-anchor" href="#webpack-watch" aria-hidden="true">#</a> Webpack Watch</h3><p>为什么代码的改动保存会自动编译，重新打包？这一系列的重新检测编译依赖于 Webpack 的文件监听：在项目启动之后，Webpack 会通过 Compiler 类的 Run 方法开启编译构建过程，编译完成后，调用 Watch 方法监听文件变更，当文件发生变化，重新编译，编译完成之后继续监听。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/25/16d68c4421ebdbed~tplv-t2oaga2asx-image.image" alt="image-20190925003133799"></p><p>页面的访问需要依赖 Web 服务器，那要如何将 Webpack 编译打包之后的文件传递给 Web 服务器呢？这就要看 Webpack-dev-middleware了。 Webpack-dev-middleware 是一个封装器（ wrapper ），它可以把 Webpack 处理过的文件发送到一个 Server（其中 Webpack-Dev-Server 就是内置了 Webpack-dev-middleware 和 Express 服务器）。上面有说到编译之后的文件会被写入到内存，而 Webpack-dev-middleware 插件通过 <code>memory-fs</code> 实现静态资源请求直接访问内存文件。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const webpack = require(&amp;#39;webpack&amp;#39;);
const webpackConfig = require(&amp;#39;./webpack.dev.conf&amp;#39;);
const compiler = webpack(webpackConfig);
debug(&amp;#39;webpack编译完成&amp;#39;);
debug(&amp;#39;将编译流通过webpack-dev-middleware&amp;#39;);
const devMiddleware = require(&amp;#39;webpack-dev-middleware&amp;#39;)(compiler, {
// self-define options
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码可以看到，Webpack 编译打包之后得到一个 Compilation ，并将 Compilation 传递到 Webpack-dev-middleware 插件中，Webpack-dev-middleware 可以通过 Compilation 调用 Webpack中 的 Watch 方法实时监控文件变化，并重新编译打包写入内存。</p><p>留意一下浏览器端，在 Network 中可以看到几个请求：</p><p>/__Webpack_hmr 请求返回的消息包含了首次 Hash 值，每次代码变动重新编译后，浏览器会发出 hash.hot-update.json、fileChunk.hash.hot-update.js 资源请求。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/25/16d68c4421cfc986~tplv-t2oaga2asx-image.image" alt="image-20190924112630734"></p><p>点开查看 hash.hot-update.json 请求，返回的结果中，h 是一个 hash 值，用于下次文件热更新请求的前缀，c 表示当前要热更新的文件是 main1 。</p><p>​</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/25/16d68c44518dc8f2~tplv-t2oaga2asx-image.image" alt="image-20190924112716610"></p><p>继续查看 fileChunk.hash.hot-update.js，返回的内容是使用 webpackHotUpdate 标识的 fileChunk 内容。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/25/16d68c4451a910de~tplv-t2oaga2asx-image.image" alt="image-20190924113157232"></p><p>那么 Webpack 服务器和浏览器端是怎么建立起通信的呢？这就是 Webpack-hot-middleware 插件的功劳了。 Webpack-hot-middleware 的 README.md 文档中有这样一段描述：</p><p>&gt; This module is only concerned with the mechanisms to connect a browser client to a Webpack server &amp;amp; receive updates.</p><p>&gt; Webpack-hot-middleware 插件的作用就是提供浏览器和 Webpack 服务器之间的通信机制、且在浏览器端接收 Webpack 服务器端的更新变化。</p><p>为了更好的理解这一段话，打开浏览器开发者调试工具，可以看到在 Webpack 打包好的 Js 中主要包含了以下几部分。下面截取关键部分进行说明：</p><ul><li>Webpack-hot-middleware/client.js</li></ul><p>源码中有这么一段配置，看到这里瞬间想到了在开发时浏览器的 Network 中总是有一个 __Webpack_hmr 的请求，点开查看会看到EventStream 事件流（服务器端事件流，服务器向浏览器推送消息，除了 websocket 全双工通道双向通信方式还有一种 Server-Sent Events 单向通道的通信方法，只能服务器端向浏览器端通过流信息的方式推送消息；页面可以通过 EventSource 实例接收服务器发送事件通知并触发 onmessage 事件），并且以 2s 的频率不停的更新消息内容，每行消息内容都有 ❤️ 的图标，没错这就是一个心跳请求。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var options = {
  path: &amp;#39;/__Webpack_hmr&amp;#39;,
  timeout: 20 * 1000,
  overlay: true,
  reload: false,
  log: true,
  warn: true,
  name: &amp;#39;&amp;#39;,
  autoConnect: true,
  overlayStyles: {},
  overlayWarnings: false,
  ansiColors: {},
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>继续向下查看 Client.js 代码，发现这完全就是一个只要浏览器支持就可以自发建立通信通道的客户端。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if (typeof window === &amp;#39;undefined&amp;#39;) {
  // do nothing
} else if (typeof window.EventSource === &amp;#39;undefined&amp;#39;) {
  // warning
} else {
      if (options.autoConnect) {
      // 建立通信连接
        connect();
      }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在建立通信的过程中，浏览器端会初始化一个 EventSource 实例并通过 onmessage 事件监听消息。浏览器端在收到服务器发来的数据时，就会触发 onmessage 事件，可以通过定义 onmessage 的回调函数处理接收到的消息。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 浏览器端建立连接
function EventSourceWrapper() {
    var source;
    var listeners = [];
    // 初始化EventSource实例
 	source =  new window.EventSource(options.path);
    // 定义onmessage事件监听服务器端消息返回
    source.onmessage = handleMessage;
    function handleMessage(event) {
        for (var i = 0; i &amp;lt; listeners.length; i++) {
            listeners[i](event);
        }
    }
    return {
        addMessageListener: function(fn) {
            listeners.push(fn);
        }
  };
}
// 浏览器端建立通信通道，监听处理服务器端推送的消息
function connect() {
      EventSourceWrapper().addMessageListener(handleMessage);
      function handleMessage(event) {
    	  try {
           processMessage(JSON.parse(event.data));
         } catch (ex) {
           // handler exception
         }
      }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Client.js 监听的消息有：</p><ul><li><p>building/built：构建中，不会触发热更新； ​</p></li><li><p>sync：开始更新的流程。</p></li></ul><p>在 processUpdate 方法中，处理一切异常/错误的方法都是直接更新整个页面即调用 window.location.reload()，首先调用 module.hot.check 方法检测是否有更新，然后进入 HotModuleReplacement.runtime 的 Check 阶段。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function processMessage(obj) {
  switch (obj.action) {
    case &amp;#39;building&amp;#39;:
      // tell you rebuilding
      break;
    case &amp;#39;built&amp;#39;:
      // tell you rebuilt in n ms
    // fall through
    case &amp;#39;sync&amp;#39;:
       // 省略...
      var applyUpdate = true;
      if (applyUpdate) {
        processUpdate(obj.hash, obj.modules, options);
      }
      break;
    default:
      // do something
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="热更新过程" tabindex="-1"><a class="header-anchor" href="#热更新过程" aria-hidden="true">#</a> 热更新过程</h2><p>改动页面代码保存之后，Webpack 会重新编译文件并发消息通知浏览器，浏览器在 Check 之后触发 WebpackHotUpdateCallback，具体 HotModuleReplacement.runtime.js 会做以下几个操作：</p><ul><li><p>进入 HotCheck，调用 hotDownloadManifest 发送 /hash.hot-update.json 请求；</p></li><li><p>通过 Json 请求结果获取热更新文件，以及下次热更新的 Hash 标识，并进入热更新准备阶段；</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>hotAvailableFilesMap = update.c;// 需要更新的文件
hotUpdateNewHash = update.h;// 下次热更新hash值
hotSetStatus(&amp;quot;prepare&amp;quot;);// 进入热更新准备状态
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>HotCheck 确认需要热更新之后进入 hotAddUpdateChunk 方法，该方法先检查 Hash 标识的模块是否已更新，如果没更新，则通过在 DOM 中添加 Script 标签的方式，动态请求js： /fileChunk.hash.hot-update.js，获取最新打包的 js 内容；</p></li><li><p>最新打包的js内容如何更新的呢？HotModuleReplacement.runtime.js 在 window 对象上定义了 WebpackHotUpdate方法；在这里定义了如何解析前面 fileChunk.hash.hot-update.js 请求返回的js内容 webpackHotUpdate(main1, { moreModules })，直接遍历 moreModules，并且执行 hotUpdate 方法更新；</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/25/16d68c445287bb19~tplv-t2oaga2asx-image.image" alt="image-20190925145730597"></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/25/16d68c44533f9efc~tplv-t2oaga2asx-image.image" alt="image-20190925150635231"></p></li></ul><h2 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h2><p>至此页面已经完成热更新，Webpack 如何实现热更新的呢？首先是建立起浏览器端和服务器端之间的通信，浏览器会接收服务器端推送的消息，如果需要热更新，浏览器发起http请求去服务器端获取打包好的资源解析并局部刷新页面。</p><h2 id="招贤纳士" tabindex="-1"><a class="header-anchor" href="#招贤纳士" aria-hidden="true">#</a> 招贤纳士</h2><p>招人，前端，隶属政采云前端大团队（ZooTeam），50 余个小伙伴正等你加入一起浪～ 如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变“5年工作时间3年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手参与一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 <code>ZooTeam@cai-inc.com</code></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,46),w={href:"https://juejin.cn/post/6844903950508883982",target:"_blank",rel:"noopener noreferrer"},j={href:"https://juejin.cn/post/6844903933580673032",target:"_blank",rel:"noopener noreferrer"},W={href:"https://juejin.cn/post/6844903938018263048",target:"_blank",rel:"noopener noreferrer"},y={href:"https://juejin.cn/post/6844903925716353031",target:"_blank",rel:"noopener noreferrer"};function H(M,C){const i=c("ExternalLinkIcon");return t(),d("div",null,[o,p,m,e("p",null,[a("> 本文首发于政采云前端团队博客： "),e("a",v,[a("看完这篇，面试再也不怕被问 Webpack 热更新"),n(i)])]),u,b,h,g,k,f,e("p",null,[a("> 模块热替换（HMR - hot module replacement）功能会在应用程序运行过程中，替换、添加或删除 "),e("a",_,[a("模块"),n(i)]),a("，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度： > > - 保留在完全重新加载页面期间丢失的应用程序状态。 > - 只更新变更内容，以节省宝贵的开发时间。 > - 在源代码中对 CSS / JS 进行修改，会立刻在浏览器中进行更新，这几乎相当于在浏览器 devtools 直接更改样式。")]),x,e("p",null,[e("a",w,[a("前端工程实践之可视化搭建系统（一）"),n(i)])]),e("p",null,[e("a",j,[a("自动化 Web 性能优化分析方案"),n(i)])]),e("p",null,[e("a",W,[a("看完这篇，你也能把 React Hooks 玩出花"),n(i)])]),e("p",null,[e("a",y,[a("Vue 组件数据通信方案总结"),n(i)])])])}const E=s(r,[["render",H],["__file","看完这篇，面试再也不怕被问 Webpack 热更新.html.vue"]]);export{E as default};
