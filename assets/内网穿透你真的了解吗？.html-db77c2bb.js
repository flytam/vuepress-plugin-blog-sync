import{_ as l,z as a,A as d,Y as e,C as n,U as r,a6 as s,Q as t}from"./framework-cb9358d9.js";const o={},c=e("p",null,[e("img",{src:"https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bfefad3ee3474e3a8a461251aaddceb4~tplv-k3u1fbpfcp-watermark.image?",alt:"政采云技术团队.png"})],-1),p=e("p",null,[e("img",{src:"https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22519b0e26704f61bb635935f81ad635~tplv-k3u1fbpfcp-watermark.image?",alt:"而立.png"})],-1),v={href:"http://zoo.zhengcaiyun.cn/blog/article/intranet-penetration",target:"_blank",rel:"noopener noreferrer"},u=e("h2",{id:"前言",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),n(" 前言")],-1),m=e("strong",null,"内网穿透",-1),b={href:"https://ngrok.com/",target:"_blank",rel:"noopener noreferrer"},f=e("strong",null,"ngrok",-1),h={href:"https://github.com/fatedier/frp",target:"_blank",rel:"noopener noreferrer"},g=e("strong",null,"frp",-1),_=e("strong",null,"frp开源框架",-1),x=s(`<h2 id="公网-ip-与内网-ip" tabindex="-1"><a class="header-anchor" href="#公网-ip-与内网-ip" aria-hidden="true">#</a> 公网 IP 与内网 IP</h2><p>能否在公网中访问服务器的决定性因素：公网 IP</p><h3 id="ip-地址的作用" tabindex="-1"><a class="header-anchor" href="#ip-地址的作用" aria-hidden="true">#</a> IP 地址的作用</h3><p>众所周知， IP 地址是每一位使用互联网的网民都会拥有的标识， IP 地址在互联网中起到的作用是定位，通过 IP 地址我们可以精确的定位到所需资源所在的服务器，这是对于一般用户来讲的，而对于程序员而言，我们需要的则是让用户通过 IP 地址定位到我们部署的资源，既然每个互联网用户都拥有 IP 地址，为什么用户无法直接访问部署在个人PC上的服务呢？</p><p>事实上， IP 地址分为两种：公网 IP 和内网 IP</p><p><strong>内网 IP ：</strong> 内网 IP 是用户在使用局域网时，由局域网的网关所分配的 IP 地址，每一个内网 IP 实际上都可以映射到当前所在局域网网关的某一端口（ IPV4 地址通过 NAT 与端口映射方式实现，具体原理下文详解），拥有内网 IP 可以被同一局域网下的其他设备所访问到；</p><p><strong>公网 IP ：</strong> 内网的设备想要访问非同一局域网下的资源则必须通过公网 IP ，公网 IP 是没有经过 NAT 转换的由互联网供应商（ISP）提供的最原始的 IP 地址，每一个公网 IP 都可以直接在互联网中被直接定位到。</p><p><strong>一个最简单的例子（以前端开发为例）</strong> ：</p><p>当我们使用 webpack-dev-server 来启动一个 node 项目时，我们除了通过<code>localhost:[端口号]</code>的方式以外，与我们的开发设备处于同一局域网下的设备可以通过<code>内网 IP :[端口号]</code>的方式对我们的项目进行访问，但当我们使用自己的流量或者连接其他非当前开发设备所在局域网的设备使用<code>内网 IP :[端口号]</code>的方式进行进行访问时，则无法访问。</p><p>原因：</p><p>内网 IP 地址仅在当前局域网下可以被定位并访问到，而当我们想要跨局域网访问时，我们的访问请求则需要先映射为公网 IP 然后访问到另一局域网的公网 IP ，最后由另一局域网的网关将其映射到相应的局域网设备，但我们访问的地址属于局域网中的内网 IP ，因此无法定位到其相应的公网 IP</p><p>综上所述，当我们想要让处于其他局域网下的设备访问到我们本地资源，必不可缺的就是<strong>公网 IP</strong> 。</p><h3 id="公网-ip-的稀有程度" tabindex="-1"><a class="header-anchor" href="#公网-ip-的稀有程度" aria-hidden="true">#</a> 公网 IP 的稀有程度</h3><p>相较于内网 IP ，公网 IP 明显比内网 IP 更加有用，为什么不可以人手一个公网 IP 呢？</p><h4 id="ipv4和-ipv6" tabindex="-1"><a class="header-anchor" href="#ipv4和-ipv6" aria-hidden="true">#</a> IPV4和 IPV6</h4><p>尽管 IPV6 的概念在几年前已经被提出，但实际的普及程度并没有很高，现在大部分网络用户使用的依旧是 IPV4 的 IP 地址，这也是限制公网 IP 个数的最大原因。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91f7a640a579481ba33160536986290b~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20221016201047531"></p><p>** IPV4：** IPV4 由 32 位二进制数组成，一共有 2^32 个不同的 IPV4 地址</p><p>** IPV6**： IPV6 由 128 位二进制数组成，理论上共有 2^128 个不同的 IPV6 地址</p><p>由此可见， IPV4地址的个数并不足以满足当前全世界网络用户的人手一个 IP 地址的需求，那么当前的网络为什么可以让这么多用户同时在网络上冲浪呢？</p><h4 id="nat-网络地址转换-技术" tabindex="-1"><a class="header-anchor" href="#nat-网络地址转换-技术" aria-hidden="true">#</a> NAT(网络地址转换)技术</h4><p>网络地址转化技术的核心作用在于实现对公网 IP 地址的复用，即所有的内网主机共用同一个 IP 地址，NAT 的实现方式共有三种：</p><ul><li>静态转换：将内网 IP 直接转换为公网 IP 地址，形成一一对应的方式</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24b9f36060ef47b7a7444395d43033eb~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20221016200527296"></p><ul><li>动态转换：将内网 IP 地址转换为公网 IP 地址，与静态转换不同的是动态转换会在 IP 池中选择空闲 IP 地址进行转换，即每次同一个内网 IP 对应的公网 IP 会发生改变</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d971012df474963a55095a866ed35c9~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20221016200819969"></p><ul><li>端口多路复用(PAT 技术)：将内网 IP 与公网 IP 的某一端口进行映射，通过公网 IP 的某一端口访问公网</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b1370c6c7784c3985366670872bc156~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20221016201601266"></p><p>可以看出以上三种形式中<strong>端口多路复用(PAT)技术</strong>可以最大程度上缓解 IPV4 地址紧张的现状，也是最为广泛使用的实现方式，三种 NAT 实现方式共同点在于：对于内网用户来说自己对应的公网 IP 是不可知的，就好像我们可以知道自己的门牌号但无法知道自己所在的小区，因此无法准确告诉别人我们的具体地址。</p><h2 id="内网穿透" tabindex="-1"><a class="header-anchor" href="#内网穿透" aria-hidden="true">#</a> 内网穿透</h2><p>在已知了当前内外网工作方式后，我们再来看一看作为程序员常用的技术手段<strong>内网穿透</strong></p><p>在此之前或许很多人都曾使用过如<strong>花生壳、ngrok、frp</strong>等方式在没有服务器的情况下将一些服务部署到网络上让别人使用</p><p>那么内网穿透的原理究竟是怎么样的呢？</p><h3 id="内网穿透原理解析" tabindex="-1"><a class="header-anchor" href="#内网穿透原理解析" aria-hidden="true">#</a> 内网穿透原理解析</h3><p>目前市面上主流的内网穿透工具实现的原理如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86c67ba7a81048d2a1c8a2ea2e1a82fc~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20221016203424286"></p><p>可见，内网穿透的核心原理在于将外网 IP 地址与内网 IP 地址建立联系，市面上常用的如花生壳工具其核心原理就是依靠一台具有公网 IP 的服务器作为请求的中转站以此来达到从公网访问内网主机的目的。</p><p>当我们启动花生壳的服务时，花生壳会将本地配置好的端口和服务器上的端口进行映射，告知服务器请求转发的路径，花生壳的公网服务器则会监听相应端口的请求，当用户访问花生壳提供的 IP 地址时，花生壳的对应 IP 地址的公网主机将会根据访问的端口映射到相应的内网主机，并通过预先配置好的服务端口将请求转发，以达到访问内网主机相应服务的效果。</p><h3 id="实现内网穿透" tabindex="-1"><a class="header-anchor" href="#实现内网穿透" aria-hidden="true">#</a> 实现内网穿透</h3><p>花生壳作为一款商业产品，对于配置端口等一系列工作进行了封装，使得用户可以更快捷的使用内网穿透，但我们在了解原理后完全可以通过一些开源的框架以及一台公网服务器实现对应的内网穿透功能，我们以 <strong>frp</strong> 为例。</p><h4 id="如何搭建最简单的-frp-服务" tabindex="-1"><a class="header-anchor" href="#如何搭建最简单的-frp-服务" aria-hidden="true">#</a> 如何搭建最简单的 frp 服务</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>服务端设置(frps.ini)：
[common]
bind_port = 7000       //此处填写客户端监听的服务端端口号
vhost_http_port = 8080 //此处填写用户访问的端口号
​
客户端配置(frpc.ini)：
[common]
server_addr = x.x.x.x //此处填写服务端 IP 地址
server_port = 7000    //此处填写服务端配置的bind_port
​
[web]
type = http         //此处规定转发请求的协议类型
local_port = 80     //此处规定本地服务启动的地址
custom_domains = www.example.com   //此处可以填写自定义域名（需要在 IP 地址下配置域名解析）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们配置完上述的文件后，用户的访问请求将会经过如下的步骤：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ff121f28a6349839d63967ec3af208b~tplv-k3u1fbpfcp-zoom-1.image" alt="image.png"></p>`,44),P={href:"https://gofrp.org/docs/examples/",target:"_blank",rel:"noopener noreferrer"},I=s(`<p>当我们使用 frp 去配置我们自己的内网穿透服务时，我们可以使用一台服务器为大量的内网主机提供公网访问的功能，以此来实现公网 IP 的复用，其原理与上文提到的 PAT 端口多路复用技术相类似，当我们临时需要使用服务器时，只需要向拥有公网服务器的朋友申请两个闲置端口即可。</p><h2 id="frp-核心代码解析" tabindex="-1"><a class="header-anchor" href="#frp-核心代码解析" aria-hidden="true">#</a> frp 核心代码解析</h2><p>本文以 http 请求为例解析当一个公网请求发送到frp服务器后究竟会经过哪些步骤</p><h3 id="frps-初始化" tabindex="-1"><a class="header-anchor" href="#frps-初始化" aria-hidden="true">#</a> frps 初始化</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func runServer(cfg config.ServerCommonConf) (err error) {
  log.InitLog(cfg.LogWay, cfg.LogFile, cfg.LogLevel, cfg.LogMaxDays, cfg.DisableLogColor)
​
  if cfgFile != &amp;quot;&amp;quot; {
    log.Info(&amp;quot;frps uses config file: %s&amp;quot;, cfgFile)
  } else {
    log.Info(&amp;quot;frps uses command line arguments for config&amp;quot;)
  }
  
  // !important 核心代码1
  svr, err := server.NewService(cfg)
  if err != nil {
    return err
  }
  log.Info(&amp;quot;frps started successfully&amp;quot;)
  // !important 核心代码2
  svr.Run()
  return
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>frp/cmd/frps/root.go</code>中</p><ul><li>核心代码1: server.NewService() 方法对我们在<code>frps</code>中的配置进行解析，初始化frp服务端</li><li>核心代码2: serever.Run() 方法启动frp服务</li></ul><h3 id="frpc-初始化" tabindex="-1"><a class="header-anchor" href="#frpc-初始化" aria-hidden="true">#</a> frpc 初始化</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>for{    
  // !important 核心代码3
conn, session, err := svr.login()
    if err != nil {
      xl.Warn(&amp;quot;login to server failed: %v&amp;quot;, err)
​
      // if login_fail_exit is true, just exit this program
      // otherwise sleep a while and try again to connect to server
      if svr.cfg.LoginFailExit {
        return err
      }
      util.RandomSleep(10*time.Second, 0.9, 1.1)
    } else {
      // login success
      // !important 核心代码4
      ctl := NewControl(svr.ctx, svr.runID, conn, session, svr.cfg, svr.pxyCfgs, svr.visitorCfgs, svr.serverUDPPort, svr.authSetter)
      ctl.Run()
      svr.ctlMu.Lock()
      svr.ctl = ctl
      svr.ctlMu.Unlock()
      break
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>frp/cmd/client/service.go</code>中</p><ul><li>核心代码3: for 循环不断去发起和服务端的连接，失败后会再次发起</li><li>核心代码4: 连接成功后，客户端会使用连接的信息调用 NewControl()</li></ul><h3 id="frpc-和-frps-通信" tabindex="-1"><a class="header-anchor" href="#frpc-和-frps-通信" aria-hidden="true">#</a> frpc 和 frps 通信</h3><p><strong>frps 发起连接</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func (pxy *BaseProxy) GetWorkConnFromPool(src, dst net.Addr) (workConn net.Conn, err error) {
  xl := xlog.FromContextSafe(pxy.ctx)
  // try all connections from the pool
  for i := 0; i &amp;lt; pxy.poolCount+1; i++ {
    // !important 核心代码5
    if workConn, err = pxy.getWorkConnFn(); err != nil {
      xl.Warn(&amp;quot;failed to get work connection: %v&amp;quot;, err)
      return
    }
    xl.Debug(&amp;quot;get a new work connection: [%s]&amp;quot;, workConn.RemoteAddr().String())
    xl.Spawn().AppendPrefix(pxy.GetName())
    workConn = frpNet.NewContextConn(pxy.ctx, workConn)
    ......
    // !important 核心代码6
    err := msg.WriteMsg(workConn, &amp;amp;msg.StartWorkConn{
      ProxyName: pxy.GetName(),
      SrcAddr:   srcAddr,
      SrcPort:   uint16(srcPort),
      DstAddr:   dstAddr,
      DstPort:   uint16(dstPort),
      Error:     &amp;quot;&amp;quot;,
    })
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>frp/server/proxy.go</code>中</p><ul><li>核心代码5: <code>frps</code>从多个连接中通过依次遍历的方式来获取第一个成功获取到的连接</li><li>核心代码6:<code>frps</code>通过获取到的连接向 frpc 发出 &amp;msg.StartWorkConn 的消息，告诉<code>frpc</code>建立连接的相应信息</li></ul><p><strong>frpc 响应连接</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func (pxy *TCPProxy) InWorkConn(conn net.Conn, m *msg.StartWorkConn) {
  // !important 核心代码7
  HandleTCPWorkConnection(pxy.ctx, &amp;amp;pxy.cfg.LocalSvrConf, pxy.proxyPlugin, pxy.cfg.GetBaseInfo(), pxy.limiter,
    conn, []byte(pxy.clientCfg.Token), m)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>frp/client/proxy/proxy.go</code>中</p><ul><li>核心代码7:<code>frpc</code>接收到<code>frps</code>的信息后发起 TCP 连接</li></ul><p><strong>frps发送消息</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func (ctl *Control) writer() {
  xl := ctl.xl
  defer func() {
    if err := recover(); err != nil {
      xl.Error(&amp;quot;panic error: %v&amp;quot;, err)
      xl.Error(string(debug.Stack()))
    }
  }()
​
  defer ctl.allShutdown.Start()
  defer ctl.writerShutdown.Done()
​
  encWriter, err := crypto.NewWriter(ctl.conn, []byte(ctl.serverCfg.Token))
  if err != nil {
    xl.Error(&amp;quot;crypto new writer error: %v&amp;quot;, err)
    ctl.allShutdown.Start()
    return
  }
  for {
    m, ok := &amp;lt;-ctl.sendCh
    if !ok {
      xl.Info(&amp;quot;control writer is closing&amp;quot;)
      return
    }
    // !important 核心代码8
    if err := msg.WriteMsg(encWriter, m); err != nil {
      xl.Warn(&amp;quot;write message to control connection error: %v&amp;quot;, err)
      return
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>frp/server/control.go</code>中</p><ul><li>核心代码8: <code>frps</code>发送信息到 crypto.NewWriter() 创建的 writer 中</li></ul><p><strong>frpc 接收和响应</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// !important 核心代码9
func (ctl *Control) reader() {
  xl := ctl.xl
  defer func() {
    if err := recover(); err != nil {
      xl.Error(&amp;quot;panic error: %v&amp;quot;, err)
      xl.Error(string(debug.Stack()))
    }
  }()
  defer ctl.readerShutdown.Done()
  defer close(ctl.closedCh)
​
  encReader := crypto.NewReader(ctl.conn, []byte(ctl.clientCfg.Token))
  for {
    m, err := msg.ReadMsg(encReader)
    if err != nil {
      if err == io.EOF {
        xl.Debug(&amp;quot;read from control connection EOF&amp;quot;)
        return
      }
      xl.Warn(&amp;quot;read error: %v&amp;quot;, err)
      ctl.conn.Close()
      return
    }
    ctl.readCh &amp;lt;- m
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>核心代码9: <code>frpc</code> 读取 <code>frps</code> 转发的信息</li></ul><p>到这里，我们的 <code>frps</code> 已经成功将公网中接收到的请求转发到 <code>frpc</code> 相应的端口了，这就是一个最简单的请求通过 frp 进行代理转发的流程。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>本文所介绍的内网穿透技术相关的实现方式其实在我们的日常开发生活中有更多的使用场景，当我们深入了解了当前 IP 地址以及内外网的实现方式后，我们不难发现，当我们将内网穿透的图片稍加修改后就成为了我们常用的另一种功能的实现方式(VPN实现原理)：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3126ec1a5370499ebb110bfe4bd66764~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20221016225413213"></p><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>`,32),k={href:"https://github.com/fatedier/frp",target:"_blank",rel:"noopener noreferrer"},y={href:"https://jiajunhuang.com/articles/2019_06_19-frp_source_code_part2.md.html",target:"_blank",rel:"noopener noreferrer"},C=e("h2",{id:"推荐阅读",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#推荐阅读","aria-hidden":"true"},"#"),n(" 推荐阅读")],-1),w={href:"https://juejin.cn/post/7176787612034662457",target:"_blank",rel:"noopener noreferrer"},j={href:"https://juejin.cn/post/7174190020297752613",target:"_blank",rel:"noopener noreferrer"},q={href:"https://juejin.cn/post/7169004126469914654",target:"_blank",rel:"noopener noreferrer"},S={href:"https://juejin.cn/post/7166416369943068679",target:"_blank",rel:"noopener noreferrer"},N={href:"https://juejin.cn/post/7163801933612843016",target:"_blank",rel:"noopener noreferrer"},T=e("h2",{id:"开源作品",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#开源作品","aria-hidden":"true"},"#"),n(" 开源作品")],-1),W=e("ul",null,[e("li",null,"政采云前端小报")],-1),V={href:"http://zoo.zhengcaiyun.cn/",target:"_blank",rel:"noopener noreferrer"},z=e("ul",null,[e("li",null,"商品选择 sku 插件")],-1),A={href:"https://github.com/zcy-inc/skuPathFinder-back",target:"_blank",rel:"noopener noreferrer"},E=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),n(" 招贤纳士")],-1),L=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云研发部，Base 在风景如画的杭州。团队现有 80 余个前端小伙伴，平均年龄 27 岁，近 4 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),F=e("p",null,[n("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),D=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98d3aa3d1f8646a8bcda8cfd9e335a4b~tplv-k3u1fbpfcp-zoom-1.image",alt:""})],-1);function R(B,M){const i=t("ExternalLinkIcon");return a(),d("div",null,[c,p,e("p",null,[n("> 这是第 169 篇不掺水的原创，想获取更多原创好文，请搜索公众号关注我们吧~ 本文首发于政采云前端博客："),e("a",v,[n("内网穿透你真的了解吗？"),r(i)])]),u,e("p",null,[m,n("作为程序员常用的调试手段之一，我们可以通过在个人电脑上运行花生壳或者 frp 等方式，让他人访问我们本地启动的服务，而且这种访问可以不受局域网的限制，当我们使用"),e("a",b,[f,r(i)]),n(","),e("a",h,[g,r(i)]),n("等开源框架时，你是否有好奇过它神奇的作用？明明没有将服务部署到服务器，程序员们究竟是怎么通过这种特殊方式让所有人访问自己的主机的？本文将以"),_,n("为例，介绍内网穿透的原理。")]),x,e("p",null,[n("用户的请求将会经过域名解析，公网端口的转发以及内网主机的监听三个步骤成功将请求发送到对应的内网服务，当然 frp 相较于花生壳提供了更多的自定义配置项，此处不做详细讲解，有兴趣的读者可以访问："),e("a",P,[n("frp中文文档"),r(i)])]),I,e("p",null,[n("> "),e("a",k,[n("frp源码地址"),r(i)]),n(" > > "),e("a",y,[n("frp 源码阅读与分析(二)：TCP内网穿透的实现"),r(i)])]),C,e("p",null,[e("a",w,[n("代码在内存中的'形状'"),r(i)])]),e("p",null,[e("a",j,[n("前端本地化部署"),r(i)])]),e("p",null,[e("a",q,[n("Rollup 与 Webpack 的 Tree-shaking"),r(i)])]),e("p",null,[e("a",S,[n("Git 是如何工作的"),r(i)])]),e("p",null,[e("a",N,[n("大数据前端团队生存指南"),r(i)])]),T,W,e("p",null,[e("strong",null,[n("开源地址 "),e("a",V,[n("www.zoo.team/openweekly/"),r(i)])]),n(" (小报官网首页有微信交流群)")]),z,e("p",null,[e("strong",null,[n("开源地址 "),e("a",A,[n("https://github.com/zcy-inc/skuPathFinder-back/"),r(i)])])]),E,L,F,D])}const U=l(o,[["render",R],["__file","内网穿透你真的了解吗？.html.vue"]]);export{U as default};
