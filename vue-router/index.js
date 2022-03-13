import install from "./install";
import createMatcher from "./createMatcher";
import HashHistory from "./history/hashHistory";
import BrowserHistory from "./history/browserHistory";
class VueRouter{
    constructor(options){
        let routes = options.routes || [];

        // 创建匹配器的过程 1、匹配功能 match   2、可以添加匹配 动态路由添加 addRoutes 权限
        this.matcher = createMatcher(routes);

        // 创建历史管理 （两种模式：hash、history）
        this.mode = options.mode || 'hash';

        switch(this.mode){
            case 'hash':
                this.history = new HashHistory(this);
                break;
            case 'history':
                this.history = new BrowserHistory(this);
                break;
        }

        this.beforeHooks = [];
    }

    match(location){
        return this.matcher.match(location)
    }

    init(app){      // 这个app指代根实例
        // 需要根据用户配置 做出一个映射表

        // 需要根据当前路径 实现一下页面跳转的逻辑

        const history = this.history;
        // 跳转路径 会进行匹配操作 根据路径获取对应的记录

        let setupHashListener = () => {
            history.setupListener();
        }
        // 跳转路径 进行监控
        history.transitionTo(history.getCurrentLocation(), setupHashListener())


        history.listen((route) => {
            app._route = route;
        })

        // transitionTo 跳转逻辑 hash \ browser 都有
        // getCurrentLocation hash \ browser 实现不一样
        // setupListener hash 监听

        app.$once('hook:destroy', this.history.teardown);
    }
    push(location){
        const history = this.history;
        history.push(location);
    }
    beforeEach(fn){
        this.beforeHooks.push(fn);
    }
}

VueRouter.install = install;

export default VueRouter