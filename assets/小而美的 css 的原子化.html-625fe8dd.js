import{_ as l,z as d,A as t,Y as e,C as i,U as a,a6 as s,Q as r}from"./framework-cb9358d9.js";const c={},m=e("p",null,[e("img",{src:"https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bfefad3ee3474e3a8a461251aaddceb4~tplv-k3u1fbpfcp-watermark.image?",alt:"政采云技术团队.png"})],-1),v=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6de6a33a26c24275a1b59e7592ac0e41~tplv-k3u1fbpfcp-watermark.image?",alt:"大海.png"})],-1),o={href:"http://zoo.zhengcaiyun.cn/blog/article/css",target:"_blank",rel:"noopener noreferrer"},p=e("h2",{id:"什么是-css-原子化",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#什么是-css-原子化","aria-hidden":"true"},"#"),i(" 什么是 CSS 原子化")],-1),u={href:"https://css-tricks.com/lets-define-exactly-atomic-css/",target:"_blank",rel:"noopener noreferrer"},b=s(`<p>&gt; Atomic CSS is the approach to CSS architecture that favors small, single-purpose classes with names based on visual function.</p><p>译文：</p><p>&gt; 原子化 CSS 是一种 CSS 的架构方式，它倾向于小巧且用途单一的 class，并且会以视觉效果进行命名。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.bg-blue { background-color: #357edd; } 
.f1 { font-size: 3rem; }
.m0 { margin: 0; }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="通常情况下我们是怎么写-css-的" tabindex="-1"><a class="header-anchor" href="#通常情况下我们是怎么写-css-的" aria-hidden="true">#</a> 通常情况下我们是怎么写 CSS 的</h2>`,5),h={href:"https://www.smashingmagazine.com/2013/10/challenging-css-best-practices-atomic-approach/",target:"_blank",rel:"noopener noreferrer"},g=s(`<p>如图所示：我们要实现一个类似访问记录组件，右边是访问人的头像，左侧是访问的描述。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7b7800f0369469cb9ee1d8fab5708b0~tplv-k3u1fbpfcp-zoom-1.image" alt="20220920162400"></p><p>对应代码.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;div class=&amp;quot;media&amp;quot;&amp;gt;
  &amp;lt;a href=&amp;quot;https://www.zcygov.cn/&amp;quot; class=&amp;quot;img&amp;quot;&amp;gt;
    &amp;lt;img width=&amp;quot;40&amp;quot; src=&amp;quot;logo.png&amp;quot; alt=&amp;quot;zcy&amp;quot; /&amp;gt;
  &amp;lt;/a&amp;gt;
  &amp;lt;div class=&amp;quot;bd&amp;quot;&amp;gt;@小明 14 分钟之前&amp;lt;/div&amp;gt;
&amp;lt;/div&amp;gt;
&amp;lt;style&amp;gt;
.media {
  margin: 10px;
}
.media,
.bd {
  overflow: hidden;
  _overflow: visible;
  zoom: 1;
}
.media .img {
  float: left;
  margin-right: 10px;
}
.media .img img {
  display: block;
}
&amp;lt;/style&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新增一个设计，需要把头像放在右侧，描述在左侧，如图所示</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a546703cc514317a87339852168c28c~tplv-k3u1fbpfcp-zoom-1.image" alt="20220920162310"></p><p>我们通过新增一个类名 imgExt，右浮动</p><p>代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;div class=&amp;quot;media&amp;quot;&amp;gt;
  &amp;lt;a href=&amp;quot;https://www.zcygov.cn/&amp;quot; class=&amp;quot;imgExt&amp;quot;&amp;gt;
    &amp;lt;img width=&amp;quot;40&amp;quot; src=&amp;quot;https://sitecdn.zcycdn.com/f2e-assets/b37c37db-ce59-4bfe-a889-5c8615d008c8.png&amp;quot; alt=&amp;quot;zcy&amp;quot; /&amp;gt;
  &amp;lt;/a&amp;gt;
  &amp;lt;div class=&amp;quot;bd&amp;quot;&amp;gt;@小明 14 分钟之前&amp;lt;/div&amp;gt;
&amp;lt;/div&amp;gt;
&amp;lt;style&amp;gt;
  ...
