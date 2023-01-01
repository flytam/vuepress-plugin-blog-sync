import{_ as d,z as s,A as t,Y as e,C as n,U as a,a6 as l,Q as r}from"./framework-cb9358d9.js";const o={},c=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8d2b0103c1fa~tplv-t2oaga2asx-image.image",alt:""})],-1),m=e("h2",{id:"",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#","aria-hidden":"true"},"#"),n(" **")],-1),v=e("p",null,'<table><tbody><tr><td bgcolor="#FDFFE7"><font size="4">原创不易，希望能关注下我们，再顺手点个赞~~<font></font></font></td></tr></tbody></table> **',-1),u={href:"http://www.zoo.team/article/react-render",target:"_blank",rel:"noopener noreferrer"},p=l(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/27/16eac74e4a6156cc~tplv-t2oaga2asx-image.image" alt=""></p><h3 id="性能和渲染-render-正相关" tabindex="-1"><a class="header-anchor" href="#性能和渲染-render-正相关" aria-hidden="true">#</a> 性能和渲染（Render）正相关</h3><p>React 基于虚拟 DOM 和高效 Diff 算法的完美配合，实现了对 DOM 最小粒度的更新。大多数情况下，React 对 DOM 的渲染效率足以我们的业务日常。但在个别复杂业务场景下，性能问题依然会困扰我们。此时需要采取一些措施来提升运行性能，其很重要的一个方向，就是<strong>避免不必要的渲染（Render）</strong>。</p><h3 id="渲染-render-时影响性能的点" tabindex="-1"><a class="header-anchor" href="#渲染-render-时影响性能的点" aria-hidden="true">#</a> 渲染（Render）时影响性能的点</h3><p>React 的处理 render 的基本思维模式是每次一有变动就会去重新渲染整个应用。在 Virtual DOM 没有出现之前，最简单的方法就是直接调用 innerHTML。Virtual DOM 厉害的地方并不是说它比直接操作 DOM 快，而是说不管数据怎么变，都会尽量以最小的代价去更新 DOM。React 将 render 函数返回的虚拟 DOM 树与老的进行比较，从而确定 DOM 要不要更新、怎么更新。当 DOM 树很大时，遍历两棵树进行各种比对还是相当耗性能的，特别是在顶层 setState 一个微小的修改，默认会去遍历整棵树。尽管 React 使用高度优化的 Diff 算法 ，但是这个过程仍然会损耗性能。</p><h3 id="渲染-render-何时会被触发" tabindex="-1"><a class="header-anchor" href="#渲染-render-何时会被触发" aria-hidden="true">#</a> 渲染（Render）何时会被触发</h3><h4 id="○-组件挂载" tabindex="-1"><a class="header-anchor" href="#○-组件挂载" aria-hidden="true">#</a> ○ 组件挂载</h4><p>React 组件构建并将 DOM 元素插入页面的过程称为挂载。当组件首次渲染的时候会调用 render，这个过程不可避免。</p><h4 id="○-setstate-方法被调用" tabindex="-1"><a class="header-anchor" href="#○-setstate-方法被调用" aria-hidden="true">#</a> ○ setState() 方法被调用</h4><p>setState 是 React 中最常用的命令，通常情况下，执行 setState 会触发 render。但是这里有个点值得关注，执行 setState 的时候一定会重新渲染吗？答案是不一定。当 <code>setState</code> 传入 <code>null</code> 的时候，并不会触发 render ，可以运行下面的 Demo 来佐证：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class App extends React.Component {
  state = {
    a: 1
  };

  render() {
    console.log(&amp;quot;render&amp;quot;);
    return (
      &amp;lt;&amp;gt;
        &amp;lt;p&amp;gt;{this.state.a}&amp;lt;/p&amp;gt;
        &amp;lt;button
          onClick={() =&amp;gt; {
            this.setState({ a: 1 }); // 这里并没有改变 a 的值
          }}
        &amp;gt;
          Click me
        &amp;lt;/button&amp;gt;
        &amp;lt;button onClick={() =&amp;gt; this.setState(null)}&amp;gt;setState null&amp;lt;/button&amp;gt;
        &amp;lt;Child /&amp;gt;
      &amp;lt;/&amp;gt;
    );
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="○-父组件重新渲染" tabindex="-1"><a class="header-anchor" href="#○-父组件重新渲染" aria-hidden="true">#</a> ○ 父组件重新渲染</h4><p>只要父组件重新渲染了，默认情况下，即使传入子组件的 props 未发生变化，那么子组件也会重新渲染 ，进而触发 <code>render</code>。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/27/16eaaba181732a7d~tplv-t2oaga2asx-image.image" alt="Parent and Child Component"></p><p>我们对上面的 demo 进行稍微的修改，可以看出当点击按钮的时候，<code>Child</code> 组件的 <code>props</code> 并没有发生变化，但是也触发了 <code>render</code> 方法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const Child = () =&amp;gt; {
  console.log(&amp;quot;child render&amp;quot;);
  return &amp;lt;div&amp;gt;child&amp;lt;/div&amp;gt;;
};

class App extends React.Component {
  state = {
    a: 1
  };

  render() {
    console.log(&amp;quot;render&amp;quot;);
    return (
      &amp;lt;&amp;gt;
        &amp;lt;p&amp;gt;{this.state.a}&amp;lt;/p&amp;gt;
        &amp;lt;button
          onClick={() =&amp;gt; {
            this.setState({ a: 1 });
          }}
        &amp;gt;
          Click me
        &amp;lt;/button&amp;gt;
        &amp;lt;button onClick={() =&amp;gt; this.setState(null)}&amp;gt;setState null&amp;lt;/button&amp;gt;
        &amp;lt;Child /&amp;gt;
      &amp;lt;/&amp;gt;
    );
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="优化-render-我们能做什么" tabindex="-1"><a class="header-anchor" href="#优化-render-我们能做什么" aria-hidden="true">#</a> 优化 Render 我们能做什么？</h3><p>上文描述的 React 组件渲染机制其实是一种较好的做法，很好地避免了在每一次状态更新之后，需要去手动执行重新渲染的相关操作。鱼和熊掌不可兼得，带来方便的同时也会存在一些问题，当子组件过多或者组件的层级嵌套过深时，因为反反复复重新渲染状态没有改变的组件，可能会增加渲染时间又会影响用户体验，此时就需要对 React 的 render 进行优化。</p><p>上面说了<strong>不必要的 render 会带来性能问题</strong>，因此我们的主要优化思路就是减少不必要的 render。</p><h4 id="○-shouldcomponentupdate-和-purecomponent" tabindex="-1"><a class="header-anchor" href="#○-shouldcomponentupdate-和-purecomponent" aria-hidden="true">#</a> ○ shouldComponentUpdate 和 PureComponent</h4><p>在 React 类组件中，可以利用 <code>shouldComponentUpdate</code> 或者 <code>PureComponent</code> 来减少因父组件更新而触发子组件的 render，从而达到目的。shouldComponentUpdate 来决定是否组件是否重新渲染，如果不希望组件重新渲染，返回 false 即可。</p><p>在 React 中 PureComponet 的源码为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if (this._compositeType === CompositeTypes.PureClass) {
  shouldUpdate = !shallowEqual(prevProps, nextProps) || ! shallowEqual(inst.state, nextState);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看函数名就能够理解，PureComponet 通过对 props 和 state的浅比较结果来实现 shouldComponentUpdate，当对象包含复杂的数据结构时，可能就不灵了，对象深层的数据已改变却没有触发 render。</p><p>看到这里，顺便看一下 <code>shallowEqual</code> 是如何实现的。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * is 方法来判断两个值是否是相等的值，为何这么写可以移步 MDN 的文档
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x: mixed, y: mixed): boolean {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x &amp;amp;&amp;amp; y !== y;
  }
}

function shallowEqual(objA: mixed, objB: mixed): boolean {
  // 首先对基本类型进行比较
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== &amp;#39;object&amp;#39; || objA === null ||
      typeof objB !== &amp;#39;object&amp;#39; || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
	
  // 长度不相等直接返回false
  if (keysA.length !== keysB.length) {
    return false;
  }

  // key相等的情况下，再去循环比较
  for (let i = 0; i &amp;lt; keysA.length; i++) {
    if (
      !hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="○-利用高阶组件" tabindex="-1"><a class="header-anchor" href="#○-利用高阶组件" aria-hidden="true">#</a> ○ 利用高阶组件</h4><p>在函数组件中，并没有 shouldComponentUpdate 这个生命周期，可以利用高阶组件，封装一个类似 <code>PureComponet</code> 的功能</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const shouldComponentUpdate = arePropsEqual =&amp;gt; BaseComponent =&amp;gt; {
  class ShouldComponentUpdate extends React.Component {
    shouldComponentUpdate(nextProps) {
      return arePropsEqual(this.props, nextProps)
    }
    
    render() {
      return &amp;lt;BaseComponent {...this.props} /&amp;gt;
    }
  }
  
  ShouldComponentUpdate.displayName = \`Pure(\${BaseComponent.displayName})\`;
  return ShouldComponentUpdate;
}

const Pure = BaseComponent =&amp;gt; {
  const hoc = shouldComponentUpdate(
  	(props, nextProps) =&amp;gt; !shallowEqual(props, nextProps)
  )
  
  return hoc(BaseComponent);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code>Pure</code> 高阶组件的时候，只需要对我们的子组件进行装饰即可。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import React from &amp;#39;react&amp;#39;;

const Child = (props) =&amp;gt; &amp;lt;div&amp;gt;{props.name}&amp;lt;/div&amp;gt;;

export default Pure(Child);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="○-使用-react-memo" tabindex="-1"><a class="header-anchor" href="#○-使用-react-memo" aria-hidden="true">#</a> ○ 使用 React.memo</h4><p><code>React.memo</code> 是 React 16.6 新的一个 API，用来缓存组件的渲染，避免不必要的更新，其实也是一个高阶组件，与 <code>PureComponent</code> 十分类似，但不同的是， <code>React.memo</code> 只能用于函数组件 。</p><p><strong>基本用法</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import { memo } from &amp;#39;react&amp;#39;;

function Button(props) {
  // Component code
}

export default memo(Button);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>高级用法</strong></p><p>默认情况下其只会对 props 做浅层对比，遇到层级比较深的复杂对象时，表示力不从心了。对于特定的业务场景，可能需要类似 <code>shouldComponentUpdate</code> 这样的 API，这时通过 <code>memo</code> 的第二个参数来实现：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function arePropsEqual(prevProps, nextProps) {
  // your code
  return prevProps === nextProps;
}

export default memo(Button, arePropsEqual);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>&gt; 注意：与 <code>shouldComponentUpdate</code> 不同的是，<code>arePropsEqual</code> 返回 <code>true</code> 时，不会触发 render，如果返回 <code>false</code>，则会。而 <code>shouldComponentUpdate</code> 刚好与其相反。</p><h4 id="○-合理拆分组件" tabindex="-1"><a class="header-anchor" href="#○-合理拆分组件" aria-hidden="true">#</a> ○ 合理拆分组件</h4><p>微服务的核心思想是：以更轻、更小的粒度来纵向拆分应用，各个小应用能够独立选择技术、发展、部署。我们在开发组件的过程中也能用到类似的思想。试想当一个整个页面只有一个组件时，无论哪处改动都会触发整个页面的重新渲染。在对组件进行拆分之后，render 的粒度更加精细，性能也能得到一定的提升。</p><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>本文主要介绍了如何减少不必要的 <code>render</code> 来提升 React 的性能。在实际开发过程中，前端性能问题可能并不常见，随着业务的复杂度增加，遇到性能问题的概率也会随之增加。</p><ul><li>减少 render 的次数 类组件可以使用 shouldComponentUpdate 或 PureComponent，函数组件可以利用高级组件的特性或者 React.memo</li><li>对组件进行合理的拆分</li></ul><p>在摸索这些解决方案的同时，我们能够学习到诸多经典的编程思想，从而更加合理的运用框架、技术解决业务问题。</p><h2 id="招贤纳士" tabindex="-1"><a class="header-anchor" href="#招贤纳士" aria-hidden="true">#</a> 招贤纳士</h2><p>政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。</p><p>如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 <code>ZooTeam@cai-inc.com</code></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,50),b={href:"https://www.zhihu.com/question/31809713/answer/53544875",target:"_blank",rel:"noopener noreferrer"},h={href:"https://juejin.cn/post/6844903938018263048",target:"_blank",rel:"noopener noreferrer"},g={href:"https://medium.com/better-programming/https-medium-com-mayank-gupta-6-88-21-performance-optimizations-techniques-for-react-d15fa52c2349",target:"_blank",rel:"noopener noreferrer"};function x(f,_){const i=r("ExternalLinkIcon");return s(),t("div",null,[c,m,v,e("p",null,[n("> 本文首发于政采云前端团队博客： "),e("a",u,[n("性能！！让你的 React 组件跑得再快一点"),a(i)])]),p,e("ul",null,[e("li",null,[e("p",null,[e("a",b,[n("网上都说操作真实 DOM 慢，但测试结果却比 React 更快，为什么？"),a(i)])])]),e("li",null,[e("p",null,[e("a",h,[n("看完这篇，你也能把 React Hooks 玩出花"),a(i)])])]),e("li",null,[e("p",null,[e("a",g,[n("21 Performance Optimizations Techniques For React"),a(i)])])])])])}const y=d(o,[["render",x],["__file","性能！！让你的 React 组件跑得再快一点.html.vue"]]);export{y as default};
