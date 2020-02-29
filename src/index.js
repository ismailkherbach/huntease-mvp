import "bootstrap/dist/css/bootstrap.css";
import "react-perfect-scrollbar/dist/css/styles.css";

const color = localStorage.getItem("dark_mode")
  ? localStorage.getItem("dark_mode")
  : "white";

localStorage.setItem("themeColor", color);

require("./assets/styles/huntease.styles.white.scss");
require("./AppRenderer");
