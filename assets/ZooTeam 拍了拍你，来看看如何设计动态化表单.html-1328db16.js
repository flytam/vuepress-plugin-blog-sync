import{_ as t,z as o,A as e,Y as n,C as a,U as p,a6 as c,Q as l}from"./framework-cb9358d9.js";const i={},u=n("p",null,[n("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15f071dd74304d10afd8cf08c3b0d7a3~tplv-k3u1fbpfcp-zoom-1.image",alt:""})],-1),r={href:"https://www.zoo.team/article/dynamic-form",target:"_blank",rel:"noopener noreferrer"},k=c(`<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9162426f68004fb19eab875d22c49567~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>对于 ToB 业务而言，随着业务的不断壮大，接入的客户逐渐增加，相同页面的差异化的需求越来越多，尤其是在表单层面，小到多一个字段少一个字段这种简单的需求，大到整个页面不变的只剩下一些基础字段。</p><p>一旦这种差异化需求随着业务量的增长而膨胀起来。代码中的 IF ELSE 越来越多，项目就越来越难以维护。基于这个问题，比较普遍的解决方案要么是项目拆分，要么相同项目的代码分割。</p><p>这两种方案都有维护成本比较大的弊端，那么有没有更好点的解决方案呢。本文就带你了解一下动态化表单搭建。</p><h2 id="什么是动态表单" tabindex="-1"><a class="header-anchor" href="#什么是动态表单" aria-hidden="true">#</a> 什么是动态表单</h2><p>先下个定义，动态表单是页面根据管理端配置的不同的 Schema 结构，动态渲染出不同的表单项的表单。</p><p>动态表单一般分两个部分，管理端和渲染端。</p><p>管理端配置表单项及相应的简单交互产出 Schema 数据。</p><p>渲染端根据 Schema 数据相应的渲染出不同的表单项并实现简单的交互。大致流程如下。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6e23314674a4a50b6167c65e618879f~tplv-k3u1fbpfcp-zoom-1.image" alt="图片"></p><h2 id="动态表单的实现" tabindex="-1"><a class="header-anchor" href="#动态表单的实现" aria-hidden="true">#</a> 动态表单的实现</h2><h3 id="表单配置" tabindex="-1"><a class="header-anchor" href="#表单配置" aria-hidden="true">#</a> 表单配置</h3><p>对于 Schema 数据的配置，考虑到接入业务方的接入成本及维护成本。</p><p>管理端采用了可拖拽式的所见即所得配置面板。这里共分为四个部分，备选组件面板，拖拽面板，组件属性面板和表单属性配置（视图属性）。</p><p>具体实现如下图：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/756728d245be4390a32bfc2221ce0280~tplv-k3u1fbpfcp-zoom-1.image" alt="图片"></p><h4 id="备选组件面板" tabindex="-1"><a class="header-anchor" href="#备选组件面板" aria-hidden="true">#</a> 备选组件面板</h4><p>左侧备选组件栏里的备选组件共分三种，容器组件，基础组件，自定义组件。</p><ul><li>容器组件——是用来存放基础组件的组件。例如表单组件，子表单组件，表格表单组件。这些组件都是内部可以存放其他子组件的组件。属于容器组件。系统内置了 3 个容器组件，对于中台系统而言，容器组件不会太多样化。所以容器组件没有做自定义组件的功能。当然后期如果需要的话也可以扩展出容器组件的自定义组件功能</li><li>基础组件——就是普通的表单项。系统内置了 13 个基础组件。这些组件都是基于 Antd 的 React 组件做的二次包装</li><li>自定义组件——业务方经常出现一些个性化的表单项，例如某个输入框后面加个链接跳转之类的需求，对于这种组件，系统提供了自定义组件的注册及配置功能。这样业务方就可以自由的维护专属于自己的业务表单组件了。同时也解放出表单系统维护者的时间。组件注册同时也是一个更加轻量级的自定义组件模块。因为不同的组件需要设置不同的参数，所以该组件对应的右侧属性表单也应该是不同。这部分下文组件属性部分会详细说明</li></ul><h4 id="拖拽面板" tabindex="-1"><a class="header-anchor" href="#拖拽面板" aria-hidden="true">#</a> 拖拽面板</h4><p>拖拽面板就是维护组件展示关系的面板，同时提供拖拽排序、删除、复制、预览等功能。</p><p>具体实现方案采用的是 React-DnD 。</p><h4 id="组件配置" tabindex="-1"><a class="header-anchor" href="#组件配置" aria-hidden="true">#</a> 组件配置</h4><p>属性配置面板本身就是个更加轻量级的动态表单实现。</p><p>只是 Schema 由开发者直接写死而没有一个可配置的页面而已（自定义组件注册部分例外）。</p><p>当在拖拽面板选中一个组件时，组件属性配置面板会渲染出相应组件的可配置项表单， 这里提供一下简单的组件属性配置面板的 Schema 供大家参考。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">[</span><span class="token punctuation">{</span>
  <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token operator">&amp;</span>#<span class="token number">39</span><span class="token punctuation">;</span>是否可见<span class="token operator">&amp;</span>#<span class="token number">39</span><span class="token punctuation">;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token operator">&amp;</span>#<span class="token number">39</span><span class="token punctuation">;</span>visible<span class="token operator">&amp;</span>#<span class="token number">39</span><span class="token punctuation">;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">widget</span><span class="token operator">:</span> <span class="token operator">&amp;</span>#<span class="token number">39</span><span class="token punctuation">;</span>switchBtn<span class="token operator">&amp;</span>#<span class="token number">39</span><span class="token punctuation">;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">initialValue</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token operator">&amp;</span>#<span class="token number">39</span><span class="token punctuation">;</span>是否可编辑<span class="token operator">&amp;</span>#<span class="token number">39</span><span class="token punctuation">;</span><span class="token punctuation">,</span> <span class="token comment">// 标签文案</span>
  <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token operator">&amp;</span>#<span class="token number">39</span><span class="token punctuation">;</span>code<span class="token operator">&amp;</span>#<span class="token number">39</span><span class="token punctuation">;</span><span class="token punctuation">,</span> <span class="token comment">// 字段编码</span>
  <span class="token literal-property property">widget</span><span class="token operator">:</span> <span class="token operator">&amp;</span>#<span class="token number">39</span><span class="token punctuation">;</span>switchBtn<span class="token operator">&amp;</span>#<span class="token number">39</span><span class="token punctuation">;</span><span class="token punctuation">,</span> <span class="token comment">// 组件类型</span>
  <span class="token literal-property property">initialValue</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 初始值 默认可编辑</span>
  <span class="token literal-property property">hide</span><span class="token operator">:</span> <span class="token operator">&amp;</span>#<span class="token number">39</span><span class="token punctuation">;</span>exp<span class="token operator">:</span> visible <span class="token operator">===</span> <span class="token boolean">false</span><span class="token operator">&amp;</span>#<span class="token number">39</span><span class="token punctuation">;</span><span class="token punctuation">,</span> <span class="token comment">// 是否隐藏</span>
  <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 是否必填</span>
<span class="token punctuation">}</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>细心的同学会发现 hide 字段写了个表达式。这里通过 <code>exp: </code>开头作为一个表达式的标识。表达式的可以使用的变量是属性表单内的值。</p><p>比如上面这个例子，visible 是上面定义了一个是否可见的字段。如果当前选中的这个组件不可见的话，是否可编辑本身就无从谈起，所以直接隐藏掉。</p><p><strong>容器属性</strong> 共有的属性有标题、编码、是否可见、以及容器结构是否对数据透明。</p><p>前面三个好理解。容器结构是否对数据透明是什么呢?</p><p>前面说过，我们的容器组件是可多层嵌套的，那问题来了，数据咋办，表单嵌套会导致数据也跟着嵌套。所以这里参考了阿里的 Formily 开源表单方案。使用一个 skip ，来使其对数据透明。即：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>title<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token operator">:</span> <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>表单<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token punctuation">,</span>
  <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>type<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token operator">:</span> <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>form<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token punctuation">,</span>
  <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>fields<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
    <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>name<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token operator">:</span> <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>name<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token punctuation">,</span>
    <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>label<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token operator">:</span> <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>姓名<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>title<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token operator">:</span> <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>子表单<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token punctuation">,</span>
    <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>skip<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 表单结构对数据透明</span>
    <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>name<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token operator">:</span> <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>item<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token punctuation">,</span>
    <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>type<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token operator">:</span> <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>form<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token punctuation">,</span>
    <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>fields<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>name<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token operator">:</span> <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>object<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token punctuation">,</span>
        <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>label<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token operator">:</span> <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>物品<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>name<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token operator">:</span> <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>brand<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token punctuation">,</span>
        <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>label<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token operator">:</span> <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>品牌<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>skip 为 false 时返回的数据为：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  &amp;quot;name&amp;quot;<span class="token operator">:</span> &amp;quot;简名&amp;quot;<span class="token punctuation">,</span>
  &amp;quot;item&amp;quot;<span class="token operator">:</span> <span class="token punctuation">{</span>
    &amp;quot;object&amp;quot;<span class="token operator">:</span> &amp;quot;电脑&amp;quot;<span class="token punctuation">,</span>
    &amp;quot;brand&amp;quot;<span class="token operator">:</span> &amp;quot;Mac&amp;quot;
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>skip 为 true 时返回的数据为：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  &amp;quot;name&amp;quot;<span class="token operator">:</span> &amp;quot;简名&amp;quot;<span class="token punctuation">,</span>
  &amp;quot;object&amp;quot;<span class="token operator">:</span> &amp;quot;电脑&amp;quot;<span class="token punctuation">,</span>
  &amp;quot;brand&amp;quot;<span class="token operator">:</span> &amp;quot;Mac&amp;quot;
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>组件属性</strong> 分为基本属性和组件属性，基本属性是所有属性共有的。标题，编码，是否可见，是否必填等属性都是基本属性。组件属性则是组件私有的属性。</p><p>比如 Select 组件会需要一个数据来源，以及该组件是否多选之类的。基本属性直接写死。组件私有属性则通过远程数据库维护。自定义组件的注册就需要涉及到这部分的数据管理。</p><p>自定义组件的注册表单如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23e0197a242b4ed4a0c7d2961b47ea2d~tplv-k3u1fbpfcp-zoom-1.image" alt="图片"></p><p>其中组件可配置属性就是组件私有的属性的定义，注册时定义，配置该组件时赋值，渲染端渲染时应用。可配置属性还需要支持表达式的填写。</p><p>比如某个组件需要远程数据，url 提供了，但是参数需要取当前时间，这个时候就需要组件属性支持表达式的解析或者少量代码读写运行了。</p><p>这些属性除了组件自定义属性以外，还有组件默认值，组件自定义校验，组件 onChange 事件。</p><p>以自定义校验为例：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/035f33c0ed2b4e378339816acfd36816~tplv-k3u1fbpfcp-zoom-1.image" alt="图片"></p><h4 id="表单属性配置-视图属性" tabindex="-1"><a class="header-anchor" href="#表单属性配置-视图属性" aria-hidden="true">#</a> 表单属性配置（视图属性）</h4><p>这部分在上图中没有显示，是在组件属性右侧。表单属性分两部分，交互规则和接口绑定。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bfd2851512eb4a44970ef4d66b2dec68~tplv-k3u1fbpfcp-zoom-1.image" alt="图片"></p><p><strong>交互规则</strong> 表单交互规则在表单级别绑定，而不是在字段级别。进行就近配置的目的，是为了方便管理，进入一个表单配置，该表单的交互在右侧一目了然。</p><p><strong>接口绑定</strong> 则是表单渲染过程中有可能涉及到一些远程数据的读取，比如默认值等。这部分数据的配置需要用到远程数据。表单上绑定了接口之后，表单初始化之前先发请求获取绑定接口的数据，相应的表单组件里就可以使用到该数据进行初始化。</p><h4 id="管理端数据流转" tabindex="-1"><a class="header-anchor" href="#管理端数据流转" aria-hidden="true">#</a> 管理端数据流转</h4><p>管理端的功能是构建出一个目标 Schema。</p><p>每个备选组件都有基本信息和相应的组件可配置属性信息。</p><p>组件基本信息主要用于组件面板展现。组件可配置属性需要在右侧属性配置时渲染成一个表单给使用者去配置，故而组件可配置信息又是一个简化版的 Schema，这里称为组件级 Schema。</p><p>在拖拽页面中添加一个组件，通过解析组件的组件级 Schema 及组件放置位置给目标 Schema 添加一个组件数据。</p><p>然后在拖拽页面中选中该组件，右侧属性配置会相应渲染出组件级 Schema 所描述的表单给用户配置填写。用户配置时直接修改目标 Schema 中相应选中组件的信息。</p><p>数据流转图大致如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d39c1b07d2114c1db973cd7285823ba5~tplv-k3u1fbpfcp-zoom-1.image" alt="图片"></p><h3 id="表单动态渲染" tabindex="-1"><a class="header-anchor" href="#表单动态渲染" aria-hidden="true">#</a> 表单动态渲染</h3><p>因为表单页面还会有各种定制化的需求，表单渲染端这里采用组件的形式，提供了两个组件，一个组件作为表单页面的外层包裹组件主要功能是发请求获取相应的 schema.json 数据。</p><p>另一个组件就是通过上层组件的数据渲染相应的表单。示例：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> FormPageWrap<span class="token punctuation">,</span> MainForm <span class="token punctuation">}</span> from <span class="token operator">&amp;</span>#<span class="token number">39</span><span class="token punctuation">;</span><span class="token punctuation">.</span><span class="token operator">/</span>index<span class="token operator">&amp;</span>#<span class="token number">39</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
@<span class="token function">FormPageWrap</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  prefix<span class="token operator">:</span> <span class="token operator">&amp;</span>#<span class="token number">39</span><span class="token punctuation">;</span><span class="token operator">/</span>api<span class="token operator">/</span>budget<span class="token operator">&amp;</span>#<span class="token number">39</span><span class="token punctuation">;</span><span class="token punctuation">,</span> <span class="token comment">// 业务方接口前缀</span>
  getFormParams<span class="token operator">:</span> <span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&amp;</span>gt<span class="token punctuation">;</span> <span class="token punctuation">{</span> <span class="token comment">// 获取表单结构参数</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  getDataParams<span class="token operator">:</span> <span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&amp;</span>gt<span class="token punctuation">;</span> <span class="token punctuation">{</span> <span class="token comment">// 获取表单回填数据参数</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">FormPage</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&amp;</span>lt<span class="token punctuation">;</span>div<span class="token operator">&amp;</span>gt<span class="token punctuation">;</span>
        <span class="token comment">// 表单各种额外显示内容</span>
        <span class="token operator">&amp;</span>lt<span class="token punctuation">;</span>MainForm <span class="token comment">// 表单渲染组件</span>
          customComponent<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>
            test<span class="token operator">:</span> TestComp<span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">}</span>
          extraParams<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token operator">/</span><span class="token operator">&amp;</span>gt<span class="token punctuation">;</span>
        <span class="token comment">// 表单各种额外显示内容</span>
      <span class="token operator">&amp;</span>lt<span class="token punctuation">;</span><span class="token operator">/</span>div<span class="token operator">&amp;</span>gt<span class="token punctuation">;</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>内部实现则是根据 Schema 渲染相应的组件。</p><h2 id="待完善" tabindex="-1"><a class="header-anchor" href="#待完善" aria-hidden="true">#</a> 待完善</h2><p>目前系统部分功能还有待完善。具体有几点：</p><ul><li>自定义组件的异步加载。当一个表单需要新增加一个自定义组件时，项目需要重新构建发版。如果自定义组件可以单独发布，就可以做到及时添加一个自定义组件，不需要项目重新构建发布了。当然如果自定义组件太多，异步加载还是会有些性能问题。而这就需要做到同页面下多组件代码合并了</li><li>一些配置的沉淀复用。比如某些经常配置的表单块。可以沉淀为常用组件。直接选择使用，可进一步简化配置流程</li><li>同页面下的一些相同区块，如果每个页面都单独维护，会极大的增加维护成本、抽取并联动，可以极大的减少维护表单的成本</li></ul><h2 id="展望" tabindex="-1"><a class="header-anchor" href="#展望" aria-hidden="true">#</a> 展望</h2><p>对于动态化表单的能力远不止目前看到的动态表单搭建：</p><ul><li>对于管理端流转出来的 Schema 数据可以进行二次加工，从而实现对于用户的权限，业务配置等能力的扩展</li><li>管理端配置出来的 Schema 不止可以用在动态表单渲染中，还可以作为数据模型去描述一个静态数据的结构。从而提供各业务系统配置数据的构建能力</li><li>前端渲染组件也不一定要和管理端的 Schema 完全耦合在一起。单独拿来使用也是完全没问题的，这样对于某些简化版动态表单的能力也能做到支持</li></ul><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,72),m={href:"https://juejin.cn/post/6844904196651630599",target:"_blank",rel:"noopener noreferrer"},d={href:"https://juejin.cn/post/6844904182822993927",target:"_blank",rel:"noopener noreferrer"},v=n("h2",{id:"招贤纳士",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),a(" 招贤纳士")],-1),b=n("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),h=n("p",null,[a("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),n("code",null,"ZooTeam@cai-inc.com")],-1),f=n("p",null,[n("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f561cccfe56e4992b93077d1f76e8fd9~tplv-k3u1fbpfcp-zoom-1.image",alt:""})],-1);function q(g,_){const s=l("ExternalLinkIcon");return o(),e("div",null,[u,n("p",null,[a('> 这是第 <font size=3 color="red">58</font> 篇不掺水的原创，想获取更多原创好文，请扫 👆 上方二维码关注我们吧~ > 本文首发于政采云前端团队博客：'),n("a",r,[a("ZooTeam 拍了拍你，来看看如何设计动态化表单"),p(s)])]),k,n("p",null,[n("a",m,[a("分分钟教会你搭建企业级的 npm 私有仓库"),p(s)])]),n("p",null,[n("a",d,[a("一份值得收藏的 Git 异常处理清单"),p(s)])]),v,b,h,f])}const y=t(i,[["render",q],["__file","ZooTeam 拍了拍你，来看看如何设计动态化表单.html.vue"]]);export{y as default};
