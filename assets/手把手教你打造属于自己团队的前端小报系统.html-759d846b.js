import{_ as t,z as l,A as d,Y as e,C as a,U as s,a6 as n,Q as r}from"./framework-cb9358d9.js";const o={},m=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/1738ae6bd8113663~tplv-t2oaga2asx-image.image",alt:""})],-1),c={href:"https://www.zoo.team/article/building-a-tabloid-system",target:"_blank",rel:"noopener noreferrer"},p=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/1738ae77855b60e6~tplv-t2oaga2asx-image.image",alt:""})],-1),u=e("h2",{id:"前言",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),a(" 前言")],-1),v=e("p",null,"经常关注我们政采云前端团队的同学， 对下面这张图应该不陌生~",-1),h=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/1738ae611883a4ce~tplv-t2oaga2asx-image.image",alt:"image-20200724232119992"})],-1),b=e("p",null,"每周五下午我们会定时推送一期前端小报，里面汇集了一些精选的前端文章~",-1),g={href:"https://weekly.zoo.team/",target:"_blank",rel:"noopener noreferrer"},_=n('<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/1738ae6119f7e97b~tplv-t2oaga2asx-image.image" alt="图片"></p><p>至今前端小报已经 93 期，汇聚了 1000+ 文章，覆盖了 50+ 大小分类，可谓是一个非常好的知识库了~</p><h2 id="前端小报的由来" tabindex="-1"><a class="header-anchor" href="#前端小报的由来" aria-hidden="true">#</a> 前端小报的由来</h2><p>持续学习是每个工程师必备的素养，同样一个成长性的团队也同样需要这样一个持续学习的氛围。那么如何通过技术的手段来帮助团队培养持续学习的氛围呢？</p><p>政采云前端小报因此应运而生，它主要包含投稿、汇总沉淀、定时投递三大核心模块，这样的一个系统可以让大家轻松的将自己喜欢的文章分享到团队内部，并且将文章进行分类沉淀，营造团队的知识库，方便大家查阅，同时小报系统也会在每周五进行定时推送，方便大家了解最新的技术动向，前端小报系统是一个帮助我们营造团队内部分享和学习氛围的得力帮手~</p><p>那么这样的一个小报系统是如何实现的呢？</p><h2 id="如何设计一个小报系统" tabindex="-1"><a class="header-anchor" href="#如何设计一个小报系统" aria-hidden="true">#</a> 如何设计一个小报系统</h2><h3 id="投稿" tabindex="-1"><a class="header-anchor" href="#投稿" aria-hidden="true">#</a> 投稿</h3><p>相信大家看到好的文章的时候，总会有忍不住想分享给别人的冲动，一个简单易用的投递功能可以很方便的满足大家的分享欲望，将好的文章输入到团队，帮助其他同学~</p><p>一个简单易容的投稿功能，我们需要解决两件事情：</p><p>1、如何能在看到好文章时，满足分享的冲动</p><p>2、如何对投稿的文章进行归类收集，方便沉淀与查找</p><p>如果是一个单独的录入系统，手动录入，这种方式操作繁琐，很容易打消大家的热情，平时在浏览器看文章的时候，我们经常将好的文章加入书签收藏，一键操作，方便快捷。那么如何能像浏览器书签收藏文章一样方便的去投稿呢？</p><p>很容易想到通过浏览器的扩展能力去做这个事情，Chrome 插件就提供了这样的能力。</p><h4 id="什么是-chrome-插件" tabindex="-1"><a class="header-anchor" href="#什么是-chrome-插件" aria-hidden="true">#</a> 什么是 Chrome 插件</h4>',15),x={href:"https://developer.chrome.com/extensions",target:"_blank",rel:"noopener noreferrer"},f=n(`<p>说人话：开发一个 Web 项目，能够嵌入到 Chrome 浏览器中，同时能够通过一些特定的 Api 获取到一些能力，从而订制自己的插件功能。</p><h4 id="如何开发一个一键投稿的-chrome-插件" tabindex="-1"><a class="header-anchor" href="#如何开发一个一键投稿的-chrome-插件" aria-hidden="true">#</a> 如何开发一个一键投稿的 Chrome 插件</h4><p>首先创建一个项目，开发一个投稿功能页面。</p><p>此项目和普通 Vue 项目唯一的区别是根目录多了一个 <code>manifest.json</code> 文件。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/1738ae6112ea8d59~tplv-t2oaga2asx-image.image" alt="图片"></p><ul><li>创建 <code>manifest.json</code>：Chrome 通过识别项目根目录是否有 <code>manifest.json</code> 文件来识别是否为 Chrome 插件。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{   
  // 核心代码 
  &amp;quot;name&amp;quot;: &amp;quot;Zoo！&amp;quot;, // 扩展名 
  &amp;quot;browser_action&amp;quot;: {  
    &amp;quot;default_popup&amp;quot;: &amp;quot;./popup.html&amp;quot;  // 点击浏览器右上方插件小图标弹出的内容 html 
  }, 
  &amp;quot;content_scripts&amp;quot;: [  // 能够在  Web 页面内运行的 javascript 脚本 
    { 
      &amp;quot;matches&amp;quot;: [
        // 满足什么协议下进行调用 
        &amp;quot;http://*/*&amp;quot;,  
        &amp;quot;https://*/*&amp;quot; 
      ], 
      &amp;quot;js&amp;quot;: [ 
        &amp;quot;./contentScripts/zdata.js&amp;quot; // 插入到网页的 JS 文件路径 
      ], 
        &amp;quot;run_at&amp;quot;: &amp;quot;document_start&amp;quot; // 在document 加载时执行 
    } 
  ] 
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样插件被打开时会默认加载 <code>popup.html</code> 页面的内容，效果如图：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/1738ae6117b2eb6f~tplv-t2oaga2asx-image.image" alt="图片"></p><ul><li>如何获取文章标题、简介、URL</li></ul><p>插件本身其实不能获取到当前页面的标题，但 Chrome 插件提供一种能够在当前页面动态插入固定 JS 脚本的能力，我们可以根据这种机制向当前页面插入一段 JS 脚本去获取页面的标题、简介和 URL，然后再通过消息机制将获取到的内容返回到插件中。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>let host = this;
// 获取当前窗口 id 
chrome.tabs.query({
  active: true,
  currentWindow: true
}, function (tabs) {
  let tabId = tabs.length ? tabs[0].id : null;
  // 向当前页面注入 JavaScript 脚本 
  chrome.tabs.executeScript(tabId || null, {
    file: &amp;#39;./contentScripts/recommend.js&amp;#39;
  }, function () {
    // 向目标网页进行通信，向 recommend.js 发送一个消息 
    chrome.tabs.sendMessage(tabId, {
      message: &amp;#39;GET_TOPIC_INFO&amp;#39;,
    }, function (response) {
      // 获取到返回的文章 title 、url、description 
      host.article.title = response.title;
      host.article.link = response.link;
      host.article.description = response.description;
    });
  });
});   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>recommend.js</code> 监听消息 ，通过 addListener 我们可以监听来自 sendMessage 发出的消息，在 sendMessage 中定义 message 常量让我们可以在接收消息时对消息进行区分。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>let doc = document;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === &amp;#39;GET_TOPIC_INFO&amp;#39;) {
    // 获取 title 
    let title = document.getElementsByTagName(&amp;#39;title&amp;#39;)[0].textContent;
    let descriptionEl = doc.querySelectorAll(&amp;#39;meta[name=description]&amp;#39;)[0];
    // 获取 描述 
    let description = descriptionEl ? descriptionEl.getAttribute(&amp;#39;content&amp;#39;) : title;
    // 发送数据 
    sendResponse({
      title: title.trim(),
      link: location.href,
      description: description.trim()
    });
  } else if (request.message === &amp;#39;SIGN_RELOAD&amp;#39;) {
    console.log(&amp;#39;request, sender&amp;#39;, request, sender);
  }
}); 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>点击投稿时，需要将数据发送到服务端做存储</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 投稿按钮点击事件 
handleRecommendArticle: function () {
  let request;
  request = ajax({
    method: &amp;#39;post&amp;#39;,
    url: &amp;#39;https://XXX/api/post&amp;#39;, // 后端接口 
    data: {
      &amp;#39;title&amp;#39;: this.article.title,
      &amp;#39;desc&amp;#39;: this.article.description,
      &amp;#39;category&amp;#39;: this.article.category[1] || &amp;#39;默认分类&amp;#39;,
      &amp;#39;link&amp;#39;: this.article.link,
      &amp;#39;referrer&amp;#39;: this.article.reporter
    }
  });
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果图：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/1738ae611a9eded4~tplv-t2oaga2asx-image.image" alt="图片"></p><p>上面就是一个很轻量的 Chrome 插件的实现了，基于这样的一个 Chrome 插件，当我们看到喜欢的文章时，就可以一键分享给团队的小伙伴了~</p><p>当文章多了之后，如果没有有效的管理，文章会堆积杂乱，反而让大家失去了去学习的欲望，那么我们如何对投稿的文章进行归类收集，方便同学们查找自己需要的知识体系呢？</p><h4 id="标签设计" tabindex="-1"><a class="header-anchor" href="#标签设计" aria-hidden="true">#</a> 标签设计</h4><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/1738ae611bef29b7~tplv-t2oaga2asx-image.image" alt="image-20200724222354907"></p><ul><li>标签分类</li></ul><p>在标签分类上当时花了一些时间去设计，难点主要是什么样的分类维度能够让投稿人快速找到对应的分类，让查看人能够快速根据分类找到自己想要的文章， 以及如何能够快速找到往期文章等。</p><p>这就要求我们的分类需通俗易懂，且能够涵盖业务大部分文章的类型，最后我们是从基础、语言、架构、选型、工具、总结等多维度进行分类。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/1738ae614d962d55~tplv-t2oaga2asx-image.image" alt="图片"></p><p>为了能够快速进行文章查找，这里将分类查看功能也集成在 Chrome 插件中。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/1738ae6156378e17~tplv-t2oaga2asx-image.image" alt="图片"></p><h4 id="安装插件" tabindex="-1"><a class="header-anchor" href="#安装插件" aria-hidden="true">#</a> 安装插件</h4><p>插件制作完成之后，其他同学就可以将你的插件安装包安装到浏览器中。因为墙的原因，这里没有选择将插件上传到 Chrome 应用商店，我们是直接安装到本地， 下图为打包后的项目目录结构：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/1738ae6112ea8d59~tplv-t2oaga2asx-image.image" alt="图片"></p><p>安装步骤：浏览器选择设置 —&gt; 扩展程序 —&gt; 加载已解压的扩展程序 —&gt; 选择文件目录即可。同时，开发者模式记得打开。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/1738ae6174ceeba9~tplv-t2oaga2asx-image.image" alt="图片"></p>`,33),q=e("strong",null,"关于",-1),j=e("strong",null,"Chrome 扩展",-1),y=e("strong",null,"插件的官方",-1),k=e("strong",null,"详细文档请移步",-1),C={href:"https://developer.chrome.com/extensions",target:"_blank",rel:"noopener noreferrer"},S=e("strong",null,"查看",-1),T=n('<h3 id="汇总沉淀" tabindex="-1"><a class="header-anchor" href="#汇总沉淀" aria-hidden="true">#</a> 汇总沉淀</h3><p>很普通一个前端项目，这里不再过多陈述，主要是能够看到每一期文章和按照分类进行快速查找，并统一收录 文章入口。其中，前端页面采用 SSR 服务端渲染实现。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/1738ae6119f7e97b~tplv-t2oaga2asx-image.image" alt="图片"></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/1738ae624d480c27~tplv-t2oaga2asx-image.image" alt="图片"></p><h3 id="定时投递" tabindex="-1"><a class="header-anchor" href="#定时投递" aria-hidden="true">#</a> 定时投递</h3><p>到这里小报系统的前台展示页面已经完成，那么如何将每一期的优质文章更及时且方便的让同学能够阅读到呢，让大家及时的去了解新技术，扩充视野。后来我们想可以通过主动触达，定时提醒等方式将期刊主动发送给团队同学。 因此在上述基础上单独设计 了一个推送服务，定时将每一周的小报推送到钉钉群和前端邮件组。</p>',6),E={href:"https://ding-doc.dingtalk.com/doc#/serverapi2/ye8tup/7ae8ebf3",target:"_blank",rel:"noopener noreferrer"},I=n(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/1738ae61823a4e2c~tplv-t2oaga2asx-image.image" alt="图片"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const pushToRobot = async ({ data, title, nums }) =&amp;gt; {
  // 组装发送数据格式 
  const links = wrapperFeedcard({ data, nums });
  // 发送数据到指定群 
  return axios(&amp;quot;https://oapi.dingtalk.com/robot/send?&amp;quot;, {
    method: &amp;quot;post&amp;quot;,
    params: {
      access_token: &amp;quot;XXXX&amp;quot; //前端群 
    },
    data: {
      feedCard: {
        links
      },
      msgtype: &amp;quot;feedCard&amp;quot;
    }
  })
}; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>通过邮件发送， 每周定时发送邮件到团队邮件组。</li></ul><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/1738ae6296c9bb45~tplv-t2oaga2asx-image.image" alt="图片"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 创建邮件链接 
const nodemailer = require(&amp;quot;nodemailer&amp;quot;); 
let transporter = nodemailer.createTransport({ 
  service: &amp;quot;qiye.aliyun&amp;quot;, 
  port: 25, // SMTP 端口 
  host: &amp;quot;smtp.mxhichina.com&amp;quot;, 
  secureConnection: true, // 使用了 SSL 
  auth: { 
    user: &amp;quot;xxx@cai-inc.com&amp;quot;, 
    pass: &amp;quot;xxx&amp;quot; 
  } 
}); 
// 组装发送内容 
let mailOptions = { 
  from: &amp;#39;&amp;quot;政采云前端小报&amp;quot; &amp;lt;liujian@cai-inc.com&amp;gt;&amp;#39;, // sender address 
  to: &amp;quot;ZooTeam@cai-inc.com&amp;quot;, // list of receivers 
  cc: [&amp;quot;ZooTeam@cai-inc.com&amp;quot;], 
  html: &amp;#39;邮件内容&amp;#39; // html body 
}; 
// 邮件发送 
transporter.sendMail(mailOptions); 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>定时发布掘金</li></ul><p>有一天我们的掘金运营小姐姐和我说，每周五快下班时都要进行文章发布，太痛苦了，耽误我下班约会，掘金为啥没有定时发送功能？ 我说好吧，那咱们自己开发个定时发布功能吧，想知道如何实现掘金定时发布功能，可在评论区留言讨论。</p><h3 id="整体设计" tabindex="-1"><a class="header-anchor" href="#整体设计" aria-hidden="true">#</a> 整体设计</h3><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/1738ae62f4863646~tplv-t2oaga2asx-image.image" alt="image-20200724225337228"></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>前端小报系统虽然是个小系统 ，但是不论从功能设计，还是系统设计方面都奔着一个目标，努力推动团队的学习氛围，让团队同学持续的成长。希望通过本文分享能够给大家一些启发，如何从一个目标出发去拆解落地，去思考如何让工具的去更好的服务于人。</p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,12),L={href:"https://juejin.im/editor/posts/5eef64de518825658c1ad1f6",target:"_blank",rel:"noopener noreferrer"},N={href:"https://juejin.cn/post/6844904182822993927",target:"_blank",rel:"noopener noreferrer"},R=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),a(" 招贤纳士")],-1),w=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),M=e("p",null,[a("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),O=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/1738ae797b21cb74~tplv-t2oaga2asx-image.image",alt:""})],-1);function X(A,B){const i=r("ExternalLinkIcon");return l(),d("div",null,[m,e("p",null,[a("> 这是第 62 篇不掺水的原创，想获取更多原创好文，请扫 👆 上方二维码关注我们吧~ 本文首发于政采云前端团队博客："),e("a",c,[a("手把手教你打造属于自己团队的前端小报系统"),s(i)])]),p,u,v,h,b,e("p",null,[a("下面这张图就是"),e("a",g,[a("政采云前端小报"),s(i)]),a("的官方站点的截图，这个站点里面有我们历史每期的汇总~")]),_,e("p",null,[a("官方"),e("a",x,[a("解释"),s(i)]),a("：谷歌插件是一种小型的用于定制浏览器体验的程序。它可以使用户根据个人需要或偏好来定制 Chrome 的功能和行为，它们基于 Web 技术（ HTML，JavaScript 和 CSS）构建。")]),f,e("p",null,[q,a(),j,a(),y,a(),k,a(),e("a",C,[a("链接"),s(i)]),a(),S]),T,e("ul",null,[e("li",null,[a("通过钉钉群机器人，每周五将期刊发送到前端群里。详情见官方开发 "),e("a",E,[a("手册"),s(i)])])]),I,e("p",null,[e("a",L,[a("分分钟教会你搭建企业级的 npm 私有仓库"),s(i)])]),e("p",null,[e("a",N,[a("一份值得收藏的 Git 异常处理清单"),s(i)])]),R,w,M,O])}const V=t(o,[["render",X],["__file","手把手教你打造属于自己团队的前端小报系统.html.vue"]]);export{V as default};
