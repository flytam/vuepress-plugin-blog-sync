import{_ as s,z as o,A as d,Y as e,C as a,U as i,a6 as t,Q as l}from"./framework-cb9358d9.js";const r={},c=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8d2b0103c1fa~tplv-t2oaga2asx-image.image",alt:""})],-1),m=e("h2",{id:"",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#","aria-hidden":"true"},"#"),a(" **")],-1),u=e("p",null,'<table><tbody><tr><td bgcolor="#FDFFE7"><font size="4">原创不易，希望能关注下我们，再顺手点个赞~~<font></font></font></td></tr></tbody></table> **',-1),p={href:"https://www.zoo.team/article/vscode-extension",target:"_blank",rel:"noopener noreferrer"},v=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/9/16e50a196b74e7c9~tplv-t2oaga2asx-image.image",alt:"沫沫.png"})],-1),h=e("h2",{id:"前言",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),a(" 前言")],-1),b={href:"https://marketplace.visualstudio.com/VSCode",target:"_blank",rel:"noopener noreferrer"},g=e("h2",{id:"快速上手",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#快速上手","aria-hidden":"true"},"#"),a(" 快速上手")],-1),q={href:"https://github.com/Angela-Chen/vscode-test-extension",target:"_blank",rel:"noopener noreferrer"},_=t(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/10/16db5d099be19da0~tplv-t2oaga2asx-image.image" alt="demo"></p><h4 id="开发环境准备" tabindex="-1"><a class="header-anchor" href="#开发环境准备" aria-hidden="true">#</a> 开发环境准备</h4><ul><li><p>Visual Studio Code</p></li><li><p>Nodejs，建议使用 LTS 版本</p></li><li><p>Npm</p></li><li><p>官方推荐使用的脚手架工具 Yeoman 和 Generator-code</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npm install -g yo generator-code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>插件打包和发布工具 vsce</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npm install -g vsce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h4 id="脚手架使用" tabindex="-1"><a class="header-anchor" href="#脚手架使用" aria-hidden="true">#</a> 脚手架使用</h4><ol><li><pre><code>执行以下命令：
</code></pre></li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yo code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>选择 New Extension 类型，然后依次填写插件名称、描述、包管理工具等基础信息。</li></ol><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/10/16db5d099bc2230b~tplv-t2oaga2asx-image.image" alt="image-20191008010946040"></p><p>&gt; PS：脚手架工具支持创建插件（New Extension）、主题（New Color Theme）、新语言支持（New Language Support）、代码片段（New Code Snippets）、键盘映射（New Keymap）、插件包（New Extension Pack）。以上不同类型的脚手架模板只是侧重的预设功能不同，其本质还是 VSCode 插件。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/10/16db5d099d839f4b~tplv-t2oaga2asx-image.image" alt="image-20191008020123600"></p><h4 id="snippets-代码片段自动补全" tabindex="-1"><a class="header-anchor" href="#snippets-代码片段自动补全" aria-hidden="true">#</a> Snippets 代码片段自动补全</h4><ol><li><pre><code>添加 Snippets 配置项
</code></pre></li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// package.json
...
&amp;quot;contributes&amp;quot;: {
	&amp;quot;snippets&amp;quot;: [
     	{
            &amp;quot;language&amp;quot;: &amp;quot;javascript&amp;quot;,
            &amp;quot;path&amp;quot;: &amp;quot;./snippets/javascript.json&amp;quot;
	  	},
		{
            &amp;quot;language&amp;quot;: &amp;quot;typescript&amp;quot;,
            &amp;quot;path&amp;quot;: &amp;quot;./snippets/javascript.json&amp;quot;
		},
        ...
		]
	},
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 package.json 的 contributes 下添加自定义的 Snippets。language 表示在某种特定语言下，对应的代码片段才会被加载生效。 path 表示代码片段文件的存放路径。上面配置即表示 javascript 或 typescript 语言环境下，将加载 ./snippets/javascript.json 文件中的代码片段。</p><ol start="2"><li><pre><code>编写 Snippets 代码片段
</code></pre></li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// ./snippets/javascript.json
{
  &amp;quot;forEach&amp;quot;: {
    &amp;quot;prefix&amp;quot;: &amp;quot;fe&amp;quot;,
    &amp;quot;body&amp;quot;: [
      &amp;quot;\${1:array}.forEach(function(item) {&amp;quot;,
      &amp;quot;\\t\${2:// body}&amp;quot;,
      &amp;quot;});&amp;quot;
    ],
    &amp;quot;description&amp;quot;: &amp;quot;Code snippet for \\&amp;quot;forEach\\&amp;quot;&amp;quot;
  },
  &amp;quot;setTimeout&amp;quot;: {
    &amp;quot;prefix&amp;quot;: &amp;quot;st&amp;quot;,
    &amp;quot;body&amp;quot;: [
      &amp;quot;setTimeout(function() {&amp;quot;,
      &amp;quot;\\t\${0:// body}&amp;quot;,
      &amp;quot;}, \${1:1000});&amp;quot;
    ],
    &amp;quot;description&amp;quot;: &amp;quot;Code snippet for &amp;#39;setTimeout&amp;#39;&amp;quot;
  }
  ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述例子中：</p><ul><li><strong>forEach</strong>、<strong>setTimeout</strong> 是代码片段的名称。</li><li><strong>prefix</strong> 中定义一个或多个（设置数组时可以指定多个）触发词（trigger words），当用户输入内容是触发词时编辑器会弹出自动补全提示。</li><li><strong>body</strong> 中定义的就是填充的代码段内容。body 中可以使用占位符（placeholders），如上面的 <code>\${1:array}</code>、 <code>{2:// body}</code>，使用占位符方便在引用代码段的时候可以通过 tab 键快速切换跳转到对应位置编辑。冒号前面的序号表示切换的顺序，冒号后面的内容则是占位显示的默认文本。</li><li><strong>description</strong> 顾名思义就是代码段的描述说明，编辑器弹出补全提示的时候会展示该描述，如果没有设置 description 字段，那么会直接展示代码段名称。</li></ul><p>至此，插件的编码工作已经完成，是不是很简单~ 接下去，我们运行插件看下效果。</p><h4 id="运行调试" tabindex="-1"><a class="header-anchor" href="#运行调试" aria-hidden="true">#</a> 运行调试</h4><p>选择 VSCode 的调试菜单（command+shift+D），点击运行按钮，弹出一个名为扩展开发主机的窗口，这个窗口就是包含这个插件的临时调试窗口。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/10/16db5d099dd28ba7~tplv-t2oaga2asx-image.image" alt="image-20191008042543659"></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/10/16db5d099be19da0~tplv-t2oaga2asx-image.image" alt="demo"></p><h4 id="打包和发布" tabindex="-1"><a class="header-anchor" href="#打包和发布" aria-hidden="true">#</a> 打包和发布</h4><h4 id="打包" tabindex="-1"><a class="header-anchor" href="#打包" aria-hidden="true">#</a> 打包</h4><p>打包命令：<code>vsce package</code>，打包完成后会生成 .vsix 后缀的安装包。如果插件仅为个人或者团队内部共享，那么手动安装即可使用，无需发布到 VSCode 插件市场。</p><h4 id="发布" tabindex="-1"><a class="header-anchor" href="#发布" aria-hidden="true">#</a> 发布</h4>`,27),x=e("code",null,"vsce publish",-1),f={href:"https://dev.azure.com",target:"_blank",rel:"noopener noreferrer"},j={href:"https://code.visualstudio.com/api/working-with-extensions/publishing-extension",target:"_blank",rel:"noopener noreferrer"},k=t(`<h2 id="插件详解" tabindex="-1"><a class="header-anchor" href="#插件详解" aria-hidden="true">#</a> 插件详解</h2><h4 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.
├── .vscode
	├── launch.json  # 插件加载和调试的配置
├── CHANGELOG.md  # 变更记录
├── extension.js  # 插件执行入口文件
├── jsconfig.json  # JavaScript 类型检查配置
├── node_modules 
├── package-lock.json
├── package.json  # 声明当前插件相关信息
├── README.md  # 插件使用说明
└── vsc-extension-quickstart.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="核心文件" tabindex="-1"><a class="header-anchor" href="#核心文件" aria-hidden="true">#</a> 核心文件</h4><p><strong>1. package.json：插件的声明文件，包含 2 个重要配置项 activationEvents、contributes。</strong></p><ul><li>activationEvents 用于定义插件何时被加载/激活。例子中用到的是onCommand，在 Hello World 命令被调用时，插件才会被激活。目前支持 9 种激活事件： <ul><li><code>onLanguage:\${language}</code> 打开特定语言文件时</li><li><code>onCommand:\${command}</code> 调用某个 VSCode命令时</li><li><code>onDebug</code> Debug 时</li><li><code>workspaceContains:\${toplevelfilename}</code> 当打开包含某个命名规则的文件夹时</li><li><code>onFileSystem:\${scheme}</code> 以某个协议（ftp/sftp/ssh等）打开文件或文件夹时</li><li><code>onView:\${viewId}</code> 指定 id 的视图展开时</li><li><code>onUri</code> 插件的系统级 URI 打开时</li><li><code>onWebviewPanel</code> webview 触发时</li><li><code>*</code> VSCode 启动时。不建议使用，性能上会受到一定影响。</li></ul></li></ul><p>&gt; PS：出于性能考虑，插件都是懒加载的，只有特定场景下才会加载/激活，才会消耗内存等资源。</p><ul><li>contributes 用于定义扩展项的具体配置。常用扩展项有代码片段（snippets）、命令（commands）、菜单（menus）、快捷键（keybindings）、主题（themes）。通常完成命令的开发后，会将其与菜单/快捷键进行关联，以便调用。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// package.json
{
  // 插件名称
  &amp;quot;name&amp;quot;: &amp;quot;vscode-test-extension&amp;quot;,
  // 显示名称
  &amp;quot;displayName&amp;quot;: &amp;quot;vscode-test-extension&amp;quot;,
  // 描述信息
  &amp;quot;description&amp;quot;: &amp;quot;An awesome vscode extension&amp;quot;,
  // 版本号 semver格式
  &amp;quot;version&amp;quot;: &amp;quot;0.0.1&amp;quot;,
  // 在插件市场展示的图标
  &amp;quot;icon&amp;quot;: &amp;quot;icon.png&amp;quot;,
  // 发布者名字
  &amp;quot;publisher&amp;quot;: &amp;quot;chenmenglan&amp;quot;,
  // 插件最低支持的vscode版本号
  &amp;quot;engines&amp;quot;: {
    &amp;quot;vscode&amp;quot;: &amp;quot;^1.12.0&amp;quot;
  },
  // 所属分类，可选 Languages/Snippets/Linters/Themes/Other 等等
  &amp;quot;categories&amp;quot;: [&amp;quot;Snippets&amp;quot;, &amp;quot;Other&amp;quot;],
  // 加载/激活方式
  &amp;quot;activationEvents&amp;quot;: [&amp;quot;onCommand:extension.helloWorld&amp;quot;],
  // 入口文件路径
  &amp;quot;main&amp;quot;: &amp;quot;./extension.js&amp;quot;,
  // 注册扩展项配置
  &amp;quot;contributes&amp;quot;: {
		&amp;quot;commands&amp;quot;: [
			{
				&amp;quot;command&amp;quot;: &amp;quot;extension.helloWorld&amp;quot;,
				&amp;quot;title&amp;quot;: &amp;quot;Hello World&amp;quot;
			}
		],
      	&amp;quot;snippets&amp;quot;: [
     		{
                &amp;quot;language&amp;quot;: &amp;quot;javascript&amp;quot;,
                &amp;quot;path&amp;quot;: &amp;quot;./snippets/javascript.json&amp;quot;
	  		},
        ...
		]
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. extension.js：插件的执行入口文件，通常包括激活（activate）和禁用（deactivate）2 个方法。命令必须先使用 vscode.commands.registerCommand 进行注册，然后将返回的实例添加至 context.subscriptions 中。当命令被激活时，会执行相应的回调方法。</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const vscode = require(&amp;#39;vscode&amp;#39;);

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log(&amp;#39;Congratulations, your extension &amp;quot;vscode-test-extension&amp;quot; is now active!&amp;#39;);

	let disposable = vscode.commands.registerCommand(&amp;#39;extension.helloWorld&amp;#39;, function () {
		// 右下角消息提示
        vscode.window.showInformationMessage(&amp;#39;Hello World!&amp;#39;);
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

exports.deactivate = deactivate;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h2>`,12),y={href:"https://code.visualstudio.com/api/extension-guides/overview",target:"_blank",rel:"noopener noreferrer"},C=e("h2",{id:"插件推荐",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#插件推荐","aria-hidden":"true"},"#"),a(" 插件推荐")],-1),S={href:"https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag",target:"_blank",rel:"noopener noreferrer"},w={href:"https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag",target:"_blank",rel:"noopener noreferrer"},N={href:"https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer",target:"_blank",rel:"noopener noreferrer"},V={href:"https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify",target:"_blank",rel:"noopener noreferrer"},E={href:"https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint",target:"_blank",rel:"noopener noreferrer"},T={href:"https://marketplace.visualstudio.com/items?itemName=ionutvmi.path-autocomplete",target:"_blank",rel:"noopener noreferrer"},D={href:"https://marketplace.visualstudio.com/items?itemName=joelday.docthis",target:"_blank",rel:"noopener noreferrer"},I={href:"https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight",target:"_blank",rel:"noopener noreferrer"},A={href:"https://gitlens.amod.io/",target:"_blank",rel:"noopener noreferrer"},L=t('<p>还有其他好用的插件，欢迎补充~~</p><h2 id="招贤纳士" tabindex="-1"><a class="header-anchor" href="#招贤纳士" aria-hidden="true">#</a> 招贤纳士</h2><p>招人，前端，隶属政采云前端大团队（ZooTeam），50 余个小伙伴正等你加入一起浪～ 如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变“5年工作时间3年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手参与一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给<code>ZooTeam@cai-inc.com</code></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>',5),$={href:"https://juejin.cn/post/6844903959224664077",target:"_blank",rel:"noopener noreferrer"},W={href:"https://juejin.cn/post/6844903950508883982",target:"_blank",rel:"noopener noreferrer"},P={href:"https://juejin.cn/post/6844903938018263048",target:"_blank",rel:"noopener noreferrer"},z={href:"https://juejin.cn/post/6844903933580673032",target:"_blank",rel:"noopener noreferrer"};function H(Y,O){const n=l("ExternalLinkIcon");return o(),d("div",null,[c,m,u,e("p",null,[a("> 本文首发于政采云前端团队博客： "),e("a",p,[a("DIY VSCode 插件，让你的开发效率突飞猛进"),i(n)])]),v,h,e("p",null,[a("Visual Studio Code（简称 VSCode）凭借其占用内存小、文件加载快、稳定性好、插件丰富等等特点，从众多 IDE 中脱颖而出，受到了广大开发人员的青睐。工欲善其事，必先利其器。选择适合自己的 VSCode 插件，能够让你的开发效率突飞猛进。"),e("a",b,[a("VSCode 插件市场"),i(n)]),a(" 上面插件百花齐放，但实际开发过程中问题复杂且多变，有时候并不能找到完全满足你实际开发需求的插件，那就自己动手 DIY 一个吧。VSCode 提供以下扩展能力：代码自动补全、自定义命令/菜单/快捷键、悬浮提示、自定义跳转、主题定制、自定义 WebView 等等。你可以根据自己的需要随意组合使用。")]),g,e("p",null,[a("> 接下来，将以一个简单的代码片段自动补全插件为例，让大家 10 分钟快速上手。代码片段自动补全也是大家编写代码时使用频率最高、最能帮助提高编码速度的功能。"),e("a",q,[a("Demo源码"),i(n)])]),_,e("p",null,[a("发布命令："),x,a("。发布需要发布者账号，前往 "),e("a",f,[a("Azure DevOps"),i(n)]),a(" 注册，注册后需申请 Personal Access Tokens ，详细申请细节见 "),e("a",j,[a("说明文档"),i(n)]),a("。")]),k,e("p",null,[a("如果你重复处理同一类问题超过 3 次，那么是时候该停下来思考下如何来化繁为简了。不妨花上些时间，梳理下使用频率最高或者最佳实践的代码片段，DIY 一个自己的插件，将重心放到更核心更复杂代码逻辑上。丰富的 "),e("a",y,[a("扩展 API"),i(n)]),a(" 让一切都比想象中来的简单，Just do what you want~")]),C,e("p",null,[e("a",S,[a("Auto Close Tag"),i(n)]),a("，自动补全关闭标签。")]),e("p",null,[e("a",w,[a("Auto Rename Tag"),i(n)]),a("，自动重命名标签。")]),e("p",null,[e("a",N,[a("Bracket Pair Colorizer"),i(n)]),a("，括号配对着色，方便查看多层嵌套的代码。")]),e("p",null,[e("a",V,[a("Beautify"),i(n)]),a("，快速格式化代码。")]),e("p",null,[e("a",E,[a("ESLint"),i(n)]),a("，语法规则和代码风格的检查工具。")]),e("p",null,[e("a",T,[a("Path Autocomplete"),i(n)]),a("，文件路径自动补全。")]),e("p",null,[e("a",D,[a("Document This"),i(n)]),a("，快速生成注释。")]),e("p",null,[e("a",I,[a("Todo Highlighter"),i(n)]),a("，高亮标记 TODO 注释，以便更容易追踪任何未完成的业务。")]),e("p",null,[e("a",A,[a("GitLens"),i(n)]),a("，增强了 VSCode 中内置的Git功能，包括查看代码作者、查看历史提交记录等等。")]),L,e("p",null,[e("a",$,[a("写给前端工程师的 Serverless 入门"),i(n)])]),e("p",null,[e("a",W,[a("前端工程实践之可视化搭建系统（一）"),i(n)])]),e("p",null,[e("a",P,[a("看完这篇，你也能把 React Hooks 玩出花"),i(n)])]),e("p",null,[e("a",z,[a("自动化 Web 性能优化分析方案"),i(n)])])])}const G=s(r,[["render",H],["__file","DIY VSCode 插件，让你的开发效率突飞猛进.html.vue"]]);export{G as default};
