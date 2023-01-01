import{_ as t,z as o,A as l,Y as e,C as n,U as a,a6 as i,Q as d}from"./framework-cb9358d9.js";const c={},r=i('<p>本文已参与「[掘力星计划](https://juejin.cn/post/7012210233804079141/ &quot;https://juejin.cn/post/7012210233804079141/&quot;)」，赢取创作大礼包，挑战创作激励金。 <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4eb6a01e6564840817b127265b07edd~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/729054cb0fa74d11b3b9aedbe8b759dd~tplv-k3u1fbpfcp-watermark.image?" alt="热河.png"></p><h1 id="使用这些配置规范并格式化你的代码" tabindex="-1"><a class="header-anchor" href="#使用这些配置规范并格式化你的代码" aria-hidden="true">#</a> 使用这些配置规范并格式化你的代码</h1><p>在日常工作中，我们会接触形形色色的工程。如果工程使用的技术架构不同，可能会有对应不同的代码规范。而每个人的编码习惯是不一样的也是难以短时间内改变的，这也是我们常常在开发一个新工程的时候，会遇到各种规范报错的原因。</p><p>此时，如果能有一套配置，能够让我们在写代码时不用考虑该工程的规则，只要在保存时就能够自动按照当前工程配置好的规则修复所有错误，这无疑会大大增加我们的开发体验和效率。</p><p>下面我将详细讲解为了实现这一目标，我们需要做什么，以及各种规范的基本配置。</p><h2 id="editorconfig" tabindex="-1"><a class="header-anchor" href="#editorconfig" aria-hidden="true">#</a> EditorConfig</h2><p>首先，我们需要一个基本的规范，例如缩进，如何换行等等。它要适用于所有的团队，适用于所有的语言，适用于所有的编辑器。</p><p><code>editorconfig</code> 能帮助我们实现这一点。它让所有的开发者在基本编码规范上保持一致。</p><p><strong>我们需要做的是：</strong></p>',10),p=e("code",null,"EditorConfig",-1),u=e("code",null,"EditorConfig",-1),m={href:"https://editorconfig.org/#pre-installed",target:"_blank",rel:"noopener noreferrer"},v=e("li",null,[n("配置 "),e("code",null,".editorconfig"),n(" 文件。")],-1),b=i(`<p>以下是 <code>.editorconfig</code> 的用法和例子：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 打开文件时，EditorConfig 插件会在打开的文件的目录和每个父目录中查找名为 .editorconfig 的文件。 </span>
<span class="token comment">## 如果到达根文件路径或找到具有 root=true 的 EditorConfig 文件，将停止对 .editorconfig 文件的搜索。</span>
<span class="token comment">## 如果 root=true 没有配置, EditorConfig 插件将会在工程之外寻找 .editorconfig 文件</span>
root <span class="token operator">=</span> <span class="token boolean">true</span>

<span class="token comment">## 使用规则匹配文件</span>
<span class="token comment">## *            匹配任何字符串，路径分隔符 (/) 除外</span>
<span class="token comment">## **           匹配任意字符串</span>
<span class="token comment">## ?            匹配任何单个字符</span>
<span class="token comment">## [name]       匹配给定的字符串中的任何单个字符</span>
<span class="token comment">## [!name]      匹配不在给定字符串中的任何单个字符</span>
<span class="token comment">## {s1,s2,s3}   匹配任意给定的字符串</span>
<span class="token comment">## {num1..num2} 匹配num1和num2之间的任何整数，其中num1和num2可以是正数或负数</span>
<span class="token comment">## 如规则[*.{js}]只对 .js 文件生效。一般来说，我们配置 [*] 对所有文件生效。</span>
<span class="token punctuation">[</span>*<span class="token punctuation">]</span>

<span class="token comment">## 缩进方式。 值可以是 tab 或者 space</span>
indent_style <span class="token operator">=</span> space

<span class="token comment">## 缩进大小。当设置为 tab 时，会取 tab_width 的值。</span>
indent_size <span class="token operator">=</span> <span class="token number">2</span>

<span class="token comment">## 通常不需要设置。当 indent_size = tab 时，才会生效。</span>
tab_width <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token comment">## 设置为 lf、cr 或 crlf 以控制如何表示换行符。</span>
end_of_line <span class="token operator">=</span> lf

<span class="token comment">## 设置为 latin1、utf-8、utf-8-bom、utf-16be 或 utf-16le 来控制字符集。</span>
charset <span class="token operator">=</span> utf-8

<span class="token comment">## 设置为 true 以删除换行符之前的任何空格字符，设置为 false 以确保不会。</span>
trim_trailing_whitespace <span class="token operator">=</span> <span class="token boolean">true</span>

<span class="token comment">## 设置为 true 以确保文件在保存时以换行符结束，设置为 false 以确保不以换行符结束。</span>
inset_final_newline <span class="token operator">=</span> <span class="token boolean">true</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="eslint" tabindex="-1"><a class="header-anchor" href="#eslint" aria-hidden="true">#</a> Eslint</h2><p>对于前端开发工程师来说，JavaScript 无疑是我们最好的伙伴了。而 ESLint，它是一款插件化的 JavaScript 代码静态检查工具，其核心是通过对代码解析得到的 AST（Abstract Syntax Tree，抽象语法树）进行模式匹配，定位不符合约定规范的代码。</p><p>社区里有很多不同版本的规范，每个团队也可能会制定自己的规范。编码风格千千万，而工程的配置就一套，在多人协作时就必然会出现规范报错的情况。我们需要配置一套规则，让我们不需要 Care 规则到底是什么，在保存文件的时候，自动按照工程规范格式化代码。</p><p>怎么办呢？</p>`,6),h={href:"https://cn.eslint.org/docs/rules/#stylistic-issues",target:"_blank",rel:"noopener noreferrer"},g=e("p",null,[e("strong",null,"我们需要做的是：")],-1),k={href:"https://github.com/airbnb/javascript",target:"_blank",rel:"noopener noreferrer"},f=e("code",null,"npm i eslint eslint-config-airbnb",-1),_=e("li",null,[n("VSCode 安装 "),e("code",null,"Eslint插件"),n("。")],-1),x=e("li",null,[n("添加 "),e("code",null,".eslintrc.js"),n(" 配置文件。")],-1),q=e("li",null,[n("更改 VSCode 的 "),e("code",null,"setting.json"),n(" 文件的配置。")],-1),j=i(`<p>其中，想要实现自动按照工程的规则格式化，第四步必不可少。</p><h3 id="setting-json" tabindex="-1"><a class="header-anchor" href="#setting-json" aria-hidden="true">#</a> setting.json</h3><p>如果你已经安装好了 <code>Eslint插件</code>，按 <code>cmd + shif + p</code>，打开 <code>defaultSettings.json</code> 文件，按 <code>cmd + f</code> 搜索 <code>eslint</code> 可以看到所有 ESlint 在 VSCode 内的默认配置。我们需要对它做一些修改。</p><p>还是按 <code>cmd + shift + p</code> 打开 <code>settings.json</code> 文件。这个文件是用户自定义配置，里面的配置会覆盖 <code>defaultSettings.json</code> 里的同名配置。我们在这个文件里对 <code>ESLint插件</code> 的配置做一些修改，让它达到我们想要的效果。</p><p>首先，我们想要 <code>保存时自动格式化</code>，实现这个效果的配置有三种：</p><ul><li><code>editor.formatOnSave</code> + <code> eslint.format.enable</code>。前者配置：<code>保存时格式化</code>，后者配置：<code>将 ESlint 规则作为格式化标准</code>。</li><li><code>eslint.autoFixOnSave</code></li><li><code>editor.codeActionsOnSave</code></li></ul><p>其中，第二种 <code>eslint.autoFixOnSave</code> 已经被废弃。使用它会提示更改为 <code>editor.codeActionsOnSave</code>。</p><p>而第一种和第三种都可以实现，但是更推荐使用第三种 <code>editor.codeActionsOnSave</code>，它支持更高的可配置性。</p><p>使用 <code>editor.codeActionsOnSave</code> 的时候，我们需要禁用其它格式化程序，最好的做法是将 ESlint 设置为格式化程序默认值。并且当我们这么做的时候，我们可以关闭 <code>editor.formatOnSave</code>，否则我们的文件将被修复两次，这是没有必要的。</p><p>以下便是我们需要在 <code>setting.json</code> 里新增的配置。（注释的地方是默认配置，无需新增）</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// 编辑的时候检测还是保存的时候检测，默认在编辑的时候就检测。 default: onType</span>
<span class="token comment">// &amp;quot;eslint.run&amp;quot;: &amp;quot;onType&amp;quot;,</span>

<span class="token comment">// default: false</span>
<span class="token comment">// &amp;quot;eslint.format.enable&amp;quot;: false,</span>

<span class="token comment">// default: false</span>
<span class="token comment">// &amp;quot;editor.formatOnSave&amp;quot;: false,</span>

&amp;quot;editor.codeActionsOnSave&amp;quot;<span class="token operator">:</span> <span class="token punctuation">{</span>
  &amp;quot;source.fixAll.eslint&amp;quot;<span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
&amp;quot;<span class="token punctuation">[</span>vue<span class="token punctuation">]</span>&amp;quot;<span class="token operator">:</span> <span class="token punctuation">{</span>
  &amp;quot;editor.defaultFormatter&amp;quot;<span class="token operator">:</span> &amp;quot;dbaeumer.vscode-eslint&amp;quot;
<span class="token punctuation">}</span><span class="token punctuation">,</span>
&amp;quot;<span class="token punctuation">[</span>javascript<span class="token punctuation">]</span>&amp;quot;<span class="token operator">:</span> <span class="token punctuation">{</span>
  &amp;quot;editor.defaultFormatter&amp;quot;<span class="token operator">:</span> &amp;quot;dbaeumer.vscode-eslint&amp;quot;
<span class="token punctuation">}</span><span class="token punctuation">,</span>

<span class="token comment">// 始终在VSCode的右下角状态栏显示 ESLint 字样，查看 ESLint 运行状态,确保 ESLint 在正常运行</span>
&amp;quot;eslint.alwaysShowStatus&amp;quot;<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="eslintrc-js" tabindex="-1"><a class="header-anchor" href="#eslintrc-js" aria-hidden="true">#</a> .eslintrc.js</h3><p>接下来，我们聊聊 <code>.eslintrc.js</code> 文件。这个文件将会规定我们的 ESLint 具体该使用什么规则去规范我们的代码。</p><p>我们自己往往不需要去配置这个文件，因为工程一般都会配置好了一套规则。我们只需要使用这套规则去格式化代码就好了。</p><p>但是看懂每条规则的意义，对于我们也是很重要的，例如你想自己新建工程。</p><p>接下来，我将从 <code>普遍用法</code>、<code>Vue项目特殊配置</code>、<code>React项目特殊配置</code> 来看下如何配置 <code>.eslintrc.js</code> 文件。</p><h4 id="普遍用法" tabindex="-1"><a class="header-anchor" href="#普遍用法" aria-hidden="true">#</a> 普遍用法</h4>`,17),S={href:"https://cn.eslint.org/docs/user-guide/configuring#specifying-parser-options",target:"_blank",rel:"noopener noreferrer"},y=i(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 启用对 es6 的语法和全局变量的支持
{
  env: {
    es6: true,
  },
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),E={href:"https://cn.eslint.org/docs/user-guide/configuring#specifying-environments",target:"_blank",rel:"noopener noreferrer"},w=e("code",null,"Node",-1),V=i(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  env: {
    browser: true,
    node: true,
  },
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),L={href:"https://cn.eslint.org/docs/user-guide/configuring#specifying-parser",target:"_blank",rel:"noopener noreferrer"},C=i(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  parser: &amp;#39;babel-eslint&amp;#39;,
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),O={href:"https://cn.eslint.org/docs/rules/no-undef",target:"_blank",rel:"noopener noreferrer"},R={href:"https://cn.eslint.org/docs/user-guide/configuring#specifying-globals",target:"_blank",rel:"noopener noreferrer"},A=i(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  globals: {
    &amp;quot;__DEV__&amp;quot;: true,
    &amp;quot;If&amp;quot;: true,
    &amp;quot;For&amp;quot;: true,
    &amp;quot;POBrowser&amp;quot;: true
  },
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),F={href:"https://cn.eslint.org/docs/user-guide/configuring#configuring-plugins",target:"_blank",rel:"noopener noreferrer"},z=e("code",null,"plugins",-1),P=e("code",null,"eslint-plugin-",-1),J=i(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  	plugins: [&amp;#39;react-hooks&amp;#39;, &amp;#39;jsx-control-statements&amp;#39;],
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),T={href:"https://cn.eslint.org/docs/user-guide/configuring#configuring-rules",target:"_blank",rel:"noopener noreferrer"},X=i("<ul><li><code>&amp;quot;off&amp;quot;</code> 或 <code>0</code> - 关闭规则</li><li><code>&amp;quot;warn&amp;quot;</code> 或 <code>1</code> - 开启规则，使用警告级别的错误：<code>warn</code> (不会导致程序退出)</li><li><code>&amp;quot;error&amp;quot;</code> 或 <code>2</code> - 开启规则，使用错误级别的错误：<code>error</code> (当被触发的时候，程序会退出)</li></ul>",1),I=i(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    rules: {
        eqeqeq: &amp;#39;off&amp;#39;,
        curly: &amp;#39;error&amp;#39;,
        quotes: [&amp;#39;error&amp;#39;, &amp;#39;double&amp;#39;]
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>配置定义在插件中的一个规则的时候，你必须使用 <code>插件名/规则ID</code> 的形式。比如：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  plugins: [&amp;#39;react-hooks&amp;#39;, &amp;#39;jsx-control-statements&amp;#39;],
  rules: {
    &amp;#39;arrow-parens&amp;#39;: 0,
    &amp;#39;react-hooks/rules-of-hooks&amp;#39;: &amp;#39;error&amp;#39;,
    &amp;#39;react-hooks/exhaustive-deps&amp;#39;: &amp;#39;warn&amp;#39;,
    &amp;#39;jsx-control-statements/jsx-use-if-tag&amp;#39;: 0,
    &amp;#39;react/jsx-no-undef&amp;#39;: [&amp;#39;error&amp;#39;, { &amp;#39;allowGlobals&amp;#39;: true }],
    &amp;#39;no-prototype-builtins&amp;#39;: &amp;#39;off&amp;#39;,
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),B={href:"https://cn.eslint.org/docs/user-guide/configuring#extending-configuration-files",target:"_blank",rel:"noopener noreferrer"},N=i(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  extends: &amp;#39;zoo/react&amp;#39;,
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="vue-特殊配置" tabindex="-1"><a class="header-anchor" href="#vue-特殊配置" aria-hidden="true">#</a> <code>Vue</code> 特殊配置</h4><p>由于 <code>Vue</code> 单文件组件的特殊写法，针对 <code>Vue</code> 项目，需要做一些特殊的 ESLint 配置，以达到自动化的效果。</p><h5 id="高亮语法支持" tabindex="-1"><a class="header-anchor" href="#高亮语法支持" aria-hidden="true">#</a> 高亮语法支持</h5><p>安装 <code>Vetur插件</code>。</p><h5 id="使用-eslint-而不是-vetur-做代码检测" tabindex="-1"><a class="header-anchor" href="#使用-eslint-而不是-vetur-做代码检测" aria-hidden="true">#</a> 使用 ESLint 而不是 Vetur 做代码检测</h5><p>Vetur 为 <code>Vue</code> 项目带来了语法高亮和便捷的操作。但是它本身也会自动开启对 <code>Vue</code> 文件的代码检测。这往往会和我们配置的 ESLint 有冲突。为了避免这一点，需要在 VSCode 的 <code>settings.json</code> 中做一些配置：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// 不允许它格式化代码</span>
&amp;quot;vetur.format.enable&amp;quot;<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token comment">// 不允许它做代码检测</span>
&amp;quot;vetur.validation.template&amp;quot;<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
&amp;quot;vetur.validation.script&amp;quot;<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
&amp;quot;vetur.validation.style&amp;quot;<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>无需将 <code>vue</code> 添加进 <code>eslint.validate</code>,因为 <code>eslint.probe</code> 默认会检测 <code>vue</code> 类型文件。</p><p>然后，我们需要配置 <code>.eslintrc.js</code> 文件，里面用到的插件都需要本地安装。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>module.exports = {
    root: true,
    // 如果是SSR项目，则需要配置node:true
    env: {
        browser: true,
        node: true,
    },
    // 为什么是这样的parser配置？https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
    parser: &amp;#39;vue-eslint-parser&amp;#39;,
    parserOptions: {
        parser: &amp;#39;babel-eslint&amp;#39;,
    },
    extends: [
        // 如果是nuxt.js的脚手架项目，则需要安装对应的插件并做以下配置
        &amp;#39;@nuxtjs&amp;#39;,
        &amp;#39;plugin:nuxt/recommended&amp;#39;,

        // 让eslint可以规范vue文件
        &amp;#39;plugin:vue/base&amp;#39;,
        // vue3的项目需要使用，如果是vue2项目，使用 plugin:vue/recommended
        &amp;#39;plugin:vue/vue3-recommended&amp;#39;,
    ],
    plugins: [
        // 注意这里不能配置 html 选项，为什么？https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-files
        &amp;#39;vue&amp;#39;,
    ],
    // 配置自己的规则，覆盖上面继承的规则
    rules: {
        // 配置js的缩进为 2，switch case 语句的 case 也使用2个空格缩进
        indent: [&amp;#39;error&amp;#39;, 2, { SwitchCase: 1 }],
        // 使用 eslint 检测 template里的代码，这里我配置 2 个空格缩进
        &amp;#39;vue/html-indent&amp;#39;: [&amp;#39;error&amp;#39;, 2],
    },
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上配置，大家根据自己的项目特点，自行删减即可。比如，如果你的项目不是 <code>nuxt.js</code> 的，可以去掉 <code>extends</code> 里的 <code>&amp;#39;@nuxtjs</code> 和 <code>plugin:nuxt/recommended</code>。</p>`,12),D=e("code",null,"Vue cli",-1),H=e("code",null,"ts",-1),G=e("code",null,"jsconfig.json",-1),U=e("code",null,"jsconfig",-1),Z={href:"https://code.visualstudio.com/docs/languages/jsconfig",target:"_blank",rel:"noopener noreferrer"},K=e("h4",{id:"react-特殊配置",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#react-特殊配置","aria-hidden":"true"},"#"),n(),e("code",null,"React"),n(" 特殊配置")],-1),Q=e("p",null,[e("code",null,"React"),n(" 项目中，因为是 "),e("code",null,".js"),n(" 文件，一般不需要特殊的配置。但即使如此，针对 JSX 和 Hooks 的使用规则，我们仍然需要做一些事情")],-1),Y=e("h5",{id:"针对-react-hooks",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#针对-react-hooks","aria-hidden":"true"},"#"),n(" 针对 React Hooks")],-1),M={href:"https://zh-hans.reactjs.org/docs/hooks-faq.html#what-exactly-do-the-lint-rules-enforce",target:"_blank",rel:"noopener noreferrer"},W=i(`<p><code>eslint-plugin-hooks</code> 是 <code>React</code> 源码目录 <code>packages</code> 里提供的一个包。它会强制执行 Hooks 规则，它也是 Hooks API 的一部分。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>npm i eslint-plugin-reack-hooks
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 <code>.eslintrc.js</code> 中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>module.exports = {
  // eslint-plugin 可以简写
  plugins: [&amp;#39;react-hooks&amp;#39;],
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="针对-jsx" tabindex="-1"><a class="header-anchor" href="#针对-jsx" aria-hidden="true">#</a> 针对 JSX</h5><p>JSX 不过只是 <code>React</code> 的一个语法糖，其最终都会被 React 调用 React.createElement 编译城 React Element 形式。所以在 17 版本之前，如果我们使用到了 JSX 但是没有引入 <code>React</code> ，会提示 <code>&amp;#39;React&amp;#39; must be in scope when using JSX</code>。 而在 17 版本之后， React 与 babel 和 TypeScript 编译器合作，将转化任务交给了编译器自动转化。</p><p>如果我们是之前的转化版本，我们要获得对 JSX 的语法支持，我们需要安装 <code>eslint-plugin-react</code>,它内置了对 JSX 的代码规范检测。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  extends: [&amp;#39;plugin:react/recommended&amp;#39;],
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果不想使用内置的规则，我们也可以自定义规则</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  plugins: [&amp;#39;react&amp;#39;],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    &amp;#39;react/jsx-no-undef&amp;#39;: [&amp;#39;error&amp;#39;, { &amp;quot;allowGlobals&amp;quot;: true }],
  },
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果是新的转化版本，则需要做一点小小的更改,以便在使用 JSX 的时候，不会要求我们引入 <code>React</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  extends: [&amp;#39;plugin:react/recommended&amp;#39;, &amp;#39;plugin:react/jsx-runtime&amp;#39;],
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="stylelint" tabindex="-1"><a class="header-anchor" href="#stylelint" aria-hidden="true">#</a> StyleLint</h2><p>在完成了以上的配置之后，我们已经可以对 <code>.js</code> 文件、<code>.vue</code> 文件的 <code>template</code> 和 <code>script</code> 模块实现代码规范和保存时自动格式化了。但是对于 <code>.css、.less、.scss</code> 文件和 <code>.vue</code> 文件的 <code>style</code> 模块，我们还需要做额外的配置，否则样式部分不规范，我们也是没法检测并自动修复的。</p><p><strong>我们需要做的是：</strong></p><ol><li><code>npm i stylelint stylelint-config-standard stylelint-scss</code>。</li><li>安装 <code>Stylelint插件</code>。</li><li>配置 <code>.stylelintrc</code> 文件。</li><li>配置 VSCode 的 <code>setting.json</code> 文件。</li></ol><p>其中，第四步也是必须的，我们需要做如下配置：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// 防止编辑器内置的 [css] [less] [scss] 校验和此扩展 [stylelint] 报告相同的错误</span>
&amp;quot;css.validate&amp;quot;<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
&amp;quot;less.validate&amp;quot;<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
&amp;quot;scss.validate&amp;quot;<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>

<span class="token comment">// 保存时使用 eslint 和 stylelint 进行修复</span>
&amp;quot;editor.codeActionsOnSave&amp;quot;<span class="token operator">:</span> <span class="token punctuation">{</span>
  &amp;quot;source.fixAll.eslint&amp;quot;<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  &amp;quot;source.fixAll.stylelint&amp;quot;<span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token comment">// 默认会对很多文件进行检测，这是不必要的，我们只让他检测样式</span>
&amp;quot;stylelint.validate&amp;quot;<span class="token operator">:</span> <span class="token punctuation">[</span>
		&amp;quot;css&amp;quot;<span class="token punctuation">,</span>
		&amp;quot;html&amp;quot;<span class="token punctuation">,</span>
		&amp;quot;less&amp;quot;<span class="token punctuation">,</span>
		&amp;quot;postcss&amp;quot;<span class="token punctuation">,</span>
		&amp;quot;sass&amp;quot;<span class="token punctuation">,</span>
		&amp;quot;scss&amp;quot;<span class="token punctuation">,</span>
		&amp;quot;source.css.styled&amp;quot;<span class="token punctuation">,</span>
		&amp;quot;styled-css&amp;quot;<span class="token punctuation">,</span>
	<span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上，我们的目标已经达成啦！</p><h2 id="prettier" tabindex="-1"><a class="header-anchor" href="#prettier" aria-hidden="true">#</a> Prettier</h2><p>代码格式化工具。很多同学都接触过这个工具，我个人深入了解了一下这个工具，以下是我的个人见解。先看下 Prettier 官方的一段话吧。</p><p>So why choose the “Prettier style guide” over any other random style guide? Because Prettier is the only “style guide” that is fully automatic. Even if Prettier does not format all code 100% the way you’d like, it’s worth the “sacrifice” given the unique benefits of Prettier, don’t you think?</p><p>可以看到，这个工具旨在让不同公司不同团队不需要考虑代码规范，实现自动化保存格式化。牺牲掉个性化内容。</p><p>但是往往不同的团队对规则的使用是不一致的，如果强制所有文件都使用 <code>prettier</code> 自动格式化，会出现与公司配置的代码规范检查工具（例如 ESLint） 冲突的情况。实际表现为自动保存之后，依然出现 ESLint 格式报错。</p><p>想让 <code>prettier</code> 生效，需要我们在 VSCode 里配置：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// 所有文件都使用 prettier 格式化</span>
&amp;quot;editor.defaultFormatter&amp;quot;<span class="token operator">:</span> &amp;quot;esbenp.prettier-vscode&amp;quot;<span class="token punctuation">,</span>

<span class="token comment">// 只对 js 文件使用 prettier</span>
&amp;quot;<span class="token punctuation">[</span>javascript<span class="token punctuation">]</span>&amp;quot;<span class="token operator">:</span> <span class="token punctuation">{</span>
    &amp;quot;editor.defaultFormatter&amp;quot;<span class="token operator">:</span> &amp;quot;esbenp.prettier-vscode&amp;quot;
 <span class="token punctuation">}</span>

<span class="token comment">// 所有文件都不指定自动格式化方式</span>
&amp;quot;editor.defaultFormatter&amp;quot;<span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>

<span class="token comment">// js文件不指定自动格式化方式</span>
&amp;quot;<span class="token punctuation">[</span>javascript<span class="token punctuation">]</span>&amp;quot;<span class="token operator">:</span> <span class="token punctuation">{</span>
    &amp;quot;editor.defaultFormatter&amp;quot;<span class="token operator">:</span> <span class="token null keyword">null</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用 <code>.prettierrc</code> 文件、VSCode 的 <code>setting.json</code> 、<code>.editorConfig</code> 来配置 <code>prettier</code>。</p><p>推荐不常使用的文件类型，使用 <code>prettier</code> 去格式化。<code>js,json,jsx,html,css,less,vue</code> 等这些文件，使用工程统一的规范去格式化。</p><p>所以，我觉得完全可以卸载它。不知道你怎么看呢？</p><p>以上就是全部内容了，希望对你有所帮助～</p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,31),$={href:"https://juejin.cn/post/7002746459456176158",target:"_blank",rel:"noopener noreferrer"},ee={href:"https://juejin.cn/post/6997536906967777316",target:"_blank",rel:"noopener noreferrer"},ne={href:"https://juejin.cn/post/7013131773756309517",target:"_blank",rel:"noopener noreferrer"},se={href:"https://juejin.cn/post/7018296556323340324",target:"_blank",rel:"noopener noreferrer"},ae=e("h2",{id:"开源作品",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#开源作品","aria-hidden":"true"},"#"),n(" 开源作品")],-1),ie=e("ul",null,[e("li",null,"政采云前端小报")],-1),te={href:"https://www.zoo.team/openweekly/",target:"_blank",rel:"noopener noreferrer"},oe=e("ul",null,[e("li",null,"skuDemo")],-1),le={href:"https://github.com/zcy-inc/skuPathFinder-back",target:"_blank",rel:"noopener noreferrer"},de=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),n(" 招贤纳士")],-1),ce=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),re=e("p",null,[n("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),pe=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98d3aa3d1f8646a8bcda8cfd9e335a4b~tplv-k3u1fbpfcp-zoom-1.image",alt:""})],-1);function ue(me,ve){const s=d("ExternalLinkIcon");return o(),l("div",null,[r,e("ol",null,[e("li",null,[n("安装 "),p,n(" 插件（有些编辑器默认支持 "),u,n(" ，具体请看 "),e("a",m,[n("这些编辑器不需要安装插件"),a(s)]),n("）。")]),v]),b,e("p",null,[n("Eslint 提供了风格指南规则，并明确表示了哪些是可修复的："),e("a",h,[n("Stylistic Issues"),a(s)])]),g,e("ol",null,[e("li",null,[n("本地安装 Eslint 和社区推荐的规范 "),e("a",k,[n("eslint-config-airbnb"),a(s)]),n(" （也可以是别的规范）。插件会使用安装的 Eslint 库（如果你还未安装："),f,n("）。")]),_,x,q]),j,e("ul",null,[e("li",null,[n("默认情况下，ESLint 支持 ES5 的语法。我们可以覆盖这个配置，"),e("a",S,[n("启用对 ES6、 ES7 ... 的支持"),a(s)]),n("。")])]),y,e("ul",null,[e("li",null,[n("如果我们想让 ESLint 不仅能识别浏览器环境中的语法，"),e("a",E,[n("其它环境("),a(s)]),n("如 "),w,n(")我们也希望它能识别，这时候我们可以这样配置：")])]),V,e("ul",null,[e("li",null,[n("在一些项目中，我们需要特殊的解析器去解析我们的代码，是否是符合规范的。这时候我们可以使用 "),e("a",L,[n("Parser"),a(s)])])]),C,e("ul",null,[e("li",null,[n("当访问当前源文件内未定义的变量时，"),e("a",O,[n("no-undef"),a(s)]),n(" 规则将发出警告。如果你想在一个源文件里使用全局变量，推荐你"),e("a",R,[n("在 ESLint 中定义这些全局变量"),a(s)]),n("，这样 ESLint 就不会发出警告了。")])]),A,e("ul",null,[e("li",null,[n("ESLint 支持"),e("a",F,[n("使用第三方插件"),a(s)]),n("。在使用插件之前，你必须使用 npm 安装它。在配置文件里配置插件时，可以使用 "),z,n(" 关键字来存放插件名字的列表。插件名称可以省略 "),P,n(" 前缀。")])]),J,e("ul",null,[e("li",null,[n("ESLint 附带有大量的规则。你可以使用注释或配置文件"),e("a",T,[n("修改你项目中要使用的规则"),a(s)]),n("。要改变一个规则设置，你必须将规则 ID 设置为下列值之一： "),X])]),I,e("ul",null,[e("li",null,[n("ESLint 的配置规则实在太多，如果我们自己一条条规则去配置，这个工作了将会非常大。我们可以"),e("a",B,[n("直接拿现有的规范来使用"),a(s)]),n("。")])]),N,e("p",null,[n("如果是 "),D,n(" 创建的项目，并且没有使用 "),H,n("，需要在项目根目录添加 "),G,n(" 文件。有关 "),U,n(" 的配置在这里："),e("a",Z,[n("jsconfig"),a(s)])]),K,Q,Y,e("p",null,[e("a",M,[n("lint 规则具体强制了哪些内容？"),a(s)])]),W,e("p",null,[e("a",$,[n("电商最小存货 - SKU 和 算法实现"),a(s)])]),e("p",null,[e("a",ee,[n("你需要知道的项目管理知识"),a(s)])]),e("p",null,[e("a",ne,[n("浏览器渲染之回流重绘"),a(s)])]),e("p",null,[e("a",se,[n("防抖节流场景及应用"),a(s)])]),ae,ie,e("p",null,[e("strong",null,[n("开源地址 "),e("a",te,[n("www.zoo.team/openweekly/"),a(s)])]),n(" (小报官网首页有微信交流群)")]),oe,e("p",null,[e("strong",null,[n("开源地址 "),e("a",le,[n("https://github.com/zcy-inc/skuPathFinder-back/"),a(s)])])]),de,ce,re,pe])}const he=t(c,[["render",ue],["__file","使用这些配置规范并格式化你的代码.html.vue"]]);export{he as default};
