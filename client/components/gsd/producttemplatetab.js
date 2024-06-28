import React from "react";
import { Col, Row } from "react-bootstrap";
import perviewfront from "../../assets/img/products/preview.jpeg"
const ProductTemplateTab = ({ data }) => {
    return (
        <div>
            <h3 className="mb-3 mt-4">Product Specs & Templates</h3>
            <Row>
                <Col md='7'>
                    <img src={perviewfront} alt="GSD Printing" width='100%' />
                </Col>
                <Col md='5'>
                    <div className="mt-3">
                        <select className="form-control " >
                            <option>
                                --Select Paper Thickness--
                            </option>
                            <option>
                                Standard
                            </option>
                            <option>
                                Premium (Recommended)
                            </option>
                        </select>

                        <select className="form-control mt-3" >
                            <option>
                                --Select Corner--
                            </option>
                            <option>
                                Standard
                            </option>
                            <option>
                                Rounded
                            </option>
                        </select>
                    </div>
                    <p className="mt-5">
                        To avoid white edges, extend your design to the full
                        bleed size – but keep text and images within the safety
                        area. Remember to remove all die lines from your template
                        to avoid them being printed alongside your design.
                    </p>
                </Col>
            </Row>
        </div>
    );
};

export default ProductTemplateTab;
