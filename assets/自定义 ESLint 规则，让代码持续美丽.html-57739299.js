import{_ as d,z as l,A as t,Y as e,C as n,U as a,a6 as s,Q as r}from"./framework-cb9358d9.js";const o={},u=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/24/1737e6038b00329e~tplv-t2oaga2asx-image.image",alt:""})],-1),c={href:"https://www.zoo.team/article/eslint-rules",target:"_blank",rel:"noopener noreferrer"},m=s(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/22/16f2d89a13d8e188~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><p>&gt; 一段真实的代码发展历史</p><p>很久很久以前，有一个需求，然后产出了一段代码，代码优雅而简洁</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export const getConfig = (param1, param2) =&amp;gt; {
  return ...
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不久又来了个需求，加个参数扩展，so easy！</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export const getConfig = (param1, param2, param3) =&amp;gt; {
  return ...
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>经过多次产品需求迭代后，现在的代码</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/12/1734198477b2b187~tplv-t2oaga2asx-image.image" alt="image"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export const getConfig = (param1, param2, param3, param4, param5, param6, param7……) =&amp;gt; {
  return ...
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在产品迭代过程中，上面的 case 一个函数的参数从 2 个发展到了 7 个，优雅的代码逐渐变为不可维护。 这是什么问题？这归咎于日益增长的需求，快速响应和代码质量之间的矛盾。</p><p>那如何避免呢？</p><ul><li>制定代码规范</li><li>靠开发同学的自我修养</li><li>进行 Code Review</li><li>工具提示</li><li>发版控制，不允许发版</li></ul><p>制定代码规范肯定是需要的，那如何约束代码呢？规范文档宣讲，再凭借开发同学的自我修养？答案是：无法保证。</p><p>Code Review ？但难免也有落网之鱼。发版控制？能有效解决但是开发体验不好。</p><p>如果我们在开发者写代码的时候就及时给到提示和建议，那开发体验就很棒了，而 <code>ESLint</code> 的自定义规则就可以实现在开发过程中给开发同学友好的提示。</p><h2 id="eslint-原理" tabindex="-1"><a class="header-anchor" href="#eslint-原理" aria-hidden="true">#</a> ESLint 原理</h2>`,17),v={href:"https://github.com/eslint/espree",target:"_blank",rel:"noopener noreferrer"},p=e("code",null,"AST",-1),b=e("code",null,"espree",-1),g={href:"https://astexplorer.net/",target:"_blank",rel:"noopener noreferrer"},h=e("code",null,"AST",-1),q=s(`<p>代码片段：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var a = 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>转换出的结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &amp;quot;type&amp;quot;: &amp;quot;Program&amp;quot;,
  &amp;quot;start&amp;quot;: 0,
  &amp;quot;end&amp;quot;: 10,
  &amp;quot;range&amp;quot;: [
    0,
    10
  ],
  &amp;quot;body&amp;quot;: [
    {
      &amp;quot;type&amp;quot;: &amp;quot;VariableDeclaration&amp;quot;,
      &amp;quot;start&amp;quot;: 0,
      &amp;quot;end&amp;quot;: 10,
      &amp;quot;range&amp;quot;: [
        0,
        10
      ],
      &amp;quot;declarations&amp;quot;: [
        {
          &amp;quot;type&amp;quot;: &amp;quot;VariableDeclarator&amp;quot;,
          &amp;quot;start&amp;quot;: 4,
          &amp;quot;end&amp;quot;: 9,
          &amp;quot;range&amp;quot;: [
            4,
            9
          ],
          &amp;quot;id&amp;quot;: {
            &amp;quot;type&amp;quot;: &amp;quot;Identifier&amp;quot;,
            &amp;quot;start&amp;quot;: 4,
            &amp;quot;end&amp;quot;: 5,
            &amp;quot;range&amp;quot;: [
              4,
              5
            ],
            &amp;quot;name&amp;quot;: &amp;quot;a&amp;quot;
          },
          &amp;quot;init&amp;quot;: {
            &amp;quot;type&amp;quot;: &amp;quot;Literal&amp;quot;,
            &amp;quot;start&amp;quot;: 8,
            &amp;quot;end&amp;quot;: 9,
            &amp;quot;range&amp;quot;: [
              8,
              9
            ],
            &amp;quot;value&amp;quot;: 1,
            &amp;quot;raw&amp;quot;: &amp;quot;1&amp;quot;
          }
        }
      ],
      &amp;quot;kind&amp;quot;: &amp;quot;var&amp;quot;
    }
  ],
  &amp;quot;sourceType&amp;quot;: &amp;quot;module&amp;quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码转换为 <code>AST</code> 后，可以很方便的对代码的每个节点对代码进行检查。</p><h2 id="自定义-eslint-规则开发" tabindex="-1"><a class="header-anchor" href="#自定义-eslint-规则开发" aria-hidden="true">#</a> 自定义 ESLint 规则开发</h2><h3 id="怎么自定义" tabindex="-1"><a class="header-anchor" href="#怎么自定义" aria-hidden="true">#</a> 怎么自定义</h3><h4 id="语法树分析" tabindex="-1"><a class="header-anchor" href="#语法树分析" aria-hidden="true">#</a> 语法树分析</h4>`,8),x={href:"https://astexplorer.net/",target:"_blank",rel:"noopener noreferrer"},_=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/12/17341984763d3922~tplv-t2oaga2asx-image.image",alt:""})],-1),f=e("h4",{id:"编写规则",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#编写规则","aria-hidden":"true"},"#"),n(" 编写规则")],-1),y={href:"https://eslint.org/docs/developer-guide/working-with-rules#rule-basics",target:"_blank",rel:"noopener noreferrer"},L=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>module.exports = {
  meta: {
    docs: {
      description: &amp;quot;最多参数允许参数&amp;quot;,
    },
  },
  create: function (context) {
    return {
      FunctionDeclaration: (node) =&amp;gt; {
        if (node.params.length &amp;gt; 3) {
          context.report({
            node,
            message: &amp;quot;参数最多不能超过3个&amp;quot;,
          });
        }
      },
    };
  },
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>meta（对象）包含规则的元数据</li><li>create ( function ) 返回一个对象，其中包含了 ESLint 在遍历 JavaScript 代码的抽象语法树 AST ( ESTree 定义的 AST ) 时，用来访问节点的方法</li><li>context.report ( ) 用来发布警告或错误，并能提供自动修复功能（取决于你所使用的配置）</li></ul><p>最简单的示例（只使用 node 和 message 参数）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>context.report({
    node,
    message: &amp;quot;参数最多不能超过3个&amp;quot;,
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),S=e("code",null,"node",-1),E=e("code",null,"loc",-1),T={href:"https://eslint.org/docs/developer-guide/working-with-rules#context-report",target:"_blank",rel:"noopener noreferrer"},j=e("code",null,"API",-1),k=s('<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/12/1734198479b9f0b5~tplv-t2oaga2asx-image.image" alt="image"></p><h3 id="如何使用自定义规则" tabindex="-1"><a class="header-anchor" href="#如何使用自定义规则" aria-hidden="true">#</a> 如何使用自定义规则</h3><p>使用自定义的 <code>ESLint</code> 规则，你需要自定义一个 <code>ESLint</code> 的插件，然后将规则写到自定义的 <code>ESLint</code> 插件中，然后在业务代码中添加 <code>ESLint</code> 配置，引入 <code>ESLint</code> 插件。</p><h2 id="eslint-插件" tabindex="-1"><a class="header-anchor" href="#eslint-插件" aria-hidden="true">#</a> ESLint 插件</h2><h3 id="创建" tabindex="-1"><a class="header-anchor" href="#创建" aria-hidden="true">#</a> 创建</h3><p>创建一个 <code>ESLint plugin</code>，并创建 一个 <code>ESLint rule</code>。</p>',6),w={href:"https://yeoman.io/authoring/",target:"_blank",rel:"noopener noreferrer"},z=e("code",null,"Yeoman generator",-1),R=e("code",null,"ESLint plugin",-1),A=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npm i -g yo
npm i -g generator-eslint
// 创建一个plugin
yo eslint:plugin
// 创建一个规则
yo eslint:rule
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建好的项目目录结构：</p><ul><li><code>rules</code> 文件夹存放的是各个规则文件</li><li><code>tests</code> 文件夹存放单元测试文件</li><li>package.json 是你的 <code>ESLint</code> 插件 npm 包的说明文件，其中的 <code>name</code> 属性就是你的 <code>ESLint</code> 插件的名称，命名规则：带前缀 <code>eslint-plugin-</code></li></ul><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/12/173419847a4224a4~tplv-t2oaga2asx-image.image" alt=""></p><p>示例代码：</p><p>lib/rules/max-params.js</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>module.exports = {
  meta: {
    docs: {
      description: &amp;quot;最多参数&amp;quot;,
    },
  },
  create: function (context) {
    /**
     * 获取函数的参数的开始、结束位置
     * @param {node} node AST Node 
     */
    function getFunctionParamsLoc(node) {
      const paramsLength = node.params.length;
      return {
        start: node.params[0].loc.start,
        end: node.params[paramsLength - 1].loc.end,
      };
    }
    return {
      FunctionDeclaration: (node) =&amp;gt; {
        if (node.params.length &amp;gt; 3) {
          context.report({
            loc: getFunctionParamsLoc(node),
            node,
            message: &amp;quot;参数最多不能超过3个&amp;quot;,
          });
        }
      },
    };
  },
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>补充测试用例</p><p>/tests/lib/rules/max-params.js</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var ruleTester = new RuleTester();
ruleTester.run(&amp;quot;max-params&amp;quot;, rule, {
  valid: [&amp;quot;function test(d, e, f) {}&amp;quot;],
  invalid: [
    {
        code: &amp;quot;function test(a, b, c, d) {}&amp;quot;,
        errors: [{
            message: &amp;quot;参数最多不能超过3个&amp;quot;,
        }]
    },
  ],
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="eslint-插件安装" tabindex="-1"><a class="header-anchor" href="#eslint-插件安装" aria-hidden="true">#</a> ESLint 插件安装</h3><p>在需要的业务代码中安装你的 ESLint 插件。（<code>eslint-plugin-my-eslist-plugin</code> 是你的 ESLint 插件 npm 包的包名）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npm install eslint-plugin-my-eslist-plugin 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果你的 npm 包还未发布，需要进行本地调试：</p><p>可使用 <code>npm link</code> 本地调试，[npm link 的使用](&lt;https://www.baidu.com/s?ie=UTF-8&amp;wd=npm link&gt;)。</p><h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3><p>添加你的 <code>plugin</code> 包名（<code>eslint-plugin-</code> 前缀可忽略） 到 <code>.eslintrc</code> 配置文件的 <code>plugins</code> 字段。</p><p><code>.eslintrc</code> 配置文件示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &amp;quot;plugins&amp;quot;: [
        &amp;quot;zoo&amp;quot; // 你的 ESlint plugin 的名字
    ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>rules</code> 中再将 <code>plugin</code> 中的规则导入。 ⚠️ ESLint更新后，需要重启 <code>vscode</code>，才能生效。（ vscode 重启快捷方式：<code>CTRL</code> +<code>SHITF</code> + <code>P</code>，输入 <code>Reload Window</code> ）</p>`,20),C=e("code",null,"ESLint",-1),N={href:"https://eslint.org/docs/user-guide/configuring#configuring-rules",target:"_blank",rel:"noopener noreferrer"},D=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &amp;quot;rules&amp;quot;: {
        &amp;quot;zoo/rule-name&amp;quot;: 2
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="效果" tabindex="-1"><a class="header-anchor" href="#效果" aria-hidden="true">#</a> 效果</h3><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/12/1734198479b9f0b5~tplv-t2oaga2asx-image.image" alt="image"></p><h2 id="实际应用案例" tabindex="-1"><a class="header-anchor" href="#实际应用案例" aria-hidden="true">#</a> 实际应用案例</h2><p>函数、方法的入参个数控制，其实已经在 <code>ESLint</code> 的规则中了。在业务场景中，我们需要对我们的业务规则编写自定义的 <code>ESLint</code> 规则。</p><p>一个简单的业务场景：业务中通常会出现跳转到很多不同的业务域名的操作，不同的环境有不同的域名，我们需要从配置中取出域名使用，而不是采取硬编码域名的方案。</p><p>由此我们产生出了一个规则：禁止硬编码业务域名。</p><p>规则为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>module.exports = {
  meta: {
    type: &amp;quot;suggestion&amp;quot;,
    docs: {
      description: &amp;quot;不允许硬编码业务域名&amp;quot;,
    },
    fixable: &amp;quot;code&amp;quot;,
  },

  create: function (context) {
    const sourceCode = context.getSourceCode();

    function checkDomain(node) {
      // 匹配硬编码的业务域名的正则
      const Reg = /^(http:\\/\\/|https:\\/\\/|\\/\\/)(.*.){0,1}zcygov(.com|cn)(.*)/;
      const content =
        (node.type === &amp;quot;Literal&amp;quot; &amp;amp;&amp;amp; node.value) ||
        (node.type === &amp;quot;TemplateLiteral&amp;quot; &amp;amp;&amp;amp; node.quasis[0].value.cooked);

      const domainNode =
        (node.type === &amp;quot;Literal&amp;quot; &amp;amp;&amp;amp; node) ||
        (node.type === &amp;quot;TemplateLiteral&amp;quot; &amp;amp;&amp;amp; node.quasis[0]);

      if (Reg.test(content)) {
        context.report({
          node,
          // 错误/警告提示信息
          message: &amp;quot;不允许硬编码业务域名&amp;quot;,
          // 修复
          fix(fixer) {
            
            const fixes = [];
            
            let domainKey = content.match(Reg)[2];
            domainKey = domainKey
              ? domainKey.substr(0, domainKey.length - 1)
              : &amp;quot;&amp;quot;;

            if (node.type === &amp;quot;Literal&amp;quot;) {
              fixes.push(
                fixer.replaceTextRange(
                  [domainNode.start + 1, domainNode.end - 1],
                  content.replace(Reg, \`$4\`)
                )
              );
            }

            if (node.type === &amp;quot;TemplateLiteral&amp;quot;) {
              fixes.push(
                fixer.replaceTextRange(
                  [domainNode.start, domainNode.end],
                  content.replace(Reg, \`$4\`)
                )
              );
            }
             
            if (
              node.type === &amp;quot;Literal&amp;quot; &amp;amp;&amp;amp;
              node.parent.type === &amp;quot;JSXAttribute&amp;quot;
            ) {
              fixes.push(fixer.insertTextBefore(node, &amp;quot;{&amp;quot;));
              fixes.push(fixer.insertTextAfter(node, &amp;quot;}&amp;quot;));
            }

            fixes.push(
              fixer.insertTextBefore(
                node,
                \`window.getDomain(&amp;#39;\${domainKey}&amp;#39;) + \`
              )
            );

            return fixes;
          },
        });
      }
    }
    return {
      // 文本
      Literal: checkDomain,
      // 模板字符串
      TemplateLiteral: checkDomain,
    };
  },
};

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>补充测试用例</p><p>/tests/lib/rules/no-zcy-domain.js</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var rule = require(&amp;quot;../../../lib/rules/no-zcy-domain&amp;quot;),
    RuleTester = require(&amp;quot;eslint&amp;quot;).RuleTester;

var ruleTester = new RuleTester();
ruleTester.run(&amp;quot;no-zcy-domain&amp;quot;, rule, {
  valid: [
    &amp;quot;bar&amp;quot;,
    &amp;quot;baz&amp;quot;,
    \`
  var s = {
    x: &amp;quot;zcygov&amp;quot;
  };
  \`,
  ],
  invalid: [
    {
      code: \`
              var s = &amp;quot;//zcygov.cn&amp;quot;
            \`,
      errors: [
        {
          message: &amp;quot;不允许硬编码业务域名&amp;quot;,
        },
      ],
    },
    {
      code: \`
            var s = {
              x: &amp;quot;http://bidding.zcygov.cn&amp;quot;
            };
            \`,
      errors: [
        {
          message: &amp;quot;不允许硬编码业务域名&amp;quot;,
        },
      ],
    },
  ],
});

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结合 vscode 保存自动修复 ESLint 错误的功能，效果如下：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/12/173419847a533cca~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="更多的应用场景" tabindex="-1"><a class="header-anchor" href="#更多的应用场景" aria-hidden="true">#</a> 更多的应用场景</h2><p>除了上面说的硬编码的场景，还可以将沉淀出的最佳实践和业务规范通过自定义 <code>ESLint</code> 的方式来提示开发者，这对于多人协助、代码维护、代码风格的一致性都会有很大的帮助。</p><p>更多的应用场景有：</p><ul><li>Input 必须要有 <code>maxlength</code> 属性，防止请求的后端接口数据库异常</li><li>代码中不能出现加减乘除等计算，如果需要计算应该引入工具函数，来控制由于前端浮点数计算引起的 Bug</li><li>规范限制，单位元的两边的括号要用英文括号，不能用中文括号，来达到交互展示统一的效果</li><li>代码中不能使用 OSS 地址的静态资源路径，应该使用 CDN 地址的资源路径</li><li>...</li></ul><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2><ul><li>&lt;https://developer.mozilla.org/zh-CN/docs/Mozilla/Projects/SpiderMonkey/Parser_API&gt;</li><li>&lt;https://eslint.org/docs/developer-guide/working-with-rules&gt;</li></ul><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,21),P={href:"https://juejin.im/editor/posts/5eef64de518825658c1ad1f6",target:"_blank",rel:"noopener noreferrer"},I={href:"https://juejin.cn/post/6844904182822993927",target:"_blank",rel:"noopener noreferrer"},B=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),n(" 招贤纳士")],-1),F=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),K=e("p",null,[n("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),V=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/24/1737e6194e9c083d~tplv-t2oaga2asx-image.image",alt:""})],-1);function $(J,M){const i=r("ExternalLinkIcon");return l(),t("div",null,[u,e("p",null,[n("> 这是第 60 篇不掺水的原创，想获取更多原创好文，请扫 👆 上方二维码关注我们吧~ 本文首发于政采云前端团队博客："),e("a",c,[n("自定义 ESLint 规则，让代码持续美丽"),a(i)])]),m,e("p",null,[n("ESLint 是一个代码检查工具，通过静态的分析，寻找有问题的模式或者代码。默认使用 "),e("a",v,[n("Espree"),a(i)]),n(" 解析器将代码解析为 "),p,n(" 抽象语法树，然后再对代码进行检查。")]),e("p",null,[n("看下最简单的一段代码使用 "),b,n(" 解析器转换成的抽象语法树结构，此处可以使用 "),e("a",g,[n("astexplorer"),a(i)]),n(" 快速方便查看解析成 "),h,n(" 的结构：")]),q,e("p",null,[n("对目标代码进行语法树解析，可使用 "),e("a",x,[n("astexplorer"),a(i)])]),_,f,e("p",null,[n("下面是一个规则简单的结构（"),e("a",y,[n("官方API文档说明"),a(i)]),n("）")]),L,e("p",null,[n("使用上面的这个规则，结合编辑器就有了对整个 "),S,n(" 节点的提示，如果需要更精确的错误或警告提示，我们可以使用 "),E,n(" 参数， "),e("a",T,[j,n(" 文档说明"),a(i)]),n(" 。")]),k,e("p",null,[n("基于 "),e("a",w,[z,a(i)]),n(" ，可以快速创建 "),R,n(" 项目。")]),A,e("p",null,[n("此处涉及 "),C,n(" 的规则设置（"),e("a",N,[n("参考说明"),a(i)]),n("）")]),D,e("p",null,[e("a",P,[n("分分钟教会你搭建企业级的 npm 私有仓库"),a(i)])]),e("p",null,[e("a",I,[n("一份值得收藏的 Git 异常处理清单"),a(i)])]),B,F,K,V])}const Y=d(o,[["render",$],["__file","自定义 ESLint 规则，让代码持续美丽.html.vue"]]);export{Y as default};
