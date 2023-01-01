import{_ as s,z as d,A as r,Y as e,C as a,U as t,a6 as n,Q as o}from"./framework-cb9358d9.js";const l={},c=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/22/17239e3edd804567~tplv-t2oaga2asx-image.image",alt:""})],-1),m=e("br",null,null,-1),u={href:"https://www.zoo.team/article/document-site",target:"_blank",rel:"noopener noreferrer"},p=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/19/17190e5e126be436~tplv-t2oaga2asx-image.image",alt:""})],-1),v=e("h2",{id:"前言",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),a(" 前言")],-1),h={href:"https://juejin.cn/post/6844903933580673032#heading-11",target:"_blank",rel:"noopener noreferrer"},g=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/19/17190e3f3daf192d~tplv-t2oaga2asx-image.image",alt:"前言"})],-1),b=e("p",null,"通过检测报告，我们可以清楚地了解到我们的页面在性能方面有哪些不足和有待提高的地方，并且针对每一个扣分项，我们都提供了详细的扣分原因，以及解决方案。",-1),f=e("p",null,"我们的系统是面向前端团队所有的开发同学，因此我们需要将我们的解决方案沉淀下来，群策群力，共同丰富优化性能的知识库，所以我们需要文档站点，一个可以实时编辑，自动部署的文档站点。",-1),_={href:"https://docsify.js.org/#/?id=docsify",target:"_blank",rel:"noopener noreferrer"},x={href:"http://gitbook.hushuang.me/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://vuepress.vuejs.org/zh/guide/",target:"_blank",rel:"noopener noreferrer"},q=n(`<h2 id="需求" tabindex="-1"><a class="header-anchor" href="#需求" aria-hidden="true">#</a> 需求</h2><ul><li>文档用 Markdown 编写，最终生成 Html</li><li>文档可以实时编辑，而不是修改 Html 代码</li><li>Markdown 文件修改后，文档站点自动更新</li></ul><h2 id="方法一-eggjs-marked-highlight-js" tabindex="-1"><a class="header-anchor" href="#方法一-eggjs-marked-highlight-js" aria-hidden="true">#</a> 方法一：EggJS + marked + highlight.js</h2><ul><li>将文档以 Markdown 的形式放在 Gitlab 中，以便文档的维护</li><li>熟悉 Git 的小伙伴知道 Gitlab 是可以设置钩子（Hook) 的，通过设置钩子可以实现当我们提交代码后，服务端知道在哪个分支修改了哪些文件，然后把更新后的文档重新转化成 Html 文件</li><li>在设置 Gitlab Webhook 时，只需选择 push event 就好，这样 Hook 就只会在 push 的时候触发，一个完整的 push event 返回的数据字段很多，对于我们来说，下面两个字段就足够了</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  ref: &amp;#39;&amp;#39;				// 分支名
  commits: [			// 提交内容
    {
      added: [],		// 新增的文件路径
      modified: [],		// 修改的文件路径
      removed: []	    // 删除的文件路径
    }
  ],
  ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整个流程大致如下：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/20/1719622284e432fe~tplv-t2oaga2asx-image.image" alt="63CCF325-2676-420C-B793-0803B226F8DB.png"></p><p>模板文件即除了 Markdown 外的文件，譬如布局、样式、脚本等，这些公用文件有变动后需要将整个站点重新构建一遍。</p><p>在这个流程中，服务端需要开发两个接口，一个用来响应 Gitlab 的 Webhook，另一个是用来进行手动批量生成。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// document.router.ts
