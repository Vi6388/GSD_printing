// ** React & State
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// ** Reactstrap
import { Row, Col } from 'reactstrap';

// ** Component
import BracketOne from './BracketForm/BracketOne';
import BracketTwo from './BracketForm/BracketTwo';
import BracketFour from './BracketForm/BracketFour';
import BracketEight from './BracketForm/BracketEight';
import BracketSixteen from './BracketForm/BracketSixteen';
import BracketThirtyTwo from './BracketForm/BracketThirtyTwo';

// ** Style
import '../../../assets/styles/sheet-style.scss';

// ** Utils
import { calculateAge, convertUnit } from '../../../utility/Utils';

function DivisionSheet() {
  // ** Redux State
  const location = useLocation();
  const history = useHistory();

  // ** Props
  let { event, url, data, bracketFormCount } = location?.state;
  bracketFormCount = bracketFormCount.value;

  // ** Split Bracketing
  for (let x = 0; x < data.length; x++) {
    let bracketCount = 1,
      registrantArray = [];
    if (data[x].registrant) {
      bracketCount = Math.ceil(data[x].registrant.length / bracketFormCount);
      for (let i = 0; i < bracketCount; i++) {
        registrantArray[i] = data[x].registrant.slice(
          i * bracketFormCount,
          (i + 1) * bracketFormCount
        );
      }
      data[x].registrant = registrantArray;
    } else {
      let newArray = [];
      for (let i = 0; i < bracketFormCount; i++) newArray.push(new Object());
      registrantArray[0] = newArray;
      data[x].registrant = registrantArray;
    }
  }

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
        {data.map((dataItem) => {
          return dataItem.registrant?.map((item) => (
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
                  {dataItem?.categoryData?.categoryName}
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
                    Division:<b> {dataItem?.divisionData?.divisionName}</b>
                  </p>
                  <p style={{ width: '12%', textAlign: 'center' }}>
                    {' '}
                    Gender: <b>{dataItem?.divisionData?.gender?.charAt(0).toUpperCase()}</b>
                  </p>
                  <p style={{ width: '15%', textAlign: 'center' }}>
                    Age:{' '}
                    <b>
                      {' '}
                      {dataItem?.divisionData?.ageFrom + ' - ' + dataItem?.divisionData?.ageTo}
                    </b>
                  </p>
                  <p style={{ width: '15%', textAlign: 'center' }}>
                    {' '}
                    Rank:{' '}
                    <b>
                      {dataItem?.divisionData?.rankFrom + ' - ' + dataItem?.divisionData?.rankTo}
                    </b>
                  </p>
                  <p style={{ width: '25%', textAlign: 'center' }}>
                    Weight:{' '}
                    <b>
                      {dataItem?.divisionData?.weightFrom +
                        ' - ' +
                        dataItem?.divisionData?.weightTo +
                        ' ' +
                        convertUnit(dataItem?.divisionData?.weightUnit)}
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
                        (ID)Member
                      </th>
                    </tr>
                    {item?.map((registrantItem, index) => (
                      <tr>
                        <th style={{ border: '1px solid#000', textAlign: 'left', padding: '4px' }}>
                          {registrantItem.position > -1 ? (
                            <p>
                              ( {registrantItem?.position + 1} ){' '}
                              {registrantItem?.member[0]?.firstName +
                                (registrantItem?.member[0]?.middleName
                                  ? ' ' + registrantItem?.member[0]?.middleName
                                  : '') +
                                (registrantItem?.member[0]?.lastName
                                  ? ' ' + registrantItem?.member[0]?.lastName
                                  : '')}{' '}
                              :{' '}
                              {registrantItem?.member[0]?.weight &&
                                registrantItem?.member[0]?.weight?.value +
                                  convertUnit(registrantItem?.member[0]?.weight?.unit)}{' '}
                              ( age {calculateAge(registrantItem?.member[0]?.dateOfBirth)}) -{' '}
                              {registrantItem?.rank?.filter(
                                (rankItem) => dataItem.categoryData?._id === rankItem.categoryId
                              )?.length > 0
                                ? registrantItem?.rank?.filter(
                                    (rankItem) => dataItem.categoryData?._id === rankItem.categoryId
                                  )[0].rankName
                                : 'N/A'}
                            </p>
                          ) : (
                            <p>( {index + 1} )</p>
                          )}
                        </th>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
              {/* table score card  close*/}
              <div class="page-break"></div>
              {/* compare  section */}
              <div style={{ width: '100%', marginTop: '10px' }}>
                {item?.length > 16 ? (
                  <BracketThirtyTwo data={item} bracketFormCount={bracketFormCount} />
                ) : item?.length > 8 ? (
                  <BracketSixteen data={item} bracketFormCount={bracketFormCount} />
                ) : item?.length > 4 ? (
                  <BracketEight data={item} bracketFormCount={bracketFormCount} />
                ) : item?.length > 2 ? (
                  <BracketFour data={item} bracketFormCount={bracketFormCount} />
                ) : item?.length > 1 ? (
                  <BracketTwo data={item} bracketFormCount={bracketFormCount} />
                ) : item?.length > 0 ? (
                  <BracketOne data={item} bracketFormCount={bracketFormCount} />
                ) : (
                  <>No registrant Member</>
                )}
              </div>
              <div class="page-break"></div>
              {/* compare section close*/}
              {/* second table result*/}
              <div style={{ border: '1px solid#000', marginTop: '30px' }}>
                <h2
                  style={{
                    fontSize: '18px',
                    borderBottom: '1px solid#000',
                    padding: '10px',
                    textAlign: 'center',
                    marginBottom: '0px'
                  }}
                >
                  Result
                </h2>

                <div>
                  <table
                    style={{
                      fontFamily: 'arial, sans-serif',
                      borderCollapse: 'collapse',
                      width: '100%'
                    }}
                  >
                    {item.map((placeItem, placeIndex) => (
                      <tr>
                        <th
                          style={{
                            border: '1px solid#000',
                            textAlign: 'left',
                            padding: '4px',
                            width: '30%'
                          }}
                        >
                          {placeIndex + 1}
                          {placeIndex === 0
                            ? 'st'
                            : placeIndex === 1
                            ? 'nd'
                            : placeIndex === 2
                            ? 'rd'
                            : 'th'}{' '}
                          Place
                        </th>
                        <td
                          style={{ border: '1px solid#000', textAlign: 'left', padding: '4px' }}
                        ></td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
              {/* second table result close */}
              <div class="page-break"></div>
            </div>
          ));
        })}

        {/* second section start */}

        {/* second section close */}
      </div>
    </>
  );
}

export default DivisionSheet;
