import{_ as t,z as r,A as l,Y as e,C as n,U as s,a6 as i,Q as d}from"./framework-cb9358d9.js";const m={},c=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8d2b0103c1fa~tplv-t2oaga2asx-image.image",alt:""})],-1),o=e("h2",{id:"",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#","aria-hidden":"true"},"#"),n(" **")],-1),u=e("p",null,'<table><tbody><tr><td bgcolor="#FDFFE7"><font size="4">原创不易，希望能关注下我们，再顺手点个赞~~<font></font></font></td></tr></tbody></table> **',-1),v={href:"https://www.zoo.team/article/computed",target:"_blank",rel:"noopener noreferrer"},p=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/9/16e507c49ce6ca79~tplv-t2oaga2asx-image.image",alt:"不二.png"})],-1),b=e("h3",{id:"前言-关于计算属性",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#前言-关于计算属性","aria-hidden":"true"},"#"),n(" 前言，关于计算属性")],-1),h={href:"https://cn.vuejs.org/v2/guide/computed.html",target:"_blank",rel:"noopener noreferrer"},g=i(`<p>&gt; 模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。</p><p>回想我们编写的 React 代码，是否也在 JSX（render 函数）中放入了太多的逻辑导致 <code>render</code> 函数过于庞大，难以维护？</p><h3 id="react-中的计算属性" tabindex="-1"><a class="header-anchor" href="#react-中的计算属性" aria-hidden="true">#</a> React 中的计算属性</h3><p>说到 React 之前，我们先看下 Vue，在 Vue 中，计算属性主要有以下两点特性：</p><ol><li>计算属性以声明的方式创建依赖关系，依赖的 data 或 props 变更会触发重新计算并自动更新。</li><li>计算属性是基于它们的响应式依赖进行缓存的。</li></ol><p>而在 React 中，计算属性也是经常可见，相信各位熟悉 React 的读者都写过类似下面的代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import React, { Fragment, Component } from &amp;#39;react&amp;#39;;

class Example extends Component {
  state = {
    firstName: &amp;#39;&amp;#39;,
    lastName: &amp;#39;&amp;#39;,
  };

  render() {
    // 在 render 函数中处理逻辑
    const { firstName, lastName } = this.state;
    const fullName = \`\${firstName} \${lastName}\`;
    return &amp;lt;Fragment&amp;gt;{fullName}&amp;lt;/Fragment&amp;gt;;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码里，render 函数里的 <code>fullName</code> 依赖了 <code>props</code> 中的 <code>firstName</code> 和 <code>lastName</code> 。<code>firstName</code> 或 <code>lastName</code> 变更之后，变量 <code>fullName</code> 都会自动更新。其实现原理是 <strong>props 以及 state 的变化会导致 render 函数调用，进而重新计算衍生值。</strong></p><p>虽然能实现计算，但我们还是把计算逻辑放入了 render 函数导致了它的臃肿，这并不优雅。更好的做法是把计算逻辑抽出来，简化 render 函数逻辑：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class Example extends Component {
  state = {
    firstName: &amp;#39;&amp;#39;,
    lastName: &amp;#39;&amp;#39;,
  };

  // 把 render 中的逻辑抽成函数,减少render函数的臃肿
  renderFullName() {
    const { firstName, lastName } = this.state;
    return \`\${firstName} \${lastName}\`;
  }

  render() {
    const fullName = this.renderFullName();
    return &amp;lt;Fragment&amp;gt;{fullName}&amp;lt;/Fragment&amp;gt;;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你对 Vue 很了解，你肯定知道其 computed 计算属性，底层是使用了getter，只不过是对象的 getter。那么在 React 中，我们也可以使用类的 getter 来实现计算属性：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class Example extends Component {
  state = {
    firstName: &amp;#39;&amp;#39;,
    lastName: &amp;#39;&amp;#39;,
  };

  // 通过getter而不是函数形式，减少变量
  get fullName() {
    const { firstName, lastName } = this.state;
    return \`\${firstName} \${lastName}\`;
  }

  render() {
    return &amp;lt;Fragment&amp;gt;{this.fullName}&amp;lt;/Fragment&amp;gt;;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="进一步-使用-memoization-优化计算属性" tabindex="-1"><a class="header-anchor" href="#进一步-使用-memoization-优化计算属性" aria-hidden="true">#</a> 进一步，使用 memoization 优化计算属性</h3><p>上文有提到在 Vue 中计算属性对比函数执行，会有缓存，减少计算。因为计算属性只有在它的相关依赖发生改变时才会重新求值。</p><p>这就意味着只要 firstName 和 lastName 还没有发生改变，多次访问 fullName 计算属性会立即返回之前的计算结果，而不必再次执行函数。</p><p>对比之下，React 的 getter 是否也有缓存这个优势？？？ <strong>答案是：没有。React 中的 getter 并没有做缓存优化</strong>！</p><p>不过不用失望，我们可以使用记忆化技术（memoization）来优化我们的计算属性，达到和 Vue 中计算属性一样的效果。我们需要在项目中引入 memoize-one 库，代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import memoize from &amp;#39;memoize-one&amp;#39;;
import React, { Fragment, Component } from &amp;#39;react&amp;#39;;

class Example extends Component {
  state = {
    firstName: &amp;#39;&amp;#39;,
    lastName: &amp;#39;&amp;#39;,
  };

  // 如果和上次参数一样，\`memoize-one\` 会重复使用上一次的值。
  getFullName = memoize((firstName, lastName) =&amp;gt; \`\${firstName} \${lastName}\`);

  get fullName() {
    return this.getFullName(this.state.firstName, this.state.lastName);
  }

  render() {
    return &amp;lt;Fragment&amp;gt;{this.fullName}&amp;lt;/Fragment&amp;gt;;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="再进一步-使用-react-hooks-优化计算属性" tabindex="-1"><a class="header-anchor" href="#再进一步-使用-react-hooks-优化计算属性" aria-hidden="true">#</a> 再进一步，使用 React Hooks 优化计算属性</h3>`,19),_={href:"https://juejin.cn/post/6844903938018263048",target:"_blank",rel:"noopener noreferrer"},f=e("code",null,"useMemo",-1),N=e("code",null,"useMemo",-1),x={href:"https://zh-hans.reactjs.org/docs/hooks-reference.html#usememo",target:"_blank",rel:"noopener noreferrer"},R=e("strong",null,"回调函数",-1),F=e("strong",null,"依赖列表",-1),k=i(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import React, { useState, useMemo } from &amp;#39;react&amp;#39;;

function Example(props) {
  const [firstName, setFirstName] = useState(&amp;#39;&amp;#39;);
  const [lastName, setLastName] = useState(&amp;#39;&amp;#39;);
  // 使用 useMemo 函数缓存计算过程
  const renderFullName = useMemo(() =&amp;gt; \`\${firstName} \${lastName}\`, [
    firstName,
    lastName,
  ]);

  return &amp;lt;div&amp;gt;{renderFullName}&amp;lt;/div&amp;gt;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>本文介绍了在 React 中如何实现类似 Vue 计算属性（computed）的效果 —— 基于依赖缓存计算结果，实现逻辑计算与视图渲染的解耦，降低 render 函数的复杂度。</p><p>从业务开发角度来讲，Vue 提供的 API 极大地提高了开发效率。React 虽然在某些场景下，没有官方的同类原生 API 支持，但得益于活跃的社区，工作中遇到的问题总能找到解决方案。且在摸索这些解决方案的同时，我们还能学习到诸多经典的编程思想，帮助我们更合理的运用框架，用技术解决业务问题。</p><h2 id="招贤纳士" tabindex="-1"><a class="header-anchor" href="#招贤纳士" aria-hidden="true">#</a> 招贤纳士</h2><p>招人，前端，隶属政采云前端大团队（ZooTeam），50 余个小伙伴正等你加入一起浪～ 如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变“5年工作时间3年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手参与一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给<code>ZooTeam@cai-inc.com</code></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,8),j={href:"https://juejin.cn/post/6844903950508883982",target:"_blank",rel:"noopener noreferrer"},z={href:"https://juejin.cn/post/6844903959224664077",target:"_blank",rel:"noopener noreferrer"},V={href:"https://juejin.cn/post/6844903933580673032",target:"_blank",rel:"noopener noreferrer"};function $(E,C){const a=d("ExternalLinkIcon");return r(),l("div",null,[c,o,u,e("p",null,[n("> 本文首发于政采云前端团队博客： "),e("a",v,[n("乾坤大挪移！React 也能 “用上” computed 属性"),s(a)])]),p,b,e("p",null,[n("初次见到计算属性一词，是在 Vue 官方文档 "),e("a",h,[n("《计算属性和侦听器》"),s(a)]),n(" 一节中，文章中是这样描述计算属性的：")]),g,e("p",null,[n("上文在 React 中使用了 memoize-one 库实现了类似 Vue 计算属性（computed）的效果 —— 基于依赖缓存计算结果。得益于React 16.8 新推出的 Hooks 特性，我们可以对逻辑进行更优雅的封装，对 Hooks 还不够了解的小伙伴可以先阅读我们团队另一篇文章 "),e("a",_,[n("《看完这篇，你也能把 React Hooks 玩出花》"),s(a)])]),e("p",null,[n("此处，我们需要用到 "),f,n("。官方对 "),N,n(" 的介绍在 "),e("a",x,[n("这里"),s(a)]),n("，详情请移步查看。简单的说，就是我们传入一个 "),R,n(" 和一个 "),F,n("，React 会在依赖列表中的值变化时，调用这个回调函数，并将回调函数返回的结果进行缓存：")]),k,e("p",null,[e("a",j,[n("前端工程实践之可视化搭建系统（一）"),s(a)])]),e("p",null,[e("a",z,[n("写给前端工程师的 Serverless 入门"),s(a)])]),e("p",null,[e("a",V,[n("自动化 Web 性能优化分析方案"),s(a)])])])}const y=t(m,[["render",$],["__file","乾坤大挪移！React 也能 “用上” computed 属性.html.vue"]]);export{y as default};
