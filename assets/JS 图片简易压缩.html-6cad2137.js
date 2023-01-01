import{_ as d,z as s,A as l,Y as e,C as a,U as n,a6 as t,Q as r}from"./framework-cb9358d9.js";const c={},m=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/22/17239e3edd804567~tplv-t2oaga2asx-image.image",alt:""})],-1),o=e("br",null,null,-1),v={href:"https://www.zoo.team/article/image-compress",target:"_blank",rel:"noopener noreferrer"},p=t(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/9/16e508787bc8e161~tplv-t2oaga2asx-image.image" alt="季节.png"></p><h3 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h3><p>说起图片压缩，大家想到的或者平时用到的很多工具都可以实现，例如，客户端类的有图片压缩工具 PPDuck3， JS 实现类的有插件 compression.js ，亦或是在线处理类的 OSS 上传，文件上传后，在访问文件时中也有图片的压缩配置选项，不过，能不能自己撸一套 JS 实现的图片压缩代码呢？当然可以，那我们先来理一下思路。</p><h3 id="压缩思路" tabindex="-1"><a class="header-anchor" href="#压缩思路" aria-hidden="true">#</a> 压缩思路</h3><p>涉及到 JS 的图片压缩，我的想法是需要用到 Canvas 的绘图能力，通过调整图片的分辨率或者绘图质量来达到图片压缩的效果，实现思路如下：</p><ul><li>获取上传 Input 中的图片对象 File</li><li>将图片转换成 base64 格式</li><li>base64 编码的图片通过 Canvas 转换压缩，这里会用到的 Canvas 的 drawImage 以及 toDataURL 这两个 Api，一个调节图片的分辨率的，一个是调节图片压缩质量并且输出的，后续会有详细介绍</li><li>转换后的图片生成对应的新图片，然后输出</li></ul><h3 id="优缺点介绍" tabindex="-1"><a class="header-anchor" href="#优缺点介绍" aria-hidden="true">#</a> 优缺点介绍</h3><p>不过 Canvas 压缩的方式也有着自己的优缺点：</p><ul><li>优点：实现简单，参数可以配置化，自定义图片的尺寸，指定区域裁剪等等。</li><li>缺点：只有 jpeg 、webp 支持原图尺寸下图片质量的调整来达到压缩图片的效果，其他图片格式，仅能通过调节尺寸来实现</li></ul><h3 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;template&amp;gt;
  &amp;lt;div class=&amp;quot;container&amp;quot;&amp;gt;
    &amp;lt;input type=&amp;quot;file&amp;quot; id=&amp;quot;input-img&amp;quot; @change=&amp;quot;compress&amp;quot; /&amp;gt;
    &amp;lt;a :download=&amp;quot;fileName&amp;quot; :href=&amp;quot;compressImg&amp;quot; &amp;gt;普通下载&amp;lt;/a&amp;gt;
    &amp;lt;button @click=&amp;quot;downloadImg&amp;quot;&amp;gt;兼容 IE 下载&amp;lt;/button&amp;gt;
    &amp;lt;div&amp;gt;
      &amp;lt;img :src=&amp;quot;compressImg&amp;quot; /&amp;gt;
    &amp;lt;/div&amp;gt;
  &amp;lt;/div&amp;gt;
