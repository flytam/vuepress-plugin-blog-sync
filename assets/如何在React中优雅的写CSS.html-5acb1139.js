import{_ as a,z as d,A as t,Y as e,C as i,U as s,a6 as l,Q as r}from"./framework-cb9358d9.js";const c={},v=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8d2b0103c1fa~tplv-t2oaga2asx-image.image",alt:""})],-1),m=e("h2",{id:"",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#","aria-hidden":"true"},"#"),i(" **")],-1),u=e("p",null,'<table><tbody><tr><td bgcolor="#FDFFE7"><font size="4">原创不易，希望能关注下我们，再顺手点个赞~~<font></font></font></td></tr></tbody></table> **',-1),o={href:"https://www.zoo.team/article/react-css",target:"_blank",rel:"noopener noreferrer"},p=l(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/22/16f2d89a13d8e188~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="引言" tabindex="-1"><a class="header-anchor" href="#引言" aria-hidden="true">#</a> 引言</h2><p>问题：<strong>CSS 文件分离 != CSS 作用域隔离</strong></p><p>看下这样的目录结构：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>├── src                                  
│   ├──......                            # 公共组件目录
│   ├── components                       # 组件
│   │   └──comA                          # 组件A
│   │       ├──comA.js                     
│   │       ├──comA.css                      
│   │       └── index.js                  
│   │   └──comB                          # 组件B
│   │       ├──comB.js                     
│   │       ├──comB.css                      
│   │       └── index.js                  
│   ├── routes                           # 页面模块                  
│   │   └── modulesA                     # 模块A
│   │       ├──pageA.js                  # pageA JS 代码
│   │       ├──pageA.css                 # pageA CSS 代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看目录结构清晰明了，由于“ CSS 文件分离 != CSS 作用域隔离”这样的机制，如果我们不通过一些工具或规范来解决 CSS 的作用域污染问题，会产生非预期的页面样式渲染结果。</p><p>假设我们在组件 A 和组件 B import 引入 comA.css 和 comB.css。</p><p>comA.css:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.title {
    color: red;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>comB.css</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.title {
    font-size: 14px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后打包出来的结果为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.title {
    color: red;
}
.title {
    font-size: 14px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们希望，comA.css 两者互不影响，可以发现，虽然 A、B 两个组件分别只引用了自己的 CSS 文件，但是 CSS 并没有隔离，两个 CSS 文件是相互影响的！</p><p>随着 SPA 的流行，JS 可以组件化，按需加载（路由按需加载、组件的 CSS 和 JS 都按需加载），这种情况下 CSS 作用域污染的问题被放大， CSS 被按需加载后由于 CSS 全局污染的问题，在加载出其他一部分代码后，可能导致现有的页面上会出现诡异的样式变动。这样的问题加大了发布的风险以及 debugger 的成本。</p><p>小编我从写 Vue 到写 React ， Vue 的 scoped 完美的解决了 CSS 的作用域问题，那么 React 如何解决 CSS 的作用域问题呢？</p><p>解决 React 的 CSS 作用域污染方案：</p><ul><li>方案一：namespaces</li><li>方案二：CSS in JS</li><li>方案三：CSS Modules</li></ul><h2 id="方案一-namespaces" tabindex="-1"><a class="header-anchor" href="#方案一-namespaces" aria-hidden="true">#</a> 方案一：namespaces</h2><p>&gt; 利用约定好的命名来隔离 CSS 的作用域</p><p>comA.css:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.comA .title {
    color: red;
}
.comA .……{
    ……
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>comB.css</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.comB .title {
    font-size: 14px;
}
.comB .……{
    ……
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>嗯，用 CSS 写命名空间写起来貌似有点累。</p><p>没事我们有 CSS 预处理器，利用 less、sass、stylus 等预处理器，代码依然简洁。</p><p>A.less:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.comA {
    .title {
        color: red;
    }
    
    .…… {
        ……
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>B.less</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.comB {
    .title {
        font-size: 14px;
    }
    
    .…… {
        ……
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>貌似很完美解决了 CSS 的作用域问题，但是问题来了，假设 AB 组件是嵌套组件。</p><p>那么最后的渲染 DOM 结构为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;div class=&amp;quot;comA&amp;quot;&amp;gt;
    &amp;lt;h1 class=&amp;quot;title&amp;quot;&amp;gt;组件A的title&amp;lt;/h1&amp;gt;
    &amp;lt;div class=&amp;quot;comB&amp;quot;&amp;gt;
        &amp;lt;h1 class=&amp;quot;title&amp;quot;&amp;gt;组件组件的title&amp;lt;/h1&amp;gt;
    &amp;lt;/div&amp;gt;
&amp;lt;/div&amp;gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>comA 的样式又成功作用在了组件 B 上。</p><p>没关系，还有解，所有的 class 名以命名空间为前缀。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;div class=&amp;quot;comA&amp;quot;&amp;gt;
    &amp;lt;h1 class=&amp;quot;comA__title&amp;quot;&amp;gt;组件A的title&amp;lt;/h1&amp;gt;
    &amp;lt;div class=&amp;quot;comB&amp;quot;&amp;gt;
        &amp;lt;h1 class=&amp;quot;comB__title&amp;quot;&amp;gt;组件组件的title&amp;lt;/h1&amp;gt;
    &amp;lt;/div&amp;gt;
&amp;lt;/div&amp;gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>A.less:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.comA {
    &amp;amp;__title {
        color: red;
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>B.less:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.comB {
    &amp;amp;__title {
        font-size: 14px;
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,40),b={href:"http://getbem.com/introduction/",target:"_blank",rel:"noopener noreferrer"},g={href:"http://getbem.com/introduction/",target:"_blank",rel:"noopener noreferrer"},h=e("h2",{id:"方案二-css-in-js",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#方案二-css-in-js","aria-hidden":"true"},"#"),i(" 方案二：CSS in JS")],-1),x=e("p",null,"> 使用 JS 语言写 CSS，也是 React 官方有推荐的一种方式。",-1),S=e("p",null,"从React文档进入",-1),_=e("p",null,"<https://github.com/MicheleBertoli/css-in-js> ，可以发现目前的 CSS in JS 的第三方库有60余种。",-1),f=e("p",null,"看两个比较大众的库：",-1),C=e("ul",null,[e("li",null,"reactCSS"),e("li",null,"styled-components")],-1),A={id:"reactcss",tabindex:"-1"},q=e("a",{class:"header-anchor",href:"#reactcss","aria-hidden":"true"},"#",-1),y={href:"http://reactcss.com/",target:"_blank",rel:"noopener noreferrer"},B=l(`<p>&gt; 支持 React、Redux、React Native、autoprefixed、Hover、伪元素和媒体查询</p><p>看下官网文档 ：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const styles = reactCSS({
  &amp;#39;default&amp;#39;: {
    card: {
      background: &amp;#39;#fff&amp;#39;,
      boxShadow: &amp;#39;0 2px 4px rgba(0,0,0,.15)&amp;#39;,
    },
  },
  &amp;#39;zIndex-2&amp;#39;: {
    card: {
      boxShadow: &amp;#39;0 4px 8px rgba(0,0,0,.15)&amp;#39;,
    },
  },
}, {
  &amp;#39;zIndex-2&amp;#39;: props.zIndex === 2,
})

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class Component extends React.Component {
  render() {
    const styles = reactCSS({
      &amp;#39;default&amp;#39;: {
        card: {
          background: &amp;#39;#fff&amp;#39;,
          boxShadow: &amp;#39;0 2px 4px rgba(0,0,0,.15)&amp;#39;,
        },
        title: {
          fontSize: &amp;#39;2.8rem&amp;#39;,
          color: this.props.color,
        },
      },
    })
    return (
      &amp;lt;div style={ styles.card }&amp;gt;
        &amp;lt;div style={ styles.title }&amp;gt;
          { this.props.title }
        &amp;lt;/div&amp;gt;
        { this.props.children }
      &amp;lt;/div&amp;gt;
    )
  }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出，CSS 都转化成了 JS 的写法，虽然没有学习成本，但是这种转变还是有一丝不适。</p>`,5),k={id:"styled-components",tabindex:"-1"},j=e("a",{class:"header-anchor",href:"#styled-components","aria-hidden":"true"},"#",-1),w={href:"https://www.styled-components.com/",target:"_blank",rel:"noopener noreferrer"},z=l(`<p>&gt; styled-components，目前社区里最受欢迎的一款 CSS in JS 方案</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const Button = styled.a\`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;
  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  \${props =&amp;gt; props.primary &amp;amp;&amp;amp; css\`
    background: white;
    color: palevioletred;
  \`}
\`
render(
  &amp;lt;div&amp;gt;
    &amp;lt;Button
      href=&amp;quot;https://github.com/styled-components/styled-components&amp;quot;
      target=&amp;quot;_blank&amp;quot;
      rel=&amp;quot;noopener&amp;quot;
      primary
    &amp;gt;
      GitHub
    &amp;lt;/Button&amp;gt;
    &amp;lt;Button as={Link} href=&amp;quot;/docs&amp;quot; prefetch&amp;gt;
      Documentation
    &amp;lt;/Button&amp;gt;
  &amp;lt;/div&amp;gt;
)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与 reactCSS 不同，styled-components 使用了模板字符串，写法更接近 CSS 的写法。</p><h2 id="方案三-css-modules" tabindex="-1"><a class="header-anchor" href="#方案三-css-modules" aria-hidden="true">#</a> 方案三：CSS Modules</h2><p>&gt; 利用 webpack 等构建工具使 class 作用域为局部。</p><p>CSS 依然是还是 CSS</p><p>例如 webpack ，配置 css-loader 的 options modules: true。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>module.exports = {
  module: {
    rules: [
      {
        test: /\\.css$/,
        loader: &amp;#39;css-loader&amp;#39;,
        options: {
          modules: true,
        },
      },
    ],
  },
};

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>modules 更具体的配置项参考：&lt;https://www.npmjs.com/package/css-loader&gt;</p><p>loader 会用唯一的标识符(identifier)来替换局部选择器。所选择的唯一标识符以模块形式暴露出去。</p><p>示例：</p><p>webpack css-loader options</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>options: {
  ...,
  modules: {
    mode: &amp;#39;local&amp;#39;,
    // 样式名规则配置
    localIdentName: &amp;#39;[name]__[local]--[hash:base64:5]&amp;#39;,
  },
},
...

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>App.js</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>...
import styles from &amp;quot;./App.css&amp;quot;;
...
&amp;lt;div&amp;gt;
  &amp;lt;header className={styles[&amp;quot;header__wrapper&amp;quot;]}&amp;gt;
    &amp;lt;h1 className={styles[&amp;quot;title&amp;quot;]}&amp;gt;标题&amp;lt;/h1&amp;gt;
    &amp;lt;div className={styles[&amp;quot;sub-title&amp;quot;]}&amp;gt;描述&amp;lt;/div&amp;gt;
  &amp;lt;/header&amp;gt;
&amp;lt;/div&amp;gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>App.css</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.header__wrapper {
  text-align: center;
}

.title {
  color: gray;
  font-size: 34px;
  font-weight: bold;
}

.sub-title {
  color: green;
  font-size: 16px;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后端的 CSS，classname 增加了 hash 值。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.App__header__wrapper--TW7BP {
  text-align: center;
}

.App__title--2qYnk {
  color: gray;
  font-size: 34px;
  font-weight: bold;
}

.App__sub-title--3k88A {
  color: green;
  font-size: 16px;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>（1）如果是 ui 组件库中使用</p><p>&gt; 建议使用 namespaces 方案</p><p>原因：</p><ul><li>ui 组件库维护人员基本固定，遵守约定的规范较为容易，可通过约定规范来解决不同组件 CSS 相互影响问题</li><li>由于 ui 组件库会应用于整个公司的产品，在真正的业务场景中，虽然不建议，但是可能无法避免需要覆盖组件样式的特殊场景，如使用其他两种方式，不能支持组件样式覆盖</li></ul><p>（2）如果是业务代码/业务组件中使用</p><p>&gt; CSS in JS / CSS Modules</p><p>业务代码维护人员较多且不固定、代码水平不一致，只通过规范来约束不靠谱，无法保证开发人员严格遵守规范，不能根治 CSS 交叉影响问题，但是从 debug 角度考虑，建议组件外层都添加一个 namespaces 方面定位组件。然后加之 CSS in JS 或 CSS Modules 方案来解决 CSS 交叉影响问题。</p><h3 id="css-in-js-和-css-modules-谁优谁胜" tabindex="-1"><a class="header-anchor" href="#css-in-js-和-css-modules-谁优谁胜" aria-hidden="true">#</a> CSS in JS 和 CSS Modules 谁优谁胜？</h3><p>CSS Modules 会比 CSS in JS 的侵入性更小，CSS in JS 可以和 JS 共享变量，但个人更喜欢 CSS Modules ，但是谁优谁胜无法武断。</p><ul><li>如果你的团队还没有使用这任一技术，需要考虑的是团队成员的感受</li><li>如果已经在使用其中某一种方案，保持一致性即可，相信并这样走下去</li></ul><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,32),J={href:"https://juejin.cn/post/6844903988081475591",target:"_blank",rel:"noopener noreferrer"},R={href:"https://juejin.cn/post/6844903981819379719",target:"_blank",rel:"noopener noreferrer"},M={href:"https://juejin.cn/post/6844903938018263048",target:"_blank",rel:"noopener noreferrer"};function N(E,I){const n=r("ExternalLinkIcon");return d(),t("div",null,[v,m,u,e("p",null,[i("> 本文首发于政采云前端团队博客： "),e("a",o,[i("如何在React中优雅的写CSS"),s(n)])]),p,e("p",null,[i("如果，我们的样式还遵循 "),e("a",b,[i("BEM"),s(n)]),e("a",g,[i(" (Block, Element, Modifier)"),s(n)]),i(" 规范，那么，样式名简直不要太长！但是问题确实也解决了，但约定毕竟是约定，靠约定和自觉来解决问题毕竟不是好方法，在多人维护的业务代码中这种约定来解决 CSS 污染问题也变得很难。")]),h,x,S,_,f,C,e("h3",A,[q,i(),e("a",y,[i("reactCSS"),s(n)])]),B,e("h3",k,[j,i(),e("a",w,[i("styled-components"),s(n)])]),z,e("ul",null,[e("li",null,[e("p",null,[e("a",J,[i("可能是最全的 “文本溢出截断省略” 方案合集"),s(n)])])]),e("li",null,[e("p",null,[e("a",R,[i("乾坤大挪移！React 也能 “用上” computed 属性"),s(n)])])]),e("li",null,[e("p",null,[e("a",M,[i("看完这篇，你也能把 React Hooks 玩出花"),s(n)])])])])])}const H=a(c,[["render",N],["__file","如何在React中优雅的写CSS.html.vue"]]);export{H as default};
