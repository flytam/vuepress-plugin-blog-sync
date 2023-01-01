import{_ as l,z as a,A as d,Y as e,C as i,U as s,a6 as t,Q as m}from"./framework-cb9358d9.js";const o={},v=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8d2b0103c1fa~tplv-t2oaga2asx-image.image",alt:""})],-1),c=e("h2",{id:"",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#","aria-hidden":"true"},"#"),i(" **")],-1),u=e("p",null,'<table><tbody><tr><td bgcolor="#FDFFE7"><font size="4">原创不易，希望能关注下我们，再顺手点个赞~~<font></font></font></td></tr></tbody></table> **',-1),r={href:"https://www.zoo.team/article/scaling",target:"_blank",rel:"noopener noreferrer"},p=t(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/24/16e9d98cd77ac970~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>最近团队需要做一个智能客服悬浮窗功能，需要支持拖动、放大缩小等功能，因为这个是全局插件，为了兼容性考虑全部使用原生 JS 实现，不引用任何第三方库或者插件。开发过程中遇到的一些问题及解决方法，在这里和大家分享交流一下。</p><p>&gt; 注：下文出现的“采宝”二字，为这个功能的产品名。</p><h2 id="先看效果" tabindex="-1"><a class="header-anchor" href="#先看效果" aria-hidden="true">#</a> 先看效果</h2><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/24/16e9d41cfacb1a54~tplv-t2oaga2asx-image.image" alt="实现效果"></p><p>看这个效果，相信大部分开发都会觉得实现起来比较容易。在实际开发中，笔者总结了三个主要的坑点，及其解决方案。</p><h3 id="三个坑点" tabindex="-1"><a class="header-anchor" href="#三个坑点" aria-hidden="true">#</a> 三个坑点</h3><ul><li>拖拽采宝时会导致采宝放大缩小</li><li>采宝显示在屏幕边界时被遮挡显示不全</li><li>采宝放大和缩小后，位置发生变化</li></ul><h3 id="一-拖拽时会导致采宝放大缩小" tabindex="-1"><a class="header-anchor" href="#一-拖拽时会导致采宝放大缩小" aria-hidden="true">#</a> （一）拖拽时会导致采宝放大缩小</h3><p>我们在操作采宝时，不管是鼠标拖动还是点击放大缩小，我们的事件都需要绑定在采宝头部的图标上，这样我们就需要在图标上同时绑定点击和拖拽事件。但是当我们直接添加 click 事件和 mousedown 事件的时候，我们发现在触发 mousedown 事件的时候，也会去触发 click 事件。这样就会出现在拖动采宝的时候，采宝会放大和缩小。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/24/16e9d41cff999651~tplv-t2oaga2asx-image.image" alt="点击盒子"></p><p>这个效果是我们不想看到的，所以我们就需要区分开采宝上的 click 事件和 mousedown 事件，想办法使两个事件的触发相互不影响。</p><p>所以我们在同一个 DIV 上同时绑定 mousedown 事件和 click 事件，然后通过控制台输出每个事件，查看过程中的每个事件的触发顺序。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const moveBox = document.querySelector(&amp;#39;.move&amp;#39;);
moveBox.onmousedown = function (evt) {
	console.log(&amp;#39;触发鼠标按下&amp;#39;)

  moveBox.onmousemove = function (evt) {
    console.log(&amp;#39;触发鼠标拖动&amp;#39;)
  }
}

function moveBoxClick(e) {
	console.log(&amp;#39;触发click&amp;#39;)
}

moveBox.onmouseup = function () {
	console.log(&amp;#39;触发鼠标抬起&amp;#39;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们得到的结果是：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/10/16db4a36b3e862ed~tplv-t2oaga2asx-image.image" alt="点击盒子"></p><p>通过控制台的输出情况，我们就可以看到鼠标点击后的各个事件触发情况：首先执行的是 mousedown 事件，然后是 mousemove 事件，再然后是 mouseup 事件，最后是 click 事件。</p><p>知道了事件的触发顺序，我们就可以通过设置一个变量 isMove 来区分开鼠标的拖动事件和点击事件，每次鼠标按下的时候我们将 isMove 复原，鼠标移动的时候将 isMove 的状态改变。</p><p>因为每次触发 click 事件的时候也都会去先去触发 mousedown 事件，所以我们在 click 事件里增加一个判断，鼠标移动时，不触发 click 事件。这样就可以把 click 事件和 mousedown 事件区分开来，实现 mousedown 和 click 事件的隔离。</p><p><strong>click 事件增加判断</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function moveBoxClick(e) {
  // 点击采宝
  const target = document.querySelector(&amp;quot;.move&amp;quot;);
  const smallImg = document.querySelector(&amp;quot;.small-img&amp;quot;);
  const magnifyImg = document.querySelector(&amp;quot;.magnify-img&amp;quot;);
  // 点击move盒子
  if (!isMove) {
    if (isBig) {
      smallImg.style.display = &amp;quot;block&amp;quot;;
      magnifyImg.style.display = &amp;quot;none&amp;quot;;
      target.style.width = &amp;quot;32px&amp;quot;;
    } else {
      smallImg.style.display = &amp;quot;none&amp;quot;;
      magnifyImg.style.display = &amp;quot;block&amp;quot;;
      target.style.width = &amp;quot;130px&amp;quot;;
    }
    isBig = !isBig;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>mousedown 事件重置 isMove 和 mousemove 改变 isMove</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>let isMove = false; // 是否是拖动
let isBig = false; // 是否是变大的盒子
let isMove = false; // 判断是否移动采宝
smallImg.onmousedown = magnifyImg.onmousedown = function(evt) {
  isMove = false; // 每次鼠标按下时，重置isMove
  document.onmousemove = function(e) {
    isMove = true; // 每次鼠标移动时，改变isMove
  };
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 isMove 的状态，我们就可以区分开 mousemove 事件和 click 事件，使得我们在拖动采宝的时候，可以不去触发采宝放大缩小。</p><h3 id="二-采宝显示在屏幕边界时被遮挡显示不全" tabindex="-1"><a class="header-anchor" href="#二-采宝显示在屏幕边界时被遮挡显示不全" aria-hidden="true">#</a> （二）采宝显示在屏幕边界时被遮挡显示不全</h3><p>我们在拖动采宝时，判断采宝拖动的当前定位坐标是否超出了当前显示屏的高度和宽度，我们需要限制采宝拖动的最大距离。小采宝在点击放大时，也需要做一下处理，把采宝全部显示出来。</p><p><strong>拖动时</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const moveBox = document.querySelector(&amp;quot;.move&amp;quot;);
const smallImg = document.querySelector(&amp;quot;.move .small-img&amp;quot;);
const magnifyImg = document.querySelector(&amp;quot;.move .magnify-img&amp;quot;);
let isMove = false; // 是否是拖动
let isBig = false; // 是否是变大的盒子

smallImg.onmousedown = magnifyImg.onmousedown = function(evt) {
  // 拖动div盒子
  const clientX = evt.clientX;
  const clientY = evt.clientY;
  const pageX = moveBox.offsetLeft;
  const pageY = moveBox.offsetTop;
  const x = clientX - pageX;
  const y = clientY - pageY;

  document.onmousemove = function(e) {
    // 拖动后采宝的坐标
    let _x = e.clientX - x;
    let _y = e.clientY - y;
    const boxWidth = moveBox.offsetWidth;
    const boxHeight = moveBox.offsetHeight;
    if (_x &amp;lt; 0) {
      _x = 0;
    }
    // X坐标的最大值
    if (_x &amp;gt; window.screen.width - boxWidth) {
      _x = window.screen.width - boxWidth;
    }
    if (_y &amp;lt; 0) {
      _y = 0;
    }
    // Y坐标的最大值
    if (_y &amp;gt; document.documentElement.clientHeight - boxHeight) {
      _y = document.documentElement.clientHeight - boxHeight;
    }
  };
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小采宝在边界放大时</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 点击时，判断采宝是否超出显示屏
function autoPotion () {
  let x = moveBox.offsetLeft;
  let y = moveBox.offsetTop;

  if (x &amp;lt; 0) {
  	x = 0;
  } else if (x &amp;gt; document.documentElement.clientWidth - moveBox.offsetWidth) {
  	x = document.documentElement.clientWidth - moveBox.offsetWidth;
  }

  if (y &amp;lt; 0) {
  	y = 0;
  } else if (y &amp;gt; document.documentElement.clientHeight - moveBox.offsetHeight) {
  	y = document.documentElement.clientHeight - moveBox.offsetHeight;
  }

  moveBox.style.left = x + &amp;quot;px&amp;quot;;
  moveBox.style.top = y + &amp;quot;px&amp;quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果如下</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/24/16e9d41d019a6af4~tplv-t2oaga2asx-image.image" alt="放大缩小"></p><h3 id="三-采宝放大和缩小后-位置发生变化" tabindex="-1"><a class="header-anchor" href="#三-采宝放大和缩小后-位置发生变化" aria-hidden="true">#</a> （三）采宝放大和缩小后，位置发生变化</h3><p>通过上图，我们可以看到，当小采宝处在显示屏边界时，点击放大后再点击缩小，我们发现采宝的位置发生了变化。这个是因为采宝是根据左上角的坐标来定位的，当小采宝移动到右下角时，点击放大以后，采宝左上角的坐标发生了变化，这样就使得采宝在放大缩小时，位置在发生变化。所以，我们在采宝移动完成时需要记录采宝左上角的坐标，在点击时，需要将采宝上次移动完成的坐标重新赋值给采宝，这样就使得采宝在放大缩小时，位置不会发生变化。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/24/16e9d41d02ea8268~tplv-t2oaga2asx-image.image" alt="点击位置变化"></p><p>这样，我们把每次 mouseup 事件的时候记录下采宝的位置，这样我们解决了采宝放大缩小时位置发生变化的问题。</p><h2 id="完整的代码" tabindex="-1"><a class="header-anchor" href="#完整的代码" aria-hidden="true">#</a> 完整的代码</h2><p><strong>HTML：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;div class=&amp;quot;box&amp;quot;&amp;gt;
  &amp;lt;div class=&amp;quot;move&amp;quot;&amp;gt;
    &amp;lt;img
      onclick=&amp;quot;moveBoxClick()&amp;quot;
      class=&amp;quot;small-img&amp;quot;
      draggable=&amp;quot;false&amp;quot;
      src=&amp;quot;https://zcy-cdn.oss-cn-shanghai.aliyuncs.com/f2e-assets/103bbf76-6248-421c-a3d6-28a525c459db.png&amp;quot;
      alt=&amp;quot;&amp;quot;
    /&amp;gt;
    &amp;lt;img
      onclick=&amp;quot;moveBoxClick()&amp;quot;
      class=&amp;quot;magnify-img&amp;quot;
      draggable=&amp;quot;false&amp;quot;
      src=&amp;quot;https://zcy-cdn.oss-cn-shanghai.aliyuncs.com/f2e-assets/90e26f49-9824-4443-b4aa-8aa64a3c8690.png&amp;quot;
      alt=&amp;quot;&amp;quot;
    /&amp;gt;
    &amp;lt;div class=&amp;quot;content&amp;quot;&amp;gt;&amp;lt;/div&amp;gt;
  &amp;lt;/div&amp;gt;
&amp;lt;/div&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>JavaScript</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const moveBox = document.querySelector(&amp;quot;.move&amp;quot;);
const smallImg = document.querySelector(&amp;quot;.move .small-img&amp;quot;);
const magnifyImg = document.querySelector(&amp;quot;.move .magnify-img&amp;quot;);
var initX = 0; // 记录小采宝的x坐标
var initY = 0; // 记录小采宝的y坐标
let isMove = false; // 是否是拖动
let isBig = false; // 是否是变大的盒子
    
smallImg.onmousedown = magnifyImg.onmousedown = function(evt) {
// 拖动div盒子
const clientX = evt.clientX;
const clientY = evt.clientY;
const pageX = moveBox.offsetLeft;
const pageY = moveBox.offsetTop;
const x = clientX - pageX;
const y = clientY - pageY;

isMove = false;

document.onmousemove = function(e) {
    const boxWidth = moveBox.offsetWidth;
    const boxHeight = moveBox.offsetHeight;
    let _x = e.clientX - x;
    let _y = e.clientY - y;
    if (_x &amp;lt; 0) {
        _x = 0;
    }
    if (_x &amp;gt; window.screen.width - boxWidth) {
        _x = window.screen.width - boxWidth;
    }
    if (_y &amp;lt; 0) {
         _y = 0;
    }
    if (_y &amp;gt; document.documentElement.clientHeight - boxHeight) {
        _y = document.documentElement.clientHeight - boxHeight;
    }

    if (isBig) {
        initX = _x;
        initY = _y;
    }

    moveBox.style.left = _x + &amp;quot;px&amp;quot;;
    moveBox.style.top = _y + &amp;quot;px&amp;quot;;

    isMove = true;
    };
};


document.onmouseup = function() {
    if (isMove) {
        initX = moveBox.offsetLeft;
        initY = moveBox.offsetTop;
        }
      document.onmousemove = null;
};

function moveBoxClick(e) {
    const target = document.querySelector(&amp;quot;.move&amp;quot;);
    const smallImg = document.querySelector(&amp;quot;.small-img&amp;quot;);
    const magnifyImg = document.querySelector(&amp;quot;.magnify-img&amp;quot;);
    // 点击move盒子
    if (!isMove) {
        if (isBig) {
          smallImg.style.display = &amp;quot;block&amp;quot;;
          magnifyImg.style.display = &amp;quot;none&amp;quot;;
          target.style.width = &amp;quot;32px&amp;quot;;
          target.style.left = initX + &amp;#39;px&amp;#39;;
          target.style.top = initY + &amp;#39;px&amp;#39;;
        } else {
          smallImg.style.display = &amp;quot;none&amp;quot;;
          magnifyImg.style.display = &amp;quot;block&amp;quot;;
          target.style.width = &amp;quot;130px&amp;quot;;
        }
        isBig = !isBig;

        setTimeout(() =&amp;gt; {
          autoPotion();
        }, 100)
    }
}

// 点击时，判断采宝是否超出显示屏
function autoPotion () {
    let x = moveBox.offsetLeft;
    let y = moveBox.offsetTop;

    if (x &amp;lt; 0) {
        x = 0;
    } else if (x &amp;gt; document.documentElement.clientWidth - moveBox.offsetWidth) {
        x = document.documentElement.clientWidth - moveBox.offsetWidth;
    }

    if (y &amp;lt; 0) {
        y = 0;
    } else if (y &amp;gt; document.documentElement.clientHeight - moveBox.offsetHeight) {
        y = document.documentElement.clientHeight - moveBox.offsetHeight;
    }

    moveBox.style.left = x + &amp;quot;px&amp;quot;;
    moveBox.style.top = y + &amp;quot;px&amp;quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>通过开发一个很小的功能点，引出了很多需要处理的细节问题，提高用户体验。针对这些问题的解决方案，各位看官如果有更好的解决方案，欢迎留言讨论。</p><h2 id="招贤纳士" tabindex="-1"><a class="header-anchor" href="#招贤纳士" aria-hidden="true">#</a> 招贤纳士</h2><p>政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。</p><p>如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 <code>ZooTeam@cai-inc.com</code></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,49),b={href:"https://juejin.cn/post/6844903976068972552",target:"_blank",rel:"noopener noreferrer"},g={href:"https://juejin.cn/post/6844903988081475591",target:"_blank",rel:"noopener noreferrer"},f={href:"https://juejin.cn/post/6844903981819379719",target:"_blank",rel:"noopener noreferrer"};function x(h,y){const n=m("ExternalLinkIcon");return a(),d("div",null,[v,c,u,e("p",null,[i("> 本文首发于政采云前端团队博客： "),e("a",r,[i("纯 JS 实现放大缩小拖拽踩坑之旅"),s(n)])]),p,e("p",null,[e("a",b,[i("1024 巨献！！一文看尽前端过去一年的精华沉淀（700 篇好文大汇总）"),s(n)])]),e("p",null,[e("a",g,[i("可能是最全的 “文本溢出截断省略” 方案合集"),s(n)])]),e("p",null,[e("a",f,[i("乾坤大挪移！React 也能 “用上” computed 属性"),s(n)])])])}const _=l(o,[["render",x],["__file","纯 JS 实现放大缩小拖拽踩坑之旅.html.vue"]]);export{_ as default};
