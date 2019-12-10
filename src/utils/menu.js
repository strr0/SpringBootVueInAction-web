import {getRequest} from './request'

export const initMenu = (router, store) => {
    if(store.state.routes.length > 0) {
        return;
    }
    getRequest("/sysmenu").then(resp => {
        if(resp && resp.status == 200) {
            var fmRoutes = formatRoutes(resp.data);
            router.addRoutes(fmRoutes);
            store.commit('initMenu', fmRoutes);
        }
    });
}

export const formatRoutes = routes => {
    let fmRoutes = [];
    routes.forEach(router => {
        let {
            path,
            component,
            name,
            iconCls,
            keepAlive,
            requireAuth,
            enabled,
            children
        } = router;
        if(children && children instanceof Array) {
            children = formatRoutes(children);
        }
        let fmRoute = {
            path: path,
            component(resolve) {
                if(component.startsWith("Home")) {
                    require(['../components/' + component + '.vue'], resolve)
                }
                else if(component.startsWith("Emp")) {
                    require(['../components/emp/' + component + '.vue'], resolve)
                }
                else if(component.startsWith("Per")) {
                    require(['../components/personnel/' + component + '.vue'], resolve)
                }
                else if(component.startsWith("Sal")) {
                    require(['../components/salary/' + component + '.vue'], resolve)
                }
                else if(component.startsWith("Sta")) {
                    require(['../components/statistics/' + component + 'vue'], resolve)
                }
                else if(component.startsWith("Sys")) {
                    require(['../components/system/' + component + '.vue'], resolve)
                }
            },
            name: name,
            iconCls: iconCls,
            keepAlive: keepAlive,
            requireAuth: requireAuth,
            enabled: enabled,
            children: children
        };
        fmRoutes.push(fmRoute);
    })
    return fmRoutes;
}