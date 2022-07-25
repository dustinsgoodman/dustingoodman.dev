interface RouteItem {
  /** Page title (for the sidebar) */
  title: string;
  /** Path to page */
  path?: string;
  /** List of sub-routes */
  routes?: RouteItem[];
}

interface RouteMeta {
  prevRoute?: RouteItem;
  currentRoute?: RouteItem;
  nextRoute?: RouteItem;
  breadcrumbs?: RouteItem[];
}

// Converts the map of path modules returned by `import.meta.glob` to an object
// mapping the path module from each module's filepath to the module's path map
function mapDefaultExports<T>(modules: Record<string, { default: T }>) {
  const exportMap: Record<string, T> = {};
  Object.entries(modules).forEach(([path, module]) => {
    const [_dot, _navData, pathMap] = path.split('/');
    exportMap[pathMap.replace('.json', '')] = module.default;
  });
  return exportMap;
}

const navData = mapDefaultExports<RouteItem>(
  import.meta.glob('../navData/*.json', { eager: true })
);

export function getSidebarNav(currentPage: string): RouteItem {
  const [_empty, _learn, courseName] = currentPage.split('/');
  return navData[courseName];
}

export function getRouteInfo(routeTree: RouteItem, currentPage: string) {
  const breadcrumbs = getBreadcrumbs(routeTree, currentPage);
  const routeMeta = getRouteMeta(routeTree, currentPage);
  return {
    ...routeMeta,
    breadcrumbs: breadcrumbs.length > 0 ? breadcrumbs : [routeTree],
  };
}

function getRouteMeta(
  routeTree: RouteItem,
  currentPage: string,
  ctx: RouteMeta = {}
): RouteMeta {
  const { routes } = routeTree;

  if (ctx.currentRoute && !ctx.nextRoute) {
    ctx.nextRoute = routeTree;
  }

  if (routeTree.path === currentPage) {
    ctx.currentRoute = routeTree;
  }

  if (!ctx.currentRoute) {
    ctx.prevRoute = routeTree;
  }

  if (!routes) {
    return ctx;
  }

  for (const route of routes) {
    getRouteMeta(route, currentPage, ctx);
  }

  return ctx;
}

function getBreadcrumbs(
  routeTree: RouteItem,
  currentPage: string,
  breadcrumbs: RouteItem[] = []
): RouteItem[] {
  if (currentPage.includes(routeTree.path)) {
    return breadcrumbs;
  }

  if (!routeTree.routes) {
    return [];
  }

  for (const route of routeTree.routes) {
    const childRoute = getBreadcrumbs(route, currentPage, [
      ...breadcrumbs,
      routeTree,
    ]);
    if (childRoute?.length) {
      return childRoute;
    }
  }

  return [];
}
