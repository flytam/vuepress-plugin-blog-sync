import{_ as s,z as r,A as p,Y as e,C as t,U as o,a6 as i,Q as g}from"./framework-cb9358d9.js";const n={},c=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/24/1737e6038b00329e~tplv-t2oaga2asx-image.image",alt:""})],-1),d=e("br",null,null,-1),m={href:"https://www.zoo.team/article/git-exception",target:"_blank",rel:"noopener noreferrer"},l=i('<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/7/1728f19b9847c6b3~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>Git 作为一种分布式版本控制系统已经成为现在开发的宠儿，不仅应用在前端、后端、客户端等开发场景中，也成为各行业互联网企业分工协作的必备技能之一。</p><p>大家在使用过程中总会碰到这样那样的问题，本文主要针对以下经常发生的几种异常情况提供一些解决方案：</p><ol><li><p>本地工作区文件恢复</p></li><li><p>远程分支删除后，删除本地分支与其关联</p></li><li><p>修改提交时的备注内容</p></li><li><p>修改分支名，实现无缝衔接</p></li><li><p>撤回提交</p></li><li><p>撤销本地分支合并</p></li><li><p>恢复误删的本地分支</p></li><li><p>不确定哪个分支有自己提交的 commit</p></li></ol><h2 id="一-本地工作区文件恢复" tabindex="-1"><a class="header-anchor" href="#一-本地工作区文件恢复" aria-hidden="true">#</a> （一）本地工作区文件恢复</h2><p>大家都知道，一个文件夹中的文件如果被删掉了，那只有在垃圾箱里面找了。如果垃圾箱里面的也被删掉了，以笔者的常识在不借助工具的情况下怕是就找不到了，emmmm。。。</p><p>不过，关联了 Git 的文件和文件夹就不一样了，有了本地仓库和远程仓库的双重保护，找到一个被删除的文件也不过就分分钟，一个命令行的事情吧。</p><p><strong>语法</strong>：<code>git checkout &amp;lt;filename/dirname&amp;gt;</code></p><p><strong>命令</strong>：<code>git checkout 1.js</code></p><p>这一命令主要用于本地工作区文件的撤回，下图是一个工作区文件被删除后的完美恢复过程。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/7/1728f18283291583~tplv-t2oaga2asx-image.image" alt="1.png"></p><h2 id="二-远程分支删除后-删除本地分支及关联" tabindex="-1"><a class="header-anchor" href="#二-远程分支删除后-删除本地分支及关联" aria-hidden="true">#</a> （二）远程分支删除后，删除本地分支及关联</h2><p>为方便分支提交，一般情况下会用本地命令 <code>git branch \\--set-upstream-to=origin/master master</code> 建立本地分支与远程分支的关联，从 master 拉出的分支可以自动建立与远程已有分支的关联，这样可以很方便的使用 <code>git pull</code> 和 <code>git push</code> 拉取远程分支的代码和将本地分支提交到远程。</p><p>Git 远程分支删除之后，本地分支就无法成功推送到远程，想要重新建立与远程仓库的关联，就需要先删除其原本的与已删除的远程分支的关联。</p><p>如下图所示，需要删除的远程分支为 feature/test，使用 <code>git push origin \\--delete feature/test</code> 删除掉对应的远程分支之后，删除本地分支关联。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/7/1728f182788bc6fd~tplv-t2oaga2asx-image.image" alt="2(1).png"></p><p><strong>语法</strong>：<code>git branch \\--unset-upstream &amp;lt;branchname&amp;gt;</code></p><p><strong>命令</strong>：<code>git branch \\--unset-upstream feature/test</code></p><p>删除掉关联关系之后，用 <code>git branch \\-vv</code> 命令可查看到本地分支与远程分支的关联关系如下图所示，可观察到 feature/test 分支已经没有关联的远程分支了。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/7/1728f18278ea92bc~tplv-t2oaga2asx-image.image" alt="2(2).png"></p><h2 id="三-修改提交时的备注内容" tabindex="-1"><a class="header-anchor" href="#三-修改提交时的备注内容" aria-hidden="true">#</a> （三）修改提交时的备注内容</h2><p>平时提交代码很多时候因为军情紧急，会在刚提交的时候填写了自己不太满意的备注，但笔者本人有点强迫症，一定要把它改成想要的样子咋办。。。。，不要慌，还是有解决办法滴！</p><p>想要修改最近一次提交的“修改xxx功能”的备注：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/7/1728f1827947538b~tplv-t2oaga2asx-image.image" alt="3(1).png"></p><p><strong>语法</strong>：<code>git commit \\--amend</code></p><p><strong>命令</strong>：<code>git commit \\--amend</code></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/7/1728f18277ef285e~tplv-t2oaga2asx-image.image" alt="3(2).png"></p><p>使用 <code>git log \\--pretty=oneline</code> 查看内容，发现已经成功修改啦。<strong>需要注意的是此项命令会修改提交时的commit-id，即会覆盖原本的提交，需要谨慎操作</strong>。</p><h2 id="四-修改分支名-实现无缝衔接" tabindex="-1"><a class="header-anchor" href="#四-修改分支名-实现无缝衔接" aria-hidden="true">#</a> （四）修改分支名，实现无缝衔接</h2><p>开发中的大佬都是拥有极快手速的人，建了个分支一不小心打错了某个字母或者两个字母打反了，可能就与本意存在较大误差了，Git 提供一种已经拉取了分支，在上面开发了不少的内容，但后来发现原本拉的分支名字就有问题的修复方法。</p><p>例如，我们的想新建的分支名为 feature/story-13711，却写成了 feature/stor-13711：</p><p><strong>语法</strong>：<code>git branch \\-m &amp;lt;oldbranch&amp;gt; &amp;lt;newbranch&amp;gt;</code></p><p><strong>命令</strong>：<code>git branch \\-m feature/stor-13711 feature/story-13711</code></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/7/1728f1827655b047~tplv-t2oaga2asx-image.image" alt="4.png"></p><p>执行完之后发现文件的工作区已修改内容一点都没有变化，真正的实现了无痛过渡，皆大欢喜！</p><h2 id="五-撤回提交" tabindex="-1"><a class="header-anchor" href="#五-撤回提交" aria-hidden="true">#</a> （五）撤回提交</h2><p>日常工作中，可能由于需求变更、或者误操作等原因需要进行提交的撤回：</p><p>如下分析了各种原因撤销的场景，主要包括：</p><ul><li><p>已将更改交到本地存储，需要撤回提交</p></li><li><p>用新的提交内容替换上一次的提交</p></li><li><p>本地提交了错误的文件</p></li></ul><h3 id="已将更改提交到本地-需要撤回提交" tabindex="-1"><a class="header-anchor" href="#已将更改提交到本地-需要撤回提交" aria-hidden="true">#</a> 已将更改提交到本地，需要撤回提交</h3><p><strong>语法</strong>： <code>git reset \\--soft [&amp;lt;commit-id&amp;gt;/HEAD~n&amp;gt;]</code></p><p><strong>命令</strong>：<code>git reset \\--soft HEAD~1</code></p><p>命令执行完成后，查看文件变更记录，可发现如下图所示：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/8/172916e7e5ee340f~tplv-t2oaga2asx-image.image" alt="5(2).png"></p><p>文件变更记录与未提交之前的文件变更记录是一致的，只是撤销了 commit 的操作。</p><h3 id="用新的更改替换撤回的更改" tabindex="-1"><a class="header-anchor" href="#用新的更改替换撤回的更改" aria-hidden="true">#</a> 用新的更改替换撤回的更改</h3><p>提交之中可能有些地方需要优化，我们可以撤销本次的 commit 以及文件暂存状态，修改之后再重新添加到暂存区进行提交。</p><p><strong>语法</strong>： <code>git reset \\--mixed [&amp;lt;commit-id&amp;gt;/HEAD~n&amp;gt;]</code></p><p><strong>命令</strong>：<code>git reset \\--mixed HEAD~1</code></p><p>命令执行完成后，查看文件变更记录，可发现如下图所示：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/8/172916e7e651d942~tplv-t2oaga2asx-image.image" alt="5(3).png"></p><p>已变更的文件都未添加到暂存区，撤销了 commit 和 add 的操作。</p><h3 id="本地提交了错误的文件" tabindex="-1"><a class="header-anchor" href="#本地提交了错误的文件" aria-hidden="true">#</a> 本地提交了错误的文件</h3><p>本地将完全错误的，本不应提交的内容提交到了仓库，需要进行撤销，可以使用 --hard 参数</p><p><strong>语法</strong>： <code>git reset \\--hard [&amp;lt;commit-id&amp;gt;/HEAD~n&amp;gt;]</code></p><p><strong>命令</strong>：<code>git reset \\--hard HEAD~1</code></p><p>命令执行完成后，查看文件变更记录，可发现如下图所示：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/8/172916e7e7d1cf87~tplv-t2oaga2asx-image.image" alt="5(4).png"></p><p>已追踪文件的变更内容都消失了，撤销了 commit 和 add 的操作，同时撤销了本地已追踪内容的修改；未追踪的内容不会被改变。从上面的效果可以看到，文件的修改都会被撤销。<strong>-hard 参数需要谨慎使用</strong>。</p><h2 id="六-撤销本地分支合并" tabindex="-1"><a class="header-anchor" href="#六-撤销本地分支合并" aria-hidden="true">#</a> （六）撤销本地分支合并</h2><p>实际操作中，总会有很多的干扰，导致我们合并了并不该合并的分支到目标分支上。解决这种问题的方式有两种，<code>git reset</code> 和 <code>git revert</code>。 reset 的语法和命令之前已经介绍过，不做赘述， revert 的语法和命令和 reset 一致。但是产生的实际效果会有不同。</p><p>可以先来看下 revert 操作的实际效果，合并分支之后的效果如下图所示：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/7/1728f1834f183728~tplv-t2oaga2asx-image.image" alt="6(1).png"></p><p>撤销合并：</p><p><strong>语法</strong>：<code>git revert &amp;lt;commit-id&amp;gt;</code></p><p><strong>命令</strong>：<code>git revert 700920</code></p><p>下图为执行命令后的效果：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/7/1728f18389587505~tplv-t2oaga2asx-image.image" alt="6(2).png"></p><p>经过前后对比可知，revert 执行之后会在原本的记录中新增一条提交记录。</p><p>reset 如上 “本地文件撤销” 例子所述，会删除掉原本已有的提交记录，在合并分支中，会删除原本合并分支的记录。revert 则有不同，会保留原本合并分支的记录，并在其上新增一条提交记录，便于之后有需要仍然能够回溯到 revert 之前的状态。</p><p>从需要提交到远程分支的角度来讲，reset 能够“毁尸灭迹”，不让别人发现我们曾经错误的合并过分支（<strong>注：多人协作中，需要谨慎使用</strong>）；revert 则会将合并分支和撤回记录一并显示在远程提交记录上。</p><h2 id="七-恢复误删的本地分支" tabindex="-1"><a class="header-anchor" href="#七-恢复误删的本地分支" aria-hidden="true">#</a> （七）恢复误删的本地分支</h2><p>本地分支拉取之后，由于疏忽被删除，而且本地的分支并没有被同步到远程分支上，此时想要恢复本地分支。</p><p>误删的分支为 feature/delete，使用 <code>git reflog</code> 命令可查看到该仓库下的所有历史操作，如下图所示：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/7/1728f183a0d9a16e~tplv-t2oaga2asx-image.image" alt="7(1).png"></p><p><strong>语法</strong>：<code>git checkout \\-b &amp;lt;branch-name&amp;gt; &amp;lt;commit-id&amp;gt;</code></p><p><strong>命令</strong>：<code>git checkout \\-b feature/delete HEAD@{2}</code></p><p>命令执行完成后，分支恢复到 HEAD@{2} 的快照，即从 master 分支拉取 feature/delete 分支的内容，仍然缺少“新增xxx文件”的提交，直接将文件内容恢复到最新的提交内容，使用命令 <code>git reset \\--hard HEAD@{1}</code> 即可实现硬性覆盖本地工作区内容的目的。<code>git reflog</code> 命令获取到的内容为本地仓库所有发生过的变更，可谓恢复利器，既可向前追溯，亦可向后调整，满满的时光追溯器的赶脚啊。。。</p><h2 id="八-不确定哪个分支有自己提交的-commit" tabindex="-1"><a class="header-anchor" href="#八-不确定哪个分支有自己提交的-commit" aria-hidden="true">#</a> （八）不确定哪个分支有自己提交的 commit</h2><p>工作中会经常碰到一种场景，某个提交先后合并到了各个分支上，但后来发现提交的这个修改是有问题的，需要排查到底哪个分支包含这个提交，然后将其修复掉。</p><p>需要先确定有问题的提交的 commit-id :</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/7/1728f183ec0a41df~tplv-t2oaga2asx-image.image" alt="8(1).png"></p><p>然后查看本地所有的分支：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/7/1728f18428989319~tplv-t2oaga2asx-image.image" alt="8(2).png"></p><p>可以看到本地有 4 个分支，本地的分支数量非人为控制的，在使用状态的分支直接删掉也不合适，分支数量达到一定程度，一个一个分支查找也不现实。Git 提供了一种能够直接通过 commit-id 查找出包含该内容分支的命令。</p><p><strong>语法</strong>：<code>git branch \\--contains &amp;lt;commit-id&amp;gt;</code></p><p><strong>命令</strong>：<code>git branch \\--contains 700920</code></p><p>命令执行后可以看到包含该问题提交的分支如下图所示，就可以很方便的在对应分支上修复内容啦。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/7/1728f1842b31c3c5~tplv-t2oaga2asx-image.image" alt="8(3).png"></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>本文介绍的是实际工作场景中可能出现的几种异常情况及解决方式，希望能够对大家有所帮助，不足之处敬请指正。实际上现在已经有很多 Git 操作对应的工具可以使用，需要明白的是工具中的每个操作等同于 Git 命令行的哪个命令，会有什么样的结果，以避免一些不必要发生的错误。</p><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>',93),h={href:"https://www.edureka.co/blog/common-git-mistakes/#pushed",target:"_blank",rel:"noopener noreferrer"},u={href:"https://www.jianshu.com/p/ea6341224e89",target:"_blank",rel:"noopener noreferrer"},f={href:"https://juejin.cn/post/6844903614767448072",target:"_blank",rel:"noopener noreferrer"},x=e("h2",{id:"推荐阅读",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#推荐阅读","aria-hidden":"true"},"#"),t(" 推荐阅读")],-1),_={href:"https://juejin.cn/post/6844904153043435533",target:"_blank",rel:"noopener noreferrer"},b={href:"https://juejin.cn/post/6844903988081475591",target:"_blank",rel:"noopener noreferrer"},j={href:"https://juejin.cn/post/6844904038555729927",target:"_blank",rel:"noopener noreferrer"},v=e("h2",{id:"招贤纳士",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#招贤纳士","aria-hidden":"true"},"#"),t(" 招贤纳士")],-1),y=e("p",null,"政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。",-1),k=e("p",null,[t("如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 "),e("code",null,"ZooTeam@cai-inc.com")],-1),E=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/24/1737e6194e9c083d~tplv-t2oaga2asx-image.image",alt:""})],-1);function G(w,A){const a=g("ExternalLinkIcon");return r(),p("div",null,[c,e("p",null,[t("> 这是第 53 篇不掺水的原创，想获取更多原创好文，请扫 👆 上方二维码关注我们吧~"),d,t(" > 本文首发于政采云前端团队博客："),e("a",m,[t("一份值得收藏的 Git 异常处理清单"),o(a)])]),l,e("p",null,[e("a",h,[t("Git 错误集锦和修复方法"),o(a)])]),e("p",null,[e("a",u,[t("Git 中.gitignore的配置语法"),o(a)])]),e("p",null,[e("a",f,[t("git reset 和 git revert"),o(a)])]),x,e("p",null,[e("a",_,[t("图解 HTTP 缓存"),o(a)])]),e("p",null,[e("a",b,[t("可能是最全的 “文本溢出截断省略” 方案合集"),o(a)])]),e("p",null,[e("a",j,[t("图文并茂，为你揭开“单点登录“的神秘面纱"),o(a)])]),v,y,k,E])}const D=s(n,[["render",G],["__file","一份值得收藏的 Git 异常处理清单.html.vue"]]);export{D as default};
