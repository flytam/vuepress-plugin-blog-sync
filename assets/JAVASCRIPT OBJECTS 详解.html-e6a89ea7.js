import{_ as i,z as a,A as s,Y as e,C as l,U as d,a6 as r,Q as t}from"./framework-cb9358d9.js";const v={},m=r(`<h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> **</h2><p>&lt;table&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td bgcolor=&quot;#FDFFE7&quot;&gt;&lt;font size=&quot;4&quot;&gt;原创不易，希望能关注下我们，再顺手点个赞~~&lt;font&gt;&lt;/font&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt; **</p><p>&gt; 作者简介：堂主，2006 年开始沉迷前端领域。工作历经淘宝前端开发团队、蘑菇街前端团队，现为政采云前端团队（ZooTeam）负责人，好烟不好酒，半个茶人。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/9/16e508252a17d46f~tplv-t2oaga2asx-image.image" alt="堂主.png"></p><p>ECMAscript 说明文档对这门语言的定义是“一门适于在宿主环境中执行计算及操作计算对象的面向对象的编程语言”。简单的说，JavaScript是一门面向对象（OO）的语言。</p><p>面向对象讲究的是专注于对象本身——它们的结构，它们互相间是如何影响的。本文是@堂主 对《Pro JavaScript with Mootools》一书的第三章 Object 部分的翻译，最早译于 2012 年。因为面向对象编程本身已经超出了本书的叙述范围，所以我们在本章所谈的只是 JavsScript 自身在面向对象方面的那些特点。</p><p>本篇译文字数约 3 万字，各位看官如发现翻译错误或有优化建议，欢迎留言指教，共同成长。另外，同样的建议——非本土产技术类书籍，建议还是优先阅读英文原版。</p><h2 id="javascript是基于原型的-javascript-is-prototypal-ish" tabindex="-1"><a class="header-anchor" href="#javascript是基于原型的-javascript-is-prototypal-ish" aria-hidden="true">#</a> JavaScript是基于原型的 JavaScript is Prototypal(-ish)</h2><p>所有面向对象的语言在其核心都会对对象进行处理，对象的创建及构造的过程将大部分的面向对象语言分为2个阵营：</p><ol><li><p><strong>基于类 (Classical or class-based) 的面向对象语言</strong>采用类来创建对象。类是一个为创建对象提供蓝本的特殊数据类型。在一个基于类的面向对象的语言中，我们通过创建类来定义一个对象的结构，并通过创建该类的实例来创造这个对象本身。这一过程被称为实例化 (instantiation)。</p></li><li><p><strong>基于原型 (Prototypal or prototype-based) 的面向对象语言</strong>没有类的概念，它以其他的对象对蓝本。在一个基于原型的语言中，prototype 是一个由你创建、体现着你期望的结构的对象，这个对象之后会成为其他对象创建所参照的蓝本。通过拷贝其本身 prototype 属性来创建实例的方式被成为克隆(cloning)。对一个纯粹的原型语言而言，任何一个对象都能被作为创建其他对象的原型。</p></li></ol><p>JavaScript 是一本基于原型的语言：这里没有类的概念，所有对象都是由其他对象创建而来。不过，JavaScript 不是一门纯粹的原型语言，在本章的后面我们会看到 JavaScript 还保留着一些基于类的残存特征。如果你已经对面向对象的语言很熟悉了，你很可能会觉得 JavaScript 是奇异的，因为相对你之前的那些面向对象的经验，这门语言的怪异特质是如此明显。</p><p>哈哈，先别打退堂鼓：JavaScript，一门面向对象的语言，因为兼备了基于类和原型的特征，使得它具备了处理复杂、庞大应用的实力。</p><h2 id="一门关于对象的语言-a-language-of-objects" tabindex="-1"><a class="header-anchor" href="#一门关于对象的语言-a-language-of-objects" aria-hidden="true">#</a> 一门关于对象的语言 (A Language of Objects)</h2><p>从本质上讲，一个 JavaScript 的对象就是一些<strong>名值对(key-value pairs)<strong>的聚合体。相比于简单的如字符串、数字等基本数据类型而言，JavaScript 对象是一种混合的复合数据类型。对象内的每一个名值对被称为一个</strong>属性(property)</strong>，key 被称为<strong>属性名(property name)</strong>，value 被称为<strong>属性值(property value)</strong>。</p><p>属性名一向是字符串，而属性值则可能是任何数据类型：字符串、数字、布尔值或者是复合型的数据类型如数组、函数或对象。尽管 JavaScript 并未将对象属性值可承载的数据类型做任何区分，但我们还是习惯的将用函数类型作为值的属性称为<strong>方法(methods)<strong>以与其他值为非函数类型的属性作区分。为了避免困惑，在后面的探讨中我们采用如下的惯例：以函数为值的属性称之为“方法”，其他的统称为“属性”。如果我们所指的同时可能为一个对象的方法或属性，那我们会称它们为这个对象的</strong>成员(members)</strong>。</p><p>&gt; 注意：在面对 JavaScript 是一门一等对象语言这个现实时，属性和方法间的区分会显得不那么清晰。本章的观点是：不论值是什么，一个对象内的成员都是一个属性，甚至是函数本身也可以被作为值来传递。</p><p>一个对象可以拥有多少属性是没有数量上的限制的，甚至一个对象可以拥有0个属性（此时表示这是一个空对象）。依照其用途，一个对象可以在某些情况下被称为是一个哈希(hash)、字典(dictionary) 或表(table)，折射出其结构是一组名值对。不过我们还是坚持在讨论时采用“对象”这一称呼。</p><p>创建一个对象最简单的办法是使用<strong>对象字面量(object literal)</strong>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 一个对象字面量
var person = {
    name : &amp;#39;Mark&amp;#39;,
    age : 23
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们创建了一个具有2个属性的新对象，一个键名是 name，另一个键名是 age，这个对象被存储在 person 变量里——这为我们提供了一个有2个成员的 person 对象。注意虽然 key 是字符串但我们并将其包含在引号里，只要是非保留字的有效标识符，在 JavaScript 中这就是容许的。对于下面的情况，我们需要用引号将 key 围起来：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 一个对象字面量
var person = {
    &amp;#39;name of the person&amp;#39; : &amp;#39;Mark&amp;#39;,
    &amp;#39;age of the person&amp;#39; : 23
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了引用一个对象中的成员，我们可以使用<strong>点记法(dot notation)</strong>，这可以使我们通过在属性名标识符之前置入一个句点来引用其对应的属性值；我们还可以使用<strong>括号记法(bracket notation)</strong>，这个方法通过为字符串的属性名标识符围上一个中括号 [ ] 来达到同样的引用属性值的目的。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 一个对象字面量
var person = {
    name : &amp;#39;Mark&amp;#39;,
    age : 23
};

// 点记法
console.log(person.name); // &amp;#39;Mark&amp;#39;

// 括号记法
console.log(person[&amp;#39;age&amp;#39;]); // 23
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际上点记法是括号记法的快捷方式、语法糖(syntactic sugar)，实际中大多数情况下我们都使用点记法。当然，点记法被限制在标识符是适当的情形下。在其他情况中，你需要使用括号记法。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var person = {
    &amp;#39;name of the person&amp;#39; : &amp;#39;Mark&amp;#39;,
    &amp;#39;age of the person&amp;#39; : 23
};

console.log(person[&amp;#39;name of the person&amp;#39;]); // &amp;#39;Mark&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当你不是采用一个字符串 key 而是采用一个对象来引用的时候，也需要使用括号记法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var person = {
    name : &amp;#39;Mark&amp;#39;,
    age : 23
};

var key = &amp;#39;name&amp;#39;;

console.log(person[key]); // &amp;#39;Mark&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问一个不存在的对象成员会返回 undefined。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var person = {};

console.log(person.name); // undefined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时我们还可以在一个对象创建之后动态的为其新增成员或改变某个成员的属性值。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var person = {name : &amp;#39;Mark&amp;#39;};

person.name = &amp;#39;Joseph&amp;#39;;
console.log(person.name); // &amp;#39;Joseph&amp;#39;

console.log(person.age); // undefined
person.age = 23;
console.log(person.age); // 23
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以通过为对象成员赋值为函数来创建方法。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var person = {
    name : &amp;#39;Mark&amp;#39;,
    age : 23,
    sayName : function() {
        console.log(this.name);
    }
};

console.log(typeof person.sayName); // &amp;#39;function&amp;#39;
person.sayName(); // &amp;#39;Mark&amp;#39;

person.sayAge = function() {
    console.log(this.age); // 23
};

console.log(typeof person.sayAge); // &amp;#39;function&amp;#39;
person.sayAge(); // 23
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你应该会注意到我们在方法中引用 person 对象的 name、age 属性使用的是 this.name 和 this.age 的方式。回顾一下我们前一章讨论过的部分，你会知道 this 关键字指的是包含方法等属性的对象的本身，所以在本例中 this 指代的就是 person 对象。</p><h2 id="对象的构建模块-the-buliding-blocks-of-objects" tabindex="-1"><a class="header-anchor" href="#对象的构建模块-the-buliding-blocks-of-objects" aria-hidden="true">#</a> 对象的构建模块（The Buliding Blocks of Objects）</h2><p>虽然对象字面量是一种创建对象的快捷方式，但它并不能完整的展示 JavaScript 面向对象的优势。比如，如果你需要创建 30 个 person 对象，那么对象字面量会是一种非常耗时的方式——为每一个对象都写一个对象字面量是不切实际的。为了更有效率，我们需要为我们需要的对象创建一个蓝本结构，并使用这个蓝本来创造对象的实例。</p><p>在基于类的面向对象语言中，我们可以为创建一个类来明确对象需要的结构；在基于原型的面向对象语言中，我们可以简化的创建一个 Person 对象来提供这个结构，之后克隆这个对象来获得我们需要的新对象。</p><h3 id="构造函数-constructor-functions" tabindex="-1"><a class="header-anchor" href="#构造函数-constructor-functions" aria-hidden="true">#</a> 构造函数（Constructor Functions）</h3><p>第一种途径是使用 JavaScript 的**构造函数(constructor functions，or constructors)**方式。对象字面量是对这种方式的一种简化版。下面2个对象是等价的。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 使用对象字面量
var personA = {
    name : &amp;#39;Mark&amp;#39;,
    age : 23
};

// 使用构造器
var personB = new Object();
personB.name = &amp;#39;Mark&amp;#39;;
personB.age = 23;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Object 函数是我们的构造器，采用 “var personB = new Object()” 方式和采用 “var personA = {}” 是等价的。采用 new Object()，我们创建了一个空对象，这个空对象被成为是 Object 的一个实例。</p><p>Object constructor 因其代表着JavaScript 的基础对象而显得与众不同：所有的对象，不论这些对象是由哪个 constructor 创建出来的，本质上都是 Object 的实例。使用 instanceof 操作符可以判断一个对象是否是一个 constructor 的实例。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 使用对象字面量
var personA = {};

// 使用构造器
var personB = new Object();

// 检测上面2个对象是否是Object的实例
conlose.log(personA instanceof Object) // true
conlose.log(personB instanceof Object) // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每一个对象都有一个名字为 constructor 的特殊属性，其是对创建该对象本身的 constructor 函数的引用。在我们上面的简单例子中，constructor的属性值是 Object constructor：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 使用对象字面量
var personA = {};

// 使用构造器
var personB = new Object();

// 检测是否使用了Object的constructor
conlose.log(personA.constructor == Object) // true
conlose.log(personB.constructor == Object) // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就像它的名字所示，constructor 函数，显然的，是一个函数。事实上，任何一个 JavaScript 函数都能被用作构造函数。这是JavaScript 对象处理方面的一个独特的地方。不同于在对象实例化时创建一个新的构造，Javascript 是依赖于现有的构造。</p><p>当然，你不必将你创造的所有函数都用作构造函数。大部分情况下，你会为你的类创建一个专用于构造目的的函数。一个构造函数和其他函数一样——除了自身细节上有些许区别——惯常的做法是将函数名首字母大写以表示其存在目的是作为一个构造函数。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 一个person构造函数
var Person = {};

// 以正规函数方式使用Person
var result = Person();
console.log(result); // undefined

// 以构造器函数调用Person
var person = new Person();

console.log(typeof person); // &amp;#39;object&amp;#39;
console.log(person instanceof Person); // true
console.log(person.constructor == Person); // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们通过一个简单的空函数来创建一个构造器。当Person函数被采用常规方式调用时，它返回 undefined。当我们在调用之前加上一个 new 关键字的时候，情况就变了：它返回了一个新对象。配合使用 new 关键字可以使一个函数被作为构造器使用进而产生一个对象的实例化。</p><p>在我们的例子中，new Person() 返回了一个空对象，这和使用 new Object() 的返回是一样的。这里的区别是，返回的对象不单单是 Object 的实例，同时也是 Person 的实例，并且该对象的 constructor 属性现在指向的是新的 Person 对象而非 Object 对象。不过返回的总归还是一个空对象。</p><p>回顾一下上一章讲到的，函数内的 this 关键字指向的是一个对象。在这个关于我们的 Person 函数的例子中，当它被作为平台函数调用时，引起被定义在全局作用域中，所以 this 关键字指向的对象是 global 对象。但当 Person 被作为一个构造函数时，情况就变了。this 关键字不再指向 global 对象，而是指向新创建出来的那个对象：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 一个全局变量
var fruit = &amp;#39;banana&amp;#39;;

// 我们的constructor
var Person = function() {
    console.log(this.fruit);
};

// 被作为普通函数使用时
fruit(); // &amp;#39;banana&amp;#39;

// 被作为constructor使用时
new Person(); // undefinded
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后一行的代码输出的是 undefined，这是因为 this.fruit 不再指向一个已存在的变量标识符。new 关键字的作用就是创建一个新对象，并将构造函数内的 this 指向这个新创建的对象。</p><p>在本章的开始部分，我们遇到了一个使用对象字面量创建多个对象的问题——我们需要一个方法来批量的创建对象的拷贝而非一个个的去敲代码把它们全写一遍。现在我们知道构造函数可以做到这一点，并且其内的 this 关键字指向的就是新创建的对象。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var Person = function(name, age) {
    this.name = name;
    this.age = age;
};

var mark = new Person(&amp;#39;Mark&amp;#39;, 23);
var joseph = new Person(&amp;#39;Joseph&amp;#39;, 22);
var andrew = new Person(&amp;#39;Andrew&amp;#39;, 21);

console.log(mark.name); // &amp;#39;Mark&amp;#39;
console.log(joseph.age); // 22
console.log(andrew.name + &amp;#39;, &amp;#39; + andrew.age); // &amp;#39;Andrew, 21&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你会注意到这里我们对构造函数进行了一些修改使其可以接受参数。这是因为构造函数和普通函数一样，只不过其内部的 this 关键字指向的是新创建的对象。当 new Person 被执行的时候，一个新的对象被创建出来，并且 Person 函数被调用。在构造函数内部，参数 name、age 被设置为同名对象属性的值，之后这个对象被返回。</p><p>使用构造函数可以很轻松的创建出和构造函数具有类似结构的新对象，并且不用费事的每次都为新对象用字面量的方式书写一遍结构。你可以在编码的开始阶段就创建一个定义了基本结构的构造函数，这对你以后为实例化的对象们增加新的属性或方法迟早会有帮助。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var Person = function(name, age) {
    this.name = name;
    this.age = age;
    this.log = function() {
        console.log(this.name + &amp;#39;, &amp;#39; + this.age);
    }
};

var mark = new Person(&amp;#39;Mark&amp;#39;, 23);
var joseph = new Person(&amp;#39;Joseph&amp;#39;, 22);
var andrew = new Person(&amp;#39;Andrew&amp;#39;, 21);

mark.log(); // &amp;#39;Mark, 23&amp;#39;
joseph.log(); // &amp;#39;Joseph, 22&amp;#39;
andrew.log(); // &amp;#39;Andrew, 21&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里你会看到我们在构造函数里新增了一个 log 方法，该方法会将对象的 name 和 age 信息打印出来。这样就避免了在对象实例化之后还要手工的为没一个对象增加 log 方法。</p><h3 id="原型-prototypes" tabindex="-1"><a class="header-anchor" href="#原型-prototypes" aria-hidden="true">#</a> 原型（Prototypes）</h3><p>看起来似乎构造函数已经是关于 JavaScript 对象创建的终极知识点了，但请注意，还没结束呢！我们现在还只说了二分之一而已。如果我们把自己局限在仅仅使用构造函数的范围，那么很快就会遇到新问题。</p><p>问题之一就是代码组织。在上一节的开头，我们想有一种简单的方法可以批量创建具有 name 和 age 属性的 person 对象，并且期望同时具备 setName、getName、setAge、getAge 等方法。如果按照我们现在的需求，沿用上一节的方式，最终我们的代码会变成下面这个样子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var Person = function(name, age) {

    // 属性
    this.name = name;
    this.age = age;

    // 方法
    this.setName = function(name) {
        this.name = name;
    }

    this.getName = function() {
        return this.name;
    }

    this.setAge = function(age) {
        this.age = age;
    }

    this.getAge = function() {
        return this.age;
    }

};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们的 Person 构造器开始变得肿胀了——这还仅是包含了2个属性和4个方法的时候！想想如果你要创建一个很复杂的应用，那构造函数得变得多么庞大！</p><p>另一个问题是可扩展性。假设我们有如下代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// constructor.js
var Person = function(name, age) {
    this.name = name;
    this.age = age;
    this.log = function() {
        console.log(this.name + &amp;#39;, &amp;#39; + this.age);
    }
};

// program.js
var mark = new Person(&amp;#39;Mark&amp;#39;, 23);
mark.log(); // &amp;#39;Mark, 23&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在Person是在外部引入的一个JS文件中定义的，我们在这个页面里引入定义了 Person 构造函数的 constructor.js 文件，并实例化了一个 mark 对象。现在问题来了，因为我们现在无法修改构造函数本身，那该如何为实例增加 setName、getName、setAge、getAge 等方法呢？</p><p>解决方案似乎很简单，既然不能通过修改构造函数来增加方法，那就直接给实例增加方法不就行了么~很快随着键盘的敲打，代码变成了下面这个样子。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// constructor.js
var Person = function(name, age) {
    this.name = name;
    this.age = age;
    this.log = function() {
        console.log(this.name + &amp;#39;, &amp;#39; + this.age);
    }
};

// program.js
var mark = new Person(&amp;#39;Mark&amp;#39;, 23);
mark.log(); // &amp;#39;Mark, 23&amp;#39;

mark.getName = function() {return this.name;}
mark.getAge = function() {return this.age;}

mark.getName(); // &amp;#39;Mark&amp;#39;
mark.getAge(); // 23

var joseph = new Person(&amp;#39;Joseph&amp;#39;, 22);
mark.log(); // &amp;#39;Joseph, 22&amp;#39;

// 下面的代码会引起报错
joseph.getName();
joseph.getAge();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然我们成功的为 mark 实例添加了需要的方法，但 joseph 实例并不能同样获得这些方法。此时我们遇到了和使用对象字面量一样的问题：我们必须为每一个对象的实例做同样的设置才行，这显然是不实用的。我们需要一个更有“疗效”的方法。</p><p>在本章的开头我们说过，Javascript 是一门基于原型的语言，基于原型的语言最重要的特征就是创建对象是通过对一个目标对象的拷贝来实现，而非通过类。但我们目前还未提及过拷贝，或者作为原型的目标对象，我们目前为止看到的都是构造函数配合着new关键字。</p><p>我们的线索就是new关键字。记住当我们使用 new Object 时，new 关键字创建了一个新的对象，并将该对象作为构造函数内this 关键字指向的对象。实际上，new 关键字并未创建一个新的对象：它只是拷贝了一个对象。这个被拷贝的对象不是别的，正是<strong>原型(prototype)</strong>。</p><p>所有能被作为构造函数使用的函数都有一个 prototype 属性，这个属性对象定义了你实例化对象的结构。当使用 new Object 时，一个对 Object.prototype 的拷贝被创造出来，这个拷贝就是新创建的那个实例对象。这是 Javascript 的另一个有趣的特点：不同于其它的原型语言——对它们来说，任何对象都能作为原型使用；但在Javascript中，却有一个专为作为原型使用 prototype 对象存在。</p><p>&gt; 注意：对 Javascript 而言，这是一种对其他原型性语言的模仿：对其他原型性语言而言，你可以直接克隆一个对象来得到新的对象，在 Javascript 中则是依赖克隆目标对象的 prototype 属性。在本章的最后一节你会学到实现这一做法。</p><p>prototype 对象，和其他对象一样，对其内部可容纳的成员没有数量上的限制，对其增加一个成员基本上就是简单的附加一个值而已。下面我们对之前的 Person 函数进行一番改写：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var Person = function(name, age) {
    this.name = name;
    this.age = age;
};

Person.prototype.log = function() {
    console.log(this.name + &amp;#39;, &amp;#39; this.age);
}

var mark = new Person(&amp;#39;Mark&amp;#39;, 23);
mark.log(); // &amp;#39;Mark, 23&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，我们将 log 方法的定义移出构造函数，通过 Person.prototype.log 的方式去定义，这样我们就能告诉解析器所有从 Person 构造函数实例化出来的对象都将具有 log 方法，所以最后一行的 mark.log() 会执行。剩余的构造函数还是保持原样，我们并未把 this.name 和 this.age 也放在 prototype 中去，因为我们还是希望在对象实例化之时就能初始化这些值。</p><p>有了 prototype 这个利器，我们就可以对开头的代码进行重构，并使其变得更具可维护性：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var Person = function(name, age) {
    this.name = name;
    this.age = age;
};

Person.prototype.setName = function(name) {
    this.name = name;
};

Person.prototype.getName = function() {
    return this.name;
};

Person.prototype.setAge = function(age) {
    this.age = age;
};

Person.prototype.getAge = function() {
    return this.age;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这段代码还可以像下面这样合并着来写：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var Person = function(name, age) {
    this.name = name;
    this.age = age;
};

Person.prototype = {

    setName : function(name) {
        this.name = name;
    },

    getName : function() {
        return this.name;
    },

    setAge : function(age) {
        this.age = age;
    },

    getAge : function() {
        return this.age;
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在好多了，再也没有那么多的东西拥挤在构造函数内了。而且以后一旦需要增加新的方法，只需要按照给 prototype 增加即可，而不用去重新整理构造函数。</p><p>我们曾经有的另一个问题（第一个是快捷创建多个实例对象，见上面）是在无法修改构造函数的情况下给实例成员添加新的方法，现在随着我们打通了一个通往构造函数的大门（prototype属性），我们可以轻松的在不通过构造函数的情况下为实例对象添加方法。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// person.js
var Person = function(name, age) {
    this.name = name;
    this.age = age;
};

// program.js
Person.prototype.log = function() {
    console.log(this.name + &amp;#39;, &amp;#39; + this.age);
};

var mark = new Person(&amp;#39;Mark&amp;#39;, 23);
mark.log(); // &amp;#39;Mark, 23&amp;#39;

var joseph = new Person(&amp;#39;Joseph&amp;#39;, 22);
joseph.log(); // &amp;#39;Joseph, 22&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在前面我们已经看到了一些简单的动态丰富 prototype 的例子。一个函数对象，以构造函数来确定其形式，并可通过Mootools 的 Function.implement 函数为其增加新的方法。所有 Javascript 函数其实都是 Function 对象的实例，Function.implement 实际上就是通过修改 Function.prototype 对象来实现的。虽然我们并不能直接操作 Function 的构造函数——一个由解析器提供的内置构造——但我们依然可以通过 Function.prototype 来为 Function 对象增加新的方法。对原生方法类型的增益我们将会在后面“衍生与原生”（Types and Natives）一节中进行讨论。</p><h3 id="继承-inheritance" tabindex="-1"><a class="header-anchor" href="#继承-inheritance" aria-hidden="true">#</a> 继承（Inheritance）</h3><p>为了更高的理解 Javascript 是一门基于原型的语言，我们需要区分原型与实例之间的区别。<strong>原型(prototype)<strong>是一个对象，它就像一个蓝本，用来定义我们需要的对象结构。通过对原型的拷贝，我们可以创造出一个该原型的</strong>实例(instance)</strong>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 动物的构造器
var Animal = function(name) {
    this.name = name;
};

// 动物的原型
Animal.prototype.walk = function() {
    console.log(this.name + &amp;#39; is walking.&amp;#39;);
};

// 动物的实例
var cat = new Animal(&amp;#39;Cat&amp;#39;);
cat.walk(); // &amp;#39;Cat is walking&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码中，构造函数 Animal 和它的 prototype 一起定义了 Animal 对象的结构，cat 对象是 Animal 的一个实例。当我们执行 new Animal() 语句，一个 Animal.prototype 的拷贝就被创建，我们称这个拷贝为一个<strong>实例(instance)</strong>。Animal.prototype 是一个只有一个成员的对象，这个唯一的成员是 walk 方法。自然，所有 Animal 的实例都会自动拥有 walk 这个方法。</p><p>那么，当我们在一个实例已经被创建之后再去修改 Animal.prototype ，会发生什么呢？</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 动物的构造器
var Animal = function(name) {
    this.name = name;
};

// 动物的原型
Animal.prototype.walk = function() {
    console.log(this.name + &amp;#39; is walking.&amp;#39;);
};

// 动物的实例
var cat = new Animal(&amp;#39;Cat&amp;#39;);
cat.walk(); // &amp;#39;Cat is walking&amp;#39;

// 难道动物不应该拥有吃(eat)这个方法吗？
console.log(typeof cat.eat); // undefined --&amp;gt; 没有 TT

// 给动物增加一个“吃”的方法
Animal.prototype.eat = function() {
    console.log(this.name + &amp;#39; is eating.&amp;#39;);
};

console.log(typeof cat.eat); // &amp;#39;function&amp;#39;
cat.eat(); // &amp;#39;Cat is eating&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>嘿，现在这发生的事有点意思哈？在我们创建好 cat 实例时候，检测 eat 方法显示的是 undefined。在我们给 Animal.prototype 对象新增了一个 eat 方法之后，cat 实例就拥有了吃的能力！实际上，cat 的“吃”的能力就是我们给 Animal.prototype 增加的那个函数。</p><p>看起来，似乎是不论我们什么时候给原型增加新的方法，这都会自动触发全部的实例进行一次更新。但记住当我们新创建一个对象，那么这个新的操作就会创建一个新的原型拷贝。当我们创建 cat 时，原型还仅拥有一个方法。如果这是一个纯粹的拷贝，那就不应该拥有我们之后才设置的 eat 方法。毕竟，当你复印了一份文档，之后在源文档上又写上一句 “天朝人民最幸福”，你不能指望那份复印的文档上也立即出现同样的字句，不是吗？</p><p>或者是解析器知道什么时候 prototype 新增了成员并自动给全部的实例都增加上这个方法？也许是当我们给原型增加了 eat 这个方法后，解析器便立刻给全部的 Animal 实例增加上了这个方法？对于这一点的验证是很简单的：我们可以先给实例设置一个 eat 的方法，之后再给原型增加 eat 方法。如果上面的猜测是对的，那么后增加的原型的 eat 方法会覆盖掉较早给 Animal 实例单独设置的那个 eat 方法。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 动物的构造器
var Animal = function(name) {
    this.name = name;
};

// 动物的原型
Animal.prototype.walk = function() {
    console.log(this.name + &amp;#39; is walking.&amp;#39;);
};

// 动物的实例
var cat = new Animal(&amp;#39;Cat&amp;#39;);
cat.walk(); // &amp;#39;Cat is walking&amp;#39;

// 给cat增加一个eat的方法
cat.eat = function() {
    console.log(&amp;#39;Meow. Cat is eating.&amp;#39;);
};

// 给动物增加一个“吃”的方法
Animal.prototype.eat = function() {
    console.log(this.name + &amp;#39; is eating.&amp;#39;);
};

cat.eat(); // &amp;#39;Meow. Cat is eating.&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很明显，前面的猜测是错误的。Javascript 解析器不会更新实例。那真实的情况到底是什么呢？</p><p>所有的对象都有一个叫做 proto 的内置属性，该属性指向该对象的原型。解析器利用该属性将对象“链接”到它对应的原型上。虽然在使用 new 关键字的时候确实是创建了一个原型的拷贝，且这个拷贝看起来确实很像原型本身，但它实际上却是一个“浅拷贝”。真相是，当这个实例被创建时，它实际上只是一个空对象，这个空对象的 proto 属性指向了其构造函数的 prototype 对象。</p><p>你可能会问：“等等，既然这个新的实例是一个空对象，那为什么它还会像其来源的原型那样具有属性和方法呢”？其实这就是 proto 属性的作用。实例对象通过 proto 属性链接到它的原型，这样它原型上的属性和方法也能被其实例对象访问到。在我们的例子中，cat 对象本身被没有 walk 的方法。当解析器读取到 cat.walk() 语句时，它首先检测 cat 对象自身的prototype 对象中有无 walk 这个方法成员，如果没有，就通过 cat 的 proto 属性上溯到其原型的 prototype 中去寻找 walk 方法。而正好在这里解析器找到了它需要的方法，于是我们的 cat 就能执行“走”的动作了。</p><p>这也能解释为什么上面的代码中最后 log 出的信息是“Meow. Cat is eating.”，因为我们给实例对象 cat 的 prototype 属性对象增加了 eat 这个方法成员，于是解析器先在这里找到了它需要的 “eat 方法，进而 cat 的原型 prototype 中的 eat 方法就不会起作用了。</p><p>一个实例对象的成员（属性啊方法啊神马的）来自于它的原型（而非是针对这个实例对象单独设置），被称为<strong>继承(inheritance)</strong>。对所有对象，你都能使用 hasOwnProperty 方法来检测某个成员是不是隶属于它。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var Animal = function() {};
Animal.prototype.walk = function() {};

var dog = new Animal();

var cat = new Animal();
cat.walk = function() {};

console.log(cat.hasOwnProperty(&amp;#39;walk&amp;#39;)); // true
console.log(dog.hasOwnProperty(&amp;#39;walk&amp;#39;)); // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们对 cat 使用 .hasOwnProperty(walk) 检测，返回为true，这是因为我们已经对 cat 单独设置了一个它自己的 walk 方法。对应的，因为 dog 对象并未被赋以一个单独的 walk 方法，所以检测结果为 false。另外，如果对 cat 采用 .hasOwnProperty(hasOwnProperty)，返回的同样会是 false。这是因为 hasOwnProperty 实际上是 Obiect 对象的方法，而 cat 对象由 Object 处继承而来。</p><p>现在有一个家伙需要我们好好的去考虑一下：this。在构造函数内的 this，其永远指向构造函数的实例化对象而非构造函数的 prototype 对象。但是在原型内定义的函数则遵循另一个法则：如果该方法是直接的由原型方式来调用，则该方法内的 this 指向的是这个原型对象本身；如果该方法由这个原型的实例化对象来引用，则方法内的 this 关键字就会指向这个实例化对象。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var Animal = function(name) {
    this.name = name;
};

Animal.prototype.name = &amp;#39;Animal&amp;#39;;

Animal.prototype.getName = function() {
    return this.name;
};

// 直接使用原型方法来调用“getName”
Animal.prototype.getName(); // 返回 &amp;#39;Animal&amp;#39;

var cat = new Animal(&amp;#39;Cat&amp;#39;);
cat.getName(); // 返回 &amp;#39;Cat&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们对代码进行了一些小的修改，以便 Animal.prototype 可以有其自己的 name 属性。当我们直接用原型方式调用 getName 时，返回的是 Animal.prototype 的 name 属性。但当我们通过实例化对象去执行 cat.getName() 时，返回的就是 cat 的 name 属性。</p><p>原型和实例是不同的对象，它们之间唯一的联系是：针对原型做的修改会反射到所有该原型的实例对象，但对某具体实例对象的修改却只对该实例对象本身起作用。</p><p>记住在 Javascript 中同时存在着基本数据类型和复合数据类型。如字符串、数字以及布尔值等都属于基本数据类型：当它们被作为参数传递给函数或被赋值于一个变量时，被使用的都是它们的<strong>拷贝</strong>。而像数组、函数、对象这样的复合数据类，被使用的则是它们的<strong>引用</strong>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 创建一个对象
var object = {name : &amp;#39;Mark&amp;#39;};

// 把这个对象“拷贝”给另一个变量
var copy = object;

console.log(object.name); // &amp;#39;Mark&amp;#39;
console.log(copy.name); // &amp;#39;Mark&amp;#39;

// 更改copy对象的name值
copy.name = &amp;#39;Joseph&amp;#39;;

console.log(object.name); // &amp;#39;Joseph&amp;#39;
console.log(copy.name); // &amp;#39;Joseph&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当 var copy = object 被执行时，没有新的对象被创建出来。copy 变量其实只是指向了 object 所指向的同一个对象。object 和 copy 现在都是指向同一个对象，自然从 copy 处对其指向对象做的改动，object 也会得到反射。</p><p>对象可以拥有复合数据类型的成员，对象自身的 prototype 也同样如此。所以便出现了下面这个需要被注意的问题：当给一个指向复合数据类型的原型增加新的成员时，因为所有该原型的实例对象也都指向该原型本身，所以对原型的改动也会被继承。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var Animal = function() {};

Animal.prototype.data = {
    name : &amp;#39;animal&amp;#39;,
    type : &amp;#39;unknow&amp;#39;
};

Animal.prototype.setData = function(name, type) {
    this.data.name = name;
    this.data.type = type;
};

Animal.prototype.getData = function() {
    console.log(this.data.name + &amp;#39;: &amp;#39; + this.data.type);
};

var cat = new Animal();
cat.setData(&amp;#39;Cat&amp;#39;, &amp;#39;Mammal&amp;#39;);
cat.getData(); // &amp;#39;Cat: Mammal&amp;#39;

var shark = new Animal();
shark.setData(&amp;#39;Shark&amp;#39;, &amp;#39;Fish&amp;#39;);
shark.getData(); // &amp;#39;Shark: Fish&amp;#39;

cat.getData(); // &amp;#39;Shark: Fish&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为我们的 cat 和 shark 对象都没有自己的 data 属性，所以它们从 Animal.prototype 处继承而来，所以 cat.data 和 shark.data 都指向了 Animal.prototype 中定义的 data 对象，对任何一个实例的 data 对象的更改都会引起我们不希望看到的行为。</p><p>最简单的解决办法就是将 data 属性从 Animal.prototype 中移除并在每个实例对象中单独定义它们。通过构造函数来实现这一点是很简单的。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var Animal = function() {
    this.data = {
        name : &amp;#39;animal&amp;#39;,
        type : &amp;#39;unknow&amp;#39;
    };
};

Animal.prototype.setData = function(name, type) {
    this.data.name = name;
    this.data.type = type;
};

Animal.prototype.getData = function() {
    console.log(this.data.name + &amp;#39;: &amp;#39; + this.data.type);
};

var cat = new Animal();
cat.setData(&amp;#39;Cat&amp;#39;, &amp;#39;Mammal&amp;#39;);
cat.getData(); // &amp;#39;Cat: Mammal&amp;#39;

var shark = new Animal();
shark.setData(&amp;#39;Shark&amp;#39;, &amp;#39;Fish&amp;#39;);
shark.getData(); // &amp;#39;Shark: Fish&amp;#39;

cat.getData(); // &amp;#39;Cat: Mammal&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为此时构造函数内的 this 关键字在此处是指向实例化对象的，所以 this.data 也就为每一个对象单独赋予了一个 data 属性，且不会影响到构造函数的原型。进而会看到，最后的输出结果也正是我需要的那样。</p><h3 id="原型链-the-prototype-chain" tabindex="-1"><a class="header-anchor" href="#原型链-the-prototype-chain" aria-hidden="true">#</a> 原型链（The Prototype Chain）</h3><p>在 Javascript 中，Object 是基础对象模型。其他对象不论是具备如何不同的构造，都是会从 Object 对象处获得继承。下面的代码足够帮助我们来理解这一点：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var object = new Object();

console.log(object instanceof Object); // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为我们是按照 Object 的构造函数来创建的 object 对象，所以我们可以说 object 对象的内部属性 proto 指向的就是 Object 的 prototype 属性。现在，再来看下面这段代码。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var Animal = function()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>{};</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var cat = new Animal();

console.log(cat instanceof Animal); // true
console.log(cat instanceof Object); // true
console.log(typeof cat.hasOwnProperty()); // &amp;#39;function&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为使用 new Animal() 的缘故，所以我们知道 cat 实际上是一个 Animal 的实例。而且我们还知道所有对象都有一个继承自 Object 的 hasOwnProperty 属性。于是我们就要问了，既然 object 对象的 proto 属性现在指向的是 Animal 的原型，那这里又是怎么做到的 object 能在未涉及 Object 构造函数的情况下还能同时从 Animal 和 Object 获得继承呢？</p><p>答案就在原型之间。默认情况下，构造函数的 prototype 对象是一个不含任何方法只含有其构造函数中设置的属性的基本对象。这听起来很熟悉不是吗？这和我们使用 new Object() 创造出来的对象是一样的！实际上我们的代码还可以像下面这样来写。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var Animal = function() {};

Animal.prototype = new Object();

var cat = new Animal();

console.log(cat instanceof Animal); // true
console.log(cat instanceof Object); // true
console.log(typeof cat.hasOwnProperty()); // &amp;#39;function&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在就已经很清晰了，Animal.prototype 由 Object.prototype 处继承而来。对于一个实例而言，除了会从它自身的 prototype 对象继承之外，还会从 它原型的原型的 prototype 对象处继承。</p><p>感到费解？那就通过对上面的代码进行分析来加强一下对这点的理解。我们的 cat 对象是由 Animal 对象实例化而来，所以 cat 会继承 Animal.prototype 的属性和方法。而 Animal.prototype 是由 Object 实例化而来，所以 Animal.prototype 会继承 Object.prototype 的属性和方法。进而 cat对象 会同时继承 Animal.prototype 和 Object.prototype 的属性和方法，所以我们说 cat 是**间接继承(indirectly inherits)**了 Object.prototype 对象。</p><p>我们的 cat 对象的 proto 属性指向了 Animal.prototype 对象；而 Animal 的 proto 属性则指向 Object.prototype 对象。这种 prototype 原型之间持续的链向被称为<strong>原型链(prototype chain)</strong>。进而我们说 cat 对象的原型链展度为从其自身一直到 Object.prototype。</p><p>&gt; 注意：所有对象原型链的终点都是 Object.prototype，且 Object 的 proto 属性不指向任何一个对象——否则原型链就会变得没有边界而导致基于原型链的上溯流程变得无法终止。Object.prototype 对象本身非由任何构造函数产生，而是由解析器内置的方法创建，这使得 Object.prototype 成为唯一一个不是由 Object 实例化而来的对象。</p><p>沿着一个对象的原型链查找属性或方法的行为我们称之为遍历(traversal)。当解析器遇到 cat.hasOwnProperty 语句时，解析器首先在当前对象的 prototype 对象中查找相关方法。如果没有，则顺序的在原型链上下一个对象—— Animal.prototype 上查找。还是没有，则继续在下一个对象的 prototype 上查找，以此类推。一旦解析器找到了它要的方法，解析器就会使用当前找到的这个方法，其在原型链上的遍历也会停止。如果解析器在整个原型链上都找不到它需要的方法，它就会返回 undefined。在我们的例子中，解析器最后在 Object.prototype 对象上找到了 hasOwnProperty 方法。</p><p>一个对象总是属于至少一个构造函数的实例：不论是使用对象字面量还是对象构造函数创造出来的对象，总都属于 Object 的实例。对那些非直接由 Object 构造函数创造出来的对象而言，它们既是直接创建它们的构造函数的实例，同时还是它们原型链上所有 prototype 对象对应的构造函数的实例。</p><h3 id="有考量的原型链-deliberate-chains" tabindex="-1"><a class="header-anchor" href="#有考量的原型链-deliberate-chains" aria-hidden="true">#</a> 有考量的原型链（Deliberate Chains）</h3><p>一旦我们要创建更为复杂的对象，原型链就会变得非常有用。比如我们现在要创建一个 Animal 对象：所有的动物都有名字(name)，所有的动物还要能够吃东西(eat)来活下去。OK，下面是我们的代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var Animal = function(name) {
    this.name = name;
};

Animal.prototype.eat = function() {
    console.log(&amp;#39;The &amp;#39; + this.name + &amp;#39; is eating.&amp;#39;);
};

var cat = new Animal(&amp;#39;cat&amp;#39;);
cat.eat(); // &amp;#39;The cat is eating&amp;#39;

var bird = new Animal(&amp;#39;bird&amp;#39;);
bird.eat(); // &amp;#39;The bird is eating&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>目前为止一切都还好。不过现在需要动物们能发出声音，于是我们需要增加新的方法。显然，这些动物发出的声音应该是不一样的：猫咪的叫声是“meow”，小鸟的叫声是“tweet”。我们可以为每一个动物实例单独设置发声的方法，但显然在面对一个需要创造多个猫咪和小鸟的需求面前，这种做法是不合事宜的。我们似乎还可以通过为 Animal.prototype 增加方法来达到猫咪和小鸟等实例都具备发声的能力，但这还是在浪费精力：因为猫咪不会发出“tweet”的声音，小鸟也不会“meow”的叫。</p><p>那我们为每个实例对象自身的构造函数单独设置方法行不行呢？我们可以制造出 Cat、Bird 的构造器并为其分别设置不同的发声方式。而“吃”的能力则还是从 Animal.prototype 那继承而来：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var Animal = function(name) {
    this.name = name;
};

Animal.prototype.eat = function() {
    console.log(&amp;#39;The &amp;#39; + this.name + &amp;#39; is eating.&amp;#39;);
};

var Cat = function() {};

Cat.prototype = new Animal(&amp;#39;cat&amp;#39;);

Cat.prototype.meow = function() {
    console.log(&amp;#39;Meow!&amp;#39;);
};

var Bird = function() {};

Bird.prototype = new Animal(&amp;#39;bird&amp;#39;);

Bird.prototype.tweet = function() {
    console.log(&amp;#39;Tweet!&amp;#39;);
};

var cat = new Cat();
cat.eat(); // &amp;#39;The cat is eating&amp;#39;
cat.meow(); // &amp;#39;Meow!&amp;#39;

var bird = new Bird();
bird.eat(); // &amp;#39;The bird is eating&amp;#39;
bird.tweet(); // &amp;#39;Tweet!&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，我们保留了原有的 Animal 构造函数，并且基于它新建了另外两个更具体的构造函数——Cat 和 Bird。之后我们分别为 Cat 和 Bird 设置了它们自己的发声方式。这样，我们最终的实例对象猫咪和小鸟就都能发出它们各自不同的叫声了。</p><p>在基于类的程序语言中，这种直接继承了其实例化来源的类的特征，且更具针对性的分支被称为<strong>子类(subclassing)</strong>。Javascript，则是一门基于原型的语言，并没有类的概念，就其本质而言，我们唯一所做的就是创造了一个<strong>有考量的原型链(deliberate prototype chain)</strong>。这里之所以用“有考量”这个词，是因为我们显然是有意的设计了哪些对象应该出现在我们的实例原型链上。</p><p>原型链上的成员数量没有限制，你还可以通过丰富原型链上的对象来满足更有针对性的需求。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var Animal = function(name) {
    this.name = name;
};

Animal.prototype.eat = function() {
    console.log(&amp;#39;The &amp;#39; + this.name + &amp;#39; is eating.&amp;#39;);
};

var Cat = function() {};

Cat.prototype = new Animal(&amp;#39;cat&amp;#39;);

Cat.prototype.meow = function() {
    console.log(&amp;#39;Meow!&amp;#39;);
};

var Persian = function() {
   this.name = &amp;#39;persian cat&amp;#39;;
};

Persian.prototype = new Cat();

Persian.prototype.meow = function() {
    console.log(&amp;#39;Meow...&amp;#39;);
};

Persian.prototype.setColor = function() {
    this.color = color;
};

Persian.prototype.getColor = function() {
    return this.color;
};

var king = new Persian();
king.setColor(&amp;#39;black&amp;#39;);
king.getColor(); // &amp;#39;black&amp;#39;
king.eat(); // &amp;#39;The persian cat is eating&amp;#39;
king.meow(); // &amp;#39;Meow...&amp;#39;

console.log(king instanceof Animal); // true
console.log(king instanceof Cat); // true
console.log(king instanceof Persian); // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们创造了一个名为 Persian(波斯猫) 的 Cat 分支。你会注意到这里我们设置了一个 Persian.prototype.meow 的方法，这个方法在 Persian 的实例中会覆盖掉 Cat.prototype.meow。如果你检查一下，会发现 king 对象分别是 Animal、Cat 和 Persian 的实例，这也说明了我们原型链的设计是正确的。</p><p>原型链真正的威力在于继承与原型链遍历的结合。因为原型链上所有的 prototype 对象都是链起来的，所以原型链上某一点的改变会立即反射到它所指向的其他成员对象。如果我们给 Animal.prototype 新增一个方法，那么所有 Animal 的实例都会新增加上这个方法。这位我们批量的为对象扩充方法提供了简易快捷的方式。</p><p>如果你的程序正变得愈加庞大，那么有考量的原型链会帮助你的代码更具结构性。不同于把所有的代码都塞进一个 prototype 对象中，你可以创建多重的具备良好设计的 prototype 对象，这对减少代码量、提升代码的可维护性都很有好处。</p><h3 id="简化原型的编程-simplified-prototypal-programming" tabindex="-1"><a class="header-anchor" href="#简化原型的编程-simplified-prototypal-programming" aria-hidden="true">#</a> 简化原型的编程（Simplified Prototypal Programming）</h3><p>现在你应该已经意识到 Javascript 的面向对象风情有其独到的范式。Javascript 所谓的“基于原型的程序语言”很大程度上是仅限于名义上的。Javascript 中有着本应是在基于类的语言中才会出现的构造函数和 new 关键字的组合，同时将从原型——这个显著的原型式语言的特征——处继承来的东西作为其用以实现针对性 prototype 对象的依据，而这些更具针对性的 prototype 对象，则是那么的类似类式语言中的子类。这门语言在对象机制实现方面的设计一定程度上受到了当时程序语言潮流的影响：在这门语言被创建的那个时代，基于类的程序语言处于正统的标准地位。所以，最终的决定就是为这门新语言赋予一些同类式语言相似的特征。</p><p>尽管如此，Javascript 依然是一门灵活的语言。虽然我们不能改变在其核心中定义的对象的实现机制，但我们依然可使用现有手段令这门语言散发出更纯粹的原型式风格（当然我们在下一章中会看到另一种流派——如何使这门语言在实际中更具备类式风格）。</p><p>在我们现在所讨论的简化原型的范畴内，让我们把视线从 Javascript 本身那具备复合性特征的原型上先移开，只先关注对象本身。不同于先创建一个构造函数之后再设置其 prototype，我们使用真的对象作为原型来创建新的对象，并将其prototype属性“克隆”到新创建的对象身上。为了更明确的说明我们要做的，这里先举一个例子，这个例子来自另一个纯粹的原型式程序语言 IO：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Animal := Object clone
Animal name := &amp;quot;animal&amp;quot;

Cat := Animal clone
Cat name := &amp;quot;cat&amp;quot;

myCat := Cat clone
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然这不是一本关于 IO 语言的书，但我们还是从基础讲起。同 Javascript 一样，IO 中的基础对象也是 Object。不过，这里的 Object 并不是一个构造器（厄，一个函数），而是一个真正的对象。在我们代码的开始部分，我们创造了一个新的对象—— Animal，这个新对象由源对象 Object 处克隆而来。因为在 IO 语言中，空格用来访问属性，所以 Object clone 语句的含义就是“使用 Object 的 clone 方法并执行它”。之后我们为 Animal 的 name 属性设置了一个字符型的值，通过克隆 Animal 创建了一个名为 Cat 的新对象，同时我也为这个 Cat 对象设置了 name 属性，最后我们克隆 Cat 得到一个 myCat 对象。</p><p>我们可以在 Javascript 中实现类似的事：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var Animal = function() {};
Animal.prototype = new Object();
Animal.prototype.name = &amp;#39;animal&amp;#39;;

var Cat = function() {};
Cat.prototype = new Object();
Cat.prototype.name = &amp;#39;cat&amp;#39;;

var myCat = new Cat();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很像，但却不完全一样。在 IO 的例子中，最终的 myCat 是直接由 Cat、Animal、Object 处克隆而来的，这些都是纯粹的对象而非构造器。但在我们的 Javascript 的例子中，最终的 myCat 对象则是由Cat、Animal、Object 等对象的 prototype 属性继承而来，Cat、Animal、Object 等也都是函数而非对象。换句话说。IO 没有构造函数的概念，一切都是直接从对象克隆而来。但 Javascript 却有构造函数，且克隆的是 prototype。</p><p>如果我们能控制内部属性 proto，那么我们就能在 Javascript 中实现和 IO 一样特性。 例如，假如我们有一个 Animal 对象和一个 Cat 对象，我们可以改变 Cat 对象的 proto属性使之直接链向 Animal 对象（而非链向 Animal 的 prototype 对象）本身，这样 Cat 就能直接继承 Animal 对象。</p><p>因为 proto 属性是内置属性不能直接修改它，但一些 Javascript 解析器却引入了一个和其类似的名为 <strong>proto</strong> 的属性。一个对象的 <strong>proto</strong> 属性被用作更改其内置的 proto 属性，以使其可以直接链向其他对象。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var Animal = {
    name : &amp;#39;animal&amp;#39;,
    eat : function() {
        console.log(&amp;#39;The &amp;#39; + this.name + &amp;#39; is eating.&amp;#39;)
    }
};

var Cat = {name : &amp;#39;cat&amp;#39;};
Cat.__proto__ = Animal;

var myCat = {};
myCat.__proto__ = Cat;

myCat.eat(); // &amp;#39;The cat is eating.&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里不存在构造函数，Animal 和 Cat 对象直接由字面量创建。通过 Cat.<strong>proto</strong> = Animal 语句我们告诉解析器 Cat 的 proto 属性直接指向 Animal 对象。最后 myCat 对象都直接从 Cat 和 Animal 处得到继承，在 myCat 的原型链上也不存在任何为 prototype 的对象。这个简化的原型模型不包含任何的构造器或原型属性，而是替代的将真实的对象本身放置其原型链上。</p><p>类似的，你可以使用 Object.create 方法来达到同样的效果，这个新函数目前已经被 ECMAScript 5 正式引入。它只接受一个参数，该参数为一个对象，其执行的结果是创建一个空对象，而这个对象的 proto 属性将被指向作为参数传入的那个对象。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var Animal = {
    name : &amp;#39;animal&amp;#39;,
    eat : function() {
        console.log(&amp;#39;The &amp;#39; + this.name + &amp;#39; is eating.&amp;#39;)
    }
};

var Cat = Object.create(Animal);
Cat.name = &amp;#39;cat&amp;#39;;

var myCat = Object.create(Cat);
myCat.eat(); // &amp;#39;The cat is eating.&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意这里的 Object.create 方法和 IO 里的 clone 方法很想象，实际上，它们实现的也是同一件事。我们可以使用 Object.create 方法非常高仿的实现 IO 语言的那个片段：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var Animal = Object.create({});
Animal.name = &amp;#39;animal&amp;#39;;

var Cat = Object.create(Animal);
Cat.name = &amp;#39;cat&amp;#39;;

myCat = Object.create(Cat);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不幸的是，虽然上面的两种方式都很美妙，但它们却不能兼容所有平台。<strong>proto</strong> 属性目前还不属于正式的 ECMAScript 规范，所以并不是所有的解析器都对其提供支持。而 Object.create() 方法，虽然是规范中的一员，但该规范却是指 ECMAScript 5。因该规范是2009年才颁布的，所以目前也不是所有解析器都能提供完整的支持。如果你希望写出具有更好兼容性的代码（尤其是 web app 程序），就尤其要记住这2种方式都不是通用方案。</p><p>现在有一种方案可以使较为古老的解析器也能支持 Object.create 方法。就是记住 Javascript 对象通过引用来起作用，如果你将一个对象存储在变量 x 中，之后操作 y = x，那么 y 和 x 将同时指向同一个对象。同时，一个函数的 prototype 属性也是一个对象，而这个对象的初始值可以很轻易的通过被分配给一个新的对象值来覆盖：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var Animal = {
    name : &amp;#39;animal&amp;#39;,
    eat : function() {
        console.log(&amp;#39;The &amp;#39; + this.name + &amp;#39; is eating.&amp;#39;)
    }
};

var AnimalProto = function() {};
AnimalProto.prototype = Animal;

var Cat = new AnimalProto();
console.log(typeof cat.purr); // &amp;#39;undefinded&amp;#39;

Animal.purr = function() {};
console.log(typeof cat.purr); // &amp;#39;function&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码现在看来应该有些眼熟了吧。我们首先创建了一个有着2个成员（一个name 属性、一个 eat 方法）的 Animal 对象，之后我们创建了一个名为 AnimalProto 的“跳板级”构造函数，并将它的 prototype 属性设置为 Animal 对象。因为引用的缘故，AnimalProto.prototype 属性 和 Animal 现在都指向了同一个对象。这就意味着，当我们创建了 cat 实例时，它实际上是直接继承自 Animal 对象 —— 这就像是使用 Object.create 方法创造出来的一样。</p><p>采用这个点子，我们可以模拟出 Javascript 解析器所不支持的 Object.create 方法。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if (!Object.create) Object.create = function(proto) {
    var Intermediate = function() {};
    Intermediate.prototype = proto;
    return new Intermediate();
};

var Animal = {
    name : &amp;#39;animal&amp;#39;,
    eat : function() {
        console.log(&amp;#39;The &amp;#39; + this.name + &amp;#39; is eating.&amp;#39;)
    }
};

var Cat = Object.create(Animal);
console.log(typeof cat.purr); // &amp;#39;undefinded&amp;#39;

Animal.purr = function() {};
console.log(typeof cat.purr); // &amp;#39;function&amp;#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最开始，我们使用一个 IF 语句来判断当前解析器是否支持 Object.create 方法。如果支持，则直接执行下面的语句，如果不支持，就模拟一个该方法：它首先创造一个名为 Intermediate 的构造器，之后将该构造器的 prototype 属性指向作为参数传入的那个对象。最后该函数返回一个 Intermediate.prototype 的实例。因为这里我们使用的方法都是当下解析器所支持的，所以我们可以说这个模拟的 Object.create 方法是具备普适性的。</p><h2 id="总结-the-wrap-up" tabindex="-1"><a class="header-anchor" href="#总结-the-wrap-up" aria-hidden="true">#</a> 总结（The Wrap Up）</h2><p>在这一章，我们详细的讨论了有关 Javascript 对象机制的所有话题，并展示了它和其他语言之间的区别。虽然它是一门基于原型的语言，但因为其自身的一些独特性，使其实际上是兼具类式和原型式语言的特征。我们看到了如何使用字面量和构造器的 prototype 属性来新建对象。我们还展示了继承的奥秘、Javascript 原型链上的遍历是如何工作的。最后我们还实践了一个将 Javascript 本身的原型混杂性隐藏起来的简便原型式模型。</p><p>因为 Javascript 的核心是一门面向对象的语言，所以在这里所写的针对该点的知识，会在我们开发复杂应用时候提供莫大的帮助。虽然面向对象本身已经超越了本书所要讲述的范围，但我依然希望我在这里所提供的信息，可以为你在该话题上的深入学习提供一点帮助。</p><h2 id="招贤纳士-recruitment" tabindex="-1"><a class="header-anchor" href="#招贤纳士-recruitment" aria-hidden="true">#</a> 招贤纳士（Recruitment）</h2><p>招人，前端，隶属政采云前端大团队（ZooTeam），50 余个小伙伴正等你加入一起浪 [坏笑] 如果你想改变一直被事折腾，希望开始能折腾事；如果你想改变一直被告诫需要多些想法，却无从破局；如果你想改变你有能力去做成那个结果，却不需要你；如果你想改变你想做成的事需要一个团队去支撑，但没你带人的位置；如果你想改变既定的节奏，将会是“5年工作时间3年工作经验”；如果你想改变本来悟性不错，但总是有那一层窗户纸的模糊… 如果你相信相信的力量，相信平凡人能成就非凡事，相信能遇到更好的自己。如果你希望参与到随着业务腾飞的过程，亲手参与一个有着深入的业务理解、完善的技术体系、技术创造价值、影响力外溢的前端团队的成长历程，我觉得我们该聊聊。任何时间，等着你写点什么，发给 <strong><code>ZooTeam@cai-inc.com</code></strong></p><h2 id="推荐阅读-recommend" tabindex="-1"><a class="header-anchor" href="#推荐阅读-recommend" aria-hidden="true">#</a> 推荐阅读（Recommend）</h2>`,174),c={href:"https://juejin.cn/post/6844903922142806023",target:"_blank",rel:"noopener noreferrer"};function o(p,u){const n=t("ExternalLinkIcon");return a(),s("div",null,[m,e("p",null,[e("a",c,[l("JAVASCRIPT FUNCTIONS 详解"),d(n)])])])}const g=i(v,[["render",o],["__file","JAVASCRIPT OBJECTS 详解.html.vue"]]);export{g as default};