/* 图片在右侧 */
.media .imgExt {
  float: right;
  margin-left: 10px;
}
&amp;lt;/style&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候有来一个新设计，要求组件在页面右侧栏中时候，字体变小</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5ecb12c580a4e948eb814e81739ae0c~tplv-k3u1fbpfcp-zoom-1.image" alt="20220920162709"></p><p>代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;div id=&amp;quot;rightRail&amp;quot;&amp;gt;
&amp;lt;div class=&amp;quot;media&amp;quot;&amp;gt;
  &amp;lt;a href=&amp;quot;https://www.zcygov.cn/&amp;quot; class=&amp;quot;imgExt&amp;quot;&amp;gt;
    &amp;lt;img width=&amp;quot;40&amp;quot; src=&amp;quot;https://sitecdn.zcycdn.com/f2e-assets/b37c37db-ce59-4bfe-a889-5c8615d008c8.png&amp;quot; alt=&amp;quot;zcy&amp;quot; /&amp;gt;
  &amp;lt;/a&amp;gt;
  &amp;lt;div class=&amp;quot;bd&amp;quot;&amp;gt;@小明 14 分钟之前&amp;lt;/div&amp;gt;
&amp;lt;/div&amp;gt;
&amp;lt;style&amp;gt;
&amp;lt;/div&amp;gt;
&amp;lt;style&amp;gt;
  ...
