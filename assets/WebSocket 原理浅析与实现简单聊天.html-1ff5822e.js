import{_ as t,z as l,A as d,Y as e,C as n,U as a,a6 as i,Q as c}from"./framework-cb9358d9.js";const r={},o=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8d2b0103c1fa~tplv-t2oaga2asx-image.image",alt:""})],-1),m=e("h2",{id:"",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#","aria-hidden":"true"},"#"),n(" **")],-1),v=e("p",null,'<table><tbody><tr><td bgcolor="#FDFFE7"><font size="4">原创不易，希望能关注下我们，再顺手点个赞~~<font></font></font></td></tr></tbody></table> **',-1),p={href:"https://www.zoo.team/article/websocket",target:"_blank",rel:"noopener noreferrer"},b=i(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/20/16e8894b8d5376b1~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>随着 Web 的发展，用户对于 Web 的实时推送要求也越来越高，在 WebSocket 出现之前，大多数情况下是通过客户端发起轮询来拿到服务端实时更新的数据，因为 HTTP1.x 协议有一个缺陷就是通信只能由客户端发起，服务端没法主动给客户端推送。这种方式在对实时性要求比较高的场景下，比如即时通讯、即时报价等，显然会十分低效，体验也不好。为了解决这个问题，便出现了 WebSocket 协议，实现了客户端和服务端双向通信的能力。介绍 WebSocket 之前，还是让我们先了解下轮询实现推送的方式。</p><h2 id="短轮询-polling" tabindex="-1"><a class="header-anchor" href="#短轮询-polling" aria-hidden="true">#</a> 短轮询（Polling）</h2><p>短轮询的实现思路就是浏览器端每隔几秒钟向服务器端发送 HTTP 请求，服务端在收到请求后，不论是否有数据更新，都直接进行响应。在服务端响应完成，就会关闭这个 TCP 连接，代码实现也最简单，就是利用 XHR ， 通过 setInterval 定时向后端发送请求，以获取最新的数据。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>setInterval(function() {
  fetch(url).then((res) =&amp;gt; {
      // success code
  })
}, 3000);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>优点：实现简单。</li><li>缺点：会造成数据在一小段时间内不同步和大量无效的请求，安全性差、浪费资源。</li></ul><h2 id="长轮询-long-polling" tabindex="-1"><a class="header-anchor" href="#长轮询-long-polling" aria-hidden="true">#</a> 长轮询（Long-Polling）</h2><p>客户端发送请求后服务器端不会立即返回数据，服务器端会阻塞请求连接不会立即断开，直到服务器端有数据更新或者是连接超时才返回，客户端才再次发出请求新建连接、如此反复从而获取最新数据。大致效果如下：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/29/16d7a81140d86334~tplv-t2oaga2asx-image.image" alt="长轮询示意图"></p><p>客户端代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function async() {
    fetch(url).then((res) =&amp;gt; {
    	async();
    	// success code
	}).catch(() =&amp;gt; {
		// 超时
        async();
	})
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>优点：比 Polling 做了优化，有较好的时效性。</li><li>缺点：保持连接挂起会消耗资源，服务器没有返回有效数据，程序超时。</li></ul><h2 id="websocket" tabindex="-1"><a class="header-anchor" href="#websocket" aria-hidden="true">#</a> WebSocket</h2><p>前面提到的短轮询（Polling）和长轮询（Long-Polling）， 都是先由客户端发起 Ajax 请求，才能进行通信，走的是 HTTP 协议，服务器端无法主动向客户端推送信息。</p><p>当出现类似体育赛事、聊天室、实时位置之类的场景时，轮询就显得十分低效和浪费资源，因为要不断发送请求，连接服务器。WebSocket 的出现，让服务器端可以主动向客户端发送信息，使得浏览器具备了实时双向通信的能力。</p><p>没用过 WebSocket 的人，可能会以为它是个什么高深的技术。其实不然，WebSocket 常用的 API 不多也很容易掌握，不过在介绍如何使用之前，让我们先看看它的通信原理。</p><h3 id="通信原理" tabindex="-1"><a class="header-anchor" href="#通信原理" aria-hidden="true">#</a> 通信原理</h3><p>当客户端要和服务端建立 WebSocket 连接时，在客户端和服务器的握手过程中，客户端首先会向服务端发送一个 HTTP 请求，包含一个 Upgrade 请求头来告知服务端客户端想要建立一个 WebSocket 连接。</p><p>在客户端建立一个 WebSocket 连接非常简单：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>let ws = new WebSocket(&amp;#39;ws://localhost:9000&amp;#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>类似于 HTTP 和 HTTPS，ws 相对应的也有 wss 用以建立安全连接，本地已 ws 为例。这时的请求头如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: no-cache
Connection: Upgrade	// 表示该连接要升级协议
Cookie: _hjMinimizedPolls=358479; ts_uid=7852621249; CNZZDATA1259303436=1218855313-1548914234-%7C1564625892; csrfToken=DPb4RhmGQfPCZnYzUCCOOade; JSESSIONID=67376239124B4355F75F1FC87C059F8D; _hjid=3f7157b6-1aa0-4d5c-ab9a-45eab1e6941e; acw_tc=76b20ff415689655672128006e178b964c640d5a7952f7cb3c18ddf0064264
Host: localhost:9000
Origin: http://localhost:9000
Pragma: no-cache
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
Sec-WebSocket-Key: 5fTJ1LTuh3RKjSJxydyifQ==		// 与响应头 Sec-WebSocket-Accept 相对应
Sec-WebSocket-Version: 13	// 表示 websocket 协议的版本
Upgrade: websocket	// 表示要升级到 websocket 协议
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>响应头如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Connection: Upgrade
Sec-WebSocket-Accept: ZUip34t+bCjhkvxxwhmdEOyx9hE=
Upgrade: websocket
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/20/16e88fa8f23df259~tplv-t2oaga2asx-image.image" alt=""></p><p>此时响应行（General）中可以看到状态码 status code 是 101 Switching Protocols ， 表示该连接已经从 HTTP 协议转换为 WebSocket 通信协议。 转换成功之后，该连接并没有中断，而是建立了一个全双工通信，后续发送和接收消息都会走这个连接通道。</p><p>注意，请求头中有个 Sec-WebSocket-Key 字段，和相应头中的 Sec-WebSocket-Accept 是配套对应的，它的作用是提供了基本的防护，比如恶意的连接或者无效的连接。Sec-WebSocket-Key 是客户端随机生成的一个 base64 编码，服务器会使用这个编码，并根据一个固定的算法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GUID = &amp;quot;258EAFA5-E914-47DA-95CA-C5AB0DC85B11&amp;quot;;    //  一个固定的字符串
accept = base64(sha1(key + GUID));	// key 就是 Sec-WebSocket-Key 值，accept 就是 Sec-WebSocket-Accept 值
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>`,31),u={href:"https://tools.ietf.org/html/rfc6455#section-5.5.2",target:"_blank",rel:"noopener noreferrer"},g=i(`<p>客户端拿到服务端响应的 Sec-WebSocket-Accept 后，会拿自己之前生成的 Sec-WebSocket-Key 用相同算法算一次，如果匹配，则握手成功。然后判断 HTTP Response 状态码是否为 101（切换协议），如果是，则建立连接，大功告成。</p><h3 id="实现简单单聊" tabindex="-1"><a class="header-anchor" href="#实现简单单聊" aria-hidden="true">#</a> 实现简单单聊</h3><p>下面来实现一个纯文字消息类型的一对一聊天（单聊）功能，废话不多说，直接上代码，注意看注释。</p><p>客户端：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function connectWebsocket() {
    ws = new WebSocket(&amp;#39;ws://localhost:9000&amp;#39;);
    // 监听连接成功
    ws.onopen = () =&amp;gt; {
        console.log(&amp;#39;连接服务端WebSocket成功&amp;#39;);
        ws.send(JSON.stringify(msgData));	// send 方法给服务端发送消息
    };

    // 监听服务端消息(接收消息)
    ws.onmessage = (msg) =&amp;gt; {
        let message = JSON.parse(msg.data);
        console.log(&amp;#39;收到的消息：&amp;#39;, message)
        elUl.innerHTML += \`&amp;lt;li class=&amp;quot;b&amp;quot;&amp;gt;小秋：\${message.content}&amp;lt;/li&amp;gt;\`;
    };

    // 监听连接失败
    ws.onerror = () =&amp;gt; {
        console.log(&amp;#39;连接失败，正在重连...&amp;#39;);
        connectWebsocket();
    };

    // 监听连接关闭
    ws.onclose = () =&amp;gt; {
    	console.log(&amp;#39;连接关闭&amp;#39;);
    };
};
connectWebsocket();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><p>从上面可以看到 WebSocket 实例的 API 很容易理解，简单好用，通过 send() 方法可以发送消息，onmessage 事件用来接收消息，然后对消息进行处理显示在页面上。 当 onerror 事件（监听连接失败）触发时，最好进行执行重连，以保持连接不中断。</p>`,7),h={href:"https://github.com/websockets/ws",target:"_blank",rel:"noopener noreferrer"},x=i(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const path = require(&amp;#39;path&amp;#39;);
const express = require(&amp;#39;express&amp;#39;);
const app = express();
const server = require(&amp;#39;http&amp;#39;).Server(app);
const WebSocket = require(&amp;#39;ws&amp;#39;);

const wss = new WebSocket.Server({ server: server });

wss.on(&amp;#39;connection&amp;#39;, (ws) =&amp;gt; { 

  // 监听客户端发来的消息
  ws.on(&amp;#39;message&amp;#39;, (message) =&amp;gt; {
    console.log(wss.clients.size);
    let msgData = JSON.parse(message);   
    if (msgData.type === &amp;#39;open&amp;#39;) {
      // 初始连接时标识会话
      ws.sessionId = \`\${msgData.fromUserId}-\${msgData.toUserId}\`;
    } else {
      let sessionId = \`\${msgData.toUserId}-\${msgData.fromUserId}\`;
      wss.clients.forEach(client =&amp;gt; {
        if (client.sessionId === sessionId) {
          client.send(message);	 // 给对应的客户端连接发送消息
        }
      })  
    }
  })

  // 连接关闭
  ws.on(&amp;#39;close&amp;#39;, () =&amp;gt; {
    console.log(&amp;#39;连接关闭&amp;#39;);  
  });
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>`,2),_={href:"https://github.com/lvbowen/WebSocket",target:"_blank",rel:"noopener noreferrer"},f=i(`<p>​</p><p>这样浏览器和服务端就可以愉快的发送消息了，效果如下：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/20/16e86f4da01fc06e~tplv-t2oaga2asx-image.image" alt="message"></p><p>其中绿色箭头表示发出的消息，红色箭头表示收到的消息。</p><h3 id="心跳保活" tabindex="-1"><a class="header-anchor" href="#心跳保活" aria-hidden="true">#</a> 心跳保活</h3><p>在实际使用 WebSocket 中，长时间不通消息可能会出现一些连接不稳定的情况，这些未知情况导致的连接中断会影响客户端与服务端之前的通信，</p><p>为了防止这种的情况的出现，有一种心跳保活的方法：客户端就像心跳一样每隔固定的时间发送一次 ping ，来告诉服务器，我还活着，而服务器也会返回 pong ，来告诉客户端，服务器还活着。ping/pong 其实是一条与业务无关的假消息，也称为心跳包。</p><p>​</p><p>可以在连接成功之后，每隔一个固定时间发送心跳包，比如 60s:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>setInterval(() =&amp;gt; {
    ws.send(&amp;#39;这是一条心跳包消息&amp;#39;);
}, 60000)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/20/16e86f4da4cfab4b~tplv-t2oaga2asx-image.image" alt="websocket通信原理"></p><p>通过上面的介绍，大家应该对 WebSocket 有了一定认识，其实并不神秘，这里对文章内容简单总结一下。当创建 WebSocket 实例的时候，会发一个 HTTP 请求，请求报文中有个特殊的字段 Upgrade ，然后这个连接会由 HTTP 协议转换为 WebSocket 协议，这样客户端和服务端建立了全双工通信，通过 WebSocket 的 send 方法和 onmessage 事件就可以通过这条通信连接交换信息。</p><h2 id="招贤纳士" tabindex="-1"><a class="header-anchor" href="#招贤纳士" aria-hidden="true">#</a> 招贤纳士</h2><p>政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。</p><p>如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 <code>ZooTeam@cai-inc.com</code></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,18),k={href:"https://juejin.cn/post/6844903976068972552",target:"_blank",rel:"noopener noreferrer"},S={href:"https://juejin.cn/post/6844903988081475591",target:"_blank",rel:"noopener noreferrer"},w={href:"https://juejin.cn/post/6844903981819379719",target:"_blank",rel:"noopener noreferrer"};function W(T,j){const s=c("ExternalLinkIcon");return l(),d("div",null,[o,m,v,e("p",null,[n("> 本文首发于政采云前端团队博客： "),e("a",p,[n("WebSocket 原理浅析与实现简单聊"),a(s)])]),b,e("p",null,[n("其中 GUID 字符串是 "),e("a",u,[n("RFC6455"),a(s)]),n(" 官方定义的一个固定字符串，不得修改。")]),g,e("p",null,[n("服务端 Node : （这里使用 "),e("a",h,[n("ws"),a(s)]),n(" 库）")]),x,e("p",null,[n("同理，服务端也有对应的发送和接收的方法。完整示例代码见 "),e("a",_,[n("这里"),a(s)])]),f,e("p",null,[e("a",k,[n("1024 巨献！！一文看尽前端过去一年的精华沉淀（700 篇好文大汇总）"),a(s)])]),e("p",null,[e("a",S,[n("可能是最全的 “文本溢出截断省略” 方案合集"),a(s)])]),e("p",null,[e("a",w,[n("乾坤大挪移！React 也能 “用上” computed 属性"),a(s)])])])}const P=t(r,[["render",W],["__file","WebSocket 原理浅析与实现简单聊天.html.vue"]]);export{P as default};
