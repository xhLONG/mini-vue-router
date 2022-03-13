import RouterLink from './components/router-link'
import RouterView from './components/RouterView'

export let Vue = null;

const install = function(_Vue){
    // install 方法内部通常定义一些全局的内容，如全局组件、全局指令、全局混入还有vue原型方法
    Vue = _Vue;

    Vue.component('router-link', RouterLink);
    Vue.component('router-view', RouterView);

    // 让每个组件都可以获取到router
    Vue.mixin({
        beforeCreate(){
            // 初始router放在根实例选项上，因此初始能访问到router的是根实例
            if(this.$options.router){
                // 根
                this._routerRoot = this;
                this._router = this.$options.router;

                this._router.init(this);    // 传入根实例 调用插件的初始方法

                // 借助vue的响应式系统实现页面更新  (args: obj、key、value)
                // 给每个组件的渲染watcher添加一个依赖（当前的路由对象），当这个依赖发生改变时，组件就会重新渲染
                Vue.util.defineReactive(this, '_route', this._router.history.current)
            }else{
                // 儿子
                this._routerRoot = this.$parent && this.$parent._routerRoot;
            }
            // 最后所有的组件都能通过属性_routerRoot访问到根实例
        }
    })
    // 使用defineProperty保证它是只读的
    Object.defineProperty(Vue.prototype, '$route', {
        get(){
            return this._routerRoot._route;     // 当前匹配的记录
        }
    })
    Object.defineProperty(Vue.prototype, '$router', {
        get(){
            return this._routerRoot._router;    // 路由实例
        }
    })
}

export default install;