import{_ as d,z as s,A as t,Y as e,C as i,U as a,a6 as l,Q as m}from"./framework-cb9358d9.js";const v={},r=e("h2",{id:"",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#","aria-hidden":"true"},"#"),i(" **")],-1),c=e("p",null,'<table><tbody><tr><td bgcolor="#FDFFE7"><font size="4">原创不易，希望能关注下我们，再顺手点个赞~~<font></font></font></td></tr></tbody></table> **',-1),u={href:"https://www.zoo.team/article/vue-communication",target:"_blank",rel:"noopener noreferrer"},p=l(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/9/16e508787bc8e161~tplv-t2oaga2asx-image.image" alt="季节.png"></p><h3 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h3><p>初识 Vue.js ，了解到组件是 Vue 的主要构成部分，但组件内部的作用域是相对独立的部分，组件之间的关系一般如下图：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/27/16cd2a4d25cfcaba~tplv-t2oaga2asx-image.image" alt=""></p><p>组件 A 与组件 B 、C 之间是父子组件，组件 B 、C 之间是兄弟组件，而组件 A 、D 之间是隔代的关系。</p><p>那么对于这些不同的关系，本文主要分享了他们之间可以采用的几种数据通信方式，例如 Props 、$emit / $on 、Vuex 等，大家可以根据自己的使用场景可以选择适合的使用方式。</p><h3 id="一、-prop-emit" tabindex="-1"><a class="header-anchor" href="#一、-prop-emit" aria-hidden="true">#</a> 一、 Prop / $emit</h3><p>1、<strong>Prop 是你可以在组件上注册的一些自定义特性。当一个值传递给一个 Prop 特性的时候，它就变成了那个组件实例的一个属性</strong>。父组件向子组件传值，通过绑定属性来向子组件传入数据，子组件通过 Props 属性获取对应数据</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 父组件
&amp;lt;template&amp;gt;
  &amp;lt;div class=&amp;quot;container&amp;quot;&amp;gt;
    &amp;lt;child :title=&amp;quot;title&amp;quot;&amp;gt;&amp;lt;/child&amp;gt;
  &amp;lt;/div&amp;gt;
&amp;lt;/template&amp;gt;

&amp;lt;script&amp;gt;
import Child from &amp;quot;./component/child.vue&amp;quot;;
export default {
  name: &amp;quot;demo&amp;quot;,
  data: function() {
    return {
      title: &amp;quot;我是父组件给的&amp;quot;
    };
  },
  components: {
    Child
  },
};
&amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 子组件
&amp;lt;template&amp;gt;
  &amp;lt;div class=&amp;quot;text&amp;quot;&amp;gt;{{title}}&amp;lt;/div&amp;gt;
&amp;lt;/template&amp;gt;

&amp;lt;script&amp;gt;
export default {
  name: &amp;#39;demo&amp;#39;,
  data: function() {},
  props: {
    title: {
      type: String
    }
  },
};
&amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、$emit 子组件向父组件传值（通过事件形式），子组件通过 $emit 事件向父组件发送消息，将自己的数据传递给父组件。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/27/16cd2e1432959dfb~tplv-t2oaga2asx-image.image" alt=""></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 父组件
&amp;lt;template&amp;gt;
  &amp;lt;div class=&amp;quot;container&amp;quot;&amp;gt;
    &amp;lt;div class=&amp;quot;title&amp;quot;&amp;gt;{{title}}&amp;lt;/div&amp;gt;
    &amp;lt;child @changeTitle=&amp;quot;parentTitle&amp;quot;&amp;gt;&amp;lt;/child&amp;gt;
  &amp;lt;/div&amp;gt;
&amp;lt;/template&amp;gt;

&amp;lt;script&amp;gt;
import Child from &amp;quot;./component/child.vue&amp;quot;;

export default {
  name: &amp;quot;demo&amp;quot;,
  data: function() {
    return {
      title: null
    };
  },
  components: {
    Child
  },
  methods: {
    parentTitle(e) {
      this.title = e;
    }
  }
};
&amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 子组件
&amp;lt;template&amp;gt;
  &amp;lt;div class=&amp;quot;center&amp;quot;&amp;gt;
    &amp;lt;button @click=&amp;quot;childTitle&amp;quot;&amp;gt;我给父组件赋值&amp;lt;/button&amp;gt;
  &amp;lt;/div&amp;gt;
&amp;lt;/template&amp;gt;

&amp;lt;script&amp;gt;
export default {
  name: &amp;#39;demo&amp;#39;,
  data() {
    return {
      key: 1
    };
  },
  methods: {
    childTitle() {
      this.$emit(&amp;#39;changeTitle&amp;#39;, \`我给父组件的第\${this.key}次\`);
      this.key++;
    }
  }
};
&amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小总结：常用的数据传输方式，父子间传递。</strong></p><h3 id="二、-emit-​-on" tabindex="-1"><a class="header-anchor" href="#二、-emit-​-on" aria-hidden="true">#</a> 二、 $emit / ​$on</h3><p>这个方法是通过创建了一个空的 vue 实例，当做 $emit 事件的处理中心（事件总线），通过他来触发以及监听事件，方便的实现了任意组件间的通信，包含父子，兄弟，隔代组件。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/27/16cd2e1432b5ce66~tplv-t2oaga2asx-image.image" alt=""></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 父组件
&amp;lt;template&amp;gt;
  &amp;lt;div class=&amp;quot;container&amp;quot;&amp;gt;
    &amp;lt;child1 :Event=&amp;quot;Event&amp;quot;&amp;gt;&amp;lt;/child1&amp;gt;
    &amp;lt;child2 :Event=&amp;quot;Event&amp;quot;&amp;gt;&amp;lt;/child2&amp;gt;
    &amp;lt;child3 :Event=&amp;quot;Event&amp;quot;&amp;gt;&amp;lt;/child3&amp;gt;
  &amp;lt;/div&amp;gt;
&amp;lt;/template&amp;gt;

&amp;lt;script&amp;gt;
import Vue from &amp;quot;vue&amp;quot;;

import Child1 from &amp;quot;./component/child1.vue&amp;quot;;
import Child2 from &amp;quot;./component/child2.vue&amp;quot;;
import Child3 from &amp;quot;./component/child3.vue&amp;quot;;

const Event = new Vue();

export default {
  name: &amp;quot;demo&amp;quot;,
  data: function() {
    return {
      Event: Event
    };
  },
  components: {
    Child1,
    Child2,
    Child3
  },
};
&amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 子组件1
&amp;lt;template&amp;gt;
  &amp;lt;div class=&amp;quot;center&amp;quot;&amp;gt;
    1.我的名字是：{{name}}
    &amp;lt;button @click=&amp;quot;send&amp;quot;&amp;gt;我给3组件赋值&amp;lt;/button&amp;gt;
  &amp;lt;/div&amp;gt;
&amp;lt;/template&amp;gt;

&amp;lt;script&amp;gt;
export default {
  name: &amp;quot;demo1&amp;quot;,
  data() {
    return {
      name: &amp;quot;政采云&amp;quot;
    };
  },
  props: {
    Event: Object
  },
  methods: {
    send() {
      this.Event.$emit(&amp;quot;message-a&amp;quot;, this.name);
    }
  }
};
&amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 子组件2
&amp;lt;template&amp;gt;
  &amp;lt;div class=&amp;quot;center&amp;quot;&amp;gt;
    2.我的年龄是：{{age}}岁
    &amp;lt;button @click=&amp;quot;send&amp;quot;&amp;gt;我给3组件赋值&amp;lt;/button&amp;gt;
  &amp;lt;/div&amp;gt;
&amp;lt;/template&amp;gt;

&amp;lt;script&amp;gt;
/* eslint-disable */
export default {
  name: &amp;quot;demo2&amp;quot;,
  data() {
    return {
      age: &amp;quot;3&amp;quot;
    };
  },
  props: {
    Event: Object
  },
  methods: {
    send() {
      this.Event.$emit(&amp;quot;message-b&amp;quot;, this.age);
    }
  }
};
&amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 子组件3
&amp;lt;template&amp;gt;
  &amp;lt;div class=&amp;quot;center&amp;quot;&amp;gt;我的名字是{{name}}，今年{{age}}岁&amp;lt;/div&amp;gt;
&amp;lt;/template&amp;gt;

&amp;lt;script&amp;gt;
export default {
  name: &amp;#39;demo3&amp;#39;,
  data() {
    return {
      name: &amp;#39;&amp;#39;,
      age: &amp;#39;&amp;#39;
    };
  },
  props: {
    Event: Object
  },
  mounted() {
    this.Event.$on(&amp;#39;message-a&amp;#39;, name =&amp;gt; {
      this.name = name;
    });
    this.Event.$on(&amp;#39;message-b&amp;#39;, age =&amp;gt; {
      this.age = age;
    });
  },
};
&amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小总结：巧妙的在父子，兄弟，隔代组件中都可以互相数据通信。</strong></p><h3 id="三、-vuex" tabindex="-1"><a class="header-anchor" href="#三、-vuex" aria-hidden="true">#</a> 三、 Vuex</h3>`,24),o={href:"http://vuex.vuejs.org/zh/",target:"_blank",rel:"noopener noreferrer"},b=e("strong",null,"是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。",-1),g=l(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/27/16cd2a4d281fcdc6~tplv-t2oaga2asx-image.image" alt=""></p><p>Vuex实现了一个单项数据流，通过创建一个全局的 State 数据，组件想要修改 State 数据只能通过 Mutation 来进行，例如页面上的操作想要修改 State 数据时，需要通过 Dispatch (触发 Action )，而 Action 也不能直接操作数据，还需要通过 Mutation 来修改 State 中数据，最后根据 State 中数据的变化，来渲染页面。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/27/16cd2e14331f84dc~tplv-t2oaga2asx-image.image" alt=""></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// index.js
import Vue from &amp;#39;vue&amp;#39;;
import Tpl from &amp;#39;./index.vue&amp;#39;;
import store from &amp;#39;./store&amp;#39;;

new Vue({
  store,
  render: h =&amp;gt; h(Tpl),
}).$mount(&amp;#39;#app&amp;#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// store
import Vue from &amp;#39;vue&amp;#39;;
import Vuex from &amp;#39;vuex&amp;#39;;

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    reduce(state) {
      state.count--;
    }
  },
  actions: {
    actIncrement({ commit }) {
      commit(&amp;#39;increment&amp;#39;);
    },
    actReduce({ commit }) {
      commit(&amp;#39;reduce&amp;#39;);
    }
  },
  getters: {
    doubleCount: state =&amp;gt; state.count*2
  }
});

export default store;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// vue文件
&amp;lt;template&amp;gt;
  &amp;lt;div class=&amp;quot;container&amp;quot;&amp;gt;
    &amp;lt;p&amp;gt;我的count：{{count}}&amp;lt;/p&amp;gt;
    &amp;lt;p&amp;gt;doubleCount:{{doubleCount}}&amp;lt;/p&amp;gt;
    &amp;lt;button @click=&amp;quot;this.actIncrement&amp;quot;&amp;gt;增加&amp;lt;/button&amp;gt;
    &amp;lt;button @click=&amp;quot;this.actReduce&amp;quot;&amp;gt;减少&amp;lt;/button&amp;gt;
  &amp;lt;/div&amp;gt;
&amp;lt;/template&amp;gt;

&amp;lt;script&amp;gt;
import { mapGetters, mapActions, mapState } from &amp;quot;vuex&amp;quot;;

export default {
  name: &amp;quot;demo&amp;quot;,
  data: function() {
    return {};
  },
  components: {},
  props: {},
  computed: {
    ...mapState([&amp;quot;count&amp;quot;]),
    ...mapGetters([&amp;quot;doubleCount&amp;quot;])
  },
  methods: {
    ...mapActions([&amp;quot;actIncrement&amp;quot;, &amp;quot;actReduce&amp;quot;])
  }
};
&amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Vuex 中需要注意的点：</p><p>Mutation ：是修改State数据的唯一推荐方法，且只能进行同步操作。</p><p>Getter ：Vuex 允许在Store中定义 &quot;Getter&quot;（类似于 Store 的计算属性）。Getter 的返回值会根据他的依赖进行缓存，只有依赖值发生了变化，才会重新计算。</p>`,9),h={href:"http://vuex.vuejs.org/zh/",target:"_blank",rel:"noopener noreferrer"},x=l(`<p><strong>小总结：统一的维护了一份共同的 State 数据，方便组件间共同调用。</strong></p><h3 id="四、-attrs-listeners" tabindex="-1"><a class="header-anchor" href="#四、-attrs-listeners" aria-hidden="true">#</a> 四、 $attrs / $listeners</h3><p>Vue 组件间传输数据在 Vue2.4 版本后有了新方法。除了 Props 外，还有了 $attrs /​ $listeners。</p><ul><li>$attrs：<strong>包含了父作用域中不作为 Prop 被识别 (且获取) 的特性绑定 (<code>Class</code> 和 <code>Style</code> 除外)。当一个组件没有声明任何 Prop 时，这里会包含所有父作用域的绑定 (<code>Class</code> 和 <code>Style</code> 除外)，并且可以通过 <code>v-bind=&amp;quot;$attrs&amp;quot;</code> 传入内部组件——在创建高级别的组件时非常有用。</strong></li><li>$listeners：<strong>包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on=&quot;$listeners&quot; 传入内部组件</strong></li></ul><p>下面来看个例子</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/27/16cd2a4d2af476c3~tplv-t2oaga2asx-image.image" alt=""></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 父组件
&amp;lt;template&amp;gt;
  &amp;lt;div class=&amp;quot;container&amp;quot;&amp;gt;
    &amp;lt;button style=&amp;quot;backgroundColor:lightgray&amp;quot; @click=&amp;quot;reduce&amp;quot;&amp;gt;减dd&amp;lt;/button&amp;gt;
    &amp;lt;child1 :aa=&amp;quot;aa&amp;quot; :bb=&amp;quot;bb&amp;quot; :cc=&amp;quot;cc&amp;quot; :dd=&amp;quot;dd&amp;quot; @reduce=&amp;quot;reduce&amp;quot;&amp;gt;&amp;lt;/child1&amp;gt;
  &amp;lt;/div&amp;gt;
&amp;lt;/template&amp;gt;

&amp;lt;script&amp;gt;
import Child1 from &amp;#39;./component/child1.vue&amp;#39;;
export default {
  name: &amp;#39;demo&amp;#39;,
  data: function() {
    return {
      aa: 1,
      bb: 2,
      cc: 3,
      dd: 100
    };
  },
  components: {
    Child1
  },
  methods: {
    reduce() {
      this.dd--;
    }
  }
};
&amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 子组件1
&amp;lt;template&amp;gt;
  &amp;lt;div&amp;gt;
    &amp;lt;div class=&amp;quot;center&amp;quot;&amp;gt;
      &amp;lt;p&amp;gt;aa:{{aa}}&amp;lt;/p&amp;gt;
      &amp;lt;p&amp;gt;child1的$attrs:{{$attrs}}&amp;lt;/p&amp;gt;
      &amp;lt;button @click=&amp;quot;this.reduce1&amp;quot;&amp;gt;组件1减dd&amp;lt;/button&amp;gt;
    &amp;lt;/div&amp;gt;
    &amp;lt;child2 v-bind=&amp;quot;$attrs&amp;quot; v-on=&amp;quot;$listeners&amp;quot;&amp;gt;&amp;lt;/child2&amp;gt;
  &amp;lt;/div&amp;gt;
&amp;lt;/template&amp;gt;

&amp;lt;script&amp;gt;
import child2 from &amp;#39;./child2.vue&amp;#39;;
export default {
  name: &amp;#39;demo1&amp;#39;,
  data() {
    return {};
  },
  props: {
    aa: Number
  },
  components: {
    child2
  },
  methods: {
    reduce1() {
      this.$emit(&amp;#39;reduce&amp;#39;);
    }
  }
};
&amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 子组件2
&amp;lt;template&amp;gt;
  &amp;lt;div&amp;gt;
    &amp;lt;div class=&amp;quot;center&amp;quot;&amp;gt;
      &amp;lt;p&amp;gt;bb:{{bb}}&amp;lt;/p&amp;gt;
      &amp;lt;p&amp;gt;child2的$attrs:{{$attrs}}&amp;lt;/p&amp;gt;
      &amp;lt;button @click=&amp;quot;this.reduce2&amp;quot;&amp;gt;组件2减dd&amp;lt;/button&amp;gt;
    &amp;lt;/div&amp;gt;
    &amp;lt;child3 v-bind=&amp;quot;$attrs&amp;quot;&amp;gt;&amp;lt;/child3&amp;gt;
  &amp;lt;/div&amp;gt;
&amp;lt;/template&amp;gt;

&amp;lt;script&amp;gt;
import child3 from &amp;#39;./child3.vue&amp;#39;;
export default {
  name: &amp;#39;demo1&amp;#39;,
  data() {
    return {};
  },
  props: {
    bb: Number
  },
  components: {
    child3
  },
  methods: {
    reduce2() {
      this.$emit(&amp;#39;reduce&amp;#39;);
    }
  }
};
&amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 子组件3
&amp;lt;template&amp;gt;
  &amp;lt;div class=&amp;quot;center&amp;quot;&amp;gt;
    &amp;lt;p&amp;gt;child3的$attrs:{{$attrs}}&amp;lt;/p&amp;gt;
  &amp;lt;/div&amp;gt;
&amp;lt;/template&amp;gt;

&amp;lt;script&amp;gt;
export default {
  name: &amp;#39;demo3&amp;#39;,
  data() {
    return {};
  },
  props: {
    dd: String
  },
};
&amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单来说，$attrs 里存放的是父组件中绑定的非 props 属性，​$listeners 里面存放的是父组件中绑定的非原生事件。</p><p><strong>小总结：当传输数据、方法较多时，无需一一填写的小技巧。</strong></p><h3 id="五、-provider-inject" tabindex="-1"><a class="header-anchor" href="#五、-provider-inject" aria-hidden="true">#</a> 五、 Provider / Inject</h3><p>Vue2.2 版本以后新增了这两个 API， <strong>这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效。</strong> 简单来说，就是父组件通过 Provider 传入变量，任意子孙组件通过 Inject 来拿到变量。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 父组件
&amp;lt;template&amp;gt;
  &amp;lt;div class=&amp;quot;container&amp;quot;&amp;gt;
    &amp;lt;button @click=&amp;quot;this.changeName&amp;quot;&amp;gt;我要改名字了&amp;lt;/button&amp;gt;
    &amp;lt;p&amp;gt;我的名字：{{name}}&amp;lt;/p&amp;gt;
    &amp;lt;child1&amp;gt;&amp;lt;/child1&amp;gt;
  &amp;lt;/div&amp;gt;
&amp;lt;/template&amp;gt;

&amp;lt;script&amp;gt;
import Child1 from &amp;#39;./component/child1.vue&amp;#39;;
export default {
  name: &amp;#39;demo&amp;#39;,
  data: function() {
    return {
      name: &amp;#39;政采云&amp;#39;
    };
  },
  // provide() {
  //   return {
  //     name: this.name //这种绑定方式是不可响应的
  //   };
  // },
  provide() {
    return {
      obj: this
    };
  },
  components: {
    Child1
  },
  methods: {
    changeName() {
      this.name = &amp;#39;政采云前端&amp;#39;;
    }
  }
};
&amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 子组件
&amp;lt;template&amp;gt;
  &amp;lt;div&amp;gt;
    &amp;lt;div class=&amp;quot;center&amp;quot;&amp;gt;
      &amp;lt;!-- &amp;lt;p&amp;gt;子组件名字:{{name}}&amp;lt;/p&amp;gt; --&amp;gt;
      &amp;lt;p&amp;gt;子组件名字:{{this.obj.name}}&amp;lt;/p&amp;gt;
    &amp;lt;/div&amp;gt;
    &amp;lt;child2&amp;gt;&amp;lt;/child2&amp;gt;
  &amp;lt;/div&amp;gt;
&amp;lt;/template&amp;gt;

&amp;lt;script&amp;gt;
import child2 from &amp;#39;./child2.vue&amp;#39;;

export default {
  name: &amp;#39;demo1&amp;#39;,
  data() {
    return {};
  },
  props: {},
  // inject: [&amp;quot;name&amp;quot;],
  inject: {
    obj: {
      default: () =&amp;gt; {
        return {};
      }
    }
  },
  components: {
    child2
  },
};
&amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是：<strong>Provide 和 Inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。</strong></p><p>所以，如果采用的是我代码中注释的方式，父级的 name 如果改变了，子组件this.name 是不会改变的，仍然是 <strong>政采云</strong>，而当采用代码中传入一个监听对象，修改对象中属性值，是可以监听到修改的。</p><p>Provider / Inject 在项目中需要有较多公共传参时使用还是颇为方便的。</p><p><strong>小总结：传输数据父级一次注入，子孙组件一起共享的方式。</strong></p><h3 id="六、-parent-children-amp-refs" tabindex="-1"><a class="header-anchor" href="#六、-parent-children-amp-refs" aria-hidden="true">#</a> 六、 $parent / $children &amp;amp; $refs</h3>`,21),q=e("li",null,[i("$parent / $children："),e("strong",null,[i("指定已创建的实例之父实例，在两者之间建立父子关系。子实例可以用 "),e("code",null,"this.$parent"),i(" 访问父实例，子实例被推入父实例的 "),e("code",null,"$children"),i(" 数组中。")])],-1),f={href:"https://cn.vuejs.org/v2/api/index.html?_sw-precache=a7a4d39c5138496b644f27256d087649#ref",target:"_blank",rel:"noopener noreferrer"},_=e("code",null,"ref",-1),$=e("code",null,"$refs",-1),j=l(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 父组件
&amp;lt;template&amp;gt;
  &amp;lt;div class=&amp;quot;container&amp;quot;&amp;gt;
    &amp;lt;p&amp;gt;我的title：{{title}}&amp;lt;/p&amp;gt;
    &amp;lt;p&amp;gt;我的name：{{name}}&amp;lt;/p&amp;gt;
    &amp;lt;child1 ref=&amp;quot;comp1&amp;quot;&amp;gt;&amp;lt;/child1&amp;gt;
    &amp;lt;child2 ref=&amp;quot;comp2&amp;quot;&amp;gt;&amp;lt;/child2&amp;gt;
  &amp;lt;/div&amp;gt;
&amp;lt;/template&amp;gt;

&amp;lt;script&amp;gt;
import Child1 from &amp;#39;./component/child1.vue&amp;#39;;
import Child2 from &amp;#39;./component/child2.vue&amp;#39;;
export default {
  name: &amp;#39;demo&amp;#39;,
  data: function() {
    return {
      title: null,
      name: null,
      content: &amp;#39;就是我&amp;#39;
    };
  },
  components: {
    Child1,
    Child2
  },
  mounted() {
    const comp1 = this.$refs.comp1;
    this.title = comp1.title;
    comp1.sayHello();
    this.name = this.$children[1].title;
  },
};
&amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 子组件1-ref方式
&amp;lt;template&amp;gt;
  &amp;lt;div&amp;gt;
    &amp;lt;div class=&amp;quot;center&amp;quot;&amp;gt;我的父组件是谁:{{content}}&amp;lt;/div&amp;gt;
  &amp;lt;/div&amp;gt;
&amp;lt;/template&amp;gt;

&amp;lt;script&amp;gt;
export default {
  name: &amp;#39;demo1&amp;#39;,
  data() {
    return {
      title: &amp;#39;我是子组件&amp;#39;,
      content: null
    };
  },
  mounted() {
    this.content = this.$parent.content;
  },
  methods: {
    sayHello() {
      window.alert(&amp;#39;Hello&amp;#39;);
    }
  }
};
&amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 子组件2-children方式
&amp;lt;template&amp;gt;
  &amp;lt;div&amp;gt;
    &amp;lt;div class=&amp;quot;center&amp;quot;&amp;gt;&amp;lt;/div&amp;gt;
  &amp;lt;/div&amp;gt;
&amp;lt;/template&amp;gt;

&amp;lt;script&amp;gt;
export default {
  name: &amp;#39;demo1&amp;#39;,
  data() {
    return {
      title: &amp;#39;我是子组件2&amp;#39;
    };
  },
};
&amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过例子可以看到这两种方式都可以父子间通信，而缺点也很统一，就是都不能跨级以及兄弟间通信。</p><p><strong>小总结：父子组件间共享数据以及方法的便捷实践之一。</strong></p><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>组件间不同的使用场景可以分为 3 类，对应的通信方式如下：</p><ul><li>父子通信：Props / $emit，$emit / $on，Vuex，$attrs / ​$listeners，provide/inject，$parent / $children＆$refs</li><li>兄弟通信：$emit / $on，Vuex</li><li>隔代（跨级）通信：$emit / ​$on，Vuex，provide / inject，$attrs / $listeners</li></ul><p>大家可以根据自己的使用场景选择不同的通信方式，当然还是都自己写写代码，试验一把来的印象深刻喽。</p><h2 id="招贤纳士-recruitment" tabindex="-1"><a class="header-anchor" href="#招贤纳士-recruitment" aria-hidden="true">#</a> 招贤纳士（Recruitment）</h2><p>招人，前端，隶属政采云前端大团队（ZooTeam），50 余个小伙伴正等你加入一起浪 [坏笑] 如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“5年工作时间3年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手参与一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 <strong><code>ZooTeam@cai-inc.com</code></strong></p><h2 id="推荐阅读-recommend" tabindex="-1"><a class="header-anchor" href="#推荐阅读-recommend" aria-hidden="true">#</a> 推荐阅读（Recommend）</h2>`,12),V={href:"https://juejin.cn/post/6844903938018263048",target:"_blank",rel:"noopener noreferrer"},C={href:"https://juejin.cn/post/6844903933580673032",target:"_blank",rel:"noopener noreferrer"},k={href:"https://juejin.cn/post/6844903927448616968",target:"_blank",rel:"noopener noreferrer"};function E(S,y){const n=m("ExternalLinkIcon");return s(),t("div",null,[r,c,e("p",null,[i("> 本文首发于政采云前端团队博客： "),e("a",u,[i("Vue 组件数据通信方案总结"),a(n)])]),p,e("p",null,[e("a",o,[i("Vuex"),a(n)]),i(),b]),g,e("p",null,[i("本段只是简单介绍了一下 Vuex 的运行方式，更多功能例如 Module 模块请参考"),e("a",h,[i("官网"),a(n)]),i(" 。")]),x,e("ul",null,[q,e("li",null,[i("$refs："),e("strong",null,[i("一个对象，持有注册过 "),e("a",f,[_,i(" 特性"),a(n)]),i(" 的所有 DOM 元素和组件实例。ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 "),$,i(" 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件。")])])]),j,e("p",null,[e("a",V,[i("看完这篇，你也能把 React Hooks 玩出花"),a(n)])]),e("p",null,[e("a",C,[i("自动化 Web 性能优化分析方案"),a(n)])]),e("p",null,[e("a",k,[i("CSS 层叠上下文（Stacking Context）"),a(n)])])])}const T=d(v,[["render",E],["__file","Vue 组件数据通信方案总结.html.vue"]]);export{T as default};
