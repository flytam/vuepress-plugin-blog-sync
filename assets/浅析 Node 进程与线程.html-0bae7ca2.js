import{_ as d,z as r,A as l,Y as e,C as n,U as s,a6 as a,Q as t}from"./framework-cb9358d9.js";const c={},o=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8d2b0103c1fa~tplv-t2oaga2asx-image.image",alt:""})],-1),v=e("h2",{id:"",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#","aria-hidden":"true"},"#"),n(" **")],-1),u=e("p",null,'<table><tbody><tr><td bgcolor="#FDFFE7"><font size="4">原创不易，希望能关注下我们，再顺手点个赞~~<font></font></font></td></tr></tbody></table> **',-1),m={href:"https://www.zoo.team/article/node-process-thread",target:"_blank",rel:"noopener noreferrer"},p=a(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/28/16f4bf9f74d87b73~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>进程与线程是操作系统中两个重要的角色，它们维系着不同程序的执行流程，通过系统内核的调度，完成多任务执行。今天我们从 Node.js（以下简称 Node）的角度来一起学习相关知识，通过本文读者将了解 Node 进程与线程的特点、代码层面的使用以及它们之间的通信。</p><h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h2><p>首先，我们还是回顾一下相关的定义：</p><p>进程是一个具有一定独立功能的程序在一个数据集上的一次动态执行的过程，是操作系统进行资源分配和调度的一个独立单位，是应用程序运行的载体。</p><p>线程是程序执行中一个单一的顺序控制流，它存在于进程之中，是比进程更小的能独立运行的基本单位。</p><p>早期在单核 CPU 的系统中，为了实现多任务的运行，引入了进程的概念，不同的程序运行在数据与指令相互隔离的进程中，通过时间片轮转调度执行，由于 CPU 时间片切换与执行很快，所以看上去像是在同一时间运行了多个程序。</p><p>由于进程切换时需要保存相关硬件现场、进程控制块等信息，所以系统开销较大。为了进一步提高系统吞吐率，在同一进程执行时更充分的利用 CPU 资源，引入了线程的概念。线程是操作系统调度执行的最小单位，它们依附于进程中，共享同一进程中的资源，基本不拥有或者只拥有少量系统资源，切换开销极小。</p><h2 id="单线程" tabindex="-1"><a class="header-anchor" href="#单线程" aria-hidden="true">#</a> 单线程?</h2><p>我们常常听到有开发者说 “ Node.js 是单线程的”，那么 Node 确实是只有一个线程在运行吗？</p><p>首先，在终行以下 Node 代码（示例一）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 示例一
require(&amp;#39;http&amp;#39;).createServer((req, res) =&amp;gt; {
  res.writeHead(200);
  res.end(&amp;#39;Hello World&amp;#39;);
}).listen(8000);
console.log(&amp;#39;process id&amp;#39;, process.pid);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Node 内建模块 http 创建了一个监听 8000 端口的服务，并打印出该服务运行进程的 pid，控制台输出 pid 为 35919（可变），然后我们通过命令 <code>top \\-pid 35919</code> 查看进程的详细信息，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PID    COMMAND      %CPU TIME     #TH  #WQ  #POR MEM    PURG CMPRS  PGRP  PPID  STATE    BOOSTS     %CPU_ME
35919  node         0.0  00:00.09 7    0    35   8564K  0B   8548K  35919 35622 sleeping *0[1]      0.00000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看到 <code>#TH</code> (threads 线程) 这一列显示此进程中包含 7 个线程，<strong>说明 Node 进程中并非只有一个线程</strong>。事实上一个 Node 进程通常包含：1 个 Javascript 执行主线程；1 个 watchdog 监控线程用于处理调试信息；1 个 v8 task scheduler 线程用于调度任务优先级，加速延迟敏感任务执行；4 个 v8 线程（可参考以下代码），主要用来执行代码调优与 GC 等后台任务；以及用于异步 I / O 的 libuv 线程池。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// v8 初始化线程
const int thread_pool_size = 4; // 默认 4 个线程
default_platform = v8::platform::CreateDefaultPlatform(thread_pool_size);
V8::InitializePlatform(default_platform);
V8::Initialize();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中异步 I/O 线程池，如果执行程序中不包含 I/O 操作如文件读写等，则默认线程池大小为 0，否则 Node 会初始化大小为 4 的异步 I/O 线程池，当然我们也可以通过 <code>p<wbr>rocess.env.UV_THREADPOOL_SIZE</code> 自己设定线程池大小。需要注意的是在 Node 中网络 I/O 并不占用线程池。</p><p>下图为 Node 的进程结构图：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/28/16f4bf755017c54b~tplv-t2oaga2asx-image.image" alt="图片"></p><p>为了验证上述分析，我们运行示例二的代码，加入文件 I/O 操作：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 示例二
require(&amp;#39;fs&amp;#39;).readFile(&amp;#39;./test.log&amp;#39;, err =&amp;gt; {
  if (err) {
    console.log(err);
    process.exit();
  } else {
    console.log(Date.now(), &amp;#39;Read File I/O&amp;#39;);
  }
});
console.log(process.pid);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后得到如下结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PID    COMMAND      %CPU TIME     #TH  #WQ  #POR MEM    PURG CMPR PGRP  PPID  STATE    BOOSTS     %CPU_ME %CPU_OTHRS
39443  node         0.0  00:00.10 11   0    39   8088K  0B   0B   39443 35622 sleeping *0[1]      0.00000 0.00000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此时 <code>#TH</code> 一栏的线程数变成了 11，即大小为 4 的 I/O 线程池被创建。至此，我们针对段首的问题心里有了答案，<strong>Node 严格意义讲并非只有一个线程，通常说的 “Node 是单线程” 其实是指 JS 的执行主线程只有一个</strong>。</p><h2 id="事件循环" tabindex="-1"><a class="header-anchor" href="#事件循环" aria-hidden="true">#</a> 事件循环</h2><p>既然 JS 执行线程只有一个，那么 Node 为什么还能支持较高的并发？</p><p>从上文异步 I/O 我们也能获得一些思路，Node 进程中通过 libuv 实现了一个事件循环机制（uv_event_loop），当执主程发生阻塞事件，如 I/O 操作时，主线程会将耗时的操作放入事件队列中，然后继续执行后续程序。</p><p>uv_event_loop 尝试从 libuv 的线程池（uv_thread_pool）中取出一个空闲线程去执行队列中的操作，执行完毕获得结果后，通知主线程，主线程执行相关回调，并且将线程实例归还给线程池。通过此模式循环往复，来保证非阻塞 I/O，以及主线程的高效执行。</p><p>相关流程可参照下图：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/28/16f4bf749b92cfe4~tplv-t2oaga2asx-image.image" alt="图片"></p><h2 id="子进程" tabindex="-1"><a class="header-anchor" href="#子进程" aria-hidden="true">#</a> 子进程</h2>`,32),b={href:"https://nodejs.org/api/child_process.html",target:"_blank",rel:"noopener noreferrer"},h=a(`<h3 id="创建" tabindex="-1"><a class="header-anchor" href="#创建" aria-hidden="true">#</a> 创建</h3><p>child_process 模块提供了 4 种异步创建 Node 进程的方法，具体可参考 child_process API，这里做一下简要介绍。</p><ul><li>spawn 以主命令加参数数组的形式创建一个子进程，子进程以流的形式返回 data 和 error 信息。</li><li>exec 是对 spawn 的封装，可直接传入命令行执行，以 callback 形式返回 error stdout stderr 信息</li><li>execFile 类似于 exec 函数，但默认不会创建命令行环境，将直接以传入的文件创建新的进程，性能略微优于 exec</li><li>fork 是 spawn 的特殊场景，只能用于创建 node 程序的子进程，默认会建立父子进程的 IPC 信道来传递消息</li></ul><h3 id="通信" tabindex="-1"><a class="header-anchor" href="#通信" aria-hidden="true">#</a> 通信</h3><p>在 Linux 系统中，可以通过管道、消息队列、信号量、共享内存、Socket 等手段来实现进程通信。在 Node 中，父子进程可通过 IPC(Inter-Process Communication) 信道收发消息，IPC 由 libuv 通过管道 pipe 实现。一旦子进程被创建，并设置父子进程的通信方式为 IPC（参考 stdio 设置），父子进程即可双向通信。</p><p>进程之间通过 <code>process.send</code> 发送消息，通过监听 <code>message</code> 事件接收消息。当一个进程发送消息时，会先序列化为字符串，送入 IPC 信道的一端，另一个进程在另一端接收消息内容，并且反序列化，因此我们可以在进程之间传递对象。</p><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h3><p>以下是 Node.js 创建进程和通信的一个基础示例，主进程创建一个子进程并将计算斐波那契数列的第 44 项这一 CPU 密集型的任务交给子进程，子进程执行完成后通过 IPC 信道将结果发送给主进程：</p><p>main_process.js</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 主进程
const { fork } = require(&amp;#39;child_process&amp;#39;);
const child = fork(&amp;#39;./fib.js&amp;#39;); // 创建子进程
child.send({ num: 44 }); // 将任务执行数据通过信道发送给子进程
child.on(&amp;#39;message&amp;#39;, message =&amp;gt; {
  console.log(&amp;#39;receive from child process, calculate result: &amp;#39;, message.data);
  child.kill();
});
child.on(&amp;#39;exit&amp;#39;, () =&amp;gt; {
  console.log(&amp;#39;child process exit&amp;#39;);
});
setInterval(() =&amp;gt; { // 主进程继续执行
  console.log(&amp;#39;continue excute javascript code&amp;#39;, new Date().getSeconds());
}, 1000);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>fib.js</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 子进程 fib.js
// 接收主进程消息，计算斐波那契数列第 N 项，并发送结果给主进程
// 计算斐波那契数列第 n 项
function fib(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(num - 2) + fib(num - 1);
}
process.on(&amp;#39;message&amp;#39;, msg =&amp;gt; { // 获取主进程传递的计算数据
  console.log(&amp;#39;child pid&amp;#39;, process.pid);
  const { num } = msg;
  const data = fib(num);
  process.send({ data }); // 将计算结果发送主进程
});
// 收到 kill 信息，进程退出
process.on(&amp;#39;SIGHUP&amp;#39;, function() {
  process.exit();
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>child pid 39974
continue excute javascript code 41
continue excute javascript code 42
continue excute javascript code 43
continue excute javascript code 44
receive from child process, calculate result:  1134903170
child process exit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="集群模式" tabindex="-1"><a class="header-anchor" href="#集群模式" aria-hidden="true">#</a> 集群模式</h2>`,15),g={href:"https://nodejs.org/api/cluster.html",target:"_blank",rel:"noopener noreferrer"},x=a(`<p>cluster 模块同时实现了负载均衡调度算法，在类 unix 系统中，cluster 使用轮转调度（round-robin），node 中维护一个可用 worker 节点的队列 free，和一个任务队列 handles。当一个新的任务到来时，节点队列队首节点出队，处理该任务，并返回确认处理标识，依次调度执行。而在 win 系统中，Node 通过 Shared Handle 来处理负载，通过将文件描述符、端口等信息传递给子进程，子进程通过信息创建相应的 SocketHandle / ServerHandle，然后进行相应的端口绑定和监听，处理请求。</p><p>cluster 大大的简化了多进程模型的使用，以下是使用示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 计算斐波那契数列第 43 / 44 项
const cluster = require(&amp;#39;cluster&amp;#39;);
// 计算斐波那契数列第 n 项
function fib(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(num - 2) + fib(num - 1);
}
if (cluster.isMaster) { // 主控节点逻辑
  for (let i = 43; i &amp;lt; 45; i++) {
    const worker = cluster.fork() // 启动子进程
    // 发送任务数据给执行进程，并监听子进程回传的消息
    worker.send({ num: i });
    worker.on(&amp;#39;message&amp;#39;, message =&amp;gt; {
      console.log(\`receive fib(\${message.num}) calculate result \${message.data}\`)
      worker.kill();
    });
  }
    
  // 监听子进程退出的消息，直到子进程全部退出
  cluster.on(&amp;#39;exit&amp;#39;, worker =&amp;gt; {
    console.log(&amp;#39;worker &amp;#39; + worker.process.pid + &amp;#39; killed!&amp;#39;);
    if (Object.keys(cluster.workers).length === 0) {
      console.log(&amp;#39;calculate main process end&amp;#39;);
    }
  });
} else {
  // 子进程执行逻辑
  process.on(&amp;#39;message&amp;#39;, message =&amp;gt; { // 监听主进程发送的信息
    const { num } = message;
    console.log(&amp;#39;child pid&amp;#39;, process.pid, &amp;#39;receive num&amp;#39;, num);
    const data = fib(num);
    process.send({ data, num }); // 将计算结果发送给主进程
  })
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="工作线程" tabindex="-1"><a class="header-anchor" href="#工作线程" aria-hidden="true">#</a> 工作线程</h2>`,4),f={href:"https://nodejs.org/api/worker_threads.html",target:"_blank",rel:"noopener noreferrer"},_=a(`<h3 id="创建-1" tabindex="-1"><a class="header-anchor" href="#创建-1" aria-hidden="true">#</a> 创建</h3><p>通过 worker_threads 模块中的 Worker 类我们可以通过传入执行文件的路径创建线程。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const { Worker } = require(&amp;#39;worker_threads&amp;#39;);
...
const worker = new Worker(filepath);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="通信-1" tabindex="-1"><a class="header-anchor" href="#通信-1" aria-hidden="true">#</a> 通信</h3><h4 id="使用-parentport-进行父子线程通信" tabindex="-1"><a class="header-anchor" href="#使用-parentport-进行父子线程通信" aria-hidden="true">#</a> 使用 parentPort 进行父子线程通信</h4>`,5),k={href:"https://developer.mozilla.org/en-US/docs/Web/API/MessagePort",target:"_blank",rel:"noopener noreferrer"},P=a(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const { Worker, isMainThread, parentPort } = require(&amp;#39;worker_threads&amp;#39;);
// 计算斐波那契数列第 n 项
function fib(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(num - 2) + fib(num - 1);
}
if (isMainThread) { // 主线程执行函数
  const worker = new Worker(__filename);
  worker.once(&amp;#39;message&amp;#39;, (message) =&amp;gt; {
    const { num, result } = message;
    console.log(\`Fibonacci(\${num}) is \${result}\`);
    process.exit();
  });
  worker.postMessage(43);
  console.log(&amp;#39;start calculate Fibonacci&amp;#39;);
  // 继续执行后续的计算程序
  setInterval(() =&amp;gt; {
    console.log(\`continue execute code \${new Date().getSeconds()}\`);
  }, 1000);
} else { // 子线程执行函数
  parentPort.once(&amp;#39;message&amp;#39;, (message) =&amp;gt; {
    const num = message;
    const result = fib(num);
    // 子线程执行完毕，发消息给父线程
    parentPort.postMessage({
      num,
      result
    });
  });
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>start calculate Fibonacci
continue execute code 8
continue execute code 9
continue execute code 10
continue execute code 11
Fibonacci(43) is 433494437

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用-messagechannel-实现线程间通信" tabindex="-1"><a class="header-anchor" href="#使用-messagechannel-实现线程间通信" aria-hidden="true">#</a> 使用 MessageChannel 实现线程间通信</h3><p>worker_threads 还可以支持线程间的直接通信，通过两个连接在一起的 MessagePort 端口，worker_threads 实现了双向通信的 MessageChannel。线程间可通过 postMessage 相互通信，示例如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const {
  isMainThread, parentPort, threadId, MessageChannel, Worker
} = require(&amp;#39;worker_threads&amp;#39;);
 
if (isMainThread) {
  const worker1 = new Worker(__filename);
  const worker2 = new Worker(__filename);
  // 创建通信信道，包含 port1 / port2 两个端口
  const subChannel = new MessageChannel();
  // 两个子线程绑定各自信道的通信入口
  worker1.postMessage({ port: subChannel.port1 }, [ subChannel.port1 ]);
  worker2.postMessage({ port: subChannel.port2 }, [ subChannel.port2 ]);
} else {
  parentPort.once(&amp;#39;message&amp;#39;, value =&amp;gt; {
    value.port.postMessage(\`Hi, I am thread\${threadId}\`);
    value.port.on(&amp;#39;message&amp;#39;, msg =&amp;gt; {
      console.log(\`thread\${threadId} receive: \${msg}\`);
    });
  });
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>thread2 receive: Hi, I am thread1
thread1 receive: Hi, I am thread2

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="注意" tabindex="-1"><a class="header-anchor" href="#注意" aria-hidden="true">#</a> 注意</h3><p>worker_threads 只适用于进程内部 CPU 计算密集型的场景，而不适合于 I/O 密集场景，针对后者，官方建议使用进程的 event_loop 机制，将会更加高效可靠。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>Node.js 本身设计为单线程执行语言，通过 libuv 的线程池实现了高效的非阻塞异步 I/O，保证语言简单的特性，尽量减少编程复杂度。但是也带来了在多核应用以及 CPU 密集场景下的劣势，为了补齐这块短板，Node 可通过内建模块 child_process 创建额外的子进程来发挥多核的能力，以及在不阻塞主进程的前提下处理 CPU 密集任务。</p><p>为了简化开发者使用多进程模型以及端口复用，Node 又提供了 cluster 模块实现主-从节点模式的进程管理以及负载调度。由于进程创建、销毁、切换时系统开销较大，worker_threads 模块又随之推出，在保持轻量的前提下，可以利用更少的系统资源高效地处理 进程内 CPU 密集型任务，如数学计算、加解密，进一步提高进程的吞吐率。因篇幅有限，本次分享到此为止，诸多细节期待与大家相互探讨，共同钻研。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,15),w={href:"https://juejin.cn/post/6844903988081475591",target:"_blank",rel:"noopener noreferrer"},I={href:"https://juejin.cn/post/6844903981819379719",target:"_blank",rel:"noopener noreferrer"},C={href:"https://juejin.cn/post/6844903938018263048",target:"_blank",rel:"noopener noreferrer"};function N(M,j){const i=t("ExternalLinkIcon");return r(),l("div",null,[o,v,u,e("p",null,[n("> 本文首发于政采云前端团队博客： "),e("a",m,[n("浅析 Node 进程与线程"),s(i)])]),p,e("p",null,[n("通过事件循环机制，Node 实现了在 I/O 密集型（I/O-Sensitive）场景下的高并发，但是如果代码中遇到 CPU 密集场景（CPU-Sensitive）的场景，那么主线程将长时间阻塞，无法处理额外的请求。为了应对 CPU-Sensitive 场景，以及充分发挥 CPU 多核性能，Node 提供了 child_process 模块（"),e("a",b,[n("官方文档"),s(i)]),n("）进行进程的创建、通信、销毁等等。")]),h,e("p",null,[n("为了更加方便的管理进程、负载均衡以及实现端口复用，Node 在 v0.6 之后引入了 cluster 模块（"),e("a",g,[n("官方文档"),s(i)]),n("），相对于子进程模块，cluster 实现了单 master 主控节点和多 worker 执行节点的通用集群模式。cluster master 节点可以创建销毁进程并与子进程通信，子进程之间不能直接通信；worker 节点则负责执行耗时的任务。")]),x,e("p",null,[n("在 Node v10 以后，为了减小 CPU 密集型任务计算的系统开销，引入了新的特性：工作线程 worker_threads（"),e("a",f,[n("官方文档"),s(i)]),n("）。通过 worker_threads 可以在进程内创建多个线程，主线程与 worker 线程使用 parentPort 通信，worker 线程之间可通过 MessageChannel 直接通信。")]),_,e("p",null,[n("worker_threads 中使用了 MessagePort（继承于 EventEmitter，"),e("a",k,[n("参考"),s(i)]),n("）来实现线程通信。worker 线程实例上有 parentPort 属性，是 MessagePort 类型的一个实例，子线程可利用 postMessage 通过 parentPort 向父线程传递数据，示例如下：")]),P,e("ul",null,[e("li",null,[e("p",null,[e("a",w,[n("可能是最全的 “文本溢出截断省略” 方案合集"),s(i)])])]),e("li",null,[e("p",null,[e("a",I,[n("乾坤大挪移！React 也能 “用上” computed 属性"),s(i)])])]),e("li",null,[e("p",null,[e("a",C,[n("看完这篇，你也能把 React Hooks 玩出花"),s(i)])])])])])}const S=d(c,[["render",N],["__file","浅析 Node 进程与线程.html.vue"]]);export{S as default};
