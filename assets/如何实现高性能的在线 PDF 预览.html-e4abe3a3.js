import{_ as d,z as l,A as r,Y as e,C as n,U as s,a6 as a,Q as t}from"./framework-cb9358d9.js";const v={},c=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/24/1737e6038b00329e~tplv-t2oaga2asx-image.image",alt:""})],-1),m=e("br",null,null,-1),u={href:"https://www.zoo.team/article/pdf-preview",target:"_blank",rel:"noopener noreferrer"},o=a(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/31/1726a87ff0ec51ee~tplv-t2oaga2asx-image.image" alt=""></p><h3 id="引言" tabindex="-1"><a class="header-anchor" href="#引言" aria-hidden="true">#</a> 引言</h3><p>最近接到产品需求，用户需要在我们的站点上在线查看 PDF 文件，并且查看时，用户可以对 PDF 文件的进行旋转、缩放、跳转到指定页码等操作。</p><p>这个太简单了，随便找找就一堆轮子。</p><p>目前常见的在线 PDF 查看方案：</p><ul><li>使用 iframe、embed、object 标签直接加载</li></ul><p>采用此方案，只需要直接将 PDF 的在线地址设置为标签的 src 属性</p><ul><li>使用第三方库 PDF.js 加载</li></ul><p>这个方案麻烦一点，我们需要在项目中引入 PDF.js 这个库，然后再使用 iframe 来加载指定的 HTML 文件（下文代码中的 viewer.html ），并且将需要访问的 PDF 的在线地址作为参数传递进去。大概就像下面一样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>showPdf (selector, options) {
  const { width, height, fileUrl } = options;
  this.pdfFrame = document.createElement(&amp;#39;iframe&amp;#39;);
  this.pdfFrame.width = width;
  this.pdfFrame.height = height;
  this.pdfFrame.src = \`./assets/web/viewer.html?file=\${encodeURIComponent(fileUrl)}\`;
  document.getElementById(selector).append(this.pdfFrame);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里可能会遇到跨域的问题，不过不是本文重点，不展开讲，相信这种小事难不倒聪明的你。</p><p>于是乎，啪啪啪几行代码迅速搞定给产品演示。然后产品拿了个线上文件来尝试效果。。。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/31/1726a86f57b2cdb8~tplv-t2oaga2asx-image.image" alt="BEDC8D6B-827A-4883-8A27-52B6372517A5.png"></p><p>两人对着白屏尴尬的沉默良久，产品终于忍不住了。</p><p>“这怎么这么慢？不行，用户肯定不能接受。。。”。</p><p>“公司网络不好... 你这文件太大了... 你重启一下试试？“</p><p>不存在的，作为一个优秀的前端开发者，怎么可以说这种话，当然是想办法解决啦。</p><p>重新整理一下产品的需求：</p><ul><li>页面上查看服务器上的 pdf 文件</li><li>支持页码跳转、旋转、缩放</li><li><strong>打开要快</strong></li></ul><p>基本上前两条上述方案都能满足，所以我们需要解决的关键问题在于如何让用户快速打开内容，减少等待时间。由于现有方案都是将 pdf 文件内容全部下载完成之后才开始进行渲染，如果文件比较大的时候，用户第一次打开时就可能需要等待很长时间。那么思路有了：我们可不可以不下载全部的文件内容就开始渲染？</p><h3 id="方案思路-pdf-内容分片加载" tabindex="-1"><a class="header-anchor" href="#方案思路-pdf-内容分片加载" aria-hidden="true">#</a> 方案思路 - PDF 内容分片加载</h3><p>因为用户不可能一眼看到所有的 PDF 内容，每次只能看到屏幕显示范围内的几页。所以我们可以将可视范围内的PDF 页面内容优先下载并展示，可视范围外的我们根据用户浏览的实际位置按需下载和渲染。这样就可以减少第一次打开时用户的等待时间了。（类似与数据分页、图片懒加载的思想，目的是提高首屏性能。）</p><p>那么我们可以将一个大的 PDF 文件分成多个小文件，即分片。比如某个 PDF 有 200 页，我们按照 5 页一片，将它切分成 40 片，每次只下载用户看到的那一个分片。然后在用户进行滚动翻页的时候，异步的去下载对应包含对应页的分片。</p><p>基本的思路有了，接下来就是想办法实现了。要实现分片加载我们需要做两件事情：</p><p>1、服务器对 PDF 文件进行分片</p>`,25),p={href:"https://api.itextpdf.com/iText5/java/5.5.11/",target:"_blank",rel:"noopener noreferrer"},b=a(`<p>我们需要跟后端约定好 PDF 文件分片之后每一片的数据格式。假如分片的大小为5（即每次请求 5 页内容），那么可以定义数据格式如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &amp;quot;startPage&amp;quot;: 1, // 分片的开始页码
  &amp;quot;endPage&amp;quot;: 5, // 分片结束页码
  &amp;quot;totalPage&amp;quot;: 100, // pdf 总页数
  &amp;quot;url&amp;quot;: &amp;quot;http://test.com/asset/fhdf82372837283.pdf&amp;quot; // 分片内容下载地址
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、客户端根据用户交互行为获取并渲染指定的分片</p><p>显然，获取并渲染是两个操作。为了保证用户操作（滚动）的流畅性，这两个操作我们都异步进行。至此，我们需要解决的关键问题变成两个：</p><ul><li>如何下载 PDF 分片</li><li>如何渲染 PDF 分片</li></ul><h3 id="知识准备-pdf-js-接口介绍" tabindex="-1"><a class="header-anchor" href="#知识准备-pdf-js-接口介绍" aria-hidden="true">#</a> 知识准备 - PDF.js 接口介绍</h3>`,6),g={href:"https://mozilla.github.io/pdf.js",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/mozilla/pdf.js/blob/12aba0f91a5cd3e36fa81cb799540f8073990831/src/display/api.js#L431",target:"_blank",rel:"noopener noreferrer"},P=a(`<ol><li><pre><code>获取远程的 pdf 文档
</code></pre></li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> /**
  * This is the main entry point for loading a PDF and interacting with it.
  * NOTE: If a URL is used to fetch the PDF data a standard XMLHttpRequest(XHR)
  * is used, which means it must follow the same origin rules that any XHR does
  * e.g. No cross domain requests without CORS.
  *
  * @param {string|TypedArray|DocumentInitParameters|PDFDataRangeTransport} src
  * Can be a url to where a PDF is located, a typed array (Uint8Array)
  * already populated with data or parameter object.
  * @returns {PDFDocumentLoadingTask}
  */
 function getDocument(src) {
  // 省略实现
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单的说就是，getDocument 接口可以获取 src 指定的远程 PDF 文件，并返回一个 PDFDocumentLoadingTask 对象。后续所有对 PDF 内容的操作都可以通过改对象实现。</p><ol start="2"><li><pre><code>PDFDocumentLoadingTask
</code></pre></li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> /**
  * The loading task controls the operations required to load a PDF document
  * (such as network requests) and provides a way to listen for completion,
  * after which individual pages can be rendered.
  */
 // eslint-disable-next-line no-shadow
 class PDFDocumentLoadingTask {
   // 省略 n 行实现

    /**
      * Promise for document loading task completion.
      * @type {Promise}
      */
     get promise() {
       return this._capability.promise;
     }
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PDFDocumentLoadingTask 是一个下载远程 PDF 文件的任务。它提供了一些监听方法，可以监听 PDF 文件的下载状态。通过 promise 可以获取到下载完成的 PDF 对象，它会生成并最终返回一个 PDFDocumentProxy 对象。</p><ol start="3"><li><pre><code>PDFDocumentProxy
</code></pre></li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
* Proxy to a PDFDocument in the worker thread. Also, contains commonly used
* properties that can be read synchronously.
*/
class PDFDocumentProxy {
 // 省略 n 行实现

 /**
  * @type {number} Total number of pages the PDF contains.
  */
 get numPages() {
   return this._pdfInfo.numPages;
 }

  /**
  * @param {number} pageNumber - The page number to get. The first page is 1.
  * @returns {Promise} A promise that is resolved with a {@link PDFPageProxy}
  *   object.
  */
 getPage(pageNumber) {
   return this._transport.getPage(pageNumber);
 }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PDFDocumentProxy 是 PDF 文档代理类，我们可以通过它的 numPages 获取到文档的页面数量，通过 getPage 方法获取到指定页码的页面 PDFPageProxy 实例。</p><ol start="4"><li><pre><code>PDFPageProxy
</code></pre></li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> /**
  * Proxy to a PDFPage in the worker thread.
  * @alias PDFPageProxy
  */
 class PDFPageProxy {
  // 省略 n 行实现

   /**
    * @param {GetViewportParameters} params - Viewport parameters.
    * @returns {PageViewport} Contains &amp;#39;width&amp;#39; and &amp;#39;height&amp;#39; properties
    *   along with transforms required for rendering.
    */
   getViewport({
     scale,
     rotation = this.rotate,
     offsetX = 0,
     offsetY = 0,
     dontFlip = false,
   } = {}) {
     return new PageViewport({
       viewBox: this.view,
       scale,
       rotation,
       offsetX,
       offsetY,
       dontFlip,
     });
   }

   /**
    * Begins the process of rendering a page to the desired context.
    * @param {RenderParameters} params Page render parameters.
    * @returns {RenderTask} An object that contains the promise, which
    *                       is resolved when the page finishes rendering.
    */
   render({
     canvasContext,
     viewport,
     intent = &amp;quot;display&amp;quot;,
     enableWebGL = false,
     renderInteractiveForms = false,
     transform = null,
     imageLayer = null,
     canvasFactory = null,
     background = null,
   }) {
    // 省略方法实现
   }
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PDFPageProxy 我们主要用到它的两个方法。通过 getViewport 可以根据指定的缩放比例（scale）、旋转角度（rotation）获取当前 PDF 页面的实际大小。通过 render 方法可以将 PDF 的内容渲染到指定的 canvas 上下文中。</p><h3 id="实现细节" tabindex="-1"><a class="header-anchor" href="#实现细节" aria-hidden="true">#</a> 实现细节</h3><h4 id="下载-pdf-分片" tabindex="-1"><a class="header-anchor" href="#下载-pdf-分片" aria-hidden="true">#</a> 下载 PDF 分片</h4><p>首先我们使用 PDF.js 提供的接口获取第一个分片的 url，然后再下载该分片的 PDF 文件。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/*
  代码中使用 loadStatus 来记录特定页的内容是否一件下载
*/
const pageLoadStatus = {
  WAIT: 0, // 等待下下载
  LOADED: 1, // 已经下载
}
// 拿到第一个分片
const { startPage, totalPage, url } = await fetchPdfFragment(1);
if (!pages) {
  const pages = initPages(totalPage);
}
const loadingTask = PDFJS.getDocument(url);
loadingTask.promise.then((pdfDoc) =&amp;gt; {
  // 将已经下载的分片保存到 pages 数组中
  for (let i = 0; i &amp;lt; pdfDoc.numPages; i += 1) {
    const pageIndex = startPage + i;
    const page = pages[pageIndex - 1];
    if (page.loadStatus !== pageLoadStatus.LOADED) {
        pdfDoc.getPage(i + 1).then((pdfPage) =&amp;gt; {
        page.pdfPage = pdfPage;
        page.loadStatus = pageLoadStatus.LOADED;
        // 通知可以进行渲染了
        startRenderPages();
      });
    }
  }
});
// 从服务器获取分片
asycn function fetchPdfFragment(pageIndex) {
  /* 
    省略具体实现
    该方法从服务器获取包含指定页码(pageIndex)的 pdf 分片内容，
    返回的格式参考上文约定：
    {
      &amp;quot;startPage&amp;quot;: 1, // 分片的开始页码
      &amp;quot;endPage&amp;quot;: 5, // 分片结束页码
      &amp;quot;totalPage&amp;quot;: 100, // pdf 总页数
      &amp;quot;url&amp;quot;: &amp;quot;http://test.com/asset/fhdf82372837283.pdf&amp;quot; // 分片内容下载地址
    }
  */ 
}
// 创建一个 pages 数组来保存已经下载的 pdf 
function initPages (totalPage) {
  const pages = [];
  for (let i = 0; i &amp;lt; totalPage; i += 1) {
    pages.push({
      pageNo: i + 1,
      loadStatus: pageLoadStatus.WAIT,
      pdfPage: null,
      dom: null
    });
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="渲染-pdf-分片" tabindex="-1"><a class="header-anchor" href="#渲染-pdf-分片" aria-hidden="true">#</a> 渲染 PDF 分片</h4><p>PDF 分片内容下载完成之后，我们就可以将其渲染到页面上。渲染之前，我们需要知道 PDF 页面的大小。调用 PDF.js 提供的方法，我们能够根据当前 PDF 的缩放比例、选择角度来获取页面的实际大小。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 获取单页高度
const viewport = pdfPage.getViewport({
  scale: 1, // 缩放的比例
  rotation: 0, // 旋转的角度
});
// 记录pdf页面高度
const pageSize = {
  width: viewport.width,
  height: viewport.height,
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们需要创建一个内容渲染的区域，需要计算出内容的总高度（总高度 = 单页高度 * 总页数）。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 为了不让内容太拥挤，我们可以加一些页面间距 PAGE_INTVERVAL
const PAGE_INTVERVAL = 10;
// 创建内容绘制区，并设置大小
const contentView = document.createElement(&amp;#39;div&amp;#39;);
contentView.style.width = \`\${this.pageSize.width}px\`;
contentView.style.height = \`\${(totalPage * (pageSize.height + PAGE_INTVERVAL)) + PAGE_INTVERVAL}px\`;
pdfContainer.appendChild(contentView);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后我们就可以根据 pdf 的页码来将其内容渲染到指定区域。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 我们可以通过 scale 和 rotaion 的值来控制 pdf 文档缩放、旋转
let scale = 1;
let rotation = 0;
function renderPageContent (page) {
  const { pdfPage, pageNo, dom } = page;
  // dom 元素已存在，无须重新渲染，直接返回
  if (dom) {
    return;
  }
  const viewport = pdfPage.getViewport({
    scale: scale,
    rotation: rotation,
  });
  // 创建新的canvas
  const canvas = document.createElement(&amp;#39;canvas&amp;#39;);
  const context = canvas.getContext(&amp;#39;2d&amp;#39;);
  canvas.height = pageSize.height;
  canvas.width = pageSize.width;
  // 创建渲染的dom
  const pageDom = document.createElement(&amp;#39;div&amp;#39;);
  pageDom.style.position = &amp;#39;absolute&amp;#39;;
  pageDom.style.top = \`\${((pageNo - 1) * (pageSize.height + PAGE_INTVERVAL)) + PAGE_INTVERVAL}px\`;
  pageDom.style.width = \`\${pageSize.width}px\`;
  pageDom.style.height = \`\${pageSize.height}px\`;
  pageDom.appendChild(canvas);
  // 渲染内容
  pdfPage.render({
    canvasContext: context,
    viewport,
  });
  page.dom = pageDom;
  contentView.appendChild(pageDom);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="滚动加载内容" tabindex="-1"><a class="header-anchor" href="#滚动加载内容" aria-hidden="true">#</a> 滚动加载内容</h4><p>上面我们已经将第一个分片进行了展示，但是当用户进行滚动时，我们需要更新内容的显示。首先根据滚动的位置，计算出当前需要展示的页面，然后下载包含该页面的分片。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 监听容器的滚动事件，触发 scrollPdf 方法
// 这里加了防抖保证不会一次产生过多请求
scrollPdf = _.debounce(() =&amp;gt; {
  const scrollTop = pdfContainer.scrollTop;
  const height = pdfContainer.height;
  // 根据内容可视区域中心点计算页码, 没有滚动时，指向第一页
  const pageIndex = scrollTop &amp;gt; 0 ?
        Math.ceil((scrollTop + (height / 2)) / (pageSize.height + PAGE_INTVERVAL)) :
        1;
  loadBefore(pageIndex);
  loadAfter(pageIndex);
}, 200)
// 假定每个分片的大小是 5 页
const SLICE_COUNT = 5;
// 获取当前页之前页面的分片
function loadBefore (pageIndex) {
  const start = (Math.floor(pageIndex / SLICE_COUNT) * SLICE_COUNT) - (SLICE_COUNT - 1);
  if (start &amp;gt; 0) {
    const prevPage = pages[start - 1] || {};
    prevPage.loadStatus === pageLoadStatus.WAIT &amp;amp;&amp;amp; loadPdfData(start);
  }
}
// 获取当前页之后页面的分片
function loadAfter (pageIndex) {
  const start = (Math.floor(pageIndex / SLICE_COUNT) * SLICE_COUNT) + 1;
  if (start &amp;lt;= pages.length) {
    const nextPage = pages[start - 1] || {};
    nextPage.loadStatus === pageLoadStatus.WAIT &amp;amp;&amp;amp; loadPdfData(start);
  }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="做一些优化" tabindex="-1"><a class="header-anchor" href="#做一些优化" aria-hidden="true">#</a> 做一些优化</h3><p>PDF 文件可能会很大，比如一个 1000 页的 PDF 文件。随着用户的滚动浏览，它会一直渲染，如果最终同时将 1000 个页面的 dom 全部放到页面上。那么内存占用将会非常多，导致页面卡顿。因此，为了减少内存占用，我们可以将当前可视范围之外的页面元素清除。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 首先我们获取到需要渲染的范围
// 根据当前的可视范围内的页码，我们前后只保留 10 页
function getRenderScope (pageIndex) {
  const pagesToRender = [];
  let i = pageIndex - 1;
  let j = pageIndex + 1;
  pagesToRender.push(pages[pageIndex - 1]);
  while (pagesToRender.length &amp;lt; 10 &amp;amp;&amp;amp; pagesToRender.length &amp;lt; pages.length) {
    if (i &amp;gt; 0) {
      pagesToRender.push(pages[i - 1]);
      i -= 1;
    }
    if (pagesToRender.length &amp;gt;= 10) {
      break;
    }
    if (j &amp;lt;= pages.length) {
      pagesToRender.push(this.pages[j - 1]);
      j += 1;
    }
  }
  return pagesToRender;
}
// 渲染需要展示的页面，不需展示的页码将其清除
function renderPages (pageIndex) {
  const pagesToRender = getRenderScope(pageIndex);
  for (const i of pages) {
    if (pagesToRender.includes(i)) {
      i.loadStatus === pageLoadStatus.LOADED ?
        renderPageContent(i) :
        renderPageLoading(i);
    } else {
      clearPage(i);
    }
  }
}
// 清除页面 dom
function clearPage (page) {
  if (page.dom) {
    contentView.removeChild(page.dom);
    page.dom = undefined;
  }
}
// 页面正在下载时渲染loading视图
function renderPageLoading (page) {
  const { pageNo, dom } = page;
  if (dom) {
    return;
  }
  const pageDom = document.createElement(&amp;#39;div&amp;#39;);
  pageDom.style.width = \`\${pageSize.width}px\`;
  pageDom.style.height = \`\${pageSize.height}px\`;
  pageDom.style.position = &amp;#39;absolute&amp;#39;;
  pageDom.style.top = \`\${
    ((pageNo - 1) * (pageSize.height + PAGE_INTVERVAL)) + PAGE_INTVERVAL
  }px\`;
  /*
  	此处在dom 上添加 loading 组件，省略实现
  */
  page.dom = pageDom;
  contentView.appendChild(pageDom);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此，我们就实现了 PDF 文件的分片展示。保证了第一次用户就可以很快看到文件内容，同时在用户在滚动浏览时不会感觉到有卡顿，产品经理也露出了满足的微笑。</p><h3 id="总结-amp-遇到的坑" tabindex="-1"><a class="header-anchor" href="#总结-amp-遇到的坑" aria-hidden="true">#</a> 总结 &amp;amp; 遇到的坑</h3><p>我们在程序设计中，遇到请求数据较大、任务执行时间过长等场景时很容易想到通过数据切分、任务分片等方式来提升程序在系统中的执行&amp;amp;响应效果。本文介绍的问题便是将大的 PDF 文件拆分，然后根据用户的交互行为按需加载，从而达到提升用户在线阅读体验的目的。</p><p>当然上述方案还存在很多优化空间，比如我们可以通过 IntersectionObserver API 结合容器 margin 的调整来实现 PDF 内容的滚动及页面元素的复用。具体的实现大家有兴趣可以自己尝试。</p><p>实际使用场景中，我们也遇到了一些坑。上述方案在进行页面渲染时，会预先初始化整个容器（ contentView）的大小。并且我们是根据第一次获取的 PDF 页面的大小进行计算容器高度的（页面高度 * 总页数）。这里有一个前提，就是我们假定所有的 PDF 页面大小是一样的，但在实际场景中，很可能出现同一个 PDF 文档中，页面大小不一样的情况。这时就会出现加载页面位置不准确或者内容展示被遮挡的情况。</p><p>针对上述问题，目前我们思考了两种方案：</p><ul><li>将大小不一样的页面进行缩放。当我们发现页面大小和保存的 pageSize 不一致时，可以将当前页进行缩放，这样就将所有页面的大小转化成了一样。但是这样做用户体验会有所影响，因为用户看到的页面内容大小可能和他实际上传的不一样。</li><li>可以在服务器上提前计算好每一页的页面大小，返回给前端。前端在渲染指定页时，根据服务器返回的数据进行来计算页面位置。但是这样需要在前端做大量的计算。渲染性能上会受到一些影响。</li></ul><p>如果大家还有更好的办法，欢迎讨论。</p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,38),f={href:"https://juejin.cn/post/6844904153043435533",target:"_blank",rel:"noopener noreferrer"},x={href:"https://juejin.cn/post/6844903988081475591",target:"_blank",rel:"noopener noreferrer"},D={href:"https://juejin.cn/post/6844904038555729927",target:"_blank",rel:"noopener noreferrer"},_=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),n(" 招贤纳士")],-1),F=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),w=e("p",null,[n("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),T=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/24/1737e6194e9c083d~tplv-t2oaga2asx-image.image",alt:""})],-1);function I(y,L){const i=t("ExternalLinkIcon");return l(),r("div",null,[c,e("p",null,[n("> 这是第 52 篇不掺水的原创，想获取更多原创好文，请扫 👆上方二维码关注我们吧~"),m,n(" > 本文首发于政采云前端团队博客："),e("a",u,[n("如何实现高性能的在线 PDF 预览"),s(i)])]),o,e("p",null,[n("由于这个是服务器做了，所以，交给后端就好了。本文不细讲，大家有兴趣的可以去了解 "),e("a",p,[n("itextpdf"),s(i)]),n(" 库，它提供了相关 API 对 PDF 进行切片。")]),b,e("p",null,[n("由于我们无法在已有标签上做修改，所以我们考虑基于 PDF.js 库进行深度定制。那么我们先了解一下 PDF.js 可以为我们提供哪些能力。参考 "),e("a",g,[n("官方文档"),s(i)]),n("，下面列举了我们需要用到的几个 API ，由于官方文档中内容比较粗，这里贴上了源码中的注释。另附 "),e("a",h,[n("源码地址"),s(i)]),n("。")]),P,e("p",null,[e("a",f,[n("图解 HTTP 缓存"),s(i)])]),e("p",null,[e("a",x,[n("可能是最全的 “文本溢出截断省略” 方案合集"),s(i)])]),e("p",null,[e("a",D,[n("图文并茂，为你揭开“单点登录“的神秘面纱"),s(i)])]),_,F,w,T])}const E=d(v,[["render",I],["__file","如何实现高性能的在线 PDF 预览.html.vue"]]);export{E as default};
