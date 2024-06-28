// ** React Imports
import { useState, Fragment, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Label,
  Input
} from 'reactstrap';

import Select from 'react-select';

// ** Icons Imports
import { Link } from 'react-feather';
import { editSocialLinksAction, fetchSingleClientAction } from '../store/actions';
import { useParams } from 'react-router-dom';
import { singleClientFetchReset, editClientReset, socialLinkReset } from '../store/reducer';
import { toast } from 'react-toastify';
import Avatar from '@components/avatar';
const socialAccounts = {
  facebook: {
    logo: require('@src/assets/images/icons/social/facebook.png').default
  },
  instagram: {
    logo: require('@src/assets/images/icons/social/instagram.png').default
  },
  twitter: {
    logo: require('@src/assets/images/icons/social/twitter.png').default
  },
  linkedin: {
    logo: require('@src/assets/images/icons/social/linkedin.png').default
  },
  dribble: {
    logo: require('@src/assets/images/icons/social/dribbble.png').default
  },
  behance: {
    title: 'behance',
    logo: require('@src/assets/images/icons/social/behance.png').default
  }
};

const connections = ({ contact, yearArray, promotedByYearData, promotedFinalData }) => {
  // ** State
  const [centeredModal, setCenteredModal] = useState(false);

  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [dribble, setDribble] = useState('');
  const [behance, setBehance] = useState('');
  const dispatch = useDispatch();

  const { id } = useParams();

  const ToastContent = ({ message }) => (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <h6 className="toast-title fw-bold">{message}</h6>
        </div>
      </div>
    </Fragment>
  );

  const planOptions = [
    { value: '', label: 'Select Year' },
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' }
  ];

  const yearOptions = (data) => {
    let yearData = [];
    yearData.push({ value: '', label: 'Select Year' });
    data.map((yearItem) => {
      yearData.push({ value: yearItem, label: yearItem });
    });
    return yearData;
  };

  const [initialSocialinks, SetInitialSocialinks] = useState([
    {
      name: 'facebook',
      link: ''
    },
    {
      name: 'instagram',
      link: ''
    },
    {
      name: 'twitter',
      link: ''
    },
    {
      name: 'linkedin',
      link: ''
    },
    {
      name: 'dribble',
      link: ''
    },
    {
      name: 'behance',
      link: ''
    }
  ]);

  function updateState(l) {
    SetInitialSocialinks((p) => {
      let newData = [];
      for (let each of p) {
        if (each.name === l.name) {
          each.link = l.link;
        }
        newData.push(each);
      }

      return [...newData];
    });
  }

  useMemo(() => {
    if (contact?.socialLinks?.length > 0) {
      for (let link of contact?.socialLinks) {
        if (link?.link !== '') {
          // updateState call to update state
          updateState(link);
        }
      }
    }
  }, [contact]);

  useEffect(() => {
    contact?.socialLinks?.map((l) => {
      updateState(l);
      if (l.name === 'facebook') {
        setFacebook(l.link);
      }
      if (l.name === 'instagram') {
        setInstagram(l.link);
      }
      if (l.name === 'twitter') {
        setTwitter(l.link);
      }
      if (l.name === 'linkedin') {
        setLinkedin(l.link);
      }
      if (l.name === 'dribble') {
        setDribble(l.link);
      }
      if (l.name === 'behance') {
        setBehance(l.link);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    const socialLinks = [
      {
        name: 'facebook',
        link: facebook
      },
      {
        name: 'instagram',
        link: instagram
      },
      {
        name: 'twitter',
        link: twitter
      },
      {
        name: 'linkedin',
        link: linkedin
      },
      {
        name: 'dribble',
        link: dribble
      },
      {
        name: 'behance',
        link: behance
      }
    ];

    SetInitialSocialinks((p) => {
      let newData = [];
      for (let l of socialLinks) {
        let current = {};
        for (let a of p) {
          if (a.name === l.name) {
            a.link = l.link;
            current = a;
          }
        }
        newData.push(current);
      }

      return [...newData];
    });

    dispatch(editSocialLinksAction(id, { socialLinks }));
  };

  const [data, setData] = useState(promotedFinalData);
  const [yearName, setYearName] = useState('');

  const handleChangeYear = (event) => {
    if (event.value === '') {
      setYearName('');
      setData(promotedFinalData);
    } else {
      setYearName(event.value);
      let selectpromotedByIdArray = promotedByYearData.filter(
        (item) => item.year === parseInt(event.value)
      );
      let selectpromotedByIdData = selectpromotedByIdArray[0];
      setData(selectpromotedByIdData.data);
    }
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <h4>My Ranking</h4>
            <div>
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                defaultValue={yearName}
                options={yearOptions(yearArray)}
                onChange={(e) => handleChangeYear(e)}
              />
            </div>
          </div>
          <div className="info-container mt-2">
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between">
                <h5 className="fw-bolder me-25">Sport Name</h5>
                <h5 className="w-50">Rank</h5>
              </li>
              {data
                ? data.map((item) => {
                    return item !== undefined ? (
                      <li className="d-flex justify-content-between mt-1">
                        <h5 className="d-flex flex-column justify-content-center fw-bolder me-25">
                          {item.sportName}
                        </h5>
                        <div className="d-flex align-items-center w-50">
                          <Avatar
                            className="mx-1"
                            img={item.rankImage}
                            alt={item.rankName}
                            imgWidth="32"
                          />
                          <div className="d-flex flex-column">
                            <span className="text-truncate fw-bolder">{item.rankName}</span>
                            <small className="text-muted">{item.categoryName}</small>
                          </div>
                        </div>
                      </li>
                    ) : null;
                  })
                : null}
            </ul>
          </div>
          <div className="vertically-centered-modal">
            <Modal
              isOpen={centeredModal}
              toggle={() => setCenteredModal(!centeredModal)}
              className="modal-dialog-centered"
            >
              <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
                Edit Social Information
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="input-default">
                      Facebook
                    </Label>
                    <Input
                      type="text"
                      id="input-default"
                      placeholder="Paste the link here ..."
                      name="facebook"
                      value={facebook}
                      onChange={(e) => {
                        setFacebook(e.target.value);
                      }}
                    />
                  </Col>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="input-default">
                      Instagram
                    </Label>
                    <Input
                      type="text"
                      id="input-default"
                      placeholder="Paste the link here ..."
                      name="instagram"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                    />
                  </Col>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="input-default">
                      Twitter
                    </Label>
                    <Input
                      type="text"
                      id="input-default"
                      placeholder="Paste the link here ..."
                      name="twitter"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                    />
                  </Col>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="input-default">
                      LinkedIn
                    </Label>
                    <Input
                      type="text"
                      id="input-default"
                      placeholder="Paste the link here ..."
                      name="linkedin"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                    />
                  </Col>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="input-default">
                      Dribble
                    </Label>
                    <Input
                      type="text"
                      id="input-default"
                      placeholder="Paste the link here ..."
                      name="dribble"
                      value={dribble}
                      onChange={(e) => setDribble(e.target.value)}
                    />
                  </Col>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="input-default">
                      Behance
                    </Label>
                    <Input
                      type="text"
                      id="input-default"
                      placeholder="Paste the link here ..."
                      name="behance"
                      value={behance}
                      onChange={(e) => setBehance(e.target.value)}
                    />
                  </Col>
                </Row>
              </ModalBody>
              {/* <ModalFooter>
                                <Button
                                    disabled={isLoading}
                                    color="primary"
                                    onClick={handleSubmit}
                                >
                                    {isLoading ? 'Processing...' : 'Update'}
                                </Button>
                            </ModalFooter> */}
            </Modal>
          </div>
          {/* <CardTitle className="d-flex justify-content-between">Social accounts</CardTitle>
                    {initialSocialinks.length > 0 &&
                        initialSocialinks.map((item, index) => {
                            return (
                                <div key={index} className="d-flex mt-2">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="me-1"
                                            src={socialAccounts[item.name].logo}
                                            alt={item.name}
                                            height="38"
                                            width="38"
                                        />
                                    </div>
                                    <div className="d-flex align-item-center justify-content-between flex-grow-1">
                                        <div className="me-1">
                                            <p className="fw-bolder mb-0">
                                                {item.name}
                                            </p>
                                        </div>
                                        <div className="mt-50 mt-sm-0">
                                            <Button
                                                outline
                                                className="btn-icon"
                                            >
                                                {item.link === '' ? (
                                                    <Link className="font-medium-3" />
                                                ) : (
                                                    <a
                                                        href={item.link}
                                                        target="_blank"
                                                    >
                                                        <Link className="font-medium-3" />
                                                    </a>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    <div className="d-flex justify-content-center pt-2">
                        <Button
                            color="primary"
                            outline
                            onClick={() => setCenteredModal(!centeredModal)}
                        >
                            Edit
                        </Button>
                    </div>
                    <div className="vertically-centered-modal">
                        <Modal
                            isOpen={centeredModal}
                            toggle={() => setCenteredModal(!centeredModal)}
                            className="modal-dialog-centered"
                        >
                            <ModalHeader
                                toggle={() => setCenteredModal(!centeredModal)}
                            >
                                Edit Social Information
                            </ModalHeader>
                            <ModalBody>
                                <Row>
                                    <Col sm="12" className="mb-1">
                                        <Label
                                            className="form-label"
                                            for="input-default"
                                        >
                                            Facebook
                                        </Label>
                                        <Input
                                            type="text"
                                            id="input-default"
                                            placeholder="Paste the link here ..."
                                            name="facebook"
                                            value={facebook}
                                            onChange={(e) => {
                                                setFacebook(e.target.value)
                                            }}
                                        />
                                    </Col>
                                    <Col sm="12" className="mb-1">
                                        <Label
                                            className="form-label"
                                            for="input-default"
                                        >
                                            Instagram
                                        </Label>
                                        <Input
                                            type="text"
                                            id="input-default"
                                            placeholder="Paste the link here ..."
                                            name="instagram"
                                            value={instagram}
                                            onChange={(e) =>
                                                setInstagram(e.target.value)
                                            }
                                        />
                                    </Col>
                                    <Col sm="12" className="mb-1">
                                        <Label
                                            className="form-label"
                                            for="input-default"
                                        >
                                            Twitter
                                        </Label>
                                        <Input
                                            type="text"
                                            id="input-default"
                                            placeholder="Paste the link here ..."
                                            name="twitter"
                                            value={twitter}
                                            onChange={(e) =>
                                                setTwitter(e.target.value)
                                            }
                                        />
                                    </Col>
                                    <Col sm="12" className="mb-1">
                                        <Label
                                            className="form-label"
                                            for="input-default"
                                        >
                                            LinkedIn
                                        </Label>
                                        <Input
                                            type="text"
                                            id="input-default"
                                            placeholder="Paste the link here ..."
                                            name="linkedin"
                                            value={linkedin}
                                            onChange={(e) =>
                                                setLinkedin(e.target.value)
                                            }
                                        />
                                    </Col>
                                    <Col sm="12" className="mb-1">
                                        <Label
                                            className="form-label"
                                            for="input-default"
                                        >
                                            Dribble
                                        </Label>
                                        <Input
                                            type="text"
                                            id="input-default"
                                            placeholder="Paste the link here ..."
                                            name="dribble"
                                            value={dribble}
                                            onChange={(e) =>
                                                setDribble(e.target.value)
                                            }
                                        />
                                    </Col>
                                    <Col sm="12" className="mb-1">
                                        <Label
                                            className="form-label"
                                            for="input-default"
                                        >
                                            Behance
                                        </Label>
                                        <Input
                                            type="text"
                                            id="input-default"
                                            placeholder="Paste the link here ..."
                                            name="behance"
                                            value={behance}
                                            onChange={(e) =>
                                                setBehance(e.target.value)
                                            }
                                        />
                                    </Col>
                                </Row>
                            </ModalBody>
                            {/* <ModalFooter>
                                <Button
                                    disabled={isLoading}
                                    color="primary"
                                    onClick={handleSubmit}
                                >
                                    {isLoading ? 'Processing...' : 'Update'}
                                </Button>
                            </ModalFooter> */}
          {/* </Modal>
                    </div>  */}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default connections;
