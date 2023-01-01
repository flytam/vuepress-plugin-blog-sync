import{_ as a,z as l,A as r,Y as e,C as n,U as s,a6 as d,Q as t}from"./framework-cb9358d9.js";const v={},c=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8d2b0103c1fa~tplv-t2oaga2asx-image.image",alt:""})],-1),o=e("h2",{id:"",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#","aria-hidden":"true"},"#"),n(" **")],-1),m=e("p",null,'<table><tbody><tr><td bgcolor="#FDFFE7"><font size="4">原创不易，希望能关注下我们，再顺手点个赞~~<font></font></font></td></tr></tbody></table> **',-1),u={href:"https://www.zoo.team/article/red-black-tree-1",target:"_blank",rel:"noopener noreferrer"},p=d('<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/22/16f2d86049dcd800~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><h3 id="○-学习红黑树难吗" tabindex="-1"><a class="header-anchor" href="#○-学习红黑树难吗" aria-hidden="true">#</a> ○ 学习红黑树难吗？</h3><p>红黑树本质上是一颗二叉查找树，它是在二叉查找树的基础上给节点增加红黑颜色属性以及五条约束的性质。所以学习红黑树之前，需要先了解一下二叉查找树的知识；红黑树与二叉查找树的查找操作是一模一样的，所以掌握了二叉查找树之后，学习红黑树就只剩下增加及删除节点了（注意：红黑树没有更新节点操作）。</p><p>本文主要是介绍红黑树的基础知识以及增加节点操作，删除操作会放到《通俗易懂的红黑树图解（下）》。增加节点操作从内容上看有五种场景，场景一、二、三比较简单，实际上只需要重点关注后两种场景，阅读到这里，是不是觉得红黑树也不难。</p><p><strong>关键字：</strong><code>二叉查找树</code> <code>学习红黑树不难</code></p><h2 id="言归正传" tabindex="-1"><a class="header-anchor" href="#言归正传" aria-hidden="true">#</a> 言归正传</h2><h3 id="○-什么是红黑树" tabindex="-1"><a class="header-anchor" href="#○-什么是红黑树" aria-hidden="true">#</a> ○ 什么是红黑树？</h3>',8),b={href:"https://zh.wikipedia.org/wiki/%E9%B2%81%E9%81%93%E5%A4%AB%C2%B7%E8%B4%9D%E5%B0%94",target:"_blank",rel:"noopener noreferrer"},g=e("strong",null,"对称二叉 B 树",-1),h=d(`<p>红黑树保证了最坏情形下在 <strong>O(logn)</strong> 时间复杂度内完成查找、插入及删除操作；因此红黑树可用于很多场景，比如在 Java 的集合框架 (HashMap、TreeMap、TreeSet)、Nginx 的 Timer 管理、Linux 虚拟内存管理以及 C++ 的 STL 等等都能看到它的应用。</p><p>红黑树另外一个熟知的应用场景就是面试了，红黑树作为数据结构当中最典型的一种树，常被拿来当面试题考查树的相关知识。</p><p><strong>关键字：</strong><code>二叉查找树</code>、<code>自平衡</code>、<code>面试</code></p><h3 id="○-大-o-记法" tabindex="-1"><a class="header-anchor" href="#○-大-o-记法" aria-hidden="true">#</a> ○ 大 O 记法</h3><p>在比较算法性能时，不仅仅考虑算法计算时间及空间等因素，更重要的是数据量变化时算法计算时间及空间是如何变化的，它们是什么样的变化关系曲线；大 O 记法就是用来表示算法在最坏情况下，算法复杂度与数据量的变化关系，但它只是一种粗略的统计。</p><p>&gt; O(1)：计算时间与数据量大小没有关系，是常量时间； &gt; &gt; &gt; O(n)：计算时间与数据量成线性正比关系； O(logn)：计算时间与数据量成对数关系；</p><h2 id="二叉查找树" tabindex="-1"><a class="header-anchor" href="#二叉查找树" aria-hidden="true">#</a> 二叉查找树</h2><h3 id="○-什么是二叉查找树" tabindex="-1"><a class="header-anchor" href="#○-什么是二叉查找树" aria-hidden="true">#</a> ○ 什么是二叉查找树</h3><p>二叉查找树（英语：Binary Search Tree），也称为二叉搜索树、有序二叉树（Ordered Binary Tree）或排序二叉树（Sorted Binary Tree），是指一棵空树或者具有下列性质的二叉树：</p><ul><li>若任意节点的左子树不为空，则左子树上所有节点的值均小于它的根节点的值</li><li>若任意节点的右子树不为空，则右子树上所有节点的值均大于它的根节点的值</li><li>任意节点的左、右子树也分别为二叉查找树</li><li>没有键值相等的节点</li></ul><p><strong>关键字：</strong><code>任意非空二叉查找树，左子节点值 &amp;lt; 根节点值； 根节点值 &amp;lt; 右子节点值</code></p><h3 id="○二叉查找树的查找操作" tabindex="-1"><a class="header-anchor" href="#○二叉查找树的查找操作" aria-hidden="true">#</a> ○<strong>二叉查找树的查找操作</strong></h3><p>&gt; 在二叉查找树中查找 N ，首先从根节点开始，将根节点设置为当前节点，若当前节点为空，则查找失败，若 N 与当前节点值相等，返回当前节点，若 N 大于当前节点值，则从当前节点的右子节点开始查找，否则从当前节点的左子节点开始查找，直到返回目标节点或者查找失败；</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/22/16f2d76b4aa18bba~tplv-t2oaga2asx-image.image" alt="图片"></p><p>&gt; 如下图在二叉查找树中查找目标 8 ，查找路径依次为 ⑨ --&gt; ⑥ --&gt; ⑦ --&gt; ⑧</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/22/16f2d76b4a08bd02~tplv-t2oaga2asx-image.image" alt="图片"></p><p><strong>关键词：</strong> <code>红黑树的查找也是这么简单！！</code></p><h3 id="○二叉查找树遍历" tabindex="-1"><a class="header-anchor" href="#○二叉查找树遍历" aria-hidden="true">#</a> ○<strong>二叉查找树遍历</strong></h3><p>&gt; 遍历是二叉树上最重要的运算之一，它是指沿着某条搜索路线，依次对二叉树中的每一个节点均且仅做一次访问；L、D、R分别表示遍历左子树、访问根节点及遍历右子树</p><p><strong>前序遍历</strong>【DLR】：前序遍历也叫先根遍历，先访问根节点然后遍历左子树，最后遍历右子树；</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 示例代码
preOrderTraverse(node) {
  if (node) {
    this.visitNode(node);
    this.preOrderTraverse(node.left);
    this.preOrderTraverse(node.right);
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>中序遍历</strong>【LDR】：中序遍历也叫中根遍历，先遍历左子树然后访问根节点，最后遍历右子树；</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 示例代码
inOrderTraverse(node) {
  if (node) {
    this.inOrderTraverse(node.left);
    this.visitNode(node);
    this.inOrderTraverse(node.right);
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>后序遍历</strong>【LRD】：后序遍历也叫后根遍历，先遍历左子树然后遍历右子树，最后访问根节点；</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 示例代码
postOrderTraverse(node) {
  if (node) {
    this.postOrderTraverse(node.left);
    this.postOrderTraverse(node.right);
    this.visitNode(node);
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="红黑树" tabindex="-1"><a class="header-anchor" href="#红黑树" aria-hidden="true">#</a> 红黑树</h2><h3 id="○-为什么还要红黑树" tabindex="-1"><a class="header-anchor" href="#○-为什么还要红黑树" aria-hidden="true">#</a> ○ 为什么还要红黑树？</h3><p>二叉查找树并非平衡树，它只限制了左右子树与根点之间的大小关系，只有在平衡二叉查找树时，其时间复杂度才能达到 **O(logn) **，并且在极端情况下它甚至会退化成链表；</p><p>&gt; 如下所示在新创建的二叉查找树上依次添加数据 1、2、3、4、5、6、7、8、9、10 节点，此二叉查找树就退化成了链表，增删查性能也退化到了O(n)，所以为了避免这种情况，就出现了 AVL 及红黑树这种能自平衡的二叉查找树； &gt; &gt; &gt; AVL 树是严格的平衡二叉树，必须满足所有节点的左右子树高度差不超过 1；而红黑树是相对黑色节点平衡的二叉树，</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/22/16f2d76b4f2e9f3c~tplv-t2oaga2asx-image.image" alt="图片"></p><p><strong>关键字：</strong><code>AVL 树</code> <code>红黑树</code></p><h3 id="○-红黑树的性质" tabindex="-1"><a class="header-anchor" href="#○-红黑树的性质" aria-hidden="true">#</a> ○ 红黑树的性质</h3><ul><li>每个节点或者是黑色或者是红色</li><li>根节点是黑色</li><li>每个叶子节点（null）是黑色</li><li>如果一个节点是红色，则它的子节点必须是黑色，即两个红色节点不能直接相连</li><li>从一个节点到该节点的子孙节点的所有路径上包含相同数目的黑色节点</li></ul><p>&gt; 红黑树的五个性质避免了二叉查找树退化成单链表的情况，并且性质 4 和性质 5 确保了任意节点到其每个叶子节点路径中最长路径不会超过最短路径的 2 倍，即一颗树是黑红节点相间的树，另一颗全是黑节点的树；也就是红黑树是相对黑色节点的平衡二叉树；</p><p><strong>关键字:</strong> <code>节点非黑即红</code>、<code>两红色节点不能直接相连</code>、<code>从一节点出发抵达所有叶子节点（null）经过的黑色节点数目相同</code></p><h3 id="○-红黑树自平衡的实现" tabindex="-1"><a class="header-anchor" href="#○-红黑树自平衡的实现" aria-hidden="true">#</a> ○ 红黑树自平衡的实现：</h3><p>红黑树节点的插入和删除可能会破坏上述红黑树的性质并打破它的平衡，因此需要进行调整从而让红黑树重新恢复平衡；调整分两种方式：旋转以及变色。</p><ul><li>旋转又分为左旋转和右旋转两种形式：</li></ul><p>&gt; 左旋：如下图所示以 P 为旋转支点，旋转支点 P 的右子节点 R 变为父节点，其右子节点 R 的左子节点 RL 变为旋转支点 P 的右子节点；左旋之后左子树的节点相对旋转之前要多出一个节点，也就是左子树从右子树借用一个节点； &gt; &gt; <img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/22/16f2d76b4c640506~tplv-t2oaga2asx-image.image" alt=""></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 * 左旋示例代码：
 *       P                   R
 *      / \\                 / \\
 *     L   R     ====&amp;gt;     P  RR
 *        / \\             / \\
 *       RL RR           L  RL
 * @param node 旋转支点
 */
 rotateLeft(node) {
  // R
  const rchild = node.right;
  // P.right = RL
  node.right = rchild.left;
  // RL.parent = P;
  if (rchild.left) {
    rchild.left.parent = node;
  }
  // R.parent = P.paretn
  rchild.parent = node.parent;
  // 根节点情况，
  if (!node.parent) {
    this.root = rchild;
  } else {
    if (node === node.parent.right) {
      // node 是父节点的右节点，
      node.parent.right = rchild;
    } else {
      // node 是父节点的左节点，
      node.parent.left = rchild;
    }
  }
  // R.left = P
  rchild.left = node;
  // P.parent = R;
  node.parent = rchild;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>&gt; 右旋：如下图所示以 R 为旋转支点，旋转支点 R 的左子节点 P 变为父节点，而左子节点 P 的右子节点 RL 变为旋转支点 R 的左子节点；右旋之后右子树的节点相对旋转之前要多出一个节点，也就是右子树从左子树借用一个节点； &gt; &gt; <img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/22/16f2d76b54818e52~tplv-t2oaga2asx-image.image" alt="图片"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 * 右旋示例代码：
 *       R                 P
 *      / \\               / \\
 *     P  RR   ====&amp;gt;     L   R
 *   /  \\                   / \\
 *  L   RL                 RL RR
 * @param node 旋转支点
 */
 rotateRight(node) {
  // P
  const lchild = node.left;
  // R.left = RL ;
  node.left = lchild.right;
  // RL.parent = R
  if (lchild.right) {
    lchild.right.parent = node;
  }
  // P.parent = R.parent;
  lchild.parent = node.parent;
  // 根节点情况，
  if (!lchild.parent) {
    this.root = lchild;
  } else {
    if (node === node.parent.right) {
      // node 是父节点的右节点，
      node.parent.right = lchild;
    } else if (node === node.parent.left) {
      // node 是父节点的左节点，
      node.parent.left = lchild;
    }
  }
  // P.right = R;
  lchild.right = node;
  // R.parent = P;
  node.parent = lchild;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>变色就是由黑色节点变成红色节点或者红色节点变成黑色节点；</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/22/16f2d76b4f630da9~tplv-t2oaga2asx-image.image" alt="图片"></p></li></ul><h3 id="○-节点插入" tabindex="-1"><a class="header-anchor" href="#○-节点插入" aria-hidden="true">#</a> ○ 节点插入</h3><p>&gt; 具体到实际应用中，红黑树的节点是不能随意旋转和变色的，红黑树的旋转和变色有方式方法，首先需要先找到插入节点的父节点位置，与红黑树查找方式类似。本文以插入的节点为红色为例，当然也可以用黑色节点作为插入节点，但会更复杂。另外本文中所有节点中提的值都指的是 Key ，实际上节点还存在其它属性。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/22/16f2d76bb15a4123~tplv-t2oaga2asx-image.image" alt="图片"></p><p><strong>场景一：空树</strong></p><p>&gt; 根据红黑树性质第二点，红黑树根节点为黑色，即将插入节点修改成黑色即可； &gt; &gt; &gt; 处理：插入节点 N 变成黑色节点并设置为根节点；</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/22/16f2d76bc85e0f66~tplv-t2oaga2asx-image.image" alt="图片"></p><p><strong>场景二：插入节点 Key 已存在</strong></p><p>&gt; 在插入节点之前，红黑树是保持着平衡状态，只需要将插入节点的颜色变为被替换节点的颜色，同时替换掉原节点； &gt; &gt; &gt; 处理：插入的节点 N2 变成原节点 N 的颜色并替换掉 N 节点；图中节点为灰色表示节点可以是红色或者是黑色，下图同理；</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/22/16f2d76bcadffe2d~tplv-t2oaga2asx-image.image" alt="图片"></p><p><strong>场景三：插入节点的父节点是黑色节点</strong></p><p>&gt; 处理：插入的是红色节点 N，并不影响红黑树的平衡，插入之后不需要作其它处理。</p><p>​</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/22/16f2d76bb3006fc1~tplv-t2oaga2asx-image.image" alt="图片"></p><p><strong>场景四：插入节点的父节点是红色节点且叔叔是红色节点</strong></p><p>&gt; 插入节点的叔叔节点是红色节点，根据红黑树性质 4 ，两个红色节点不能直接相连； &gt; &gt; &gt; 处理：把父节点 P 及叔叔节点 S 由红色节点变成黑色节点，再把祖父节点 PP 变成红色，至此解决了插入节点与父节点两个红色节点直连的问题，并且黑色节点数量保持不变，但祖父节点由黑色变成了红色； 如果祖父节点的父节点是红色节点应如何处理？ 处理：将祖父节点 PP 当作新插入的红色节点，从祖父节点的父节点开始由底向上进行处理，直至插入节点的父节点为黑色节点或者插入节点为根节点。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/22/16f2d76bcacffa6b~tplv-t2oaga2asx-image.image" alt="图片"></p><p><strong>场景五：插入节点的父红点是红色节点，且叔叔节点是空 (null) 节点或者是黑色节点</strong></p><ul><li>场景 5.1，插入节点 N 是父节点 P 的左节点且父节点 P 是祖父节点 PP 的左节点:</li></ul><p>&gt; 叔叔节点是空节点这种场景好理解，下图中叔叔节点为黑色是什么情况，它不是已经处于非平衡状态了么？莫急，下图只是红黑树的局部图，回顾一下场景四由底向上处理时，祖父节点 PP 由黑色变成红色，对应到下图就是红色的父节点 P。 处理：父节点 P 变成红黑色，祖父节点变成红色，并以祖父节点 PP 为支点进行右旋；</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/22/16f2d76bcaa10630~tplv-t2oaga2asx-image.image" alt="图片"></p><ul><li>场景 5.2，插入节点是父节点的右节点且父节点 P 是祖父节点 PP 的左节点:</li></ul><p>&gt; 处理：以插入节点的父节点 P 为支点进行左旋，转换到场景 5.1；</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/22/16f2d76bfe6e7c7d~tplv-t2oaga2asx-image.image" alt="图片"></p><ul><li>场景 5.3，插入节点 N 是父节点 P 的右子节点且父节点 P 是祖父节点 PP 的右节点:</li></ul><p>&gt; 处理：与场景 5.1 互为镜像，父节点 P 变成黑色，祖父节点变成红色，并以祖父节点 PP 为支点进行左旋；</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/22/16f2d76c0c2f3922~tplv-t2oaga2asx-image.image" alt="图片"></p><ul><li>场景 5.4，插入节点的父节点的左子节点，父节点是祖父节点的右子节点：</li></ul><p>&gt; 处理：与场景 5.2 互为镜像，以插入节点的父节点 P 为支点进行右旋，转换到场景 5.3；</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/22/16f2d76c13173527~tplv-t2oaga2asx-image.image" alt="图片"></p><p><strong>节点定义：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 * 节点
 */
class Node {
  constructor(key, value, color = COLOR.RED) {
    this.key = key;
    this.value = value;
    this.color = color;

    this.left = null;
    this.right = null;
    this.parent = null;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>节点插入及插入平衡操作</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 * 插入key, value
 */
insert(key, value) {
  if (this.root) {
    // 红黑树为非空场景
    let parent;
    let node = this.root;
    const newNode = new Node(key, value, COLOR.RED);
    // 查找插入位置
    while (node) {
      parent = node;
      if (key === node.key) {
        // 场景二： 插入节点key已存在
        newNode.color = node.color;
        this.update(node, newNode);
        return;
      } else if (key &amp;lt; node.key) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    newNode.parent = parent;
    if (key &amp;lt; parent.key) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }
    this.balanceInsertion(newNode);
  } else {
    // 场景一：红黑树为空树场景
    this.root = new Node(key, value, COLOR.BLACK);
  }
}

// 插入节点平衡修正
balanceInsertion(node) {
  // 场景三：插入节点的父节点为黑色节点，无需修正
  while (node.parent != null &amp;amp;&amp;amp; node.parent.color === COLOR.RED) {
    let uncle = null;
    // 父节点是祖父节点左节点
    if (node.parent === node.parent.parent.left) {
      uncle = node.parent.parent.right;
      // 场景四：叔叔节点为红色
      if (uncle != null &amp;amp;&amp;amp; uncle.color === COLOR.RED) {
        // 父节点、叔叔节点变成黑色，祖父节点变成红色，以祖父节点当作需要新节点继续调用修正方法；
        node.parent.color = COLOR.BLACK;
        uncle.color = COLOR.BLACK;
        node.parent.parent.color = COLOR.RED;
        node = node.parent.parent;
        continue;
      }
      // 场景五：叔叔节点为空节点或者是黑色节点；
      // 场景5.2 插入节点是父节点的右节点，先进行左旋转换到场景5.1
      if (node === node.parent.right) {
        // 左旋之后，原插入节点的父节点变成新插入节点；
        node = node.parent;
        this.rotateLeft(node);
      }
      // 场景5.1 插入节点是父节点的左节点；
      // 父节点变成黑色、祖父节点变成红色
      node.parent.color = COLOR.BLACK;
      node.parent.parent.color = COLOR.RED;
      // 对祖父节点右旋
      this.rotateRight(node.parent.parent);
    } else {
      // 父节点是祖父节点右子节点
      uncle = node.parent.parent.left;
      // 场景四：叔叔节点为红色
      if (uncle != null &amp;amp;&amp;amp; uncle.color === COLOR.RED) {
        // 父节点、叔叔节点变成黑色，祖父节点变成红色，以祖父节点当作需要新节点继续调用修正方法；
        node.parent.color = COLOR.BLACK;
        uncle.color = COLOR.BLACK;
        node.parent.parent.color = COLOR.RED;
        node = node.parent.parent;
        continue;
      }
      // 场景5.4 插入节点是父节点的左节点，先进行右旋转换到场景5.3
      if (node === node.parent.left) {
        // 右旋之后，原插入节点的父节点变成新插入节点；
        node = node.parent;
        this.rotateRight(node);
      }
      // 场景5.3插入节点是父节点的右节点；
      // 父节点变成黑色、祖父节点变成红色
      node.parent.color = COLOR.BLACK;
      node.parent.parent.color = COLOR.RED;
      // 对祖父节点左旋
      this.rotateLeft(node.parent.parent);
    }
  }
  this.root.color = COLOR.BLACK;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>&gt; 通俗易懂的红黑树图解（上）基本就介绍完了，主要讲的是红黑树的基本性质、查找以及插入操作。下篇就开始讲一讲红黑树的删除，和插入节点一样只需要做些旋转及变色操作，真的不难！</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,80),f={href:"https://juejin.cn/post/6844903988081475591",target:"_blank",rel:"noopener noreferrer"},x={href:"https://juejin.cn/post/6844903981819379719",target:"_blank",rel:"noopener noreferrer"},R={href:"https://juejin.cn/post/6844903938018263048",target:"_blank",rel:"noopener noreferrer"};function _(L,O){const i=t("ExternalLinkIcon");return l(),r("div",null,[c,o,m,e("p",null,[n("> 本文首发于政采云前端团队博客： "),e("a",u,[n("通俗易懂的红黑树图解(上)"),s(i)])]),p,e("p",null,[n("红黑树（英语：Red-Black-Tree）是在 1972 年由"),e("a",b,[n("鲁道夫·贝尔"),s(i)]),n('发明，被称为"'),g,n('"，是一种由红黑节点组成并能自平衡的二叉查找树。')]),h,e("ul",null,[e("li",null,[e("p",null,[e("a",f,[n("可能是最全的 “文本溢出截断省略” 方案合集"),s(i)])])]),e("li",null,[e("p",null,[e("a",x,[n("乾坤大挪移！React 也能 “用上” computed 属性"),s(i)])])]),e("li",null,[e("p",null,[e("a",R,[n("看完这篇，你也能把 React Hooks 玩出花"),s(i)])])])])])}const j=a(v,[["render",_],["__file","通俗易懂的红黑树图解(上).html.vue"]]);export{j as default};
