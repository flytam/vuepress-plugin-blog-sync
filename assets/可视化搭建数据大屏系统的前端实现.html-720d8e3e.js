import{_ as t,z as d,A as l,Y as e,C as a,U as n,a6 as s,Q as m}from"./framework-cb9358d9.js";const r={},o=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/22/17239e3edd804567~tplv-t2oaga2asx-image.image",alt:""})],-1),p={href:"https://www.zoo.team/article/data-visualization",target:"_blank",rel:"noopener noreferrer"},u=s('<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/16/1704d955bcae35a8~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><p>随着公司业务的发展，经常会收到一些数据大屏的需求。目前我司有两种实现方案，一是人肉搭建，二是用阿里云 DataV 搭建。</p><p>人肉搭建，在本地脚手架开发环境中进行编码，有大量的重复劳动，能力复用性差，占用前端宝贵的开发时间。</p><p>DataV 功能强大，带需要付费使用，且好用的组件还要额外收费，不支持本地化部署，还需要维护两套数仓。</p><p>综上，如果此类大屏的需求较多，业务的重要性明显，就需要考虑是不是需要自己开发一套搭建大屏的系统，用以降低开发复杂度，提升研发效率，降低成本。本文尝试基于政采云前端团队的数据大屏搭建系统 Big 的拆解说明，为大家提供一种此类系统的设计和实施方案。</p><h2 id="big-是什么" tabindex="-1"><a class="header-anchor" href="#big-是什么" aria-hidden="true">#</a> Big 是什么</h2>',7),c={href:"http://mp.weixin.qq.com/s?__biz=MzI0NTE5NzYyMw==&mid=2247483754&idx=1&sn=50cfe278d16eee9bc10cec0571e93863&chksm=e9537f32de24f6242a29eee3f6363bb720aae5e0cecc53f298be9947bed4a0b6b66841f21120&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},v=e("strong",null,"鲁班",-1),b=s('<p>为什么叫 Big 呢? 打开百度翻译，输入<code>大屏</code>，英文翻译是<code>Big screen</code>，四舍五入叫<code>Big</code>。</p><h2 id="自己做一套系统的优势" tabindex="-1"><a class="header-anchor" href="#自己做一套系统的优势" aria-hidden="true">#</a> 自己做一套系统的优势</h2><ul><li>可定制性：内部产品，组件和展示形式私人订制</li><li>支持本地化部署：业务需要决定部分业务只能在内网访问，无法访问外网（包括阿里云）</li><li>解决 DataV 需要维护两套数仓的问题</li><li>节约公司成本，增强公司数据产品能力，助力营收</li></ul><h2 id="总览" tabindex="-1"><a class="header-anchor" href="#总览" aria-hidden="true">#</a> 总览</h2><p>数据大屏是用可视化的方式展示庞杂数据的产品，经常会用在会议展览、业务监控、风险预警、地理信息分析等多种业务场景。下图是阿里云 DataV 的一个模板：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/16/1704d938e4ba8686~tplv-t2oaga2asx-image.image" alt="image-20191211203434089.png"></p><p><strong>从前端实现来看，大屏是由线图、柱状图、饼图、标题、背景、边框等基本元素组成。实现思路是以这些基本元素为组件，通过选择组件、拖拽方式布局，配置样式、数据来源，将这些数据保存在数据库中。展示页面获取依赖的组件、样式和数据信息，呈现给用户。</strong></p><p>大屏按场景划分，可分为编辑和查看。</p><p>编辑：指的是大屏制作者制作大屏。</p><p>查看：包含两种情况，大屏制作者预览和实际用户查看大屏。</p><h2 id="编辑" tabindex="-1"><a class="header-anchor" href="#编辑" aria-hidden="true">#</a> 编辑</h2><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/16/1704d938e5aabf2b~tplv-t2oaga2asx-image.image" alt="裁剪2.gif"></p><p>编辑大屏是数据可视化系统核心，页面布局参考 DataV：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/16/1704d938e588bff2~tplv-t2oaga2asx-image.image" alt="ds1.png"></p><p>拆解为 4 个部分：顶部、组件区、画布、数据配置区。先讲下设计思路，再依次分解各区。</p><h4 id="设计思路" tabindex="-1"><a class="header-anchor" href="#设计思路" aria-hidden="true">#</a> 设计思路</h4>',16),h={href:"https://juejin.cn/post/6844903609667158030",target:"_blank",rel:"noopener noreferrer"},g=e("li",null,"App 数据保存在 App state 中，未使用 Vuex（后续会考虑使用 Vuex）",-1),q=e("li",null,"数据用 props 传递给子组件",-1),_=e("li",null,"数据从子组件采用事件中心传递给祖父级组件",-1),f=s(`<h4 id="顶部" tabindex="-1"><a class="header-anchor" href="#顶部" aria-hidden="true">#</a> 顶部</h4><p>顶部区域包含三部分：左侧开关区、控制图层、组件列表、数据配置区的显示隐藏；中间是大屏的标题；右侧是保存和预览。</p><h4 id="组件区" tabindex="-1"><a class="header-anchor" href="#组件区" aria-hidden="true">#</a> 组件区</h4><p>组件区分为左侧图层（已添加的组件）和右侧组件列表，具备添加组件、选择操作图层、分组对齐的功能。</p><p><strong>图层</strong></p><ul><li><p>图层支持上移、下移、置顶、删除的操作，支持右键显示操作菜单（暂不支持多选和分组）。实现原理是使用数组的基本方法改变数组</p></li><li><p>单击组件选择该组件，画布区选中组件，数据配置区显示配置项</p></li></ul><p><strong>组件列表</strong></p><ul><li>所有组件展示所有大屏组件，点击或拖动添加组件</li><li>添加组件采用异步获取组件的 JS、CSS 、配置 Schema，将 CSS、JS 插入 DOM 中，配置传入属性配置区</li><li>支持按组件类型分组，便于用户使用。</li></ul><h4 id="画布" tabindex="-1"><a class="header-anchor" href="#画布" aria-hidden="true">#</a> 画布</h4><p>画布用于实时展示大屏组件的位置、尺寸、属性和数据修改后的效果。</p><p>位置和尺寸改变通过注册组件 <code>vue-draggable-resizable</code> 的 <code>drag</code> 和 <code>resize</code> 方法，改变对应组件的属性。组件采用绝对定位，拖动时修改 top 和 left 的值。</p><p>属性改变通过修改对应组件的 props.models 的值修改。</p><p>数据分为静态数据和接口数据。启用静态数据时，数据从用户填写的数据获取。否则组件 watch 接口 id ，每次改变时重新发送请求获取数据。</p><p>画布上边和左边是标尺，画布缩放时标尺要跟随变动。在标尺上移动时显示一条移动的参考线。点击时增加一条参考线。双击参考线删除。标尺用 Canvas 画出，旋转 90 度可获得 Y 轴。</p><p>右下是缩放滑块，方便用户缩放查看。进入页面默认缩放到可查看全屏大小。缩放实现使用 CSS3 的<code>transform: scale(\${this.scale})</code>。</p><p>画布上未选择组件时，显示页面的基本配置，包括大屏的宽高、背景图。</p><p>选择组件后，高亮显示当前组件，标识位置，右侧数据配置区显示组件 Schema 定义的配置项。</p><p><strong>核心代码</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;div
  :class=&amp;quot;[&amp;#39;data-com&amp;#39;, item.info.previewId === activePreviewId ? &amp;#39;data-com-active&amp;#39; : &amp;#39;&amp;#39;]&amp;quot;
  v-for=&amp;quot;item in preCompList&amp;quot;
  :key=&amp;quot;item.info.activePreviewId&amp;quot;
&amp;gt;
  &amp;lt;vue-draggable-resizable
    :w=&amp;quot;item.models.width || 100&amp;quot;
    :h=&amp;quot;item.models.height || 100&amp;quot;
    :x=&amp;quot;item.models.x || 0&amp;quot;
    :y=&amp;quot;item.models.y || 0&amp;quot;
    :active=&amp;quot;item.info.previewId === activePreviewId&amp;quot;
    @dragging=&amp;quot;onDrag&amp;quot;
    @resizing=&amp;quot;onResize&amp;quot;
    @activated=&amp;quot;
      () =&amp;gt; {
        onCompActivated(item.info.previewId);
      }
		&amp;quot;
		:prevent-deactivation=&amp;quot;true&amp;quot;
	&amp;gt;
    &amp;lt;navigator-line
      :x=&amp;quot;item.models.x&amp;quot;
      :y=&amp;quot;item.models.y&amp;quot;
      :scale=&amp;quot;scale&amp;quot;
    /&amp;gt;
  	&amp;lt;div :is=&amp;quot;item.info.name&amp;quot; :models=&amp;quot;item.models&amp;quot; :extraProps=&amp;quot;extraProps&amp;quot;&amp;gt;&amp;lt;/div&amp;gt;
	&amp;lt;/vue-draggable-resizable&amp;gt;
&amp;lt;/div&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19),x={href:"https://npm.taobao.org/package/vue-draggable-resizable",target:"_blank",rel:"noopener noreferrer"},w=e("p",null,[e("code",null,"navigator-line"),a(" 显示组件当前的标尺位置。这里要注意避免因为画布缩小导致坐标看不清，除以缩放比例即可。")],-1),y={href:"https://cn.vuejs.org/v2/api/#is",target:"_blank",rel:"noopener noreferrer"},S=s(`<h4 id="数据配置区" tabindex="-1"><a class="header-anchor" href="#数据配置区" aria-hidden="true">#</a> 数据配置区</h4><p>数据配置区有 2 种情况：</p><ul><li>未选中组件展示页面级配置：大屏宽高、背景色、背景图等</li><li>选中组件：展示组件配置信息</li></ul><p>实现逻辑：根据当前用户的选择来动态渲染出组件的属性编辑域，并回填属性的初始值，从而达到良好的编辑交互效果。用户拖拽组件时同步更新编辑域中的属性值，在属性编辑域修改属性时通知大屏触发组件的刷新动作，达到实时编辑的效果。</p><p>数据配置区界面由组件 Schema 定义，props 定义展示，models 表示默认数据，详细介绍见下面 Schema。</p><p>编辑类型由 fileds 里的 type 决定，实现 Input、Select、Image、Border 等各种类型组件，再利用 Vue 的动态组件 is 属性来展示。</p><p>数据回传：每个子组件值的修改会通知父组件<code>&amp;lt;Setting /&amp;gt;</code>更新回传给父组件 App，这里采用全量回传，避免 App 对 models 查找更新数据。</p><h2 id="查看" tabindex="-1"><a class="header-anchor" href="#查看" aria-hidden="true">#</a> 查看</h2><p>查看是将数据库里保存的数据，配合组件渲染出来。实现原理是通过页面 id 获取组件、数据渲染。代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;div class=&amp;quot;preview&amp;quot;&amp;gt;
    &amp;lt;div class=&amp;quot;layout&amp;quot;&amp;gt;
      &amp;lt;div
        :class=&amp;quot;[&amp;#39;preview-line&amp;#39;, preComp.info.name + &amp;#39;-&amp;#39; + preComp.info.previewId]&amp;quot;
        v-for=&amp;quot;(preComp, index) in preCompList&amp;quot;
        :key=&amp;quot;preComp.info.previewId&amp;quot;
        :style=&amp;quot;formatCompStyle(preComp, index)&amp;quot;
      &amp;gt;
        &amp;lt;div :is=&amp;quot;preComp.info.name&amp;quot; :models=&amp;quot;preComp.models&amp;quot; :isPreview=&amp;quot;isPreview&amp;quot; :extraProps=&amp;quot;extraProps&amp;quot;&amp;gt;&amp;lt;/div&amp;gt;
      &amp;lt;/div&amp;gt;
    &amp;lt;/div&amp;gt;
  &amp;lt;/div&amp;gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="全屏展示" tabindex="-1"><a class="header-anchor" href="#全屏展示" aria-hidden="true">#</a> 全屏展示</h4><p>需要注意大屏是全屏展示，根据大屏配置的屏幕宽高、背景图、背景色设置 body 样式，设置<code>&amp;lt;meta name=&amp;quot;viewport&amp;quot; content=&amp;quot;width=&amp;#39; + window.screen.width + &amp;#39;&amp;quot;/&amp;gt;</code>viewport 的 width 让屏幕占满全屏，再监听屏幕的变化设置压缩比例。自适应关键代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 获取设置的大屏宽高、背景图、背景色
if(window.__INITIAL_STATE__) {
  const { width, height, backgroundImage, backgroundColor } = __INITIAL_STATE__.preview.pageConfig.models;
  window.scr = {
    width: width,
    height: height,
    backgroundImage: \`url(\${backgroundImage})\`,
    backgroundColor: backgroundColor,
  };
} else {
  window.scr = {
    width: window.screen.width,
    height: window.screen.height,
  };
}

// 全屏展示
function resizeFull() {
  if (!window.scr.height || !window.scr.width) return resizeFullBak();
  var ratioX = $(window).width() / window.scr.width;
  var ratioY = $(window).height() / window.scr.height;
  $(&amp;#39;body&amp;#39;).css({
    transform: &amp;quot;scale(&amp;quot; + ratioX + &amp;quot;, &amp;quot; + ratioY + &amp;quot;)&amp;quot;,
    transformOrigin: &amp;quot;left top&amp;quot;,
    backgroundSize: &amp;quot;100% 100%&amp;quot;,
  });
}
function resizeFullBak() {
  var ratioX = $(window).width() / $(&amp;#39;body&amp;#39;).width();
  var ratioY = $(window).height() / $(&amp;#39;body&amp;#39;).height();
  $(&amp;#39;body&amp;#39;).css({
    transform: &amp;quot;scale(&amp;quot; + ratioX + &amp;quot;, &amp;quot; + ratioY + &amp;quot;)&amp;quot;,
    transformOrigin: &amp;quot;left top&amp;quot;,
    backgroundSize: &amp;quot;100% &amp;quot; + ratioY * 100 + &amp;quot;%&amp;quot;,
  });
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="组件设计" tabindex="-1"><a class="header-anchor" href="#组件设计" aria-hidden="true">#</a> 组件设计</h2><p>组件是整个大屏设计的基础。组件由组件模板来初始化，模板提供了两个主要功能，一是实现一个可开发的简单 Demo，二是提供打包发布功能。</p><p>模板代码很简单，通过传入的 props 控制组件的展示和业务逻辑。组件自动安装，这样在异步加载组件的时候页面可以识别组件。重点讲下组件的 Schema 设计。</p><h4 id="schema-json" tabindex="-1"><a class="header-anchor" href="#schema-json" aria-hidden="true">#</a> schema.json</h4><p>schema.json 是用来定义组件的可编辑项和默认配置。决定组件哪些东西可以配置，配置的形式是什么样子的（Input、Select 等有默认值）。所以 Schema 包含 props 和 models 两个属性。</p><p>props: 数组，每个元素是 tab 的一项。info 是 tab 头部信息，fields 是配置项。fields 的 name 对应 models 的属性名，type 决定了配置的类型，title 是中文名。还可以定义其他属性，比如下拉框选择项、数字输入框最大最小值等。</p><p>models: 默认数据，<code>props.fileds</code>里每个<code>name</code>的默认值。</p><p>下面是一个简单 schema 的定义：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &amp;quot;props&amp;quot;: [
    {
      &amp;quot;info&amp;quot;: {
        &amp;quot;title&amp;quot;: &amp;quot;配置&amp;quot;,
        &amp;quot;icon&amp;quot;: &amp;quot;icon-setting&amp;quot;
      },
      &amp;quot;fields&amp;quot;: [
        {
          &amp;quot;title&amp;quot;: &amp;quot;组件宽度&amp;quot;,
          &amp;quot;name&amp;quot;: &amp;quot;width&amp;quot;,
          &amp;quot;description&amp;quot;: &amp;quot;组件宽度&amp;quot;,
          &amp;quot;type&amp;quot;: &amp;quot;number&amp;quot;
        },
        {
          &amp;quot;title&amp;quot;: &amp;quot;组件高度&amp;quot;,
          &amp;quot;name&amp;quot;: &amp;quot;height&amp;quot;,
          &amp;quot;description&amp;quot;: &amp;quot;组件高度&amp;quot;,
          &amp;quot;type&amp;quot;: &amp;quot;number&amp;quot;
        },
        {
          &amp;quot;title&amp;quot;: &amp;quot;x轴坐标&amp;quot;,
          &amp;quot;name&amp;quot;: &amp;quot;x&amp;quot;,
          &amp;quot;description&amp;quot;: &amp;quot;组件x轴坐标&amp;quot;,
          &amp;quot;type&amp;quot;: &amp;quot;number&amp;quot;
        },
        {
          &amp;quot;title&amp;quot;: &amp;quot;y轴坐标&amp;quot;,
          &amp;quot;name&amp;quot;: &amp;quot;y&amp;quot;,
          &amp;quot;description&amp;quot;: &amp;quot;组件y轴坐标&amp;quot;,
          &amp;quot;type&amp;quot;: &amp;quot;number&amp;quot;
        }
      ]
    }
  ],
  &amp;quot;models&amp;quot;: {
    &amp;quot;width&amp;quot;: 300,
    &amp;quot;height&amp;quot;: 200,
    &amp;quot;x&amp;quot;: 0,
    &amp;quot;y&amp;quot;: 0
  }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="碰到的问题" tabindex="-1"><a class="header-anchor" href="#碰到的问题" aria-hidden="true">#</a> 碰到的问题</h2><h3 id="通信" tabindex="-1"><a class="header-anchor" href="#通信" aria-hidden="true">#</a> 通信</h3><p>大屏组件之间如何通信？ 要确保大屏组件可以通信。</p><p>采用事件中心来处理组件间的通信。核心代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 全局事件中心
Vue.prototype.$eventBus = new Vue();
// 触发, 在组件内部
this.$eventBus.$emit(&amp;#39;eventName&amp;#39;, &amp;#39;这里传值&amp;#39;);
// 监听, 获取值
this.$eventBus.on(&amp;#39;eventName&amp;#39;, v =&amp;gt; {
	console.log(v);
})

// 组件通知父组件区划变动或其他变动
this.$eventBus.$emit(&amp;#39;component__update-extraProps&amp;#39;, { dist: &amp;#39;选择的区划&amp;#39; });
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>App 统一管理通信对象 extraProps，以 props 形式注入到每个组件。组件可以监听 <code>extraProps</code> 的属性变化。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 组件代码
{
  ...,
  props: {
    extraProps: {
      type: Object,
      default: () =&amp;gt; {}
    }
  },
  computed: {
    dist() {
      return (this.extraProps &amp;amp;&amp;amp; this.extraProps.dist) || &amp;#39;&amp;#39;;
    }
  },
  watch: {
    dist(val, oldVal){
      // 添加区划改变时获取新数据的逻辑
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="权限" tabindex="-1"><a class="header-anchor" href="#权限" aria-hidden="true">#</a> 权限</h3><p>大屏数据需要做权限控制，有权限的人才能查看大屏，而鲁班原来页面访问逻辑是没有权限的。实现方案是编辑、预览页面调用的免登接口访问中间 Server，中间 Server 实现登录，去 Server 请求数据。用户的查看页面内嵌鲁班 iframe，该地址由实际服务器提供并带上权限 token。访问该鲁班地址时先去 Server 鉴权，有权限返回大屏页面，否则返回 401。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/16/1704d938e68726f3~tplv-t2oaga2asx-image.image" alt="未命名文件.png"></p><h2 id="待优化" tabindex="-1"><a class="header-anchor" href="#待优化" aria-hidden="true">#</a> 待优化</h2><p>Big 处于初级阶段，还有好多地方需要完善：</p><ul><li>分组：像 PS、Sketch 里一样分组，方便归类和操作</li><li>多选：多选后选择对齐方式。也是方便用户操作</li><li>代码优化</li><li>体验优化</li></ul><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>DT 时代，数据可视化将会越来越重要。相信有越来越多的同学会遇到大屏的场景。通过可视化搭建大屏系统，可以赋能相关的业务方，让非专业人士做出专业的大屏效果，同时满足公司的一些定制化需求。这里做了一个比较浅的大屏构建方案，目前还在开发阶段，希望抛砖引玉，有更多的可视化数据搭建方案分享出来，谢谢阅读。</p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,38),j={href:"https://juejin.cn/post/6844903950508883982",target:"_blank",rel:"noopener noreferrer"},k={href:"https://juejin.cn/post/6844903988081475591",target:"_blank",rel:"noopener noreferrer"},I={href:"https://juejin.cn/post/6844904038555729927",target:"_blank",rel:"noopener noreferrer"},C=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),a(" 招贤纳士")],-1),z=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),B=e("p",null,[a("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),P=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image",alt:""})],-1);function V($,A){const i=m("ExternalLinkIcon");return d(),l("div",null,[o,e("p",null,[a("> 本文首发于政采云前端团队博客： "),e("a",p,[a("可视化搭建数据大屏系统的前端实现"),n(i)])]),u,e("p",null,[a("Big 是基于政采云前端搭建系统 "),e("a",c,[v,n(i)]),a("，和数据大屏组件库，进行快速搭建数据大屏的可视化系统。")]),b,e("ul",null,[e("li",null,[a("页面数据和依赖的组件由 "),e("a",h,[a("ssr"),n(i)]),a(" 注入到 Html 文件中")]),g,q,_]),f,e("p",null,[e("a",x,[a("vue-draggable-resizable"),n(i)]),a(" 用于选择组件、缩放组件大小，可参考官方文档。这个组件不支持分组和多选对齐场景，需要定制开发。")]),w,e("p",null,[a("使用 Vue "),e("a",y,[a("动态组件 is"),n(i)]),a(" 控制组件显示。")]),S,e("p",null,[e("a",j,[a("前端工程实践之可视化搭建系统（一）"),n(i)])]),e("p",null,[e("a",k,[a("可能是最全的 “文本溢出截断省略” 方案合集"),n(i)])]),e("p",null,[e("a",I,[a("图文并茂，为你揭开“单点登录“的神秘面纱"),n(i)])]),C,z,B,P])}const N=t(r,[["render",V],["__file","可视化搭建数据大屏系统的前端实现.html.vue"]]);export{N as default};
