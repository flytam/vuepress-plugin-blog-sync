import{_ as a,z as d,A as r,Y as e,C as i,U as s,a6 as l,Q as o}from"./framework-cb9358d9.js";const t={},c=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8d2b0103c1fa~tplv-t2oaga2asx-image.image",alt:""})],-1),v=e("br",null,null,-1),u={href:"https://www.zoo.team/article/red-black-tree-2",target:"_blank",rel:"noopener noreferrer"},m=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714f99896f7dddc~tplv-t2oaga2asx-image.image",alt:""})],-1),b=e("h2",{id:"前言",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),i(" 前言")],-1),p={href:"https://juejin.cn/post/6844904029214998535",target:"_blank",rel:"noopener noreferrer"},g=l('<h3 id="○-红黑树删除" tabindex="-1"><a class="header-anchor" href="#○-红黑树删除" aria-hidden="true">#</a> ○ 红黑树删除</h3><p>红黑树删除操作包括两部分，一是查找到删除节点，二是删除节点以及删除之后的自平衡。查找节点与二叉树的查找方式一样。而删除操作，当删除节点不存在时，结束本次删除操作；当删除节点存在时，删除节点，然后找到一个节点替换已删除的节点位置，重新连接上已删除节点的父节点与孩子节点。</p><p>&gt; 如下图，删除节点 D ，需要找到一个节点可以替换到 D 节点位置，否则节点 P 和节点 L 及 R 之间的链接会断开，破坏了红黑树的性质，形成独立的树形结构。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714f977352f6e9c~tplv-t2oaga2asx-image.image" alt="image-20200301173609870.png"></p><p><strong>关键字：</strong><code>查找节点</code> <code>替换节点</code></p><h3 id="○-查找节点" tabindex="-1"><a class="header-anchor" href="#○-查找节点" aria-hidden="true">#</a> ○ 查找节点</h3>',6),h={href:"https://juejin.cn/post/6844904029214998535#heading-8",target:"_blank",rel:"noopener noreferrer"},f={href:"https://juejin.cn/post/6844904029214998535#heading-8",target:"_blank",rel:"noopener noreferrer"},_=l(`<p>&gt; 在二叉查找树中查找节点 N ，首先从根节点开始，将根节点设置为当前节点，若当前节点为空，则查找失败，若 N 与当前节点值相等，返回当前节点，若 N 大于当前节点值，则从当前节点的右子节点开始查找，否则从当前节点的左子节点开始查找，直到返回目标节点或者查找失败；</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714f97737e7cf4f~tplv-t2oaga2asx-image.image" alt="图片"></p><h3 id="○-替换节点" tabindex="-1"><a class="header-anchor" href="#○-替换节点" aria-hidden="true">#</a> ○ 替换节点</h3><p><strong>回顾一下二叉查找树的性质：</strong></p><ul><li>若任意节点左子树不为空，它的左子树上所有节点值均小于它的根节点的值</li><li>若任意节点的右子树不为空，它的右子树上所有节点的值均大于它的根节点的值</li></ul><p>根据二叉查找树的性质，删除节点之后，可以找到两个替换节点，即可以用左子树中的最大值以及右子树中的最小值来替换删除节点。</p><p><strong>删除节点找替换节点又分三种情景：</strong></p><ul><li>情景1：删除节点无子节点，可以直接删除，无需替换</li><li>情景2：删除节点只有一个子节点，用子结点替换删除节点</li><li>情景3：删除节点有两个子节点，可以用后继节点或者前继节点替换删除节点。本文采用前者，即后继节点替换删除节点</li></ul><p>&gt; 后继节点：删除节点的右子树中的最小节点，即右子树中最左节点。 &gt; &gt; 前继节点：删除节点的左子树中最大节点，即左子树中最右节点。</p><p>综上所述，寻找一个节点替换已删除节点位置，在不考虑节点值情况下，可等同于<strong>删除替换节点</strong>。</p><h3 id="○-节点删除" tabindex="-1"><a class="header-anchor" href="#○-节点删除" aria-hidden="true">#</a> ○ 节点删除</h3><p>删除节点可等同于删除替换节点，所以节点删除就转换到了替换节点的各种场景。节点删除又分 9 种场景，在如下的描述场景中，场景 2 中的四种情况与场景 3 中的四种情况分别互为镜像，可参照对比着看。</p><ul><li><p>删除场景1：替换节点是红色节点</p><p>即替换的节点是红色节点，删除之后不影响红黑树的平衡，只需要把替换节点的颜色设成被删除节点的颜色即可重新平衡。</p></li></ul><p>&gt; 处理: 删除节点D，查找到替换节点R，R设成D节点的颜色，再替换D节点位置。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714f97739e1aa62~tplv-t2oaga2asx-image.image" alt="image-20200229234617585.png"></p><ul><li><p>删除场景 2：替换节点是黑色节点、且是其父节点的左子节点</p><p>替换节点是黑色节点时，删除之后破坏了红黑树的平衡，需要考虑自平衡处理。而此又细分为 4 种场景。</p><ul><li>场景 2.1：替换节点的兄弟节点是红色。删除黑色节点，左子树中黑色节点数减少一个，可以通过一些操作，达到间接借用红色的兄弟节点来补充左子树中黑色节点数。</li></ul><p>&gt; 处理：替换节点的父节点 P 设置红色、兄弟节点 S 设置成黑色，再对节点 P 左旋操作，变成场景 2.4。</p><p>​</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714f9773c2b6080~tplv-t2oaga2asx-image.image" alt="image-20200229211126273.png"></p><ul><li>场景2.2：替换节点的兄弟节点是黑色且兄弟节点的右子节点是红色、左子节点任意颜色。同样是间接借用兄弟节点的红色右子节点补充到左子树中，达到红黑树的平衡。</li></ul><p>&gt; 处理：替换节点的兄弟节点 S 设置成父节点P的颜色，兄弟节点的右子节点 SR 设置为黑色，父节点P设置为黑色，再对节点 P 左旋操作。此时节点R替换到删除节点位置之后，红黑树重新达到平衡状态。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714f977632f3854~tplv-t2oaga2asx-image.image" alt="image-20200229214756335.png"></p><ul><li>场景2.3：替换节点的兄弟节点是黑色且兄弟节点的左子节点是红色，右子节点是黑色。</li></ul><p>&gt; 处理：替换节点的兄弟节点 S 设置成红色，兄弟节点的左子节点 SL 设置为黑色，再对节点 S 右旋操作，转换到了场景 2.2，再进行场景 2.2 的操作。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714f9776b46ada9~tplv-t2oaga2asx-image.image" alt="image-20200229220440371.png"></p><ul><li>场景2.4：替换节点的兄弟节点的左右子节点都是黑色。兄弟节点的子节点不能借用，就只能借用兄弟节点了。</li></ul><p>&gt; 处理：替换节点的兄弟节点 S 设置成红色，以父节点 P 当作替换节点，然后自底向上处理。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714f977708f0048~tplv-t2oaga2asx-image.image" alt="image-20200229222019042.png"></p></li></ul><ul><li><p>场景3：替换节点是黑色节点、且是其父节点的右子节点。（与场景 2 镜像）</p><ul><li><p>场景3.1：替换节点的兄弟节点是红色。</p><p>&gt; 处理：替换节点的父节点 P 设置红色、兄弟节点 S 设置成黑色，再对节点 P 右旋操作，变成场景3.4。</p></li></ul><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714f977787c37bd~tplv-t2oaga2asx-image.image" alt="image-20200229223345697.png"></p><ul><li><p>场景3.2：替换节点的兄弟节点是黑色且兄弟节点的左子节点是红色、右子节点任意颜色。</p><p>&gt; 处理：替换节点的兄弟节点 S 设置成父节点 P 的颜色，兄弟节点的左子节点 SL 设置为黑色，父节点P 设置为黑色，再对节点 P 右旋操作。此时节点 R 替换到删除节点位置之后，红黑树重新达到平衡状态。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714f9777907ce8d~tplv-t2oaga2asx-image.image" alt="image-20200229233258336.png"></p></li><li><p>场景3.3：替换节点的兄弟节点是黑色且兄弟节点的右子节点是红色、左子节点为黑色。</p><p>&gt; 处理：替换节点的兄弟节点 S 设置成红色，兄弟节点的右子节点 SL 设置为黑色，再对节点S左旋操作，转换到了场景 3.2，再进行场景 3.2 的操作。</p></li></ul><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714f977a9405884~tplv-t2oaga2asx-image.image" alt="image-20200301212153602.png"></p><ul><li><p>场景3.4：替换节点的兄弟节点的左右子节点都是黑色。</p><p>&gt; 处理：替换节点的兄弟节点 S 设置成红色，以父节点 P 当作替换节点，然后自底向上处理。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714f9779f7d6185~tplv-t2oaga2asx-image.image" alt="image-20200229234250179.png"></p></li></ul></li></ul><p><strong>节点删除及平衡代码：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> /**
  * 查找节点 
  * @param key 节点key值
  */
