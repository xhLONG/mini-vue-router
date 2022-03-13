export const createRoute = (record, location) => {
    let matched = [];
    if(record){
        while(record){
            matched.unshift(record);
            record = record.parent; // 通过当前记录找到所有父亲
        }
        
    }
    return {
        ...location,
        matched
    }
}



export default class History{
    constructor(router){
        this.router = router;

        // 代表当前路径匹配出来的记录   {path: '/', matched: []}    （vue-router的核心了）
        this.current = createRoute(null, {
            path: '/'
        })
    }
    // 大致做三件事：1.更新当前路由对象；2.更新url；3.更新组件渲染
    transitionTo(location, complete){
        // 获取当前路径匹配出对应的记录，当路径变化时获取对应的记录  =》 渲染页面
        console.log(location);  // 匹配路径

        // 通过路径拿到对应的记录 有了记录之后 就可以找到对象的匹配
        let current = this.router.match(location)

        // 匹配的个数和路径都是相同的，不需要再跳转了
        if(this.current.path === location && this.current.matched.length === current.matched.length){
            return;
        }

        // 调用钩子函数
        let queue = this.router.beforeHooks;
        const iterator = (hook, next) => {
            hook(current, this.current, next);
        }
        const runQueue = (queue, iterator, complete) => {
            function next(index){
                if(index >= queue.length){
                    return complete();
                }
                let hook = queue[index];
                iterator(hook, () => {
                    next(index+1);
                })
            }
            next(0);
        }
        runQueue(queue, iterator, () => {

            // 用最新的匹配到的结果，去更新视图
            this.current = current;         // 这个current只是改变当前的，他的变化不会更新_route
            this.cb && this.cb(current);    // 在cb里面会将app._route改变，就会触发响应式，视图就会更新

            // 当路径变化后，current属性会进行更新操作
            complete && complete();

        })
        
    }

    listen(cb){
        this.cb = cb;
    }
}