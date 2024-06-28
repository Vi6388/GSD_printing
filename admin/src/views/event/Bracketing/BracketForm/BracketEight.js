import React from 'react';
// import { Bracket, RoundProps } from 'react-brackets';
import { Col, Row } from 'reactstrap';
import '../../../../assets/styles/sheet-style.scss';
import { FaMedal } from 'react-icons/fa';
function BracketEight(props) {
  // ** props
  const { data, bracketFormCount } = props;

  return (
    <div>
      <div className="tournament tournament--double-elimination">
        <div className="tournament__logo-container tournament__logo-container--right">
          <strong className="tournament__logo tournament__logo--gold"></strong>
        </div>
        <div className="tournament__grid">
          <div className="tournament__round tournament__round--first-round">
            <div className="tournament__match">
              {/* <div className="tournament__match__status">
                <span className="tournament__match__status__container">
                  <span className="team__result">
                    <span className="team__result__left team__result--win">3</span> :
                    <span className="team__result__right">1</span>
                  </span>
                </span>
              </div> */}
              <div className="tournament__match__team">
                <i className="tournament__match__team__icon"></i>
                <span className="tournament__match__team__title top">
                  {data?.filter((item) => item.position % bracketFormCount === 0).length > 0
                    ? data?.filter((item) => item.position % bracketFormCount === 0)[0]?.member[0]
                        ?.firstName +
                      (data?.filter((item) => item.position % bracketFormCount === 0)[0]?.member[0]
                        ?.middleName
                        ? ' ' +
                          data?.filter((item) => item.position % bracketFormCount === 0)[0]
                            ?.member[0]?.middleName
                        : '') +
                      (data?.filter((item) => item.position % bracketFormCount === 0)[0]?.member[0]
                        ?.lastName
                        ? ' ' +
                          data?.filter((item) => item.position % bracketFormCount === 0)[0]
                            ?.member[0]?.lastName
                        : '')
                    : 'bye'}
                </span>
                <p
                  className="tournament__match__team__title"
                  style={{ color: '#000', fontSize: '10px' }}
                >
                  {
                    data?.filter((item) => item.position % bracketFormCount === 0)[0]?.location[0]
                      ?.name
                  }
                </p>
              </div>
              <div className="tournament__match__team">
                <i className="tournament__match__team__icon"></i>
                <span className="tournament__match__team__title bot">
                  {data?.filter((item) => item.position % bracketFormCount === 7).length > 0
                    ? data?.filter((item) => item.position % bracketFormCount === 7)[0]?.member[0]
                        ?.firstName +
                      (data?.filter((item) => item.position % bracketFormCount === 7)[0]?.member[0]
                        ?.middleName
                        ? ' ' +
                          data?.filter((item) => item.position % bracketFormCount === 7)[0]
                            ?.member[0]?.middleName
                        : '') +
                      (data?.filter((item) => item.position % bracketFormCount === 7)[0]?.member[0]
                        ?.lastName
                        ? ' ' +
                          data?.filter((item) => item.position % bracketFormCount === 7)[0]
                            ?.member[0]?.lastName
                        : '')
                    : 'bye'}
                </span>
                <p
                  className="tournament__match__team__title"
                  style={{ color: '#000', fontSize: '10px' }}
                >
                  {
                    data?.filter((item) => item.position % bracketFormCount === 7)[0]?.location[0]
                      ?.name
                  }
                </p>
              </div>
            </div>
            <div className="tournament__match">
              {/* <div className="tournament__match__status">
                <span className="tournament__match__status__container">
                  <span className="team__result">
                    <span className="team__result__left team__result--win">3</span> :
                    <span className="team__result__right">1</span>
                  </span>
                </span>
              </div> */}
              <div className="tournament__match__team">
                <i className="tournament__match__team__icon"></i>
                <span className="tournament__match__team__title top">
                  {data?.filter((item) => item.position % bracketFormCount === 4).length > 0
                    ? data?.filter((item) => item.position % bracketFormCount === 4)[0]?.member[0]
                        ?.firstName +
                      (data?.filter((item) => item.position % bracketFormCount === 4)[0]?.member[0]
                        ?.middleName
                        ? ' ' +
                          data?.filter((item) => item.position % bracketFormCount === 4)[0]
                            ?.member[0]?.middleName
                        : '') +
                      (data?.filter((item) => item.position % bracketFormCount === 4)[0]?.member[0]
                        ?.lastName
                        ? ' ' +
                          data?.filter((item) => item.position % bracketFormCount === 4)[0]
                            ?.member[0]?.lastName
                        : '')
                    : 'bye'}
                </span>
                <p
                  className="tournament__match__team__title"
                  style={{ color: '#000', fontSize: '10px' }}
                >
                  {
                    data?.filter((item) => item.position % bracketFormCount === 4)[0]?.location[0]
                      ?.name
                  }
                </p>
              </div>
              <div className="tournament__match__team">
                <i className="tournament__match__team__icon"></i>
                <span className="tournament__match__team__title bot">
                  {data?.filter((item) => item.position % bracketFormCount === 3).length > 0
                    ? data?.filter((item) => item.position % bracketFormCount === 3)[0]?.member[0]
                        ?.firstName +
                      (data?.filter((item) => item.position % bracketFormCount === 3)[0]?.member[0]
                        ?.middleName
                        ? ' ' +
                          data?.filter((item) => item.position % bracketFormCount === 3)[0]
                            ?.member[0]?.middleName
                        : '') +
                      (data?.filter((item) => item.position % bracketFormCount === 3)[0]?.member[0]
                        ?.lastName
                        ? ' ' +
                          data?.filter((item) => item.position % bracketFormCount === 3)[0]
                            ?.member[0]?.lastName
                        : '')
                    : 'bye'}
                </span>
                <p
                  className="tournament__match__team__title"
                  style={{ color: '#000', fontSize: '10px' }}
                >
                  {
                    data?.filter((item) => item.position % bracketFormCount === 3)[0]?.location[0]
                      ?.name
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="tournament__round">
            <div className="tournament__match">
              <div className="tournament__match__team"></div>
              <div className="tournament__match__team"></div>
            </div>
          </div>
          <div className="tournament__round">
            <div className="tournament__match first-round">
              <div className="tournament__match__team"></div>
            </div>
          </div>

          <div className="tournament__round tournament__round--final">
            <div className="tournament__match">
              <div className="tournament__match__status"></div>
              <div className="tournament__match__team">
                <i className="tournament__match__team__icon"></i>
                <span className="team__result mt-1 sttt w-100">
                  <span className="team__result__left team__result--win" style={{ color: 'green' }}>
                    Gold
                  </span>
                  <span className="team__result__right" style={{ color: 'green' }}>
                    Medal
                  </span>
                  <span>
                    <FaMedal fill="#EEBC1D" fontSize="20" style={{}} />
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="tournament__round tournament__round--right-bracket">
            <div className="tournament__match first-round">
              <div className="tournament__match__team"></div>
            </div>
          </div>
          <div className="tournament__round tournament__round--right-bracket">
            <div className="tournament__match">
              <div className="tournament__match__team"></div>
              <div className="tournament__match__team"></div>
            </div>
          </div>
          <div className="tournament__round tournament__round--right-bracket">
            <div className="tournament__match">
              {/* <div className="tournament__match__status">
                <span className="tournament__match__status__container">
                  <span className="team__result">
                    <span className="team__result__left team__result--win">3</span> :
                    <span className="team__result__right">1</span>
                  </span>
                </span>
              </div> */}
              <div className="tournament__match__team">
                <i className="tournament__match__team__icon"></i>
                <span className="tournament__match__team__title top">
                  {data?.filter((item) => item.position % bracketFormCount === 1).length > 0
                    ? data?.filter((item) => item.position % bracketFormCount === 1)[0]?.member[0]
                        ?.firstName +
                      (data?.filter((item) => item.position % bracketFormCount === 1)[0]?.member[0]
                        ?.middleName
                        ? ' ' +
                          data?.filter((item) => item.position % bracketFormCount === 1)[0]
                            ?.member[0]?.middleName
                        : '') +
                      (data?.filter((item) => item.position % bracketFormCount === 1)[0]?.member[0]
                        ?.lastName
                        ? ' ' +
                          data?.filter((item) => item.position % bracketFormCount === 1)[0]
                            ?.member[0]?.lastName
                        : '')
                    : 'bye'}
                </span>
                <p
                  className="tournament__match__team__title"
                  style={{ color: '#000', fontSize: '10px' }}
                >
                  {
                    data?.filter((item) => item.position % bracketFormCount === 1)[0]?.location[0]
                      ?.name
                  }
                </p>
              </div>
              <div className="tournament__match__team">
                <i className="tournament__match__team__icon"></i>
                <span className="tournament__match__team__title bot">
                  {data?.filter((item) => item.position % bracketFormCount === 6).length > 0
                    ? data?.filter((item) => item.position % bracketFormCount === 6)[0]?.member[0]
                        ?.firstName +
                      (data?.filter((item) => item.position % bracketFormCount === 6)[0]?.member[0]
                        ?.middleName
                        ? ' ' +
                          data?.filter((item) => item.position % bracketFormCount === 6)[0]
                            ?.member[0]?.middleName
                        : '') +
                      (data?.filter((item) => item.position % bracketFormCount === 6)[0]?.member[0]
                        ?.lastName
                        ? ' ' +
                          data?.filter((item) => item.position % bracketFormCount === 6)[0]
                            ?.member[0]?.lastName
                        : '')
                    : 'bye'}
                </span>
                <p
                  className="tournament__match__team__title"
                  style={{ color: '#000', fontSize: '10px' }}
                >
                  {
                    data?.filter((item) => item.position % bracketFormCount === 6)[0]?.location[0]
                      ?.name
                  }
                </p>
              </div>
            </div>
            <div className="tournament__match">
              {/* <div className="tournament__match__status">
                <span className="tournament__match__status__container">
                  <span className="team__result">
                    <span className="team__result__left team__result--win">3</span> :
                    <span className="team__result__right">1</span>
                  </span>
                </span>
              </div> */}
              <div className="tournament__match__team">
                <i className="tournament__match__team__icon"></i>
                <span className="tournament__match__team__title top">
                  {data?.filter((item) => item.position % bracketFormCount === 5).length > 0
                    ? data?.filter((item) => item.position % bracketFormCount === 5)[0]?.member[0]
                        ?.firstName +
                      (data?.filter((item) => item.position % bracketFormCount === 5)[0]?.member[0]
                        ?.middleName
                        ? ' ' +
                          data?.filter((item) => item.position % bracketFormCount === 5)[0]
                            ?.member[0]?.middleName
                        : '') +
                      (data?.filter((item) => item.position % bracketFormCount === 5)[0]?.member[0]
                        ?.lastName
                        ? ' ' +
                          data?.filter((item) => item.position % bracketFormCount === 5)[0]
                            ?.member[0]?.lastName
                        : '')
                    : 'bye'}
                </span>
                <p
                  className="tournament__match__team__title"
                  style={{ color: '#000', fontSize: '10px' }}
                >
                  {
                    data?.filter((item) => item.position % bracketFormCount === 5)[0]?.location[0]
                      ?.name
                  }
                </p>
              </div>
              <div className="tournament__match__team">
                <i className="tournament__match__team__icon"></i>
                <span className="tournament__match__team__title bot">
                  {data?.filter((item) => item.position % bracketFormCount === 1).length > 0
                    ? data?.filter((item) => item.position % bracketFormCount === 2)[0]?.member[0]
                        ?.firstName +
                      (data?.filter((item) => item.position % bracketFormCount === 2)[0]?.member[0]
                        ?.middleName
                        ? ' ' +
                          data?.filter((item) => item.position % bracketFormCount === 2)[0]
                            ?.member[0]?.middleName
                        : '') +
                      (data?.filter((item) => item.position % bracketFormCount === 2)[0]?.member[0]
                        ?.lastName
                        ? ' ' +
                          data?.filter((item) => item.position % bracketFormCount === 2)[0]
                            ?.member[0]?.lastName
                        : '')
                    : 'bye'}
                </span>
                <p
                  className="tournament__match__team__title"
                  style={{ color: '#000', fontSize: '10px' }}
                >
                  {
                    data?.filter((item) => item.position % bracketFormCount === 2)[0]?.location[0]
                      ?.name
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BracketEight;
