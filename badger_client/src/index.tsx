/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import { Route, Router } from "@solidjs/router";
import Home from "./pages/home";

render(
  () => <Router root={App}>
    <Route path="/" component={Home} />
    <Route path="/:server" component={Home} />
    <Route path="/:server/sessions" component={Home} />
    <Route path="/:server/settings" component={Home} />
  </Router>,
  document.getElementById("root") as HTMLElement
);
