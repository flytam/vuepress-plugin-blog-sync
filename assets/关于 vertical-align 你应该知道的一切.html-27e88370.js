import{_ as t,z as s,A as d,Y as e,C as i,U as l,a6 as n,Q as m}from"./framework-cb9358d9.js";const p={},o=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/22/17239e3edd804567~tplv-t2oaga2asx-image.image",alt:""})],-1),c=e("br",null,null,-1),r={href:"https://www.zoo.team/article/vertical-align",target:"_blank",rel:"noopener noreferrer"},v=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170ba4316c8717b8~tplv-t2oaga2asx-image.image",alt:""})],-1),g=e("h2",{id:"前言",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),i(" 前言")],-1),u={href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align",target:"_blank",rel:"noopener noreferrer"},b=n('<p>一种简单的 CSS 属性，用来指定行内元素（inline）或表格单元格（table-cell）元素的垂直对齐方式。</p><p>我们对于它的直观定义是与 <code>text-align:center</code> 相类似，一个控制水平方向对齐方式，一个控制垂直方向对齐方式。但是在很多情况下，我们发现设置属性之后并没生效。接下来让我们步步深入学习，共同揭开 vertical-align 的神秘 ”面纱“ 吧。</p><p>首先我们先讲一下，要实现垂直居中，我们为什么选择 vertical-align 这样一个不起眼的 CSS 属性。</p><ul><li><code>float</code>：只能对齐它们的顶部，而且可能导致布局塌陷，需要手动清除</li><li><code>position:absolute</code>：会使元素脱离文档流，以致于它们不能影响周围的元素</li><li>手动添加内外边距的方法：需要父元素高度固定</li><li><code>transform:translateY</code>：属于 CSS3 新特性，对 IE8、IE9 有一些兼容性的问题</li></ul><p>使用 <code>vertical-align</code> 你能在不同场景下去进行灵活细微的元素对齐工作，并且它有很好的的兼容性，详情如下图所示：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170ba421014d0b66~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="前置准备" tabindex="-1"><a class="header-anchor" href="#前置准备" aria-hidden="true">#</a> 前置准备</h2><p>在认识 vertical-align 属性之前，首先要了解几个基本的概念。</p>',8),h={href:"https://www.zhangxinxu.com/wordpress/2015/06/about-letter-x-of-css/",target:"_blank",rel:"noopener noreferrer"},x=e("li",null,[e("p",null,"行高( line-height )：两行文字基线之间的距离")],-1),f={href:"https://segmentfault.com/a/1190000014692461",target:"_blank",rel:"noopener noreferrer"},_=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170ba42102f9f738~tplv-t2oaga2asx-image.image",alt:""})],-1),j=n("<li><p><code>content area</code> : 围绕文字看不见的 Box，其大小与 font-size 有关</p></li><li><p><code>inline boxes</code>: 不会成块显示，而是并排显示在一行的 boxes ，如 <code>span</code>,<code>a</code>,<code>em</code>等标签以及匿名 inline boxes（即不含把标签的裸露的文字）</p></li><li><p><code>line boxes</code>: 由一个一个的 inline boxes 组成，一行即为一个 line box</p></li><li><p><code>containing box</code>: 外层盒子模型,包含了其他的 boxes</p></li><li><p>起作用的前提：元素为 inline 水平元素或 table-cell 元素，包括 <code>span</code> , <code>img</code> , <code>input</code> , <code>button</code> , <code>td</code> 以及通过 display 改变了显示水平为 inline 水平或者 table-cell 的元素。这也意味着，默认情况下， <code>div</code> , <code>p</code> 等元素设置 vertical-align 无效</p></li>",5),y=n(`<p>值得注意的是：例如 float 和 position: absolute ，一旦设置了这两个属性之一，元素的 display 值被忽略，强制当成 block 方式处理，因此，vertical-align 也就失去了作用。</p><h2 id="vertical-align-属性值" tabindex="-1"><a class="header-anchor" href="#vertical-align-属性值" aria-hidden="true">#</a> vertical-align 属性值</h2><p>&gt; 除 Inherit 继承 之外，vertical-align 的属性值可以归为以下4类 &gt; &gt; - <strong>线类</strong>，如 Baseline、Top、Middle、Bottom ；</p><ul><li><p>baseline 为 vertical-align 的默认值，其意思是指基线对齐</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170ba4210376fdef~tplv-t2oaga2asx-image.image" alt=""></p></li></ul><p>我们可以把每一个行框盒子的后面想象有一个看不见的节点 x（该节点继承了 line-height ），因为默认对齐方式为基线对齐，所以<code>.text</code> 就是和这个字母 x 的下边缘对齐。</p><p>在实际应用中我们经常会遇到下图这种情况，你可能会容易的解决这种无法对齐的问题，但是你知道是什么原因导致他们这个样子吗？</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;ul class=&amp;quot;box&amp;quot;&amp;gt;
  &amp;lt;li&amp;gt;文本&amp;lt;/li&amp;gt;  
  &amp;lt;li&amp;gt;&amp;lt;/li&amp;gt;
