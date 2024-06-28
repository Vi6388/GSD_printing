import React, { useState } from "react";
import { ServiceTabOneData } from "@/data";

const ServiceTabOne = () => {
  const [active, setActive] = useState(1);
  return (
    <section className="video-box-design-guide sec-pad service-tab-box">
      <div className="thm-container">
        <div className="tab-title">
          <ul className="list-inline">
            {ServiceTabOneData.map(({ title, icon }, index) => (
              <li
                key={index}
                className={`${active === index ? "active" : " "}`}
              >
                <a
                  className="hvr-bounce-to-bottom"
                  href={`service-tab-${index}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(index);
                  }}
                >
                  <i className={icon}></i>
                  <h3>{title}</h3>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="tab-content">
          {ServiceTabOneData.map(({ content }, index) => {
            return index === active ? (
              <div
                className="single-tab-content tab-pane show fade in active animated fadeIn"
                key={index}
              >
                <div className="sec-title text-center mb0">
                  <span>{content.subText}</span>
                  <h3>{content.title}</h3>
                  <p>{content.content}</p>
                </div>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceTabOne;
