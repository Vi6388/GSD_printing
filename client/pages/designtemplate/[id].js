import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { getProductTemplateData, BASE_PATH } from '../request/api.js';

import Footer from "@/components/footer";
import HeaderOne from "@/components/header-one";
import PageHeader from "@/components/page-header";
import MenuContextProvider from "@/context/menu-context";
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { LuArrowUpFromLine } from "react-icons/lu";
import productimg1 from '../../assets/img/products/preview2.jpeg'
import productimg2 from '../../assets/img/products/preview3.jpeg'
import productimg3 from '../../assets/img/products/preview4.jpeg'
import productimg4 from '../../assets/img/products/preview6.jpeg'
const designtemplate = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [productTemplateList, setProductTemplate] = useState([]);
  let productID  = router.query.id;
  useEffect(() => {
    console.log(productID);  
    productID  = router.query.id;
    getData();
}, [router]); // Empty dependency array means this effect runs only once, like componentDidMount

  async function getData() {
      try {
          const fetchedData = await getProductTemplateData();
          console.log(fetchedData);
        
          // {
          //   price: "$100 from $17.99",
          //   name: "Standard(3.5 x 2)",
          //   color: "Rectangular dimensions give you a recognizable look.",
          //   imageUrl: productimg1,
          // },
      let list = fetchedData.list;
      let listDa = [];

      for(var i = 0;i < list.length;i++){
          let toAdd = { "_id": list[i]._id,"price": "$100 from $17.99", "name": "Standard(3.5 x 2)", "color": "Rectangular dimensions give you a recognizable look.", "imageUrl": BASE_PATH + "/" + list[i].templateImage};
          listDa.push(toAdd);
      }   
      setProductTemplate(listDa);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }

  const listData = [
    {
      title: "Shapes",
      items: ["Standard", "Rounded Corner", "Square"]
    },
    {
      title: "Orientation",
      items: ["Horizontal", "Vertical"]
    },
    {
      title: "Finishes",
      items: ["None", "Embossed Gloss", "Foil Accent", "Gold", "Silver"]
    },
    {
      title: "Industry",
      items: ["Agriculture & Farming", "Animals & Pet Care", "Art & Entertainment", "Automotive & Transportation", "Business Services", "Education & Child Care", "Finance & Insurance"]
    },
    {
      title: "Use Case",
      items: ["Appointment Cards", "Loyalty Cards", "QR Code", "Thank You",]
    },
    {
      title: "Styles & Themes",
      items: ["Animals", "Bold & Colorful", "Conservative", "Elegant", "Florals & Greenery"]
    },
    {
      title: "Logo / Photo Area",
      items: ["Has Logo/Photo Area"]
    },
    {
      title: "Color",
      items: ["Red", "Green"]
    },

  ];

  // const productTemplateList = [
  //   {
  //     price: "$100 from $17.99",
  //     name: "Standard(3.5 x 2)",
  //     color: "Rectangular dimensions give you a recognizable look.",
  //     imageUrl: productimg1,
  //   },
  //   {
  //     price: "$100 from $17.99",
  //     name: "Standard(3.5 x 2)",
  //     color: "Rectangular dimensions give you a recognizable look.",
  //     imageUrl: productimg2,
  //   },
  //   {
  //     price: "$100 from $17.99",
  //     name: "Standard(3.5 x 2)",
  //     color: "Rectangular dimensions give you a recognizable look.",
  //     imageUrl: productimg3,
  //   },
  //   {
  //     price: "$100 from $17.99",
  //     name: "Standard(3.5 x 2)",
  //     color: "Rectangular dimensions give you a recognizable look.",
  //     imageUrl: productimg4,
  //   },

  //   {
  //     price: "$100 from $17.99",
  //     name: "Standard(3.5 x 2)",
  //     color: "Rectangular dimensions give you a recognizable look.",
  //     imageUrl: productimg4,
  //   },

  //   {
  //     price: "$100 from $17.99",
  //     name: "Standard(3.5 x 2)",
  //     color: "Rectangular dimensions give you a recognizable look.",
  //     imageUrl: productimg4,
  //   },
  //   {
  //     price: "$100 from $17.99",
  //     name: "Standard(3.5 x 2)",
  //     color: "Rectangular dimensions give you a recognizable look.",
  //     imageUrl: productimg4,
  //   },


  // ];
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

  return (
    <div>
      <MenuContextProvider>
        <HeaderOne />
        <PageHeader title="Upload Design" name="Upload Design" />
        <section>
          <Container fluid>
            <Row>
              <Col md='12'>
                <div className="d-flex pt-5 pb-3">
                  <Form>
                    <input type="search" placeholder="search design...." className="form-control">
                    </input>
                  </Form>
                  <Button color="primary" className="btn-round ml-auto">
                    <FaHeart size={20} className="mr-2" />
                    Favorites
                  </Button>
                </div>
              </Col>
              <Col md="3" style={{ paddingLeft: '0px' }}>
                <div className="left-side-bar" style={{ top: '0px', border: '1px solid #cccccc3d' }}>
                  <h3>Business Cards</h3>
                  <hr></hr>
                  {listData.map((section, index) => (
                    <ul key={index}>
                      <h4>{section.title}</h4>
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <a href="">{item}</a>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </Col>
              <Col md='9'>
                <Row>
                  <Col md="3">
                    <a href={"/cardbuilder/" + productID}>
                      <div className="bg-gray text-center" style={{ backgroundColor: '#e3f2f6', height: '315px', padding: '50px 0px', borderRadius:'10px' }}>
                        <div className="icon-circle"
                          style={{
                            width: '90px',
                            height: '90px',
                            borderRadius: '90px',
                            textAlign: 'center',
                            padding: '20px',
                            margin: '0 auto',
                            backgroundColor: '#fff',
                            border: '1px dashed #c7bbbb'
                          }}
                        >
                          <LuArrowUpFromLine size={35} />
                        </div>
                        <h4 className="mt-2">Upload your own design</h4>
                        <p>100 from $17.99</p>
                      </div>
                    </a>
                  </Col>
                  {productTemplateList.map((product, index) => (
                    <Col md='3' key={index}>
                      <div className="product-item"> 
                        <a href={"/cardbuilder/" + productID + "?templateID=" + product._id}>
                          <div className="offer-bx">
                            <span style={{ float: 'right' }}>
                              <a href="#">
                                <FaHeart fill="#ec008c" size={25} />
                              </a>
                            </span>
                          </div>
                          <div className="" style={{ padding: '30px 15px', backgroundColor: '#f8f8f8' }}>
                            <img src={product.imageUrl} alt={product.name} width='100%' height='120px' />
                          </div>
                          <div className="p-4">
                            <h5 style={{ fontSize: '16px' }}>{product.name}</h5>
                            <p>
                              {product.description}
                            </p>
                            <p>
                              {product.price}
                            </p>
                            <div>
                              {colors.map((color, index) => (
                                <a href="#">
                                <div
                                  key={index}
                                  style={{
                                    backgroundColor: color,
                                    width: '18px',
                                    height: '18px',
                                    margin: '3px',
                                    display:'inline-block',
                                    borderRadius:'4px'
                                  }}
                                ></div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </a>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
      </MenuContextProvider>
    </div>
  );
}

export default designtemplate; // Make sure to export the DesignStudio component