&amp;lt;/ul&amp;gt;
&amp;lt;style&amp;gt;
  .li {
    font-size: 20px;
    width: 160px;
    height: 160px;
    display: inline-block;
    border: 1px solid #ccc;
  }
&amp;lt;/style&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170ba4210379b80f~tplv-t2oaga2asx-image.image" alt=""></p><p>这里就涉及到了 inline-block 基线的定义，inline-block 的基线是正常流中最后一个（行盒子） line box 的基线，但是，如果这个 line box 里面没有 inline boxes 或者其 overflow 属性值不是 visible，那么其基线就是 margin bottom 的边缘。</p><p>如上图所示，第一个元素基线是子元素”文本“的基线，而第二个是盒子的底边缘，默认基线对齐，两个元素基线位置不一致，所有会产生上图现象，知道了原因，我们只需设置元素的 vertical-align 属性为 top/bottom/middle 就可以轻松对齐了。</p><ul><li>top 与 bottom</li></ul><p>&gt; 对于内联元素，指的是元素的顶部（底部）和当前行框盒子的顶部（底部）对齐；即与 line-box 的顶部（底部）对齐 对于 table-cell 元素，指的是元素的顶 padding 边缘和表格行的顶部对齐。</p><p>基本效果如下图：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170ba42103cc761b~tplv-t2oaga2asx-image.image" alt=""></p><ul><li>middle 这个属性值用得比较多。</li></ul><p>&gt; 对于内联元素指的是元素的垂直中心点与行框盒子基线往上 1/2x-height 处对齐，简单点说就是字母 X 的中心位置对齐；对于 table-cell 元素，指的是单元格填充盒子相对于外面的表格行居中对齐。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170ba421070ad142~tplv-t2oaga2asx-image.image" alt=""></p><ul><li><strong>文本类</strong></li></ul><p>&gt; text-top，指的是盒子的顶部和父级内容区域的顶部对齐，即与 content-area 顶部对齐。 text-bottom，指的是盒子的底部和父级内容区域的底部对齐，即与 content-area 底部部对齐。</p><p>例子如下：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170ba4213dfb6364~tplv-t2oaga2asx-image.image" alt=""></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;div class=&amp;quot;box&amp;quot;&amp;gt;
    &amp;lt;span class=&amp;quot;f12&amp;quot;&amp;gt;12px&amp;lt;/span&amp;gt;
    &amp;lt;span class=&amp;quot;f16&amp;quot;&amp;gt;16px&amp;lt;/span&amp;gt;
    &amp;lt;span class=&amp;quot;f20&amp;quot;&amp;gt;20px&amp;lt;/span&amp;gt;
    &amp;lt;img src=&amp;quot;./panda.jpg&amp;quot;/&amp;gt;
&amp;lt;/div&amp;gt;
&amp;lt;style&amp;gt;
  .box {
    font-size: 16px;
  }
  img {
    vertical-align: text-top; 
    width: 100px;
    height: 100px; 
  }
  .f12 {
    font-size: 12px;
  }
  .f16 {
    font-size: 16px;
  }
  .f20 {
    font-size: 20px;
  }
