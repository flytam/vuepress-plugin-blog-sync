import{_ as t,z as d,A as s,Y as e,C as i,U as n,a6 as l,Q as r}from"./framework-cb9358d9.js";const c={},o=e("p",null,[e("img",{src:"https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bfefad3ee3474e3a8a461251aaddceb4~tplv-k3u1fbpfcp-watermark.image?",alt:"政采云技术团队.png"})],-1),u=e("p",null,[e("img",{src:"https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8ba0b56767e416da4d685edf403f8c7~tplv-k3u1fbpfcp-watermark.image?",alt:"三秋.png"})],-1),m={href:"http://zoo.zhengcaiyun.cn/blog/article/git-work",target:"_blank",rel:"noopener noreferrer"},p=l(`<h1 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h1><p>Git 是一个分布式的版本控制系统，这意味着它使用多个本地存储库，包括一个集中式存储库和服务器，它在从前端工作中抽象出底层机制方面做得非常出色。虽然 Git 已经演变成一个成熟的版本控制管理系统，但这并不是作者最初的意图，但并不影响它成为最为世界上最为出色、优雅的工具之一。Git 的好处在于，你可以在整个职业生涯中都不知道 Git 内部是如何工作的，但你依然可以和它相处得很好。但当你了解了 Git 如何管理您的存储库将有助于打开你的思维方式，并让您更深入地了解 Git 。</p><h1 id="git的特性" tabindex="-1"><a class="header-anchor" href="#git的特性" aria-hidden="true">#</a> git的特性</h1><h3 id="区别" tabindex="-1"><a class="header-anchor" href="#区别" aria-hidden="true">#</a> 区别</h3><ul><li>SVN 是集中式版本控制系统，它的版本库是集中放在中央服务器的，而干活的时候，用的都是自己的电脑，只有一台服务器来维护和控制代码，所以首先要从中央服务器那里得到最新的版本，干完活后需要把自己做完的活推送到中央服务器。</li><li>Git 是分布式版本控制系统，它没有中央服务器，每一台主机都当成一台服务器。</li></ul><h3 id="优势" tabindex="-1"><a class="header-anchor" href="#优势" aria-hidden="true">#</a> 优势</h3><ul><li>Git 和其他版本控制系统的主要差别在于，Git 只关心文件数据的整体是否发生变化，而大多数其他系统则关心文件内容的具体差异。</li><li>Git 并不保存这些前后变化的差异数据。实际上，Git 更像是把变化的文件作快照后，记录在一个微型的文件系统中。每次提交更新时，它会纵览一遍所有文件的指纹信息并对文件做快照，然后保存一个指向这次快照的索引。为提高性能，若文件没有变化，Git 不会再次保存，而是直接引用上次保存的快照链接。</li><li>Git 近乎所有操作都是本地执行，它的绝大多数操作都只需要访问本地文件和资源，不用连网。但如果用CVCS （集中式版本控制系统）的话，差不多所有操作都需要连接网络。且因为 Git 在本地磁盘上就保存着所有当前项目的历史更新，所以处理起来速度飞快。</li></ul><h1 id="git实际上是如何工作的" tabindex="-1"><a class="header-anchor" href="#git实际上是如何工作的" aria-hidden="true">#</a> git实际上是如何工作的</h1><p>当我们要去探究 Git 是如何工作的时候我们该从何处下手呢？因为上文说过 Git 近乎所有操作都是本地执行的，在本地的文件中我们能找到他执行的记录，这就需要我们聚焦 本地文件的 Git 文件 —— .git 文件，那么接下来就来看看 Git 的本地文件都有些什么。</p><h2 id="git对象" tabindex="-1"><a class="header-anchor" href="#git对象" aria-hidden="true">#</a> git对象</h2><p>.git 文件作为一个隐藏文件并不经常出现在我们的目录中，现在我们打开一个从代码仓库拉取的项目，打开终端程序并导航到存储库的主目录，再导航到存储库的 <strong>.git</strong> 目录：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd .git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>拉出 <strong>.git</strong> 的目录列表，那么你至少能看到以下几个目录：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>FETCH_HEAD/             
HEAD/
config/
objects/
refs/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现阶段我们需要聚焦的是<code>objects</code>目录，在objects中，我们最常见的对象是以下三种（具体的下文会详细说明这三者）：</p><ul><li><strong><code>Commits</code></strong>: 这将树对象链接在一起以形成历史，保存有关您的提交的元数据的结构，以及指向父提交和下面文件的指针。</li><li><strong><code>Tree</code></strong>: 这相当于一个目录，记录着目录树内容及其中各个文件对应 blob 对象索引。</li><li><strong><code>Blobs</code></strong>: 这是文件的内容，用于表示文件快照内容。</li></ul><h3 id="commits对象" tabindex="-1"><a class="header-anchor" href="#commits对象" aria-hidden="true">#</a> Commits对象</h3><p>直接进入object对象：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd objects
ls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>控制台展示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 每个人的项目都不同，文件自然也不同，此处以笔者的一个项目为例
0c      57      85      b3       
1b      60      94      c4      
2a      67      98      cb      
2c      6c      9a      info      
3c      73      a9      pack      
49      82      af      
52      83      b1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>小朋友你是否有很多问号？在第一眼看到这么多两位字符的文件夹名时完全不知道这些是啥。那么我们就需要转头来解释一下 <strong>Git 的数据存储结构</strong> 了。</p><p>当 Git 存储对象（也就是我们提交的记录）时，它不会将它们全部转储到一个目录中，因为这样会使得目录在不断的迭代提交后变得笨拙，所以它会将它们整齐地构造成一棵树—— <strong>Git 将对象哈希的前 2 个字符用作目录名称，然后将剩余的 38 个字符用作对象标识符</strong>。当我们将以上的二位字符命名的文件夹展开时，我们就会得到这样一个树形结构的目录：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>objects
├── 0c
│   ├── 8867d7e175f46d4bcd66698ac13f4ca00cf592
│   └── c8002da0403724dfaa6792885eaa97faa71bcf
├── 1b
│   └── 716fafdd3aeb3636222a0026d1d4971078db05
├── 2a
│   └── 14f7db6a6748cc98862960ff5d0e9b1d4a2f17
├── 2c
│   ├── 14f7db6a6748cc98862960ff5d0e9b1d4a2f17
├── 3c
│   ├── 121291ffc25ce6792f9350883b77cea2633048
.
.
.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了验证上述 Git 存储对象的结构，我们可以查看当前最新的4次提交，并取第一条记录去提交记录的结构树中匹配：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>command: git log -4 --oneline

9a5bf36 (HEAD -&amp;gt; master) feat: third commit
2c5331f feat: second commit
60814e1 feat: first commit
49942f3 Initial commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们能看到最近的4次提交，并且每次提交都会有一个 7 位长的哈希值以及提交时的描述。以 <code>9a5bf36</code> 这次提交为例，我们可能会有个疑问：这只有 7 位似乎跟我们说的不太一样呀。别急！我们需要转换一下，将他转换成完整的长哈希值，因为在树结构中是以长哈希值构建生成的。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>git rev-parse 9a5bf36
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Git 以等效的长哈希值响应：<code>9a5bf367f10390c64a3f7b3e738b78bd78a3d781</code>.</p><p>将其分解为目录名称和对象标识符：</p><ul><li><strong>目录</strong>：<code>9a</code></li><li><strong>对象标识符</strong>：<code>5bf367f10390c64a3f7b3e738b78bd78a3d781</code></li></ul><p>我们很容易就能看到找到：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>objects
├── 0c
│   ├── 8867d7e175f46d4bcd66698ac13f4ca00cf592
│   └── c8002da0403724dfaa6792885eaa97faa71bcf
├── 1b
│   └── 716fafdd3aeb3636222a0026d1d4971078db05
.
.
.
├── 98
│   ├── ed6b3f02409778bc864d8897bc230c90cae445
├── 9a
│   ├── 5bf367f10390c64a3f7b3e738b78bd78a3d781   //====&amp;gt;在这
.
.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>既然我们知道了它的存储结构，那么我们自然就应该打开这个文件查看文件的内容，但是我们不能直接查看此对象，因为 Git 中的对象是经过压缩的。如果您尝试使用<code>cat 5bf367f10390c64a3f7b3e738b78bd78a3d781</code>或类似方式查看它，您可能会看到一堆像这样的乱码，以及计算机尝试从二进制对象读取控制字符时发出的咔呲声：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>6?$?(?E9?z??nUmV?Em]?p??3?\`??????q?Ţqjw????VR?O? q?.r???e|lN?p??Gq?)?????#???85V?W6?????
)|Wc*??8?1a?b?=?f*??pSvx3??;??3??^??O?S}??Z4?/?%J?
xu?Ko?0??̯?51??Ԯ
yB
    ??f?y?cBɯo?{ݝ?|ҌFL?:?@??_?0Td5?D2Br?D$??f?B??b?5W?HÁ?H*?&amp;amp;??(fbꒉdC!DV%?????D@?(???u0??8{?w
    ????0?IULC1????@(&amp;lt;?s &amp;#39;
mO????????ƶe?S????&amp;gt;?K8                  89_vxm(#?jxOs?u?b?5m????=w\\l?
%?O??[V?t]?^??????G6.n?Mu?%
                           ?̉?X??֖X
                          v??x?EX???:sys???G2?y??={X?Ռe?X?4u???????4o&amp;#39;G??^&amp;quot;qݠ???$?Ccu?ml???vB_)?I?
\`??*ގF?of??O
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>git cat-file -p 9a5bf36
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sanqius-MacBook-Pro:3c zcy$ git cat-file -p 9a5bf36
tree 85b9416a23f8fb018181f96e5c01ba4bd923b965
parent 2c5331fd7046e561aad8fdde3e3f21375a17549c
author 三秋 &amp;lt;sanqiu@***.com&amp;gt; 1665729807 +0800
committer 三秋 &amp;lt;sanqiu@***.com&amp;gt; 1665729807 +0800

feat: third commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看到的这个文件内部的这些内容其实就是一个对象，一个包含了 tree、parent、author... 等数据的对象，这个对象就是 <code>Commits</code> 了。</p><p>Commits 对象是以键值对的形式展示的，这个 Commits 指向一个 Hash 值为 <em>2c5331fd7046e561aad8fdde3e3f21375a17549c</em> 的 parent ，其实这个<strong>parent同样是一个 Commits 对象</strong>，这很好理解。但是这个 Commits 还有一个 Hash 值为 <em>85b9416a23f8fb018181f96e5c01ba4bd923b965</em> 的 tree 属性，也就是我们上面所说的第二个常用对象 <code>Tree</code> 。接下来我们需要聚焦的是 Commits 对象中的 Tree。</p><h3 id="tree对象" tabindex="-1"><a class="header-anchor" href="#tree对象" aria-hidden="true">#</a> Tree对象</h3><p>这个提交的文章目录里面有什么？我们使用相同的命令打开这个哈希值指向的文件：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>git cat-file -p 85b9416a23f8fb018181f96e5c01ba4bd923b965
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>100644 blob 0cc8002da0403724dfaa6792885eaa97faa71bcf    README.md
040000 tree 3c121291ffc25ce6792f9350883b77cea2633048    src
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们发现这个 Tree 对象下有两个，一个是 Blob 类型的 README.md 文件和 Tree 类型的 src 的文件夹，可以看出 Tree 是可以嵌套的，并且这个结构似乎有点眼熟，没错这就是我们项目的目录结构，这也就能解释为什么说 <strong>Commits 对象下的 Tree 就是对应着这个代码版本的文件快照了</strong>。（100644 代表它是一个普通的文件，100755 表示一个可执行文件，120000 仅仅是一符号链接）</p><h3 id="blobs对象" tabindex="-1"><a class="header-anchor" href="#blobs对象" aria-hidden="true">#</a> Blobs对象</h3><p>接上文，现在这个 Tree 文件类型已经出现我们的第三类对象 <code>Blob</code> 了，打破砂锅问到底，继续看看这个Blob 是啥：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>git cat-file -p 0cc8002da0403724dfaa6792885eaa97faa71bcf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MIT License

Copyright (c) 2019

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &amp;quot;Software&amp;quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell...
&amp;lt;snip&amp;gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到其实这就是我们在这个代码版本下的文件内容，<strong>这也就意味着</strong> <strong>Blob</strong> <strong>其实就是存放文件的内容</strong>。</p><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>放一张图用来总结一下 Commits、Tree、Blob 三者之间的关系：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c75f83c22b34887b5316787317f6c70~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20221028114950203.png"></p><h2 id="分支创建与合并" tabindex="-1"><a class="header-anchor" href="#分支创建与合并" aria-hidden="true">#</a> 分支创建与合并</h2><p>在上文中，我们不难知道每一次提交记录其实就是向代码仓库提交一次 Commits 对象，还记得 Commits 对象中的 Parent 属性吗， Parent 属性指向的是当前基变的原型版本。那么当有多个 Commits 提交后，我们能得到这样一个结构的 Commits 流：</p><p>&lt;img src=&quot;https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c912e6c961645b49b283ea83ef12ea3~tplv-k3u1fbpfcp-zoom-1.image&quot; alt=&quot;image-20221028114926447.png&quot; style=&quot;zoom: 44%;&quot; /&gt;</p><p>用过图形化 Git 工具的同学有没有觉得这个很眼熟，没错，图形化工具就是将Commits 关系视图化，就得到我们常用的 SourceTree 、GitKraken 这些常用的图像化 Git 工具。</p><p>现在来谈分支，Git 中的分支，其实本质上仅仅是个指向 Commit 对象的可变指针。Git 会使用 Master 作为分支的默认名字。在若干次提交后，你其实已经有了一个指向最后一次提交对象的 Master 分支，它在每次提交的时候都会自动向前移动。</p><p>&lt;img src=&quot;https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4ce723d7c034731a1061994d01bb452~tplv-k3u1fbpfcp-zoom-1.image&quot; alt=&quot;image-20221028114904826.png&quot; style=&quot;zoom: 33%;&quot; /&gt;</p><p>当我们创建一个新的分支时，其实就是在当前 Commit 对象上新建一个分支指针。这也就是为什么当我们新建一个分支的时候会如此迅速。</p><p>&lt;img src=&quot;https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c2d398c48a24a8ba3d134743a91ad32~tplv-k3u1fbpfcp-zoom-1.image&quot; alt=&quot;image-20221028114837528.png&quot; style=&quot;zoom:33%;&quot; /&gt;</p><p>那么Git 是如何知道你当前在哪个分支上工作的呢？其实答案也很简单，它保存着一个名为 <code>HEAD</code> 的特别指针。在 Git 中，它是一个指向你正在工作中的本地分支的指针。所以当我们切换分支的时候就是切换 HEAD 指针的指向，这和大多数版本控制系统形成了鲜明对比，它们管理分支大多采取备份所有项目文件到特定目录的方式，所以根据项目文件数量和大小不同，花费的时间也会有很大的差别，快则几秒，慢则数分钟。而 Git 的实现与项目复杂度无关，它永远可以在几毫秒的时间内完成分支的创建和切换。</p><p>&lt;img src=&quot;https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5934175ab0341adad10a37bea81ada7~tplv-k3u1fbpfcp-zoom-1.image&quot; alt=&quot;image-20221028113328326.png&quot; style=&quot;zoom: 50%;&quot; /&gt;</p><p>当我们分别在 Master、testing 分支分别进行了一些修改，并将代码提交，那么我们就会得到这样结构的分支关系，当前 Master、testing 分支最新的代码的父级记录指向的都是同一个。</p><p>&lt;img src=&quot;https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a14333738c945de8bb9fd9389eb064a~tplv-k3u1fbpfcp-zoom-1.image&quot; alt=&quot;image-20221028114802324.png&quot; style=&quot;zoom: 33%;&quot; /&gt;</p><p>读到这我们可以总结出分支的本质：</p><ol><li>当我们切换到一个命名分支，其实只是切换一个引用提交哈希的标签。</li><li>Git 是通过哈希值来找到该提交对象，然后从提交对象中获取树哈希。</li><li>然后 Git 沿树对象递归，找到哈希对应的快照文件对象，然后解压缩文件对象。</li><li>您的工作目录现在代表该分支的状态，因为它存储在存储库中。</li></ol><h2 id="代码合并与冲突" tabindex="-1"><a class="header-anchor" href="#代码合并与冲突" aria-hidden="true">#</a> 代码合并与冲突</h2><p>当我们继续在 testing 分支进行开发，且 Master 与 testing 分支的开发是在两个不同文件中，那么当我们要将 testing 分支合并到 Master 分支中去时，Git实际上会将两个分支的末端（A5 和 A7）以及它们的共同祖先（A3）进行一次简单的三方合并计算。</p><p>&lt;img src=&quot;https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ba27077bbfd4acf8aa504818bde9e01~tplv-k3u1fbpfcp-zoom-1.image&quot; alt=&quot;image-20221028095708236.png&quot; style=&quot;zoom:50%;&quot; /&gt;</p><p>这次，Git 没有简单地把分支指针右移，而是对三方合并后的结果重新做一个新的快照，并自动创建一个指向它的提交对象（ A8 ）。这个提交对象比较特殊，它有两个祖先（ A5 和 A7 ）。</p><p>&lt;img src=&quot;https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d476c00fca7429190c37b8cd950706f~tplv-k3u1fbpfcp-zoom-1.image&quot; alt=&quot;image-20221028095733911.png&quot; style=&quot;zoom:50%;&quot; /&gt;</p><p>此时我们知道了代码的合并是如何进行的，但当我们在两个分支都同时修改了同一处代码时，那么当你合并代码的时候碰到这样的提示时，就意味着我们在进行代码合并时出现了代码冲突。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 代码合并冲突提示
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们打开冲突的文件，你会看到类似于这种</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;&amp;lt;&amp;lt;&amp;lt;&amp;lt;&amp;lt;&amp;lt; HEAD
&amp;lt;div id=&amp;quot;footer&amp;quot;&amp;gt;contact : email.support@github.com&amp;lt;/div&amp;gt;
=======
&amp;lt;div id=&amp;quot;footer&amp;quot;&amp;gt;
  please contact us at support@github.com
&amp;lt;/div&amp;gt;
&amp;gt;&amp;gt;&amp;gt;&amp;gt;&amp;gt;&amp;gt;&amp;gt; iss53
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到 <code>=======</code> 隔开的上半部分，是 HEAD（即 Master 分支，在运行 Merge 命令时所切换到的分支）中的内容，下半部分是在 testing 分支中的内容。解决冲突的办法无非是二者选其一或者由你手动整合到一起。但是 Git 是如何进行 Diff 的呢？</p><h2 id="代码合并算法-myers" tabindex="-1"><a class="header-anchor" href="#代码合并算法-myers" aria-hidden="true">#</a> 代码合并算法（Myers）</h2><p>Git 的 Diff 是基于 Myers 算法进行的，那么先来了解一下 Myers 算法。<strong>Myers算法</strong>由 Eugene W.Myers 在 1986 年发表的一篇论文中提出，是一个能在大部分情况产生”最短的直观的“diff的一个算法。</p><h3 id="differ" tabindex="-1"><a class="header-anchor" href="#differ" aria-hidden="true">#</a> differ</h3><p>Diff 就是寻找目标文本和源文本之间的区别，也就是将源文本变成目标文本所需要的操作。举一个 Myers 算法中最常用的例子，A1 = <strong>ABCABBA</strong>，A2 = <strong>CBABAC</strong>，那么通过怎样的操作才能使得由 A1 转变成 A2 呢。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>例如：
1.  - A       2.  - A       3.  + C
    - B           + C           - A
      C             B             B
    - A           - C           - C
      B             A             A
    + A             B             B
      B           - B           - B
      A             A             A
    + C           + C           + C
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这三种都是有效的变动方式，其实这种转化过程有很多种，那么那种转换过程才是最高效的呢？我们在变动时有这么一个共识：</p><ul><li>删除后新增，比新增后删除要好</li><li>当修改一块代码时，整块的删除然后新增，比删除新增交叉在一起要好</li></ul><p>面对这个问题我们可以将这个问题抽象成一个数学问题，生成“直观”的 Diff 算法。抽象的结果是：<strong>寻找 Diff 的过程可以被表示为图搜索</strong>。</p><h3 id="图搜索" tabindex="-1"><a class="header-anchor" href="#图搜索" aria-hidden="true">#</a> 图搜索</h3><p>还是以两个字符串，A1 = <strong>ABCABBA</strong> ，A2 = <strong>CBABAC</strong> 为例，根据这两个字符串我们可以构造下面一张图，横轴是 A1 内容，纵轴是 A2 内容，要想从 A1 变换成为 A2抽象的数学问题就是求一条从左上角到右下角的路径。图中每一条从左上角到右下角的路径，都表示一个 Diff。向右表示“删除”，向下表示”新增“，对角线则表示“原内容保持不动“。</p><p>&lt;img src=&quot;https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ccc61e5d2bb24e52907ed9064890f88e~tplv-k3u1fbpfcp-zoom-1.image&quot; alt=&quot;image-20221028102938469.png&quot; style=&quot;zoom:50%;&quot; /&gt;</p><p>将上述的共识再次进行数学抽象化就对应为：</p><ul><li>路径长度最短（对角线不算长度）</li><li>先向右，再向下（先删除，后新增）</li></ul><p>就像走迷宫一样，我们就可以摸索得到这么一条路径：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>①.  (0, 0) -&amp;gt; (1, 0) -&amp;gt; (2, 0) 
②.  (2, 0) -&amp;gt; (3, 1)
③.  (3, 1) -&amp;gt; (3, 2)
④.  (3, 2) -&amp;gt; (4, 3) -&amp;gt; (5, 4)
⑤.  (5, 4) -&amp;gt; (6, 4)
⑥.  (6, 4) -&amp;gt; (7, 5)
⑦.  (7, 5) -&amp;gt; (7, 6)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>&lt;img src=&quot;https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa3ec57dcf8d40ad86e536940385f4e0~tplv-k3u1fbpfcp-zoom-1.image&quot; alt=&quot;image-20221028104037267.png&quot; style=&quot;zoom:50%;&quot; /&gt;</p><p>这条路径代表的 diff 的操作为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>- A
- B
  C
+ B
  A
  B
- B
  A
+ C
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="代码diff" tabindex="-1"><a class="header-anchor" href="#代码diff" aria-hidden="true">#</a> 代码diff</h3><p>我们以上文中的几次提交中的任意两次 <code>2c5331f</code> 和 <code> 60814e1</code> 提交进行 diff：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>command: git diff 2c5331f 60814e1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>2c5331f</em> 和 <em>60814e1</em> 表示两个文件的 <code>Hash</code>，相当于它们的 HashID，这个 HashID 就代表了一个文件对象的特定版本，最后的一串数字代表了一个文件的模式。</p><p>&lt;p align=left&gt;&lt;img src=&quot;https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a313e1fe8b644e98aa193bc7d36a211~tplv-k3u1fbpfcp-zoom-1.image&quot; alt=&quot;image-20221028112120563&quot; style=&quot;align:&#39;left&#39;;&quot; /&gt;&lt;/p&gt;</p><p>Git 会告诉你哪些行存在差异，它们被显示在两个 “@@” 符号之前，以上图示例中所表示的含义为：</p><ul><li>来自文件 a （标记为 “-”），从第 1 行开始之后的 15 行代码。</li><li>来自文件 b （标记为 “+”），从第 1 行开始之后的 15 行代码。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@@ -1,15 +1,5 @@
-		console.log(&amp;#39;watch&amp;#39;)
-
-		const add = (a,c) =&amp;gt; {
-  		return a+c
-		}
-		const reduce=(a)=&amp;gt;{
-  		if (a&amp;lt;0){
-    		return  &amp;quot;第一位不能为负数&amp;quot;
-  		}else {
-    		return a-b
-  		}
+		const add = (a,b) =&amp;gt; {
+  		return a+b
 		}
 		add(4,8)
-		console.log(reduce(-2,-9))
-		console.log(new Date().getDate(),&amp;#39;第二次提交&amp;#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而”@@”后面的紧跟着的部分就是其上下文信息，在每一个被改动过的代码行之前都会前置一个 “+” 或是 “-” 符号。这些符号可以帮助你准确了解版本 a 和版本 b ，例如前置了 “-” 符号的行就代表来自版本 a ，反之带有符号 “+” 的行就代表来自于版本 b 。</p><h1 id="结尾" tabindex="-1"><a class="header-anchor" href="#结尾" aria-hidden="true">#</a> 结尾</h1><h1 id="结尾-1" tabindex="-1"><a class="header-anchor" href="#结尾-1" aria-hidden="true">#</a> 结尾</h1><p>上述已经粗浅的为大家介绍了 Git 的一些简单原理，但这只是 Git 的冰山一角，如果大家还有兴趣可以继续深入学习，相信大家能够为自己开拓出一块新的知识领域。</p><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,108),v={href:"https://blog.jcoglan.com/2017/02/12/the-myers-diff-algorithm-part-1/",target:"_blank",rel:"noopener noreferrer"},b=e("strong",null,"The Myers diff algorithm: part 1",-1),g=e("h2",{id:"推荐阅读",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#推荐阅读","aria-hidden":"true"},"#"),i(" 推荐阅读")],-1),f={href:"https://juejin.cn/post/7163801933612843016",target:"_blank",rel:"noopener noreferrer"},h={href:"https://juejin.cn/post/7153410606673395725",target:"_blank",rel:"noopener noreferrer"},x={href:"https://juejin.cn/post/7145604963593355277",target:"_blank",rel:"noopener noreferrer"},q={href:"https://juejin.cn/post/7143025612267978760",target:"_blank",rel:"noopener noreferrer"},_={href:"https://juejin.cn/post/7140422304920109092",target:"_blank",rel:"noopener noreferrer"},k=e("h2",{id:"开源作品",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#开源作品","aria-hidden":"true"},"#"),i(" 开源作品")],-1),A=e("ul",null,[e("li",null,"政采云前端小报")],-1),y={href:"http://zoo.zhengcaiyun.cn/",target:"_blank",rel:"noopener noreferrer"},j=e("ul",null,[e("li",null,"商品选择 sku 插件")],-1),G={href:"https://github.com/zcy-inc/skuPathFinder-back",target:"_blank",rel:"noopener noreferrer"},C=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),i(" 招贤纳士")],-1),B=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 90 余个前端小伙伴，平均年龄 27 岁，近 4 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),z=e("p",null,[i("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),D=e("p",null,[e("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98d3aa3d1f8646a8bcda8cfd9e335a4b~tplv-k3u1fbpfcp-zoom-1.image",alt:""})],-1);function M(T,E){const a=r("ExternalLinkIcon");return d(),s("div",null,[o,u,e("p",null,[i("> 这是第 165 篇不掺水的原创，想获取更多原创好文，请搜索公众号关注我们吧~ 本文首发于政采云前端博客："),e("a",m,[i("# Git 是如何工作的"),n(a)])]),p,e("p",null,[e("a",v,[b,n(a)])]),g,e("p",null,[e("a",f,[i("大数据前端团队生存指南"),n(a)])]),e("p",null,[e("a",h,[i("所见即所得 —— HTML转图片组件开发"),n(a)])]),e("p",null,[e("a",x,[i("探索组件在线预览和调试"),n(a)])]),e("p",null,[e("a",q,[i("规范升级 NPM 包"),n(a)])]),e("p",null,[e("a",_,[i("你想知道的前后端协作规范都在这了"),n(a)])]),k,A,e("p",null,[e("strong",null,[i("开源地址 "),e("a",y,[i("www.zoo.team/openweekly/"),n(a)])]),i(" (小报官网首页有微信交流群)")]),j,e("p",null,[e("strong",null,[i("开源地址 "),e("a",G,[i("https://github.com/zcy-inc/skuPathFinder-back/"),n(a)])])]),C,B,z,D])}const H=t(c,[["render",M],["__file","Git 是如何工作的.html.vue"]]);export{H as default};
