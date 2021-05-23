import { asta } from './runtime.js'

/** 
升级功能点
1、将数据和事件从options 移出到core下面，
   防止用户定义的属性和框架使用的冲突
2、支持props传递
3、抽出AstaBase
4、完整的customElements 实现， 标签不再与声明时的instance相引用
   可以在html写标记或 document.createElement('my-counter')
希望下步优化的点：
1、generate函数能自动生成 core前缀，模板编写时就不需要core。 模板支持if,for 虽然我还没有读generate代码 ！
2、自定义事件的支持，比如冒泡和compose等。 比如 this.emit("countChange") 而外部可以用addEventListener来监听到
3、表单类自定义元素支持（这块的标准还没有认真学习过，汗！）
4、css的导入 以及 part选择器。 支持完备的css功能吧！
5、slot相关功能实现
6、类似svelte一样的标记脏位，最小化更新
7、。。。无穷多想加入进来 ，想测试能不能行通！ 
*/
asta(
	() => ({
		count: 0,
		add: function () {
			this.count += +this.props.step
			// this.emit("countChange",this.count)
		},
	}),
	{
		tag: 'my-counter',
		props: ['btn-text', 'step'],
		emits: ['create', 'update', 'destory'], // 和vue一样， 只是指示性的作用。
		template: `<div part="info" >step={props.step},count={ count} </div> 
          <button part="btn" @click="add"> { props['btn-text']}</button>`,
		style: `
          div{font-size:20px;}
        `,
	}
)
let el = document.createElement('my-counter')
el.setAttribute('btn-text', '增加计数5')
el.setAttribute('step', 5)
document.body.append(el)
el.addEventListener('update', function (ev) {
	console.log('组件更新', ev)
})
// 由于这个原因，事件是否冒泡需要仔细斟酌！
document.body.addEventListener('update', function (ev) {
	console.log('还冒泡到根节点，组件更新', ev)
})

let a0, a1, a2, a3, a4, a5, a6, a7
return [
	function ($) {
		a0 = $
		a1 = a.ce('div')
		a.sa(a1, 'part', 'info')
		a2 = a.ctn('')
		a.stc(a2, 'step=')
		a.ac(a2, a1)
		a3 = a.ctn('')
		a.ac(a3, a1)
		a4 = a.ctn('')
		a.stc(a4, ',count=')
		a.ac(a4, a1)
		a5 = a.ctn('')
		a.ac(a5, a1)
		a.ac(a1, a0)
		a6 = a.ce('button')
		a.sa(a6, 'part', 'btn')
		a.ael(a6, 'click', function ($event) {
			instance.add($event)
		})
		a7 = a.ctn('')
		a.ac(a7, a6)
		a.ac(a6, a0)
	},
	function () {
		a.stc(a3, instance.props.step)
		a.stc(a5, instance.count)
		a.stc(a7, instance.props['btn-text'])
	},
	function () {
		a.rc(a1, a0)
		a.rc(a6, a0)
	},
]
