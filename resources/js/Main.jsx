import React from "react";
import ReactDOM from "react-dom";

const Main = () => {
    return <div>Main</div>;
};

export default Main;

if (document.getElementById("root")) {
    ReactDOM.render(<Main />, document.getElementById("root"));
}
