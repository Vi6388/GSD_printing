// ** React Imports
import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';

// ** Email App Component Imports

import Sidebar from './Sidebar';

// ** Third Party Components

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';

import PerfectScrollbar from 'react-perfect-scrollbar';
// ** Styles
import '@styles/react/apps/app-email.scss';

const EventSettingsMain = (props) => {
  const { event } = props;
  // const [active, setActive] = useState('1');
  // const [open, setOpen] = useState(false);

  // const toggle = (tab) => {
  //   if (active !== tab) {
  //     setActive(tab);
  //   }
  // };
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);

  // ** Toggle Compose Function
  const toggleCompose = () => setComposeOpen(!composeOpen);

  // ** Store Variables
  const dispatch = useDispatch();
  const store = useSelector((state) => state.email);

  // ** Vars
  const params = useParams();

  return (
    // <Fragment>
    //   <Card className="p-1">
    //     <div>
    //       <h4>2023 CMA BROOKLYN REGIONAL CHAMPIONSHIPS</h4>
    //     </div>
    //     <div>
    //       <Card className="p-1 bg-primary text-white">
    //         <b>Event Setting</b>
    //       </Card>
    //       <div>
    //         <div>
    //           <Row className="mt-1">
    //             <Col sm={6} lg={6} md={6}>
    //               <span>
    //                 <b>Ring Setup</b>
    //               </span>
    //               <div className="cursor-pointer" onClick={() => setOpen(true)}>
    //                 <span className="textcolor">{'>>Set Rounds And Rings'}</span>
    //               </div>
    //               <div className="cursor-pointer" onClick={() => setOpen(true)}>
    //                 <span className="textcolor">{'>>Update Report Time'}</span>
    //               </div>
    //               <div className="cursor-pointer" onClick={() => setOpen(true)}>
    //                 <span className="textcolor">{'>>Set Tournament Rules'}</span>
    //               </div>
    //               <div className="cursor-pointer" onClick={() => setOpen(true)}>
    //                 <span className="textcolor">{'>>Set Award Rules'}</span>
    //               </div>
    //             </Col>
    //             <Col sm={6} lg={6} md={6}>
    //               <span>
    //                 <b>Event View</b>
    //               </span>
    //               <div className="cursor-pointer" onClick={() => setOpen(true)}>
    //                 <span className="textcolor">{'>>Ring Assignment'}</span>
    //               </div>
    //               <div className="cursor-pointer" onClick={() => setOpen(true)}>
    //                 <span className="textcolor">{'>>View Rings'}</span>
    //               </div>
    //               <div className="cursor-pointer" onClick={() => setOpen(true)}>
    //                 <span className="textcolor">{'>>Medal Setting'}</span>
    //               </div>
    //               <div className="cursor-pointer" onClick={() => setOpen(true)}>
    //                 <span className="textcolor">{'>>Set BRacket Access'}</span>
    //               </div>
    //             </Col>
    //           </Row>
    //         </div>
    //       </div>
    //     </div>
    //   </Card>
    //   <Modal toggle={() => setOpen(false)} className="modal-dialog-centered" isOpen={open}>
    //     <ModalHeader className="bg-transparent" toggle={() => setOpen((p) => !p)}></ModalHeader>
    //     <ModalBody className="px-sm-5 mx-50 pb-5">
    //       <div>
    //         <h3 className="text-center mb-1">Set Rounds And Rings</h3>
    //         <Row>
    //           <Col sm={6} lg={6} md={6}>
    //             <Label>Rounds</Label>
    //             <Input type="select">
    //               <option>1</option>
    //               <option>2</option>
    //               <option>3</option>
    //               <option>4</option>
    //               <option>5</option>
    //               <option>6</option>
    //             </Input>
    //           </Col>
    //           <Col sm={6} lg={6} md={6}>
    //             <Label>Rings</Label>
    //             <Input type="select">
    //               <option>1</option>
    //               <option>2</option>
    //               <option>3</option>
    //               <option>4</option>
    //               <option>5</option>
    //               <option>6</option>
    //               <option>7</option>
    //               <option>8</option>
    //               <option>9</option>
    //               <option>10</option>
    //               <option>11</option>
    //               <option>12</option>
    //               <option>13</option>
    //               <option>14</option>
    //               <option>15</option>
    //               <option>16</option>
    //               <option>17</option>
    //               <option>18</option>
    //               <option>19</option>
    //               <option>20</option>
    //               <option>21</option>
    //               <option>22</option>
    //               <option>23</option>
    //               <option>24</option>
    //             </Input>
    //           </Col>
    //         </Row>
    //       </div>
    //     </ModalBody>
    //     <ModalFooter className="d-flex justify-content-between ">
    //       <Button className="mt-1 me-3" outline onClick={() => setOpen(false)}>
    //         Cancel
    //       </Button>
    //       <Button className="mt-1" color="primary">
    //         Confirm
    //       </Button>
    //     </ModalFooter>
    //   </Modal>
    // </Fragment>

    <div className="overflow-hidden email-application">
      <div className="content-overlay"></div>
      <div className="content-area-wrapper p-0 animate__animated animate__fadeIn">
        <Fragment>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} event={event} />
        </Fragment>
      </div>
    </div>
  );
};
export default EventSettingsMain;
