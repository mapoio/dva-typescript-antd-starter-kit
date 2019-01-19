import dva from "dva";
import createLoading from "dva-loading";
import "./index.less";
import models from "./models";
import router from "./router";

// https://github.com/nitin42/react-perf-devtool/issues/61
// now it does not work
const { registerObserver } = require("react-perf-devtool");
registerObserver({ timeout: 30000 });

// 1. Initialize
let app = dva();
if (process.env.NODE_ENV === "development") {
  import("react-hot-loader/root").then(({ hot }) => {
    app = hot(dva());
  });
}

// 2. Plugins
app.use(createLoading());

// 3. Model
models.forEach(m => {
  app.model(m.default);
});

// 4. Router
app.router(router);

// 5. Start
app.start("#root");
