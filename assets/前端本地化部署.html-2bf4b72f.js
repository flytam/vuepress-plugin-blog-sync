import{_ as t,z as r,A as l,Y as e,C as n,U as a,a6 as s,Q as d}from"./framework-cb9358d9.js";const c={},p=e("p",null,[e("img",{src:"https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bfefad3ee3474e3a8a461251aaddceb4~tplv-k3u1fbpfcp-watermark.image?",alt:"政采云技术团队.png"})],-1),o=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72f6dd866eb4479ca8ce75b4f21b6ead~tplv-k3u1fbpfcp-watermark.image?",alt:"无一.png"})],-1),m={href:"http://zoo.zhengcaiyun.cn/blog/article/localized-deployment",target:"_blank",rel:"noopener noreferrer"},u=e("h1",{id:"前言",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),n(" 前言")],-1),v={href:"https://juejin.cn/post/6987140782595506189",target:"_blank",rel:"noopener noreferrer"},b=s(`<h1 id="场景分析" tabindex="-1"><a class="header-anchor" href="#场景分析" aria-hidden="true">#</a> 场景分析</h1><p>为了网络安全，客户会要求我们的应用是要完全部署在内网的，那我们需要做什么呢？第一我们需要考虑前端代码中是不是有些直接访问外网资源？第二是不是后端返回了静态资源地址在某种情况下就访问了？第三 CDN 资源具体有那些类型呢？前端直接访问的 CDN 的资源太普遍了，如下既有 at.alicdn.com，又有我们自己内部的静态资源luban.zcycdn.com， sitecdn.zcycdn.com 等。如下这些就在我们代码中使用的静态资源地址。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> &amp;lt;link rel=&amp;#39;stylesheet&amp;#39; href=&amp;#39;//at.alicdn.com/t/fontnm.css&amp;#39; /&amp;gt;
 &amp;lt;img src=&amp;quot;https://sitecdn.zcycdn.com/f2e/8.png&amp;quot;alt=&amp;quot;收货人&amp;quot;/&amp;gt;
 &amp;lt;img src=&amp;quot;https://luban.zcycdn.com/f2e/8.png&amp;quot;alt=&amp;quot;收货人&amp;quot;/&amp;gt;
 //css中字体文件
 src:url(https://sitecdn.zcycdn.com/t/font_148178j4i.eot);
 src:url(https://sitecdn.zcycdn.com/t/font1_4i.woff);
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了保证我们内网中可以访问我们讨论出以下两个方案</p><h1 id="方案一" tabindex="-1"><a class="header-anchor" href="#方案一" aria-hidden="true">#</a> 方案一</h1><h3 id="dns-解析做转发" tabindex="-1"><a class="header-anchor" href="#dns-解析做转发" aria-hidden="true">#</a> DNS 解析做转发</h3><p>我们通过 DNS 服务这一层去处理，具体 DNS 如何进行的二域名，三级域名进行解析，如何DNS 缓存，以及什么是 13 台根服务器，我们这次不做深入探讨，我们只需要 DNS 的可以进行域名解析，解析到指定的 IP 服务上即可。</p><p>那我们是不是可以想一下，是不是把代码中访问的静态资源的域名拦截一下，DNS 解析成本地服务的地址是不是就可以了呢？为了更清楚的理解，我做一个例子如下：</p><p>我们代码中需要访问某个图片，CDN 地址：&lt;https://cdn.zcycdn.com/b/a.js&gt;</p><p>上传提前把 a.js 这个文件提前放到本地服务器上访问地址：&lt;https://demo.com/b/a.js&gt;</p><p>当代码运行的时候，代码中访问了 &lt;https://cdn.zcycdn.com&gt; 的时候，DNS 直接地址解析成 &lt;https://demo.com&gt; 的 IP 地址，达到访问静态资源的目的</p><p>看起来这个蛮简单的，不需要各个业务负责人排查修改自己代码中的静态资源，胜利在望了，兴致冲冲的跑去找运维童鞋提议是不是可以这样做，然而运维把我说的服服帖帖。运维童鞋说：静态资源放在对象存储或者服务器上，通过IP或者域名的方式都可以请求的到，不过 IP 只支持 HTTP 的方式，域名+SSL 证书的方式支持 HTTPS，可以做一些加密，让你的资源或者请求内容进行加密，不容易被破解，域名证书之前有 3 到 5 年的，3 年前已经改掉了，目前申请的证书都是一年的，那就预示着不仅仅要用户配置我们提供的 DNS 规则，还要配合我们一年一更新证，想要客户这样配合那是不容易。如下图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a49e5bf35bb413086303f06ef78ad04~tplv-k3u1fbpfcp-zoom-1.image" alt="image (10).png"></p><p>DNS 只是帮我们把域名解析成了 IP， HTTPS 还需要证书验证服务器身份，仅仅 DNS 拦截解析还不够。模拟实现了一波大致思路：自己启动一个静态资源服务，以及 DNS 本地解析服务，当访问 juejin.cn 域名的时候 IP 解析成本地的 IP 并且成功访问到静态资源，具体如下。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/038d33f88afb4af1b175270ffd62ba95~tplv-k3u1fbpfcp-zoom-1.image" alt="image (21).png"></p><h3 id="自己写一个dns服务" tabindex="-1"><a class="header-anchor" href="#自己写一个dns服务" aria-hidden="true">#</a> 自己写一个DNS服务</h3><h4 id="step1-本地起一个服务" tabindex="-1"><a class="header-anchor" href="#step1-本地起一个服务" aria-hidden="true">#</a> step1: 本地起一个服务</h4><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2550a19682ff47319dbe53a43b9cf043~tplv-k3u1fbpfcp-zoom-1.image" alt="image (12).png"></p><p>暂时存放静态资源，模拟服务器上的资源</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a798ffaaf0b44f559c6c8dd9a5ab59c8~tplv-k3u1fbpfcp-zoom-1.image" alt="image (13).png"></p><p>启动服务访问静态资源</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/111b3d470c23476e997f71dd8de9cbcf~tplv-k3u1fbpfcp-zoom-1.image" alt="image (14).png"></p><p>我们的目的：如果访问 &lt;http://juejin.cn:3000/zcy.png&gt; 的时候访问到我们本地服务的静态资源：&lt;http://10.201.45.121:3000/zcy.png&gt;</p>`,23),h={id:"step2-启动一个本地-dns-服务-拦截所有请求转发到自己启动的-ip-点击查看源码",tabindex:"-1"},f=e("a",{class:"header-anchor",href:"#step2-启动一个本地-dns-服务-拦截所有请求转发到自己启动的-ip-点击查看源码","aria-hidden":"true"},"#",-1),g={href:"https://sitecdn.zcycdn.com/f2e-assets/7da606eb-d8fc-4a01-a633-fcfd60edc2c5.js",target:"_blank",rel:"noopener noreferrer"},_=s('<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fd72f5f90154482bbef42f25f55002f~tplv-k3u1fbpfcp-zoom-1.image" alt="image (15).png"></p><h4 id="step3-配置本地-dns-解析" tabindex="-1"><a class="header-anchor" href="#step3-配置本地-dns-解析" aria-hidden="true">#</a> step3：配置本地 DNS 解析</h4><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aaf4d2f97e7745168a6928342650a735~tplv-k3u1fbpfcp-zoom-1.image" alt="image (16).png"></p><h4 id="step4-测试访问http-和-https" tabindex="-1"><a class="header-anchor" href="#step4-测试访问http-和-https" aria-hidden="true">#</a> step4: 测试访问HTTP 和 HTTPS</h4>',4),j={href:"http://juejin:3000/zcy.png",target:"_blank",rel:"noopener noreferrer"},k=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9335529567b04c9c85ebf2ba73a36816~tplv-k3u1fbpfcp-zoom-1.image",alt:"image (17).png"})],-1),S={href:"https://juejin:3000/zcy.png",target:"_blank",rel:"noopener noreferrer"},x=s(`<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9565e76c82ea4ef7beff4847370eaed9~tplv-k3u1fbpfcp-zoom-1.image" alt="image (18).png"></p><p>如果访问的是 HTTP 请求那就可以访问，HTTPS 就不能访问，侧面证明了 HTTPS 的证书问题。HTTPS 对称加密的秘钥我们采用非对称加密传输，数据传输还是使用对称加密，这保证了数据加密传输，为了保证防止冒充，CA（Certificate Authority）， 颁发的证书就称为数字证书 (Digital Certificate)，在非对称加密阶段，服务器会把证书会带着非对称加密的公钥，一起返回，向浏览器证明服务器的身份 HTTPS 相比 HTTP 多了一层 SSL/TLS（安全层）如下图。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32fbb8c310ac432e8ec1bbc5dc436946~tplv-k3u1fbpfcp-zoom-1.image" alt="image (19).png"></p><h1 id="方案二" tabindex="-1"><a class="header-anchor" href="#方案二" aria-hidden="true">#</a> 方案二</h1><p>项目在构建的时候扫描出项目中的静态资源地址，从我们公网的 CDN 服务放到客户自己的服务器上，修改源文件中的静态资源地址为客户本地服务的访问地址。</p><p>优缺点一目了然，方案一无需修改代码，但是需要充分得到客户的大力信任与支持需要配置 DNS 转发，方案二无需劳烦客户，即使后面有新增域名也不需要和客户沟通，完全自己解决，但是对代码有侵入性，会替换静态资源的地址</p><h2 id="我们通过以下4个阶段拆解" tabindex="-1"><a class="header-anchor" href="#我们通过以下4个阶段拆解" aria-hidden="true">#</a> 我们通过以下4个阶段拆解</h2><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e99149833865485fb44ad4eaf83f6153~tplv-k3u1fbpfcp-zoom-1.image" alt="image (20).png"></p><p>统一封装runCommand 执行命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function runCommand(cmd, args, options, before, end) {
  return new Promise((resolve, reject) =&amp;gt; {
    log(before, blue)
    const spawn = childProcess.spawn(
      cmd,
      args,
      Object.assign(
        {
          cwd: global.WORKSPACE,
          stdio: &amp;#39;inherit&amp;#39;,
          shell: true,
        },
        options
      )
    )
    spawn.on(&amp;#39;error&amp;#39;, (error) =&amp;gt; {
      log(error, chalk.red)
      reject(error)
    });
    spawn.on(&amp;#39;close&amp;#39;, (code) =&amp;gt; {
      if (code !== 0) {
        return reject(\`sh: \${cmd} \${args.join(&amp;#39; &amp;#39;)}\`)
      }
      end &amp;amp;&amp;amp; log(end, green)
      resolve()
    });
  })
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1、pre-前置环境校验" tabindex="-1"><a class="header-anchor" href="#_1、pre-前置环境校验" aria-hidden="true">#</a> 1、pre 前置环境校验</h2><p>切换公司nrm</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> runCommand(&amp;#39;nrm&amp;#39;, [&amp;#39;use&amp;#39;, &amp;#39;zcy-server&amp;#39;], {}, &amp;#39;switch nrm registry to zcy&amp;#39;, &amp;#39;switch nrm registry to zcy success&amp;#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下载依赖</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>runCommand(&amp;#39;npm&amp;#39;, [&amp;#39;i&amp;#39;, &amp;#39;--unsafe-perm&amp;#39;], {}, &amp;#39;npm install&amp;#39;, &amp;#39;npm install success&amp;#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2、compile-编译" tabindex="-1"><a class="header-anchor" href="#_2、compile-编译" aria-hidden="true">#</a> 2、compile 编译</h2><p>不同环境需要上传不同的地址因此需要动态修改webpack 的publicPath</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const cdnConfigStr = \`assetsPublicPath: &amp;#39;http://dev.com&amp;#39;,\`
replaceFileContent(configPath, /assetsPublicPath:.+,/g, cdnConfigStr)
exports.replaceFileContent = function(filePath, source, target) {
  const fileContent = fs.readFileSync(filePath, &amp;#39;utf-8&amp;#39;)
  let targetFileContent = fileContent
  if (Array.isArray(source)) {
    source.forEach(([s, target]) =&amp;gt; {
      if (target) {
        targetFileContent = targetFileContent.replace(s, target)
      }
    })
  } else {
    targetFileContent = fileContent.replace(source, target)
  }
  fs.writeFileSync(filePath, targetFileContent, &amp;#39;utf-8&amp;#39;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译项目</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> runCommand(&amp;#39;npm&amp;#39;, [&amp;#39;run&amp;#39;, &amp;#39;build&amp;#39;], {}, \`webpack build\`, \`webpack build success\`)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3、静态资源替换" tabindex="-1"><a class="header-anchor" href="#_3、静态资源替换" aria-hidden="true">#</a> 3、静态资源替换</h2><h4 id="替换url源码地址" tabindex="-1"><a class="header-anchor" href="#替换url源码地址" aria-hidden="true">#</a> 替换url源码地址</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    const replaceWebpackDistContent = 
    async function(options = {},collectionAssets,folder) {
    const fileContent = fs.readFileSync(filePath, &amp;#39;utf-8&amp;#39;);
    let targetFileContent=fileContent;
    [
      [/(https:)?//g.alicdn.com/[-a-zA-Z0-9@:%_+.~#?&amp;amp;//=]+.[-a-zA-Z0-9@:%_+.~#?&amp;amp;//=]+/g, cdn],
      [/(https?:)?//sitecdn.zcycdn.com/[-a-zA-Z0-9@:%_+.~#?&amp;amp;//=]+.[-a-zA-Z0-9@:%_+.~#?&amp;amp;//=]+/g, cdn],
      [/(https:)?//cdn.zcycdn.com/[-a-zA-Z0-9@:%_+.~#?&amp;amp;//=]+.[-a-zA-Z0-9@:%_+.~#?&amp;amp;//=]+/g, cdn],
    ].forEach(([reg,uri])=&amp;gt;{
          targetFileContent=targetFileContent.replace(reg,function(match){
          let basename = &amp;#39;&amp;#39;;
          let uriMath = match;
          basename = path.basename(uriMath);
          if(uriMath.slice(0,4)!=&amp;#39;http&amp;#39;){ 
            uriMath=&amp;#39;https:&amp;#39;+uriMath;
          }
          const parseUrl = url.parse(uriMath);
          
          collectionAssets({src:uriMath,fileName:path.basename(parseUrl.pathname)});
          console.log(&amp;#39;🚀替换前&amp;#39;,match);
          const myURL= new URL(projectName, uri);
          const replacedUrl = uri+&amp;#39;/&amp;#39;+projectName+parseUrl.path+(parseUrl.hash||&amp;#39;&amp;#39;);
          console.log(&amp;#39;🚀替换后&amp;#39;, replacedUrl);
          return replacedUrl;
        })
    })
    fs.writeFileSync(filePath, targetFileContent, &amp;#39;utf-8&amp;#39;)
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>获取写死在前端代码中的静态资源</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  const downloadAssetsFiles= async function(img,forder){
  const staticAssets=&amp;#39;staticAssets&amp;#39;;
  let assetsUrl=getPwdPath(\`\${forder||&amp;#39;&amp;#39;}\${path.sep}\${staticAssets}\`);
  if(!fs.existsSync(assetsUrl)){
    fs.mkdirSync(assetsUrl);
  }
    return Promise.all(img.objUnique(&amp;#39;src&amp;#39;).map(({src,fileName})=&amp;gt;{
      if(fileName){
        return new Promise(function(resolve,reject){
          const originFileDir = path.join(assetsUrl,path.dirname(url.parse(src).pathname));
          fs.mkdirSync(originFileDir,{recursive:true});
          const uri = path.join(originFileDir,fileName); 
          download(uri,src,resolve,reject);
        }).catch(err=&amp;gt;{
          console.log(err)
          throw new Error(err);
        })
      }
        
    }))
    
}
function download(loadedUrl,src){
    const writeStream = fs.createWriteStream(loadedUrl);
    const readStream =  request(src);
    readStream.pipe(writeStream);
    readStream.on(&amp;#39;end&amp;#39;, function() {
      console.log(fileName,&amp;#39;文件下载成功&amp;#39;);
    });
     writeStream.on(&amp;quot;finish&amp;quot;, function() {
      console.log(fileName,&amp;quot;文件写入成功&amp;quot;);
      writeStream.end();
    });
}
  downloadAssetsFiles(assetsArr,&amp;#39;dist&amp;#39;);
  // 发现替换资源里还有cdn，因此替换下载后的cdn里面的cdn
  const assetsArr=[];
  await replaceWebpackDistContent(options,collectionAssets,&amp;#39;staticAssets&amp;#39;);
  await downloadAssetsFiles(assetsArr,&amp;#39;dist&amp;#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4、oss推送静态资源到客户资源服务" tabindex="-1"><a class="header-anchor" href="#_4、oss推送静态资源到客户资源服务" aria-hidden="true">#</a> 4、OSS推送静态资源到客户资源服务</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>

const ossEndpoint = p<wbr>rocess.env.OSS_ENDPOINT;
const commonOptions = {
  accessKeyId: p<wbr>rocess.env.OSS_ACCESSKEYID ,
  accessKeySecret: p<wbr>rocess.env.OSS_ACCESSKEYSECRET,
  bucket: p<wbr>rocess.env.OSS_BUCKET,
  timeout: &amp;#39;120s&amp;#39;,
}

const extraOptions = ossEndpoint
  ? {
    endpoint: ossEndpoint, // 从全局数据获取，没有会依赖 region
    cname: true,
  } : {
    region: p<wbr>rocess.env.OSS_REGION,
  }
const ossOptions = Object.assign({}, commonOptions, extraOptions);
const client = new OSS(ossOptions);
//onlinePath 访问的文件地址
//curPath 上传的文件地址
result = await client.put(onlinePath, curPath);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参考文档</p>`,28),y={href:"https://www.trustasia.com/view-398-day-limit/",target:"_blank",rel:"noopener noreferrer"},z={href:"https://link.juejin.cn/?target=http%3A%2F%2Fnodejs.cn%2Fapi%2Fchild_process.html%23child_process_child_process_fork_modulepath_args_options",target:"_blank",rel:"noopener noreferrer"},w={href:"https://link.juejin.cn/?target=https%3A%2F%2Fblog.csdn.net%2Fxgangzai%2Farticle%2Fdetails%2F98919412",target:"_blank",rel:"noopener noreferrer"},C=e("h2",{id:"推荐阅读",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#推荐阅读","aria-hidden":"true"},"#"),n(" 推荐阅读")],-1),P={href:"https://juejin.cn/post/7169004126469914654",target:"_blank",rel:"noopener noreferrer"},N={href:"https://juejin.cn/post/7166416369943068679",target:"_blank",rel:"noopener noreferrer"},F={href:"https://juejin.cn/post/7163801933612843016",target:"_blank",rel:"noopener noreferrer"},T={href:"https://juejin.cn/post/7153410606673395725",target:"_blank",rel:"noopener noreferrer"},A={href:"https://juejin.cn/post/7145604963593355277",target:"_blank",rel:"noopener noreferrer"},D=e("h2",{id:"开源作品",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#开源作品","aria-hidden":"true"},"#"),n(" 开源作品")],-1),E=e("ul",null,[e("li",null,"政采云前端小报")],-1),O={href:"http://zoo.zhengcaiyun.cn/",target:"_blank",rel:"noopener noreferrer"},U=e("ul",null,[e("li",null,"商品选择 sku 插件")],-1),I={href:"https://github.com/zcy-inc/skuPathFinder-back",target:"_blank",rel:"noopener noreferrer"},q=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),n(" 招贤纳士")],-1),H=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 90 余个前端小伙伴，平均年龄 27 岁，近 4 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),L=e("p",null,[n("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),M=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98d3aa3d1f8646a8bcda8cfd9e335a4b~tplv-k3u1fbpfcp-zoom-1.image",alt:""})],-1);function Z(K,R){const i=d("ExternalLinkIcon");return r(),l("div",null,[p,o,e("p",null,[n("> 这是第 167 篇不掺水的原创，想获取更多原创好文，请搜索公众号关注我们吧~ 本文首发于政采云前端博客："),e("a",m,[n("前端本地化部署"),a(i)])]),u,e("p",null,[n("现在成熟的前端团队里面都有自己的内部构建平台，我司云长便是我们 CI/CD 的提效利器。我先来简单介绍下我司的云长，此云长非彼云长，云长主要做的是：获取部署的项目，分支，环境基本信息后开始拉取代码，安装依赖，打包，并且将项目的一些资源静态文件上传 CDN，再将生成的代码再打包成镜像文件，然后将这份镜像上传到镜像仓库后，最后调用 K8S 的镜像部署服务，进行镜像按环境的部署，这就是我们云长做的事情。如果想从零开始搭建一个自己团队的部署平台可以看下我们往期文章 "),e("a",v,[n("如何搭建适合自己团队的构建部署平台@Jeson/机械键盘收藏家"),a(i)]),n("，本期我们只是针对云长中静态资源本地化的功能做细致阐述。")]),b,e("h4",h,[f,n(" step2: 启动一个本地 DNS 服务，拦截所有请求转发到自己启动的 IP "),e("a",g,[n("点击查看源码"),a(i)])]),_,e("p",null,[n("访问："),e("a",j,[n("http://juejin.cn:3000/zcy.png"),a(i)])]),k,e("p",null,[n("如果是"),e("a",S,[n("https://juejin.cn:3000/zcy.png"),a(i)])]),x,e("p",null,[e("a",y,[n("SSL/TLS证书1年有效期新规"),a(i)])]),e("p",null,[e("a",z,[n("node child_process 文档"),a(i)])]),e("p",null,[e("a",w,[n("深入理解Node.js 进程与线程"),a(i)])]),C,e("p",null,[e("a",P,[n("Rollup 与 Webpack 的 Tree-shaking"),a(i)])]),e("p",null,[e("a",N,[n("Git 是如何工作的"),a(i)])]),e("p",null,[e("a",F,[n("大数据前端团队生存指南"),a(i)])]),e("p",null,[e("a",T,[n("所见即所得 —— HTML转图片组件开发"),a(i)])]),e("p",null,[e("a",A,[n("探索组件在线预览和调试"),a(i)])]),D,E,e("p",null,[e("strong",null,[n("开源地址 "),e("a",O,[n("www.zoo.team/openweekly/"),a(i)])]),n(" (小报官网首页有微信交流群)")]),U,e("p",null,[e("strong",null,[n("开源地址 "),e("a",I,[n("https://github.com/zcy-inc/skuPathFinder-back/"),a(i)])])]),q,H,L,M])}const W=t(c,[["render",Z],["__file","前端本地化部署.html.vue"]]);export{W as default};
