import{_ as i,z as p,A as o,Y as n,C as s,U as e,a6 as t,Q as l}from"./framework-cb9358d9.js";const c={},r=n("p",null,[n("img",{src:"//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de2faac054264e70be1891622b38e631~tplv-k3u1fbpfcp-zoom-1.image",alt:""})],-1),u={href:"https://zoo.team/article/data-encryption",target:"_blank",rel:"noopener noreferrer"},d=t('<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5857f89b07ce45cda894f50902473a37~tplv-k3u1fbpfcp-watermark.image" alt=""></p><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>现在是大数据时代，需要收集大量的个人信息用于统计。一方面它给我们带来了便利，另一方面一些个人信息数据在无意间被泄露，被非法分子用于推销和黑色产业。</p><p>2018 年 5 月 25 日，欧盟已经强制执行《通用数据保护条例》（General Data Protection Regulation，缩写作 GDPR）。该条例是欧盟法律中对所有欧盟个人关于数据保护和隐私的规范。这意味着个人数据必须使用假名化或匿名化进行存储，并且默认使用尽可能最高的隐私设置，以避免数据泄露。</p><p>相信大家也都不想让自己在外面“裸奔”。所以，作为前端开发人员也应该尽量避免用户个人数据的明文传输，尽可能的降低信息泄露的风险。</p><p>看到这里可能有人会说现在都用 HTTPS 了，数据在传输过程中是加密的，前端就不需要加密了。其实不然，我可以在你发送 HTTPS 请求之前，通过谷歌插件来捕获 HTTPS 请求中的个人信息，下面我会为此演示。所以前端数据加密还是很有必要的。</p><h2 id="数据泄露方式" tabindex="-1"><a class="header-anchor" href="#数据泄露方式" aria-hidden="true">#</a> 数据泄露方式</h2>',7),v=n("p",null,"中间人攻击",-1),m={href:"https://zh.wikipedia.org/wiki/%E4%B8%AD%E9%97%B4%E4%BA%BA%E6%94%BB%E5%87%BB",target:"_blank",rel:"noopener noreferrer"},k=n("p",null,"客户端、服务端之间的信息都会经过中间人，中间人可以获取和转发两者的信息。在 HTTP 下，前端数据加密还是避免不了数据泄露，因为中间人可以伪造密钥。为了避免中间人攻击，我们一般采用 HTTPS 的形式传输。",-1),b=n("li",null,[n("p",null,"谷歌插件"),n("p",null,"HTTPS 虽然可以防止数据在网络传输过程中被劫持，但是在发送 HTTPS 之前，数据还是可以从谷歌插件中泄露出去。"),n("p",null,"因为谷歌插件可以捕获 Network 中的所有请求，所以如果某些插件中有恶意的代码还是可以获取到用户信息的，下面为大家演示。"),n("p",null,[n("img",{src:"//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25a1878c6ea64477b5c1db2e93ca012e~tplv-k3u1fbpfcp-zoom-1.image",alt:""})]),n("p",null,"所以光采用 HTTPS，一些敏感信息如果还是以明文的形式传输的话，也是不安全的。如果在 HTTPS 的基础上再进行数据的加密，那相对来说就更好了。")],-1),h=n("h2",{id:"加密算法介绍",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#加密算法介绍","aria-hidden":"true"},"#"),s(" 加密算法介绍")],-1),y=n("p",null,"对称加密",-1),f=n("p",null,"对称加密算法，又称为共享密钥加密算法。在对称加密算法中，使用的密钥只有一个，发送和接收双方都使用这个密钥对数据进行加密和解密。",-1),_={href:"https://zh.wikipedia.org/wiki/%E9%AB%98%E7%BA%A7%E5%8A%A0%E5%AF%86%E6%A0%87%E5%87%86",target:"_blank",rel:"noopener noreferrer"},g={href:"https://zh.wikipedia.org/wiki/Salsa20#ChaCha20",target:"_blank",rel:"noopener noreferrer"},q={href:"https://zh.wikipedia.org/wiki/3DES",target:"_blank",rel:"noopener noreferrer"},w=n("p",null,[n("img",{src:"//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f98ad4f01ef472486373a0ed0f7acd3~tplv-k3u1fbpfcp-zoom-1.image",alt:""})],-1),x=n("p",null,"非对称加密",-1),S=n("p",null,"非对称加密算法，又称为公开密钥加密算法。它需要两个密钥，一个称为公开密钥 (public key)，即公钥；另一个称为私有密钥 (private key)，即私钥。",-1),j={href:"https://zh.wikipedia.org/wiki/RSA%E5%8A%A0%E5%AF%86%E6%BC%94%E7%AE%97%E6%B3%95",target:"_blank",rel:"noopener noreferrer"},B={href:"https://zh.wikipedia.org/wiki/ElGamal%E5%8A%A0%E5%AF%86%E7%AE%97%E6%B3%95",target:"_blank",rel:"noopener noreferrer"},E=n("p",null,[n("img",{src:"//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23e1d9bc5e684827aaf8b84b964e3393~tplv-k3u1fbpfcp-zoom-1.image",alt:""})],-1),A=n("p",null,"散列算法",-1),T={href:"https://zh.wikipedia.org/wiki/MD4",target:"_blank",rel:"noopener noreferrer"},H={href:"https://zh.wikipedia.org/wiki/MD5",target:"_blank",rel:"noopener noreferrer"},K={href:"https://zh.wikipedia.org/wiki/SHA%E5%AE%B6%E6%97%8F",target:"_blank",rel:"noopener noreferrer"},C=t('<h2 id="实现方案" tabindex="-1"><a class="header-anchor" href="#实现方案" aria-hidden="true">#</a> 实现方案</h2><ul><li><p>方案一：如果用对称加密，那么服务端和客户端都必须知道密钥才行。那服务端势必要把密钥发送给客户端，这个过程中是不安全的，所以单单用对称加密行不通。</p></li><li><p>方案二：如果用非对称加密，客户端的数据通过公钥加密，服务端通过私钥解密，客户端发送数据实现加密没问题。客户端接受数据，需要服务端用公钥加密，然后客户端用私钥解密。所以这个方案需要两套公钥和私钥，需要在客户端和服务端各自生成自己的密钥。</p><p><img src="//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/936a7582d8fa4111a5f637c43d51bb17~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p></li><li><p>方案三：如果把对称加密和非对称加密相结合。客户端需要生成一个对称加密的密钥 1，传输内容与该密钥 1进行对称加密传给服务端，并且把密钥 1 和公钥进行非对称加密，然后也传给服务端。服务端通过私钥把对称加密的密钥 1 解密出来，然后通过该密钥 1 解密出内容。以上是客户端到服务端的过程。如果是服务端要发数据到客户端，就需要把响应数据跟对称加密的密钥 1 进行加密，然后客户端接收到密文，通过客户端的密钥 1进行解密，从而完成加密传输。</p><p><img src="//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a7d8574b8754940ab05b510cf44823a~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p></li><li><p>总结：以上只是列举了常见的加密方案。总的来看，方案二比较简单，但是需要维护两套公钥和私钥，当公钥变化的时候，必须通知对方，灵活性比较差。方案三相对方案二来说，密钥 1 随时可以变化，并且不需要通知服务端，相对来说灵活性、安全性好点并且方案三对内容是对称加密，当数据量大时，对称加密的速度会比非对称加密快。所以本文采用方案三给予代码实现。</p></li></ul><h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2>',3),D=t(`<li><p>下面是具体的代码实现（以登录接口为例），主要的目的就是要把明文的个人信息转成密文传输。其中对称加密库使用的是 AES，非对称加密库使用的是RSA。</p></li><li><p>客户端：</p><ul><li><p>AES 库(aes-js)：https://github.com/ricmoo/aes-js</p></li><li><p>RSA库(jsencrypt)：https://github.com/travist/jsencrypt</p></li><li><p>具体代码实现登录接口</p><ul><li><p>客户端需要随机生成一个 aesKey，在页面加载完的时候需要从服务端请求 publicKey</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>let aesKey = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]; // 随机产生
let publicKey = &amp;quot;&amp;quot;; // 公钥会从服务端获取

// 页面加载完之后，就去获取公钥
window.onload = () =&amp;gt; {
  axios({
    method: &amp;quot;GET&amp;quot;,
    headers: { &amp;quot;content-type&amp;quot;: &amp;quot;application/x-www-form-urlencoded&amp;quot; },
    url: &amp;quot;http://localhost:3000/getPub&amp;quot;,
  })
    .then(function (result) {
      publicKey = result.data.data; // 获取公钥
    })
    .catch(function (error) {
      console.log(error);
    });
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>aes加密和解密方法</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>/**
 * aes加密方法
 * @param {string} text 待加密的字符串
 * @param {array} key 加密key
 */
function aesEncrypt(text, key) {
  const textBytes = aesjs.utils.utf8.toBytes(text); // 把字符串转换成二进制数据

  // 这边使用CTR-Counter加密模式，还有其他模式可以选择，具体可以参考aes加密库
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));

  const encryptedBytes = aesCtr.encrypt(textBytes); // 进行加密
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes); // 把二进制数据转成十六进制

  return encryptedHex;
}

