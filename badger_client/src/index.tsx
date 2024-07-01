/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import { Route, Router } from "@solidjs/router";
import Home from "./pages/home";
import Settings from "./pages/settings"
import NotFound from "./pages/notfound";

render(
  () => <Router root={App}>
    <Route path="/" component={Home} />
    <Route path="/settings" component={Settings} />
    <Route path="/:server" component={Home} />
    <Route path="/:server/sessions" component={Home} />
    <Route path="/:server/settings" component={Home} />
    <Route path="*404" component={NotFound} />
  </Router>,
  document.getElementById("root") as HTMLElement
);
