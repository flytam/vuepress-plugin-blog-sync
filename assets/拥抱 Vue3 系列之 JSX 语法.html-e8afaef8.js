import{_ as t,z as l,A as d,Y as e,C as n,U as a,a6 as s,Q as r}from"./framework-cb9358d9.js";const u={},o=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/24/1737e6038b00329e~tplv-t2oaga2asx-image.image",alt:""})],-1),c={href:"https://www.zoo.team/article/vue3-jsx",target:"_blank",rel:"noopener noreferrer"},v=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/5/1731f374e2a98892~tplv-t2oaga2asx-image.image",alt:""})],-1),m=e("p",null,"“别再更新了，学不动了”。这句话不知道出了多少开发者的辛酸。",-1),p={href:"https://github.com/vuejs/rfcs/issues/183",target:"_blank",rel:"noopener noreferrer"},b=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if (isTrue(&amp;quot;I am planning to use Vue 3 for a new project&amp;quot;)) {
  if (isTrue(&amp;quot;I need IE11 support&amp;quot;)) {
    await IE11CompatBuild() // July 2020
  }
  if (isTrue(&amp;quot;RFCs are too dense, I need an easy-to-read guide&amp;quot;)) {
    await migrationGuide() // July 2020
  }
  if (isTrue(&amp;quot;I&amp;#39;d rather wait until it&amp;#39;s really ready&amp;quot;) {
      await finalRelease() // Targeting early August 2020
  })
  run(\`npm init vite-app hello-vue3\`)
  return
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到，如果一切顺利的话，预计在 8 月份，Vue 3 的正式版本就可以和我们见面了，目前距离发布正式版还有一定的差距，还要做一些兼容性的工作。同时还会提供对 IE11 的支持。</p><p>Vue 3 为了达到更快、更小、更易于维护、更贴近原生、对开发者更友好的目的，在很多方面进行了重构：</p><ul><li>全面拥抱 TypeScript</li><li>重构 complier</li><li>重构 Virtual DOM</li><li>......</li></ul><h3 id="写在前面" tabindex="-1"><a class="header-anchor" href="#写在前面" aria-hidden="true">#</a> 写在前面</h3><p>这是该系列文章的第一篇，后续会持续更新，覆盖 Vue 3生态常用库。</p><p>JSX 是一个小众群体使用开发方式，第一篇以 JSX 为切入点，目标是让大多数开发 Vue 的同学也对 JSX 有一定的认知，在用 Vue 开发复杂应用时，也能有更加灵活的方式。</p><p>比如当开始写一个只能通过 <code>level</code> prop 动态生成标题 (heading) 的组件时，你可能很快想到这样实现：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;script type=&amp;quot;text/x-template&amp;quot; id=&amp;quot;anchored-heading-template&amp;quot;&amp;gt;
  &amp;lt;h1 v-if=&amp;quot;level === 1&amp;quot;&amp;gt;
    &amp;lt;slot&amp;gt;&amp;lt;/slot&amp;gt;
  &amp;lt;/h1&amp;gt;
  &amp;lt;h2 v-else-if=&amp;quot;level === 2&amp;quot;&amp;gt;
    &amp;lt;slot&amp;gt;&amp;lt;/slot&amp;gt;
  &amp;lt;/h2&amp;gt;
  &amp;lt;h3 v-else-if=&amp;quot;level === 3&amp;quot;&amp;gt;
    &amp;lt;slot&amp;gt;&amp;lt;/slot&amp;gt;
  &amp;lt;/h3&amp;gt;
&amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里用模板并不是最好的选择，在每一个级别的标题中重复书写了 <code>&amp;lt;slot&amp;gt;&amp;lt;/slot&amp;gt;</code>，不够优雅。</p><p>如果尝试用 JSX 来写，代码就会变得简单很多。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const App = {
  render() {
    const tag = \`h\${this.level}\`
    return &amp;lt;tag&amp;gt;{this.$slots.default}&amp;lt;/tag&amp;gt;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),h={href:"https://github.com/vueComponent/ant-design-vue",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/vueComponent/jsx",target:"_blank",rel:"noopener noreferrer"},_=s(`<h3 id="vue-jsx-简介" tabindex="-1"><a class="header-anchor" href="#vue-jsx-简介" aria-hidden="true">#</a> Vue JSX 简介</h3><p>对于使用 React 的开发者来说，JSX 再熟悉不过了，但是如果你是一个 Vue 的重度用户，可能对 JSX 不是特别熟悉，甚至听到有同学说没有 template 的 Vue 项目没有灵魂。</p><p>先来看下面一段代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const el = &amp;lt;div&amp;gt;Vue 3&amp;lt;/div&amp;gt;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这段代码既不是 HTML 也不是字符串，被称之为 JSX，是 JavaScript 的扩展语法。JSX 可能会使人联想到模板语法，但是它具备 Javascript 的完全编程能力。</p><p>看到这里可能会有疑问，不少同学可能会以为 JSX 是 React 中特有的，其实不然。</p><p>大多数同学都知道，我们平常在 .vue 文件中开发的代码，实际上会被 vue-loader 处理，但可能少数同学去看过我们手把手写出的代码，会变编译成啥样。</p>`,7),x={href:"https://vue-template-explorer.netlify.app/",target:"_blank",rel:"noopener noreferrer"},f=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;div id=&amp;quot;app&amp;quot;&amp;gt;{{ msg }}&amp;lt;/div&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function render() {
  with(this) {
    return _c(&amp;#39;div&amp;#39;, {
      attrs: {
        &amp;quot;id&amp;quot;: &amp;quot;app&amp;quot;
      }
    }, [_v(_s(msg))])
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>观察上述代码我们发现，到运行阶段实际上都是 render 函数在执行。Vue 推荐在绝大多数情况下使用 template 来创建你的 HTML。然而在一些场景中，就需要使用 render 函数，它比 template 更加灵活。</p>`,3),V={href:"https://link.zhihu.com/?target=https%3A//github.com/vuejs/babel-plugin-transform-vue-jsx",target:"_blank",rel:"noopener noreferrer"},q=s(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/5/1731f31eb2a0f312~tplv-t2oaga2asx-image.image" alt=""></p><p>使用过 React 的同学对于如何写 JSX 语法一定非常熟悉了，然而，Vue 2 中 的 JSX 写法和 React 还是有一些略微的区别。React 中所有传递的数据都挂在顶层。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const App = &amp;lt;A className=&amp;quot;x&amp;quot; style={style} onChange={onChange} /&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,3),S=e("code",null,"props",-1),j=e("code",null,"attrs",-1),J=e("code",null,"domProps",-1),k={href:"https://zhuanlan.zhihu.com/p/37920151",target:"_blank",rel:"noopener noreferrer"},X=s(`<h3 id="vue-3-中对-jsx-带来的改变" tabindex="-1"><a class="header-anchor" href="#vue-3-中对-jsx-带来的改变" aria-hidden="true">#</a> Vue 3 中对 JSX 带来的改变</h3><ul><li>属性传递</li></ul><p>Vue 3 中，属性这块的传递和 React 类似，意味这不需要再传递 props，attrs 这些属性。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// before
{
  class: [&amp;#39;foo&amp;#39;, &amp;#39;bar&amp;#39;],
  style: { color: &amp;#39;red&amp;#39; },
  attrs: { id: &amp;#39;foo&amp;#39; },
  domProps: { innerHTML: &amp;#39;&amp;#39; },
  on: { click: foo },
  key: &amp;#39;foo&amp;#39;
}

// after
{
  class: [&amp;#39;foo&amp;#39;, &amp;#39;bar&amp;#39;],
  style: { color: &amp;#39;red&amp;#39; },
  id: &amp;#39;foo&amp;#39;,
  innerHTML: &amp;#39;&amp;#39;,
  onClick: foo,
  key: &amp;#39;foo&amp;#39;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>指令改版</li></ul><p>Vue 3 把大多数全局 API 和 内部 helper 移到了 ES 模块中导出(譬如 v-model、transition、teleport)，从而使得 Vue 3 在增加了很多新特性之后，基线的体积反而小了。</p><p><code>v-model</code>、<code>v-show</code> 这些 API 全部通过模块导出的方式来引入</p><p>&gt; 基线体积： 无法舍弃的代码体积</p><p>我们来看一段非常简单的代码 <code>&amp;lt;input v-model=&amp;quot;x&amp;quot; /&amp;gt;</code>，在 Vue 2 和 Vue 3 中的编译结果有何不同。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// before
function render() {
  with(this) {
    return _c(&amp;#39;input&amp;#39;, {
      directives: [{
        name: &amp;quot;model&amp;quot;,
        rawName: &amp;quot;v-model&amp;quot;,
        value: (x),
        expression: &amp;quot;x&amp;quot;
      }],
      domProps: {
        &amp;quot;value&amp;quot;: (x)
      },
      on: {
        &amp;quot;input&amp;quot;: function ($event) {
          if ($event.target.composing) return;
          x = $event.target.value
        }
      }
    })
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// after
import { vModelText as _vModelText, createVNode as _createVNode, withDirectives as _withDirectives, openBlock as _openBlock, createBlock as _createBlock } from &amp;quot;vue&amp;quot;

export function render(_ctx, _cache) {
  return _withDirectives((_openBlock(), _createBlock(&amp;quot;input&amp;quot;, {
    &amp;quot;onUpdate:modelValue&amp;quot;: $event =&amp;gt; (_ctx.x = $event)
  }, null, 8 /* PROPS */, [&amp;quot;onUpdate:modelValue&amp;quot;])), [
    [_vModelText, _ctx.x]
  ])
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到在 Vue 3 中，对各个 API 做了更加细致的拆分，理想状态下，用户可以在构建时利用摇树优化 (tree-shaking) 去掉框架中不需要的特性，只保留自己用到的特性。</p><p>模版编译器会生成适合做 tree-shaking 的代码，不需要使用者去关心如何去做，这部分的改动同样需要在 JSX 写法中实现。</p><p>模板编译器中增加了 <code>PatchFlag</code>，在 JSX 的编译过程同样也做了处理，性能会有提升，但是考虑到 JSX 的灵活性，做了一些兼容处理，该功能还在测试阶段。</p><h3 id="从-vue-2-到-vue-3-的过渡" tabindex="-1"><a class="header-anchor" href="#从-vue-2-到-vue-3-的过渡" aria-hidden="true">#</a> 从 Vue 2 到 Vue 3 的过渡</h3><p>Vue 3 虽然引入了一部分破坏性的更新，但对于绝大多数 Vue 2 的 API 还是兼容的。那么同样的，我们也要尽可能让使用 JSX 的用户通过最小的成本升级到 Vue 3，这是一个核心的目标。</p>`,16),A={href:"https://github.com/vueComponent/ant-design-vue",target:"_blank",rel:"noopener noreferrer"},P=e("strong",null,"东半球",-1),y=s(`<h4 id="vue-3-jsx-的-api-设计" tabindex="-1"><a class="header-anchor" href="#vue-3-jsx-的-api-设计" aria-hidden="true">#</a> Vue 3 JSX 的 API 设计</h4><ul><li>函数式组件</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const App = () =&amp;gt; &amp;lt;div&amp;gt;Vue 3 JSX&amp;lt;/div&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>普通组件</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const App = {
  render() {
    return &amp;lt;div&amp;gt;Vue 3.0&amp;lt;/div&amp;gt;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const App = defineComponent(() =&amp;gt; {
  const count = ref(0);

  const inc = () =&amp;gt; {
    count.value++;
  };

  return () =&amp;gt; (
    &amp;lt;div onClick={inc}&amp;gt;
      {count.value}
    &amp;lt;/div&amp;gt;
  )
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Fragment</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const App = () =&amp;gt; (
  &amp;lt;&amp;gt;
    &amp;lt;span&amp;gt;I&amp;#39;m&amp;lt;/span&amp;gt;
    &amp;lt;span&amp;gt;Fragment&amp;lt;/span&amp;gt;
  &amp;lt;/&amp;gt;
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Fragment 参考 React 的写法，尽可能写起来更加方便。</p><ul><li>Attributes/Props</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const App = () =&amp;gt; &amp;lt;input type=&amp;quot;email&amp;quot; /&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const placeholderText = &amp;#39;email&amp;#39;
const App = () =&amp;gt; (
  &amp;lt;input
    type=&amp;quot;email&amp;quot;
    placeholder={placeholderText}
  /&amp;gt;
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>指令</li></ul><p>&gt; 建议在 JSX 中使用驼峰 (<code>vModel</code>)，但是 <code>v-model</code> 也能用</p><p>v-show</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const App = {
  data() {
    return { visible: true };
  },
  render() {
    return &amp;lt;input vShow={this.visible} /&amp;gt;;
  },
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>v-model</p><p>&gt; 修饰符：使用 (<code>_</code>) 代替 (<code>.</code>) (<code>vModel_trim={this.test}</code>)</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export default {
 data: () =&amp;gt; ({
   test: &amp;#39;Hello World&amp;#39;,
 }),
 render() {
   return (
     &amp;lt;&amp;gt;
       &amp;lt;input type=&amp;quot;text&amp;quot; vModel_trim={this.test} /&amp;gt;
       {this.test}
     &amp;lt;/&amp;gt;
   )
 },
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>自定义指令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const App = {
  directives: { antRef },
  setup() {
    return () =&amp;gt; (
      &amp;lt;a
        vAntRef={(ref) =&amp;gt; { this.ref = ref; }}
      /&amp;gt;
    );
  },
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>插槽</li></ul>`,22),I={href:"https://github.com/vuejs/jsx/issues/141",target:"_blank",rel:"noopener noreferrer"},C=s(`<h4 id="vue-2-的-jsx-写法如何快速迁移到-vue-3" tabindex="-1"><a class="header-anchor" href="#vue-2-的-jsx-写法如何快速迁移到-vue-3" aria-hidden="true">#</a> Vue 2 的 JSX 写法如何快速迁移到 Vue 3</h4><p>由于 antdv 的底层基本上都是基于 JSX 来写的，想要快速迁移到 Vue 3，就必须有一个比较好的插件来支持，这也是为什么会有这个插件的原因。当然在实现过程中也踩了很多坑。</p><p>目前用法和 Vue 2 的语法大多数是一致的，为了帮助更快迁移，在插件中做了针对旧 VNode 格式的兼容层，这里只能兼容一部分写法，以及部分语法的兼容会增加运行时的性能开销，所以我们希望能够将我们的经验分享给大家，让大家少走弯路！</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &amp;quot;plugins&amp;quot;: [&amp;quot;@ant-design-vue/babel-plugin-jsx&amp;quot;, { &amp;quot;transformOn&amp;quot;: true, &amp;quot;compatibleProps&amp;quot;: true }]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>transformOn</li></ul><p>针对 Vue 2 中 <code>on: { click: xx }</code> 写法的兼容，在运行时中会转为 <code>onClick: xxx</code>。</p><ul><li>compatibleProps</li></ul><p>上文提到 Vue 3 对属性的传递做了变更，<code>props</code>、<code>attrs</code> 这些都不存在了，因此如果设置了这个属性为 <code>true</code>，在运行时也会被解构到第一层的属性中。</p><p>需要注意的一点，目前一旦开启这两个属性，在 <code>createVNode</code> 的第二个参数，都会包一个 <code>compatibleProps</code> 和 <code>transformOn</code> 方法，所以酌情开启这两个参数。对于使用 Vue 2 的 JSX 同学，如果没有使用到比较”不为人知“ 的 API的情况下，都可以快速得迁移。</p>`,9),R=e("code",null,"compatibleProps",-1),T={href:"https://github.com/vueComponent/ant-design-vue/issues/1913",target:"_blank",rel:"noopener noreferrer"},w=s(`<p>对于 props 的迁移工作比较简单，只需要把原有分散在 <code>props</code>、<code>on</code>、<code>attrs</code> 中的值直接铺开即可。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> const vcUploadProps = {
-  props: {
-    ...this.$props,
-   prefixCls,
-    beforeUpload: this.reBeforeUpload,
-  },
-  on: {
-    start: this.onStart,
-    error: this.onError,
-    progress: this.onProgress,
-    success: this.onSuccess,
-    reject: this.onReject,
- },
+  ...this.$props,
+  prefixCls,
+  beforeUpload: this.reBeforeUpload,
+  onStart: this.onStart,
+  onError: this.onError,
+  onProgress: this.onProgress,
+  onSuccess: this.onSuccess,
+  onReject: this.onReject,
+  ref: &amp;#39;uploadRef&amp;#39;,
+  attrs: this.$attrs,
+  ...this.$attrs,
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),B=e("code",null,"inheritAttrs",-1),M={href:"https://cn.vuejs.org/v2/api/index.html#inheritAttrs",target:"_blank",rel:"noopener noreferrer"},$=e("strong",null,"不影响",-1),E=e("code",null,"class",-1),N=e("code",null,"style",-1),D=e("p",null,[n("在事件的处理上，我们建议在 props 中声明，这样对后续的开发更加易维护，可以很直观地从 props 看出我这个组件到底会传递哪些事件。值得一提的是，在 props 中声明的事件，也可以通过 "),e("code",null,"emit"),n(" 来触发。例如声明了 "),e("code",null,"onClick"),n(" 事件，仍然可以使用 "),e("code",null,"emit(&#39;click&#39;)"),n("。")],-1),U={href:"https://composition-api.vuejs.org/api.html#dependency-injection",target:"_blank",rel:"noopener noreferrer"},L=e("code",null,"this",-1),O=e("h3",{id:"总结",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#总结","aria-hidden":"true"},"#"),n(" 总结")],-1),z=e("p",null,"如今有超过百万的开发人员使用 Vue，还有超百万的 React 开发者正在去使用 Vue 的路上。",-1),F=e("p",null,"虽然说Vue 中 JSX 的开发方式是一个少数群里，但是 antdv 的使用用户也不是少数。为了让这部分用户可以快速体验到兼容 Vue 3 版本的组件库，因此在设计这个插件的时候，第一原则就是要最小的迁移和认知成本。",-1),H=e("p",null,"对于常年使用 template 的开发者来说，JSX 又何尝不是一片新的天空呢？开发者要与使用者共情，站在使用者的角度出发，设计出的工具大概率可能满足其需求。",-1),G=e("p",null,"距离 JSX 发布正式版本，还有一部分路要走。",-1),Z={href:"https://github.com/sodatea",target:"_blank",rel:"noopener noreferrer"},Q=e("p",null,"文中出现的仓库地址：",-1),W=e("ul",null,[e("li",null,"Ant Design Vue <https://github.com/vueComponent/ant-design-vue>"),e("li",null,"@ant-design-vue/babel-plugin-jsx <https://github.com/vueComponent/jsx>")],-1),Y=e("h3",{id:"后续",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#后续","aria-hidden":"true"},"#"),n(" 后续")],-1),K=e("p",null,"拥抱 Vue 3 系列之如何开发设计一个 Vue 3 JSX 插件",-1),ee=e("h2",{id:"推荐阅读",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#推荐阅读","aria-hidden":"true"},"#"),n(" 推荐阅读")],-1),ne={href:"https://juejin.im/editor/posts/5eef64de518825658c1ad1f6",target:"_blank",rel:"noopener noreferrer"},ie={href:"https://juejin.cn/post/6844904182822993927",target:"_blank",rel:"noopener noreferrer"},ae=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),n(" 招贤纳士")],-1),se=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),te=e("p",null,[n("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),le=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/24/1737e6194e9c083d~tplv-t2oaga2asx-image.image",alt:""})],-1);function de(re,ue){const i=r("ExternalLinkIcon");return l(),d("div",null,[o,e("p",null,[n("> 这是第 59 篇不掺水的原创，想获取更多原创好文，请扫 👆 上方二维码关注我们吧~ 本文首发于政采云前端团队博客："),e("a",c,[n("拥抱 Vue 3 系列之 JSX 语法"),a(i)])]),v,m,e("p",null,[n("在过去的一年中，Vue 团队一直都在开发 Vue.js 的下一个主要版本，就在 6 月底，尤大更新同步了 Vue 3 及其周边生态的状态("),e("a",p,[n("Vue 3: mid 2020 status update"),a(i)]),n(")。")]),b,e("p",null,[n("看过 "),e("a",h,[n("Ant Design Vue"),a(i)]),n(" 源码 (下面简称为 antdv) 的同学应该知道， antdv 的底层是基于 JSX 来实现的，也是 Vue 生态中使用 JSX 的深度用户。")]),e("p",null,[n("antd 为了尽快的兼容 Vue 3，和 Vue 官方展开合作，于是有了 "),e("a",g,[n("@ant-design-vue/babel-plugin-jsx"),a(i)]),n("。")]),_,e("p",null,[n("有兴趣的同学可以戳这个地址来看下。"),e("a",x,[n("vue-template-explorer"),a(i)]),n(" (因为众所周知的原因，可能访问略慢)")]),f,e("p",null,[n("写过 render 函数的同学可能深有体会，书写复杂的 render 函数异常痛苦，而且难以维护，非常容易被称之为 “祖传代码”。好在2.0 的官方提供了一个 "),e("a",V,[n("Babel 插件"),a(i)]),n("，可以将更接近于模板语法的 JSX 转译成 JavaScript。")]),q,e("p",null,[n("Vue 2 中，仅仅属性就有三种：组件属性 "),S,n("，普通 html 属性"),j,n("，DOM 属性 "),J,n("。想要更多了解如何在 Vue 2 中写 JSX 语法，可以看这篇，"),e("a",k,[n("在 Vue 中使用 JSX 的正确姿势"),a(i)]),n("。")]),X,e("p",null,[n("写这篇文章的时候，antdv 已经使用 "),e("a",A,[n("@ant-design-vue/babel-plugin-jsx"),a(i)]),n(" 重构了大约 70% 的功能，预计会在 Vue 3 正式版之前发布测试版，大概率会是"),P,n("最快兼容 Vue 3 的企业级组件库。")]),y,e("p",null,[n("关于指令、插槽最终的 API 还在讨论中，有想法的可以去留言。"),e("a",I,[n("Vue 3 JSX Design"),a(i)])]),C,e("p",null,[n("那么 antdv 又是如何做迁移的呢？考虑到 antdv 是个组件库，都包一层 "),R,n(" 势必不太优雅，因此没有选择开启这个两个开关。这里插一句，目前 antdv 的迁移还在进行中，相关的进度都在这个 issue 里面（"),e("a",T,[n("Vue 3 支持"),a(i)]),n("），有兴趣的同学可以关注下，提一些 PR 过去。")]),w,e("p",null,[n("但是关于 "),B,n(" 有个较为底层的变动，需要开发者根据实际情况去修改。"),e("a",M,[n("什么是inheritAttrs？"),a(i)]),n(" 在 Vue 2 中，这个选项"),$,n(),E,n(" 和 "),N,n(" 绑定，但是在 Vue 3 中会影响到。因此可能在属性的传递上，需要额外对这两个参数做处理。")]),D,e("p",null,[n("Vue 3 对 context 的 API 也做了改动，一般如果不是复杂的组件，不会涉及到这个 API。这部分的改动可以看原先 Vue Compositon API 的相关文档，"),e("a",U,[n("Dependency Injection"),a(i)]),n("，注意一点，在 setup 中取不到 "),L,n("。")]),O,z,F,H,G,e("p",null,[n("最后要感谢 Vue.js 官方团队和 "),e("a",Z,[n("@sodatea"),a(i)]),n(" 大佬的信任。")]),Q,W,Y,K,ee,e("p",null,[e("a",ne,[n("分分钟教会你搭建企业级的 npm 私有仓库"),a(i)])]),e("p",null,[e("a",ie,[n("一份值得收藏的 Git 异常处理清单"),a(i)])]),ae,se,te,le])}const ce=t(u,[["render",de],["__file","拥抱 Vue3 系列之 JSX 语法.html.vue"]]);export{ce as default};
