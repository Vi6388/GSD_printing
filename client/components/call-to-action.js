import React from "react";
import { CallToActionThreeData } from "@/data";
import Link from "next/link";

const CallToAction = () => {
  const { title, subText, button } = CallToActionThreeData;
  return (
    <section className="cta-style-three">
      <div className="thm-container text-center">
        <span>{subText}</span>
        <h2>{title}</h2>
        <Link href={button.url}>
          <a className="thm-btn">{button.label}</a>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
