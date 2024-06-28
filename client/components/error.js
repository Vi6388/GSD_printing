import React, { Fragment } from "react";
import { Logo, errorData } from "@/data";
import Link from "next/link";

const Error = () => {
  return (
    <Fragment>
      <header className="header-404 text-center">
        <div className="thm-container">
          <Link href="/">
            <a className="logo">
              <img src={Logo.dark} alt="Awesome Image" />
            </a>
          </Link>
        </div>
      </header>

      <section className="content-404 text-center sec-pad">
        <div className="thm-container">
          <h2>{errorData.title}</h2>
          <p>{errorData.text}</p>
          <img src={errorData.image} alt="Awesome Image" />
          <Link href="/">
            <a className="thm-btn">Go Back To Home</a>
          </Link>
        </div>
      </section>
    </Fragment>
  );
};

export default Error;
