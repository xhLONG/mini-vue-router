const addRouteRecord = function(route, pathList, pathMap, parentRecord){
    let path = parentRecord ? `${parentRecord.path}/${route.path}` : route.path;
    // 根据当前的路由产生一条记录
    let record = {
        path,
        component: route.component,
        parent: parentRecord,
    }

    // 防止用户编写路由时有重复的
    if(!pathMap[path]){
        pathMap[path] = record;
        pathList.push(path);
    }

    // 将子路由也放到对应的pathList,pathMap
    if(route.children){
        route.children.forEach(r => {
            addRouteRecord(r, pathList, pathMap, record)
        })
    }
}

export function createRouteMap(routes, oldPathList, oldPathMap){
    let pathList = oldPathList || [];
    let pathMap = oldPathMap || [];
    routes.forEach(route => {
        addRouteRecord(route, pathList, pathMap);
    });

    return {
        pathList,
        pathMap,
    }
}