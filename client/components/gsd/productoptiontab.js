import React from "react";
import { Col, Row } from "react-bootstrap";
import Optionimg from "../../assets/img/products/option-img1.png"
import Paperimg from "../../assets/img/products/matte_paper.jpg"

const ProductOptionTab = ({ data }) => {
    return (
        <div>
            <h3 className="mt-3 mb-3">Options: Standard Business Cards</h3>
            <div className="mt-5">
                <h4 className="mt-3 mb-3">Paper Thickness</h4>
                <Row>
                    <Col md='3'>
                        <div style={{ width: '100%', height: '200px', backgroundColor: '#f8f8f8' }}>
                            <img src={Optionimg} alt="GSD Printing" width='100%' height="100%" />
                        </div>
                        <h5 className="mt-3">Standard</h5>
                        <p>A traditional business card paper.</p>
                    </Col>

                    <Col md='3'>
                        <div style={{ width: '100%', height: '200px', backgroundColor: '#f8f8f8' }}>
                            <img src={Optionimg} alt="GSD Printing" width='100%' height="100%" />
                        </div>
                        <h5 className="mt-3">Premium</h5>
                        <p>A higher-quality, specialized stock.</p>
                    </Col>
                    <Col md='3'>
                        <div style={{ width: '100%', height: '200px', backgroundColor: '#f8f8f8' }}>
                            <img src={Optionimg} alt="GSD Printing" width='100%' height="100%" />
                        </div>
                        <h5 className="mt-3">Premium Plus</h5>
                        <p>A noticeably thicker, heavier paper.</p>
                    </Col>
                </Row>
            </div>
            <div className="mt-5">
                <h4 className="mt-3 mb-3">Paper Stocks</h4>
                <Row>
                    <Col md='3'>
                        <div style={{ width: '100%', height: '200px', backgroundColor: '#f8f8f8' }}>
                            <img src={Paperimg} alt="GSD Printing" width='100%' height="100%" />
                        </div>
                        <h5 className="mt-3">Matte</h5>
                        <p>Coated & classic, with a shine-free finish</p>
                    </Col>

                    <Col md='3'>
                        <div style={{ width: '100%', height: '200px', backgroundColor: '#f8f8f8' }}>
                            <img src={Paperimg} alt="GSD Printing" width='100%' height="100%" />
                        </div>
                        <h5 className="mt-3">Glossy</h5>
                        <p>Sleek & shiny, with a light-catching front</p>
                    </Col>
                    <Col md='3'>
                        <div style={{ width: '100%', height: '200px', backgroundColor: '#f8f8f8' }}>
                            <img src={Paperimg} alt="GSD Printing" width='100%' height="100%" />
                        </div>
                        <h5 className="mt-3">Uncoated</h5>
                        <p>Lightly textured & ideal for handwritten notes</p>
                    </Col>
                    <Col md='3'>
                        <div style={{ width: '100%', height: '200px', backgroundColor: '#f8f8f8' }}>
                            <img src={Paperimg} alt="GSD Printing" width='100%' height="100%" />
                        </div>
                        <h5 className="mt-3">Pearl</h5>
                        <p>A shimmering stock with a soft glow</p>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ProductOptionTab;