&amp;lt;/template&amp;gt;
&amp;lt;script&amp;gt;
export default {
  name: &amp;#39;compress&amp;#39;,
  data: function() {
    return {
      compressImg: null,
      fileName: null,
    };
  },
  components: {},
  methods: {
    compress() {
      // 获取文件对象
      const fileObj = document.querySelector(&amp;#39;#input-img&amp;#39;).files[0];
      // 获取文件名称，后续下载重命名
      this.fileName = \`\${new Date().getTime()}-\${fileObj.name}\`;
      // 获取文件后缀名
      const fileNames = fileObj.name.split(&amp;#39;.&amp;#39;);
      const type = fileNames[fileNames.length-1];
      // 压缩图片
      this.handleCompressImage(fileObj, type);
    },
    handleCompressImage(img, type) {
      const vm = this;
      let reader = new FileReader();
      // 读取文件
      reader.readAsDataURL(img);
      reader.onload = function(e) {
        let image = new Image(); //新建一个img标签
        image.src = e.target.result;
        image.onload = function() {
          let canvas = document.createElement(&amp;#39;canvas&amp;#39;);
          let context = canvas.getContext(&amp;#39;2d&amp;#39;);
          // 定义 canvas 大小，也就是压缩后下载的图片大小
          let imageWidth = image.width; //压缩后图片的大小
          let imageHeight = image.height;
          canvas.width = imageWidth;
          canvas.height = imageHeight;
          
          // 图片不压缩，全部加载展示
          context.drawImage(image, 0, 0);
          // 图片按压缩尺寸载入
          // let imageWidth = 500; //压缩后图片的大小
          // let imageHeight = 200;
          // context.drawImage(image, 0, 0, 500, 200);
          // 图片去截取指定位置载入
          // context.drawImage(image,100, 100, 100, 100, 0, 0, imageWidth, imageHeight);
          vm.compressImg = canvas.toDataURL(\`image/\${type}\`);
        };
      };
    },
    // base64 图片转 blob 后下载
    downloadImg() {
      let parts = this.compressImg.split(&amp;#39;;base64,&amp;#39;);
      let contentType = parts[0].split(&amp;#39;:&amp;#39;)[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;
      let uInt8Array = new Uint8Array(rawLength);
      for(let i = 0; i &amp;lt; rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      const blob = new Blob([uInt8Array], {type: contentType});
      this.compressImg = URL.createObjectURL(blob);
      if (window.navigator.msSaveOrOpenBlob) {
        // 兼容 ie 的下载方式
        window.navigator.msSaveOrOpenBlob(blob, this.fileName);
      }else{
        const a = document.createElement(&amp;#39;a&amp;#39;);
        a.href = this.compressImg;
        a.setAttribute(&amp;#39;download&amp;#39;, this.fileName);
        a.click();
      }
    },
  }
};
&amp;lt;/script&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码是可以直接拿来看效果的，不喜欢用 Vue 的也可以把代码稍微调整一下，下面开始具体分解一下代码的实现思路。</p><h3 id="input-上传-file-处理" tabindex="-1"><a class="header-anchor" href="#input-上传-file-处理" aria-hidden="true">#</a> Input 上传 File 处理</h3><p>将 File 对象通过 <code>FileReader</code> 的 <code>readAsDataURL</code> 方法转换为URL格式的字符串（base64编码）。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const fileObj = document.querySelector(&amp;#39;#input-img&amp;#39;).files[0];
let reader = new FileReader();
// 读取文件
reader.readAsDataURL(fileObj);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="canvas-处理-file-对象" tabindex="-1"><a class="header-anchor" href="#canvas-处理-file-对象" aria-hidden="true">#</a> Canvas 处理 File 对象</h3><p>建立一个 <code>Image</code> 对象，一个 <code>canvas</code> 画布，设定自己想要下载的图片尺寸，调用 <code>drawImage</code> 方法在 canvas 中绘制上传的图片。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>let image = new Image(); //新建一个img标签
image.src = e.target.result;
let canvas = document.createElement(&amp;#39;canvas&amp;#39;);
let context = canvas.getContext(&amp;#39;2d&amp;#39;);
context.drawImage(image, 0, 0);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="api-解析-drawimage" tabindex="-1"><a class="header-anchor" href="#api-解析-drawimage" aria-hidden="true">#</a> Api 解析：drawImage</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>context.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>img</strong></p><p>就是图片对象，可以是页面上获取的 DOM 对象，也可以是虚拟 DOM 中的图片对象。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/26/171b6503afb3f2e7~tplv-t2oaga2asx-image.image" alt=""></p><p><strong>dx , dy , dWidth , dHeight</strong></p><p>表示在 <code>canvas</code> 画布上规划处一片区域用来放置图片，<code>dx, dy</code> 为绘图位置在 Canvas 元素的 X 轴、Y 轴坐标，<code>dWidth, dHeight</code> 指在 Canvas 元素上绘制图像的宽度和高度（如果不说明， 在绘制时图片的宽度和高度不会缩放）。</p><p><strong>sx , sy , swidth , sheight</strong></p><p>这 4 个参数是用来裁剪源图片的，表示图片在 <code>canvas</code> 画布上显示的大小和位置。<code>sx,sy</code> 表示在源图片上裁剪位置的 X 轴、Y 轴坐标，然后以 <code>swidth,sheight</code> 尺寸来选择一个区域范围，裁剪出来的图片作为最终在 Canvas 上显示的图片内容（ <code>swidth,sheight</code> 不说明的情况下，整个矩形（裁剪）从坐标的 <code>sx</code> 和 <code>sy</code> 开始，到图片的右下角结束）。</p><p>以下为图片绘制的实例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>context.drawImage(image, 0, 0, 100, 100);
context.drawImage(image, 300, 300, 200, 200);
context.drawImage(image, 0, 100, 150, 150, 300, 0, 150, 150);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/26/171b6503af7a8326~tplv-t2oaga2asx-image.image" alt=""></p><p>Api 中奇怪之处在于，sx,sy,swidth,sheight 为选填参数，但位置在 dx, dy, dWidth, dHeight 之前。</p><h3 id="canvas-输出图片" tabindex="-1"><a class="header-anchor" href="#canvas-输出图片" aria-hidden="true">#</a> Canvas 输出图片</h3><p>调用 <code>canvas</code> 的 <code>toDataURL</code> 方法可以输出 base64 格式的图片。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>canvas.toDataURL(\`image/\${type}\`);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="api-解析-todataurl" tabindex="-1"><a class="header-anchor" href="#api-解析-todataurl" aria-hidden="true">#</a> Api 解析：toDataURL</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>canvas.toDataURL(type, encoderOptions);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>type 可选</strong></p><p>图片格式，默认为 image/png。</p><p><strong>encoderOptions 可选</strong></p><p>在指定图片格式为 image/jpeg 或 image/webp的情况下，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略。</p><h3 id="a-标签的下载" tabindex="-1"><a class="header-anchor" href="#a-标签的下载" aria-hidden="true">#</a> a 标签的下载</h3><p>调用 <code>&amp;lt;a&amp;gt;</code> 标签的 <code>download</code> 属性，即可完成图片的下载。</p><h3 id="api-解析-download" tabindex="-1"><a class="header-anchor" href="#api-解析-download" aria-hidden="true">#</a> Api 解析：download</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// href 下载必填
&amp;lt;a download=&amp;quot;filename&amp;quot; href=&amp;quot;href&amp;quot;&amp;gt; 下载 &amp;lt;/a&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>filename</strong></p><p>选填，规定作为文件名来使用的文本。</p><p><strong>href</strong></p><p>文件的下载地址。</p><h3 id="非主流浏览器下载处理" tabindex="-1"><a class="header-anchor" href="#非主流浏览器下载处理" aria-hidden="true">#</a> 非主流浏览器下载处理</h3><p>到此可以解决 Chroma 、 Firefox 和 Safari（自测支持） 浏览器的下载功能，因为 IE 等浏览器不支持 <code>download</code> 属性，所以需要进行其他方式的下载，也就有了代码中的后续内容。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// base64 图片转 blob 后下载
downloadImg() {
  let parts = this.compressImg.split(&amp;#39;;base64,&amp;#39;);
  let contentType = parts[0].split(&amp;#39;:&amp;#39;)[1];
  let raw = window.atob(parts[1]);
  let rawLength = raw.length;
  let uInt8Array = new Uint8Array(rawLength);
  for(let i = 0; i &amp;lt; rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  const blob = new Blob([uInt8Array], {type: contentType});
  this.compressImg = URL.createObjectURL(blob);
  if (window.navigator.msSaveOrOpenBlob) {
    // 兼容 ie 的下载方式
    window.navigator.msSaveOrOpenBlob(blob, this.fileName);
  }else{
    const a = document.createElement(&amp;#39;a&amp;#39;);
    a.href = this.compressImg;
    a.setAttribute(&amp;#39;download&amp;#39;, this.fileName);
    a.click();
  }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>将之前 <code>canvas</code> 生成的 base64 数据拆分后，通过 <code>atob</code> 方法解码</li><li>将解码后的数据转换成 Uint8Array 格式的无符号整形数组</li><li>转换后的数组来生成一个 Blob 数据对象，通过 <code>URL.createObjectURL(blob)</code> 来生成一个临时的 DOM 对象</li><li>之后 IE 类浏览器可以调用 <code>window.navigator.msSaveOrOpenBlob</code> 方法来执行下载，其他浏览器也可以继续通过 <code>&amp;lt;a&amp;gt;</code> 标签的 <code>download</code> 属性来进行下载</li></ul><h3 id="api-解析-atob" tabindex="-1"><a class="header-anchor" href="#api-解析-atob" aria-hidden="true">#</a> Api 解析：atob</h3><p>base-64 解码使用方法是 atob()。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>window.atob(encodedStr)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>encodedStr</strong></p><p>必需，是一个通过 btoa() 方法编码的字符串，btoa()是 base64 编码的使用方法。</p><h3 id="api-解析-uint8array" tabindex="-1"><a class="header-anchor" href="#api-解析-uint8array" aria-hidden="true">#</a> Api 解析：Uint8Array</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>new Uint8Array(length)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>length</strong></p><p>创建初始化为 0 的，包含 length 个元素的无符号整型数组。</p><h3 id="api-解析-blob" tabindex="-1"><a class="header-anchor" href="#api-解析-blob" aria-hidden="true">#</a> Api 解析： Blob</h3><p><code>Blob</code> 对象表示一个不可变、原始数据的类文件对象。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 构造函数允许通过其它对象创建 Blob 对象
new Blob([obj],{type:createType}) 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>obj</strong></p><p>字符串内容</p><p><strong>createType</strong></p><p>要构造的类型</p><p>兼容性 IE 10 以上</p><h3 id="api-解析-createobjecturl" tabindex="-1"><a class="header-anchor" href="#api-解析-createobjecturl" aria-hidden="true">#</a> Api 解析：createObjectURL</h3><p>静态方法会创建一个 DOMString。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>objectURL = URL.createObjectURL(object);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>object</strong></p><p>用于创建 URL 的 File 对象、Blob 对象或者 MediaSource 对象。</p><h3 id="api-解析-window-navigator" tabindex="-1"><a class="header-anchor" href="#api-解析-window-navigator" aria-hidden="true">#</a> Api 解析： window.navigator</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 官方已不建议使用的文件下载方式，仅针对 ie 且兼容性 10 以上
// msSaveBlob 仅提供下载
// msSaveOrOpenBlob 支持下载和打开
window.navigator.msSaveOrOpenBlob(blob, fileName);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>blob</strong></p><p>要下载的 blob 对象</p><p><strong>fileName</strong></p><p>下载后命名的文件名称。</p><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>本文仅针对图片压缩介绍了一些思路，简单的使用场景可能如下介绍，当然也会引申出来更多的使用场景，这些还有待大家一起挖掘。</p><ul><li>上传存储图片如果需要对文件大小格式有要求的，可以统一压缩处理图片</li><li>前台页面想要编辑图片，可以在 Canvas 处理图片的时候，加一些其他逻辑，例如添加文字，剪裁，拼图等等操作</li></ul><p>当然温馨提示：因部分接口有 IE 兼容性问题，IE 浏览器方面，仅能支持 IE10 以上版本进行下载。</p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,85),u={href:"https://juejin.cn/post/6844903988081475591",target:"_blank",rel:"noopener noreferrer"},b={href:"https://juejin.cn/post/6844904038555729927",target:"_blank",rel:"noopener noreferrer"},g=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),a(" 招贤纳士")],-1),h=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),x=e("p",null,[a("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),w=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image",alt:""})],-1);function f(y,I){const i=r("ExternalLinkIcon");return s(),l("div",null,[m,e("p",null,[a("> 这是第 48 篇不掺水的原创，想获取更多原创好文，请扫 👆上方二维码关注我们吧~"),o,a(" > 本文首发于政采云前端团队博客："),e("a",v,[a("JS 图片简易压缩"),n(i)])]),p,e("p",null,[e("a",u,[a("可能是最全的 “文本溢出截断省略” 方案合集"),n(i)])]),e("p",null,[e("a",b,[a("图文并茂，为你揭开“单点登录“的神秘面纱"),n(i)])]),g,h,x,w])}const j=d(c,[["render",f],["__file","JS 图片简易压缩.html.vue"]]);export{j as default};