&amp;lt;/style&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>content-area 即围绕文字看不见的 box，其大小与 font-size 有关，可以看成是鼠标选中文字后高亮的背景色区域，上面的例子中，由于父元素字体设置的是 16px ，所以图片的 vertical-align 设置 text-top 的时候，就可以看成是跟子元素为 16px 元素的内容区域顶部对齐，它与 line-height 无关</li><li><strong>上标下标类</strong></li></ul><p>&gt; 如 sub、super；这两个属性用的比较少。</p><ul><li><code>super</code> 属性效果相当于 html 标签 <code>&amp;lt;sup&amp;gt;&amp;lt;/sup&amp;gt;</code> 的效果</li><li><code>sub</code> 属性效果 相当于 html 标签 <code>&amp;lt;sub&amp;gt;&amp;lt;/sub&amp;gt;</code> 的效果</li><li><strong>数值百分比类</strong>，如 10px、1em、5%</li></ul><p>&gt; 之所以数值和百分比写在一起主要是他们有以下共性：都带数字、都支持负值、行为表现一致</p><ul><li>vertical-align 支持数值的特性，兼容性也非常好，但大部分开发人员却不知道 vertical-align 支持数值。对于数值，我们要知道的是：1、正值表示由基线往上偏移，负值表示由基线往下偏移。2、百分比则是基于 line-height 来计算的</li></ul><p>需要注意的是：除了 top 与 bottom 是使元素相对于整行垂直对齐外，其他属性值都是相对于父元素。所以，在开发时，<strong>我们只需要关注当前元素和父级，两元素前后并没有直接影响</strong>。</p><h2 id="vertical-align-与-line-height-之间的基友关系" tabindex="-1"><a class="header-anchor" href="#vertical-align-与-line-height-之间的基友关系" aria-hidden="true">#</a> vertical-align 与 line-height 之间的基友关系</h2><p>说到 vertical-align 就要讲到它与 line-height 之间密切的关系，从上面我们都知道百分比类型是根据 line-height 来计算的。但事实是 <strong>对于内联元素，vertical-align 与 line-height 虽然看不见，但实际上「到处都是」</strong>。其实我们很多时候发现设置 vertical-align 属性无效，这很有可能就是 line-height 的原因了，下面我们来看两个典型的例子。</p><ul><li>Demo1 ：任意一个块级元素，里面若有图片，则块级元素高度基本上都要比图片的高度高</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;div class=&amp;quot;box&amp;quot;&amp;gt;
 &amp;lt;img  src=&amp;quot;./panda.jpg&amp;quot; /&amp;gt;
&amp;lt;/div&amp;gt;
&amp;lt;style&amp;gt;
.box {
  width: 300px;
  border: 1px solid #ddd;
}
img {
  width: 100px;
  height: 100px;
}
&amp;lt;/style&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170ba4210376fdef~tplv-t2oaga2asx-image.image" alt=""></p><p>产生这种现象的原因：空白节点、<code>line-height</code> 和 <code>vertical-align</code>属性；图片后放置空白节点 X，会发现图片的基线是元素底部，与“空白节点”的基线对齐，那解决这种问题有以下几个方法：</p><p>（1）将图片设置为 display:block （利用 vertical-align 的生效前提）</p><p>（2）将 vertical-align 设置为 top，bottom，或者 middle 等值（利用属性值的表现行为）</p><p>（3）将 line-height 设置为 0 （利用 line-height 为 0 时，基线上移）</p><p>（4）将 font-size 设置为 0 （如果 line-height 的值为相对值）</p><p>（5）将 img 设置浮动或者绝对定位 （如果布局允许的话）</p><ul><li>Demo2：近似垂直居中</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;div class=&amp;quot;box&amp;quot;&amp;gt;
  &amp;lt;span class=&amp;quot;son&amp;quot;&amp;gt;&amp;lt;/span&amp;gt;
  x
&amp;lt;/div&amp;gt;
&amp;lt;style&amp;gt;
.box {
  width: 300px;
  height: 150px;
  line-height: 150px;
  font-size: 20px;
  border: 1px solid #ddd;
  position: relative;
}
//  绘制父元素的垂直中心线
.box::after  {
  content: &amp;quot;&amp;quot;;
  position: absolute;
  display: block;
  width: 100%;
  height: 1px;
  background-color: red;
  top:0;
  bottom: 0;
  margin: auto;
  left: 0; 
  }  
