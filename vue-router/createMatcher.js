import { createRouteMap } from "./createRouterMap";
import { createRoute } from "./history/base";

export default function createMatcher(routes){
    // pathList 会把所有的路由组成一个数组 ['/', '/idnex', '/index/a', '/setting']
    // pathMap {/: {}, /index: {}, /setting: {}}
    // pathList, pathMap构成了闭包引用
    let {pathList, pathMap} = createRouteMap(routes);

    // 路由匹配 通过用户输入的路径，获取对应的匹配记录
    function match(location){
        let record = pathMap[location];     // 获取对应记录
        return createRoute(record, {
            path: location
        })
    }

    // 动态添加路由（参数必须是一个符合 routes 选项要求的数组）
    function addRoutes(routes){
        // 把传入的新路由对象解析后加入到老 pathMap 对象里
        createRouteMap(routes, pathList, pathMap)
    }

    // 动态添加路由（添加一条新路由规则）
    function addRoute(){ }

    // 获取所有活跃的路由记录列表
    function getRoutes(){
        return pathMap;
     }

    return {
        match,
        addRoutes,
        addRoute,
        getRoutes,
    }
}