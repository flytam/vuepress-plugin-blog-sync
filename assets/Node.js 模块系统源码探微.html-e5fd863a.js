import{_ as a,z as d,A as l,Y as e,C as n,U as s,a6 as r,Q as t}from"./framework-cb9358d9.js";const u={},v=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8d2b0103c1fa~tplv-t2oaga2asx-image.image",alt:""})],-1),c=e("h2",{id:"",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#","aria-hidden":"true"},"#"),n(" **")],-1),m=e("p",null,'<table><tbody><tr><td bgcolor="#FDFFE7"><font size="4">原创不易，希望能关注下我们，再顺手点个赞~~<font></font></font></td></tr></tbody></table> **',-1),o={href:"https://www.zoo.team/article/node-module",target:"_blank",rel:"noopener noreferrer"},p=r(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/8/16ee3b824d1351e7~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>Node.js 的出现使得前端工程师可以跨端工作在服务器上，当然，一个新的运行环境的诞生亦会带来新的模块、功能、抑或是思想上的革新，本文将带领读者领略 Node.js (以下简称 Node) 的模块设计思想以及剖析部分核心源码实现。</p><h2 id="commonjs-规范" tabindex="-1"><a class="header-anchor" href="#commonjs-规范" aria-hidden="true">#</a> CommonJS 规范</h2><p>Node 最初遵循 CommonJS 规范来实现自己的模块系统，同时做了一部分区别于规范的定制。CommonJS 规范是为了解决 JavaScript 的作用域问题而定义的模块形式，它可以使每个模块在它自身的命名空间中执行。</p><p>该规范强调模块必须通过 <code>module.exports</code> 导出对外的变量或函数，通过 <code>require()</code> 来导入其他模块的输出到当前模块作用域中，同时，遵循以下约定：</p><ul><li>在模块中，必须暴露一个 require 变量，它是一个函数，require 函数接受一个模块标识符，require 返回外部模块的导出的 API。如果要求的模块不能被返回则 require 必须抛出一个错误。</li><li>在模块中，必须有一个自由变量叫做 exports，它是一个对象，模块在执行时可以在 exports 上挂载模块的属性。模块必须使用 exports 对象作为唯一的导出方式。</li><li>在模块中，必须有一个自由变量 module，它也是一个对象。module 对象必须有一个 id 属性，它是这个模块的顶层 id。id 属性必须是这样的，<code>require(module.id)</code> 会从源出 <code>module.id</code> 的那个模块返回 exports 对象（就是说 module.id 可以被传递到另一个模块，而且在要求它时必须返回最初的模块）。</li></ul><h2 id="node-对-commonjs-规范的实现" tabindex="-1"><a class="header-anchor" href="#node-对-commonjs-规范的实现" aria-hidden="true">#</a> Node 对 CommonJS 规范的实现</h2><ul><li>定义了模块内部的 module.require 函数和全局的 require 函数，用来加载模块。</li><li>在 Node 模块系统中，每个文件都被视为一个独立的模块。模块被加载时，都会初始化为 Module 对象的实例，Module 对象的基本实现和属性如下所示：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function Module(id = &amp;quot;&amp;quot;, parent) {
  // 模块 id,通常为模块的绝对路径
  this.id = id;
  this.path = path.dirname(id);
  this.exports = {};
  // 当前模块调用者
  this.parent = parent;
  updateChildren(parent, this, false);
  this.filename = null;
  // 模块是否加载完成 
  this.loaded = false;
  // 当前模块所引用的模块
  this.children = [];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>每一个模块都对外暴露自己的 exports 属性作为使用接口。</li></ul><h2 id="模块导出以及引用" tabindex="-1"><a class="header-anchor" href="#模块导出以及引用" aria-hidden="true">#</a> 模块导出以及引用</h2><p>在 Node 中，可使用 module.exports 对象整体导出一个变量或者函数，也可将需要导出的变量或函数挂载到 exports 对象的属性上，代码如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 1. 使用 exports: 笔者习惯通常用作对工具库函数或常量的导出
exports.name = &amp;#39;xiaoxiang&amp;#39;;
exports.add = (a, b) =&amp;gt; a + b;
// 2. 使用 module.exports：导出一整个对象或者单一函数
...
module.exports = {
  add,
  minus
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过全局 require 函数引用模块，可传入模块名称、相对路径或者绝对路径，当模块文件后缀为 js / json / node 时，可省略后缀，如下代码所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 引用模块
const { add, minus } = require(&amp;#39;./module&amp;#39;);
const a = require(&amp;#39;/usr/app/module&amp;#39;);
const http = require(&amp;#39;http&amp;#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意事项：</p><ul><li><code>exports</code> 变量是在模块的文件级作用域内可用的，且在模块执行之前赋值给 <code>module.exports</code>。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>exports.name = &amp;#39;test&amp;#39;;
console.log(module.exports.name); // test
module.export.name = &amp;#39;test&amp;#39;;
console.log(exports.name); // test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>如果为 <code>exports</code> 赋予了新值，则它将不再绑定到 <code>module.exports</code>，反之亦然：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>exports = { name: &amp;#39;test&amp;#39; };
console.log(module.exports.name, exports.name); // undefined, test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>当 <code>module.exports</code> 属性被新对象完全替换时，通常也需要重新赋值 <code>exports</code>：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>module.exports = exports = { name: &amp;#39;test&amp;#39; };
console.log(module.exports.name, exports.name) // test, test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模块系统实现分析" tabindex="-1"><a class="header-anchor" href="#模块系统实现分析" aria-hidden="true">#</a> 模块系统实现分析</h2><h3 id="模块定位" tabindex="-1"><a class="header-anchor" href="#模块定位" aria-hidden="true">#</a> 模块定位</h3><p>以下是 <code>require</code> 函数的代码实现：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// require 入口函数
Module.prototype.require = function(id) {
  //...
  requireDepth++;
  try {
    return Module._load(id, this, /* isMain */ false); // 加载模块
  } finally {
    requireDepth--;
  }
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码接收给定的模块路径，其中的 requireDepth 用来记载模块加载的深度。其中 Module 的类方法 <code>_load</code> 实现了 Node 加载模块的主要逻辑，下面我们来解析 <code>Module._load</code> 函数的源码实现，为了方便大家理解，我把注释加在了文中。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Module._load = function(request, parent, isMain) {
  // 步骤一：解析出模块的全路径
  const filename = Module._resolveFilename(request, parent, isMain);
  
  // 步骤二：加载模块，具体分三种情况处理
  // 情况一：存在缓存的模块，直接返回模块的 exports 属性
  const cachedModule = Module._cache[filename];
  if (cachedModule !== undefined) 
    return cachedModule.exports;
  // 情况二：加载内建模块
  const mod = loadNativeModule(filename, request);
  if (mod &amp;amp;&amp;amp; mod.canBeRequiredByUsers) return mod.exports;
  // 情况三：构建模块加载
  const module = new Module(filename, parent);
  // 加载过之后就进行模块实例缓存
  Module._cache[filename] = module;
  
  // 步骤三：加载模块文件
  module.load(filename);
 
  // 步骤四：返回导出对象
  return module.exports;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="加载策略" tabindex="-1"><a class="header-anchor" href="#加载策略" aria-hidden="true">#</a> 加载策略</h2><p>上面的代码信息量比较大，我们主要看以下几个问题：</p><ol><li>模块的缓存策略是什么？ 分析上述代码我们可以看到，<code>_load</code> 加载函数针对三种情况给出了不同的加载策略，分别是：</li></ol><ul><li><p>情况一：缓存命中，直接返回。</p></li><li><p>情况二：内建模块，返回暴露出来的 exports 属性，也就是 module.exports 的别名。</p></li><li><p>情况三：使用文件或第三方代码生成模块，最后返回，并且缓存，这样下次同样的访问就会去使用缓存而不是重新加载。</p><ol start="2"><li>Module._resolveFilename(request, parent, isMain) 是怎么解析出文件名称的？</li></ol><p>我们看如下定义的类方法：</p></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Module._resolveFilename = function(request, parent, isMain, options) {
 if (NativeModule.canBeRequiredByUsers(request)) { 
 	// 优先加载内建模块
   return request;
 }
 let paths;
    
 // node require.resolve 函数使用的 options，options.paths 用于指定查找路径
 if (typeof options === &amp;quot;object&amp;quot; &amp;amp;&amp;amp; options !== null) {
   if (ArrayIsArray(options.paths)) {
     const isRelative =
       request.startsWith(&amp;quot;./&amp;quot;) ||
       request.startsWith(&amp;quot;../&amp;quot;) ||
       (isWindows &amp;amp;&amp;amp; request.startsWith(&amp;quot;.\\\\&amp;quot;)) ||
       request.startsWith(&amp;quot;..\\\\&amp;quot;);
     if (isRelative) {
       paths = options.paths;
     } else {
       const fakeParent = new Module(&amp;quot;&amp;quot;, null);
       paths = [];
       for (let i = 0; i &amp;lt; options.paths.length; i++) {
         const path = options.paths[i];
         fakeParent.paths = Module._nodeModulePaths(path);
         const lookupPaths = Module._resolveLookupPaths(request, fakeParent);
         for (let j = 0; j &amp;lt; lookupPaths.length; j++) {
           if (!paths.includes(lookupPaths[j])) paths.push(lookupPaths[j]);
         }
       }
     }
   } else if (options.paths === undefined) {
     paths = Module._resolveLookupPaths(request, parent);
   } else {
		//...
   }
 } else {
   // 查找模块存在路径
   paths = Module._resolveLookupPaths(request, parent);
 }
 // 依据给出的模块和遍历地址数组，以及是否为入口模块来查找模块路径
 const filename = Module._findPath(request, paths, isMain);
 if (!filename) {
   const requireStack = [];
   for (let cursor = parent; cursor; cursor = cursor.parent) {
     requireStack.push(cursor.filename || cursor.id);
   }
   // 未找到模块，抛出异常（是不是很熟悉的错误）
   let message = \`Cannot find module &amp;#39;\${request}&amp;#39;\`;
   if (requireStack.length &amp;gt; 0) {
     message = message + &amp;quot;\\nRequire stack:\\n- &amp;quot; + requireStack.join(&amp;quot;\\n- &amp;quot;);
   }
   
   const err = new Error(message);
   err.code = &amp;quot;MODULE_NOT_FOUND&amp;quot;;
   err.requireStack = requireStack;
   throw err;
 }
 // 最终返回包含文件名的完整路径
 return filename;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码中比较突出的是使用了 <code>_resolveLookupPaths</code> 和 <code>_findPath</code> 两个方法。</p><ul><li>_resolveLookupPaths: 通过接受模块名称和模块调用者，返回提供 <code>_findPath</code> 使用的遍历范围数组。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>   // 模块文件寻址的地址数组方法
   Module._resolveLookupPaths = function(request, parent) {
    if (NativeModule.canBeRequiredByUsers(request)) {
      debug(&amp;quot;looking for %j in []&amp;quot;, request);
      return null;
    }
   
    // 如果不是相对路径
    if (
      request.charAt(0) !== &amp;quot;.&amp;quot; ||
      (request.length &amp;gt; 1 &amp;amp;&amp;amp;
        request.charAt(1) !== &amp;quot;.&amp;quot; &amp;amp;&amp;amp;
        request.charAt(1) !== &amp;quot;/&amp;quot; &amp;amp;&amp;amp;
        (!isWindows || request.charAt(1) !== &amp;quot;\\\\&amp;quot;))
    ) {
      /** 
       * 检查 node_modules 文件夹
       * modulePaths 为用户目录，node_path 环境变量指定目录、全局 node 安装目录 
       */
      let paths = modulePaths;
   
      if (parent != null &amp;amp;&amp;amp; parent.paths &amp;amp;&amp;amp; parent.paths.length) {
        // 父模块的 modulePath 也要加到子模块的 modulePath 里面，往上回溯查找
        paths = parent.paths.concat(paths);
      }
   
      return paths.length &amp;gt; 0 ? paths : null;
    }
   
    // 使用 repl 交互时，依次查找 ./ ./node_modules 以及 modulePaths
    if (!parent || !parent.id || !parent.filename) {
      const mainPaths = [&amp;quot;.&amp;quot;].concat(Module._nodeModulePaths(&amp;quot;.&amp;quot;), modulePaths);
         
      return mainPaths;
    }
   
    // 如果是相对路径引入，则将父级文件夹路径加入查找路径
    const parentDir = [path.dirname(parent.filename)];
    return parentDir;
   };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>_findPath: 依据目标模块和上述函数查找到的范围，找到对应的 filename 并返回。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 依据给出的模块和遍历地址数组，以及是否顶层模块来寻找模块真实路径
Module._findPath = function(request, paths, isMain) {
 const absoluteRequest = path.isAbsolute(request);
 if (absoluteRequest) {
  // 绝对路径，直接定位到具体模块
   paths = [&amp;quot;&amp;quot;];
 } else if (!paths || paths.length === 0) {
   return false;
 }
 const cacheKey =
   request + &amp;quot;\\x00&amp;quot; + (paths.length === 1 ? paths[0] : paths.join(&amp;quot;\\x00&amp;quot;));
 // 缓存路径
 const entry = Module._pathCache[cacheKey];
 if (entry) return entry;
 let exts;
 let trailingSlash =
   request.length &amp;gt; 0 &amp;amp;&amp;amp;
   request.charCodeAt(request.length - 1) === CHAR_FORWARD_SLASH; // &amp;#39;/&amp;#39;
 if (!trailingSlash) {
   trailingSlash = /(?:^|\\/)\\.?\\.$/.test(request);
 }
 // For each path
 for (let i = 0; i &amp;lt; paths.length; i++) {
   const curPath = paths[i];
   if (curPath &amp;amp;&amp;amp; stat(curPath) &amp;lt; 1) continue;
   const basePath = resolveExports(curPath, request, absoluteRequest);
   let filename;
   const rc = stat(basePath);
   if (!trailingSlash) {
     if (rc === 0) { // stat 状态返回 0，则为文件
       // File.
       if (!isMain) {
         if (preserveSymlinks) {
           // 当解析和缓存模块时，命令模块加载器保持符号连接。
           filename = path.resolve(basePath);
         } else {
           // 不保持符号链接
           filename = toRealPath(basePath);
         }
       } else if (preserveSymlinksMain) {
         filename = path.resolve(basePath);
       } else {
         filename = toRealPath(basePath);
       }
     }
     if (!filename) {
       if (exts === undefined) exts = ObjectKeys(Module._extensions);
       // 解析后缀名
       filename = tryExtensions(basePath, exts, isMain);
     }
   }
   if (!filename &amp;amp;&amp;amp; rc === 1) { 
     /** 
       *  stat 状态返回 1 且文件名不存在，则认为是文件夹
       * 如果文件后缀不存在，则尝试加载该目录下的 package.json 中 main 入口指定的文件
       * 如果不存在，然后尝试 index[.js, .node, .json] 文件
     */
     if (exts === undefined) exts = ObjectKeys(Module._extensions);
     filename = tryPackage(basePath, exts, isMain, request);
   }
   if (filename) { // 如果存在该文件，将文件名则加入缓存
     Module._pathCache[cacheKey] = filename;
     return filename;
   }
 }
 const selfFilename = trySelf(paths, exts, isMain, trailingSlash, request);
 if (selfFilename) {
   // 设置路径的缓存
   Module._pathCache[cacheKey] = selfFilename;
   return selfFilename;
 }
 return false;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模块加载" tabindex="-1"><a class="header-anchor" href="#模块加载" aria-hidden="true">#</a> 模块加载</h2><h3 id="标准模块处理" tabindex="-1"><a class="header-anchor" href="#标准模块处理" aria-hidden="true">#</a> 标准模块处理</h3><p>阅读完上面的代码，我们发现，当遇到模块是一个文件夹的时候会执行 <code>tryPackage</code> 函数的逻辑，下面简要分析一下具体实现。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 尝试加载标准模块
function tryPackage(requestPath, exts, isMain, originalPath) {
  const pkg = readPackageMain(requestPath);
  if (!pkg) {
    // 如果没有 package.json 这直接使用 index 作为默认入口文件
    return tryExtensions(path.resolve(requestPath, &amp;quot;index&amp;quot;), exts, isMain);
  }
  const filename = path.resolve(requestPath, pkg);
  let actual =
    tryFile(filename, isMain) ||
    tryExtensions(filename, exts, isMain) ||
    tryExtensions(path.resolve(filename, &amp;quot;index&amp;quot;), exts, isMain);
  //...
  return actual;
}
// 读取 package.json 中的 main 字段
function readPackageMain(requestPath) {
  const pkg = readPackage(requestPath);
  return pkg ? pkg.main : undefined;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>readPackage 函数负责读取和解析 package.json 文件中的内容，具体描述如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function readPackage(requestPath) {
  const jsonPath = path.resolve(requestPath, &amp;quot;package.json&amp;quot;);
  const existing = packageJsonCache.get(jsonPath);
  if (existing !== undefined) return existing;
  // 调用 libuv uv_fs_open 的执行逻辑，读取 package.json 文件，并且缓存
  const json = internalModuleReadJSON(path.toNamespacedPath(jsonPath));
  if (json === undefined) {
    // 接着缓存文件
    packageJsonCache.set(jsonPath, false);
    return false;
  }
  //...
  try {
    const parsed = JSONParse(json);
    const filtered = {
      name: parsed.name,
      main: parsed.main,
      exports: parsed.exports,
      type: parsed.type
    };
    packageJsonCache.set(jsonPath, filtered);
    return filtered;
  } catch (e) {
    //...
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的两段代码完美地解释 package.json 文件的作用，模块的配置入口（ package.json 中的 main 字段）以及模块的默认文件为什么是 index，具体流程如下图所示：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/8/16ee35a83b53593d~tplv-t2oaga2asx-image.image" alt="图片"></p><h2 id="模块文件处理" tabindex="-1"><a class="header-anchor" href="#模块文件处理" aria-hidden="true">#</a> 模块文件处理</h2><p>定位到对应模块之后，该如何加载和解析呢？以下是具体代码分析：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Module.prototype.load = function(filename) {
  // 保证模块没有加载过
  assert(!this.loaded);
  this.filename = filename;
  // 找到当前文件夹的 node_modules
  this.paths = Module._nodeModulePaths(path.dirname(filename));
  const extension = findLongestRegisteredExtension(filename);
  //...
  // 执行特定文件后缀名解析函数 如 js / json / node
  Module._extensions[extension](this, filename);
  // 表示该模块加载成功
  this.loaded = true;
  // ... 省略 esm 模块的支持
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="后缀处理" tabindex="-1"><a class="header-anchor" href="#后缀处理" aria-hidden="true">#</a> 后缀处理</h2><p>可以看出，针对不同的文件后缀，Node.js 的加载方式是不同的，一下针对 <code>.js, .json, .node</code> 简单进行分析。</p><ul><li>.js 后缀 js 文件读取主要通过 Node 内置 API <code>fs.readFileSync</code> 实现。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Module._extensions[&amp;quot;.js&amp;quot;] = function(module, filename) {
 
  // 读取文件内容
  const content = fs.readFileSync(filename, &amp;quot;utf8&amp;quot;);
  // 编译执行代码
  module._compile(content, filename);
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>.json 后缀 JSON 文件的处理逻辑比较简单，读取文件内容后执行 <code>JSONParse</code> 即可拿到结果。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Module._extensions[&amp;quot;.json&amp;quot;] = function(module, filename) {
  // 直接按照 utf-8 格式加载文件
  const content = fs.readFileSync(filename, &amp;quot;utf8&amp;quot;);
  //...
  try {
    // 以 JSON 对象格式导出文件内容
    module.exports = JSONParse(stripBOM(content));
  } catch (err) {
	//...
  }
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>.node 后缀 .node 文件是一种由 C / C++ 实现的原生模块，通过 process.dlopen 函数读取，而 process.dlopen 函数实际上调用了 C++ 代码中的 DLOpen 函数，而 DLOpen 中又调用了 uv_dlopen, 后者加载 .node 文件，类似 OS 加载系统类库文件。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Module._extensions[&amp;quot;.node&amp;quot;] = function(module, filename) {
  //...
  return process.dlopen(module, path.toNamespacedPath(filename));
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面的三段源码，我们看出来并且可以理解，只有 JS 后缀最后会执行实例方法<code>_compile</code>,我们去除一些实验特性和调试相关的逻辑来简要的分析一下这段代码。</p><h2 id="编译执行" tabindex="-1"><a class="header-anchor" href="#编译执行" aria-hidden="true">#</a> 编译执行</h2><p>模块加载完成后，Node 使用 V8 引擎提供的方法构建运行沙箱，并执行函数代码，代码如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Module.prototype._compile = function(content, filename) {
  let moduleURL;
  let redirects;
  // 向模块内部注入公共变量 __dirname / __filename / module / exports / require，并且编译函数
  const compiledWrapper = wrapSafe(filename, content, this);
  const dirname = path.dirname(filename);
  const require = makeRequireFunction(this, redirects);
  let result;
  const exports = this.exports;
  const thisValue = exports;
  const module = this;
  if (requireDepth === 0) statCache = new Map();
  	//...
   // 执行模块中的函数
	result = compiledWrapper.call(
      thisValue,
      exports,
      require,
      module,
      filename,
      dirname
    );
  hasLoadedAnyUserCJSModule = true;
  if (requireDepth === 0) statCache = null;
  return result;
};
// 注入变量的核心逻辑
function wrapSafe(filename, content, cjsModuleInstance) {
  if (patched) {
    const wrapper = Module.wrap(content);
    // vm 沙箱运行 ，直接返回运行结果，env -&amp;gt; SetProtoMethod(script_tmpl, &amp;quot;runInThisContext&amp;quot;, RunInThisContext);
    return vm.runInThisContext(wrapper, {
      filename,
      lineOffset: 0,
      displayErrors: true,
      // 动态加载
      importModuleDynamically: async specifier =&amp;gt; {
        const loader = asyncESM.ESMLoader;
        return loader.import(specifier, normalizeReferrerURL(filename));
      }
    });
  }
  let compiled;
  try {
    compiled = compileFunction(
      content,
      filename,
      0,
      0,
      undefined,
      false,
      undefined,
      [],
      [&amp;quot;exports&amp;quot;, &amp;quot;require&amp;quot;, &amp;quot;module&amp;quot;, &amp;quot;__filename&amp;quot;, &amp;quot;__dirname&amp;quot;]
    );
  } catch (err) {
	//...
  }
  const { callbackMap } = internalBinding(&amp;quot;module_wrap&amp;quot;);
  callbackMap.set(compiled.cacheKey, {
    importModuleDynamically: async specifier =&amp;gt; {
      const loader = asyncESM.ESMLoader;
      return loader.import(specifier, normalizeReferrerURL(filename));
    }
  });
  return compiled.function;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码中，我们可以看到在<code>_compile</code> 函数中调用了 <code>wrapwrapSafe</code> 函数，执行了 <code>__dirname / __filename / module / exports / require</code> 公共变量的注入，并且调用了 C++ 的 runInThisContext 方法（位于 src/node_contextify.cc 文件）构建了模块代码运行的沙箱环境，并返回了 <code>compiledWrapper</code> 对象，最终通过 <code>compiledWrapper.call</code> 方法运行模块。</p><h2 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h2><p>至此，Node.js 的模块系统分析告一段落，Node.js 世界的精彩和绝妙无穷无尽，学习的路上和诸君共勉。</p><h2 id="招贤纳士" tabindex="-1"><a class="header-anchor" href="#招贤纳士" aria-hidden="true">#</a> 招贤纳士</h2><p>政采云前端团队（ZooTeam），一个年轻富有激情和创造力的前端团队，隶属于政采云产品研发部，Base 在风景如画的杭州。团队现有 50 余个前端小伙伴，平均年龄 27 岁，近 3 成是全栈工程师，妥妥的青年风暴团。成员构成既有来自于阿里、网易的“老”兵，也有浙大、中科大、杭电等校的应届新人。团队在日常的业务对接之外，还在物料体系、工程平台、搭建平台、性能体验、云端应用、数据分析及可视化等方向进行技术探索和实战，推动并落地了一系列的内部技术产品，持续探索前端技术体系的新边界。</p><p>如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“ 5 年工作时间 3 年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手推动一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 <code>ZooTeam@cai-inc.com</code></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image" alt=""></p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h2>`,70),b={href:"https://juejin.cn/post/6844903988081475591",target:"_blank",rel:"noopener noreferrer"},h={href:"https://juejin.cn/post/6844903981819379719",target:"_blank",rel:"noopener noreferrer"},f={href:"https://juejin.cn/post/6844903938018263048",target:"_blank",rel:"noopener noreferrer"};function x(g,q){const i=t("ExternalLinkIcon");return d(),l("div",null,[v,c,m,e("p",null,[n("> 本文首发于政采云前端团队博客： "),e("a",o,[n("Node.js 模块系统源码探微"),s(i)])]),p,e("ul",null,[e("li",null,[e("p",null,[e("a",b,[n("可能是最全的 “文本溢出截断省略” 方案合集"),s(i)])])]),e("li",null,[e("p",null,[e("a",h,[n("乾坤大挪移！React 也能 “用上” computed 属性"),s(i)])])]),e("li",null,[e("p",null,[e("a",f,[n("看完这篇，你也能把 React Hooks 玩出花"),s(i)])])])])])}const M=a(u,[["render",x],["__file","Node.js 模块系统源码探微.html.vue"]]);export{M as default};
