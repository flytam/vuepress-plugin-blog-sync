import{_ as a,z as d,A as r,Y as e,C as i,U as s,a6 as l,Q as t}from"./framework-cb9358d9.js";const m={},v=l(`<h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> **</h2><p>&lt;table&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td bgcolor=&quot;#F3F3F3&quot;&gt;&lt;font size=&quot;4&quot;&gt;原创不易，希望能关注下我们，再顺手点个赞~~&lt;font&gt;&lt;/font&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt; **</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8d2b0103c1fa~tplv-t2oaga2asx-image.image" alt=""></p><p>&gt; 想获取更多原创好文，请扫 👆上方二维码关注我们吧~</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbd0a99993498e~tplv-t2oaga2asx-image.image" alt=""></p><h1 id="antd-form-实现机制解析" tabindex="-1"><a class="header-anchor" href="#antd-form-实现机制解析" aria-hidden="true">#</a> Antd Form 实现机制解析</h1><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><p>&gt; 在中后台业务中，表单页面基础的场景包括组件值的收集、校验和更新。在 to B 业务中，表单页面的需求往往更复杂和定制化，除了上述的基本操作，还要处理包括自定义表单组件、表单联动、表单的异步检验等复杂场景，在一些大型表单页面中还要考虑性能的问题，表单页面的需求往往是新同学摔得第一个跤。 &gt; &gt; 本文分为两个部分，第一部分会通过对 Antd Form 源码的分析来帮助大家对 Form 的整体设计和流程有一个清晰的概念，第二部分会分享一些复杂场景的解决方案。希望可以帮助大家更容易的处理表单需求和快速定位表单场景中的问题。 &gt; &gt; 本文并不涉及过于具体的源码实现分析，大家可以放松心情，一起来对 Form 有一个感性的认知吧～</p><h2 id="form-组件解决了什么问题" tabindex="-1"><a class="header-anchor" href="#form-组件解决了什么问题" aria-hidden="true">#</a> Form 组件解决了什么问题</h2><p>首先我们先看一个简单的表单，收集并校验两个组件的值。只需要通过监听两个表单组件的 onChange 事件，获取表单项的 value，根据定义的校验规则对 value 进行检验，生成检验状态和检验信息，再通过 setState 驱动视图更新，展示组件的值以及校验信息即可。</p><p>代码实现可能是这样的：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export default class LoginForm extends React.Component {
  state = {
    username:{
      value: &amp;#39;&amp;#39;,
      error: &amp;#39;&amp;#39;,
    },
    password:{
      value: &amp;#39;&amp;#39;,
      error: &amp;#39;&amp;#39;,
    },
  }
  
  fieldMeta = {
  	username:{
  		rules:[],
  	},
  	password:{
  		rules:[],
  	},
  }
  
  onInputChange = (e) =&amp;gt; {
   const { value,name } = e.target;
 	// 获取校验结果
   const error = this.doValidate(value, name);
   
   this.setState({
     [name]:{
       value,
       error,
     }
   })
  }
  
  validator = (value, rules) =&amp;gt; {
  	...
  }
  
  doValidate = (value, name) =&amp;gt; {
  	// 读取校验规则
  	const { rules } = this.fieldMeta[name];
  	return validator(value,rules);
  }

  render() {
    const { username, password } = this.state;
    return (&amp;lt;div&amp;gt;
      &amp;lt;div&amp;gt;
        &amp;lt;Input onChange={this.onInputChange} name=&amp;#39;username&amp;#39; value={username.value} /&amp;gt;
      &amp;lt;/div&amp;gt;
      &amp;lt;div style={errorStyle}&amp;gt;
        {username.error}
      &amp;lt;/div&amp;gt;
      &amp;lt;div&amp;gt;
        &amp;lt;Input onChange={this.onInputChange} name=&amp;#39;password&amp;#39; value={password.value}/&amp;gt;
      &amp;lt;/div&amp;gt;
      &amp;lt;div style={errorStyle}&amp;gt;
        {password.error}
      &amp;lt;/div&amp;gt;
      	&amp;lt;Button onClick={this.onSubmit}&amp;gt;登录&amp;lt;/Button&amp;gt;
    &amp;lt;/div&amp;gt;);
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用流程图来表示是这样的：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbd0927fc7376e~tplv-t2oaga2asx-image.image" alt="简单流程"></p><p>上面的实现，我们设定了一个表单数据状态的模型，来维护组件的 value 和校验的错误信息。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>this.state = {
	[field1]:{
		value: &amp;#39;&amp;#39;,
		error: &amp;#39;&amp;#39;,
	},
	[field2]:{
		value: &amp;#39;&amp;#39;,
		error: &amp;#39;&amp;#39;,
	},
	...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有一个字段配置相关的模型，维护组件对应的校验规则。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>fieldMeta = {
  username:{
    rules:[]
  },
  password:{
    rules:[],
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于这种简单的业务场景，上述方式完全可以满足需求。</p><p>具体到真实的业务场景，往往更复杂，其中包含多种表单组件，如 Input、Checkbox、Radio、Upload，还有一些自定义表单组件。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbd09281580311~tplv-t2oaga2asx-image.image" alt="20191216100127"></p><p>​</p><p>这个时候如果继续采用这种方式，不仅需要维护多个 onChange 事件，还要对不同组件 value 的取值做差异化处理，以及对各个组件的校验以及触发时机规则进行维护，就很容易出现“祖传代码”。</p><p>对表单场景进行归纳，可以发现每个组件的数据收集、校验、数据更新的流程其实是一致的。对这个流程进行抽象，并且通过一些配置屏蔽组件间的差异性，再对组件的值以及组件的配置规则统一管理，就是我们常见的 Form 表单的解决方案。</p><h2 id="antd-form-是怎么实现的" tabindex="-1"><a class="header-anchor" href="#antd-form-是怎么实现的" aria-hidden="true">#</a> Antd Form 是怎么实现的</h2><p>要实现上面的方案需要解决三个问题：</p><ul><li><p>如何实时收集内部组件的数据？</p></li><li><p>如何对组件的数据进行校验？</p></li><li><p>如何更新组件的数据？</p></li></ul><p>下面我们就带着这三个问题，一起看看 Antd Form 是如何来做的吧~</p><p>先看一下 Form class 的结构，Form 组件有两个静态属性 Item、createFormField 和一个静态方法 create，Item 是对 FormItem 组件的引用，createFormField 指向 rc-form 提供的同名方法，create 方法则是对 rc-form createDOMForm 的调用，为了方便理解，这边隐藏了部分代码，Form class 整体的结构如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import * as React from &amp;#39;react&amp;#39;;
import * as PropTypes from &amp;#39;prop-types&amp;#39;;
import classNames from &amp;#39;classnames&amp;#39;;
import createDOMForm from &amp;#39;rc-form/lib/createDOMForm&amp;#39;;
import createFormField from &amp;#39;rc-form/lib/createFormField&amp;#39;;
import omit from &amp;#39;omit.js&amp;#39;;
import { ConfigConsumer, ConfigConsumerProps } from &amp;#39;../config-provider&amp;#39;;
import { tuple } from &amp;#39;../_util/type&amp;#39;;
import warning from &amp;#39;../_util/warning&amp;#39;;
import FormItem from &amp;#39;./FormItem&amp;#39;;
import { FIELD_META_PROP, FIELD_DATA_PROP } from &amp;#39;./constants&amp;#39;;
import FormContext from &amp;#39;./context&amp;#39;;

const FormLayouts = tuple(&amp;#39;horizontal&amp;#39;, &amp;#39;inline&amp;#39;, &amp;#39;vertical&amp;#39;);

export default class Form extends React.Component{
  static defaultProps = {
    colon: true,
    layout: &amp;#39;horizontal&amp;#39;,
    hideRequiredMark: false,
    onSubmit(e: React.FormEvent&amp;lt;HTMLFormElement&amp;gt;) {
      e.preventDefault();
    },
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    layout: PropTypes.oneOf(FormLayouts),
    children: PropTypes.any,
    onSubmit: PropTypes.func,
    hideRequiredMark: PropTypes.bool,
    colon: PropTypes.bool,
  };
	
	// Item 是对 FormItem 组件的引用
  static Item = FormItem;
  
	// createFormField 指向 rc-form 提供的同名方法
  static createFormField = createFormField;

	// create 方法则是对  rc-form createDOMForm 的调用
  static create = function create( options ){
    return createDOMForm({
      fieldNameProp: &amp;#39;id&amp;#39;,
      ...options,
      fieldMetaProp: FIELD_META_PROP,
      fieldDataProp: FIELD_DATA_PROP,
    });
  };

  constructor(props) {
    super(props);
  }

  renderForm = ({ getPrefixCls }: ConfigConsumerProps) =&amp;gt; {
    const { prefixCls: customizePrefixCls, hideRequiredMark, className = &amp;#39;&amp;#39;, layout } = this.props;
    const prefixCls = getPrefixCls(&amp;#39;form&amp;#39;, customizePrefixCls);
    const formClassName = classNames(
      prefixCls,
      {
        [\`\${prefixCls}-horizontal\`]: layout === &amp;#39;horizontal&amp;#39;,
        [\`\${prefixCls}-vertical\`]: layout === &amp;#39;vertical&amp;#39;,
        [\`\${prefixCls}-inline\`]: layout === &amp;#39;inline&amp;#39;,
        [\`\${prefixCls}-hide-required-mark\`]: hideRequiredMark,
      },
      className,
    );

    const formProps = omit(this.props, [
      &amp;#39;prefixCls&amp;#39;,
      &amp;#39;className&amp;#39;,
      &amp;#39;layout&amp;#39;,
      &amp;#39;form&amp;#39;,
      &amp;#39;hideRequiredMark&amp;#39;,
      &amp;#39;wrapperCol&amp;#39;,
      &amp;#39;labelAlign&amp;#39;,
      &amp;#39;labelCol&amp;#39;,
      &amp;#39;colon&amp;#39;,
    ]);

    return &amp;lt;form {...formProps} className={formClassName} /&amp;gt;;
  };

  render() {
    const { wrapperCol, labelAlign, labelCol, layout, colon } = this.props;
    return (
      &amp;lt;FormContext.Provider
        value={{ wrapperCol, labelAlign, labelCol, vertical: layout === &amp;#39;vertical&amp;#39;, colon }}
      &amp;gt;
        &amp;lt;ConfigConsumer&amp;gt;{this.renderForm}&amp;lt;/ConfigConsumer&amp;gt;
      &amp;lt;/FormContext.Provider&amp;gt;
    );
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbd0928835d5bf~tplv-t2oaga2asx-image.image" alt="系统架构设计"></p><p>从 Form 的源码上看，组件本身并不涉及表单数据流程相关的逻辑，Form 组件以及 FormItem 主要处理布局方式、表单样式、属性必填样式、检验文案等视图层面的逻辑。</p><p>对数据的收集、校验、更新的流程的抽象以及组件数据管理主要由 rc-form 实现。下面我们继续来看一下核心的 rc-form 模块是怎样的结构。</p><p>rc-form 的 核心文件以及核心类图如下：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbd09283957a75~tplv-t2oaga2asx-image.image" alt="rc-form 架构"></p><p>rc-form 核心逻辑可以从两个文件来看，createBaseForm.js、createFieldsStore.js。</p><p>createBaseForm.js 中暴露出的 createBaseForm 函数，创建了一个高阶组件 decorate，decorate 会为我们的目标组件包裹上一个容器组件，也就是上图中的核心类 BaseForm。</p><p>createFieldsStore.js 中暴露的 createFieldsStore 函数用来创建 FieldsStore 类的实例。FieldsStore 类可以理解为组件数据的管理中心，负责数据模型的初始化，并提供 Api 对组件数据进行更新和读取，以及获取组件数据的校验结果和数据更改状态。</p><h3 id="form-组件流程分析" tabindex="-1"><a class="header-anchor" href="#form-组件流程分析" aria-hidden="true">#</a> Form 组件流程分析</h3><p>我们通过 Antd Pro 中登录页面的实现来一起看一下，Form 内部的调用流程。</p><p>首先来看一下 Form 表单的用法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class CustomizedForm extends React.Component {}

CustomizedForm = Form.create({})(CustomizedForm);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们有一个自定义组件 CustomizedForm，在使用 Form 表单的时候，我们会先调用 Form.create({})(CustomizedForm)。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbd092808ce7f3~tplv-t2oaga2asx-image.image" alt="20191213010654"></p><h4 id="初始化阶段" tabindex="-1"><a class="header-anchor" href="#初始化阶段" aria-hidden="true">#</a> 初始化阶段</h4><p>Form.create 函数指向 rc-form 提供的 createBaseForm 方法，createBaseForm 则创建了高阶组件 decorate。</p><p>decorate 的参数就是我们的 CustomizedForm 自定义组件。decorate 会创建一个被 BaseForm 组件包裹的自定义表单组件，经过包裹的组件将会自带 <code>this.props.form</code> 属性。为了方便记忆，我们把这个组件称为 FormHocCustomizedForm。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/** 
*  rc-form/createBaseForm.js 
*/

// 默认的数据收集触发事件
const DEFAULT_TRIGGER = &amp;#39;onChange&amp;#39;;

function createBaseForm(option = {}, mixins = []) {
  const {
    validateMessages,
    onFieldsChange,
    onValuesChange,
    mapProps = identity,
    mapPropsToFields,
    fieldNameProp,
    fieldMetaProp,
    fieldDataProp,
    formPropName = &amp;#39;form&amp;#39;,
    name: formName,
    // @deprecated
    withRef,
  } = option;

  // 高阶组件
  return function decorate(WrappedComponent) {
    const Form = createReactClass({
      mixins,
      ...
      render() {
        const { wrappedComponentRef, ...restProps } = this.props; // eslint-disable-line
        // 为目标组件注入 form props
				const formProps = {
          [formPropName]: this.getForm(),
        };
        if (withRef) {
          if (
            p<wbr>rocess.env.NODE_ENV !== &amp;#39;production&amp;#39; &amp;amp;&amp;amp;
            p<wbr>rocess.env.NODE_ENV !== &amp;#39;test&amp;#39;
          ) {
            warning(
              false,
              &amp;#39;\`withRef\` is deprecated, please use \`wrappedComponentRef\` instead. &amp;#39; +
                &amp;#39;See: https://github.com/react-component/form#note-use-wrappedcomponentref-instead-of-withref-after-rc-form140&amp;#39;,
            );
          }
          formProps.ref = &amp;#39;wrappedComponent&amp;#39;;
        } else if (wrappedComponentRef) {
          formProps.ref = wrappedComponentRef;
        }
        const props = mapProps.call(this, {
          ...formProps,
          ...restProps,
        });
        return &amp;lt;WrappedComponent {...props} /&amp;gt;;
      },
    });
		
    return argumentContainer(unsafeLifecyclesPolyfill(Form), WrappedComponent);
  };
}

export default createBaseForm;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbd0928191389f~tplv-t2oaga2asx-image.image" alt="20191210132203"></p><p>组件创建完成之后，FormHocCustomizedForm 就会经历 React 组件的生命周期。</p><h4 id="getinitailstate-阶段" tabindex="-1"><a class="header-anchor" href="#getinitailstate-阶段" aria-hidden="true">#</a> getInitailState 阶段</h4><p>Form 并没有通过内部的 state 来管理内部组件的值， 而且创建了 FieldsStore 实例，也就是上面提到的组件数据管理中心。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbd092c8e54ddf~tplv-t2oaga2asx-image.image" alt="rc-form 架构"></p><p>通过上面的类图我们可以看到 FieldsStore 包含两个属性，fields 和 fieldsMeta，fields主要用来记录每个表单项的实时数据，包含以下属性：</p><p>&gt; dirty 数据是否已经改变，但未校验 &gt; &gt; errors 校验文案 &gt; &gt; name 字段名称 &gt; &gt; touched 数据是否更新过 &gt; &gt; value 字段的值 &gt; &gt; validating 校验状态</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbd092b2deb267~tplv-t2oaga2asx-image.image" alt="20191210141658"></p><p>fieldsMeta 用来记录元数据，即每个字段对应组件的配置信息：</p><p>&gt; name 字段的名称 &gt; &gt; originalProps 被 getFieldDecorator() 装饰的组件的原始 props &gt; &gt; rules 校验的规则 &gt; &gt; trigger 触发数据收集的时机 默认 <code>onChange</code> &gt; &gt; validate 校验规则和触发事件 &gt; &gt; valuePropName 子节点的值的属性，例如 checkbox 应该设为 <code>checked</code> &gt; &gt; getValueFromEvent 如何从 event 中获取组件的值 &gt; &gt; hidden 为 true 时，校验或者收集数据时会忽略这个字段</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbd092b3665c1b~tplv-t2oaga2asx-image.image" alt="20191210141722"></p><h4 id="render-阶段" tabindex="-1"><a class="header-anchor" href="#render-阶段" aria-hidden="true">#</a> Render 阶段</h4><p>被 Form 管理的组件，需要使用 props.form.getFieldDecorator 来包装，在 Render 阶段需要调用 getFieldDecorator 传入我们的组件配置，包括字段名 name 以及组件元数据 otherOptions，再将字段对应的组件传入 getFieldDecorator 返回的高阶组件。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{getFieldDecorator(&amp;#39;name&amp;#39;, otherOptions)(&amp;lt;Input /&amp;gt;)}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/** 
* rc-form/createBaseForm.js 
*/
			
// getFieldDecorator 实际上创建了一个高阶组件，参数是字段对应的组件 
getFieldDecorator(name, fieldOption) {
  // 装饰组件的 props 
  const props = this.getFieldProps(name, fieldOption);
  return fieldElem =&amp;gt; {
    // We should put field in record if it is rendered
    this.renderFields[name] = true;

    const fieldMeta = this.fieldsStore.getFieldMeta(name);
    const originalProps = fieldElem.props;
    // 校验细节略过 ...
    fieldMeta.originalProps = originalProps;
    fieldMeta.ref = fieldElem.ref;
    return React.cloneElement(fieldElem, {
      ...props,
      ...this.fieldsStore.getFieldValuePropValue(fieldMeta),
    });
  };
},
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>经过 <code>getFieldDecorator</code> 包装的组件，表单组件会自动添加 <code>value</code>（或 <code>valuePropName</code> 指定的其他属性） <code>onChange</code>（或 <code>trigger</code> 指定的其他属性）属性，接下来的数据同步将被 Form 接管。 getFieldDecorator 主要用于装饰组件，其中调用的 getFieldProps 用于装饰 props，getFieldProps 会将组件的 （DEFAULT_TRIGGER = &#39;onChange&#39;）触发事件指向 FormHocCustomizedForm 的 onCollect 方法，并将配置的 validateTriggers 指向 onCollectValidate。在这个阶段还会收集组件的元数据，也就是我们调用 getFieldDecorator 中传入的 option 配置，这些配置会存入 fieldStore 的 fieldsMeta 对象中，作为组件的元数据。</p><p>这里我们就可以回答<strong>第一个问题，如何实时收集内部组件的数据？</strong></p><p>&gt; Form 通过 <code>getFieldDecorator</code> 对组件进行包装，接管组件的 value 和 <code>onChange</code> 属性，当用户输入改变时，触发 onCollect 或 onCollectValidate 来收集组件最新的值。</p><p>​</p><h4 id="用户输入" tabindex="-1"><a class="header-anchor" href="#用户输入" aria-hidden="true">#</a> 用户输入</h4>`,68),c={href:"https://github.com/tmpfs/async-validate",target:"_blank",rel:"noopener noreferrer"},o=l(`<p>onCollect 和 onCollectValidate 方法中收集数据的动作主要由 onCollectCommon 来处理。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> /** 
 * rc-form/createBaseForm.js 
 */

onCollect(name_, action, ...args) {
  const { name, field, fieldMeta } = this.onCollectCommon(
    name_,
    action,
    args,
  );
  const { validate } = fieldMeta;

  this.fieldsStore.setFieldsAsDirty();

  const newField = {
    ...field,
    dirty: hasRules(validate),
  };
  this.setFields({
    [name]: newField,
  });
},

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>onCollectCommon 负责组件数据的收集，在事件的回调中，通过默认的 getValueFromEvent 方法或者组件配置的 getValueFromEvent 方法，可以从参数 event 中正确的拿到组件的值。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/** 
 	 * rc-form/createBaseForm.js 
   */

onCollectCommon(name, action, args) {
  const fieldMeta = this.fieldsStore.getFieldMeta(name);

  if (fieldMeta[action]) {
    fieldMeta[action](...args);
  } else if (fieldMeta.originalProps &amp;amp;&amp;amp; fieldMeta.originalProps[action]) {
    fieldMeta.originalProps[action](...args);
  }
  const value = fieldMeta.getValueFromEvent
  ? fieldMeta.getValueFromEvent(...args)
  : getValueFromEvent(...args);
  if (onValuesChange &amp;amp;&amp;amp; value !== this.fieldsStore.getFieldValue(name)) {
    const valuesAll = this.fieldsStore.getAllValues();
    const valuesAllSet = {};
    valuesAll[name] = value;
    Object.keys(valuesAll).forEach(key =&amp;gt;
                                   set(valuesAllSet, key, valuesAll[key]),
                                  );
    onValuesChange(
      {
        [formPropName]: this.getForm(),
        ...this.props,
      },
      set({}, name, value),
      valuesAllSet,
    );
  }
  const field = this.fieldsStore.getField(name);
  return { name, field: { ...field, value, touched: true }, fieldMeta };
},

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>针对不同的组件取值差异，由 getValueFromEvent 方法来屏蔽。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/** 
 * rc-form/utils.js
 */

// 默认的 getValueFromEvent
export function getValueFromEvent(e) {
  // To support custom element
  if (!e || !e.target) {
    return e;
  }
  const { target } = e;
  return target.type === &amp;#39;checkbox&amp;#39; ? target.checked : target.value;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>收集并校验组件的值。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/** 
 * rc-form/createBaseForm.js 
 */

onCollectValidate(name_, action, ...args) {
  const { field, fieldMeta } = this.onCollectCommon(name_, action, args);
  // 获取组件最新的值
  const newField = {
    ...field,
    dirty: true,
  };

  this.fieldsStore.setFieldsAsDirty();
  // 对组件最新的值 进行校验
  this.validateFieldsInternal([newField], {
    action,
    options: {
      firstFields: !!fieldMeta.validateFirst,
    },
  });
},

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行校验。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>validateFieldsInternal(
  fields,
  { fieldNames, action, options = {} },
  callback,
) {
  const allRules = {};
  const allValues = {};
  const allFields = {};
  const alreadyErrors = {};
  fields.forEach(field =&amp;gt; {
    const name = field.name;
    if (options.force !== true &amp;amp;&amp;amp; field.dirty === false) {
      if (field.errors) {
        set(alreadyErrors, name, { errors: field.errors });
      }
      return;
    }
    const fieldMeta = this.fieldsStore.getFieldMeta(name);
    const newField = {
      ...field,
    };
    newField.errors = undefined;
    newField.validating = true;
    newField.dirty = true;
    // 从 fieldMeta 中读取校验规则
    allRules[name] = this.getRules(fieldMeta, action);
    allValues[name] = newField.value;
    allFields[name] = newField;
  });
  // 校验前更新字段状态
  this.setFields(allFields);
  // in case normalize
  Object.keys(allValues).forEach(f =&amp;gt; {
    allValues[f] = this.fieldsStore.getFieldValue(f);
  });

  // AsyncValidator 三方校验库 async-validator;  
  const validator = new AsyncValidator(allRules);
  if (validateMessages) {
    validator.messages(validateMessages);
  }
  validator.validate(allValues, options, errors =&amp;gt; {
    const errorsGroup = {
      ...alreadyErrors,
    };
    if (errors &amp;amp;&amp;amp; errors.length) {
      errors.forEach(e =&amp;gt; {
        // 省略...
        const fieldErrors = get(errorsGroup, fieldName.concat(&amp;#39;.errors&amp;#39;));
        fieldErrors.push(e);
      });
    }
    const expired = [];
    const nowAllFields = {};
    Object.keys(allRules).forEach(name =&amp;gt; {
      const fieldErrors = get(errorsGroup, name);
      const nowField = this.fieldsStore.getField(name);
      // avoid concurrency problems
      if (!eq(nowField.value, allValues[name])) {
        expired.push({
          name,
        });
      } else {
        nowField.errors = fieldErrors &amp;amp;&amp;amp; fieldErrors.errors;
        nowField.value = allValues[name];
        nowField.validating = false;
        nowField.dirty = false;
        nowAllFields[name] = nowField;
      }
    });
    // 检验完成 更新字段实时数据
    this.setFields(nowAllFields);
    // ...
  });
},

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到这里我们可以回答上面的<strong>第二个问题，如何对组件的数据进行校验？</strong></p><p>&gt; 当通过执行 onCollectCommon 完成了表单数据的收集，onCollectValidate 会调用 validateFieldsInternal 方法创建 AsyncValidator 的实例，由 AsyncValidator 根据组件的配置规则进行校验，并将最终的校验结果和表单数据更新到 fieldStore。</p><p>到这里就完成了表单数据的收集和校验的环节，已经拿到了表单最新的数据以及校验结果。</p><p>下一步，就是数据的更新，也就是将表单最新的值和校验相关的信息更新到视图上。</p><p>在 onCollect 和 validateFieldsInternal 方法中，我们看到最后一步调用了 setFields 来更新实时数据。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/** 
 * rc-form/createBaseForm.js 
 */

setFields(maybeNestedFields, callback) {
  const fields = this.fieldsStore.flattenRegisteredFields(
    maybeNestedFields,
  );
  // 更新 fieldsStore
  this.fieldsStore.setFields(fields);

  if (onFieldsChange) {
    const changedFields = Object.keys(fields).reduce(
      (acc, name) =&amp;gt; set(acc, name, this.fieldsStore.getField(name)),
      {},
    );
    onFieldsChange(
      {
        [formPropName]: this.getForm(),
        ...this.props,
      },
      changedFields,
      this.fieldsStore.getNestedAllFields(),
    );
  }
  // 更新
  this.forceUpdate(callback);
},

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>setFields 方法将字段组件最新的数据更新到 fieldStore。此时 fieldStore 已经收集存储了组件最新的值，下面我们就需要更新组件，将数据正确的在界面上渲染出来。</p><p>可以看到，setFields 中最后调用了 React 组件提供的 forceUpdate 函数。这里可以回答<strong>第三个问题，如何更新组件的数据？</strong></p>`,18),u={href:"http://ant.design/components/form/#getFieldDecorator-%E5%8F%82%E6%95%B0",target:"_blank",rel:"noopener noreferrer"},p=e("code",null,"valuePropName",-1),b=l('<p>到这里，一个完整的 Form 数据收集、校验、更新流程就完成了，整个过程的流程图如下所示：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/20/16fc086d58cf392c~tplv-t2oaga2asx-image.image" alt="未命名文件 (2).jpg"></p><h2 id="复杂表单场景的最佳实践" tabindex="-1"><a class="header-anchor" href="#复杂表单场景的最佳实践" aria-hidden="true">#</a> 复杂表单场景的最佳实践</h2><p>看完了上面的 Form 内部的运行流程，下面我们一起来看看 Form 还提供了哪些机制方便我们解决一些复杂场景问题。</p><h3 id="嵌套数据结构收集" tabindex="-1"><a class="header-anchor" href="#嵌套数据结构收集" aria-hidden="true">#</a> 嵌套数据结构收集</h3>',5),g={href:"https://www.lodashjs.com/docs/latest#_setobject-path-value",target:"_blank",rel:"noopener noreferrer"},f=l(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&amp;lt;FormItem&amp;gt;
&amp;lt;Col span={16}&amp;gt;
  {getFieldDecorator(&amp;#39;nested.fieldObj.name&amp;#39;)(&amp;lt;Input/&amp;gt;)}
&amp;lt;/Col&amp;gt;
&amp;lt;/FormItem&amp;gt;
&amp;lt;FormItem&amp;gt;
&amp;lt;Col span={16}&amp;gt;
  {getFieldDecorator(&amp;#39;nested.fieldArray[0].name&amp;#39;)(&amp;lt;Input/&amp;gt;)}
&amp;lt;/Col&amp;gt;
&amp;lt;/FormItem&amp;gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码中，我们通过对象路径的方式来设置 field，在获取表单值的时候已经被转换成了对应路径结构的对象或数组，如下面所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
nested:{
 fieldObj:{
   name:&amp;#39;嵌套对象的值&amp;#39;
 },
 fieldArray:[&amp;#39;嵌套数组的值&amp;#39;]
}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自定义表单接入" tabindex="-1"><a class="header-anchor" href="#自定义表单接入" aria-hidden="true">#</a> 自定义表单接入</h3><p>上面的分析里提到，Form 通过接管组件的 value 和 onChange 事件来管理组件，想实现一个可以接入 Form 管理的组件，只需要满足下面三个条件</p>`,5),h=e("code",null,"value",-1),F={href:"http://ant.design/components/form/#getFieldDecorator-%E5%8F%82%E6%95%B0",target:"_blank",rel:"noopener noreferrer"},x=e("code",null,"valuePropName",-1),C=e("code",null,"onChange",-1),_={href:"http://ant.design/components/form/#getFieldDecorator-%E5%8F%82%E6%95%B0",target:"_blank",rel:"noopener noreferrer"},y=e("code",null,"trigger",-1),P=e("li",null,"React@16.3.0 之前只有 Class 组件支持",-1),j={href:"https://reactjs.org/docs/forwarding-refs.html",target:"_blank",rel:"noopener noreferrer"},w={href:"https://codesandbox.io/s/7wj199900x",target:"_blank",rel:"noopener noreferrer"},E=l(`<h3 id="表单联动" tabindex="-1"><a class="header-anchor" href="#表单联动" aria-hidden="true">#</a> 表单联动</h3><p>组件的数据由 FieldStore 来统一管理，组件值变化时也会实时更新，所以结合 ES6 的 get 方法可以很简单的实现组件之间的联动。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class Linkage extends Component{

get showInput(){
 return this.props.form.getFieldValue(&amp;#39;checkbox&amp;#39;);
}
render() {
 const { form } = this.props;
 const { getFieldDecorator } = form;
 return (
   &amp;lt;div&amp;gt;
    {
      getFieldDecorator(&amp;#39;checkbox&amp;#39;, {valuePropName: &amp;#39;checked&amp;#39;,})(
          &amp;lt;Checkbox&amp;gt;show Input&amp;lt;/Checkbox&amp;gt;
        )
    }
     {
      this.showInput &amp;amp;&amp;amp; &amp;lt;Input/&amp;gt;	
     }
   &amp;lt;/div&amp;gt;
 );
}
}

export default Form.create()(Linkage);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>本文在流程上对 Form 组件的实现机制进行了解析，省略了里面的实现细节，大家对流程有一个整体认知之后，也可以自己翻阅 Form 的源码来了解实现细节。</p><p>Antd Form 具有很好的灵活性，可以帮我们快速的实现表单需求，但是也存在一些问题，比如当表单中的任何一个组件值发生改变，触发 onCollect 数据收集、执行更新流程，都会调用 forceUpdate 触发所有组件的更新。</p>`,6),M={href:"https://github.com/react-component/field-form",target:"_blank",rel:"noopener noreferrer"},S=e("p",null,"> React Performance First Form Component.",-1),k=e("p",null,"大家也可以期待一下官方新版本的 Form 组件。",-1),R=e("h2",{id:"推荐阅读",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#推荐阅读","aria-hidden":"true"},"#"),i(" 推荐阅读")],-1),V={href:"https://juejin.cn/post/6844904038555729927",target:"_blank",rel:"noopener noreferrer"},A={href:"https://juejin.cn/post/6844903988081475591",target:"_blank",rel:"noopener noreferrer"},I={href:"https://juejin.cn/post/6844903927448616968",target:"_blank",rel:"noopener noreferrer"},D=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/6/171e8b8d7ad15181~tplv-t2oaga2asx-image.image",alt:""})],-1);function N(B,O){const n=t("ExternalLinkIcon");return d(),r("div",null,[v,e("p",null,[i("当用户输入触发组件的 onChange 或者其他的 trigger 事件时，执行 onCollect 或者 onCollectValidate，onCollect 执行组件数据收集，onCollectValidate 除了执行组件数据收集，还会根据配置的校验规则来校验组件，其中校验的流程并不由 rc-form 实现，而且通过引入第三方校验库 "),e("a",c,[i("async-validator"),s(n)]),i(" 执行。")]),o,e("p",null,[i("> 因为我们在最顶层的 FormHocCustomizedForm 组件中调用 forceUpdate，forceUpdate 会跳过 shouldComponentUpdate 触发组件的 Render 方法，进而触发所有子组件的更新流程。在子组件 Render 的执行过程中， getFieldDecorator 方法从 fieldStore 中读取实时的表单数据以及校验信息，并通过注入 value 或者 "),e("a",u,[p,s(n)]),i(" 的值设定的属性来更新表单。")]),b,e("p",null,[i("FieldStore 内部集成了 "),e("a",g,[i("lodash/set"),s(n)]),i("，可以设置对象路径（eg:a.b.c 或者 a.b[0]）为字段值，通过使用对象路径字段，我们可以很方便的实现嵌套数据结构值的收集。")]),f,e("ul",null,[e("li",null,[i("提供受控属性 "),h,i(" 或其它与 "),e("a",F,[x,s(n)]),i(" 的值同名的属性")]),e("li",null,[i("提供 "),C,i(" 事件或 "),e("a",_,[y,s(n)]),i(" 的值同名的事件")]),e("li",null,[i("支持 ref： "),e("ul",null,[P,e("li",null,[i("React@16.3.0 及之后可以通过 "),e("a",j,[i("forwardRef"),s(n)]),i(" 添加 ref 支持（"),e("a",w,[i("示例"),s(n)]),i("）")])])])]),E,e("p",null,[i("在复杂表单业务，用户频繁的输入场景就会产生性能瓶颈。对于复杂的表单组件，我们可以通过拆分组件的粒度，通过 shouldComponentUpdate 来避免不必要的更新，或者修改组件的数据收集时机来减少数据的收集频率。当然这并不是很优雅的解决方案，在未来要发布的 Antd V4 版本中，Form 的底层实现已经替换为 "),e("a",M,[i("rc-field-form"),s(n)]),i("，主页上的介绍是：")]),S,k,R,e("p",null,[e("a",V,[i("图文并茂，为你揭开“单点登录“的神秘面纱"),s(n)])]),e("p",null,[e("a",A,[i("可能是最全的 “文本溢出截断省略” 方案合集"),s(n)])]),e("p",null,[e("a",I,[i("CSS 层叠上下文（Stacking Context）"),s(n)])]),D])}const z=a(m,[["render",N],["__file","Antd Form 实现机制解析.html.vue"]]);export{z as default};
