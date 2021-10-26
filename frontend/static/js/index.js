import home from "./views/home.js";
import visir from "./views/visir.js";
import ruv from "./views/ruv.js";
import err404 from "./views/err404.js";

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: home },
    { path: "/visir", view: visir },
    { path: "/ruv", view: ruv },
    { path: "/404", view: err404 },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    console.log(location.pathname.match(route.path));
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  //console.log(match);

  if (!match) {
    match = {
      route: routes[3],
      result: [location.pathname],
    };
  }

  const view = new match.route.view(getParams(match));

  document.querySelector(".content").innerHTML = await view.getHTML();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
