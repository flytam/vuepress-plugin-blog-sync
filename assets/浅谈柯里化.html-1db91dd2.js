import{_ as a,z as l,A as d,Y as n,C as e,U as s,a6 as r,Q as t}from"./framework-cb9358d9.js";const c={},v=n("p",null,[n("img",{src:"https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bfefad3ee3474e3a8a461251aaddceb4~tplv-k3u1fbpfcp-watermark.image?",alt:"政采云技术团队.png"})],-1),u=n("p",null,[n("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/480103c1c7a34e57b6aa25d8168bf450~tplv-k3u1fbpfcp-watermark.image?",alt:"寒风.png"})],-1),m={href:"http://zoo.zhengcaiyun.cn/blog/article/currying",target:"_blank",rel:"noopener noreferrer"},o=r(`<h5 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景：</h5><p>在 react 项目中使用 antd 表单的时候，遇到一些老项目，需要校验密码的强弱、校验输入的规则等，如果每次都是传正则和需要校验的字符串，有点麻烦。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import React from &amp;quot;react&amp;quot;;
​
const accountReg = /^[a-zA-Z0-9_-]{4,16}$/;
const passwordReg = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\\d)(?=.*?[!@#$])[a-zA-Z\\d!@#$]{10,16}$/;
​
const FormCom = () =&amp;gt; {
​
  const checkReg = (reg, txt) =&amp;gt; {
    return reg.test(txt)
  }
  
  //账号
  const checkAccount = (event) =&amp;gt; {
    checkReg(accountReg, event.target.value);
    // 其他逻辑
  };
​
  //密码
  const checkPassword = (event) =&amp;gt; {
    checkReg(passwordReg, event.target.value);
    // 其他逻辑
  };
 
  ...
  // 省去其他函数校验
  
  render() {
    return (
      &amp;lt;form&amp;gt;
        账号：
        &amp;lt;input onChange={checkAccount} type=&amp;quot;text&amp;quot; name=&amp;quot;account&amp;quot; /&amp;gt;
        密码：
        &amp;lt;input onChange={checkPassword} type=&amp;quot;password&amp;quot; name=&amp;quot;password&amp;quot; /&amp;gt;
      &amp;lt;/form&amp;gt;
    );
  }
}
​
export default FormCom;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们怎么解决类似的问题呢，我们可以使用柯里化函数来解决类似的问题。当然属于个人观点，如果其他方法，欢迎提出，进行学习</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import React from &amp;quot;react&amp;quot;;
​
const accountReg = /^[a-zA-Z0-9_-]{4,16}$/;
const passwordReg = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\\d)(?=.*?[!@#$])[a-zA-Z\\d!@#$]{10,16}$/;
​
const FormCom = () =&amp;gt; {
  
  // 柯里化封装
  const curryCheck = (reg) =&amp;gt; {
    return function(txt) {
        return reg.test(txt)
    }
  }
​
  //账号，这样就省去了一个参数的传递
  const checkAccount = curryCheck(accountReg);
​
  //密码，这样就省去了一个参数的传递
  const checkPassword = curryCheck(passwordReg);
​
  const checkAccountFn = () =&amp;gt; {
    checkAccount(event.target.value);
    // 其他逻辑
  }
 
  const passwordFn = (event) =&amp;gt; {
    checkPassword(event.target.value);
    // 其他逻辑
  };
  
  ...
  // 省去其他函数校验
​
  render() {
    return (
      &amp;lt;form&amp;gt;
        账号：
        &amp;lt;input onChange={checkAccountFn} type=&amp;quot;text&amp;quot; name=&amp;quot;account&amp;quot; /&amp;gt;
        密码：
        &amp;lt;input onChange={passwordFn} type=&amp;quot;password&amp;quot; name=&amp;quot;password&amp;quot; /&amp;gt;
      &amp;lt;/form&amp;gt;
    );
  }
}
​
export default FormCom;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="一、柯里化" tabindex="-1"><a class="header-anchor" href="#一、柯里化" aria-hidden="true">#</a> 一、柯里化</h5><p>在计算机科学中，柯里化（英语：Currying ），又译为卡瑞化或加里化，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数，而且返回结果的新函数的技术。这个技术由克里斯托弗·斯特雷奇以逻辑学家哈斯凯尔·加里命名的，尽管它是 Moses Schönfinkel 和戈特洛布·弗雷格发明的。柯里化其实也是函数式编程的思想。下面来举例说明什么是柯里化呢？</p><p>下面例子求和的过程，就是一个“乞丐版”的柯里化的过程</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  const addFn = (x, y, z) =&amp;gt; {
    return x + y + z;
  };
​
  const addResultFn = addFn(1, 2, 3);
  console.log(&amp;quot;🚀 ~ file: preview.html ~ line 19 ~ addResultFn&amp;quot;, addResultFn)
​
  // 将上述过程转化为下面的实现过程就是柯里化
​
  const sumFn = (x) =&amp;gt; {
    return function(y) {
      return function(z) {
        return x + y + z;
      } 
    }
  }
​
  const sum = sumFn(1)(2)(3);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的 sumFn 函数层层嵌套，肯定会被喷的，当然可以做一下简单的优化</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const simplifySumFn = x =&amp;gt; y =&amp;gt; z =&amp;gt; {
  return x + y + z;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，sumFn 这样调用，性能低下，若果层级过多，还会造成栈溢出，为什么还要这么做呢，当然有它自己用途以及好处。</p><p><strong>柯里化的作用：</strong></p><ol start="0"><li>单一原则：在函数式编程中，往往是让一个函数处理的问题尽可能单一，而不是一个函数处理多个任务。</li><li>提高维护性以及降低代码的重复性</li></ol><h5 id="二、柯里化的场景" tabindex="-1"><a class="header-anchor" href="#二、柯里化的场景" aria-hidden="true">#</a> 二、柯里化的场景</h5><p>1、比如我们在求和中，以一定的数字为基数进行累加的时候，就用到了函数柯里化。当然函数柯里化感觉上是把简答的问题复杂化了，其实不然。比如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 比如，基础分值是30 + 30；
const fractionFn = (x) =&amp;gt; {
  const totalFraction =  x + x;
  return function(num) {
    return totalFraction + num;
  }
};
​
const baseFn = fractionFn(30);
const base1Fn = baseFn(1);
const base2Fn = baseFn(2);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样来进行累加的话，是不是就简单、清晰明了呢。如果觉得这样的场景用到的不多的时候。别慌，那我在举一个例子。我们常用的日志输出，是不是都是具体的日期、时间以及加上具体的原因呢：</p><p>2、上述也可是实现打印日志的功能函数，细心的你不知道你发现了没，其实date, type每次还需要传参。是不是可以进行抽离呢，当然了，函数柯里化就可以完美的解决这个。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const date = new Date();
​
const logFn = (date, type, msg) =&amp;gt; {
  console.log(\`\${date.getHours()} : \${date.getMinutes()} \${type} - \${msg}\`);
}
​
logFn(date, &amp;#39;warning&amp;#39;, &amp;#39;声明的变量未使用&amp;#39;);
logFn(date, &amp;#39;warning&amp;#39;, &amp;#39;暂未查询到数据&amp;#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const date = new Date();
const logFn = date =&amp;gt; type =&amp;gt; msg =&amp;gt; {
  console.log(\`\${date.getHours()}:\${date.getMinutes()} \${type} - \${msg}\`);
}
const nowLogFn = logFn(date);
nowLogFn(&amp;#39;warning&amp;#39;)(&amp;#39;声明的变量未被引用&amp;#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="三、柯里化函数的实现" tabindex="-1"><a class="header-anchor" href="#三、柯里化函数的实现" aria-hidden="true">#</a> 三、柯里化函数的实现</h5><p>是不是比上面第一种的要清晰呢，但是还是有点不完美的地方，因为这个过程都是我们手动进行柯里化的，难道每次都要手动进行转换吗？我们程序员不就是来解决能程序解决的，绝不手动重复的吗?</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const selfCurryFn = (fn) =&amp;gt; {
  const fnLen = fn.length;  // fn 接收的参数
  function curry(...args) {
    const argLen = args.length; // curry 接收的参数
    if(argLen &amp;gt;= fnLen) {
      return fn.apply(this, args); // 如果外面绑定 this 的话，直接绑定到fn上
    } else {
      // 参数个数没有达到时继续接收剩余的参数 
      function otherCurry(...args2) {
        return curry.apply(this, args.concat(args2))
      }
      return otherCurry;
    }
  }
  return curry;
}
•
const selfAddFn = (x, y, z) =&amp;gt; {
  return x + y + z;
}
•
const selfSum = selfCurryFn(selfAddFn);
•
console.log(&amp;quot;🚀 ~ file: preview.html ~ line 80 ~ selfSum(1, 2, 3)&amp;quot;, selfSum(1, 2, 3))
console.log(&amp;quot;🚀 ~ file: preview.html ~ line 81 ~ selfSum(1, 2)(3)&amp;quot;, selfSum(1, 2)(3))
console.log(&amp;quot;🚀 ~ file: preview.html ~ line 81 ~ selfSum(1, 2)(3)&amp;quot;, selfSum(1)(2)(3))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="四、柯里化在其他库的应用" tabindex="-1"><a class="header-anchor" href="#四、柯里化在其他库的应用" aria-hidden="true">#</a> 四、柯里化在其他库的应用</h5><p>1、我们常用的 Redux，里面其实也用到了柯里化。Redux 的中间件提供的是位于 action 被发起之后数据流加上中间件后变成了</p><p>view -&gt; action -&gt; middleware -&gt; reducer -&gt; store 。在 middleware 这个节点可以进行一些“副作用”的 操作，比如打印日志等等。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export default function applyMiddleware(...middlewares) {
    return createStore =&amp;gt; (...args) =&amp;gt; {
        // 利用传入的 createStore 和 reducer 和创建一个 store
        const store = createStore(...args)
        let dispatch = () =&amp;gt; {
            throw new Error()
        }
        const middlewareAPI = {
            getState: store.getState,
            dispatch: (...args) =&amp;gt; dispatch(...args)
        }
        // middlewareAPI 这个参数分别执行一遍
        const chain = middlewares.map(middleware =&amp;gt; middleware(middlewareAPI))
        // 组装成一个新的函数，即新的 dispatch
        dispatch = compose(...chain)(store.dispatch)
        return {
            ...store,
            dispatch
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、组合函数是 JavaScript 开发过程中一种对函数的使用组合模式。</p><ul><li>我们对某一个函数进行调用，执行 fn1、fn2，这两个函数是依次执行</li><li>每次我们都需要进行两个函数的调用，操作上就会显示的重复</li><li>那么我们是不是可以将 fn1、fn2 组合起来，自动一次调用呢？ 其实实现上述的过程就是组合函数（compose function）。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const fn1 = (num) =&amp;gt; {
  return num + 10;
} 
​
const fn2 = (num) =&amp;gt; {
  return num * num;
}
​
const a = 10;
const result = fn2(fn1(a));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加入我们有很多类似的函数，需要这么调用，这样每次调用都比较麻烦，也比较冗余。当时我们可以给进行组合，然后在进行调用。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function compose (fn1, fn2) {
   return function(num) {
     return fn2(fn1(num));
   }
}
​
const fn1 = (num) =&amp;gt; {
  return num + 10;
} 
​
const fn2 = (num) =&amp;gt; {
  return num * num;
}
​
const a = 10;
const newFn = compose(fn1, fn2);
const result = newFn(a);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通用组合函数的实现</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function createCompose(...fns) {
  const length = fns.length;
  for(let i = 0; i &amp;lt; length; i++) {
    if(typeof fns[i] !== &amp;#39;function&amp;#39;) {
      throw new TypeError(&amp;#39;arguments is not function&amp;#39;);
    }
  }
  
  function compose(...args ) {
    let index = 0;
    let result = length ? fns[index].apply(this, args) : args;
    while(++index &amp;lt; length) {
      result = fns[index].call(this, result);
    }
  }
  return compose;
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实 redux 里的 compose 函数就是类似上面的实现过程，将多个函数进行聚合，然后在进行函数的执行。</p><h5 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结：</h5><ol start="0"><li>柯里化可以让我们给一个函数传递较少的参数得到一个记住某些固定参数的新函数</li><li>这是对函数的一种“缓存”</li><li>使函数变得更加灵活、颗粒度更小</li><li>可以把多元函数转换成一元函数，可以组合使用函数产生更强的功能</li></ol><h5 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接：</h5>`,39),b={href:"https://cloud.tencent.com/developer/article/1851152",target:"_blank",rel:"noopener noreferrer"},p={href:"https://github.com/mqyqingfeng/Blog/issues/42",target:"_blank",rel:"noopener noreferrer"},g=n("h2",{id:"推荐阅读",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#推荐阅读","aria-hidden":"true"},"#"),e(" 推荐阅读")],-1),h={href:"https://juejin.cn/post/7179385563768684602",target:"_blank",rel:"noopener noreferrer"},f={href:"https://juejin.cn/post/7176787612034662457",target:"_blank",rel:"noopener noreferrer"},x={href:"https://juejin.cn/post/7174190020297752613",target:"_blank",rel:"noopener noreferrer"},_={href:"https://juejin.cn/post/7169004126469914654",target:"_blank",rel:"noopener noreferrer"},w={href:"https://juejin.cn/post/7166416369943068679",target:"_blank",rel:"noopener noreferrer"},k=n("h2",{id:"开源作品",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#开源作品","aria-hidden":"true"},"#"),e(" 开源作品")],-1),y=n("ul",null,[n("li",null,"政采云前端小报")],-1),F={href:"http://zoo.zhengcaiyun.cn/",target:"_blank",rel:"noopener noreferrer"},q=n("ul",null,[n("li",null,"商品选择 sku 插件")],-1),z={href:"https://github.com/zcy-inc/skuPathFinder-back",target:"_blank",rel:"noopener noreferrer"},C=n("h2",{id:"招贤纳士",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),e(" 招贤纳士")],-1),R=n("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云研发部，Base 在风景如画的杭州。团队现有 80 余个前端小伙伴，平均年龄 27 岁，近 4 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),A=n("p",null,[e("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),n("code",null,"ZooTeam@cai-inc.com")],-1),S=n("p",null,[n("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98d3aa3d1f8646a8bcda8cfd9e335a4b~tplv-k3u1fbpfcp-zoom-1.image",alt:""})],-1);function j($,P){const i=t("ExternalLinkIcon");return l(),d("div",null,[v,u,n("p",null,[e("> 这是第 170 篇不掺水的原创，想获取更多原创好文，请搜索公众号关注我们吧~ 本文首发于政采云前端博客："),n("a",m,[e("浅谈柯里化"),s(i)])]),o,n("p",null,[n("a",b,[e("一文看懂 JavaScript 函数柯里化 - 什么是柯里化"),s(i)])]),n("p",null,[n("a",p,[e("JavaScript专题之函数柯里化"),s(i)])]),g,n("p",null,[n("a",h,[e("内网穿透你真的了解吗？"),s(i)])]),n("p",null,[n("a",f,[e("代码在内存中的'形状'"),s(i)])]),n("p",null,[n("a",x,[e("前端本地化部署"),s(i)])]),n("p",null,[n("a",_,[e("Rollup 与 Webpack 的 Tree-shaking"),s(i)])]),n("p",null,[n("a",w,[e("Git 是如何工作的"),s(i)])]),k,y,n("p",null,[n("strong",null,[e("开源地址 "),n("a",F,[e("www.zoo.team/openweekly/"),s(i)])]),e(" (小报官网首页有微信交流群)")]),q,n("p",null,[n("strong",null,[e("开源地址 "),n("a",z,[e("https://github.com/zcy-inc/skuPathFinder-back/"),s(i)])])]),C,R,A,S])}const Z=a(c,[["render",j],["__file","浅谈柯里化.html.vue"]]);export{Z as default};