.son {
   display: inline-block;
   width: 100px;
   height: 100px;
   vertical-align: middle;
   background-color: purple;
   position: relative;
}
.son::after  {
    content: &amp;quot;&amp;quot;;
    position: absolute;
    display: block;
    width: 100%;
    height: 1px;
    background-color: #317ffd;
    top:0;
    bottom: 0;
    margin: auto;
    left: 0;  
  }
&amp;lt;/style&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170ba4214217df7a~tplv-t2oaga2asx-image.image" alt=""></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170ba42142848a71~tplv-t2oaga2asx-image.image" alt=""></p><p>如图所示(为了更明显我使用了色块来标识)，当子元素（图片）设置了 vertical-align:middle，并不是绝对居中，而只能说是近似居中。子元素的垂直中心线与父级元素基线的位置往上二分之一 X 高度（X 的中心） 所在线对齐，通俗一点讲，就是图中红线表示父元素的垂直中心线，蓝线表示子元素的垂直中心线，可以明显的看到 蓝线 与 X 的中心保持一致，但较红线偏低。如果绝对居中的话，两条线应该完全重合。</p><p>为什么会产生这种现象呢？主要原因在于文字具有下沉特性，从而导致蓝线无法绝对与红线对齐。当文字大小足够小时，我们可以忽略。从而近似的实现居中效果。但是文字越大，影响就越明显。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170ba42142729820~tplv-t2oaga2asx-image.image" alt=""></p><p>那对于这样的问题我们要怎么解决呢？以下提供几种思路：</p><p>1、设置后面的 “空白节点 X ” 的垂直对齐方式也是 <code>vertical-align:middle</code>，然而，既然称之为 “空白节点” 就表示不会受非继承特性的属性影响，所以，根本没法设置 <code>vertical-align:middle</code>，除非你自己创建一个显示的内联元素或者伪元素。</p><p>2、“空白节点” 可以受具有继承特性的 CSS 属性影响，于是，我们可以通过其他东西来做调整，让字符的中线和字符内容中心线在一起，或者说在一个位置上就可以了。设置父元素 <code>font-size : 0</code> , 因此此时<code>content area</code>高度是 0 ，各种乱七八糟的线都在高度为 0 的这条线上，绝对中心线和中线重合。效果如下：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170ba42153dfb113~tplv-t2oaga2asx-image.image" alt=""></p><p>这种通过 <code>line-height</code> 定高，元素 <code>vertical-align:middle</code> 垂直居中的方法不仅适用于现代浏览器，连 IE 浏览器也是支持的，但是这里只有在 IE7 中需要注意的是图片后面需要换行或者空格，经验证这个不是由于标签闭合引起的，可能只是一个 IE7 的 bug 吧。比较幸运的是，现在很多网站的兼容都是基于 IE9，所以可以忽略这个问题啦。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;div&amp;gt;&amp;lt;img src=&amp;quot;xxx.jpg&amp;quot;&amp;gt;&amp;lt;!-- 这里要折行或空格 --&amp;gt;&amp;lt;/div&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="扩展案例" tabindex="-1"><a class="header-anchor" href="#扩展案例" aria-hidden="true">#</a> 扩展案例</h2><ul><li>案例1：任意父级高度的垂直居中</li></ul><p>我们给父级设置 line-height 的值等于 height 的值，实现了近似垂直居中的效果。那如果父级的高度是随着内容的变化而变化的怎么办？此时无法给父级设置一个特定的值，也不能使用百分比，因为 line-height 是根据字体的大小来计算的。</p><p>比如下面这种情况，整个盒子高度是确定的，但是文本的内容不确定。同时要求两种表现形式相同，我们要怎么实现呢？</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170ba4216aec6607~tplv-t2oaga2asx-image.image" alt=""></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;ul&amp;gt;
  &amp;lt;li class=&amp;quot;text-container&amp;quot;&amp;gt;
    &amp;lt;span&amp;gt;我是单行文本我是单行文本&amp;lt;/span&amp;gt;
  &amp;lt;/li&amp;gt;
  &amp;lt;li class=&amp;quot;text-container&amp;quot;&amp;gt;
    &amp;lt;span&amp;gt;我是多行文本我是多行文本我是多行文本我是多行文本我是多行文本我是多行文本&amp;lt;/span&amp;gt;
   &amp;lt;/li&amp;gt;
 &amp;lt;/ul&amp;gt;