/* 页面右侧容器中时，字体变小 */
#rightRail .bd {
    font-size: smaller;
}
&amp;lt;/style&amp;gt; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上诉的代码是在2013年发布的文章中引用的，CSS编码和命名的抽象是在组件层上，这样的抽象和命名存以下问题。</p><ul><li>一个简单的样式修改，都需要有新增一条样式规则。面向业务组件内CSS的抽象，复用的颗粒度是到组件的，比如例子中访问记录组件，是按照组件复用。组件中单个规则是很难单独抽离复用。</li><li>在例子中的6个样式规则中，4个是基于上下文的</li><li>新的需求与原有规则冲突，需要修改一个其中一个样式，是通过新增一个嵌套类覆盖原有的样式</li></ul><p>9年过去了，前端技术飞速发展，但是看一眼现有项目中的CSS，相似的问题还是存在的。因为CSS组件化的思路没有变，还是按照组件维度去写。说明这些问题不是简单从CSS改用LESS就能解决的。而且随着业务复杂度变高，相关构建工具升级会引入更多的问题。</p><ul><li>相同功能在不同组件内部需要重新命名：比如字符过长省略的样式，CSS规则是一致的，比如一个订单详情字符缩略和发票信息的字符缩略都会各自独立实现，而不会相互引用，因为没人会在订单中使用发票的CSS类，CSS复用度问题。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.order-overflow-dot {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
...
  .title-number {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
...  
.invoice-overflow-content {
    div {
     text-overflow: ellipsis;
     white-space: nowrap;
     overflow: hidden;
    }
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>类命名困难：缺失命名规范，不同人不同的风格，没有什么可读性，给类取名字一个十分痛苦的事情，大多数时候类名不伦不类，难以读懂。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.time-tip {
  i {
    margin-left: 10px;
    cursor: pointer;
  }
}
​
#service-charge-Bill {
  .zcy-search-panel .ant-form-item-label {
    min-width: 80px;
  }
}
​
.invoice-tpl-container {
  max-height: 360px;
  overflow-y: scroll;
}
​
.add-invoice-tpl-item {
  border: 1px dashed rgb(209, 215, 232);
  text-align: center;
  height: 160px;
  line-height: 160px;
  margin: 10px;
}
​
.invoice-tpl-item {
  border: 1px solid rgb(209, 215, 232);
  margin: 10px;
  height: 160px;
  position: relative;
​
  .invoice-content {
    overflow: hidden;
    padding: 20px;
    height: 119px;
​
    div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
​
    .invoice-type-mark {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      color: white;
      background-color: #3177fd;
    }
  }
​
  .operate {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgb(209, 215, 232);
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
}
​
.invoice-tpl-item.active {
  border-color: #3177fd;
}
​
.default-mark {
  position: absolute;
  right: 0;
  top: 0;
  background-color: #bbb;
  color: white;
  padding: 0 5px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>重复的 CSS 文件：现有项目大家都习惯将 CSS 文件创建在业务的目录中，我的项目是用 webpack 构建的，开发阶段 CSS 文件是按需加载的。这样就存在一个问题，如果一个页面也需要用另外页面的样式，开发同学第一反应是复制粘贴。很少发现同学用@import 的方式，导致大量重复的 CSS 文件。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd2188d2d7144902a9375e9b107bea41~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220901103410149"></p></li><li><p>无意义的嵌套和使用&amp;符号：无法搜索定位样式，且可读性极差</p></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.catalogue {
  &amp;amp;-title {
    display: flex;
    &amp;amp;-btns {
      flex-grow: 1;
      align-items: center;
      text-align: right;
      .ant-btn {
        margin: 0 5px;
      }
    }
  }
  &amp;amp;-content {
    height: calc(100% - 60px);
    overflow: auto;
    padding: 18px;
    .cy-tree {
      width: 80%;
    }
    .ant-tree {
      overflow: auto;
    }
  }
  &amp;amp;-tree {
    height: calc(100% - 22px);
    .ant-input {
      width: 100%;
      &amp;amp;-search {
        width: 80%;
        flex-grow: 1;
      }
    }
  }
}
​
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我所负责的项目都是后台管理的项目，团队也有成熟的组件库。这类的项目CSS的工作量是比较少的，所以项目开始之处，没有指定对应CSS规范和架构。大家都是按照组件的抽象思维，没有规范命名规程，日积月累，导致现有项目CSS代码状况较差，维护起来让人十分头大。如何解决这些问题呢？就需要我们改变现有CSS编码思路，改变现在业务组件抽象维度，制定适合命名规范。这些内容就是我们平时所说的CSS的架构，我们这边调研几个比较流行的CSS框架，以下是几个框架简要介绍。</p><h2 id="css框架介绍" tabindex="-1"><a class="header-anchor" href="#css框架介绍" aria-hidden="true">#</a> CSS框架介绍</h2><h3 id="原子化-css" tabindex="-1"><a class="header-anchor" href="#原子化-css" aria-hidden="true">#</a> 原子化 CSS</h3><h4 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h4><p>&gt; 原子化 CSS 是一种 CSS 的架构方式，它倾向于小巧且用途单一的 class。</p><h4 id="原则" tabindex="-1"><a class="header-anchor" href="#原则" aria-hidden="true">#</a> 原则</h4><p>&gt; - class 的命名按照功能 &gt; - class 的功能单一</p><h4 id="相关资料" tabindex="-1"><a class="header-anchor" href="#相关资料" aria-hidden="true">#</a> 相关资料</h4><p>&gt; &lt;https://css-tricks.com/lets-define-exactly-atomic-css/&gt;</p><h3 id="oocss-object-oriented-css-面向对象-css" tabindex="-1"><a class="header-anchor" href="#oocss-object-oriented-css-面向对象-css" aria-hidden="true">#</a> OOCSS (Object-Oriented CSS 面向对象 CSS)</h3><h4 id="定义-1" tabindex="-1"><a class="header-anchor" href="#定义-1" aria-hidden="true">#</a> 定义</h4><p>&gt; OOCSS (Object-Oriented CSS 面向对象 CSS ) 是组织 CSS 的领先的模块化或基于组件的系统。它是 Nicole Sullivan 在 2008 年在 Web Directions North 大会上首次提出的，核心就是<strong>编写可复用和可维护的样式</strong>。</p><h4 id="原则-1" tabindex="-1"><a class="header-anchor" href="#原则-1" aria-hidden="true">#</a> 原则</h4><p>&gt; - 分离结构（structure）和皮肤（skin）。 您应该在基础对象中保留结构和位置，并在扩展类中保留视觉特征（如 <code>background</code> 或 <code>border</code>）。这样您就不必覆盖视觉属性。 &gt; - 分离容器（container）和内容（<em>content</em>）。 永远不要在 CSS 中模仿 HTML 的结构。换句话说，不要在样式表中引用标签或 ID。相反，尝试创建和应用描述相关标签使用的类。并将嵌套类保持在最低限度。</p><h4 id="相关资料-1" tabindex="-1"><a class="header-anchor" href="#相关资料-1" aria-hidden="true">#</a> 相关资料</h4><p>&gt; &lt;http://oocss.org/&gt;</p><h3 id="smacss-scalable-and-modular-architecture-for-css" tabindex="-1"><a class="header-anchor" href="#smacss-scalable-and-modular-architecture-for-css" aria-hidden="true">#</a> SMACSS (Scalable and Modular Architecture for CSS)</h3><h4 id="定义-2" tabindex="-1"><a class="header-anchor" href="#定义-2" aria-hidden="true">#</a> 定义</h4><p>&gt; SMACSS（Scalable and Modular Architecture for CSS）编写模块化、结构化和可扩展的 CSS。</p><h4 id="原则-smacss-认为-css-有-5-个类别-我们通过这-5-种类别来拼凑出完整的-class" tabindex="-1"><a class="header-anchor" href="#原则-smacss-认为-css-有-5-个类别-我们通过这-5-种类别来拼凑出完整的-class" aria-hidden="true">#</a> 原则:SMACSS 认为 CSS 有 5 个类别，我们通过这 5 种类别来拼凑出完整的 class</h4><p>&gt; - Base 基础样式 &gt; - Layout 布局样式 &gt; - Module 模块样式 &gt; - State 状态样式 &gt; - Theme 主题样式</p><h4 id="相关资料-2" tabindex="-1"><a class="header-anchor" href="#相关资料-2" aria-hidden="true">#</a> 相关资料</h4><p>&gt; &lt;http://smacss.com/&gt;</p><h3 id="bem-block-element-modifier" tabindex="-1"><a class="header-anchor" href="#bem-block-element-modifier" aria-hidden="true">#</a> BEM（ <strong>block, element, modifier</strong>）</h3><h4 id="定义-3" tabindex="-1"><a class="header-anchor" href="#定义-3" aria-hidden="true">#</a> 定义</h4><p>&gt; 首先 BEM 是一个分层系统，它把我们的网站分为三层，这三层正好对应着 BEM 三个英文单词的简写 <strong>block, element, modifier</strong>，分为为 <strong>块层、元素层、修饰符层</strong></p><h4 id="原则-2" tabindex="-1"><a class="header-anchor" href="#原则-2" aria-hidden="true">#</a> 原则</h4><p>&gt; - 使用<code>__</code>两个下划线将块名称与元素名称分开 &gt; - 使用<code>--</code>两个破折号分隔元素名称及其修饰符 &gt; - 一切样式都是一个类，不能嵌套</p><h4 id="相关资料-3" tabindex="-1"><a class="header-anchor" href="#相关资料-3" aria-hidden="true">#</a> 相关资料</h4><p>&gt; &lt;https://getbem.com/&gt;</p><h3 id="itcss" tabindex="-1"><a class="header-anchor" href="#itcss" aria-hidden="true">#</a> ITCSS</h3><h4 id="定义-4" tabindex="-1"><a class="header-anchor" href="#定义-4" aria-hidden="true">#</a> 定义</h4><p>&gt; 理智、可扩展、可管理CSS架构</p><h4 id="原则-类似-smacss-对-css-元素进行了分层" tabindex="-1"><a class="header-anchor" href="#原则-类似-smacss-对-css-元素进行了分层" aria-hidden="true">#</a> 原则:类似 SMACSS 对 CSS 元素进行了分层</h4><p>&gt; - Settings – 与预处理器一起使用，包含颜色、字体等定义 &gt; - Tools – 工具与方法，比如 mixins，Settings 与 Tools 都不会产生任何 CSS 代码，仅仅是辅助函数与变量 &gt; - Generic – 通用层，比如 reset <code>html</code>、<code>body</code> 的样式 &gt; - Elements – 对通用元素的样式重置，比如 　<code>a</code> <code>p</code> <code>div</code> 等元素的样式重置 Objects – 类似 OOCSS 中的对象，描述一些常用的基础状态 &gt; - Components – 对组件样式的定义，一个 UI 元素基本由 Objects 与 Components 组成 &gt; - Utilities – 工具类，比如 <code>.hidden</code></p><h4 id="相关资料-4" tabindex="-1"><a class="header-anchor" href="#相关资料-4" aria-hidden="true">#</a> 相关资料</h4><p>&gt; &lt;https://getbem.com/&gt;</p>`,59),f={href:"https://github.com/tailwindlabs/tailwindcss",target:"_blank",rel:"noopener noreferrer"},S={href:"https://github.com/windicss/windicss",target:"_blank",rel:"noopener noreferrer"},x=s(`<h2 id="css-原子化是如何解决这些问题的" tabindex="-1"><a class="header-anchor" href="#css-原子化是如何解决这些问题的" aria-hidden="true">#</a> CSS 原子化是如何解决这些问题的</h2><p>首先我们看看前文中提到组件使用 CSS 原子化是如何实现的，项目中已引入 winidicss。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d8d80ff4d1d4438a877fdc989dc86e3~tplv-k3u1fbpfcp-zoom-1.image" alt="20220920162709"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;div class=&amp;quot;overflow-hidden mr-1&amp;quot;&amp;gt;
  &amp;lt;a href=&amp;quot;https://www.zcygov.cn/&amp;quot; class=&amp;quot;float-left mr-1&amp;quot;&amp;gt;
    &amp;lt;img
      width=&amp;quot;30&amp;quot;
      src=&amp;quot;logo.png&amp;quot;
      alt=&amp;quot;zcy&amp;quot;
    /&amp;gt;
  &amp;lt;/a&amp;gt;
  &amp;lt;div class=&amp;quot;overflow-hidden text-sm&amp;quot;&amp;gt;@小明 14 分钟之前&amp;lt;/div&amp;gt;
&amp;lt;/div&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这边如果需要 头像在右侧的，只需要将 float-left 替换成 float-right 即可。</p><ul><li>没有了命名的烦恼，按照功能命名</li><li>没有相关嵌套，整体可读性加强</li><li>没有重复 CSS 类， 一个功能对应一个类名，一个类名一个功能。没有重复</li><li>没有新增 CSS 文件了。所有类名都是有工具库提供，项目中无需新增类了。</li></ul><p>基本上解决了项目现有的 CSS 问题，而且 CSS 的维护性有了很大的提高，CSS 编码的成本相对于以前有明显的降低。</p><h2 id="使用体验" tabindex="-1"><a class="header-anchor" href="#使用体验" aria-hidden="true">#</a> 使用体验</h2><ul><li><p>接入简单：只选简单几步就能直接使用。参考官网的接入说明：&lt;https://windicss.org/integrations/webpack.html&gt;</p></li><li><p>良好的编码提示：建议安装自动补全插件( &lt;https://marketplace.visualstudio.com/items?itemName=voorjaar.windicss-intellisense&gt; )，对于日常使用有很大的帮助，用起来的体验也很好。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bcd1101d7d9446c28aa97b7444aed6b6~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20221024195725661"></p></li><li><p>快速的功能和类目的映射：刚开始的时候对应功能的类名不熟悉，需要使用官网( &lt;https://windicss.org/guide/&gt; )查询。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/958ac8f1e4104a949dbbb3d7021cacef~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20221024195823993"></p></li><li><p>design token 的设计规范约束：winidicss 工具提供了 design token 的设计规范实现，再推广 CSS 的原子化之前和设计师统一好此类的规范，形成工具配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import { defineConfig } from &amp;#39;windicss/helpers&amp;#39;;
import colors from &amp;#39;windicss/colors&amp;#39;;

export default defineConfig({
  theme: {
    extend: {
      transitionProperty: {
        width: &amp;#39;width&amp;#39;,
      },
      screens: {
        sm: &amp;#39;640px&amp;#39;,
        md: &amp;#39;768px&amp;#39;,
        lg: &amp;#39;1024px&amp;#39;,
        xl: &amp;#39;1280px&amp;#39;,
      },
      colors: {
        gray: colors.coolGray,
        blue: colors.sky,
        red: colors.rose,
        pink: colors.fuchsia,
      },
      fontSize: {
        xs: &amp;#39;.75rem&amp;#39;,
        sm: &amp;#39;.875rem&amp;#39;,
        tiny: &amp;#39;.875rem&amp;#39;,
        base: &amp;#39;14px&amp;#39;,
        lg: &amp;#39;1.125rem&amp;#39;,
        xl: &amp;#39;1.25rem&amp;#39;,
        &amp;#39;2xl&amp;#39;: &amp;#39;1.5rem&amp;#39;,
        &amp;#39;3xl&amp;#39;: &amp;#39;1.875rem&amp;#39;,
        &amp;#39;4xl&amp;#39;: &amp;#39;2.25rem&amp;#39;,
        &amp;#39;5xl&amp;#39;: &amp;#39;3rem&amp;#39;,
        &amp;#39;6xl&amp;#39;: &amp;#39;4rem&amp;#39;,
        &amp;#39;7xl&amp;#39;: &amp;#39;5rem&amp;#39;,
      },
    },
  },
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用过程中的问题" tabindex="-1"><a class="header-anchor" href="#使用过程中的问题" aria-hidden="true">#</a> 使用过程中的问题</h3></li></ul><p>功能类优先的 原子化 CSS 框架，带来便利的同时，也是存在一些问题的。最突出的问题就是 html 上类过多，如果要实现一个相同功能，需要复制一个很长的字符串。这个情况下的可读性和复用性是比较差的。</p><p>比如一个简单按钮的例子：涉及到背景，字体，边距，边框的设置，类就很多</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;button
className=&amp;quot;bg-blue-400 text-sm text-white font-mono font-light py-2 px-4 border-2 border-rounded border-blue-200&amp;quot;
&amp;gt;
  Button
&amp;lt;/button&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而且相同样式复用需要整块的复制。虽然windicss提供属性化（&lt;https://windicss.org/features/attributify.html&gt;）的模式，Shortcuts（&lt;https://windicss.org/features/shortcuts.html&gt;）和指令（&lt;https://cn.windicss.org/features/directives.html&gt;）来解决相同功能类集合过长，过多的问题。但是从他的实现思路上看，已经不在是原子化的范畴了。</p><p>当然你也可以通过设计变量的方式来解决这个问题，但这种做法和抽象成一个组件的CSS类没有什么区别了。我们发现，原子化框架自身是无法解决这些问题的。但是我们使用CSS框架初衷是为了使CSS的维护性和复用性变高，而不是墨守成规，不变通。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const myButtonClass = &amp;quot;bg-blue-400 text-sm text-white font-mono font-light py-2 px-4 border-2 border-rounded border-blue-200&amp;quot;

&amp;lt;button
className={myButtonClass}
&amp;gt;
  Button
&amp;lt;/button&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>`,16),_={href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/@layer",target:"_blank",rel:"noopener noreferrer"},C={href:"https://cn.windicss.org/posts/v30-utilities.html",target:"_blank",rel:"noopener noreferrer"},w=e("h2",{id:"参考连接",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#参考连接","aria-hidden":"true"},"#"),i(" 参考连接")],-1),k={href:"https://www.smashingmagazine.com/2013/10/challenging-css-best-practices-atomic-approach/",target:"_blank",rel:"noopener noreferrer"},q={href:"https://css-tricks.com/lets-define-exactly-atomic-css/",target:"_blank",rel:"noopener noreferrer"},y={href:"https://github.com/windicss/windicss",target:"_blank",rel:"noopener noreferrer"},j=e("h2",{id:"推荐阅读",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#推荐阅读","aria-hidden":"true"},"#"),i(" 推荐阅读")],-1),z={href:"https://juejin.cn/post/7153410606673395725",target:"_blank",rel:"noopener noreferrer"},B={href:"https://juejin.cn/post/7145604963593355277",target:"_blank",rel:"noopener noreferrer"},E={href:"https://juejin.cn/post/7143025612267978760",target:"_blank",rel:"noopener noreferrer"},M={href:"https://juejin.cn/post/7140422304920109092",target:"_blank",rel:"noopener noreferrer"},O={href:"https://juejin.cn/post/7158607083699437605",target:"_blank",rel:"noopener noreferrer"},T=e("h2",{id:"开源作品",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#开源作品","aria-hidden":"true"},"#"),i(" 开源作品")],-1),N=e("ul",null,[e("li",null,"政采云前端小报")],-1),A={href:"http://zoo.zhengcaiyun.cn/",target:"_blank",rel:"noopener noreferrer"},I=e("ul",null,[e("li",null,"商品选择 sku 插件")],-1),L={href:"https://github.com/zcy-inc/skuPathFinder-back",target:"_blank",rel:"noopener noreferrer"},P=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),i(" 招贤纳士")],-1),D=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 90 余个前端小伙伴，平均年龄 27 岁，近 4 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),U=e("p",null,[i("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),V=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98d3aa3d1f8646a8bcda8cfd9e335a4b~tplv-k3u1fbpfcp-zoom-1.image",alt:""})],-1);function W(F,G){const n=r("ExternalLinkIcon");return d(),t("div",null,[m,v,e("p",null,[i("> 这是第 163 篇不掺水的原创，想获取更多原创好文，请搜索公众号关注我们吧~ 本文首发于政采云前端博客："),e("a",o,[i("小而美的 css 的原子化"),a(n)])]),p,e("p",null,[i("引用 "),e("a",u,[i("文章 Let’s Define Exactly What Atomic CSS is"),a(n)]),i(" 中定义：")]),b,e("p",null,[i("原子化 CSS 是一个 CSS 框架， 在没有对应的 CSS 框架的项目中，是如何写 CSS 的。我们引用 "),e("a",h,[i("Challenging CSS Best Practices"),a(n)]),i(" 文中例子来看看。")]),g,e("p",null,[i("考虑到我们自身项目项目是一个后台管理类的项目，有成熟组件库。日常 CSS 开发工作量和复杂度都不高。我们也希望有一个快速可以落地的框架方案，且实现的成本较低。我们对比几个框架后，选择 CSS 原子化作为我们的 CSS 的架构方案。CSS 原子化提供现成的解决方案，几乎就是拿就用（ "),e("a",f,[i("tailwindcss"),a(n)]),i(" ，"),e("a",S,[i("windicss"),a(n)]),i(" ）。而且成体接入和改造成本也是最低的，不用自己再制定命名规则和使用规范。")]),x,e("p",null,[i("在选定一个 CSS 框架作为项目的 CSS 规范的时候，需要考虑自身项目的现状，如果项目本身 CSS 复杂度较高，相对是偏向CSS工作量较多，原子化的 CSS 是不太适合的，建议去参考像ITCSS，其实ITCSS中的 Utilities – 工具类和原子化就很类似，但是他的分层更加的复杂。随着"),e("a",_,[i("CSS的级联层"),a(n)]),i("浏览器支持程度越来越好，类似ITCSS分层框架会慢慢流行起来。")]),e("p",null,[i("原子化的 CSS 可以帮助我们的项目解决 CSS 命名，代码重复，不断膨胀的问题，但它也不是一劳永逸的，实际使用中还是会有问题，关键在与开发者自身的取舍，权衡利弊。不要一个规则用到底，遇到问题也不变通。工具和思想发明其实也是为了解决你实际的问题。你会发现 "),e("a",C,[i("windicss"),a(n)]),i(" 这类工具优先的css框架，也是添加蛮多额外的功能来弥补原子化 CSS 框架的缺陷，提升自身使用体验。")]),w,e("ul",null,[e("li",null,[e("a",k,[i("Challenging CSS Best Practices"),a(n)])]),e("li",null,[e("a",q,[i("Let’s Define Exactly What Atomic CSS is"),a(n)])]),e("li",null,[e("a",y,[i("windicss"),a(n)])])]),j,e("p",null,[e("a",z,[i("所见即所得 —— HTML转图片组件开发"),a(n)])]),e("p",null,[e("a",B,[i("探索组件在线预览和调试"),a(n)])]),e("p",null,[e("a",E,[i("规范升级 NPM 包"),a(n)])]),e("p",null,[e("a",M,[i("你想知道的前后端协作规范都在这了"),a(n)])]),e("p",null,[e("a",O,[i("IntersectionObserver 实现虚拟列表初探"),a(n)])]),T,N,e("p",null,[e("strong",null,[i("开源地址 "),e("a",A,[i("www.zoo.team/openweekly/"),a(n)])]),i(" (小报官网首页有微信交流群)")]),I,e("p",null,[e("strong",null,[i("开源地址 "),e("a",L,[i("https://github.com/zcy-inc/skuPathFinder-back/"),a(n)])])]),P,D,U,V])}const R=l(c,[["render",W],["__file","小而美的 css 的原子化.html.vue"]]);export{R as default};
