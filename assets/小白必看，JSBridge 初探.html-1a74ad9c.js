import{_ as d,z as t,A as l,Y as e,C as i,U as a,a6 as s,Q as r}from"./framework-cb9358d9.js";const v={},c=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/22/17239e3edd804567~tplv-t2oaga2asx-image.image",alt:""})],-1),o={href:"https://www.zoo.team/article/jsbridge",target:"_blank",rel:"noopener noreferrer"},u=s(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/23/170716c5ede96285~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="jsbridge-的起源" tabindex="-1"><a class="header-anchor" href="#jsbridge-的起源" aria-hidden="true">#</a> JSBridge 的起源</h2><p>近些年，移动端普及化越来越高，开发过程中选用 Native 还是 H5 一直是热门话题。Native 和 H5 都有着各自的优缺点，为了满足业务的需要，公司实际项目的开发过程中往往会融合两者进行 Hybrid 开发。Native 和 H5 分处两地，看起来无法联系，那么如何才能让双方协同实现功能呢？</p><p>这时我们想到了 Cordova ，Cordova 提供了一组与设备相关的 API ，是早期 JS 调用原生代码来实现原生功能的常用方案。不过 JSBridge 真正在国内广泛应用是由于移动互联网的盛行。</p><p>JSBridge 是一种 JS 实现的 Bridge，连接着桥两端的 Native 和 H5。它在 APP 内方便地让 Native 调用 JS，JS 调用 Native ，是双向通信的通道。JSBridge 主要提供了 JS 调用 Native 代码的能力，实现原生功能如查看本地相册、打开摄像头、指纹支付等。</p><p><strong>H5 与 Native 对比</strong></p><table><thead><tr><th style="text-align:center;">name</th><th style="text-align:center;">H5</th><th style="text-align:center;">Native</th></tr></thead><tbody><tr><td style="text-align:center;">稳定性</td><td style="text-align:center;">调用系统浏览器内核，稳定性较差</td><td style="text-align:center;">使用原生内核，更加稳定</td></tr><tr><td style="text-align:center;">灵活性</td><td style="text-align:center;">版本迭代快，上线灵活</td><td style="text-align:center;">迭代慢，需要应用商店审核，上线速度受限制</td></tr><tr><td style="text-align:center;">受网速 影响</td><td style="text-align:center;">较大</td><td style="text-align:center;">较小</td></tr><tr><td style="text-align:center;">流畅度</td><td style="text-align:center;">有时加载慢，给用户“卡顿”的感觉</td><td style="text-align:center;">加载速度快，更加流畅</td></tr><tr><td style="text-align:center;">用户体验</td><td style="text-align:center;">功能受浏览器限制，体验有时较差</td><td style="text-align:center;">原生系统 api 丰富，能实现的功能较多，体验较好</td></tr><tr><td style="text-align:center;">可移植性</td><td style="text-align:center;">兼容跨平台跨系统，如 PC 与 移动端，iOS 与 Android</td><td style="text-align:center;">可移植性较低，对于 iOS 和 Android 需要维护两套代码</td></tr></tbody></table><h2 id="jsbridge-的双向通信原理" tabindex="-1"><a class="header-anchor" href="#jsbridge-的双向通信原理" aria-hidden="true">#</a> JSBridge 的双向通信原理</h2><ul><li><h4 id="js-调用-native" tabindex="-1"><a class="header-anchor" href="#js-调用-native" aria-hidden="true">#</a> JS 调用 Native</h4></li></ul><p>JS 调用 Native 的实现方式较多，主要有拦截 <code>URL Scheme</code> 、重写 prompt 、注入 API 等方法。</p><h5 id="拦截-url-scheme" tabindex="-1"><a class="header-anchor" href="#拦截-url-scheme" aria-hidden="true">#</a> 拦截 URL Scheme</h5><p>Android 和 iOS 都可以通过拦截 URL Scheme 并解析 Scheme 来决定是否进行对应的 Native 代码逻辑处理。</p><p>Android 的话，<code>Webview</code> 提供了 <code>shouldOverrideUrlLoading</code> 方法来提供给 Native 拦截 H5 发送的 <code>URL Scheme</code> 请求。代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class CustomWebViewClient extends WebViewClient {
  @Override
  public boolean shouldOverrideUrlLoading(WebView view, String url) {
    ......
    // 场景一： 拦截请求、接收 scheme
    if (url.equals(&amp;quot;xxx&amp;quot;)) {

      // handle
      ...
      // callback
      view.loadUrl(&amp;quot;javascript:setAllContent(&amp;quot; + json + &amp;quot;);&amp;quot;)
      return true;
    }
    return super.shouldOverrideUrlLoading(url);
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>iOS 的 <code>WKWebview</code> 可以根据拦截到的 <code>URL Scheme</code> 和对应的参数执行相关的操作。代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler{
    if ([navigationAction.request.URL.absoluteString hasPrefix:@&amp;quot;xxx&amp;quot;]) {
        [[UIApplication sharedApplication] openURL:navigationAction.request.URL];
    }
    decisionHandler(WKNavigationActionPolicyAllow);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法的优点是不存在漏洞问题、使用灵活，可以实现 H5 和 Native 页面的无缝切换。例如在某一页面需要快速上线的情况下，先开发出 H5 页面。某一链接填写的是 H5 链接，在对应的 Native 页面开发完成前先跳转至 H5 页面，待 Native 页面开发完后再进行拦截，跳转至 Native 页面，此时 H5 的链接无需进行修改。但是使用 iframe.src 来发送 <code>URL Scheme</code> 需要对 URL 的长度作控制，使用复杂，速度较慢。</p><h5 id="重写-prompt-等原生-js-方法" tabindex="-1"><a class="header-anchor" href="#重写-prompt-等原生-js-方法" aria-hidden="true">#</a> 重写 prompt 等原生 JS 方法</h5><p>Android 4.2 之前注入对象的接口是 addJavascriptInterface ，但是由于安全原因慢慢不被使用。一般会通过修改浏览器的部分 Window 对象的方法来完成操作。主要是拦截 alert、confirm、prompt、console.log 四个方法，分别被 <code>Webview</code> 的 onJsAlert、onJsConfirm、onConsoleMessage、onJsPrompt 监听。其中 onJsPrompt 监听的代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public boolean onJsPrompt(WebView view, String origin, String message, String 		defaultValue, final JsPromptResult result) {
  String handledRet = parentEngine.bridge.promptOnJsPrompt(origin, message,			 defaultValue);
  xxx;
  return true;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>iOS 由于安全机制，<code>WKWebView</code> 对 alert、confirm、prompt 等方法做了拦截，如果通过此方式进行 Native 与 JS 交互，需要实现 <code>WKWebView</code> 的三个 <code>WKUIDelegate</code> 代理方法。代码示例如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-(void)webView:(WKWebView *)webView runJavaScriptAlertPanelWithMessage:(NSString *)message initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(void))completionHandler{

  UIAlertController *alertController = [UIAlertController					alertControllerWithTitle:nil message:message?:@&amp;quot;&amp;quot; preferredStyle:UIAlertControllerStyleAlert];

  [alertController addAction:([UIAlertAction actionWithTitle:@&amp;quot;确认&amp;quot; style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {

      completionHandler();

  }])];

  [self presentViewController:alertController animated:YES completion:nil];

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用该方式时，可以与 Android 和 iOS 约定好使用传参的格式，这样 H5 可以无需识别客户端，传入不同参数直接调用 Native 即可。剩下的交给客户端自己去拦截相同的方法，识别相同的参数，进行自己的处理逻辑即可实现多端表现一致。如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>alert(&amp;quot;确定xxx?&amp;quot;, &amp;quot;取消&amp;quot;, &amp;quot;确定&amp;quot;, callback());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>另外，如果能与 Native 确定好方法名、传参等调用的协议规范，这样其它格式的 prompt 等方法是不会被识别的，能起到隔离的作用。</p><h5 id="注入-api" tabindex="-1"><a class="header-anchor" href="#注入-api" aria-hidden="true">#</a> 注入 API</h5><p>基于 <code>Webview</code> 提供的能力，我们可以向 Window 上注入对象或方法。JS 通过这个对象或方法进行调用时，执行对应的逻辑操作，可以直接调用 Native 的方法。使用该方式时，JS 需要等到 Native 执行完对应的逻辑后才能进行回调里面的操作。</p><p>Android 的 <code>Webview</code> 提供了 addJavascriptInterface 方法，支持 Android 4.2 及以上系统。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>gpcWebView.addJavascriptInterface(new JavaScriptInterface(), &amp;#39;nativeApiBridge&amp;#39;); 
public class JavaScriptInterface {
	Context mContext;

  JavaScriptInterface(Context c) {
    mContext = c;
  }

  public void share(String webMessage){	    	
    // Native 逻辑
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>JS 调用示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>window.NativeApi.share(xxx);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>iOS 的 <code>UIWebview</code> 提供了 JavaScriptScore 方法，支持 iOS 7.0 及以上系统。<code>WKWebview</code> 提供了 window.webkit.messageHandlers 方法，支持 iOS 8.0 及以上系统。<code>UIWebview</code> 在几年前常用，目前已不常见。以下为创建 <code>WKWebViewConfiguration</code> 和 创建 WKWebView 示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>WKWebViewConfiguration *configuration = [[WKWebViewConfiguration alloc] init];
WKPreferences *preferences = [WKPreferences new];
preferences.javaScriptCanOpenWindowsAutomatically = YES;
preferences.minimumFontSize = 40.0;
configuration.preferences = preferences;
    

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    [self.webView.configuration.userContentController addScriptMessageHandler:self name:@&amp;quot;share&amp;quot;];
  	[self.webView.configuration.userContentController addScriptMessageHandler:self name:@&amp;quot;pickImage&amp;quot;];
}
- (void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    [self.webView.configuration.userContentController 	removeScriptMessageHandlerForName:@&amp;quot;share&amp;quot;];
    [self.webView.configuration.userContentController removeScriptMessageHandlerForName:@&amp;quot;pickImage&amp;quot;];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>JS 调用示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>window.webkit.messageHandlers.share.postMessage(xxx);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><h4 id="native-调用-js" tabindex="-1"><a class="header-anchor" href="#native-调用-js" aria-hidden="true">#</a> Native 调用 JS</h4></li></ul><p>Native 调用 JS 比较简单，只要 H5 将 JS 方法暴露在 Window 上给 Native 调用即可。</p><p>Android 中主要有两种方式实现。在 4.4 以前，通过 loadUrl 方法，执行一段 JS 代码来实现。在 4.4 以后，可以使用 evaluateJavascript 方法实现。loadUrl 方法使用起来方便简洁，但是效率低无法获得返回结果且调用的时候会刷新 WebView。evaluateJavascript 方法效率高获取返回值方便，调用时候不刷新WebView，但是只支持 Android 4.4+。相关代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>webView.loadUrl(&amp;quot;javascript:&amp;quot; + javaScriptString);
webView.evaluateJavascript(javaScriptString, new ValueCallback&amp;lt;String&amp;gt;() {
  @Override
  public void onReceiveValue(String value){
    xxx
  }
});

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>iOS 在 <code>WKWebview</code> 中可以通过 evaluateJavaScript:javaScriptString 来实现，支持 iOS 8.0 及以上系统。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// swift
func evaluateJavaScript(_ javaScriptString: String, 
  completionHandler: ((Any?, Error?) -&amp;gt; Void)? = nil)
// javaScriptString 需要调用的 JS 代码
// completionHandler 执行后的回调

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// objective-c
[jsContext evaluateJavaScript:@&amp;quot;ZcyJsBridge(ev, data)&amp;quot;]

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="jsbridge-的使用" tabindex="-1"><a class="header-anchor" href="#jsbridge-的使用" aria-hidden="true">#</a> JSBridge 的使用</h2><ul><li><p>如何引用</p><ul><li><p>由 H5 引用</p><p>在我司移动端初期版本时采用的是该方式，采用本地引入 npm 包的方式进行调用。这种方式可以确定 JSBridge 是存在的，可直接调用 Native 方法。但是如果后期 Bridge 的实现方式改变，双方需要做更多的兼容，维护成本高</p></li><li><p>由 Native 注入</p><p>这是当前我司移动端选用的方式。在考虑到后期业务需要的情况下，进行了重新设计，选用 Native 注入的方式来引用 JSBridge。这样有利于保持 API 与 Native 的一致性，但是缺点是在 Native 注入的方法和时机都受限，JS 调用 Native 之前需要先判断 JSBridge 是否注入成功</p></li></ul></li><li><p>使用规范</p></li></ul><p>H5 调用 Native 方法的伪代码实例，如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>params = {
  api_version: &amp;quot;xxx&amp;quot;,	// API 版本
  title: &amp;quot;xxx&amp;quot;,	// 标题
  filename: &amp;quot;xxx&amp;quot;,	// 文件名称
  image: &amp;quot;xxx&amp;quot;,	// 图片链接
  url: &amp;quot;xxx&amp;quot;,	// 网址链接
  success: function (res) {
    xxx;	// 调用成功后执行
  },
  fail: function (err) {
    if (err.code == &amp;#39;-2&amp;#39;) {
      fail &amp;amp;&amp;amp; fail(err);	//	调用了当前客户端中不存在的 API 版本
    } else {
      const msg = err.msg;	//异常信息
      Toast.fail(msg);
    }
  }
};
window.NativeApi.share(params);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下简要列出通用方法的抽象，目前基本遵循以下规范进行双端通信。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>window.NativeApi.xxx({
  api_version:&amp;#39;&amp;#39;,
  name: &amp;quot;xxx&amp;quot;,
  path: &amp;quot;xxx&amp;quot;,
  id:	&amp;quot;xxx&amp;quot;,
  success: function (res) {
    console.log(res);
  },
  fail: function (err) {
    console.log(err);
  }
});

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于初期版本选择了由 H5 本地引用 JSBridge，后期采用 Native 注入的方式。现有的 H5 需要对各种情况做兼容，逻辑抽象如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>reqNativeBridge(vm, fn) {
  if (!isApp()) {
    // 如果不在 APP 内进行调用
    vm.$dialog.alert({
      message: &amp;quot;此功能需要访问 APP 才能使用&amp;quot;,
    });
  } else {
    if (!window.NativeApi) {
      // 针对初期版本
      vm.$dialog.alert({
        message: &amp;quot;请更新到最新 APP 使用该功能&amp;quot;,
      });
    } else {
      // 此处只针对“调用了当前客户端中不存在的 API 版本”的报错进行处理
      // 其余种类的错误信息交由具体的业务去处理
      fn &amp;amp;&amp;amp; fn((err) =&amp;gt; {
        vm.$dialog.alert({
          message: &amp;quot;请更新到最新 APP 使用该功能&amp;quot;,
        });
      });
    }
  }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>上述内容简要介绍了 JSBridge 的部分原理，希望对从未了解过 JSBridge 的同学能有所帮助。如果需要更深入的了解 JSBridge 的原理和实现，如 JSBridge 接口调用的封装实现，JS 调用 Native 时的回调的唯一性等。大家可以去查阅更多资料，参考更详细的相关文档或他人的整理成文的沉淀。</p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,53),m={href:"https://juejin.cn/post/6844903950508883982",target:"_blank",rel:"noopener noreferrer"},p={href:"https://juejin.cn/post/6844903988081475591",target:"_blank",rel:"noopener noreferrer"},b={href:"https://juejin.cn/post/6844904038555729927",target:"_blank",rel:"noopener noreferrer"},g=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),i(" 招贤纳士")],-1),x=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),h=e("p",null,[i("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),S=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image",alt:""})],-1);function f(w,J){const n=r("ExternalLinkIcon");return t(),l("div",null,[c,e("p",null,[i("> 本文首发于政采云前端团队博客："),e("a",o,[i("小白必看，JSBridge 初探"),a(n)])]),u,e("p",null,[e("a",m,[i("前端工程实践之可视化搭建系统（一）"),a(n)])]),e("p",null,[e("a",p,[i("可能是最全的 “文本溢出截断省略” 方案合集"),a(n)])]),e("p",null,[e("a",b,[i("图文并茂，为你揭开“单点登录“的神秘面纱"),a(n)])]),g,x,h,S])}const q=d(v,[["render",f],["__file","小白必看，JSBridge 初探.html.vue"]]);export{q as default};
