// ** React & State
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// ** Reactstrap
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  CardTitle,
  FormGroup,
  CardText,
  Table,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';

// ** Style
import '../../assets/styles/sheet-style.scss';

// ** Utils
import { calculateAge, convertUnit } from '../../utility/Utils';

function Newpage() {
  const location = useLocation();
  const history = useHistory();

  // ** Props
  let { event, url, categoryData, divisionData, registrantData } = location?.state;
  registrantData = registrantData.slice().sort(function (a, b) {
    if (a.point === 0) return b.point - a.point;
    else if (b.point === 0) return a.point - b.point;
    else return b.point - a.point;
  });

  // ** State
  const [printing, setPrinting] = useState(false);

  // ** UseEffect
  useEffect(() => {
    const handleBeforePrint = () => {
      setPrinting(true);
    };

    const handleAfterPrint = () => {
      setPrinting(false);
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);
  return (
    <>
      <div className="container-fluid ">
        {!printing && (
          <div
            style={{ textAlign: 'right', marginRight: '20px', marginTop: '20px' }}
            className="print-button"
          >
            <button className="btn btn-primary" onClick={() => window.print()} disabled={printing}>
              Print
            </button>
            <button
              onClick={async () => await history.push(`${url}`)}
              className="btn btn-primary"
              style={{ marginLeft: '10px' }}
            >
              Back
            </button>
          </div>
        )}
        <br></br>

        {/* second section start */}
        <div style={{ width: '100%', paddingBottom: '130px' }}>
          {/* <div>
            <p style={{ textAlign: 'center' }}>[Page Number 01]</p>
          </div> */}
          {/* table score card  */}
          <div style={{ border: '1px solid#000' }}>
            <h2
              style={{
                fontSize: '18px',
                borderBottom: '1px solid#000',
                padding: '10px'
              }}
            >
              {categoryData?.categoryName}
              <span style={{ fontSize: '12px', marginLeft: '5px' }}>({event?.eventName})</span>
            </h2>
            <div
              className="d-flex"
              style={{
                borderBottom: '1px solid#000',
                padding: '4px'
              }}
            >
              <p style={{ width: '33%' }}>
                Division:<b> {divisionData?.divisionName}</b>
              </p>
              <p style={{ width: '12%', textAlign: 'center' }}>
                {' '}
                Gender: <b>{divisionData?.gender?.charAt(0).toUpperCase()}</b>
              </p>
              <p style={{ width: '15%', textAlign: 'center' }}>
                Age: <b> {divisionData?.ageFrom + ' - ' + divisionData?.ageTo}</b>
              </p>
              <p style={{ width: '15%', textAlign: 'center' }}>
                {' '}
                Rank: <b>{divisionData?.rankFrom + ' - ' + divisionData?.rankTo}</b>
              </p>
              <p style={{ width: '25%', textAlign: 'center' }}>
                Weight:{' '}
                <b>
                  {divisionData?.weightFrom +
                    ' - ' +
                    divisionData?.weightTo +
                    ' ' +
                    convertUnit(divisionData?.weightUnit)}
                </b>
              </p>
            </div>
            <div>
              <table
                style={{
                  fontFamily: 'arial, sans-serif',
                  borderCollapse: 'collapse',
                  width: '100%'
                }}
              >
                <tr>
                  <th style={{ border: '1px solid#000', textAlign: 'left', padding: '4px' }}>
                    Place
                  </th>

                  <td style={{ border: '1px solid#000', textAlign: 'left', padding: '4px' }}>
                    (ID)Member
                  </td>
                </tr>
                {registrantData?.map((item, index) => (
                  <tr>
                    <th
                      style={{
                        border: '1px solid#000',
                        textAlign: 'left',
                        padding: '4px',
                        width: '30%'
                      }}
                    >
                      {index + 1}
                      {index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'} Place
                    </th>
                    <td style={{ border: '1px solid#000', textAlign: 'left', padding: '4px' }}>
                      <p>
                        {/* ( {item.position} ){' '} */}
                        {item.memberData?.firstName +
                          (item.memberData?.middleName ? ' ' + item.memberData?.middleName : '') +
                          (item.memberData?.lastName ? ' ' + item.memberData?.lastName : '')}{' '}
                        :{' '}
                        {item.memberData?.weight &&
                          item.memberData?.weight?.value +
                            convertUnit(item.memberData?.weight?.unit)}{' '}
                        ( age {calculateAge(item.memberData?.dateOfBirth)}) -{' '}
                        {item.rank?.filter((rankItem) => categoryData?._id === rankItem.categoryId)
                          ?.length > 0
                          ? item.rank?.filter(
                              (rankItem) => categoryData?._id === rankItem.categoryId
                            )[0].rankName
                          : 'N/A'}
                      </p>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
          {/* table score card  close*/}
        </div>
        {/* second section close */}
      </div>
    </>
  );
}

export default Newpage;
