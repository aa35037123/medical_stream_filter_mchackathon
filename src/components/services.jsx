import React from "react";
import { Link } from 'react-router-dom';

function openConsolePage() {
  window.open('pages/streaming.html');
}

export const Services = (props) => {
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p>
        </div>

        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  {" "}
                  {/* 在这里包装图标，点击时调用handleIconClick函数 */}
                  {/* <a onclick="window.open(document.URL, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');"> */}
                    <i className={d.icon} onClick={openConsolePage}></i>
                  <div className="service-desc">
                    <h3>{d.name}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
