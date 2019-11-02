import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/wrapper-top-bg";
import "./scripts/main-menu";
import "./scripts/skills";
import "./scripts/works";
import "./scripts/reviews";
import "./scripts/contact-form";