&amp;lt;style&amp;gt;
  .text-container {
    height: 150px;
    text-align: center;
    vertical-align: middle;
  }
  .text-container:after {
    content: &amp;quot;&amp;quot;;
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
  }
  span {
    vertical-align: middle;
    display: inline-block;
    max-width: 90%;
    max-height: 100px;
    overflow: hidden;
  }
&amp;lt;/style&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然实现方式千千万，既然我们知道了 vertical-align 的原理。为什么不学以致用呢？按照之前的讲解，我们可以借助空白节点，空白节点我们看不见，但是如果可以给它设置一个高度，让它与父级高度一致，就解决了这个问题。怎么给高度呢？答案是借助伪元素。那么我们解决这类问题就可以使用以下步骤了：</p><ul><li>主体元素 inline-block 化</li><li>0 宽度 100% 高度的辅助元素（伪元素）</li><li>ertical-align : middle</li><li>案例2：实现多图列表的两端对齐</li></ul><p>在做类似商品列表的布局时，我们时常需要每一行列表的实现两端对齐。实现的方法有很多，这里我们用 <code>display:inline-block</code> + <code>辅助元素</code> 来实现。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;dl class=&amp;quot;container&amp;quot;&amp;gt;
  &amp;lt;dt&amp;gt;&amp;lt;img src=&amp;quot;./7.jpg&amp;quot;/&amp;gt;&amp;lt;/dt&amp;gt;
  &amp;lt;dt&amp;gt;&amp;lt;img src=&amp;quot;./7.jpg&amp;quot;/&amp;gt;&amp;lt;/dt&amp;gt;
  &amp;lt;dt&amp;gt;&amp;lt;img src=&amp;quot;./7.jpg&amp;quot;/&amp;gt;&amp;lt;/dt&amp;gt;
  &amp;lt;dt&amp;gt;&amp;lt;img src=&amp;quot;./7.jpg&amp;quot;/&amp;gt;&amp;lt;/dt&amp;gt;
  &amp;lt;dt&amp;gt;&amp;lt;i class=&amp;quot;justify-fix&amp;quot;&amp;gt;&amp;lt;/i&amp;gt;&amp;lt;/dt&amp;gt;
  &amp;lt;dt&amp;gt;&amp;lt;i class=&amp;quot;justify-fix&amp;quot;&amp;gt;&amp;lt;/i&amp;gt;&amp;lt;/dt&amp;gt;
  &amp;lt;dt&amp;gt;&amp;lt;i class=&amp;quot;justify-fix&amp;quot;&amp;gt;&amp;lt;/i&amp;gt;&amp;lt;/dt&amp;gt;
  xxx
&amp;lt;/dl&amp;gt;
&amp;lt;style&amp;gt;
  .container {
    text-align: justify;
    width: 400px;
    margin: 50px  auto;
    border:  1px solid #ddd;
    line-height: 0;
   }
  dt {
    list-style: none;
    display: inline-block;
    width: 100px;
  }
  .container img {
    width:100px;
    height:100px;
  }
  .justify-fix {
    display: inline-block; 
    width: 100px;
    outline: 1px dashed #317ffd;
    vertical-align: middle;
  }
