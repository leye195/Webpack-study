import "./styles.scss";
import _ from "lodash";
import test from "./test.jpg";
const component = () => {
  const element = document.createElement("div");
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  return element;
};

const init = () => {
  document.body.appendChild(component());
};
init();