import { Application } from &amp;quot;egg&amp;quot;;
export default (app: Application): void =&amp;gt; {
  const { controller, router } = app;
  // gitlab webhook
  router.post(&amp;quot;/api/hook&amp;quot;, controller.document.hook);
  router.get(&amp;quot;/api/batchUpdate&amp;quot;, controller.document.batchUpdate);
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="webhook" tabindex="-1"><a class="header-anchor" href="#webhook" aria-hidden="true">#</a> Webhook</h3><p>在设置 Webhook 的时候，我们只需选择 push event，这样就会在 push 的时候，才会触发 Hook，为了保证文档的规范，只对 Master 分支的 pushevent 进行操作。</p><p><strong>Webhooks 配置：</strong></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/19/17190e3f3fdc6009~tplv-t2oaga2asx-image.image" alt="image-20191130105149305"></p><p><strong>代码示例：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const { commits, ref }: { commits: any[]; ref: string } = pushEvent;
// 过滤非master分支的push
if (!isMaster(ref)) {
  return false;
}
// 修改(新增)文档列表
const updateList: string[] = [];
// 删除文档列表
const removeList: string[] = [];
commits.forEach((item: Commits) =&amp;gt; {
  const { added, modified, removed } = item;
  updateList.push(...added, ...modified);
  removeList.push(...removed);
});
// 过滤重复文件
const uniqueUpdateList: string[] = [...new Set(updateList)];
const uniqueRemoveList: string[] = [...new Set(removeList)];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在得到要更新的集合 <code>uniqueUpdateList</code> 后，就要将对应的 Markdown 文件内容转为 Html，如何获取到 Git 上的单个文件呢，我们可以从 <code>uniqueUpdateList</code> 得知新增或修改的文件路径，然后我们需要借助 GitLab Open Api 中的<code>\${gitLabhost}/api/v3/projects/\${projectId}/repository/files?file_path=\${filePath}&amp;amp;ref=master&amp;amp;private_token=\${accessToken}</code>获取对应文件的内容，完整的返回如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  file_name: &amp;quot;&amp;quot;, 			// 文件名称
  file_path: &amp;quot;&amp;quot;, 			// 文件路径
  size: 700,		 		// 文件大小
  encoding: &amp;quot;base64&amp;quot;,	    // 编码方式
  content: &amp;quot;&amp;quot;, 				// 文件内容
  ref: &amp;quot;master&amp;quot;,			// 分支名
	...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这个接口可拿到 base64 编码的文件内容，转换成 <code>uft-8</code> 后就是我们需要的 Markdown 文档了。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>new Buffer(content, &amp;quot;base64&amp;quot;).toString(&amp;quot;utf8&amp;quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,20),j={href:"https://yarnpkg.com/zh-Hant/package/marked",target:"_blank",rel:"noopener noreferrer"},y={href:"https://yarnpkg.com/zh-Hant/package/highlight.js",target:"_blank",rel:"noopener noreferrer"},w=n(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import * as marked from &amp;quot;marked&amp;quot;;
import * as hljs from &amp;quot;highlight.js&amp;quot;;
marked.setOptions({
  // 设置高亮
  highlight(code, lang) {
    if (lang &amp;amp;&amp;amp; hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code, true).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  }
});
const customRender = new marked.Renderer();
const htmlStr: string = marked(markdownStr, { renderer: customRender });
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="全量生成" tabindex="-1"><a class="header-anchor" href="#全量生成" aria-hidden="true">#</a> 全量生成</h3>`,2),L={href:"https://yarnpkg.com/zh-Hant/package/git-clone",target:"_blank",rel:"noopener noreferrer"},G=n(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>gitClone(repo, targetPath, {}, () =&amp;gt; {
  ...
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来就是读取临时文件夹中 Markdown 文件内容，结合页面模板转化为 Html 。</p><p>页面模板及即除了文档内容 Markdown 外的文件，譬如布局、公用头部、左侧菜单、样式、脚本等。</p><p>然后将前面生成的正文内容注入到准备好的模板中，这里使用的模板引擎是 Ejs，就可以得到如下页面：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/19/17190e3f412d1e6c~tplv-t2oaga2asx-image.image" alt="image-20191125211921359"></p><h2 id="方法二-nestjs-docsify" tabindex="-1"><a class="header-anchor" href="#方法二-nestjs-docsify" aria-hidden="true">#</a> 方法二：NestJS + docsify</h2><p>本着折腾的精神，上述方法是我们组的小伙伴自己实现了 docsify 类似的方案，细节方面的设计着实比不上开源的那些产品，所以我们决定再折腾一次，迁移到了方案二：node.js + docsify。服务端负责处理 Webhooks 来拉取 Gitlab 上最新的文档文件，docsify 负责实时编译文档。</p><p>docsify 是一个动态生成文档网站的工具。不同于 GitBook、Hexo 的是，它不会在服务端编译时将 md 文件转成 html 文件，所有转换工作都是在浏览器端执行的。docsify 已经提供了实施编译 md 文件的功能，剩下我们需要实现的部分就是在 GitLab 上的文件有更新时，自动触发服务重新拉取最新的 md 文件。</p><p>改造后的流程：</p><ul><li>文档贡献者在 Gitlbab 上编辑源文件</li><li>编辑完成保存后触发 Gitlab 的 Webhooks</li><li>文档服务接收到 webhooks 请求后拉取最新的文档</li><li>用户刷新页面后 docsify 实时把最新的 md 文件转化为 Html</li></ul><h3 id="服务端核心代码" tabindex="-1"><a class="header-anchor" href="#服务端核心代码" aria-hidden="true">#</a> 服务端核心代码</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// app.controller.ts
import { Controller, Post } from &amp;quot;@nestjs/common&amp;quot;;
import * as execa from &amp;quot;execa&amp;quot;;
@Controller()
export class AppController {
  @Post(&amp;quot;hook&amp;quot;)
  async hook() {
    // 执行命令 git pull，拉取最新代码
    const { stdout } = await execa(&amp;quot;git&amp;quot;, [&amp;quot;pull&amp;quot;]);
    return stdout;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// main.ts
import { NestFactory } from &amp;quot;@nestjs/core&amp;quot;;
import { AppModule } from &amp;quot;./app.module&amp;quot;;
import { join } from &amp;quot;path&amp;quot;;
import { Logger } from &amp;quot;@nestjs/common&amp;quot;;
const port = parseInt(p<wbr>rocess.env.PORT, 10) || 3001;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(&amp;quot;api&amp;quot;);
  app.useStaticAssets(join(__dirname, &amp;quot;..&amp;quot;, &amp;quot;docs&amp;quot;));
  await app.listen(port);
  Logger.log(\`服务已启动，请访问 http://localhost:\${port}\`);
}
bootstrap();

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="效果图" tabindex="-1"><a class="header-anchor" href="#效果图" aria-hidden="true">#</a> 效果图</h3><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/19/17190e3f438d6116~tplv-t2oaga2asx-image.image" alt="效果图"></p><p>点击编辑文档即可进入文档对应的 Gitlab 页面进行编辑。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/19/17190e3f757d6dcd~tplv-t2oaga2asx-image.image" alt="GitLab 编辑"></p><h3 id="方案对比" tabindex="-1"><a class="header-anchor" href="#方案对比" aria-hidden="true">#</a> 方案对比</h3><p>方案二和方案一不同的地方就是把 md 文件渲染成 Html 的一步从服务端改到了浏览器端，服务器端只承担接收 Webhook 拉取最新的代码的工作。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/20/1719622db1fa9d27~tplv-t2oaga2asx-image.image" alt="fD4H17kx4AkM4dG5.png"></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>以上提供了一个不用 GitLlab CI 实现文档站点内容修改后自动更新的思路。 一个顺手的文档站点搭好之后，接下来我们就只需要关心如何把 Markdown 写好推送到 GitLab，其它的工作服务器都会帮我们完成。</p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,23),H={href:"https://juejin.cn/post/6844903988081475591",target:"_blank",rel:"noopener noreferrer"},M={href:"https://juejin.cn/post/6844904038555729927",target:"_blank",rel:"noopener noreferrer"},C=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),a(" 招贤纳士")],-1),A=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),B=e("p",null,[a("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),S=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image",alt:""})],-1);function W(z,E){const i=o("ExternalLinkIcon");return d(),r("div",null,[c,e("p",null,[a("> 这是第 47 篇不掺水的原创，想获取更多原创好文，请扫 👆上方二维码关注我们吧~"),m,a(" > 本文首发于政采云前端团队博客："),e("a",u,[a("前端文档站点搭建方案"),t(i)])]),p,v,e("p",null,[a("在 "),e("a",h,[a("《自动化 Web 性能优化分析方案》"),t(i)]),a(" 一文中说到，百策系统的性能检测的原理，以及对于检测页面我们最终会生成一份检测报告，如下图所示：")]),g,b,f,e("p",null,[a("目前现有的文档站点方案有 "),e("a",_,[a("docsify"),t(i)]),a("、"),e("a",x,[a("gitbook"),t(i)]),a("、"),e("a",k,[a("vuepress"),t(i)]),a(" 等，也有着相对丰富的插件和主题，但是布局较为单一，灵活性不足。")]),q,e("p",null,[a("接下来需要将 Markdown 转换成 Html，Markdown 转 Html 使用的是 "),e("a",j,[a("marked"),t(i)]),a("，代码高亮使用的是 "),e("a",y,[a("highlight.js"),t(i)])]),w,e("p",null,[a("为了保证使用最新的模板和文档生成 html，每次全量生成之前，都需要从 GitLab 拉取完整的项目，拉取代码使用的是 "),e("a",L,[a("git-clone"),t(i)])]),G,e("p",null,[e("a",H,[a("可能是最全的 “文本溢出截断省略” 方案合集"),t(i)])]),e("p",null,[e("a",M,[a("图文并茂，为你揭开“单点登录“的神秘面纱"),t(i)])]),C,A,B,S])}const P=s(l,[["render",W],["__file","前端文档站点搭建方案.html.vue"]]);export{P as default};
