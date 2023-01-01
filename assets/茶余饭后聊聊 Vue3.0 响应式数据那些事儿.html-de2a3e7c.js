import{_ as s,z as l,A as d,Y as e,C as n,U as i,a6 as t,Q as r}from"./framework-cb9358d9.js";const c={},o=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8d2b0103c1fa~tplv-t2oaga2asx-image.image",alt:""})],-1),m=e("h2",{id:"",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#","aria-hidden":"true"},"#"),n(" **")],-1),u=e("p",null,'<table><tbody><tr><td bgcolor="#FDFFE7"><font size="4">原创不易，希望能关注下我们，再顺手点个赞~~<font></font></font></td></tr></tbody></table> **',-1),v={href:"https://www.zoo.team/article/vue3",target:"_blank",rel:"noopener noreferrer"},p=t(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/19/16e82ee0c061e46e~tplv-t2oaga2asx-image.image" alt=""></p><p>&quot;别再更新了，实在是学不动了&quot;这句话道出了多少前端开发者的心声，&quot;不幸&quot;的是 Vue 的作者在国庆区间发布了 Vue3.0 的 pre-Aplha 版本，这意味着 Vue3.0 快要和我们见面了。既来之则安之，扶我起来我要开始讲了。Vue3.0 为了达到更快、更小、更易于维护、更贴近原生、对开发者更友好的目的，在很多方面进行了重构：</p><ol><li>使用 Typescript</li><li>放弃 class 采用 function-based API</li><li>重构 complier</li><li>重构 virtual DOM</li><li>新的响应式机制</li></ol><p>今天咱就聊聊重构后的响应式数据。</p><h2 id="尝鲜" tabindex="-1"><a class="header-anchor" href="#尝鲜" aria-hidden="true">#</a> 尝鲜</h2><p>重构后的 Vue3.0 和之前在写法上有很大的差别，早前在网络上对于 Vue3.0 这种激进式的重构方式发起了一场讨论，见仁见智。不多说先看看 Vue3.0 在写法上激进到什么程度。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;!DOCTYPE html&amp;gt;
&amp;lt;html lang=&amp;quot;en&amp;quot;&amp;gt;
&amp;lt;head&amp;gt;
  &amp;lt;meta charset=&amp;quot;UTF-8&amp;quot;&amp;gt;
  &amp;lt;title&amp;gt;Document&amp;lt;/title&amp;gt;
  &amp;lt;script src=&amp;quot;../packages/vue/dist/vue.global.js&amp;quot;&amp;gt;&amp;lt;/script&amp;gt;
&amp;lt;/head&amp;gt;
&amp;lt;body&amp;gt;
  &amp;lt;div id=&amp;quot;app&amp;quot;&amp;gt;&amp;lt;/div&amp;gt;
  &amp;lt;script&amp;gt;
    const { reactive, computed, effect, createApp } = Vue
    const App = {
      template: \`
        &amp;lt;div id=&amp;quot;box&amp;quot;&amp;gt;
            &amp;lt;button @click=&amp;quot;add&amp;quot;&amp;gt;{{ state.count }}&amp;lt;/button&amp;gt;
        &amp;lt;/div&amp;gt; 
      \`,
      setup() {
        const state = reactive({
          count: 0
        })
        function add() {
          state.count++
        }
        effect(() =&amp;gt; {
          console.log(&amp;#39;count改变&amp;#39;, state.count);
        })
        return {
          state,
          add
        }
      }
    }
    createApp().mount(App, &amp;#39;#app&amp;#39;)
  &amp;lt;/script&amp;gt;
&amp;lt;/body&amp;gt;
&amp;lt;/html&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),b={href:"https://cn.mobx.js.org/",target:"_blank",rel:"noopener noreferrer"},g=t(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import {observable,computed,autorun} from &amp;quot;mobx&amp;quot;
var numbers = observable([1,2,3]);
var sum = computed(() =&amp;gt; numbers.reduce((a, b) =&amp;gt; a + b, 0));

var disposer = autorun(() =&amp;gt; console.log(sum.get()));
// 输出 &amp;#39;6&amp;#39;
numbers.push(4);
// 输出 &amp;#39;10&amp;#39;
numbers.push(5);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再看看 Vue3.0 暴露的这几个和响应式数据相关的方法：</p><ol><li><p>reactive(value)</p><p>创建可观察的变量，参数可以是 JS 原始类型、引用、纯对象、类实例、数组、集合（Map|Set）。</p></li><li><p>effect(fn)</p></li></ol><p>effect 意思是副作用,此方法默认会先执行一次。如果 fn 中有依赖的可观察属性变化时，会再次触发此回调函数</p><ol start="3"><li><p>computed(()=&gt;expression)</p><p>创建一个计算值，<code>computed</code> 实现也是基于 <code>effect</code> 来实现的，特点是 <code>computed</code> 中的函数不会立即执行，多次取值是有缓存机制的，<code>expression</code> 不应该有任何副作用，而仅仅是返回一个值。当这个 <code>expression</code> 依赖的可观察属性变化时，这个表达式会重新计算。</p></li></ol>`,5),h={href:"https://cn.mobx.js.org/",target:"_blank",rel:"noopener noreferrer"},x=t(`<p>Vue3.0 把创建响应式对象从组件实例初始化中抽离了出来，通过暴露 API 的方式将响应式对象创建的权利交给开发者，开发者可以自由的决定何时何地创建响应式对象，就冲这点 Vue3.0 我先粉了。</p><h2 id="重构后的响应式机制带来了哪些改变" tabindex="-1"><a class="header-anchor" href="#重构后的响应式机制带来了哪些改变" aria-hidden="true">#</a> 重构后的响应式机制带来了哪些改变？</h2><p>每一个大版本的发布都意味着新功能、新特性的出现，那么重构后的响应式数据部分相比 3.0 之前的版本有了哪些方面的改变呢？下面听我娓娓道来：</p><h3 id="对数组的全面监听" tabindex="-1"><a class="header-anchor" href="#对数组的全面监听" aria-hidden="true">#</a> 对数组的全面监听</h3><p>Vue2.x 中被大家吐槽的最多的一点就是针对数组只实现了 <code>push,pop,shift,unshift,splice,sort,reverse&amp;#39;</code> 这七个方法的监听，以前通过数组下标改变值的时候，是不能触发视图更新的。这里插一个题外话，很多人认为 Vue2.x 中数组不能实现全方位监听是 Object.defineProperty 不能监听数组下标的改变，这可就冤枉人家了，人家也能侦听数组下标变化的好吗，不信你看</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const arr = [&amp;quot;2019&amp;quot;,&amp;quot;云&amp;quot;,&amp;quot;栖&amp;quot;,&amp;quot;音&amp;quot;,&amp;quot;乐&amp;quot;,&amp;quot;节&amp;quot;];
arr.forEach((val,index)=&amp;gt;{
    Object.defineProperty(arr,index,{
        set(newVal){
            console.log(&amp;quot;赋值&amp;quot;);
        },
        get(){
            console.log(&amp;quot;取值&amp;quot;);
            return val;
        }
    })
})
let index = arr[1];
//取值
arr[0] = &amp;quot;2050&amp;quot;;
//赋值

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>没毛病，一切变化都在人家的掌握中。上面这段代码，有没有人没看懂，我假装你们都不懂，贴张图</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/29/16e16e2a9b32ace7~tplv-t2oaga2asx-image.image" alt=""></p><p>从数组的数据结构来看，数组也是一个 Key-Value 的键值对集合，只是 Key 是数字罢了，自然也可以通过 Object.defineProperty 来实现数组的下标访问和赋值拦截了。其实 Vue2.x 没有实现数组的全方位监听主要有两方面原因：</p><ol><li><p>数组和普通对象相比，JS 数组太&quot;多变&quot;了。比如：<code>arr.length=0</code>，可以瞬间清空一个数组；<code>arr[100]=1</code>又可以瞬间将一个数组的长度变为 100（其他位置用空元素填充），等等骚操作。对于一个普通对象，我们一般只会改变 Key 对应的 Value 值，而不会连 key 都改变了,而数组就不一样了 Key 和 Value 都经常增加或减少，因此每次变化后我们都需要重新将整个数组的所有 key 递归的使用 Object.defineProperty 加上 setter 和 getter，同时我们还要穷举每一种数组变化的可能，这样势必就会带来性能开销问题，有的人会觉得这点性能开销算个 x 呀，但是性能问题都是由小变大的，如果数组中存的数据量大而且操作频繁时，这就会是一个大问题。React16.x 在就因为在优化 textNode 的时候，移除了无意义的 span 标签，性能据说都提升了多少个百分点，所以性能问题不可小看。</p></li><li><p>数组在应用中经常会被操作，但是通常 <code>push,pop,shift,unshift,splice,sort,reverse</code> 这 7 种操作就能达到目的。因此，出于性能方面的考虑 Vue2.x 做出了一定的取舍。</p></li></ol><p>那么 Vue3.0 怎么又走回头路去实现了数组的全面监听了呢？答案就是 Proxy 和 Reflet 这一对原生 CP 的出现，Vue3.0 使用 Proxy 作为响应式数据实现的核心，用 Proxy 返回一个代理对象，通过代理对象来收集依赖和触发更新。大概的原理像这段代码一样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const arr = [&amp;quot;2019&amp;quot;,&amp;quot;云&amp;quot;,&amp;quot;栖&amp;quot;,&amp;quot;音&amp;quot;,&amp;quot;乐&amp;quot;,&amp;quot;节&amp;quot;];
let ProxyArray = new Proxy(arr,{
    get:function(target, name, value, receiver) {
        console.log(&amp;quot;取值&amp;quot;)
        return Reflect.get(target,name);
    },
    set: function(target, name, value, receiver) {
       console.log(&amp;quot;赋值&amp;quot;)
       Reflect.set(target,name, value, receiver);;
    }
 })
 const index = ProxyArray[0];
 //取值
 ProxyArray[0]=&amp;quot;2050&amp;quot;
 //赋值
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果和 Object.defineProperty 一样一样的，又显得清新脱俗有没有？而且 Proxy 只要是对象都能代理，后面还会提到。当然 Vue3.0 是虽然有了新欢，但也没忘记旧爱，对于在之前版本中数组的几种方法的监听还是照样支持的。</p><h3 id="惰性监听" tabindex="-1"><a class="header-anchor" href="#惰性监听" aria-hidden="true">#</a> 惰性监听</h3><p><strong>什么是&quot;惰性监听&quot;?</strong></p><p>简单讲就是&quot;偷懒&quot;，开发者可以选择性的生成可观察对象。在平时的开发中常有这样的场景，一些页面上的数据在页面的整个生命周期中是不会变化的，这时这部分数据不需要具备响应式能力，这在 Vue3.0 以前是没有选择余地的，所有在模板中使用到的数据都需要在 data 中定义，组件实例在初始化的时候会将 data 整个对象变为可观察对象。</p><p><strong>惰性监听有什么好处？</strong></p><ol><li><p>提高了组件实例初始化速度</p><p>Vue3.0 以前组件实例在初始化的时候会将 data 整个对象变为可观察对象，通过递归的方式给每个 Key 使用 Object.defineProperty 加上 getter 和 settter ，如果是数组就重写代理数组对象的七个方法。而在 Vue3.0 中，将可响应式对象创建的权利交给了开发者，开发者可以通过暴露的 reactive , compted , effect 方法自定义自己需要响应式能力的数据，实例在初始化时不需要再去递归 data 对象了，从而降低了组件实例化的时间。</p></li><li><p>降低了运行内存的使用</p><p>Vue3.0 以前生成响应式对象会对对象进行深度遍历，同时为每个 Key 生成一个 def 对象用来保存 Key 的所有依赖项，当 Key 对应的 Value 变化的时候通知依赖项进行 update 。但如果这些依赖项在页面整个生命周期内不需要更新的时候，这时 def 对象收集的依赖项不仅没用而且还会占用内存，如果可以在初始化 data 的时候忽略掉这些不会变化的值就好了。Vue3.0 通过暴露的 reactive 方法，开发者可以选择性的创建可观察对象，达到减少依赖项的保存，降低了运行内存的使用。</p></li></ol><h3 id="map、set、weakset、weakmap的监听" tabindex="-1"><a class="header-anchor" href="#map、set、weakset、weakmap的监听" aria-hidden="true">#</a> Map、Set、WeakSet、WeakMap的监听</h3><p>前面提到 Proxy 可以代理所有的对象，立马联想到了 ES6 里面新增的集合 Map、Set， 聚合类型的支持得益于 Proxy 和 Reflect。讲真的这之前还真不知道 Proxy 这么刚啥都能代理，二话不说直接动手用 Proxy 代理了一个 map 试试水</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>let map = new Map([[&amp;quot;name&amp;quot;,&amp;quot;zhengcaiyun&amp;quot;]])
let mapProxy = new Proxy(map, {
  get(target, key, receiver) {
    console.log(&amp;quot;取值:&amp;quot;,key)
    return Reflect.get(target, key, receiver)
  }
})
mapProxy.get(&amp;quot;name&amp;quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>&gt; Uncaught TypeError: Method Map.prototype.get called on incompatible receiver [object Object]</p><p>一盆凉水泼来，报错了。原来 <code>Map、Set</code> 对象赋值、取值和他们内部的 this 指向有关系，但这里的 this 指向的是其实是 Proxy 对象，所以得这样干</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>let map = new Map([[&amp;#39;name&amp;#39;,&amp;#39;wangyangyang&amp;#39;]])
let mapProxy = new Proxy(map, {
  get(target, key, receiver) {
    var value = Reflect.get(...arguments)
     console.log(&amp;quot;取值:&amp;quot;,...arguments)
    return typeof value == &amp;#39;function&amp;#39; ? value.bind(target) : value
  }
})
mapProxy.get(&amp;quot;name&amp;quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当获取的是一个函数的时候，通过作用域绑定的方式将原对象绑定到 <code>Map、Set</code> 对象上就好了。</p><p><strong>Vue3.0 是如何实现集合类型数据监听的？</strong></p><p>眼尖的同学看完上面这段代码会发现一个问题，集合是没有 set 方法，集合赋值用的是 add 操作,那咋办呢？来看看那么 Vue3.0 是怎么处理的，上一段简化后的源码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function reactive(target: object) {
  return createReactiveObject(
    target,
    rawToReactive,
    reactiveToRaw,
    mutableHandlers,
    mutableCollectionHandlers
  )
}

function createReactiveObject(
  target: any,
  toProxy: WeakMap&amp;lt;any, any&amp;gt;,
  toRaw: WeakMap&amp;lt;any, any&amp;gt;,
  baseHandlers: ProxyHandler&amp;lt;any&amp;gt;,
  collectionHandlers: ProxyHandler&amp;lt;any&amp;gt;
) {
  //collectionTypes = new Set&amp;lt;Function&amp;gt;([Set, Map, WeakMap, WeakSet])
  const handlers = collectionTypes.has(target.constructor)
    ? collectionHandlers
    : baseHandlers
  //生成代理对象
  observed = new Proxy(target, handlers)
  toProxy.set(target, observed)
  toRaw.set(observed, target)
  if (!targetMap.has(target)) {
    targetMap.set(target, new Map())
  }
  return observed
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据 target 类型适配不同的 handler ，如果是集合 （<code>Map、Set</code>）就使用 collectionHandlers ，是其他类型就使用 baseHandlers。接下来看看 collectionHandlers</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export const mutableCollectionHandlers: ProxyHandler&amp;lt;any&amp;gt; = {
  get: createInstrumentationGetter(mutableInstrumentations)
}
export const readonlyCollectionHandlers: ProxyHandler&amp;lt;any&amp;gt; = {
  get: createInstrumentationGetter(readonlyInstrumentations)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>没有意外只有 get ，骚就骚在这儿:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 可变数据插桩对象，以及一系列相应的插桩方法
const mutableInstrumentations: any = {
  get(key: any) {
    return get(this, key, toReactive)
  },
  get size() {
    return size(this)
  },
  has,
  add,
  set,
  delete: deleteEntry,
  clear,
  forEach: createForEach(false)
}
// 迭代器相关的方法
const iteratorMethods = [&amp;#39;keys&amp;#39;, &amp;#39;values&amp;#39;, &amp;#39;entries&amp;#39;, Symbol.iterator]
iteratorMethods.forEach(method =&amp;gt; {
  mutableInstrumentations[method] = createIterableMethod(method, false)
  readonlyInstrumentations[method] = createIterableMethod(method, true)
})
// 创建getter的函数
function createInstrumentationGetter(instrumentations: any) {
  return function getInstrumented(
    target: any,
    key: string | symbol,
    receiver: any
  ) {
    target =
      hasOwn(instrumentations, key) &amp;amp;&amp;amp; key in target ? instrumentations : target
    return Reflect.get(target, key, receiver)
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于 Proxy 的 traps 跟 <code>Map|Set</code> 集合的原生方法不一致，因此无法通过 Proxy 劫持 set ,所以作者在在这里进行了&quot;偷梁换柱&quot;，这里新创建了一个和集合对象具有相同属性和方法的普通对象，在集合对象 get 操作时将 target 对象换成新创建的普通对象。这样，当调用 get 操作时 Reflect 反射到这个新对象上，当调用 set 方法时就直接调用新对象上可以触发响应的方法，是不是很巧妙？所以多看源码好处多多，可以多学学人家的骚操作。</p><h2 id="ie-怎么办" tabindex="-1"><a class="header-anchor" href="#ie-怎么办" aria-hidden="true">#</a> IE 怎么办？</h2><p>这是个实在不想提但又绕不开的话题，IE在前端开发者眼里和魔鬼没什么区别。在 Vue3.0 之前，响应式数据的实现是依赖 ES5 的 Object.defineProperty，因此只要支持 ES5 的浏览器都支持 Vue ，也就是说 Vue2.x 能支持到 IE9 。Vue3.0 依赖的是 Proxy 和 Reflect 这一对出生新时代的 CP，且无法被转译成 ES5 ，或者通过 Polyfill 提供兼容，这就尴尬了。开发者技术前线获悉的信息，官方在发布最终版本之前会做到兼容 IE11 ，至于更低版本的 IE 那就只有送上一曲凉凉了。</p><p>其实也不用太纠结 IE 的问题，因为连微软自己都已经放弃治疗 IE 拥抱 Chromium 了，我们又何必纠结呢？</p><h2 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h2><p>在使用开源框架时不要忘了，我们之所以能免费试用他，靠的维护者投入的大量精力。希望我们多去发现它带来的优点和作者想通过它传递的编程思想。最后期待 Vue3.0 正式版本的早日到来。</p><h2 id="招贤纳士" tabindex="-1"><a class="header-anchor" href="#招贤纳士" aria-hidden="true">#</a> 招贤纳士</h2><p>招人，前端，隶属政采云前端大团队（ZooTeam），50 余个小伙伴正等你加入一起浪～ 如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手参与一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给<code>ZooTeam@cai-inc.com</code></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,42),y={href:"https://juejin.cn/post/6844903950508883982",target:"_blank",rel:"noopener noreferrer"},f={href:"https://juejin.cn/post/6844903981819379719",target:"_blank",rel:"noopener noreferrer"},q={href:"https://juejin.cn/post/6844903933580673032",target:"_blank",rel:"noopener noreferrer"};function _(V,P){const a=r("ExternalLinkIcon");return l(),d("div",null,[o,m,u,e("p",null,[n("> 本文首发于政采云前端团队博客： "),e("a",v,[n("茶余饭后聊聊 Vue3.0 响应式数据那些事儿"),i(a)])]),p,e("p",null,[n("确实写法上和 Vue2.x 差别有点大，还整出了个 setup 。不过我的第一感觉倒不是写法上的差异，毕竟写过 React ，这种写法也没啥特别的。关键是这种响应式数据的写法好像在哪里见过有没有？写过 React 项目的人可能一眼就能看出来，没错就是它 "),e("a",b,[n("mobx"),i(a)]),n("，一种 React 的响应式状态管理插件")]),g,e("p",null,[n("和 "),e("a",h,[n("mobx"),i(a)]),n(" 有异曲同工之妙。")]),x,e("p",null,[e("a",y,[n("前端工程实践之可视化搭建系统（一）"),i(a)])]),e("p",null,[e("a",f,[n("乾坤大挪移！React 也能 “用上” computed 属性"),i(a)])]),e("p",null,[e("a",q,[n("自动化 Web 性能优化分析方案"),i(a)])])])}const j=s(c,[["render",_],["__file","茶余饭后聊聊 Vue3.0 响应式数据那些事儿.html.vue"]]);export{j as default};
