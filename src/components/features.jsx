import React from "react";
import { Link } from "react-router-dom";
// import ICON from "./img/feature";

// props is the data part of <Features data={landingPageData.Features} /> in App.jsx
export const Features = (props) => {
  return (
    <div id="features" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Features</h2>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className="col-xs-6 col-md-3">
                  {/* <img src={require(d.icon)} alt={d.title}/> */}
                  {/* {" "} */}
                  {/* <img src={d.icon} alt={d.title} />{" "} */}
                  {/* <Link to="/build/index.html"> */}
                    {" "}
                    <i className={d.icon}></i>
                  {/* </Link> */}
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