/**
 * aes解密方法
 * @param {string} encryptedHex 加密的字符串
 * @param {array} key 加密key
 */
function aesDecrypt(encryptedHex, key) {
  const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex); // 把十六进制数据转成二进制
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));

  const decryptedBytes = aesCtr.decrypt(encryptedBytes); // 进行解密
  const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes); // 把二进制数据转成utf-8字符串

  return decryptedText;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>请求登录</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 登陆接口
 */</span>
<span class="token keyword">function</span> <span class="token function">submitFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> userName <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>#userName<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
  <span class="token keyword">const</span> password <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>#password<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
  <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">{</span>
    userName<span class="token punctuation">,</span>
    password<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> text <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> sendData <span class="token operator">=</span> <span class="token function">aesEncrypt</span><span class="token punctuation">(</span>text<span class="token punctuation">,</span> aesKey<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 把要发送的数据转成字符串进行加密</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>发送数据<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token punctuation">,</span> text<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> encrypt <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSEncrypt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  encrypt<span class="token punctuation">.</span><span class="token function">setPublicKey</span><span class="token punctuation">(</span>publicKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> encrypted <span class="token operator">=</span> encrypt<span class="token punctuation">.</span><span class="token function">encrypt</span><span class="token punctuation">(</span>aesKey<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 把aesKey进行非对称加密</span>

  <span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>localhost<span class="token operator">:</span><span class="token number">3000</span><span class="token operator">/</span>login<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> params <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">param1</span><span class="token operator">:</span> sendData<span class="token punctuation">,</span> <span class="token literal-property property">param2</span><span class="token operator">:</span> encrypted <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token constant">POST</span><span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>content<span class="token operator">-</span>type<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token operator">:</span> <span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>application<span class="token operator">/</span>x<span class="token operator">-</span>www<span class="token operator">-</span>form<span class="token operator">-</span>urlencoded<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">url</span><span class="token operator">:</span> url<span class="token punctuation">,</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">result</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> reciveData <span class="token operator">=</span> <span class="token function">aesDecrypt</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>data<span class="token punctuation">.</span>data<span class="token punctuation">,</span> aesKey<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 用aesKey进行解密</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>接收数据<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token punctuation">,</span> reciveData<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>quot<span class="token punctuation">;</span>error<span class="token operator">&amp;</span>quot<span class="token punctuation">;</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul></li><li><p>服务端（Node）：</p><ul><li><p>AES库(aes-js)：https://github.com/ricmoo/aes-js</p></li><li><p>RSA 库(node-rsa)：https://github.com/rzcoder/node-rsa</p></li><li><p>具体代码实现登录接口</p><ul><li><p>引用加密库</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const http = require(&amp;quot;http&amp;quot;);
const aesjs = require(&amp;quot;aes-js&amp;quot;);
const NodeRSA = require(&amp;quot;node-rsa&amp;quot;);
const rsaKey = new NodeRSA({ b: 1024 }); // key的size为1024位
let aesKey = null; // 用于保存客户端的aesKey
let privateKey = &amp;quot;&amp;quot;; // 用于保存服务端的公钥

rsaKey.setOptions({ encryptionScheme: &amp;quot;pkcs1&amp;quot; }); // 设置加密模式
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>实现login接口</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>http
  .createServer((request, response) =&amp;gt; {
    response.setHeader(&amp;quot;Access-Control-Allow-Origin&amp;quot;, &amp;quot;*&amp;quot;);
    response.setHeader(&amp;quot;Access-Control-Allow-Headers&amp;quot;, &amp;quot;Content-Type&amp;quot;);
    response.setHeader(&amp;quot;Content-Type&amp;quot;, &amp;quot;application/json&amp;quot;);
    switch (request.method) {
      case &amp;quot;GET&amp;quot;:
        if (request.url === &amp;quot;/getPub&amp;quot;) {
          const publicKey = rsaKey.exportKey(&amp;quot;public&amp;quot;);
          privateKey = rsaKey.exportKey(&amp;quot;private&amp;quot;);
          response.writeHead(200);
          response.end(JSON.stringify({ result: true, data: publicKey })); // 把公钥发送给客户端
          return;
        }
        break;
      case &amp;quot;POST&amp;quot;:
        if (request.url === &amp;quot;/login&amp;quot;) {
          let str = &amp;quot;&amp;quot;;
          request.on(&amp;quot;data&amp;quot;, function (chunk) {
            str += chunk;
          });
          request.on(&amp;quot;end&amp;quot;, function () {
            const params = JSON.parse(str);
            const reciveData = decrypt(params.data);
            console.log(&amp;quot;reciveData&amp;quot;, reciveData);
            // 一系列处理之后

            response.writeHead(200);
            response.end(
              JSON.stringify({
                result: true,
                data: aesEncrypt(
                  JSON.stringify({ userId: 123, address: &amp;quot;杭州&amp;quot; }), // 这个数据会被加密
                  aesKey
                ),
              })
            );
          });
          return;
        }
        break;
      default:
        break;
    }
    response.writeHead(404);
    response.end();
  })
  .listen(3000);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>加密和解密方法</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>function decrypt({ param1, param2 }) {
  const decrypted = rsaKey.decrypt(param2, &amp;quot;utf8&amp;quot;); // 解密得到aesKey
  aesKey = decrypted.split(&amp;quot;,&amp;quot;).map((item) =&amp;gt; {
    return +item;
  });

  return aesDecrypt(param1, aesKey);
}

/**
 * aes解密方法
 * @param {string} encryptedHex 加密的字符串
 * @param {array} key 加密key
 */
function aesDecrypt(encryptedHex, key) {
  const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex); // 把十六进制转成二进制数据
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5)); // 这边使用CTR-Counter加密模式，还有其他模式可以选择，具体可以参考aes加密库

  const decryptedBytes = aesCtr.decrypt(encryptedBytes); // 进行解密
  const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes); // 把二进制数据转成字符串

  return decryptedText;
}

