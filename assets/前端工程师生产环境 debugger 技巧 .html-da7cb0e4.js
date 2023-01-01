import{_ as c,z as p,A as d,Y as e,C as a,U as t,a6 as r,Q as s}from"./framework-cb9358d9.js";const n={},i=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4eb6a01e6564840817b127265b07edd~tplv-k3u1fbpfcp-zoom-1.image",alt:""})],-1),h=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d43ef4a0f0b40e29bc62bca0545b9ff~tplv-k3u1fbpfcp-zoom-1.image",alt:"七喜.png"})],-1),l={href:"https://zoo.team/article/prod-debugger",target:"_blank",rel:"noopener noreferrer"},u=r('<h3 id="导言" tabindex="-1"><a class="header-anchor" href="#导言" aria-hidden="true">#</a> 导言：</h3><p>开发环境 debug 是每个程序员上岗的必备技能。生产环境呢？虽然生产环境 debug 是一件非常不优雅的行为，但是由于种种原因，我们又不得不这么干。</p><p>那我们今天讲一讲如何使用 chrome 在生产环境进行 debug 。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63591bb025874ec9b00b751e2cbd5ba0~tplv-k3u1fbpfcp-zoom-1.image" alt="7e948b4dly1fpx1er67lng20ak07xb2f.gif"></p><h2 id="生产环境-debug-步骤" tabindex="-1"><a class="header-anchor" href="#生产环境-debug-步骤" aria-hidden="true">#</a> 生产环境 debug 步骤</h2><p>生产环境 debug 需要几步？这问题和“把大象装进冰箱拢共分几步”一样简单。</p><p>第一步，把冰箱门打开。F12 打开 devTools；</p><p>第二步，把大象装进冰箱。找到需要 debug 的前端文件，格式化，打断点，调试上下文，定位问题；</p><p>第三部，关闭冰箱门。解决问题。</p><h2 id="如何快速定位错误是前端还是后端接口返回的" tabindex="-1"><a class="header-anchor" href="#如何快速定位错误是前端还是后端接口返回的" aria-hidden="true">#</a> 如何快速定位错误是前端还是后端接口返回的？</h2><p>在把大象装进冰箱之前，先初步判断下，是否真的需要由你将大象装进冰箱。</p><p>首先我们需要判断，错误是前端还是后端报的，那么如何快速判断？</p><h3 id="方案一-根据对代码的实现的了解-判断报错属于前端还是后端。" tabindex="-1"><a class="header-anchor" href="#方案一-根据对代码的实现的了解-判断报错属于前端还是后端。" aria-hidden="true">#</a> 方案一：根据对代码的实现的了解，判断报错属于前端还是后端。</h3><p>这个方案前提是需要你对代码实现很熟悉，也是最简单的方式。</p><h3 id="方案二-前端代码全局搜索关键字-工程代码里搜索-控制台打开搜索。" tabindex="-1"><a class="header-anchor" href="#方案二-前端代码全局搜索关键字-工程代码里搜索-控制台打开搜索。" aria-hidden="true">#</a> 方案二：前端代码全局搜索关键字，工程代码里搜索/控制台打开搜索。</h3><p>对应工程 gitlab 或者 vscode 或者 devTools global search 里去进行全局搜索。</p><h3 id="方案三-翻阅-network-面板中的请求。" tabindex="-1"><a class="header-anchor" href="#方案三-翻阅-network-面板中的请求。" aria-hidden="true">#</a> 方案三：翻阅 network 面板中的请求。</h3><p>翻阅 network 面板中的请求，看下返回的 <code>response</code> 是否携带错误提示，有则表示后端返回的；如果报错的接口刚好是以非<code>200</code> 的状态返回，或者是由新的操作触发调用接口，我们很快就能查找到对应的接口，如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f5b43ab41d64b028cf6f5e9945a8a5b~tplv-k3u1fbpfcp-zoom-1.image" alt="2.gif"></p><h3 id="方案四-使用-network-search-进行搜索。" tabindex="-1"><a class="header-anchor" href="#方案四-使用-network-search-进行搜索。" aria-hidden="true">#</a> 方案四：使用 network search 进行搜索。</h3><p>但是很多情况，接口业务错误会以 http status <code>200</code> 的状态码返回，如果此时请求了大量的接口（举个例子：进入页面调用了大量的接口，其中有一个接口返回了错误信息），那么除了逐个翻阅 network 这种低效的方式，chrome devTools 还提供了 network search 面板这种更便捷的方式，可以搜索接口详细信息（包括详细的返回信息），返回匹配结果。</p><p><strong>如何打开 network search 面板？</strong></p><p>在 network 面板中，按快捷键 <code>⌘ + F</code>（Mac）、 <code>CTRL + F</code>（Windows）可呼出 network search 面板。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf17fad33a6d423fae3ba953bcc389ff~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>如果确定需要你把大象装进冰箱，那把大象装进冰箱的技巧有哪些？</p><h2 id="如何快速定位到问题相关的代码" tabindex="-1"><a class="header-anchor" href="#如何快速定位到问题相关的代码" aria-hidden="true">#</a> 如何快速定位到问题相关的代码</h2><h3 id="global-search-全局搜素关键字-再定位到关键的代码" tabindex="-1"><a class="header-anchor" href="#global-search-全局搜素关键字-再定位到关键的代码" aria-hidden="true">#</a> global search ，全局搜素关键字，再定位到关键的代码</h3><p>chrome devTools 的 global search 是一个非常实用的一个功能，当你不知道需要调试的代码在哪个文件时，当你是一个非常大的系统，引用了很多的资源文件，你可以使用 global search 进行搜索关键字，这个操作会搜索所有加载进来的资源，点击搜索结果，就可以使用 source 面板打开对应的资源文件，然后格式化代码，再然后在当前的文件内 再次搜索关键字，打断点。</p><p><strong>打开 global search 快捷键：</strong></p><p><code>⌘ + ⌥ + F</code> （Mac），<code>CTRL + SHIFT + F</code> （Windows）</p><p>看下图例子，我们随便找个页面根据提示搜索代码：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/371985b59edf47f489e391383beaba5b~tplv-k3u1fbpfcp-zoom-1.image" alt="3.gif"></p><p>可以尝试使用哪些关键字进行搜索：</p><p>(1) 页面存在明确的报错信息，且已经明确该错误文案是写在前端代码中错误信息文案。提示信息在 coding 过程中一般是使用 字符串，压缩混淆过程中一般是不会进行处理的，会保留原文，当然代码打包构建过程中，对代码压缩混淆也可以选择对中文进行 unicode 转码，此时如果关键字是中文，就需要先转码再搜索了。</p><p>(2) 已知相关代码中存在的编译混淆后依然还保留的的关键代码，会向外暴露的方法名；</p><h2 id="如何-debug-混淆后的-js" tabindex="-1"><a class="header-anchor" href="#如何-debug-混淆后的-js" aria-hidden="true">#</a> 如何 debug 混淆后的 js ？</h2>',36),b={href:"https://todo.com/",target:"_blank",rel:"noopener noreferrer"},f=r('<p>我们用一个最简单的 demo ，对比一下代码生产环境构建编译前后的差距。</p><p>这里选择用 vue-cli 创建了一个最简单的 demo ，看下源代码和编译后的代码。</p><p>源代码：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76e6b856415144e59c6437bba4ad4894~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>构建编译后的代码（此处关闭了 sourceMap ）：</p><p><img src="https://www.zoo.team/images/upload/upload_fce83ca51e0f4d70862cc0dd9dfe4be5.png" alt=""></p><p>这里我们看到构建编译后的代码做了压缩混淆，出现了出现了大量大的 <code>a</code> 、<code>b</code> 、 <code>c</code> 、 <code>d</code> 替换了原有的函数方法名、变量名，编译后的代码已经不是能通过单纯的读代码码能读懂的了。但是我们通过 debug ，大概还是能看得懂。</p><p><img src="https://www.zoo.team/images/upload/upload_94731e8a959c034a032fdc1d12c21d7d.png" alt=""></p><p>那么有没有方式使用本地的 sourceMap 调试生产环境的代码？答案当然是有的。</p><p><img src="https://www.zoo.team/images/upload/upload_5774835438254344dccf73e8cbf95c61.png" alt=""></p><h2 id="如何在生产环境使用本地-sourcemap-调试" tabindex="-1"><a class="header-anchor" href="#如何在生产环境使用本地-sourcemap-调试" aria-hidden="true">#</a> <strong>如何在生产环境使用本地 sourceMap 调试？</strong></h2><p>第一步：打开混淆代码</p><p>第二步：右键 -&gt; 选择【Add source map】</p>',13),m={href:"https://www.npmjs.com/package/http-server",target:"_blank",rel:"noopener noreferrer"},g=r('<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61c0840552b54da099c0d37bfd89bb01~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p><img src="https://www.zoo.team/images/upload/upload_39273540fe28520bbe613b503ccf4adc.png" alt=""></p><p>关联上 sourceMap 后，我们就可以看到 sources -&gt; page 面板上的变化了</p><p><img src="https://www.zoo.team/images/upload/upload_b2879bb2e7218de862b32c7f2133fe32.png" alt=""></p><h2 id="如何在-chrome-中修改代码并调试" tabindex="-1"><a class="header-anchor" href="#如何在-chrome-中修改代码并调试" aria-hidden="true">#</a> 如何在 chrome 中修改代码并调试？</h2><p>开发环境中，我们可以直接在 IDE 中修改代码，代码的变更就直接更新到了浏览器中了。那么生产环境，我们可以直接在 chrome 中修改代码，然后立马看代码修改后的效果吗？</p><p>当然，你想要的 chrome devTools 都有。chrome devTools 提供了 local overrides 能力。</p><h3 id="local-overrides-如何工作的" tabindex="-1"><a class="header-anchor" href="#local-overrides-如何工作的" aria-hidden="true">#</a> <strong>local overrides 如何工作的？</strong></h3><p>指定修改后的文件的本地保存目录，当修改完代码保存的时候，就会将修改后的文件保存到你指定的目录目录下，当再次加载页面的时候，对应的文件不再读取网络上的文件，而是读取存储在本地修改过的文件。</p><h3 id="local-overrides-如何使用" tabindex="-1"><a class="header-anchor" href="#local-overrides-如何使用" aria-hidden="true">#</a> <strong>local overrides 如何使用？</strong></h3><p>首先，打开 sources 下的 overrides 面板；</p><p>然后，点击【select folder overrides】选择修改后的文件存储地址；</p><p>再然后，点击顶部的授权，确认同意；</p><p>最后，我们就可以打开文件修改，修改完成后保存，重新刷新页面后，修改后的代码就被执行到了。</p><p>⚠️注意，原js文件直接 format 是无法修改的；在代码 format 之前先添加无效代码进行代码变更进行保存，然后再 format 就可以修改； <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa1166e731cb484593919ba6d4e64601~tplv-k3u1fbpfcp-zoom-1.image" alt="11.gif"></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>chrome 调试技巧远远当然不只这些，以上只是生产环境 debug 的小技巧，祝愿大家用不到，最好的 bug 处理方式当然是事前，在上线前得到就解决；如果真的发生问题，如果做好监控和日志，在问题发生的第一时间发现并解决。</p><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>',18),_={href:"https://developer.chrome.com/docs/devtools/",target:"_blank",rel:"noopener noreferrer"},k=e("h2",{id:"号外号外",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#号外号外","aria-hidden":"true"},"#"),a(" 号外号外")],-1),w=e("p",null,"投票页一开, 好运自然来，掘金 2021 年度作者榜单开始打榜啦！",-1),v=e("p",null,"请大家动动小小指头，将手中的票投给我们。您的支持就是我们前行的最大动力，",-1),j={href:"https://rank.juejin.cn/rank/2021/3456520257288974?utm_campaign=annual_2021&utm_medium=self_web_share&utm_source=%E6%94%BF%E9%87%87%E4%BA%91%E5%89%8D%E7%AB%AF%E5%9B%A2%E9%98%9F",target:"_blank",rel:"noopener noreferrer"},x=e("li",null,"app 入口: 请滚动到文章最顶部，然后按下图操作↓",-1),z=r('<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2593ef5d2f94427a24f2499eb6db5a0~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2><ul><li>[sketch插件开发指南](https://juejin.cn/post/7033911797279096845 &quot;sketch插件开发指南&quot;)</li><li>[在 Vue 中为什么不推荐用 index 做 key](https://juejin.cn/post/7026119446162997261 &quot;在 Vue 中为什么不推荐用 index 做 key&quot;)</li><li>[浅析Web录屏技术方案与实现](https://juejin.cn/post/7028723258019020836 &quot;浅析Web录屏技术方案与实现&quot;)</li></ul><h2 id="开源作品" tabindex="-1"><a class="header-anchor" href="#开源作品" aria-hidden="true">#</a> 开源作品</h2><ul><li>政采云前端小报</li></ul>',5),y={href:"https://www.zoo.team/openweekly/",target:"_blank",rel:"noopener noreferrer"},T=e("ul",null,[e("li",null,"商品选择 sku 插件")],-1),E={href:"https://github.com/zcy-inc/skuPathFinder-back",target:"_blank",rel:"noopener noreferrer"},F=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),a(" 招贤纳士")],-1),M=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 60 余个前端小伙伴，平均年龄 27 岁，近 4 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),B=e("p",null,[a("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),q=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98d3aa3d1f8646a8bcda8cfd9e335a4b~tplv-k3u1fbpfcp-zoom-1.image",alt:""})],-1);function A(V,C){const o=s("ExternalLinkIcon");return p(),d("div",null,[i,h,e("p",null,[a("> 这是第 127 篇不掺水的原创，想获取更多原创好文，请搜索公众号关注我们吧~ 本文首发于政采云前端博客："),e("a",l,[a("前端工程师生产环境 debugger 技巧"),t(o)])]),u,e("p",null,[a("生产环境的 js 基本上都是混淆过的（"),e("a",b,[a("点击了解前端代码的压缩混淆"),t(o)]),a("），压缩混淆的优点就不赘述了，压缩混淆后随之来的是生产环境调试的难度，虽然通过打断点，勉强还能看的懂，但是已经很反人类了。")]),f,e("p",null,[a("第三步：输入本地 sourceMap 的地址（此处需要启用一个静态资源服务，可以使用 "),e("a",m,[a("http-server"),t(o)]),a("），完成。本地代码执行构建命令，注意需要打开 sourceMap 配置，编译产生出构建后的代码，此时构建后的结果会包含 sourceMap 文件。")]),g,e("ul",null,[e("li",null,[e("a",_,[a("https://developer.chrome.com/docs/devtools/"),t(o)])])]),k,w,v,e("ul",null,[e("li",null,[a("web 入口: "),e("a",j,[a("点我投票"),t(o)])]),x]),z,e("p",null,[e("strong",null,[a("开源地址 "),e("a",y,[a("www.zoo.team/openweekly/"),t(o)])]),a(" (小报官网首页有微信交流群)")]),T,e("p",null,[e("strong",null,[a("开源地址 "),e("a",E,[a("https://github.com/zcy-inc/skuPathFinder-back/"),t(o)])])]),F,M,B,q])}const L=c(n,[["render",A],["__file","前端工程师生产环境 debugger 技巧 .html.vue"]]);export{L as default};
