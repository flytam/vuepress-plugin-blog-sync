import{_ as a,z as d,A as r,Y as e,C as i,U as s,a6 as l,Q as t}from"./framework-cb9358d9.js";const o={},m=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/24/1737e6038b00329e~tplv-t2oaga2asx-image.image",alt:""})],-1),v={href:"https://www.zoo.team/article/cross-framework-component",target:"_blank",rel:"noopener noreferrer"},c=l(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/19/17365d77ad4e9ba1~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><p>笔者所在的业务中台团队，需要提供业务组件给不同的上层业务方使用，但因为一些历史遗留问题，不同业务线使用的框架不统一，包括 jQuery、React 、Vue 。为了满足不同业务方的需求，往往需要根据业务方使用的框架，开发对应框架的组件。</p><p>这样做就会产生一些<strong>痛点</strong>：</p><ul><li><p>每种选型都需要开发一次，费时劳力</p></li><li><p>组件升级，需要业务方同步发版升级，沟通成本高、迭代效率低</p></li></ul><h2 id="理想中的组件" tabindex="-1"><a class="header-anchor" href="#理想中的组件" aria-hidden="true">#</a> 理想中的组件</h2><ul><li>跨框架：<strong>Write once, run everywhere</strong></li><li>少升级：组件升级，业务方少升级不升级（注意：组件升级后业务线回归还是必要的）</li></ul><h2 id="实现方案" tabindex="-1"><a class="header-anchor" href="#实现方案" aria-hidden="true">#</a> 实现方案</h2><p>如何设计一个符合上面提到的跨框架、少升级期望的通用方案呢？</p><p>很容易想到用原生 JS 来实现，避免跨框架的问题。</p><h4 id="原生实现" tabindex="-1"><a class="header-anchor" href="#原生实现" aria-hidden="true">#</a> 原生实现</h4><p>用原生 JS 实现，包含页面里用到的 UI 组件，不依赖任何框架。</p><p><strong>优点：</strong></p><ul><li>跨框架：不依赖于框架实现</li><li>轻量：可以不依赖其他 UI 组件，体积较小</li></ul><p><strong>缺点：</strong></p><ul><li>投入产出比低：实现一套常用工具方法和 UI 组件，投入时间长</li><li>踩坑：兼容性问题的坑要走一遍，风险大</li><li>很难满足复杂业务场景的需求</li></ul><p><strong>适用场景</strong>：</p><p>不需要复杂交互的场景，如前台吊顶、后台菜单侧边栏可采用这种方式。</p><p>但在实际的业务场景中，业务组件中有比较多复杂的交互场景， 上面的方案不太能满足要求，所以我们在上面的方案之上进行迭代：</p><h4 id="原生容器组件-iframe-加载业务逻辑组件" tabindex="-1"><a class="header-anchor" href="#原生容器组件-iframe-加载业务逻辑组件" aria-hidden="true">#</a> 原生容器组件 + iframe 加载业务逻辑组件</h4><p>我们将业务组件拆分为两部分：</p><p><strong>一、容器组件</strong>：</p><p>用原生 JS 实现中间层容器组件，解决跨框架的加载问题，容器组件主要负责：</p><ul><li>收集组件需要的参数</li><li>注册全局回调</li><li>组件挂载</li><li>加载 iframe</li></ul><p><strong>二、业务逻辑组件</strong></p><p>根据 iframe 天然的沙箱特性，业务逻辑用 iframe 页面加载，就保证了业务组件的实现不受框架的限制，可以完美解决问题。业务逻辑组件主要负责：</p><ul><li>与容器组件通信</li><li>运行环境隔离，可以使用任意框架实现业务逻辑</li></ul><p><strong>缺点：</strong></p><ul><li>动态加载静态资源，iframe 加载略慢，实际体验在接受范围内</li><li>跨域通信问题</li></ul><p>此方案容器组件作为中间层，封装不变的逻辑，将多变的业务逻辑隔离出来，从而保证协作方尽量少升级或不升级。业务定制性可根据接口配置，返回不同的 iframe 地址，加载不同的业务逻辑组件，一次开发任意使用。</p><h2 id="如何实现" tabindex="-1"><a class="header-anchor" href="#如何实现" aria-hidden="true">#</a> 如何实现</h2><p><strong>下面是整个组件的逻辑图</strong>：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/19/17365d5809533e4e~tplv-t2oaga2asx-image.image" alt="图片"></p><p>使用方通过容器组件初始化参数、并注册相应的回调：</p><p><strong>容器组件</strong></p><ul><li><strong>初始化</strong>：</li><li>设置 document.domain，让外部组件和 iframe 可以通信</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 获取主域名
function getTopLevelDomain(host) {
    let data = host || window.location.host;
    return data.split(&amp;#39;.&amp;#39;).slice(-2).join(&amp;#39;.&amp;#39;);
}
// 设置主域名
function setDomainToTopLevelDomain() {
  try {
    window.document.domain = getTopLevelDomain();
  } catch (error) {
    console.error(&amp;quot;设置domain失败&amp;quot;)
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>render：</strong></li><li>生成外部容器 div ，设置 loading 图，挂载组件</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class Vanilla {
  // 获取配置信息
  constructor(config) {
    const options = { ...defaultConfig, ...config };
    this.options = options; 
    this.elCls = options.elCls;
  }
	// 生成容器 div
  render() {
    const div = document.createElement(&amp;#39;div&amp;#39;);
    this.el = div;
    
    const { width, height } = this.options;
    div.className = \`\${prefixCls}-wrap \${prefixCls}-wrap-loading \${this.elCls || &amp;#39;&amp;#39;}\`;
    const maskNode = getMaskNode(prefixCls);
    const iframeNode = getIframeNode(prefixCls, width, height);
    div.innerHTML = maskNode + iframeNode;
    document.body.appendChild(div);
    this.fn();
  }
  init() {
    // 设置主域名
    setDomainToTopLevelDomain();
    // 初始化 div
    this.render();
    // 初始化全局回调函数
    this.initCallbacks();
  }
  ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>注册回调函数</strong></li><li>通过注册全局回调函数，用于业务逻辑组件与容器组件进行通信</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class Vanilla {
 ... 
  initCallbacks() {
    const self = this;
    const options = this.options;
     // 初始化全局变量
    window[paramsName] = options;
    
    window.onSuccess = function onSuccess(data, res) {
      options.onSuccess &amp;amp;&amp;amp; options.onSuccess(data, res);
      // 延迟1500ms删除用来显示成功提示
      setTimeout(() =&amp;gt; {
        self.removeNode();
      }, 1500);
      self.resetCallbacks &amp;amp;&amp;amp; self.resetCallbacks();
    };
    window.onCancel = function onCancel() {
      options.onCancel &amp;amp;&amp;amp; options.onCancel();
      self.removeNode();
      self.resetCallbacks &amp;amp;&amp;amp; self.resetCallbacks();
    };
    window.onError = function onError(data) {
      options.onError &amp;amp;&amp;amp; options.onError(data);
    };
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>加载 iframe 页面：</strong></li><li>通过接口获取 iframe 地址，业务方可以根据配置动态，加载不同的业务组件</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>let timer = function timer() {};
class Vanilla {
  ...
  $mount() {
   ...
   this.fn();
  }
  fn() {
    const {
      width,
      height,
      isAutoSize,
    } = this.options;
    const el = this.el;
    const url = getContentUrl(&amp;#39;你的iframe地址&amp;#39;);
    const iframeWidth = width;
    const iframeHeight = height;
    const iframeEle = el.querySelector(&amp;#39;.J_CreditIframe&amp;#39;);
    const modalNode = el.querySelector(\`.\${prefixCls}\`);

    if (!isAutoSize &amp;amp;&amp;amp; (iframeWidth !== width || iframeHeight !== height)) {
      this.setNodeSizeAndPostion(modalNode, iframeEle, iframeWidth, iframeHeight);
    }
    iframeEle.setAttribute(&amp;#39;src&amp;#39;, url);
    // 监听load后，隐藏loading
    addEvent(iframeEle, &amp;#39;load&amp;#39;, () =&amp;gt; {
      el.className = \`\${prefixCls}-wrap \${this.elCls || &amp;#39;&amp;#39;}\`;
      const maxTime = 3000;
      const duration = 1000;
      let timerCounter = 0;
      let w = defaultConfig.width;
      let h = defaultConfig.height;
      // 自适应宽高
      if (isAutoSize) {
        timer = setInterval(() =&amp;gt; {
          ...
      //
       this.setNodeSizeAndPostion(modalNode, iframeEle, scrollWidth, scrollHeight);
          }
          timerCounter += duration;
          if (timerCounter &amp;gt;= maxTime) {
            clearInterval(timer);
          }
        }, duration);
      }
    });
  }
  
  // 设置iframe宽高
  setNodeSizeAndPostion(container, iframe, width, height) {
    container.style.cssText = \`width: \${width}px; height: \${height}px;margin-left: -\${width / 2}px;margin-top: -\${height / 2}px;\`;
    iframe.style.cssText = \`width: \${width}px; height: \${height}px;\`;
  }
  // 删除DOM
  removeNode() {
    timer &amp;amp;&amp;amp; clearInterval(timer);
    if (this.el) {
      document.body.removeChild(this.el);
    }
  }
  ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面我们完成了整个业务组件的加载过程，下面我们需要处理的就是业务逻辑组件如何与容器组件之间进行通信：</p><p>通常我们可以这样处理：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 获取父页面属性
const params = window.parent.paramsName;
// 调用父页面方法
window.parent.onSuccess &amp;amp;&amp;amp; window.parent.onSuccess(data);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但在实际的业务场景中，我们可能会面临的问题是业务方的域名与 iframe 加载的组件地址域名不一致，这个时候我们就必须要解决组件的跨域通信问题了.</p><p><strong>跨域的通信问题</strong></p><p>我们可以通过以下三种方式去解决：</p><p><strong>postMessage</strong></p>`,50),u={href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage",target:"_blank",rel:"noopener noreferrer"},p=l(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/19/17365d5805ebaaf8~tplv-t2oaga2asx-image.image" alt="图片"></p><p><strong>主域名修改</strong></p><ul><li>document.domain + iframe : 设置 document.domain 为主域名，业务方与 iframe 主域名相同，实现父子同域通信。这种实现的前提是两个域的主域名必须一致</li></ul><p><strong>Nginx 代理</strong></p><ul><li>Nginx 配置：iframe 页面的路径配置为通用路径，反向代理依赖接口，实现全域名可访问。将业务逻辑组件整合到一个或多个项目中使用，组件打包和发布逻辑可单独定制，适合大量跨框架组件</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 静态页面地址
location ~ ^/your-project/ {
  root /opt/front/your-project/;
  try_files $uri $uri/ /index.html = 404;
  access_log off;
}
// 反向代理
location ~ ^/api/service/(.*)$ {
   proxy_pass http://your-ip;
   proxy_set_header        X-Real-IP $remote_addr;
   proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
   proxy_set_header        Host $http_host;
   proxy_set_header        requestId $request_id;
   proxy_http_version      1.1;
   proxy_set_header        Connection &amp;quot;&amp;quot;;
   expires 30d;
   access_log off;
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="需要注意的点" tabindex="-1"><a class="header-anchor" href="#需要注意的点" aria-hidden="true">#</a> 需要注意的点</h2><ul><li><p>注意处理非白色背景的圆角部分，容易出现毛边。处理方法是 iframe 容器不设置背景色，由 iframe 里面设置圆角</p></li><li><p>版本控制：小版本保证向前兼容，大版本可通过动态获取 iframe 地址来实现版本控制</p></li></ul><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>多框架背景下的组件重复开发问题，根源还是多框架的历史债务问题。更好的方式则是推动技术栈的统一，从根源上避免出现此种情况。此场景下更为完善的解决方案则是微前端，我们也在向这个方向探索，本文提供的是一种基础的解决多技术栈业务场景的思路，如果有更好的方案欢迎大家一起讨论～</p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,11),b={href:"https://juejin.im/editor/posts/5eef64de518825658c1ad1f6",target:"_blank",rel:"noopener noreferrer"},h={href:"https://juejin.cn/post/6844904182822993927",target:"_blank",rel:"noopener noreferrer"},g=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),i(" 招贤纳士")],-1),f=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),x=e("p",null,[i("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),_=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/24/1737e608cf27b9f1~tplv-t2oaga2asx-image.image",alt:""})],-1);function w(C,y){const n=t("ExternalLinkIcon");return d(),r("div",null,[m,e("p",null,[i("> 这是第 61 篇不掺水的原创，想获取更多原创好文，请扫 👆 上方二维码关注我们吧~ 本文首发于政采云前端团队博客："),e("a",v,[i("如何开发跨框架的组件"),s(n)])]),c,e("ul",null,[e("li",null,[e("a",u,[i("postMessage"),s(n)]),i(" 可以跨文档通信， 在 IE10 的支持性有问题，在 IE11 及以上可以完美解决跨域问题。笔者需要支持IE9+，所以没有采用 postMessage")])]),p,e("p",null,[e("a",b,[i("分分钟教会你搭建企业级的 npm 私有仓库"),s(n)])]),e("p",null,[e("a",h,[i("一份值得收藏的 Git 异常处理清单"),s(n)])]),g,f,x,_])}const $=a(o,[["render",w],["__file","如何开发跨框架的组件.html.vue"]]);export{$ as default};
