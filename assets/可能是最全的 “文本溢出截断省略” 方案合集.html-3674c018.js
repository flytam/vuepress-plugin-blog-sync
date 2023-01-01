import{_ as t,z as s,A as d,Y as e,C as i,U as a,a6 as l,Q as r}from"./framework-cb9358d9.js";const o={},p=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/22/17239e3edd804567~tplv-t2oaga2asx-image.image",alt:""})],-1),m=e("h2",{id:"",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#","aria-hidden":"true"},"#"),i(" **")],-1),v=e("p",null,'<table><tbody><tr><td bgcolor="#FDFFE7"><font size="4">原创不易，希望能关注下我们，再顺手点个赞~~<font></font></font></td></tr></tbody></table> **',-1),c={href:"https://www.zoo.team/article/text-overflow",target:"_blank",rel:"noopener noreferrer"},u=l(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/9/16e50853a4306507~tplv-t2oaga2asx-image.image" alt="亚格.png"></p><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>在我们的日常开发工作中，文本溢出截断省略是很常见的一种需考虑的业务场景细节。看上去 “稀松平常” ，但在实现上却有不同的区分，是单行截断还是多行截断？多行的截断判断是基于行数还是基于高度？这些问题之下，都有哪些实现方案？他们之间的差异性和场景适应性又是如何？凡事就怕较真，较真必有成长。本文试图通过编码实践，给出一些答案。</p><h2 id="先来点基础的-单行文本溢出省略" tabindex="-1"><a class="header-anchor" href="#先来点基础的-单行文本溢出省略" aria-hidden="true">#</a> 先来点基础的，单行文本溢出省略</h2><p><strong>核心 CSS 语句</strong></p><ul><li>overflow: hidden；（文字长度超出限定宽度，则隐藏超出的内容）</li><li>white-space: nowrap；（设置文字在一行显示，不能换行）</li><li>text-overflow: ellipsis；（规定当文本溢出时，显示省略符号来代表被修剪的文本）</li></ul><p><strong>优点</strong></p><ul><li>无兼容问题</li><li>响应式截断</li><li>文本溢出范围才显示省略号，否则不显示省略号</li><li>省略号位置显示刚好</li></ul><p><strong>短板</strong></p><ul><li>只支持单行文本截断</li></ul><p><strong>适用场景</strong></p><ul><li>适用于单行文本溢出显示省略号的情况</li></ul><p><strong>Demo</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;style&amp;gt;
    .demo {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
&amp;lt;/style&amp;gt;
&amp;lt;body&amp;gt;
	&amp;lt;div class=&amp;quot;demo&amp;quot;&amp;gt;这是一段很长的文本&amp;lt;/div&amp;gt;
&amp;lt;/body&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例图片</strong></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/5/16e3b4c405615623~tplv-t2oaga2asx-image.image" alt="avatar"></p><h2 id="进阶一下-多行文本溢出省略-按行数" tabindex="-1"><a class="header-anchor" href="#进阶一下-多行文本溢出省略-按行数" aria-hidden="true">#</a> 进阶一下，多行文本溢出省略（按行数）</h2><h3 id="○-纯-css-实现方案" tabindex="-1"><a class="header-anchor" href="#○-纯-css-实现方案" aria-hidden="true">#</a> ○ 纯 CSS 实现方案</h3><p><strong>核心 CSS 语句</strong></p><ul><li>-webkit-line-clamp: 2；（用来限制在一个块元素显示的文本的行数, 2 表示最多显示 2 行。 为了实现该效果，它需要组合其他的WebKit属性）</li><li>display: -webkit-box；（和 1 结合使用，将对象作为弹性伸缩盒子模型显示 ）</li><li>-webkit-box-orient: vertical；（和 1 结合使用 ，设置或检索伸缩盒对象的子元素的排列方式 ）</li><li>overflow: hidden；（文本溢出限定的宽度就隐藏内容）</li><li>text-overflow: ellipsis；（多行文本的情况下，用省略号“…”隐藏溢出范围的文本)</li></ul><p><strong>优点</strong></p><ul><li>响应式截断</li><li>文本溢出范围才显示省略号，否则不显示省略号</li><li>省略号显示位置刚好</li></ul><p><strong>短板</strong></p><ul><li>兼容性一般： -webkit-line-clamp 属性只有 WebKit 内核的浏览器才支持</li></ul><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/5/16e3b4c406bdaa3a~tplv-t2oaga2asx-image.image" alt="avatar"></p><p><strong>适用场景</strong></p><ul><li>多适用于移动端页面，因为移动设备浏览器更多是基于 WebKit 内核</li></ul><p><strong>Demo</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;style&amp;gt;
	.demo {
		  display: -webkit-box;
	    overflow: hidden;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	}
&amp;lt;/style&amp;gt;

&amp;lt;body&amp;gt;
	&amp;lt;div class=&amp;#39;demo&amp;#39;&amp;gt;这是一段很长的文本&amp;lt;/div&amp;gt;
&amp;lt;/body&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例图片</strong></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/5/16e3b4c40876a945~tplv-t2oaga2asx-image.image" alt="avatar"></p><h3 id="○-基于-javascript-的实现方案" tabindex="-1"><a class="header-anchor" href="#○-基于-javascript-的实现方案" aria-hidden="true">#</a> ○ 基于 JavaScript 的实现方案</h3><p><strong>优点</strong></p><ul><li>无兼容问题</li><li>响应式截断</li><li>文本溢出范围才显示省略号，否则不显示省略号</li></ul><p><strong>短板</strong></p><ul><li>需要 JS 实现，背离展示和行为相分离原则</li><li>文本为中英文混合时，省略号显示位置略有偏差</li></ul><p><strong>适用场景</strong></p><ul><li>适用于响应式截断，多行文本溢出省略的情况</li></ul><p><strong>Demo</strong></p><p>当前仅适用于文本为中文，若文本中有英文，可自行修改</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;script type=&amp;quot;text/javascript&amp;quot;&amp;gt;
    const text = &amp;#39;这是一段很长的文本&amp;#39;;
    const totalTextLen = text.length;
    const formatStr = () =&amp;gt; {
        const ele = document.getElementsByClassName(&amp;#39;demo&amp;#39;)[0];
        const lineNum = 2;
        const baseWidth = window.getComputedStyle(ele).width;
        const baseFontSize = window.getComputedStyle(ele).fontSize;
        const lineWidth = +baseWidth.slice(0, -2);

        // 所计算的strNum为元素内部一行可容纳的字数(不区分中英文)
        const strNum = Math.floor(lineWidth / +baseFontSize.slice(0, -2));

        let content = &amp;#39;&amp;#39;;
        
      	// 多行可容纳总字数
        const totalStrNum = Math.floor(strNum * lineNum);

        const lastIndex = totalStrNum - totalTextLen;

        if (totalTextLen &amp;gt; totalStrNum) {
            content = text.slice(0, lastIndex - 3).concat(&amp;#39;...&amp;#39;);
        } else {
            content = text;
        }
        ele.innerHTML = content;
    }
    
    formatStr();
    
		window.onresize = () =&amp;gt; {
        formatStr();
    };
&amp;lt;/script&amp;gt;

&amp;lt;body&amp;gt;
	&amp;lt;div class=&amp;#39;demo&amp;#39;&amp;gt;&amp;lt;/div&amp;gt;
&amp;lt;/body&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例图片</strong></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/5/16e3b4c4099041ae~tplv-t2oaga2asx-image.image" alt="avatar"></p><h2 id="再进阶一步-多行文本溢出省略-按高度" tabindex="-1"><a class="header-anchor" href="#再进阶一步-多行文本溢出省略-按高度" aria-hidden="true">#</a> 再进阶一步，多行文本溢出省略（按高度）</h2><h3 id="○-多行文本溢出不显示省略号" tabindex="-1"><a class="header-anchor" href="#○-多行文本溢出不显示省略号" aria-hidden="true">#</a> ○ 多行文本溢出不显示省略号</h3><p><strong>核心 CSS 语句</strong></p><ul><li>overflow: hidden；（文本溢出限定的宽度就隐藏内容）</li><li>line-height: 20px；（结合元素高度，高度固定的情况下，设定行高， 控制显示行数）</li><li>max-height: 40px；（设定当前元素最大高度）</li></ul><p><strong>优点</strong></p><ul><li>无兼容问题</li><li>响应式截断</li></ul><p><strong>短板</strong></p><ul><li>单纯截断文字, 不展示省略号，观感上较为生硬</li></ul><p><strong>适用场景</strong></p><ul><li>适用于文本溢出不需要显示省略号的情况</li></ul><p><strong>Demo</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;style&amp;gt;
	.demo {
		overflow: hidden;
		max-height: 40px;
		line-height: 20px;
	}
&amp;lt;/style&amp;gt;

&amp;lt;body&amp;gt;
	&amp;lt;div class=&amp;#39;demo&amp;#39;&amp;gt;这是一段很长的文本&amp;lt;/div&amp;gt;
&amp;lt;/body&amp;gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例图片</strong></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/5/16e3b4c4096f17c9~tplv-t2oaga2asx-image.image" alt="avatar"></p><h3 id="○-伪元素-定位实现多行省略" tabindex="-1"><a class="header-anchor" href="#○-伪元素-定位实现多行省略" aria-hidden="true">#</a> ○ 伪元素 + 定位实现多行省略</h3><p><strong>核心 CSS 语句</strong></p><ul><li><p>position: relative; （为伪元素绝对定位）</p></li><li><p>overflow: hidden; （文本溢出限定的宽度就隐藏内容）</p></li><li><p>position: absolute;（给省略号绝对定位）</p></li><li><p>line-height: 20px; （结合元素高度,高度固定的情况下,设定行高, 控制显示行数）</p></li><li><p>height: 40px; （设定当前元素高度）</p></li><li><p>::after {} （设置省略号样式）</p></li></ul><p><strong>优点</strong></p><ul><li><p>无兼容问题</p></li><li><p>响应式截断</p></li></ul><p><strong>短板</strong></p><ul><li><p>无法识别文字的长短，无论文本是否溢出范围, 一直显示省略号</p></li><li><p>省略号显示可能不会刚刚好，有时会遮住一半文字</p></li></ul><p><strong>适用场景</strong></p><ul><li>适用于对省略效果要求较低，文本一定会溢出元素的情况</li></ul><p><strong>Demo</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;style&amp;gt;
    .demo {
        position: relative;
        line-height: 20px;
        height: 40px;
        overflow: hidden;
    }
    .demo::after {
        content: &amp;quot;...&amp;quot;;
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0 20px 0 10px;
    }
&amp;lt;/style&amp;gt;

&amp;lt;body&amp;gt;
	&amp;lt;div class=&amp;#39;demo&amp;#39;&amp;gt;这是一段很长的文本&amp;lt;/div&amp;gt;
&amp;lt;/body&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例图片</strong></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/5/16e3b4c40d1eefac~tplv-t2oaga2asx-image.image" alt="avatar"></p><h3 id="○-利用-float-特性-纯-css-实现多行省略" tabindex="-1"><a class="header-anchor" href="#○-利用-float-特性-纯-css-实现多行省略" aria-hidden="true">#</a> ○ 利用 Float 特性，纯 CSS 实现多行省略</h3><p><strong>核心 CSS 语句</strong></p><ul><li><p>line-height: 20px；（结合元素高度,高度固定的情况下,设定行高, 控制显示行数）</p></li><li><p>overflow: hidden；（文本溢出限定的宽度就隐藏内容）</p></li><li><p>float: right/left；（利用元素浮动的特性实现）</p></li><li><p>position: relative；（根据自身位置移动省略号位置, 实现文本溢出显示省略号效果）</p></li><li><p>word-break: break-all；（使一个单词能够在换行时进行拆分）</p></li></ul><p><strong>优点</strong></p><ul><li><p>无兼容问题</p></li><li><p>响应式截断</p></li><li><p>文本溢出范围才显示省略号，否则不显示省略号</p></li></ul><p><strong>短板</strong></p><ul><li>省略号显示可能不会刚刚好，有时会遮住一半文字</li></ul><p><strong>适用场景</strong></p><ul><li>适用于对省略效果要求较低，多行文本响应式截断的情况</li></ul><p><strong>Demo</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;style&amp;gt;
    .demo {
        background: #099;
        max-height: 40px;
        line-height: 20px;
        overflow: hidden;
    }
    .demo::before{
        float: left;
        content:&amp;#39;&amp;#39;;
        width: 20px;
        height: 40px;
    }

    .demo .text {
        float: right;
        width: 100%;
        margin-left: -20px;
        word-break: break-all;
    }
    .demo::after{
        float:right;
        content:&amp;#39;...&amp;#39;;
        width: 20px;
        height: 20px;
        position: relative;
        left:100%;
        transform: translate(-100%,-100%);
    }
&amp;lt;/style&amp;gt;

&amp;lt;body&amp;gt;
    &amp;lt;div class=&amp;#39;demo&amp;#39;&amp;gt;
    	&amp;lt;div class=&amp;quot;text&amp;quot;&amp;gt;这是一段很长的文本&amp;lt;/div&amp;gt;
    &amp;lt;/div&amp;gt;
&amp;lt;/body&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例图片</strong></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/5/16e3b4c4375581cb~tplv-t2oaga2asx-image.image" alt="avatar"></p><p><strong>原理讲解</strong></p><p>有 A、B、C 三个盒子，A 左浮动，B、C 右浮动。设置 A 盒子的高度与 B 盒子高度（或最大高度）要保持一致</p><ol><li><p>当的 B 盒子高度低于 A 盒子，C 盒子仍会处于 B 盒子右下方。</p></li><li><p>如果 B 盒子文本过多，高度超过了 A 盒子，则 C 盒子不会停留在右下方，而是掉到了 A 盒子下。</p></li><li><p>接下来对 C 盒子进行相对定位，将 C 盒子位置向右侧移动 100%，并向左上方向拉回一个 C 盒子的宽高（不然会看不到哟）。这样在文本未溢出时不会看到 C 盒子，在文本溢出时，显示 C 盒子。</p></li></ol><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/5/16e3b4c444cf3295~tplv-t2oaga2asx-image.image" alt="yuanli.gif"></p><h2 id="收-大道归简-能力封装" tabindex="-1"><a class="header-anchor" href="#收-大道归简-能力封装" aria-hidden="true">#</a> 收，大道归简，能力封装</h2><p>&gt; 凡重复的，让它单一；凡复杂的，让它简单。</p><p>每次都要搞一坨代码，太麻烦。这时候你需要考虑将文本截断的能力，封装成一个可随时调用的自定义容器组件。市面上很多 UI 组件库，都提供了同类组件的封装，如基于 Vue 的 ViewUI Pro，或面向小程序提供组件化解决能力的 MinUI 。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/5/16e3b4c44af83125~tplv-t2oaga2asx-image.image" alt=""></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/5/16e3b4c44857bc88~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h2><p>本文介绍了几种目前常见的文本截断省略的方案，各有利弊，各位同学可根据实际开发情况及需求选择方案。如果你还知道更好其他实现方案，欢迎在评论区留下宝贵评论。</p><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,95),g={href:"https://github.com/happylindz/blog/issues/12",target:"_blank",rel:"noopener noreferrer"},b={href:"https://blog.csdn.net/qq_40072782/article/details/82908581",target:"_blank",rel:"noopener noreferrer"},h={href:"https://baijiahao.baidu.com/s?id=1621362934713048315&wfr=spider&for=pc",target:"_blank",rel:"noopener noreferrer"},x=l('<h2 id="招贤纳士" tabindex="-1"><a class="header-anchor" href="#招贤纳士" aria-hidden="true">#</a> 招贤纳士</h2><p>政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。</p><p>如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 <code>ZooTeam@cai-inc.com</code></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>',5),f={href:"https://juejin.cn/post/6844903976068972552",target:"_blank",rel:"noopener noreferrer"},_={href:"https://juejin.cn/post/6844903950508883982",target:"_blank",rel:"noopener noreferrer"},y={href:"https://juejin.cn/post/6844903933580673032",target:"_blank",rel:"noopener noreferrer"};function w(j,S){const n=r("ExternalLinkIcon");return s(),d("div",null,[p,m,v,e("p",null,[i("> 本文首发于政采云前端团队博客： "),e("a",c,[i("可能是最全的 “文本溢出截断省略” 方案合集"),a(n)])]),u,e("ul",null,[e("li",null,[e("a",g,[i("纯 CSS 实现多行文字截断"),a(n)])]),e("li",null,[e("a",b,[i("【 CSS / JS 】限制一行和多行文字数量，溢出部分用省略号显示"),a(n)])]),e("li",null,[e("a",h,[i("HTML技巧篇：如何让单行文本以及多行文本溢出显示省略号(…)"),a(n)])])]),x,e("p",null,[e("a",f,[i("1024 巨献！！一文看尽前端过去一年的精华沉淀（700 篇好文大汇总）"),a(n)])]),e("p",null,[e("a",_,[i("前端工程实践之可视化搭建系统（一）"),a(n)])]),e("p",null,[e("a",y,[i("自动化 Web 性能优化分析方案"),a(n)])])])}const C=t(o,[["render",w],["__file","可能是最全的 “文本溢出截断省略” 方案合集.html.vue"]]);export{C as default};
