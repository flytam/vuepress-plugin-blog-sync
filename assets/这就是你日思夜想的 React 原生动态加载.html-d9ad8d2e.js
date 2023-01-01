import{_ as t,z as r,A as l,Y as e,C as n,U as s,a6 as i,Q as d}from"./framework-cb9358d9.js";const c={},o=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/24/1737e6038b00329e~tplv-t2oaga2asx-image.image",alt:""})],-1),u=e("br",null,null,-1),p={href:"https://www.zoo.team/article/react-lazy-suspense",target:"_blank",rel:"noopener noreferrer"},m=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/24/17246f1bfb7ebc7f~tplv-t2oaga2asx-image.image",alt:""})],-1),v=e("h2",{id:"react-lazy-是什么",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#react-lazy-是什么","aria-hidden":"true"},"#"),n(" React.lazy 是什么")],-1),h={href:"https://github.com/tc39/proposal-dynamic-import",target:"_blank",rel:"noopener noreferrer"},b=e("code",null,"import()",-1),g={href:"https://www.webpackjs.com/api/module-methods#import-",target:"_blank",rel:"noopener noreferrer"},_=i(`<p>在 React 16.6 版本中，新增了 React.lazy 函数，它能让你像渲染常规组件一样处理动态引入的组件，配合 webpack 的 Code Splitting ，只有当组件被加载，对应的资源才会导入 ，从而达到懒加载的效果。</p><h2 id="使用-react-lazy" tabindex="-1"><a class="header-anchor" href="#使用-react-lazy" aria-hidden="true">#</a> 使用 React.lazy</h2><p>在实际的使用中，首先是引入组件方式的变化：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 不使用 React.lazy
import OtherComponent from &amp;#39;./OtherComponent&amp;#39;;
// 使用 React.lazy
const OtherComponent = React.lazy(() =&amp;gt; import(&amp;#39;./OtherComponent&amp;#39;))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>React.lazy 接受一个函数作为参数，这个函数需要调用 import() 。它需要返回一个  Promise，该 Promise 需要 resolve 一个 defalut export 的 React 组件。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/24/17246ef62db73310~tplv-t2oaga2asx-image.image" alt="图片"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    // react/packages/shared/ReactLazyComponent.js
	export const Pending = 0;
	export const Resolved = 1;
	export const Rejected = 2;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在控制台打印可以看到，React.lazy 方法返回的是一个 lazy 组件的对象，类型是 react.lazy，并且 lazy 组件具有 _status 属性，与 Promise 类似它具有 Pending、Resolved、Rejected 三个状态，分别代表组件的加载中、已加载、和加载失败三中状态。</p><p>需要注意的一点是，React.lazy 需要配合 Suspense 组件一起使用，在 Suspense 组件中渲染 React.lazy 异步加载的组件。如果单独使用 React.lazy，React 会给出错误提示。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/24/17246ef62d33c36f~tplv-t2oaga2asx-image.image" alt="图片"></p><p>上面的错误指出组件渲染挂起时，没有 fallback UI，需要加上 Suspense 组件一起使用。</p><p>其中在 Suspense 组件中，fallback 是一个必需的占位属性，如果没有这个属性的话也是会报错的。</p><p>接下来我们可以看看渲染效果，为了更清晰的展示加载效果，我们将网络环境设置为 Slow 3G。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/24/17246ef631a93093~tplv-t2oaga2asx-image.image" alt="图片"></p><p>组件的加载效果：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/24/17246ef6308a7eb6~tplv-t2oaga2asx-image.image" alt="图片"></p><p>可以看到在组件未加载完成前，展示的是我们所设置的 fallback 组件。</p><p>在动态加载的组件资源比较小的情况下，会出现 fallback 组件一闪而过的的体验问题，如果不需要使用可以将 fallback 设置为 null。</p><p>Suspense 可以包裹多个动态加载的组件，这也意味着在加载这两个组件的时候只会有一个 loading 层，因为 loading 的实现实际是 Suspense 这个父组件去完成的，当所有的子组件对象都 resolve 后，再去替换所有子组件。这样也就避免了出现多个 loading 的体验问题。所以 loading 一般不会针对某个子组件，而是针对整体的父组件做 loading 处理。</p><p>以上是 React.lazy 的一些使用介绍，下面我们一起来看看整个懒加载过程中一些核心内容是怎么实现的，首先是资源的动态加载。</p><h2 id="webpack-动态加载" tabindex="-1"><a class="header-anchor" href="#webpack-动态加载" aria-hidden="true">#</a> Webpack 动态加载</h2><p>上面使用了 import() 语法，webpack 检测到这种语法会自动代码分割。使用这种动态导入语法代替以前的静态引入，可以让组件在渲染的时候，再去加载组件对应的资源，这个异步加载流程的实现机制是怎么样呢？</p><p>话不多说，直接看代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>__webpack_require__.e = function requireEnsure(chunkId) {
    // installedChunks 是在外层代码中定义的对象，可以用来缓存了已加载 chunk
  var installedChunkData = installedChunks[chunkId]
    // 判断 installedChunkData 是否为 0：表示已加载 
  if (installedChunkData === 0) {
    return new Promise(function(resolve) {
      resolve()
    })
  }
  if (installedChunkData) {
    return installedChunkData[2]
  } 
  // 如果 chunk 还未加载，则构造对应的 Promsie 并缓存在 installedChunks 对象中
  var promise = new Promise(function(resolve, reject) {
    installedChunkData = installedChunks[chunkId] = [resolve, reject]
  })
  installedChunkData[2] = promise
  // 构造 script 标签
  var head = document.getElementsByTagName(&amp;quot;head&amp;quot;)[0]
  var script = document.createElement(&amp;quot;script&amp;quot;)
  script.type = &amp;quot;text/javascript&amp;quot;
  script.charset = &amp;quot;utf-8&amp;quot;
  script.async = true
  script.timeout = 120000
  if (__webpack_require__.nc) {
    script.setAttribute(&amp;quot;nonce&amp;quot;, __webpack_require__.nc)
  }
  script.src =
    __webpack_require__.p +
    &amp;quot;static/js/&amp;quot; +
    ({ &amp;quot;0&amp;quot;: &amp;quot;alert&amp;quot; }[chunkId] || chunkId) +
    &amp;quot;.&amp;quot; +
    { &amp;quot;0&amp;quot;: &amp;quot;620d2495&amp;quot; }[chunkId] +
    &amp;quot;.chunk.js&amp;quot;
  var timeout = setTimeout(onScriptComplete, 120000)
  script.onerror = script.onload = onScriptComplete
  function onScriptComplete() {
    script.onerror = script.onload = null
    clearTimeout(timeout)
    var chunk = installedChunks[chunkId]
    // 如果 chunk !== 0 表示加载失败
    if (chunk !== 0) {
        // 返回错误信息
      if (chunk) {
        chunk[1](new Error(&amp;quot;Loading chunk &amp;quot; + chunkId + &amp;quot; failed.&amp;quot;))
      }
      // 将此 chunk 的加载状态重置为未加载状态
      installedChunks[chunkId] = undefined
    }
  }
  head.appendChild(script)
    // 返回 fullfilled 的 Promise
  return promise
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结合上面的代码来看，webpack 通过创建 script 标签来实现动态加载的，找出依赖对应的 chunk 信息，然后生成 script 标签来动态加载 chunk，每个 chunk 都有对应的状态：未加载 、 加载中、已加载 。</p><p>我们可以运行 React.lazy 代码来具体看看 network 的变化，为了方便辨认 chunk。我们可以在 import 里面加入 webpackChunckName 的注释，来指定包文件名称。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const OtherComponent = React.lazy(() =&amp;gt; import(/* webpackChunkName: &amp;quot;OtherComponent&amp;quot; */&amp;#39;./OtherComponent&amp;#39;));
const OtherComponentTwo = React.lazy(() =&amp;gt; import(/* webpackChunkName: &amp;quot;OtherComponentTwo&amp;quot; */&amp;#39;./OtherComponentTwo&amp;#39;));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>webpackChunckName 后面跟的就是打包后组件的名称。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/24/17246ef6311f1d41~tplv-t2oaga2asx-image.image" alt="图片"></p><p>打包后的文件中多了动态引入的 OtherComponent、OtherComponentTwo 两个 js 文件。</p><p>如果去除动态引入改为一般静态引入：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/24/17246ef6325c8ede~tplv-t2oaga2asx-image.image" alt="图片"></p><p>可以很直观的看到二者文件的数量以及大小的区别。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/24/17246ef65c7ee9d0~tplv-t2oaga2asx-image.image" alt="图片"></p><p>以上是资源的动态加载过程，当资源加载完成之后，进入到组件的渲染阶段，下面我们再来看看，Suspense 组件是如何接管 lazy 组件的。</p><h2 id="suspense-组件" tabindex="-1"><a class="header-anchor" href="#suspense-组件" aria-hidden="true">#</a> Suspense 组件</h2><p>同样的，先看代码，下面是 Suspense 所依赖的 react-cache 部分简化源码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// react/packages/react-cache/src/ReactCache.js 
export function unstable_createResource&amp;lt;I, K: string | number, V&amp;gt;(
  fetch: I =&amp;gt; Thenable&amp;lt;V&amp;gt;,
  maybeHashInput?: I =&amp;gt; K,
): Resource&amp;lt;I, V&amp;gt; {
  const hashInput: I =&amp;gt; K =
    maybeHashInput !== undefined ? maybeHashInput : (identityHashFn: any);
  const resource = {
    read(input: I): V {
      readContext(CacheContext);
      const key = hashInput(input);
      const result: Result&amp;lt;V&amp;gt; = accessResult(resource, fetch, input, key);
      // 状态捕获
      switch (result.status) { 
        case Pending: {
          const suspender = result.value;
          throw suspender;
        }
        case Resolved: {
          const value = result.value;
          return value;
        }
        case Rejected: {
          const error = result.value;
          throw error;
        }
        default:
          // Should be unreachable
          return (undefined: any);
      }
    },
    preload(input: I): void {
      readContext(CacheContext);
      const key = hashInput(input);
      accessResult(resource, fetch, input, key);
    },
  };
  return resource;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面的源码中看到，Suspense 内部主要通过捕获组件的状态去判断如何加载，上面我们提到 React.lazy 创建的动态加载组件具有 Pending、Resolved、Rejected 三种状态，当这个组件的状态为 Pending 时显示的是 Suspense 中 fallback 的内容，只有状态变为 resolve 后才显示组件。</p><p>结合该部分源码，它的流程如下所示：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/24/17246ef65c1e701b~tplv-t2oaga2asx-image.image" alt="图片"></p><h2 id="error-boundaries-处理资源加载失败场景" tabindex="-1"><a class="header-anchor" href="#error-boundaries-处理资源加载失败场景" aria-hidden="true">#</a> Error Boundaries 处理资源加载失败场景</h2>`,42),k={href:"https://react.docschina.org/docs/error-boundaries.html",target:"_blank",rel:"noopener noreferrer"},f=i(`<p>Error Boundaries 是一种组件，如果你在组件中定义了 static getDerivedStateFromError() 或 componentDidCatch() 生命周期函数，它就会成为一个 Error Boundaries 的组件。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
​
  static getDerivedStateFromError(error) { // 更新 state 使下一次渲染能够显示降级后的 UI
      return { hasError: true };  
  }
  componentDidCatch(error, errorInfo) { // 你同样可以将错误日志上报给服务器
      logErrorToMyService(error, errorInfo);
  }
  render() {
    if (this.state.hasError) { // 你可以自定义降级后的 UI 并渲染      
        return &amp;lt;h1&amp;gt;对不起，发生异常，请刷新页面重试&amp;lt;/h1&amp;gt;;    
    }
    return this.props.children; 
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以在 componentDidCatch  或者 getDerivedStateFromError 中打印错误日志并定义显示错误信息的条件，当捕获到 error 时便可以渲染备用的组件元素，不至于导致页面资源加载失败而出现空白。</p><p>它的用法也非常的简单，可以直接当作一个组件去使用，如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;ErrorBoundary&amp;gt;
  &amp;lt;MyWidget /&amp;gt;
&amp;lt;/ErrorBoundary&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以模拟动态加载资源失败的场景。首先在本地启动一个 http-server 服务器，然后去访问打包好的 build 文件，手动修改下打包的子组件包名，让其查找不到子组件包的路径。然后看看页面渲染效果。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/24/17246ef6605e2cec~tplv-t2oaga2asx-image.image" alt="图片"></p><p>可以看到当资源加载失败，页面已经降级为我们在错误边界组件中定义的展示内容。</p><p>流程图例：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/24/17246ef6630d29fc~tplv-t2oaga2asx-image.image" alt="图片"></p><p>需要注意的是：错误边界仅可以捕获其子组件的错误，它无法捕获其自身的错误。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>React.lazy()  和 React.Suspense 的提出为现代 React 应用的性能优化和工程化提供了便捷之路。 React.lazy 可以让我们像渲染常规组件一样处理动态引入的组件，结合 Suspense 可以更优雅地展现组件懒加载的过渡动画以及处理加载异常的场景。</p>`,13),x={href:"https://github.com/gregberge/loadable-components",target:"_blank",rel:"noopener noreferrer"},y=e("h2",{id:"参考文档",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#参考文档","aria-hidden":"true"},"#"),n(" 参考文档")],-1),C={href:"https://zh-hans.reactjs.org/docs/concurrent-mode-intro.html",target:"_blank",rel:"noopener noreferrer"},j={href:"https://zh-hans.reactjs.org/docs/code-splitting.html",target:"_blank",rel:"noopener noreferrer"},R={href:"https://github.com/xiaoxiangdaiyu/webpack_demo/tree/master/codesplitting",target:"_blank",rel:"noopener noreferrer"},q=e("h2",{id:"推荐阅读",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#推荐阅读","aria-hidden":"true"},"#"),n(" 推荐阅读")],-1),w={href:"https://juejin.cn/post/6844904153043435533",target:"_blank",rel:"noopener noreferrer"},z={href:"https://juejin.cn/post/6844903988081475591",target:"_blank",rel:"noopener noreferrer"},I={href:"https://juejin.cn/post/6844904038555729927",target:"_blank",rel:"noopener noreferrer"},S=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),n(" 招贤纳士")],-1),E=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),T=e("p",null,[n("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),D=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/24/1737e6194e9c083d~tplv-t2oaga2asx-image.image",alt:""})],-1);function P(B,O){const a=d("ExternalLinkIcon");return r(),l("div",null,[o,e("p",null,[n("> 这是第 51 篇不掺水的原创，想获取更多原创好文，请扫 👆上方二维码关注我们吧~"),u,n(" > 本文首发于政采云前端团队博客："),e("a",p,[n("这就是你日思夜想的 React 原生动态加载"),s(a)])]),m,v,e("p",null,[n("随着前端应用体积的扩大，资源加载的优化是我们必须要面对的问题，动态代码加载就是其中的一个方案，webpack 提供了符合 "),e("a",h,[n("ECMAScript 提案"),s(a)]),n(" 的 "),b,e("a",g,[n(" 语法"),s(a)]),n(" ，让我们来实现动态地加载模块（注：require.ensure 与 import() 均为 webpack 提供的代码动态加载方案，在 webpack 2.x 中，require.ensure 已被 import 取代）。")]),_,e("p",null,[n("如果遇到网络问题或是组件内部错误，页面的动态资源可能会加载失败，为了优雅降级，可以使用 "),e("a",k,[n("Error Boundaries"),s(a)]),n(" 来解决这个问题。")]),f,e("p",null,[n("> 注意：React.lazy 和 Suspense 尚不可用于服务器端，如果需要服务端渲染，可遵从官方建议使用 "),e("a",x,[n("Loadable Components"),s(a)]),n("。")]),y,e("ol",null,[e("li",null,[e("a",C,[n("Concurrent"),s(a)]),n(" 模式")]),e("li",null,[e("a",j,[n("代码分割"),s(a)])]),e("li",null,[e("a",R,[n("webpack 优化之code splitting"),s(a)])])]),q,e("p",null,[e("a",w,[n("图解 HTTP 缓存"),s(a)])]),e("p",null,[e("a",z,[n("可能是最全的 “文本溢出截断省略” 方案合集"),s(a)])]),e("p",null,[e("a",I,[n("图文并茂，为你揭开“单点登录“的神秘面纱"),s(a)])]),S,E,T,D])}const V=t(c,[["render",P],["__file","这就是你日思夜想的 React 原生动态加载.html.vue"]]);export{V as default};
