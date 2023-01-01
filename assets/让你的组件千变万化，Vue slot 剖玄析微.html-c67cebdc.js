import{_ as n,z as s,A as m,Y as e,C as a,U as l,a6 as i,Q as d}from"./framework-cb9358d9.js";const p={},o=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8d2b0103c1fa~tplv-t2oaga2asx-image.image",alt:""})],-1),r=e("h2",{id:"",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#","aria-hidden":"true"},"#"),a(" **")],-1),c=e("p",null,'<table><tbody><tr><td bgcolor="#FDFFE7"><font size="4">原创不易，希望能关注下我们，再顺手点个赞~~<font></font></font></td></tr></tbody></table> **',-1),v={href:"https://www.zoo.team/article/slot",target:"_blank",rel:"noopener noreferrer"},u=i('<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/9/16e508787bc8e161~tplv-t2oaga2asx-image.image" alt="季节.png"></p><h3 id="一-前言" tabindex="-1"><a class="header-anchor" href="#一-前言" aria-hidden="true">#</a> （一）前言</h3><p>Vue 代码中的 slot 是什么，简单来说就是插槽。 <code>&amp;lt;slot&amp;gt;</code> 元素作为组件模板之中的内容分发插槽，传入内容后 <code>&amp;lt;slot&amp;gt;</code> 元素自身将被替换。</p><p>看了上面这句官方解释，可能一样不知道 slot 指的是什么，那么就来看看在 Vue 中，什么时候你需要用到 slot 。</p><p>举例：一个组件的展示层你需要做到大体结构固定，但其内的部分结构可变，样式表现不固定。例如 Button 中是否显示 icon ，或者 Modal 框的中间内容展示区域的变化等，要通过子组件自己实现是不可能的。组件并不直接支持 HTML DOM 结构的传递，此时就可以通过使用 <code>slot</code> 作为 HTML 结构的传递入口来解决问题。</p><h3 id="二-v-slot-用法" tabindex="-1"><a class="header-anchor" href="#二-v-slot-用法" aria-hidden="true">#</a> （二）v-slot 用法</h3>',6),g=e("code",null,"&lt;v-slot&gt;",-1),b=e("code",null,"slot",-1),h=e("code",null,"slot-scope",-1),x={href:"https://cn.vuejs.org/v2/guide/components-slots.html#%E5%BA%9F%E5%BC%83%E4%BA%86%E7%9A%84%E8%AF%AD%E6%B3%95",target:"_blank",rel:"noopener noreferrer"},q=i(`<p>使用方法可以分为三类：<strong>默认插槽</strong>、<strong>具名插槽</strong>以及<strong>作用域插槽</strong>。</p><h4 id="◎-默认插槽" tabindex="-1"><a class="header-anchor" href="#◎-默认插槽" aria-hidden="true">#</a> <strong>◎ 默认插槽</strong></h4><p><strong>子组件编写</strong>：在组件中添加 <code>&amp;lt;slot&amp;gt;</code> 元素，来确定渲染的位置。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  // 子组件
  &amp;lt;template&amp;gt;
    &amp;lt;div class=&amp;quot;content&amp;quot;&amp;gt;
      &amp;lt;!-- 默认插槽 --&amp;gt;
      &amp;lt;header class=&amp;quot;text&amp;quot;&amp;gt;
        &amp;lt;!-- slot 的后备内容：为一个插槽设置具体后备（默认）内容是很有用的，当父组件不添加任何插槽内容时，默认渲染该后备内容的值。 --&amp;gt;
        &amp;lt;slot&amp;gt;默认值&amp;lt;/slot&amp;gt;
      &amp;lt;/header&amp;gt;
    &amp;lt;/div&amp;gt;
  &amp;lt;/template&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>父组件编写</strong>：任何没有被包裹在带有 v-slot 的 <code>&amp;lt;template&amp;gt;</code> 中的内容都会被视为默认插槽的内容。当子组件只有默认插槽时， <code>&amp;lt;v-slot&amp;gt;</code> 标签可以直接用在组件上，也就是独占默认插槽的写法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  // 父组件
  &amp;lt;template&amp;gt;
    &amp;lt;div class=&amp;quot;container&amp;quot;&amp;gt;
      &amp;lt;!-- 默认插槽--&amp;gt;
      &amp;lt;child&amp;gt;
        任意内容
        &amp;lt;template&amp;gt;内容&amp;lt;/template&amp;gt;
        中间内容
        &amp;lt;!-- &amp;lt;template v-slot:default&amp;gt;但如果你定义了 default 之后，其他内容就不会出现了，原理同上，不能重复定义&amp;lt;/template&amp;gt; --&amp;gt;
      &amp;lt;/child&amp;gt;
    
      &amp;lt;!-- 独占默认插槽的缩写 --&amp;gt;
      &amp;lt;child v-slot=&amp;quot;slotProps&amp;quot;&amp;gt;
        当只有默认插槽时，此为独占默认插槽的缩写&amp;lt;br&amp;gt;
        如果组件中有其他具名插槽，这么写会报错&amp;lt;br&amp;gt;
        slotProps 取的是，子组件标签 slot 上属性数据的集合
      &amp;lt;/child&amp;gt;
    &amp;lt;/div&amp;gt;
  &amp;lt;/template&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>渲染结果</strong></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/13/16e63f27fcba905e~tplv-t2oaga2asx-image.image" alt=""></p><h4 id="◎-具名插槽" tabindex="-1"><a class="header-anchor" href="#◎-具名插槽" aria-hidden="true">#</a> <strong>◎ 具名插槽</strong></h4><p><strong>子组件编写</strong>：当需要使用多个插槽时，为 <code>&amp;lt;slot&amp;gt;</code> 元素添加 <code>name</code> 属性，来区分不同的插槽，当不填写 name 时，默认为 default 默认插槽。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  // 子组件
  &amp;lt;template&amp;gt;
    &amp;lt;div class=&amp;quot;content&amp;quot;&amp;gt;
      &amp;lt;!-- 具名插槽 --&amp;gt;
      &amp;lt;main class=&amp;quot;text&amp;quot;&amp;gt;
        &amp;lt;slot name=&amp;quot;main&amp;quot;&amp;gt;&amp;lt;/slot&amp;gt;
      &amp;lt;/main&amp;gt;
      &amp;lt;footer class=&amp;quot;text&amp;quot;&amp;gt;
        &amp;lt;slot name=&amp;quot;footer&amp;quot;&amp;gt;&amp;lt;/slot&amp;gt;
      &amp;lt;/footer&amp;gt;
    &amp;lt;/div&amp;gt;
  &amp;lt;/template&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>父组件编写</strong>：<code>&amp;lt;template&amp;gt;</code> 标签中添加 <code>v-slot:xxx</code> 或者 <code>#xxx</code> 属性的内容， # 代表插槽的缩写。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  // 父组件
  &amp;lt;template&amp;gt;
    &amp;lt;div class=&amp;quot;container&amp;quot;&amp;gt;
      &amp;lt;!-- 具名插槽使用 --&amp;gt;
      &amp;lt;child&amp;gt;
        &amp;lt;template v-slot:main&amp;gt;
          &amp;lt;a href=&amp;quot;https://www.zcygov.cn&amp;quot; target=&amp;quot;_blank&amp;quot;&amp;gt;导航&amp;lt;/a&amp;gt;
        &amp;lt;/template&amp;gt;
        &amp;lt;template #footer&amp;gt;页脚（具名插槽的缩写#）&amp;lt;/template&amp;gt;
        &amp;lt;template #footer&amp;gt;
          &amp;lt;!--  v-slot 重复定义同样的 name 后只会加载最后一个定义的插槽内容 --&amp;gt;
          v-slot只会添加在一个 template 上面
        &amp;lt;/template&amp;gt;
      &amp;lt;/child&amp;gt;
    &amp;lt;/div&amp;gt;
  &amp;lt;/template&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>渲染结果</strong></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/13/16e63f27fcfdff39~tplv-t2oaga2asx-image.image" alt=""></p><h4 id="◎-作用域插槽" tabindex="-1"><a class="header-anchor" href="#◎-作用域插槽" aria-hidden="true">#</a> <strong>◎ 作用域插槽</strong></h4><p><strong>子组件编写</strong>：有时让父组件能访问到子组件中的数据是很有用的，我们可以将绑定在 <code>&amp;lt;slot&amp;gt;</code> 元素上的特性称为<strong>插槽 Prop</strong> ，当然也可以传递一些 <code>Function</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  // 子组件
  &amp;lt;template&amp;gt;
    &amp;lt;div class=&amp;quot;content&amp;quot;&amp;gt;
      &amp;lt;!-- 作用域插槽 --&amp;gt;
      &amp;lt;footer class=&amp;quot;text&amp;quot;&amp;gt;
        &amp;lt;slot name=&amp;quot;footer&amp;quot; :user=&amp;quot;user&amp;quot; :testClick=&amp;quot;testClick&amp;quot;&amp;gt;
          {{user.name}}
        &amp;lt;/slot&amp;gt;
      &amp;lt;/footer&amp;gt;
    &amp;lt;/div&amp;gt;
  &amp;lt;/template&amp;gt;
  
  &amp;lt;script&amp;gt;
  export default {
    name: &amp;#39;child&amp;#39;,
    data () {
      return {
        user: {
          title: &amp;#39;测试title&amp;#39;,
          name: &amp;#39;测试name&amp;#39;
        }
      };
    },
    methods:{
      testClick(){
      	// 子组件通用方法，可传递给父组件复用
        alert(&amp;#39;123&amp;#39;);
      }
    }
  };
  &amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>父组件编写</strong>：被绑定的属性的集合对象，在父元素中会被 <code>v-slot:xxx=&amp;quot;slotProps&amp;quot;</code> 或者 <code>#xxx=&amp;quot;slotProps&amp;quot;</code> 接收，xxx 代表具名插槽的 <code>name</code> ，slotProps 为子组件传递的数据对象，可以重命名。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  // 父组件
  &amp;lt;template&amp;gt;
    &amp;lt;div class=&amp;quot;container&amp;quot;&amp;gt;
      &amp;lt;!-- 作用域插槽，以及解构插槽 Prop 的写法 --&amp;gt;
      &amp;lt;child&amp;gt;
        &amp;lt;template #footer=&amp;quot;slotProps&amp;quot;&amp;gt;
          {{slotProps.user.title}}
          &amp;lt;button @click=&amp;quot;slotProps.testClick&amp;quot;&amp;gt;点我&amp;lt;/button&amp;gt;
        &amp;lt;/template&amp;gt;
        &amp;lt;template #footer=&amp;quot;{user,testClick}&amp;quot;&amp;gt;
          {{user.title}}&amp;lt;br&amp;gt;
          此为解构插槽prop&amp;lt;br&amp;gt;
          &amp;lt;!-- 子组件中的通用方法，可传递给父组件复用 --&amp;gt;
          &amp;lt;button @click=&amp;quot;testClick&amp;quot;&amp;gt;点我&amp;lt;/button&amp;gt;
        &amp;lt;/template&amp;gt;
      &amp;lt;/child&amp;gt;
    &amp;lt;/div&amp;gt;
  &amp;lt;/template&amp;gt;

  &amp;lt;script&amp;gt;
  import Child from &amp;#39;./component/child.vue&amp;#39;;
  export default {
    name: &amp;#39;demo&amp;#39;,
    components: {
      Child
    },
  };
  &amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>渲染结果</strong></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/13/16e63f27fde9ecd3~tplv-t2oaga2asx-image.image" alt=""></p><h4 id="◎-其他拓展" tabindex="-1"><a class="header-anchor" href="#◎-其他拓展" aria-hidden="true">#</a> ◎ 其他拓展</h4><ul><li>解构插槽 prop 可以重命名，例如：<code>v-slot=&amp;quot;{ user: person }&amp;quot;</code> 将 user 对象重命名为 person 使用。</li><li>解构插槽 prop 可以赋值默认值，例如：<code>v-slot=&amp;quot;{ user = { name: &amp;#39;Guest&amp;#39; } }&amp;quot;</code> 给属性添加自定义后备内容。</li><li>动态插槽命名，例如：<code>v-slot:[dynamicSlotName]</code> ，支持命名变量定义。</li></ul><h4 id="◎-注意事项" tabindex="-1"><a class="header-anchor" href="#◎-注意事项" aria-hidden="true">#</a> ◎ 注意事项</h4><ul><li><p><code>v-slot</code> 只能用在 <code>template</code> 上面，或者是独占默认插槽的写法。</p></li><li><p>父组件引用时 ，重复定义了 <code>v-slot</code> 的 <code>name</code> 后只会加载最后一个定义的插槽内容。</p></li><li><p>当子组件只有默认插槽时，才可以使用独占默认插槽的缩写语法，只要出现多个插槽，必须使用完整的基于 <code>template</code> 的语法。</p></li></ul><h3 id="三-slot-以及-slot-scope-的用法" tabindex="-1"><a class="header-anchor" href="#三-slot-以及-slot-scope-的用法" aria-hidden="true">#</a> （三）slot 以及 slot-scope 的用法</h3><p>介绍完 v-slot 的基本用法，这里我们也顺带介绍一下之前的 <code>slot</code> 和 <code>slot-scope</code> 的用法以及区别。</p><h4 id="◎-子组件编写" tabindex="-1"><a class="header-anchor" href="#◎-子组件编写" aria-hidden="true">#</a> ◎ 子组件编写</h4><p>子组件的编写方式没什么区别，下面是一个集合</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  // 子组件
  &amp;lt;template&amp;gt;
    &amp;lt;div class=&amp;quot;content&amp;quot;&amp;gt;
      &amp;lt;!-- 默认插槽 --&amp;gt;
      &amp;lt;header class=&amp;quot;text&amp;quot;&amp;gt;
        &amp;lt;slot&amp;gt;默认值&amp;lt;/slot&amp;gt;
      &amp;lt;/header&amp;gt;
      
      &amp;lt;!-- 具名插槽 --&amp;gt;
      &amp;lt;main class=&amp;quot;text&amp;quot;&amp;gt;
        &amp;lt;slot name=&amp;quot;main&amp;quot;&amp;gt;&amp;lt;/slot&amp;gt;
      &amp;lt;/main&amp;gt;
      
      &amp;lt;!-- 作用域插槽 --&amp;gt;
      &amp;lt;footer class=&amp;quot;text&amp;quot;&amp;gt;
        &amp;lt;slot name=&amp;quot;footer&amp;quot; :user=&amp;quot;user&amp;quot; :testClick=&amp;quot;testClick&amp;quot;&amp;gt;
          {{user.name}}
        &amp;lt;/slot&amp;gt;
      &amp;lt;/footer&amp;gt;
    &amp;lt;/div&amp;gt;
  &amp;lt;/template&amp;gt;
  
  &amp;lt;script&amp;gt;
  export default {
    name: &amp;#39;child&amp;#39;,
    data () {
      return {
        user: {
          title: &amp;#39;测试title&amp;#39;,
          name: &amp;#39;测试name&amp;#39;
        }
      };
    }
  };
  &amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="◎-父组件编写" tabindex="-1"><a class="header-anchor" href="#◎-父组件编写" aria-hidden="true">#</a> ◎ 父组件编写</h4><ul><li><p>具名插槽：直接使用 <code>slot</code> 属性，传值为子组件插槽的 <code>name</code> 属性。</p><ul><li>作用域插槽：通过 <code>slot-scope</code> 属性来接受子组件传入的属性集合，其他用法一致。</li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  // 父组件
 &amp;lt;template&amp;gt;
   &amp;lt;div class=&amp;quot;container&amp;quot;&amp;gt;
     &amp;lt;child&amp;gt;
       &amp;lt;!-- 默认插槽 --&amp;gt;
       &amp;lt;div&amp;gt;默认插槽&amp;lt;/div&amp;gt; 
      
       &amp;lt;!-- 具名插槽 --&amp;gt;
       &amp;lt;div slot=&amp;quot;main&amp;quot;&amp;gt;具名插槽&amp;lt;/div&amp;gt;
       &amp;lt;div slot=&amp;quot;main&amp;quot;&amp;gt;具名插槽2&amp;lt;/div&amp;gt;
      
       &amp;lt;!-- 作用域插槽 --&amp;gt;
       &amp;lt;div slot=&amp;quot;footer&amp;quot; slot-scope=&amp;quot;slotProps&amp;quot;&amp;gt;
         {{slotProps.user.title}}
       &amp;lt;/div&amp;gt;
     &amp;lt;/child&amp;gt;
   &amp;lt;/div&amp;gt;
 &amp;lt;/template&amp;gt;

 &amp;lt;script&amp;gt;
 import Child from &amp;#39;./component/child.vue&amp;#39;;
 export default {
   name: &amp;#39;demo&amp;#39;,
   components: {
     Child
   },
 };
 &amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终渲染</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/6/16e409724d6d0ad2~tplv-t2oaga2asx-image.image" alt="渲染"></p><h4 id="◎-需要注意" tabindex="-1"><a class="header-anchor" href="#◎-需要注意" aria-hidden="true">#</a> ◎ 需要注意</h4><ul><li><p>不同于 <code>v-slot</code> 的是，<code>slot</code> 中同名可以重复定义多次。</p></li><li><p><code>slot</code> 可以直接定义在子组件上。</p></li><li><p>v3.0 版本后不可使用 <code>slot</code> ，建议直接使用 <code>v-slot</code> 。</p></li></ul><h3 id="四-总结" tabindex="-1"><a class="header-anchor" href="#四-总结" aria-hidden="true">#</a> （四）总结</h3><ul><li>插槽的 <code>&amp;lt;slot&amp;gt;</code> 的可复用特性，可以用来写一些组件结构固定，内容可替换的组件，例如表格，列表，按钮，弹窗等内容。</li><li>插槽可以传递属性值或者 <code>function</code> 的特性，可以在子组件中写一些通用的函数，例如通用的报错提示等，传递给父组件复用。</li></ul><h2 id="招贤纳士" tabindex="-1"><a class="header-anchor" href="#招贤纳士" aria-hidden="true">#</a> 招贤纳士</h2><p>政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。</p><p>如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 <code>ZooTeam@cai-inc.com</code></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,45),f={href:"https://juejin.cn/post/6844903988081475591",target:"_blank",rel:"noopener noreferrer"},_={href:"https://juejin.cn/post/6844903950508883982",target:"_blank",rel:"noopener noreferrer"},j={href:"https://juejin.cn/post/6844903933580673032",target:"_blank",rel:"noopener noreferrer"};function k(C,P){const t=d("ExternalLinkIcon");return s(),m("div",null,[o,r,c,e("p",null,[a("> 本文首发于政采云前端团队博客： "),e("a",v,[a("让你的组件千变万化，Vue slot 剖玄析微"),l(t)])]),u,e("p",null,[a("在 2.6.0 版本中，Vue 为具名插槽和作用域插槽引入了一个新的统一的语法 （即 "),g,a(" 指令）。它取代了 "),b,a(" 和 "),h,a(" 这两个目前已被废弃、尚未移除，仍在"),e("a",x,[a("文档中"),l(t)]),a("的特性。")]),q,e("p",null,[e("a",f,[a("可能是最全的 “文本溢出截断省略” 方案合集"),l(t)])]),e("p",null,[e("a",_,[a("前端工程实践之可视化搭建系统（一）"),l(t)])]),e("p",null,[e("a",j,[a("自动化 Web 性能优化分析方案"),l(t)])])])}const E=n(p,[["render",k],["__file","让你的组件千变万化，Vue slot 剖玄析微.html.vue"]]);export{E as default};