search(key) {
  let node = this.root
  while (node) {
    if (key &amp;lt; node.key) {
      node = node.left
    } else if (key &amp;gt; node.key) {
      node = node.right
    } else if (key === node.key) {
      break
    }
  }
  return node
}

/**
 * 替换u节点，重置v节点
 * @param u 待删除节点
 * @param v 子节点
 */
const replace = function(u, v) {
  if(!u.parent){
    // u是根节点，设置v为根节点
    this.root = v
  } else if(u === u.parent.left){
    // 重置u的父节点的左节点
    u.parent.left = v
  } else {
    // 重置u的父节点的右节点
    u.parent.right = v
  }
  // 重置v的父节点
  v.parent = u.parent
}

 /**
  * 查找node节点的后继节点
  */
  findSuccessor(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

/**
 * 删除节点
 * @param key 删除节点key值
 */
delete(key) {
  const node = search(key)
  if(!node){
    return
  }
  let fix
  let color = node.color
  if(!node.left){
    //左节点为空值
    fix = node.right
    this.replace(node, node.right)
  } else if(!node.right){
    //右节点为空值
    fix = node.left
    this.replace(node, node.left)
  } else {
    // 左右节点都不为空值
    const successor = this.findSuccessor(node.right)
    //替换节点的颜色
    color = successor.color
    //后继节点只存在右节点或者两个nil子节点情况
    fix = successor.right
    //如果后继节点是父节点的非直接子节点
    if(successor.parent !== node){
      this.replace(successor, successor.right)
      successor.right = node.right
      successor.right.parent = successor
    }
    this.replace(node, successor)
    successor.color = node.color
    successor.left = node.left
    successor.left.parent = successor
  }
  if(color === Color.BLACK){
    this.balanceDeletion(fix)
  }
}
/**
 * 删除节点平衡修正
 * @param node 节点
 */
  balanceDeletion(node) {
    while (node !== this.root &amp;amp;&amp;amp; node.color === Color.BLACK) {
      // 节点是父节点的左子节点
      if (node === node.parent.left) {
        //兄弟节点
        let sibling = node.parent.right;
        if (sibling.color === Color.RED) {
          // 场景2.1:兄弟节点是红色
          // 兄弟节点设置为黑色
          sibling.color = Color.BLACK;
          //替换节点的父节点设置为红色
          node.parent.color = Color.RED;
          // 左旋
          this.rotateLeft(node.parent);
          sibling = node.parent.right;
        }
        if (sibling.left.color === Color.BLACK &amp;amp;&amp;amp; sibling.right.color === Color.BLACK) {
          // 场景2.4: 兄弟节点两个子节点都是黑色
          sibling.color = Color.RED;
          //再次以父节点为新节点作自平衡处理。
          node = node.parent;
          continue;
        } else if (sibling.left.color === Color.RED) {
          // 场景2.3: 兄弟节点的左子节点是黑色，转换到场景2.2.
          sibling.left.color = Color.BLACK;
          sibling.color = Color.RED;
          //对兄弟节点右旋
          this.rotateRight(sibling)
          sibling = node.parent.right;
        }
        if (sibling.right.color === Color.RED) {
          //场景2.2：兄弟节点的右节点是红色
          sibling.color = node.parent.color;
          node.parent.color = Color.BLACK;
          sibling.right.color = Color.BLACK;
          //对父节点左旋
          this.rotateLeft(node.parent);
          // 左旋之后，红黑树重新平衡
          node = this.root;
        }
      } else {
        //节点是父节点的左节点
        let sibling = node.parent.left;
        if (sibling.color === Color.RED) {
          // 场景 3.1：替换节点的史弟节点是红色
          sibling.color = Color.BLACK;
          node.parent.color = Color.RED;
          this.rotateRight(node.parent);
          sibling = node.parent.left;
        }
        if (sibling.right.color === Color.BLACK &amp;amp;&amp;amp; sibling.left.color === Color.BLACK) {
          //场景3.4：替换节点的两个子节点都是黑色
          sibling.color = Color.RED;
          //再次以父节点为新节点作自平衡处理。
          node = node.parent;
          continue
        } else if (sibling.right.color === Color.RED) {
          // 场景3.3:兄弟节点的右子节点是红色
          sibling.right.color = Color.BLACK;
          sibling.color = Color.RED;
          this.rotateLeft(sibling);
          sibling = node.parent.left;
        }
        if (sibling.left.color === Color.RED) {
          // 场景3.2：兄弟节点的左子节点是红色
          sibling.color = node.parent.color;
          node.parent.color = Color.BLACK;
          sibling.left.color = Color.BLACK;
          this.rotateRight(node.parent);
          node = this.root;
        }
      }
    }
    node.color = Color.BLACK;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="红黑树应用" tabindex="-1"><a class="header-anchor" href="#红黑树应用" aria-hidden="true">#</a> 红黑树应用</h2><p>&gt; 红黑树广泛用在 Java 的集合框架 (HashMap、TreeMap、TreeSet)、Nginx 的 Timer 管理、Linux 虚拟内存管理以及 C++ 的 STL 等等场景。 &gt; &gt; &gt; 在Linux内核中，每个用户进程都可以访问4GB的线性虚拟空间，虚拟空间往往需要多个虚拟内存区域描述，对这些内存区域，Linux内核采用了链表以及红黑树形式组织。内存区域按地址排序，链接成一个链表以及一颗红黑树，寻找空闲区域时只需要遍历这个链表，在发生缺页中断时通过红黑树快速检索特定内存区域。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>`,22),x={href:"https://www.cs.usfca.edu/~galles/visualization/Algorithms.html",target:"_blank",rel:"noopener noreferrer"},C={href:"https://www.cs.usfca.edu/~galles/visualization/RedBlack.html",target:"_blank",rel:"noopener noreferrer"},j=e("h2",{id:"推荐阅读",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#推荐阅读","aria-hidden":"true"},"#"),i(" 推荐阅读")],-1),k={href:"https://juejin.cn/post/6844903950508883982",target:"_blank",rel:"noopener noreferrer"},L={href:"https://juejin.cn/post/6844903988081475591",target:"_blank",rel:"noopener noreferrer"},y={href:"https://juejin.cn/post/6844904038555729927",target:"_blank",rel:"noopener noreferrer"},R=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),i(" 招贤纳士")],-1),B=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),D=e("p",null,[i("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),S=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image",alt:""})],-1);function A(E,K){const n=o("ExternalLinkIcon");return d(),r("div",null,[c,e("p",null,[i("> 这是第 45 篇不掺水的原创，想获取更多原创好文，请扫 👆上方二维码关注我们吧~"),v,i(" > 本文首发于政采云前端团队博客："),e("a",u,[i("通俗易懂的红黑树图解(下)"),s(n)])]),m,b,e("p",null,[i("回顾一下"),e("a",p,[i("通俗易懂的红黑树图解(上)"),s(n)]),i("，上篇首先介绍了二叉树的定义以及二叉树的查找，然后介绍了红黑树的五点性质以及红黑树的变色、左旋以及右旋等操作，最后结合变色、左旋及右旋详细讲解了插入节点的五种场景。而本篇通俗易懂的红黑树图解(下)是在上篇的基础上讲解红黑树最后一种操作-删除节点，删除节点相对插入节点会复杂一点，但通过分类归纳出不同的场景，能更容易理解和记忆。")]),g,e("p",null,[i("查找删除节点与"),e("a",h,[i("二叉树查找"),s(n)]),e("a",f,[i("节点"),s(n)]),i("逻辑相同，通过与当前节点值比较，返回当前节点或者继续从左子树或者右子树继续查找。")]),_,e("p",null,[i("> 红黑树的删除操作就基本介绍完了，总结一下删除操作就是，删除节点等同于删除替换节点，若替换节点是红色节点时，直接删除不会影响平衡；若替换节点是黑色节点时，就需要借用兄弟节点的右子节点、左子节点或者兄弟节点。 > > > 红黑树最吸引人的是它的所有操作在最差情况下可以保证 O(logN) 的时间复杂度，稳定且高效。例如要在10 万条(2^20)数据中查找一条数据，只需要 20 次的操作就能完成。但这些保证有一个前置条件，就是数据量不大，且数据可以完全放到内存中。在数据量比较大时，因为红黑树的深度比较大造成磁盘 IO 的频繁读写，会导致它的效率低下。 另外推荐"),e("a",x,[i("Data Structure Visualizations"),s(n)]),i("网站，它包含非常多的数据结构方面的可视化算法题。其中就有"),e("a",C,[i("红黑树的算法"),s(n)]),i("，对照着在线生成的红黑树看，会更容易理解红黑树中各种操作场景。")]),j,e("p",null,[e("a",k,[i("前端工程实践之可视化搭建系统（一）"),s(n)])]),e("p",null,[e("a",L,[i("可能是最全的 “文本溢出截断省略” 方案合集"),s(n)])]),e("p",null,[e("a",y,[i("图文并茂，为你揭开“单点登录“的神秘面纱"),s(n)])]),R,B,D,S])}const w=a(t,[["render",A],["__file","通俗易懂的红黑树图解(下).html.vue"]]);export{w as default};
