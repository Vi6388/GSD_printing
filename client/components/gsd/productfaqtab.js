import React, { useState } from "react";
import { FaqData } from "@/data";
// import SectionTitle from "./section-title";

const ProductFaqTab = ({ }) => {

    const [active, setActive] = useState(0);
    const { sectionContent, posts } = FaqData;
    return (
        <div className="faq-content" style={{ paddingTop: '0px', paddingLeft: '0px' }}>
            {/* <SectionTitle data={sectionContent} /> */}

            <div className="accrodion-grp faq-accrodion">
                {posts.map(({ title, content }, index) => (
                    <div
                        className={`accrodion ${index === active ? "active" : null}`}
                        key={index}
                    >
                        <div
                            className="accrodion-title"
                            onClick={() => {
                                setActive(index);
                            }}
                        >
                            <h4>{title}</h4>
                        </div>
                        {index === active ? (
                            <div className="accrodion-content animated fadeIn">
                                <p>{content} </p>
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductFaqTab;

