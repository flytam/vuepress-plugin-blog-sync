import{_ as i,z as s,A as d,Y as e,C as n,U as a,a6 as c,Q as o}from"./framework-cb9358d9.js";const l={},r=e("h2",{id:"",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#","aria-hidden":"true"},"#"),n(" **")],-1),u=e("p",null,'<table><tbody><tr><td bgcolor="#FDFFE7"><font size="4">原创不易，希望能关注下我们，再顺手点个赞~~<font></font></font></td></tr></tbody></table> **',-1),m=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/12/172075fc4140005d~tplv-t2oaga2asx-image.image",alt:""})],-1),v={href:"https://www.zoo.team/article/react-hooks",target:"_blank",rel:"noopener noreferrer"},p=c(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/9/16e5095fc23789f8~tplv-t2oaga2asx-image.image" alt="摩卡.png"></p><p>本文中出现的部分名称映射：</p><p>​ <strong>函数式组件</strong> =&gt; <strong>Function Component</strong></p><p>​ <strong>类组件</strong> =&gt; <strong>Class Component</strong></p><p>​ <strong>工具函数</strong> =&gt; <strong>Util Function</strong></p><p>​ <strong>钩子</strong> =&gt; <strong>React Hook</strong></p><p>​ <strong>初始值</strong> =&gt; <strong>initialValue</strong></p><h3 id="先讲概念" tabindex="-1"><a class="header-anchor" href="#先讲概念" aria-hidden="true">#</a> 先讲概念</h3><p>React v16.7.0-alpha 中第一次引入了 Hooks 的概念，在 v16.8.0 版本被正式发布。React Hooks 在 React 中只是对 React Hook 的概念性的描述，在开发中我们用到的实际功能都应该叫做 <strong>React hook</strong>。</p><p>React Hook 是一种特殊的函数，其本质可以是函数式组件（返回 Dom 或 Dom 及 State ），也可以只是一个工具函数（传入配置项返回封装后的数据处理逻辑）。</p><h3 id="再总结" tabindex="-1"><a class="header-anchor" href="#再总结" aria-hidden="true">#</a> 再总结</h3><p>React Hooks 的出现使函数式组件变得焕然一新，其带来的最大的变化在于给予了函数式组件类似于类组件<strong>生命周期</strong>的概念，扩大了函数式组件的应用范围。</p><p>目前函数式组件基本用于纯展示组件，一旦函数式组件耦合有业务逻辑，就需要通过 Props 的传递，通过子组件触发父组件方法的方式来实现业务逻辑的传递，Hooks 的出现使得函数组件也有了自己的状态与业务逻辑，简单逻辑在自己内部处理即可，不再需要通过 Props 的传递，使简单逻辑组件抽离更加方便，也使使用者无需关心组件内部的逻辑，只关心 Hooks 组件返回的结果即可。</p><p>在我看来，Hooks 组件的目标并不是取代类组件，而是增加函数式组件的使用率，明确通用工具函数与业务工具函数的边界，<strong>鼓励开发者将业务通用的逻辑封装成 React Hooks 而不是工具函数</strong>。</p><p>之所以把总结放在前面，是想让大家在看后面的内容时有一个整体的概念去引导大家去思考 React Hooks 具体给函数式组件带来了什么变化。</p><h3 id="hooks-初识" tabindex="-1"><a class="header-anchor" href="#hooks-初识" aria-hidden="true">#</a> Hooks 初识</h3><h4 id="官方提供的钩子" tabindex="-1"><a class="header-anchor" href="#官方提供的钩子" aria-hidden="true">#</a> 官方提供的钩子</h4><p>目前官方提供的钩子共分为两种，分为基本钩子以及拓展钩子</p><p>基本钩子共有：<code>useState</code> 、<code>useEffect</code> 、 <code>useContext</code></p><p>额外的钩子有：<code>useCallback</code> 、 <code>useReducer</code> 、 <code>useMemo</code> 、 <code>useRef</code> 、 <code>useLayoutEffect</code> 、 <code>useImperativeHandle</code> 、 <code>useDebugValue</code></p><h4 id="不同钩子用法" tabindex="-1"><a class="header-anchor" href="#不同钩子用法" aria-hidden="true">#</a> 不同钩子用法</h4><h5 id="usestate" tabindex="-1"><a class="header-anchor" href="#usestate" aria-hidden="true">#</a> useState</h5><p>该钩子用于创建一个新的状态，参数为一个固定的值或者一个有返回值的方法。钩子执行后的结果为一个数组，分别为生成的状态以及改变该状态的方法，通过解构赋值的方法拿到对应的值与方法。</p><p>使用方法如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export default function HookDemo() {
  const [count, changeCount] = useState(0);

  return (
    &amp;lt;div&amp;gt;
      {count}
      &amp;lt;button onClick={() =&amp;gt; { changeCount(Math.ceil(Math.random() * 1000)); }}&amp;gt;
        改变count
      &amp;lt;/button&amp;gt;
    &amp;lt;/div&amp;gt;
  );
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/9/16d12379c238698b~tplv-t2oaga2asx-image.image" alt="useState用法"></p><h5 id="useeffect" tabindex="-1"><a class="header-anchor" href="#useeffect" aria-hidden="true">#</a> useEffect</h5><p>顾名思义，执行副作用钩子。主要用于以下两种情况：</p><ol><li>函数式组件中不存在传统类组件生命周期的概念，如果我们需要在一些特定的生命周期或者值变化后做一些操作的话，必须借助 <code>useEffect</code> 的一些特性去实现。</li><li><code>useState</code> 产生的 changeState 方法并没有提供类似于 <code>setState</code> 的第二个参数一样的功能，因此如果需要在 State 改变后执行一些方法，必须通过 <code>useEffect</code> 实现。</li></ol><p>该钩子接受两个参数，第一个参数为副作用需要执行的回调，生成的回调方法可以返回一个函数（<strong>将在组件卸载时运行</strong>）；第二个为该副作用监听的状态数组，当对应状态发生变动时会执行副作用，<strong>如果第二个参数为空，那么在每一个 State 变化时都会执行该副作用。</strong></p><p>使用方法如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const [count, changeCount] = useState(0);

// 将在count变化时打印最新的count数据
useEffect(() =&amp;gt; {
  message.info(\`count发生变动，最新值为\${count}\`);
}, [count])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/9/16d12379c7c486c7~tplv-t2oaga2asx-image.image" alt="useEffect"></p><p>在上面代码中我们实现了在 <code>useEffect</code> 这个钩子适用情况中的第二种情况，那么如何使用该钩子才能实现类似于类组件中生命周期的功能呢？既然第一个参数是副作用执行的回调，那么实现我们所要功能的重点就应该在第二个参数上了。</p><p><strong><code>componentDidMount</code> &amp;amp;&amp;amp; <code>componentWillUnmout</code></strong>：这两个生命周期只在页面挂载/卸载后执行一次。前面讲过，所有的副作用在组件挂载完成后会执行一次 ，如果副作用存在返回函数，那么返回的函数将在卸载时运行。借助这样的特性，我们要做的就是让目标副作用在初始化执行一次后再也不会被调用，于是只要让与该副作用相关联的状态为空，不管其他状态如何变动，该副作用都不会再次执行，即实现了 <code>componentDidMount</code> 与 <code>componentWillUnmout</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import React, { useState, useEffect } from &amp;#39;react&amp;#39;;
import { message } from &amp;#39;antd&amp;#39;;

function Child({ visible }) {
  useEffect(() =&amp;gt; {
    message.info(&amp;#39;我只在页面挂载时打印&amp;#39;);
    return () =&amp;gt; {
      message.info(&amp;#39;我只在页面卸载时打印&amp;#39;);
    };
  }, []);

  return visible ? &amp;#39;true&amp;#39; : &amp;#39;false&amp;#39;;
}

export default function HookDemo() {
  const [visible, changeVisible] = useState(true);


  return (
    &amp;lt;div&amp;gt;
      {
        visible &amp;amp;&amp;amp; &amp;lt;Child visible={visible} /&amp;gt;
      }
      &amp;lt;button onClick={() =&amp;gt; { changeVisible(!visible); }}&amp;gt;
        改变visible
      &amp;lt;/button&amp;gt;
    &amp;lt;/div&amp;gt;
  );
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/9/16d12379c8237988~tplv-t2oaga2asx-image.image" alt="didMount"></p><p><strong><code>componentDidUpdate</code></strong>：该生命周期在每次页面更新后都会被调用。那么按照之前的逻辑，就应该把所有的状态全部放在第二个状态中，但是这样的话新增/删除一个状态都需要改变第二参数。其实，<strong>如果第二个参数为空，那么在每一个 State 变化时都会执行该副作用</strong>，那么如果要实现 <code>componentDidUpdate</code> 就非常简单了。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>useEffect(() =&amp;gt; {
  // ...副作用逻辑
}) // 注意上面说的关联状态为空不是说不传递第二个参数，而是第二个参数应该为一个空数组
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/9/16d12379ca0f7e43~tplv-t2oaga2asx-image.image" alt="didUpdate"></p><p>&gt; 在类组件中，如果在 <code>componentDidMount</code> 中多次调用 <code>setState</code> 设置一个值（<strong>当然不推荐这样做</strong>），并在成功的回调中打印该值，那么最后的结果很可能会打印很多个相同的最后一次设置的值。是因为类的 <code>setState</code> 是一个类异步的结果，他们会将所有变动的内容进行收集然后在合适的时间去统一赋值。 &gt; &gt; 而在 <code>useEffect</code> 中，所有的变量的值都会保留在该副作用执行的时刻，类似于 for 循环中的 let 或者 闭包，所有的变量都维持在副作用执行时的状态，也有人称这个为 Capture Value。</p><h5 id="usecallback" tabindex="-1"><a class="header-anchor" href="#usecallback" aria-hidden="true">#</a> useCallback</h5><p>生成 Callback 的钩子。用于对不同 <code>useEffect</code> 中存在的相同逻辑的封装，减少代码冗余，配合 <code>useEffect</code> 使用。</p><p>该钩子先看例子会比较好理解一下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const [count1, changeCount1] = useState(0);
const [count2, changeCount2] = useState(10);

const calculateCount = useCallback(() =&amp;gt; {
  if (count1 &amp;amp;&amp;amp; count2) {
    return count1 * count2;
  }
  return count1 + count2;
}, [count1, count2])

useEffect(() =&amp;gt; {
    const result = calculateCount(count, count2);
    message.info(\`执行副作用，最新值为\${result}\`);
}, [calculateCount])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/9/16d12379ca114462~tplv-t2oaga2asx-image.image" alt="useCallback"></p><p>在上面的例子中我们通过 <code>useCallback</code> 的使用生成了一个回调，<code>useCallback</code> 的使用方法和 <code>useEffect</code> 一致，第一个参数为生成的回调方法，第二个参数为该方法关联的状态，<strong>任一状态发生变动都会重新生成新的回调</strong>。</p><p>通过上面代码的使用，我们将 count1 / count2 的值与一个叫做 calculateCount 的方法关联了起来，如果组件的副作用中用到计算 count1 和 count2 的值的地方，直接调用该方法即可。</p><p>其中和直接使用 <code>useEffect</code> 不同的地方在于使用 <code>useCallback</code> 生成计算的回调后，在使用该回调的副作用中，<strong>第二个参数应该是生成的回调</strong>。其实这个问题是很好理解的，我们使用 <code>useCallback</code> 生成了一个与 count1 / count2 相关联的回调方法，那么当关联的状态发生变化时会重新生成新的回调，副作用监听到了回调的变化就会去重新执行副作用，<strong>此时 <code>useCallback</code> 和 <code>useEffect</code> 是按顺序执行的</strong>， 这样就实现了副作用逻辑的抽离。</p><h5 id="useref" tabindex="-1"><a class="header-anchor" href="#useref" aria-hidden="true">#</a> useRef</h5><p><code>useRef</code> 接受一个参数，为 ref 的初始值。类似于类组件中的 <code>createRef</code> 方法 ，该钩子会返回一个对象，对象中的 current 字段为我们 <strong>指向的实例</strong> / <strong>保存的变量</strong>，可以实现获得目标节点实例或保存状态的功能。</p><p><strong><code>useRef</code> 保存的变量不会随着每次数据的变化重新生成，而是保持在我们最后一次赋值时的状态，依靠这种特性，再配合 <code>useCabllback</code> 和 <code>useEffect</code> 我们可以实现 <code>preProps/preState</code> 的功能。</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const [count, changeCount] = useState(0);
const [count1, changeCount1] = useState(0);
// 创建初始值为空对象的prestate
const preState = useRef({});
// 依赖preState进行判断时可以先判断，最后保存最新的state数据
useEffect(() =&amp;gt; {
  const { ... } = preState.current;
  if (// 条件判断) {
    // 逻辑
  }
  // 保存最新的state
  preState.current = {
    count,
    count1,
  }
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zcy-video.oss-cn-shanghai.aliyuncs.com/medical/zooTeam/9.5/useRef用于保存preState.gif" alt="useRef用于保存preState"></p><p>另外，当我们将使用 <code>useState</code> 创建的状态赋值给 <code>useRef</code> 用作初始化时，<strong>手动更改 Ref 的值并不会引起关联状态的变动</strong>。从该现象来看，<strong>useRef 似乎只是在内存空间中开辟了一个堆空间将初始化的值存储起来</strong>，该值与初始化的值存储在不同的内存空间，修改 Ref 的值不会引起视图的变化。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export default function HookDemo() {
  const [count] = useState({ count: 1 });
  
  const countRef = useRef(count);

  return (
    &amp;lt;div&amp;gt;
      {count.count}
      &amp;lt;button onClick={() =&amp;gt; { countRef.current.count = 10; }}&amp;gt;
        改变ref
      &amp;lt;/button&amp;gt;
    &amp;lt;/div&amp;gt;
  );
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zcy-video.oss-cn-shanghai.aliyuncs.com/medical/zooTeam/9.5/useRef正常.gif" alt="useRef正常"></p><h5 id="usememo" tabindex="-1"><a class="header-anchor" href="#usememo" aria-hidden="true">#</a> useMemo</h5><p>Memo 为 Memory 简写，<code>useMemo</code> 即使用记忆的内容。该钩子主要用于做性能的优化。</p><p>前面我们说过了当状态发生变化时，没有设置关联状态的 <code>useEffect</code> 会全部执行。同样的，<strong>通过计算出来的值或者引入的组件也会重新计算/挂载一遍，即使与其关联的状态没有发生任何变化</strong>。</p><p>在类组件中我们有 <code>shouldComponetUpdate</code> 以及 <code>React.memo</code> 帮助我们去做性能优化，如果在函数组件中没有类似的功能显示是违背了官方的初衷的，于是就有了 <code>useMemo</code> 这个钩子。</p><p>在业务中，我们可以用 <code>useMemo</code> 来处理计算结果的缓存或引入组件的防止重复挂载优化。其接受两个参数，第一个参数为一个 Getter 方法，<strong>返回值为要缓存的数据或组件</strong>，第二个参数为该返回值相关联的状态，当其中任何一个状态发生变化时就会重新调用 Getter 方法生成新的返回值。</p><p>具体代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import React, { useState, useMemo } from &amp;#39;react&amp;#39;;
import { message } from &amp;#39;antd&amp;#39;;

export default function HookDemo() {
  const [count1, changeCount1] = useState(0);
  const [count2, changeCount2] = useState(10);

  const calculateCount = useMemo(() =&amp;gt; {
    message.info(&amp;#39;重新生成计算结果&amp;#39;);
    return count1 * 10;
  }, [count1]);
  return (
    &amp;lt;div&amp;gt;
      {calculateCount}
      &amp;lt;button onClick={() =&amp;gt; { changeCount1(count1 + 1); }}&amp;gt;改变count1&amp;lt;/button&amp;gt;
      &amp;lt;button onClick={() =&amp;gt; { changeCount2(count2 + 1); }}&amp;gt;改变count2&amp;lt;/button&amp;gt;
    &amp;lt;/div&amp;gt;
  );
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zcy-video.oss-cn-shanghai.aliyuncs.com/medical/zooTeam/9.5/useMemo做计算结果优化.gif" alt="useMemo做计算结果优化"></p><p>初次接受 <code>useMemo</code> 时可能我们会觉得该钩子只是用来做计算结果的缓存，返回值只能是一个数字或字符串。其实 <code>useMemo</code> 并不关心我们的返回值类型是什么，它只是在关联状态发生变动时重新调用我们传递的 Getter 方法 生成新的返回值，也就是说 <strong><code>useMemo</code> 生成的是 Getter 方法与依赖数组的关联关系</strong>。因此，如果我们将函数的返回值替换为一个组件，那么就可以<strong>实现对组件挂载/重新挂载的性能优化</strong>。</p><p>代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import React, { useState, useMemo } from &amp;#39;react&amp;#39;;
import { message } from &amp;#39;antd&amp;#39;;

function Child({ count }) {
  return &amp;lt;p&amp;gt;当前传递的count为:{count}&amp;lt;/p&amp;gt;;
}

export default function HookDemo() {
  const [count1, changeCount1] = useState(0);
  const [count2, changeCount2] = useState(10);

  const child = useMemo(() =&amp;gt; {
    message.info(&amp;#39;重新生成Child组件&amp;#39;);
    return &amp;lt;Child count={count1} /&amp;gt;;
  }, [count1]);
  return (
    &amp;lt;div&amp;gt;
      {child}
      &amp;lt;button onClick={() =&amp;gt; { changeCount1(count1 + 1); }}&amp;gt;改变count1&amp;lt;/button&amp;gt;
      &amp;lt;button onClick={() =&amp;gt; { changeCount2(count2 + 1); }}&amp;gt;改变count2&amp;lt;/button&amp;gt;
    &amp;lt;/div&amp;gt;
  );
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zcy-video.oss-cn-shanghai.aliyuncs.com/medical/zooTeam/9.5/useMemo做组件优化.gif" alt="useMemo做组件优化"></p><h5 id="其他钩子" tabindex="-1"><a class="header-anchor" href="#其他钩子" aria-hidden="true">#</a> 其他钩子</h5><p>今天主要讲了组件中常用的几个钩子，剩下的未讲解的钩子中，如 <code>useLayoutEffect</code> <code>useImperativeHandle</code> <code>useDebugValue</code> ，其功能都比较简单就不在此赘述。</p><p>还有一个比较重要的钩子 <code>useContext</code>，是 createContext 功能在函数式组件中的实现。通过该功能可以实现很多强大的功能，可以是说官方的 Redux，很多人对此应该有不少的了解。该钩子内容太多，后续单独使用一个章节进行描述。</p><h3 id="编写自己的钩子" tabindex="-1"><a class="header-anchor" href="#编写自己的钩子" aria-hidden="true">#</a> 编写自己的钩子</h3><p>其实从上面讲解的内容来看，钩子并不是什么高深莫测的东西，它只是对我们常用逻辑的一些封装，接下来就会通过具体的代码来教大家写一个自己的钩子。</p><h4 id="最基本的钩子" tabindex="-1"><a class="header-anchor" href="#最基本的钩子" aria-hidden="true">#</a> 最基本的钩子</h4><p>最基本的钩子也就是返回包含了更多逻辑的 State 以及改变 State 方法的钩子。拿计数器来说，其最基本的就是返回当前的数字以及减少/增加/重置等功能，明确完功能后可以开始动手做了。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import React, { useState } from &amp;#39;react&amp;#39;;

// 编写我们自己的hook，名字以use开头
function useCounter(initialValue) {
  // 接受初始化的值生成state
  const [count, changeCount] = useState(initialValue);
  // 声明减少的方法
  const decrease = () =&amp;gt; {
    changeCount(count - 1);
  }
  // 声明增加的方法
  const increase = () =&amp;gt; {
    changeCount(count + 1);
  }
  // 声明重置计数器方法
  const resetCounter = () =&amp;gt; {
    changeCount(0);
  }
  // 将count数字与方法返回回去
  return [count, { decrease, increase, resetCounter }]
}

export default function myHooksView() {
  // 在函数组件中使用我们自己编写的hook生成一个计数器，并拿到所有操作方法的对象
  const [count, controlCount] = useCounter(10);
  return (
  	&amp;lt;div&amp;gt;
    	当前数量：{count}
			&amp;lt;button onClick={controlCount.decrease}&amp;gt;减少&amp;lt;/button&amp;gt;
			&amp;lt;button onClick={controlCount.increase}&amp;gt;增加&amp;lt;/button&amp;gt;
			&amp;lt;button onClick={controlCount.resetCounter}&amp;gt;重置&amp;lt;/button&amp;gt;
    &amp;lt;/div&amp;gt;
  )
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们将在 <code>useCounter</code> 这个钩子中创建了一个关联了 <code>initialValue</code> 的状态，并创建减少/增加/重置的方法，最终将其通过 <code>return</code> 返回出去。这样在其他组件需要用到该功能的地方，通过调用该方法拿到其返回值，即可实现对 <code>useCounter</code> 组件封装逻辑的复用。</p><p>演示效果如图：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/9/16d1237a073ffcb4~tplv-t2oaga2asx-image.image" alt="counter"></p><h4 id="返回-dom-的钩子" tabindex="-1"><a class="header-anchor" href="#返回-dom-的钩子" aria-hidden="true">#</a> 返回 DOM 的钩子</h4><p>返回 DOM 其实和最基本的 Hook 逻辑是相同的，只是在返回的数据内容上有一些差异，具体还是看代码，以一个 Modal 框为例。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import React, { useState } from &amp;#39;react&amp;#39;;
import { Modal } from &amp;#39;antd&amp;#39;;

function useModal() {
  const [visible, changeVisible] = useState(false);

  const toggleModalVisible = () =&amp;gt; {
    changeVisible(!visible);
  };

  return [(
    &amp;lt;Modal
      visible={visible}
      onOk={toggleModalVisible}
      onCancel={toggleModalVisible}
    &amp;gt;
      弹窗内容
  	&amp;lt;/Modal&amp;gt;
  ), toggleModalVisible];
}

export default function HookDemo() {
  const [modal, toggleModal] = useModal();
  return (
    &amp;lt;div&amp;gt;
      {modal}
      &amp;lt;button onClick={toggleModal}&amp;gt;打开弹窗&amp;lt;/button&amp;gt;
    &amp;lt;/div&amp;gt;
  );
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样我们就实现了一个返回了弹窗内容以及改变弹窗显示状态的 Hook，其实可以封装的内容还有很多很多，可以通过配置项的设置实现更丰富的封装。</p><p>演示效果如图：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/9/16d1237a0884e17a~tplv-t2oaga2asx-image.image" alt="modal"></p><h3 id="钩子-最终总结" tabindex="-1"><a class="header-anchor" href="#钩子-最终总结" aria-hidden="true">#</a> 钩子/最终总结</h3><h4 id="钩子总结" tabindex="-1"><a class="header-anchor" href="#钩子总结" aria-hidden="true">#</a> 钩子总结</h4><table><thead><tr><th>钩子</th><th>用法</th><th>作用</th></tr></thead><tbody><tr><td>useState</td><td><code>const [state, changeState] = useState(initialValue)</code></td><td>用于生成<strong>状态以及改变状态的方法</strong></td></tr><tr><td>useEffect</td><td><code>useEffect(fn, [...relativeState])</code></td><td>用于生成<strong>与状态绑定的副作用</strong></td></tr><tr><td>useCallback</td><td><code>useCallback(fn, [...relativeState])</code></td><td>用于生成<strong>与状态绑定的回调函数</strong></td></tr><tr><td>useMemo</td><td><code>useMemo(fn, [...relativeState])</code></td><td>用于生成<strong>与状态绑定的组件/计算结果</strong></td></tr><tr><td>useRef</td><td><code>const newRef = useRef(initialValue)</code></td><td>用于 获取节点实例 / 数据保存</td></tr></tbody></table><p>从上面的表格中我们可以看出，在官方提供的 Hook 中，除了基本的 <code>useState</code> 与 <code>useRef</code> 外，其他钩子都存在第二个参数，第一个方法的执行与第二个参数相互关联。于是我们可以得出一个结论，在使用了 Hook 的函数式组件中，我们在使用<strong>副作用/引用子组件时都需要时刻注意对代码进行性能上的优化</strong>。</p><h4 id="最终总结" tabindex="-1"><a class="header-anchor" href="#最终总结" aria-hidden="true">#</a> 最终总结</h4><p>我在前面的总结里是这么评价 React Hooks 的：</p><p>&gt; Hooks 组件的目标并不是取代 class component 组件，而是增加函数式组件的使用率，明确通用工具函数与业务工具函数的边界，<strong>鼓励开发者将业务通用的逻辑封装成 React Hooks 而不是工具函数</strong>。</p><p>希望看完这篇文章的你也有自己的一些看法，欢迎拍砖讨论。</p><h2 id="招贤纳士" tabindex="-1"><a class="header-anchor" href="#招贤纳士" aria-hidden="true">#</a> 招贤纳士</h2><p>招人，前端，隶属政采云前端大团队（ZooTeam），50 余个小伙伴正等你加入一起浪。如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“5年工作时间3年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手参与一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 <strong><code>ZooTeam@cai-inc.com</code></strong></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/29/16cddbe09f60b388~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,98),b={href:"https://juejin.cn/post/6844903925716353031",target:"_blank",rel:"noopener noreferrer"},g={href:"https://juejin.cn/post/6844903933580673032",target:"_blank",rel:"noopener noreferrer"},h={href:"https://juejin.cn/post/6844903927448616968",target:"_blank",rel:"noopener noreferrer"};function f(x,C){const t=o("ExternalLinkIcon");return s(),d("div",null,[r,u,m,e("p",null,[n("> 本文首发于政采云前端团队博客： "),e("a",v,[n("看完这篇，你也能把 React Hooks 玩出花"),a(t)])]),p,e("p",null,[e("a",b,[n("Vue 组件数据通信方案总结"),a(t)])]),e("p",null,[e("a",g,[n("自动化 Web 性能优化分析方案"),a(t)])]),e("p",null,[e("a",h,[n("CSS 层叠上下文（Stacking Context）"),a(t)])])])}const S=i(l,[["render",f],["__file","看完这篇，你也能把 React Hooks 玩出花.html.vue"]]);export{S as default};