&amp;lt;/style&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170ba42170bb2627~tplv-t2oaga2asx-image.image" alt=""></p><p>我们会一眼就看到在图片周围到处都是空白空隙，那么这些空隙是什么原因造成的呢？很多时候，复杂问题是由简单问题组合而成的，那么我们可以按照以下想法来简化问题。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170ba421996b0402~tplv-t2oaga2asx-image.image" alt=""></p><p>我们可以想象整个布局只存在虚线框中的部分。大的部分都是由一块一块的虚线框中部分组合而成的。我们会惊喜的发现这个现象就是上面所说的任意一个块级元素，里面若有图片，则块级元素高度基本上都要比图片的高度高问题，那么产生的原因就知道了，是 line-height 与 vertical-align 之间关系产生的影响。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170ba421a0596be1~tplv-t2oaga2asx-image.image" alt=""></p><p>上面已经讲过如何解决此类问题，我们直接给父元素 <code>line-height:0</code> ，这样每个虚线框中小的空隙就消失了。但是可以明显的看到底部有很大的空隙并没有消除。为了更清楚，我把占位 <code>i</code>元素 <code>outline</code> 高亮下。并且添加一个空白节点 x。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170ba421a45eb72e~tplv-t2oaga2asx-image.image" alt=""></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170ba421a927d776~tplv-t2oaga2asx-image.image" alt=""></p><p>最后一个 dt 与我们手动添加的空白节点 X 的基线对齐。还记得前面说过的两个 inline-block 排列错位的例子吗? 这个现象就是由 inline-block 基线问题引起的。正如图中红色框展示的，dt 的基线是元素底部，根据上面所讲的，给占位元素i加一个 <code>vertical-align:bottom/top</code> 属性。然后就完美地解决了~</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170ba421aeed03cc~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>本文讲解了 vertical-align 的基本属性以及各种表现，同时对一些实际应用中 vertical-align 无效现象做了简单的分析阐述，并为解决此类问题提供了思路。本文讲解可能不全面，不成熟，欢迎在评论区留下宝贵评论，共同探讨，共同进步。</p><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>`,75),q={href:"https://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://segmentfault.com/a/1190000007675393",target:"_blank",rel:"noopener noreferrer"},w={href:"https://segmentfault.com/a/1190000002784054",target:"_blank",rel:"noopener noreferrer"},S={href:"https://segmentfault.com/a/1190000015366749",target:"_blank",rel:"noopener noreferrer"},z=e("h2",{id:"推荐阅读",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#推荐阅读","aria-hidden":"true"},"#"),i(" 推荐阅读")],-1),C={href:"https://juejin.cn/post/6844903950508883982",target:"_blank",rel:"noopener noreferrer"},E={href:"https://juejin.cn/post/6844903988081475591",target:"_blank",rel:"noopener noreferrer"},I={href:"https://juejin.cn/post/6844904038555729927",target:"_blank",rel:"noopener noreferrer"},X=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),i(" 招贤纳士")],-1),B=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),N=e("p",null,[i("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),T=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image",alt:""})],-1);function V(D,A){const a=m("ExternalLinkIcon");return s(),d("div",null,[o,e("p",null,[i("> 这是第 41 篇不掺水的原创，想获取更多原创好文，请扫 👆上方二维码关注我们吧~"),c,i(" > 本文首发于政采云前端团队博客："),e("a",r,[i("关于 vertical-align 你应该知道的一切"),l(a)])]),v,g,e("p",null,[i("vertical-align，写过 CSS 的朋友们肯定都知道这个属性的作用，顾名思义，垂直对齐，主要目的用于将相邻的文本与元素对齐。"),e("a",u,[i("MDN"),l(a)]),i(" 中对它的定义如下：")]),b,e("ul",null,[e("li",null,[e("p",null,[i("基线：书写英语字母时，字母 X 底部所在的位置，可以了解下 "),e("a",h,[i("字母’x’在CSS世界中的角色和故事"),l(a)])])]),x,e("li",null,[e("p",null,[i("内联盒子，更深入的理解可以参考 "),e("a",f,[i("CSS盒子模型"),l(a)])]),_]),j]),y,e("p",null,[e("a",q,[i("CSS深入理解vertical-align和line-height的基友关系"),l(a)])]),e("p",null,[e("a",k,[i("再次认识 vertical-align"),l(a)])]),e("p",null,[e("a",w,[i("vertical-align属性与垂直居中"),l(a)])]),e("p",null,[e("a",S,[i("深入理解css之vertical-align"),l(a)])]),z,e("p",null,[e("a",C,[i("前端工程实践之可视化搭建系统（一）"),l(a)])]),e("p",null,[e("a",E,[i("可能是最全的 “文本溢出截断省略” 方案合集"),l(a)])]),e("p",null,[e("a",I,[i("图文并茂，为你揭开“单点登录“的神秘面纱"),l(a)])]),X,B,N,T])}const M=t(p,[["render",V],["__file","关于 vertical-align 你应该知道的一切.html.vue"]]);export{M as default};
