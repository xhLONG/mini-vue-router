export default {
    // router-view组件只是一个占位符，不需要用到数据、不需要用到生命周期、不需要实例化组件
    name: 'router-view',
    functional: true, // 函数式组件 函数不用new 没有this 没有生命周期 没有数据data
    // context: 函数式组件渲染上下文
    render(h, context){
        // this.$route 有matched属性 这个属性有几个就依次的将它赋予到对应的router-view上
        
        let {parent, data} = context;
        // parent 是当前父组件
        // data 是这个组件上的一些标识
        let route = parent.$route;
        let depth = 0;

        data.routerView = true;     // 标识路由属性，然后当前组件的$vnode.data.routerView就为true

        // 找到当前router-view是位于第几层的子路由
        while(parent){
            if(parent.$vnode && parent.$vnode.data.routerView){
                depth++;
            }
            parent = parent.$parent;
        }
        // 注意$vnode和_vnode的区别
        
        
        let record = route.matched[depth];
        if(!record){
            return h();
        }
        return h(record.component, data)
    }
}