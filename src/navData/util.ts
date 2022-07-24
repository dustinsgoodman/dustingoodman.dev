interface RouteItemLeaf {
  /** Page title (for the sidebar) */
  title: string;
  /** Path to page */
  path?: string;
}

interface RouteItem {
  /** Page title (for the sidebar) */
  title: string;
  /** Path to page */
  path?: string;
  /** List of sub-routes */
  routes?: RouteItemLeaf[];
}

interface RouteMeta {
  currentRoute?: RouteItem;
}

// Converts the map of path modules returned by `import.meta.glob` to an object
// mapping the path module from each module's filepath to the module's path map
function mapDefaultExports<T>(modules: Record<string, { default: T }>) {
  const exportMap: Record<string, T> = {};
  Object.entries(modules).forEach(([path, module]) => {
    const [_dot, pathMap] = path.split('/');
    exportMap[pathMap.replace('.json', '')] = module.default;
  });
  return exportMap;
}

const navData = mapDefaultExports<RouteItem[]>(
  import.meta.glob('./*.json', { eager: true })
);

export function getSidebarNav(currentPage: string): RouteItem[] {
  const [_empty, _learn, courseName] = currentPage.split('/');
  return navData[courseName];
}

export function getCurrentRoute(
  routeTree: RouteItem,
  currentPage: string,
  ctx: RouteMeta = {}
) {
  const { routes } = routeTree;

  if (currentPage.includes(routeTree.path)) {
    ctx.currentRoute = routeTree;
  }

  if (!routes) {
    return ctx;
  }

  for (const route of routes) {
    getCurrentRoute(route, currentPage, ctx);
  }

  return ctx;
}
