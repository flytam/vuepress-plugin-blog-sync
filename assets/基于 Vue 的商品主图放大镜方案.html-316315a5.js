import{_ as a,z as l,A as d,Y as i,C as e,U as s,a6 as t,Q as m}from"./framework-cb9358d9.js";const v={},r=i("h2",{id:"",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#","aria-hidden":"true"},"#"),e(" **")],-1),c=i("p",null,'<table><tbody><tr><td bgcolor="#FDFFE7"><font size="4">原创不易，希望能关注下我们，再顺手点个赞~~<font></font></font></td></tr></tbody></table> **',-1),u={href:"https://www.zoo.team/article/vue-item-magnifier",target:"_blank",rel:"noopener noreferrer"},o=t(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/9/16e509cd194f22bc~tplv-t2oaga2asx-image.image" alt="一玲.png"></p><h4 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h4><p>在做电商类应用时，难免会遇到商品主图实现放大镜效果的场景，现有的基于<code>Vue</code>的第三方包不多并且无法直接复用，今天，我来分享一种高稳定性的基于 <code>Vue</code> 的图片放大镜方法。</p><h4 id="实现原理" tabindex="-1"><a class="header-anchor" href="#实现原理" aria-hidden="true">#</a> 实现原理</h4><p>放大镜的原理用一句话概括，就是根据小图上的鼠标位置去定位大图。</p><p>&gt; 图1 原理图（以2倍放大为例）</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/18/16d44a04c7adef5c~tplv-t2oaga2asx-image.image" alt="image-20190915202151028"></p><p>相信原理图已经画的很明白了， 图中，左侧框是小图框，其蓝色区域为图片遮罩层（需放大区域），右侧框是整个大图目前所在区域，其蓝色区域是放大区域，设置超出隐藏，就实现了放大遮罩区域的效果。</p><p>显然，两块蓝色区域存在着某种对应关系，即遮罩的左上角位置（相对于小图，以下称 X 坐标）和放大区域（相对于大图）的左上角位置是成比例的，即放大倍数。计算出 X 坐标后，适当调整背景图的位置，使大图向反方向移动 scale 倍的 X 坐标即可。</p><p>X 坐标为（maskX，maskY），以计算 maskX 为例：</p><p>鼠标移动中会产生 e.clientX ，标识鼠标与浏览器左侧的距离，小图与浏览器左侧的距离是 left ，由于遮罩始终是一个以鼠标为中心的正方形，所以：</p><p>maskX = e.clientX - left - mask/2</p><p>同理，</p><p>maskY = e.clientY - top - mask/2</p><p>大图的对应样式设置为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  left: - maskX * scale + &amp;#39;px&amp;#39;;
  top: - maskY * scale + &amp;#39;px&amp;#39;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="效果演示" tabindex="-1"><a class="header-anchor" href="#效果演示" aria-hidden="true">#</a> 效果演示</h4><p>&gt; 图2 长图展示</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/18/16d44a04c77b2375~tplv-t2oaga2asx-image.image" alt="大"></p><p>&gt; 图3 宽图展示</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/18/16d44f4e061df529~tplv-t2oaga2asx-image.image" alt=""></p><p>&gt; 图4 两倍放大效果图</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/18/16d44a04c7b425d9~tplv-t2oaga2asx-image.image" alt="大"></p><p>&gt; 图5 四倍放大效果图</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/18/16d44a04c9de5859~tplv-t2oaga2asx-image.image" alt="小"></p><h4 id="核心代码" tabindex="-1"><a class="header-anchor" href="#核心代码" aria-hidden="true">#</a> 核心代码</h4><h5 id="html" tabindex="-1"><a class="header-anchor" href="#html" aria-hidden="true">#</a> HTML</h5><p>一般放大镜实现的是 1:1 等宽等高的正方形图片，这里兼容了其他比例的图片，设置图片为垂直居中对齐，包括小图，大图。如果小图不够充满整个小图框，余留下的空白部分也可以有放大效果，只不过放大结果依然是空白。 这样只需计算背景图的移动距离，不用过多的关注图片定位问题。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;template&amp;gt;
 &amp;lt;div class=&amp;quot;magnifier&amp;quot;&amp;gt;
    &amp;lt;!-- 小图 --&amp;gt;
    &amp;lt;div class=&amp;quot;small-box&amp;quot; @mouseover=&amp;quot;handOver&amp;quot;  @mousemove=&amp;quot;handMove&amp;quot; @mouseout=&amp;quot;handOut&amp;quot;&amp;gt;
      &amp;lt;img class=&amp;quot;smallPic&amp;quot; :src=&amp;quot;\`\${src}?x-oss-process=image/resize,l_836\`&amp;quot; /&amp;gt;
      &amp;lt;div class=&amp;quot;magnifier-zoom&amp;quot; 
        v-show=&amp;quot;showMask&amp;quot;
        :style=&amp;quot;{
          background: configs.maskColor,
          height: configs.maskWidth + &amp;#39;px&amp;#39;,
          width: configs.maskHeight + &amp;#39;px&amp;#39;, 
          opacity: configs.maskOpacity, 
          transform: transformMask
        }&amp;quot;
      &amp;gt;&amp;lt;/div&amp;gt;
    &amp;lt;/div&amp;gt;
    &amp;lt;!-- 大图, 注意误差 --&amp;gt;
    &amp;lt;div class=&amp;quot;magnifier-layer&amp;quot; 
      v-show=&amp;quot;showMagnifier&amp;quot;
      :style=&amp;quot;{ 
        width: configs.width + &amp;#39;px&amp;#39;, 
        height: configs.height + &amp;#39;px&amp;#39;, 
        left: configs.width + 20 + &amp;#39;px&amp;#39; 
      }&amp;quot;
    &amp;gt;
      &amp;lt;div class=&amp;quot;big-box&amp;quot;
        :style=&amp;quot;{ 
          width: bigWidth + &amp;#39;px&amp;#39;,
          height: bigHeight + &amp;#39;px&amp;#39;,
          left: moveLeft,
          top: moveTop
        }&amp;quot;
      &amp;gt;
        &amp;lt;div class=&amp;quot;big-box-img&amp;quot;
          :style=&amp;quot;{ 
            width: bigWidth - 2  + &amp;#39;px&amp;#39;, 
            height: bigHeight - 2 + &amp;#39;px&amp;#39; 
          }&amp;quot;
        &amp;gt;
          &amp;lt;img
            :src=&amp;quot;bigSrc&amp;quot;
            :style=&amp;quot;{ 
              maxWidth: bigWidth - 2 + &amp;#39;px&amp;#39;, 
              maxHeight: bigHeight -2 + &amp;#39;px&amp;#39; 
            }&amp;quot;
          /&amp;gt;
        &amp;lt;/div&amp;gt;
      &amp;lt;/div&amp;gt;
    &amp;lt;/div&amp;gt;
  &amp;lt;/div&amp;gt;
&amp;lt;/template&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="js" tabindex="-1"><a class="header-anchor" href="#js" aria-hidden="true">#</a> JS</h5><p>这里主要有三个事件函数。</p><ul><li>handOver：鼠标进入到小图框上的事件，此时显示遮罩和放大区域，并计算小图框的位置信息。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>handOver() {
  // 计算小图框在浏览器中的位置
  this.imgObj = this.$el.getElementsByClassName(&amp;#39;small-box&amp;#39;)[0];
  this.imgRectNow = this.imgObj.getBoundingClientRect();
  this.showMagnifier = true;
  this.showMask = true;
}
  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>handMove：鼠标在小图上的移动事件，此事件发生在 handOver 之后，计算数据，移动遮罩以及背景图；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>handMove(e) {
  // 计算初始的遮罩左上角的坐标
  let objX = e.clientX - this.imgRectNow.left;
  let objY = e.clientY - this.imgRectNow.top;

  // 计算初始的遮罩左上角的坐标
  let maskX = objX - this.configs.maskWidth / 2;
  let maskY = objY - this.configs.maskHeight / 2;

  // 判断是否超出界限,并纠正
  maskY = maskY &amp;lt; 0 ? 0 : maskY; 
  maskX = maskX &amp;lt; 0 ? 0 : maskX; 
  if(maskY + this.configs.maskHeight &amp;gt;= this.imgRectNow.height) {
    maskY = this.imgRectNow.height - this.configs.maskHeight;
  }
  if(maskX + this.configs.maskWidth &amp;gt;= this.imgRectNow.width) {
    maskX = this.imgRectNow.width - this.configs.maskWidth;
  }

  // 遮罩移动
  this.transformMask = \`translate(\${maskX}px, \${maskY}px)\`;

  // 背景图移动
  this.moveLeft = - maskX * this.configs.scale + &amp;quot;px&amp;quot;;
  this.moveTop = - maskY * this.configs.scale + &amp;quot;px&amp;quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>handOut：鼠标离开小图事件，此时无放大镜效果，隐藏遮罩和放大区域。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>handOut() {
  this.showMagnifier = false;
  this.showMask = false;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上三个事件基本上就实现了图片的放大镜功能。</p><p>但仔细看，你会发现每次移入小图框都会触发一次 handOver 事件，并且计算一次小图框 DOM （imgObj） 。</p><p>为了优化此问题，可以用 init 标识是否是页面加载后首次触发 handOver 事件，如果是初始化就计算imgObj 信息，否则不计算。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>handOver() {
  if (!this.init) {
    this.init = true;
    // 原 handOver 事件
    ...
  } 
  this.showMagnifier = true;
  this.showMask = true;
},
  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在测试的过程中，发现页面滚动后，会出现遮罩定位错误的情况，原来是因为初始化时，我们固定死了小图框的位置信息（存放在 this.imgRectNow ），导致 handMove 事件中的移动数据计算错误。</p><p>解决这个问题有两种方案：</p><ul><li>监听 scroll 事件，更新 this.imgRectNow；</li><li>在 handMove 事件中更新 this.imgRectNow。</li></ul><p>这里选择了第二种。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>handMove(e) {
  // 动态获取小图的位置（或者监听 scroll ）
  let imgRectNow = this.imgObj.getBoundingClientRect();
  let objX = e.clientX - imgRectNow.left;
  let objY = e.clientY - imgRectNow.top;
  // 原 handMove 事件剩余内容
  ...
},
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>综合以上，我们已经实现了一个完美的图片放大镜功能。最终的 js 如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>data() {
  return {
    imgObj: {},
    moveLeft: 0,
    moveTop: 0,
    transformMask:\`translate(0px, 0px)\`,
    showMagnifier:false,
    showMask:false,
    init: false,
  };
},
computed: {
  bigWidth(){
    return this.configs.scale * this.configs.width;
  },
  bigHeight(){
    return this.configs.scale * this.configs.height;
  }
},
methods: {
  handMove(e) {
    // 动态获取小图的位置（或者监听 scroll ）
    let imgRectNow = this.imgObj.getBoundingClientRect();
    let objX = e.clientX - imgRectNow.left;
    let objY = e.clientY - imgRectNow.top;

    // 计算初始的遮罩左上角的坐标
    let maskX = objX - this.configs.maskWidth / 2;
    let maskY = objY - this.configs.maskHeight / 2;

    // 判断是否超出界限,并纠正
    maskY = maskY &amp;lt; 0 ? 0 : maskY; 
    maskX = maskX &amp;lt; 0 ? 0 : maskX; 
    if(maskY + this.configs.maskHeight &amp;gt;= imgRectNow.height) {
      maskY = imgRectNow.height - this.configs.maskHeight;
    }
    if(maskX + this.configs.maskWidth &amp;gt;= imgRectNow.width) {
      maskX = imgRectNow.width - this.configs.maskWidth;
    }

    // 遮罩移动
    this.transformMask = \`translate(\${maskX}px, \${maskY}px)\`;

    // 背景图移动
    this.moveLeft = - maskX * this.configs.scale + &amp;quot;px&amp;quot;;
    this.moveTop = - maskY * this.configs.scale + &amp;quot;px&amp;quot;;
  },
  handOut() {
    this.showMagnifier = false;
    this.showMask = false;
  },
  handOver() {
    if (!this.init) {
      this.init = true;
      this.imgObj = this.$el.getElementsByClassName(&amp;#39;small-box&amp;#39;)[0];
    }
    this.showMagnifier = true;
    this.showMask = true;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法" aria-hidden="true">#</a> 使用方法</h4><p>本示例中的固定参数：小图框：420 * 420 。</p><p>程序可接受参数：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 小图地址
src: {
  type: String,
},
// 大图地址
bigSrc: {
  type: String,
},
// 配置项
configs: {
  type: Object,
    default() {
    return {
      width:420,//放大区域
      height:420,//放大区域
      maskWidth:210,//遮罩
      maskHeight:210,//遮罩
      maskColor:&amp;#39;rgba(25,122,255,0.5)&amp;#39;,//遮罩样式
      maskOpacity:0.6,
      scale:2,//放大比例
    };
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>文中图 2 是一张长图，小图的最大边不超过 836px（二倍图） ，大图为了视觉效果，分辨率尽量高点，程序会根据配置项自动设置对应的 height , width ，长图与宽图的效果对比可参考图3。</p><p>配置项可根据应用场景自行设置，本文示例的配置项是 2 倍放大，效果可参考图 4，四倍放大效果可参考图 5。</p><h4 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h4><p>其实图片放大镜的实现思路没有那么复杂，核心点有两点：</p><ul><li>小图、大图的定位，遮罩和放大区域的创建方法</li><li>放大镜的原理理解，并用代码实现 DOM 的移动等。</li></ul><p>本文顺着这个思路，做了一个简单的实现，还有一些优化的空间，欢迎各位大佬在评论区讨论。虽然代码看起来不是非常优雅，但是足够明了，感兴趣的同学可以自己尝试一下。</p><h2 id="招贤纳士" tabindex="-1"><a class="header-anchor" href="#招贤纳士" aria-hidden="true">#</a> 招贤纳士</h2><p>招人，前端，隶属政采云前端大团队（ZooTeam），50 余个小伙伴正等你加入一起浪。如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“5年工作时间3年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手参与一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 <strong><code>ZooTeam@cai-inc.com</code></strong></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/29/16cddbe09f60b388~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,62),p={href:"https://juejin.cn/post/6844903925716353031",target:"_blank",rel:"noopener noreferrer"},b={href:"https://juejin.cn/post/6844903933580673032",target:"_blank",rel:"noopener noreferrer"},h={href:"https://juejin.cn/post/6844903927448616968",target:"_blank",rel:"noopener noreferrer"};function g(f,x){const n=m("ExternalLinkIcon");return l(),d("div",null,[r,c,i("p",null,[e("> 本文首发于政采云前端团队博客： "),i("a",u,[e("基于 Vue 的商品主图放大镜方案"),s(n)])]),o,i("p",null,[i("a",p,[e("Vue 组件数据通信方案总结"),s(n)])]),i("p",null,[i("a",b,[e("自动化 Web 性能优化分析方案"),s(n)])]),i("p",null,[i("a",h,[e("CSS 层叠上下文（Stacking Context）"),s(n)])])])}const w=a(v,[["render",g],["__file","基于 Vue 的商品主图放大镜方案.html.vue"]]);export{w as default};
