// this method is heloful for having all routes at one place, make it easy to modify at one place  and help reduce write same thing again dna gain and making it less prone to typo errors 
function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/";

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, "app"),
  },
};