/**
 * aes加密方法
 * @param {string} text 待加密的字符串
 * @param {array} key 加密key
 */
function aesEncrypt(text, key) {
  const textBytes = aesjs.utils.utf8.toBytes(text); // 把字符串转成二进制数据
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));

  const encryptedBytes = aesCtr.encrypt(textBytes); // 加密
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes); // 把二进制数据转成十六进制

  return encryptedHex;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul></li>`,3),z={href:"https://github.com/Pulset/FrontDataEncrypt",target:"_blank",rel:"noopener noreferrer"},J=t('<h2 id="演示效果" tabindex="-1"><a class="header-anchor" href="#演示效果" aria-hidden="true">#</a> 演示效果</h2><p><img src="//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe10fbd25c484a758345c23536f36223~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>本文主要介绍了一些前端安全方面的知识和具体加密方案的实现。为了保护客户的隐私数据，不管是 HTTP 还是HTTPS，都建议密文传输信息，让破解者增加一点攻击难度吧。当然数据加解密也会带来一定性能上的消耗，这个需要各位开发者各自衡量了。</p><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>',5),P={href:"https://www.cnblogs.com/sujing/p/10927569.html",target:"_blank",rel:"noopener noreferrer"},N={href:"https://zh.wikipedia.org/wiki/%E4%B8%AD%E9%97%B4%E4%BA%BA%E6%94%BB%E5%87%BB",target:"_blank",rel:"noopener noreferrer"},O=n("h2",{id:"推荐阅读",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#推荐阅读","aria-hidden":"true"},"#"),s(" 推荐阅读")],-1),R={href:"https://juejin.cn/post/6882539694170013710",target:"_blank",rel:"noopener noreferrer"},M={href:"https://juejin.cn/post/6877155538430328845",target:"_blank",rel:"noopener noreferrer"},F=n("h2",{id:"招贤纳士",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),s(" 招贤纳士")],-1),G=n("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 40 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),V=n("p",null,[s("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),n("code",null,"ZooTeam@cai-inc.com")],-1),I=n("p",null,[n("img",{src:"//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74512a6d96c34cc09f6e69e2bad072ac~tplv-k3u1fbpfcp-zoom-1.image",alt:""})],-1);function L(Z,Q){const a=l("ExternalLinkIcon");return p(),o("div",null,[r,n("p",null,[s("> 这是第 73 篇不掺水的原创，想获取更多原创好文，请搜索公众号关注我们吧~ 本文首发于政采云前端博客："),n("a",u,[s("敏感数据加密方案及实现"),e(a)])]),d,n("ul",null,[n("li",null,[v,n("p",null,[s("中间人攻击是常见的攻击方式。详细过程可以参见"),n("a",m,[s("这里"),e(a)]),s("。大概的过程是中间人通过 DNS 欺骗等手段劫持了客户端与服务端的会话。")]),k]),b]),h,n("ul",null,[n("li",null,[y,f,n("p",null,[s("这就要求加密和解密方事先都必须知道加密的密钥。其优点是算法公开、计算量小、加密速度快、加密效率高；缺点是密钥泄露之后，数据就会被破解。一般不推荐单独使用。根据实现机制的不同，常见的算法主要有"),n("a",_,[s("AES"),e(a)]),s("、"),n("a",g,[s("ChaCha20"),e(a)]),s("、"),n("a",q,[s("3DES"),e(a)]),s("等。")]),w]),n("li",null,[x,S,n("p",null,[s("他俩是配对生成的，就像钥匙和锁的关系。因为加密和解密使用的是两个不同的密钥，所以这种算法称为非对称加密算法。其优点是算法强度复杂、安全性高；缺点是加解密速度没有对称加密算法快。常见的算法主要有"),n("a",j,[s("RSA"),e(a)]),s("、"),n("a",B,[s("Elgamal"),e(a)]),s("等。")]),E]),n("li",null,[A,n("p",null,[s("散列算法又称散列函数、哈希函数，是把消息或数据压缩成摘要，使得数据量变小，将数据的格式固定成特定长度的值。一般用于校验数据的完整性，平时我们下载文件就可以校验 MD5 来判断下载的数据是否完整。常见的算法主要有 "),n("a",T,[s("MD4"),e(a)]),s("、"),n("a",H,[s("MD5"),e(a)]),s("、"),n("a",K,[s("SHA"),e(a)]),s(" 等。")])])]),C,n("ul",null,[D,n("li",null,[n("p",null,[n("a",z,[s("完整的示例代码"),e(a)])])])]),J,n("p",null,[n("a",P,[s("看完这篇文章，我奶奶都懂了https的原理"),e(a)])]),n("p",null,[n("a",N,[s("中间人攻击"),e(a)])]),O,n("p",null,[n("a",R,[s("浅析 vue-router 源码和动态路由权限分配"),e(a)])]),n("p",null,[n("a",M,[s("编写高质量可维护的代码：一目了然的注释"),e(a)])]),F,G,V,I])}const Y=i(c,[["render",L],["__file","敏感数据加密方案及实现.html.vue"]]);export{Y as default};
