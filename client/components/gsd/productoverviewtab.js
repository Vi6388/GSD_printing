import React from "react";
import { Col, Row } from "react-bootstrap";
import Overviewimg from "../../assets/img/products/overview-tab.jpg"
const ProductOverviewTab = ({ data }) => {
    return (
        <div>
            <Row>
                <Col md='7'>
                    <div>
                        <h3>Create a one-of-a-kind look for your card – quickly and easily.</h3>

                        <ul>
                            <li>
                                Standard glossy, matte or uncoated paper

                            </li>
                            <li>
                                Standard shape and corners included

                            </li>
                            <li>
                                Premium paper upgrades

                            </li>
                            <li>
                                Square shape upgrade available

                            </li>
                            <li>
                                Rounded corner upgrade available

                            </li>
                            <li>
                                Embossed gloss, raised foil & foil accent upgrades

                            </li>
                        </ul>
                    </div>

                    <div className="mt-3">
                         <h6>One-of-a-kind cards</h6>
                         <p>
                         Your business is unique, and your business cards should be, too. Whether you’re making first impressions, rewarding regulars with a loyalty card or giving satisfied clients your contact info for next time, we’re here to help you look and feel ready to impress. Create a card that fits your business needs, personality and style.
                         </p>
                    </div>
                </Col>
                <Col md='5'>
                     <img src={Overviewimg} alt="GSD Printing"  width='100%'/>
                </Col>
            </Row>

        </div>
    );
};

export default ProductOverviewTab;
