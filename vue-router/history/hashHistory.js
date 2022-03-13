import History from "./base";

// 确保url地址有 '/' hash值
const ensureSlash = () => {
    if(window.location.hash){
        return;
    }
    window.location.hash = '/';
}

export default class HashHistory extends History{
    constructor(router){
        super(router);
        this.router = router;

        this.teardownListenerQueue = [];

        ensureSlash();
    }
    getCurrentLocation(){
        return window.location.hash.slice(1);
    }
    setupListener(){
        const hashChagneHandler = () => {
            console.log('hash变化')
            // 再次执行匹配操作
            this.transitionTo(this.getCurrentLocation())
        };
        window.addEventListener('hashchange', hashChagneHandler);
        this.teardownListenerQueue.push(() => {
            window.removeEventListener('hashchange', hashChagneHandler);
        })
    }

    // 卸载 （方便垃圾回收）
    teardown(){
        this.teardownListenerQueue.forEach(fn => {
            fn();
        });
        this.teardownListenerQueue = [];
    }

    push(location){
        window.location.hash = location;
    }
}