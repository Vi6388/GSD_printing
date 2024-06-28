// ** React Imports
import { Fragment, useEffect, useState } from 'react';
// ** Custom Components
import { AiOutlinePlus } from 'react-icons/ai';
// import Repeater from '@components/repeater';
import CreatableSelect from 'react-select/creatable';
import { Plus, X } from 'react-feather';

// ** User List Component
import DataTable from 'react-data-table-component';
import { MoreVertical, Edit, Eye, Trash } from 'react-feather';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import PerfectScrollbar from 'react-perfect-scrollbar';
// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  Row,
  Col,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import '@styles/react/apps/app-kanban.scss';
import Card from './Card';
//redux imports
import { useDispatch } from 'react-redux';
import {
  categoriesAddAction,
  categoriesEditAction,
  categoriesDeleteAction,
  progressionCategoriesDivisionAddAction,
  progressionCategoriesDivisionDeleteAction,
  progressionCategoriesDivisionEditAction,
  progressionCategoriesRankAddAction,
  progressionCategoriesRankDeleteAction,
  progressionCategoriesRankEditAction
} from '../../store/actions';
import { useQuery } from 'react-query';
import {
  fetchDivisionDataRQ,
  fetchRankDataRQ
} from '../../../../../../requests/settings/sport-management';
import { convertUnit } from '../../../../../../utility/Utils';

const Layout = (props) => {
  const dispatch = useDispatch();
  const { progressionId, categories, sportName, selectCategoryId, setSelectCategoryId } = props;

  const { data: divisionTableData, refetch: divisionTableDataRefetch } = useQuery(
    ['division-table', selectCategoryId],
    fetchDivisionDataRQ
  );

  const { data: rankTableData, refetch: rankTabledataRefetch } = useQuery(
    ['rank-table', selectCategoryId],
    fetchRankDataRQ
  );

  const [active, setActive] = useState('1');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  useEffect(() => {
    setActivecard('');
  }, [progressionId]);

  const [height, setHeight] = useState({
    fromValue: 1,
    fromDecimalValue: 0,
    toValue: 8,
    toDecimalValue: 0,
    unit: 'feet'
  });

  const [weight, setWeight] = useState({
    fromValue: 10,
    fromDecimalValue: 0,
    toValue: 400,
    toDecimalValue: 0,
    label: 'pounds'
  });

  let divisionOrders = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
  ];

  let rankOrders = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30
  ];

  for (let i = 0; i < divisionTableData?.length; i++) {
    const element = divisionOrders.indexOf(divisionTableData[i]?.rankOrder);
    if (element != -1) {
      divisionOrders.splice(element, 1);
    }
  }

  for (let i = 0; i < rankTableData?.length; i++) {
    const element = rankOrders.indexOf(rankTableData[i]?.rankOrder);
    if (element != -1) {
      rankOrders.splice(element, 1);
    }
  }

  const divisionColumns = [
    {
      name: 'Name',
      selector: (row) => row.divisionName
    },

    {
      name: 'gender',
      selector: (row) => convertUnit(row.gender)
    },

    {
      name: 'age',
      selector: (row) => row.ageFrom + ' - ' + row.ageTo
    },

    {
      name: 'rank',
      selector: (row) => row.rankFrom + ' - ' + row.rankTo
    },

    {
      name: 'height',
      selector: (row) => row.heightFrom + ' - ' + row.heightTo + ' ' + convertUnit(row.heightUnit)
    },

    {
      name: 'weight',
      selector: (row) => row.weightFrom + ' - ' + row.weightTo + ' ' + convertUnit(row.weightUnit)
    },

    {
      name: 'Action',
      cell: (row) => (
        <div className="column-action">
          <Edit
            size={16}
            className=" cursor-pointer me-50"
            onClick={() => {
              toggledivisionmodal();
              setIsDivisionModalEditable(true);
              setDivisionInputData({
                id: row._id,
                categoryId: row.categoryId,
                divisionName: row.divisionName,
                gender: row.gender,
                ageFrom: row.ageFrom,
                ageTo: row.ageTo,
                rankFrom: row.rankFrom,
                rankTo: row.rankTo
              });
              setHeight({
                unit: row.heightUnit,
                fromValue: Math.floor(row.heightFrom),
                fromDecimalValue: Math.floor((row.heightFrom - Math.floor(row.heightFrom)) * 10),
                toValue: Math.floor(row.heightTo),
                toDecimalValue: Math.floor((row.heightTo - Math.floor(row.heightTo)) * 10)
              });
              setWeight({
                unit: row.weightUnit,
                fromValue: Math.floor(row.weightFrom),
                fromDecimalValue: Math.floor((row.weightFrom - Math.floor(row.weightFrom)) * 10),
                toValue: Math.floor(row.weightTo),
                toDecimalValue: Math.floor((row.weightTo - Math.floor(row.weightTo)) * 10)
              });
            }}
          />
          <Trash
            size={16}
            className="cursor-pointer"
            onClick={() => {
              Swal.fire({
                title: 'Are you sure?',
                text: `Are you delete ${row.divisionName} ?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete !'
              }).then((willDelete) => {
                if (willDelete.isConfirmed) {
                  dispatch(
                    progressionCategoriesDivisionDeleteAction(row._id, divisionTableDataRefetch)
                  );
                }
              });
            }}
          ></Trash>
        </div>
      )
    }
  ];

  const rankColumns = [
    {
      name: 'Rank Color',
      selector: (row) => row.Color,
      cell: (row) => <div className="m-1 p-1 rounded" style={{ backgroundColor: row.Color }}></div>
    },
    {
      name: 'Rank Name',
      selector: (row) => row.rankName
    },
    {
      name: 'Rank Order',
      selector: (row) => row.rankOrder,
      sortable: true
    },
    {
      name: 'Rank Image',
      selector: (row) => row.rankImage,
      cell: (row) => <img height="40" width="40" src={row.rankImage} />
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="column-action">
          <Edit
            size={16}
            className=" cursor-pointer me-50"
            onClick={() => {
              setIsRankModalEditable(true);
              setRankInputData({
                id: row._id,
                categoryId: row?.categoryId,
                rankName: row?.rankName,
                rankOrder: row?.rankOrder,
                Color: row?.Color
              });
              togglerankmodal();
            }}
          />
          <Trash
            size={16}
            className="cursor-pointer"
            onClick={() => {
              Swal.fire({
                title: 'Are you sure?',
                text: `Are you delete ${row.rankName} ?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete !'
              }).then((willDelete) => {
                if (willDelete.isConfirmed) {
                  dispatch(progressionCategoriesRankDeleteAction(row._id, rankTabledataRefetch));
                }
              });
            }}
          ></Trash>
        </div>
      )
    }
  ];

  //for navtabs
  const [activecard, setActivecard] = useState('');
  const [activeElementData, setActiveElementData] = useState({ sportName: '', categoryName: '' });
  const [itemmodal, setItemmodal] = useState(false);
  const [isRankModalEditable, setIsRankModalEditable] = useState(false);
  const [isDivisionModalEditable, setIsDivisionModalEditable] = useState(false);
  const [isCategoryEditable, setIsCategoryEditable] = useState(false);

  //for division add modal
  const [divisionmodal, setDivisionmodal] = useState(false);

  // hooks regarding category add form
  const [categoryInputData, setCategoryInputData] = useState({
    id: '',
    sportId: '',
    categoryName: '',
    ageFrom: 1,
    ageTo: 100,
    description: ''
  });
  //regarding add rank form
  const [showHeightData, setShowHeightData] = useState(false);
  const [showWeightData, setShowWeightData] = useState(false);
  const [divisionInputData, setDivisionInputData] = useState({
    id: '',
    categoryId: '',
    categoryName: '',
    Name: '',
    ageFrom: 1,
    ageTo: 100,
    rankFrom: 1,
    rankTo: 100000,
    gender: 'male'
  });

  // ** Handlers
  const handleDivisionInput = (e) => {
    setDivisionInputData({ ...divisionInputData, [e.target.name]: e.target.value }, []);
  };

  const handleNewDivision = (e) => {
    e.preventDefault();
    let payload = {
      id: divisionInputData.id,
      categoryId: divisionInputData.categoryId,
      categoryName: divisionInputData.categoryName,
      divisionName: divisionInputData.divisionName,
      gender: divisionInputData.gender ? divisionInputData.gender : 'male',
      ageFrom: parseInt(divisionInputData.ageFrom),
      ageTo: parseInt(divisionInputData.ageTo),
      rankFrom: parseInt(divisionInputData.rankFrom),
      rankTo: parseInt(divisionInputData.rankTo),
      heightUnit: height.unit ? height.unit : 'feet',
      heightFrom: parseFloat(height.fromValue + '.' + height.fromDecimalValue),
      heightTo: parseFloat(height.toValue + '.' + height.toDecimalValue),
      weightUnit: weight.unit ? weight.unit : 'pounds',
      weightFrom: parseFloat(weight.fromValue + '.' + weight.fromDecimalValue),
      weightTo: parseFloat(weight.toValue + '.' + weight.toDecimalValue)
    };
    isDivisionModalEditable
      ? dispatch(
          progressionCategoriesDivisionEditAction(
            payload,
            divisionInputData.id,
            divisionTableDataRefetch
          )
        )
      : dispatch(
          progressionCategoriesDivisionAddAction(
            payload,
            divisionInputData.categoryId,
            divisionTableDataRefetch
          )
        );
    setIsDivisionModalEditable(false);
    setDivisionmodal(!divisionmodal);
  };

  let weightList = [];
  for (let i = 1; i <= 120; i++) {
    weightList.push(i);
  }
  let heightList = [];
  for (let i = 1; i <= 200; i++) {
    heightList.push(i);
  }
  let decimalList = [];
  for (let i = 0; i <= 9; i++) {
    decimalList.push(i);
  }

  const handleHeightCheckboxChange = () => {
    setShowHeightData(!showHeightData);
  };

  const handleWeightCheckboxChange = () => {
    setShowWeightData(!showWeightData);
  };

  const handleCategoryClick = (i, item) => {
    setActivecard(i);
    setDivisionInputData({ categoryId: item?._id });
    setRankInputData({ categoryId: item?._id });
    setCategoryInputData({
      ...categoryInputData,
      id: item._id,
      sportId: progressionId,
      // rule:item?.rule,
      categoryName: item?.categoryName,
      ageFrom: item?.ageFrom,
      ageTo: item?.ageTo,
      description: item?.description
    });
    setActiveElementData({ categoryName: item?.categoryName, sportName: sportName });
    setSelectCategoryId(item?._id);
    // dispatch(progressionCategoriesDivisionFetchAction(item?._id));
    // dispatch(progressionCategoriesRankFetchAction(item?._id));
  };

  const handleCategoryInput = (e) => {
    e.preventDefault();
    isCategoryEditable
      ? dispatch(categoriesEditAction(categoryInputData))
      : dispatch(categoriesAddAction(categoryInputData));
    toggleitemmodal();
  };

  const toggleitemmodal = () => setItemmodal(!itemmodal);
  const toggledivisionmodal = () => {
    setDivisionmodal(!divisionmodal);
  };

  const [rankmodal, setRankmodal] = useState(false);
  const togglerankmodal = () => {
    setRankmodal(!rankmodal);
  };

  const [rankInputData, setRankInputData] = useState({
    id: '',
    categoryId: '',
    rankName: '',
    categoryName: '',
    Color: '#000000'
  });
  const handleRankInput = (e) => {
    if (e.target.name != 'rankImage') {
      setRankInputData({ ...rankInputData, [e.target.name]: e.target.value }, []);
    }
    if (e.target.name === 'rankImage') {
      setRankInputData({ ...rankInputData, file: e.target.files[0] });
    }
  };

  const handleNewRank = (e) => {
    e.preventDefault();
    if (rankInputData?.rankOrder === 'select') {
      toast.error('Please select Rank Order');
    } else {
      const formData = new FormData();
      formData.append('categoryId', rankInputData.categoryId);
      formData.append('rankName', rankInputData.rankName);
      formData.append('Color', rankInputData.Color);
      formData.append('rankOrder', rankInputData.rankOrder);
      formData.append('file', rankInputData.file);
      isRankModalEditable
        ? (formData.append('id', rankInputData.id),
          dispatch(
            progressionCategoriesRankEditAction(formData, rankInputData?.id, rankTabledataRefetch)
          ))
        : dispatch(
            progressionCategoriesRankAddAction(
              formData,
              rankInputData?.categoryId,
              rankTabledataRefetch
            )
          );
      setIsRankModalEditable(false);
      togglerankmodal();
    }
  };

  return (
    <div className="m-1">
      <Fragment>
        <div className="app-user-list">
          <Row>
            {categories?.map((item, i) => (
              <>
                <Col lg="4" sm="6">
                  <div
                    className={`card border ${activecard === i ? 'border border-primary' : ''}`}
                    onClick={() => handleCategoryClick(i, item)}
                  >
                    <Card
                      togglemodal={toggleitemmodal}
                      isCategoryEditable={isCategoryEditable}
                      setIsCategoryEditable={setIsCategoryEditable}
                      categoryData={categoryInputData}
                      setCategoryData={setCategoryInputData}
                      totalRanks={':data'}
                      id={item._id}
                      rule={item?.rule}
                      title={item?.categoryName}
                      agefrom={item?.ageFrom}
                      ageto={item?.ageTo}
                      description={item?.description}
                      subcategory={item?.subCategory}
                      card
                    />
                  </div>
                </Col>
              </>
            ))}
            <Col lg="4">
              <div className="card p-3">
                <Button
                  onClick={() => {
                    toggleitemmodal();
                    setCategoryInputData({
                      ...categoryInputData,
                      id: '',
                      sportId: progressionId,
                      categoryName: '',
                      ageFrom: 1,
                      ageTo: 100,
                      description: ''
                    });
                    setIsCategoryEditable(false);
                  }}
                  width="2"
                  color="primary"
                >
                  Add Category
                </Button>
              </div>
            </Col>
          </Row>
          <Col xl={12}>
            <div className="react-dataTable user-view-account-projects">
              <Nav tabs className="mb-2" style={{ float: 'left' }}>
                <NavItem>
                  <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                    <span className="fs-6">Divisions</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                    <span className="fs-6">Ranks</span>
                  </NavLink>
                </NavItem>
              </Nav>

              <div className="mb-2 rounded-0 " style={{ float: 'right' }}>
                <div className="d-flex justify-content-between">
                  <div>{/* Programme{'>' + activecard} */}</div>
                  <div>
                    <Button
                      color="primary"
                      disabled={activecard === '' ? true : false}
                      onClick={() => {
                        if (active === '1') {
                          toggledivisionmodal();
                          setIsDivisionModalEditable(false);
                          setDivisionInputData({
                            ...divisionInputData,
                            Name: '',
                            divisionName: '',
                            ageFrom: 1,
                            ageTo: 100,
                            rankFrom: 1,
                            rankTo: 100,
                            gender: 'male'
                          });
                          setHeight({
                            ...height,
                            fromValue: 1,
                            fromDecimalValue: 0,
                            toValue: 8,
                            toDecimalValue: 0,
                            unit: 'feet'
                          });
                          setWeight({
                            ...weight,
                            fromValue: 10,
                            fromDecimalValue: 0,
                            toValue: 400,
                            toDecimalValue: 0,
                            unit: 'pounds'
                          });
                        } else {
                          togglerankmodal();
                          setIsRankModalEditable(false);
                          setRankInputData({
                            ...rankInputData,
                            rankName: '',
                            categoryName: '',
                            Color: '#000000'
                          });
                        }
                      }}
                    >
                      {active === '1' ? 'Add Division' : 'Add Rank'}
                      <p className="m-0 text-dark">{divisionInputData?.categoryName}</p>
                    </Button>
                  </div>
                </div>
              </div>
              <TabContent activeTab={active}>
                <TabPane tabId="1">
                  <DataTable
                    noHeader
                    responsive
                    columns={divisionColumns}
                    data={selectCategoryId ? divisionTableData : []}
                    toggledivisionmodal
                    className="react-dataTable"
                  />
                </TabPane>
                <TabPane tabId="2">
                  <DataTable
                    noHeader
                    responsive
                    columns={rankColumns}
                    data={selectCategoryId ? rankTableData : []}
                    togglerankmodal
                    className="react-dataTable"
                  />
                </TabPane>
              </TabContent>
            </div>
          </Col>

          {/* Category Modal */}

          <Modal centered={true} isOpen={itemmodal} toggle={toggleitemmodal} size="md">
            <ModalHeader toggle={toggleitemmodal}>
              {isCategoryEditable ? 'Edit Category' : 'Add Category'}
            </ModalHeader>
            <Form onSubmit={handleCategoryInput} encType="multipart/form-data">
              <ModalBody>
                <FormGroup>
                  <Label for="categoryName">
                    {isCategoryEditable ? 'Category Name' : 'Enter Category Name'}
                  </Label>
                  <Input
                    type="text"
                    name="categoryName"
                    id="categoryName"
                    placeholder=""
                    value={categoryInputData?.categoryName}
                    onChange={(e) =>
                      setCategoryInputData({
                        ...categoryInputData,
                        [e.target.name]: e.target.value
                      })
                    }
                  />
                </FormGroup>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="ageFrom">
                        {isCategoryEditable ? 'Category Age From' : 'Enter Age From'}
                      </Label>
                      <Input
                        type="number"
                        name="ageFrom"
                        id="ageFrom"
                        value={categoryInputData?.ageFrom}
                        placeholder=""
                        onChange={(e) =>
                          setCategoryInputData({
                            ...categoryInputData,
                            [e.target.name]: parseInt(e.target.value)
                          })
                        }
                        min={1}
                        max={categoryInputData?.ageTo}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="ageTo">
                        {isCategoryEditable ? 'Category Age To' : 'Enter Age To'}
                      </Label>
                      <Input
                        type="number"
                        name="ageTo"
                        id="ageTo"
                        value={categoryInputData?.ageTo}
                        placeholder=""
                        onChange={(e) =>
                          setCategoryInputData({
                            ...categoryInputData,
                            [e.target.name]: parseInt(e.target.value)
                          })
                        }
                        min={categoryInputData?.ageFrom}
                        max={100}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="description">
                    {isCategoryEditable ? 'Category Description' : 'Enter Category Description'}
                  </Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    placeholder=""
                    value={categoryInputData?.description}
                    onChange={(e) =>
                      setCategoryInputData({
                        ...categoryInputData,
                        [e.target.name]: e.target.value
                      })
                    }
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="btn btn-outline-danger" onClick={toggleitemmodal}>
                  Cancel
                </Button>{' '}
                <Button type="submit" color="btn btn-primary">
                  {isCategoryEditable ? 'Edit' : 'Add'}
                </Button>
              </ModalFooter>
            </Form>
          </Modal>

          {/* Rank Modal */}

          <Modal centered={true} isOpen={rankmodal} toggle={togglerankmodal} size="sm">
            <ModalHeader toggle={togglerankmodal}>
              {isRankModalEditable ? 'Edit Rank' : 'Add Rank'}{' '}
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={handleNewRank}>
                <FormGroup>
                  <Label for="rankName">Rank Name</Label>
                  <Input
                    type="text"
                    name="rankName"
                    id="categoryName"
                    placeholder=""
                    value={rankInputData?.rankName}
                    onChange={handleRankInput}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="order">Rank Order</Label>
                  <Input
                    type="select"
                    defalutValue={1}
                    required
                    name="rankOrder"
                    id="order"
                    value={rankInputData?.rankOrder}
                    onChange={handleRankInput}
                  >
                    {isRankModalEditable ? (
                      <option value={rankInputData?.rankOrder}>{rankInputData?.rankOrder}</option>
                    ) : (
                      <option value="select">Select</option>
                    )}
                    {rankOrders?.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label>Color</Label>
                  <Input
                    name="Color"
                    type="color"
                    value={rankInputData?.Color}
                    onChange={handleRankInput}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">
                    {isRankModalEditable ? 'Change Image' : 'Upload Image'}
                  </Label>
                  <Input id="exampleFile" name="rankImage" onChange={handleRankInput} type="file" />
                </FormGroup>
                <Button color="btn btn-outline-danger" onClick={togglerankmodal}>
                  Cancel
                </Button>{' '}
                <Button type="submit" color="btn btn-primary">
                  {isRankModalEditable ? 'Edit Rank' : 'Add Rank'}
                </Button>
              </Form>
            </ModalBody>
          </Modal>

          {/* Division Modal */}

          <Modal centered={true} isOpen={divisionmodal} toggle={toggledivisionmodal} size="lg">
            <ModalHeader toggle={toggledivisionmodal}>
              {activeElementData?.sportName +
              ' > ' +
              activeElementData?.categoryName +
              ' > ' +
              isDivisionModalEditable
                ? 'Edit Division'
                : 'Add New Division'}
            </ModalHeader>

            {/* <ModalHeader toggle={toggledivisionmodal}> {progressionItem.sportName}>{title}Add New Division</ModalHeader> */}
            <Form onSubmit={handleNewDivision}>
              <ModalBody>
                <Row>
                  <Col md="6" sm="12" className="mb-1">
                    <Label className="form-label" for="divisionName">
                      Division Name
                    </Label>
                    <Input
                      type="text"
                      name="divisionName"
                      id="divisionName"
                      value={divisionInputData?.divisionName}
                      placeholder="Enter division "
                      onChange={handleDivisionInput}
                    />
                  </Col>
                  <Col md="6" sm="12" className="mb-1">
                    <Label className="form-label" for="gender">
                      Gender (M/F)
                    </Label>
                    <Input
                      type="select"
                      name="gender"
                      id="gender"
                      value={divisionInputData?.gender}
                      onChange={handleDivisionInput}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Input>
                  </Col>
                </Row>

                <Row>
                  <Col md="6" sm="12" className="mb-1">
                    <Label className="form-label" for="divisionAge">
                      Age From
                    </Label>
                    <Input
                      type="number"
                      name="ageFrom"
                      id="ageFrom"
                      value={divisionInputData?.ageFrom}
                      placeholder="Enter division age from"
                      onChange={handleDivisionInput}
                      max={divisionInputData?.ageTo}
                      min={1}
                    />
                  </Col>
                  <Col md="6" sm="12" className="mb-1">
                    <Label className="form-label" for="divisionAgeTo">
                      Age to
                    </Label>
                    <Input
                      type="number"
                      name="ageTo"
                      id="ageTo"
                      value={divisionInputData?.ageTo}
                      placeholder="Enter division age to"
                      onChange={handleDivisionInput}
                      max={100}
                      min={divisionInputData?.ageFrom}
                    />
                  </Col>
                </Row>
                <Row>
                  <label>Progression Name</label>
                  <Col md="6" sm="12" className="mb-1">
                    <Label className="form-label" for="divisionRank">
                      Rank from
                    </Label>
                    <Input
                      type="number"
                      name="rankFrom"
                      id="rankFrom"
                      value={divisionInputData?.rankFrom}
                      placeholder="Enter division rank from"
                      onChange={handleDivisionInput}
                      max={divisionInputData?.rankTo}
                      min={1}
                    />
                  </Col>
                  <Col md="6" sm="12" className="mb-1">
                    <Label className="form-label" for="divisionRankTo">
                      Rank to
                    </Label>
                    <Input
                      type="number"
                      name="rankTo"
                      id="rankTo"
                      value={divisionInputData?.rankTo}
                      placeholder="Enter division rank to"
                      onChange={handleDivisionInput}
                      max={100}
                      min={divisionInputData?.rankFrom}
                    />
                  </Col>
                </Row>

                <FormGroup check>
                  <Input
                    id="heightCheck"
                    name="check"
                    type="checkbox"
                    checked={!showHeightData}
                    onChange={handleHeightCheckboxChange}
                  />
                  <Label check for="heightCheck">
                    Height
                  </Label>
                </FormGroup>
                <div>
                  <div className="d-flex justify-content-between">
                    <Col md="2" sm="12" className="mb-1">
                      <Label className="form-label" for=" Height From">
                        Type
                      </Label>
                      <Input
                        type="select"
                        name="unit"
                        value={height?.unit}
                        disabled={showHeightData}
                        onChange={(e) => {
                          setHeight({
                            ...height,
                            [e.target.name]: e.target.value,
                            fromValue:
                              height.unit === 'feet'
                                ? e.target.value === 'inch'
                                  ? Math.floor(
                                      (height.fromValue + height.fromDecimalValue / 10) * 12
                                    )
                                  : Math.floor(
                                      (height.fromValue + height.fromDecimalValue / 10) * 30.48
                                    )
                                : height.unit === 'inch'
                                ? e.target.value === 'feet'
                                  ? Math.floor(
                                      (height.fromValue + height.fromDecimalValue / 10) / 12
                                    )
                                  : Math.floor(
                                      (height.fromValue + height.fromDecimalValue / 10) * 2.54
                                    )
                                : e.target.value === 'feet'
                                ? Math.floor(
                                    (height.fromValue + height.fromDecimalValue / 10) / 30.48
                                  )
                                : Math.floor(
                                    (height.fromValue + height.fromDecimalValue / 10) / 2.54
                                  ),
                            fromDecimalValue:
                              height.unit === 'feet'
                                ? e.target.value === 'inch'
                                  ? Math.floor(
                                      ((height.fromValue + height.fromDecimalValue / 10) * 12 -
                                        Math.floor(
                                          (height.fromValue + height.fromDecimalValue / 10) * 12
                                        )) *
                                        10
                                    )
                                  : Math.floor(
                                      ((height.fromValue + height.fromDecimalValue / 10) * 30.48 -
                                        Math.floor(
                                          (height.fromValue + height.fromDecimalValue / 10) * 30.48
                                        )) *
                                        10
                                    )
                                : height.unit === 'inch'
                                ? e.target.value === 'feet'
                                  ? Math.floor(
                                      ((height.fromValue + height.fromDecimalValue / 10) / 12 -
                                        Math.floor(
                                          (height.fromValue + height.fromDecimalValue / 10) / 12
                                        )) *
                                        10
                                    )
                                  : Math.floor(
                                      ((height.fromValue + height.fromDecimalValue / 10) * 2.54 -
                                        Math.floor(
                                          (height.fromValue + height.fromDecimalValue / 10) * 2.54
                                        )) *
                                        10
                                    )
                                : e.target.value === 'feet'
                                ? Math.floor(
                                    ((height.fromValue + height.fromDecimalValue / 10) / 30.48 -
                                      Math.floor(
                                        (height.fromValue + height.fromDecimalValue / 10) / 30.48
                                      )) *
                                      10
                                  )
                                : Math.floor(
                                    ((height.fromValue + height.toDecimalValue / 10) / 2.54 -
                                      Math.floor(
                                        (height.fromValue + height.toDecimalValue / 10) / 2.54
                                      )) *
                                      10
                                  ),
                            toValue:
                              height.unit === 'feet'
                                ? e.target.value === 'inch'
                                  ? Math.floor((height.toValue + height.toDecimalValue / 10) * 12)
                                  : Math.floor(
                                      (height.toValue + height.toDecimalValue / 10) * 30.48
                                    )
                                : height.unit === 'inch'
                                ? e.target.value === 'feet'
                                  ? Math.floor((height.toValue + height.toDecimalValue / 10) / 12)
                                  : Math.floor((height.toValue + height.toDecimalValue / 10) * 2.54)
                                : e.target.value === 'feet'
                                ? Math.floor((height.toValue + height.toDecimalValue / 10) / 30.48)
                                : Math.floor((height.toValue + height.toDecimalValue / 10) / 2.54),
                            toDecimalValue:
                              height.unit === 'feet'
                                ? e.target.value === 'inch'
                                  ? Math.floor(
                                      ((height.toValue + height.toDecimalValue / 10) * 12 -
                                        Math.floor(
                                          (height.toValue + height.toDecimalValue / 10) * 12
                                        )) *
                                        10
                                    )
                                  : Math.floor(
                                      ((height.toValue + height.toDecimalValue / 10) * 30.48 -
                                        Math.floor(
                                          (height.toValue + height.toDecimalValue / 10) * 30.48
                                        )) *
                                        10
                                    )
                                : height.unit === 'inch'
                                ? e.target.value === 'feet'
                                  ? Math.floor(
                                      ((height.toValue + height.toDecimalValue / 10) / 12 -
                                        Math.floor(
                                          (height.toValue + height.toDecimalValue / 10) / 12
                                        )) *
                                        10
                                    )
                                  : Math.floor(
                                      ((height.toValue + height.toDecimalValue / 10) * 2.54 -
                                        Math.floor(
                                          (height.toValue + height.toDecimalValue / 10) * 2.54
                                        )) *
                                        10
                                    )
                                : e.target.value === 'feet'
                                ? Math.floor(
                                    ((height.toValue + height.toDecimalValue / 10) / 30.48 -
                                      Math.floor(
                                        (height.toValue + height.toDecimalValue / 10) / 30.48
                                      )) *
                                      10
                                  )
                                : Math.floor(
                                    ((height.toValue + height.toDecimalValue / 10) / 2.54 -
                                      Math.floor(
                                        (height.toValue + height.toDecimalValue / 10) / 2.54
                                      )) *
                                      10
                                  )
                          });
                        }}
                      >
                        <option className="fs-6" value={'feet'}>
                          FT
                        </option>
                        <option className="fs-6" value={'inch'}>
                          INCH
                        </option>
                        <option className="fs-6" value={'centimeters'}>
                          CM
                        </option>
                      </Input>
                    </Col>
                    <Col md="2" sm="12" className="mb-1">
                      <Label className="form-label" for=" Height From">
                        Height from
                      </Label>
                      <Input
                        type="number"
                        name="fromValue"
                        disabled={showHeightData}
                        value={height?.fromValue}
                        onChange={(e) => setHeight({ ...height, [e.target.name]: e.target.value })}
                        max={height?.toValue}
                        min={height.unit === 'feet' ? 1 : height.unit === 'inch' ? 12 : 30}
                      >
                        {/* {heightList.map((value, index) => (
                          <option>{value}</option>
                        ))} */}
                      </Input>
                    </Col>
                    <span className="mt-3  fw-bolder">.</span>
                    <Col md="2" sm="12" className="mb-1">
                      <Label className="form-label" for=" Height From">
                        {'[ ' +
                          height?.fromValue +
                          '.' +
                          height?.fromDecimalValue +
                          '  ' +
                          convertUnit(height?.unit) +
                          ' ]'}
                      </Label>
                      <Input
                        type="number"
                        disabled={showHeightData}
                        name="fromDecimalValue"
                        value={height?.fromDecimalValue}
                        onChange={(e) => {
                          setHeight({ ...height, [e.target.name]: e.target.value });
                        }}
                        min={0}
                        max={height.fromValue === height.toValue ? height.toDecimalValue : 9}
                      >
                        {/* {decimalList.map((value, index) => (
                          <option>{value}</option>
                        ))} */}
                      </Input>
                    </Col>
                    <Col md="2" sm="12" className="mb-1">
                      <Label className="form-label" for=" Height From">
                        Height to
                      </Label>
                      <Input
                        type="number"
                        disabled={showHeightData}
                        name="toValue"
                        value={height?.toValue}
                        onChange={(e) => setHeight({ ...height, [e.target.name]: e.target.value })}
                        min={height?.fromValue}
                        max={height.unit === 'feet' ? 8 : height.unit === 'inch' ? 96 : 240}
                      >
                        {/* {heightList.map((value, index) => (
                          <option>{value}</option>
                        ))} */}
                      </Input>
                    </Col>
                    <span className="mt-3 fw-bolder">.</span>
                    <Col md="2" sm="12" className="mb-1">
                      <Label className="form-label" for=" Height From">
                        {'[ ' +
                          height?.toValue +
                          '.' +
                          height?.toDecimalValue +
                          '  ' +
                          convertUnit(height?.unit) +
                          ' ]'}
                      </Label>
                      <Input
                        type="number"
                        disabled={showHeightData}
                        name="toDecimalValue"
                        value={height?.toDecimalValue}
                        onChange={(e) => {
                          setHeight({ ...height, [e.target.name]: e.target.value });
                        }}
                        min={height.fromValue === height.toValue ? height.fromDecimalValue : 0}
                        max={9}
                      >
                        {/* {decimalList.map((value, index) => (
                          <option>{value}</option>
                        ))} */}
                      </Input>
                    </Col>
                  </div>
                </div>
                <Row>
                  <Col md="6" sm="12" className="mb-1">
                    <Label className="form-label " for=" Height From">
                      Height From Height To
                    </Label>
                    <div>
                      {'[ ' +
                        height?.fromValue +
                        '.' +
                        height?.fromDecimalValue +
                        '  ' +
                        convertUnit(height?.unit) +
                        ' '}{' '}
                      to{' '}
                      {'' +
                        height?.toValue +
                        '.' +
                        height?.toDecimalValue +
                        '  ' +
                        convertUnit(height?.unit) +
                        ' ]'}
                    </div>
                  </Col>
                </Row>

                <FormGroup check>
                  <Input
                    id="weightCheck"
                    name="check"
                    type="checkbox"
                    checked={!showWeightData}
                    onChange={handleWeightCheckboxChange}
                  />
                  <Label check for="weightCheck">
                    Weight
                  </Label>
                </FormGroup>
                <div className="d-flex justify-content-between">
                  <Col md="2" sm="12" className="mb-1">
                    <Label className="form-label" for=" Height From">
                      Type
                    </Label>
                    <Input
                      type="select"
                      name="unit"
                      disabled={showWeightData}
                      value={weight?.unit}
                      onChange={(e) =>
                        setWeight({
                          ...weight,
                          [e.target.name]: e.target.value,
                          fromValue:
                            weight.unit === 'kilograms'
                              ? Math.floor(
                                  (weight.fromValue + weight.fromDecimalValue / 10) * 2.205
                                )
                              : Math.floor(
                                  (weight.fromValue + weight.fromDecimalValue / 10) / 2.205
                                ),
                          fromDecimalValue:
                            weight.unit === 'kilograms'
                              ? Math.floor(
                                  ((weight.fromValue + weight.fromDecimalValue / 10) * 2.205 -
                                    Math.floor(
                                      (weight.fromValue + weight.fromDecimalValue / 10) * 2.205
                                    )) *
                                    10
                                )
                              : Math.floor(
                                  ((weight.fromValue + weight.fromDecimalValue / 10) / 2.205 -
                                    Math.floor(
                                      (weight.fromValue + weight.fromDecimalValue / 10) / 2.205
                                    )) *
                                    10
                                ),
                          toValue:
                            weight.unit === 'kilograms'
                              ? Math.floor((weight.toValue + weight.toDecimalValue / 10) * 2.205)
                              : Math.floor((weight.toValue + weight.toDecimalValue / 10) / 2.205),
                          toDecimalValue:
                            weight.unit === 'kilograms'
                              ? Math.floor(
                                  ((weight.toValue + weight.toDecimalValue / 10) * 2.205 -
                                    Math.floor(
                                      (weight.toValue + weight.toDecimalValue / 10) * 2.205
                                    )) *
                                    10
                                )
                              : Math.floor(
                                  ((weight.toValue + weight.toDecimalValue / 10) / 2.205 -
                                    Math.floor(
                                      (weight.toValue + weight.toDecimalValue / 10) / 2.205
                                    )) *
                                    10
                                )
                        })
                      }
                    >
                      <option className="fs-6" value="pounds">
                        LBS
                      </option>
                      <option className="fs-6" value="kilograms">
                        KG
                      </option>
                    </Input>
                  </Col>
                  <Col md="2" sm="12" className="mb-1">
                    <Label className="form-label" for=" Height From">
                      Weight from
                    </Label>
                    <Input
                      type="number"
                      name="fromValue"
                      disabled={showWeightData}
                      value={weight?.fromValue}
                      onChange={(e) => setWeight({ ...weight, [e.target.name]: e.target.value })}
                      max={weight?.toValue}
                      min={weight.unit === 'pounds' ? 10 : 5}
                    >
                      {/* {weightList.map((value, index) => (
                        <option>{value}</option>
                      ))} */}
                    </Input>
                  </Col>
                  <span className="mt-3  fw-bolder">.</span>
                  <Col md="2" sm="12" className="mb-1">
                    <Label className="form-label" for=" Height From">
                      {'[ ' +
                        weight?.fromValue +
                        '.' +
                        weight?.fromDecimalValue +
                        '  ' +
                        convertUnit(weight?.unit) +
                        ' ]'}
                    </Label>
                    <Input
                      type="number"
                      disabled={showWeightData}
                      name="fromDecimalValue"
                      value={weight?.fromDecimalValue}
                      onChange={(e) => setWeight({ ...weight, [e.target.name]: e.target.value })}
                      min={0}
                      max={weight.fromValue === weight.toValue ? weight.toDecimalValue : 9}
                    >
                      {/* {decimalList.map((value, index) => (
                        <option>{value}</option>
                      ))} */}
                    </Input>
                  </Col>
                  <Col md="2" sm="12" className="mb-1">
                    <Label className="form-label" for=" Height From">
                      Weight to
                    </Label>
                    <Input
                      type="number"
                      name="toValue"
                      disabled={showWeightData}
                      value={weight?.toValue}
                      onChange={(e) => setWeight({ ...weight, [e.target.name]: e.target.value })}
                      max={weight.unit === 'pounds' ? 400 : 180}
                      min={weight?.fromValue}
                    >
                      {/* {weightList.map((value, index) => (
                        <option>{value}</option>
                      ))} */}
                    </Input>
                  </Col>
                  <span className="mt-3 fw-bolder">.</span>
                  <Col md="2" sm="12" className="mb-1">
                    <Label className="form-label" for=" Height From">
                      {'[ ' +
                        weight?.toValue +
                        '.' +
                        weight?.toDecimalValue +
                        '  ' +
                        convertUnit(weight?.unit) +
                        ' ]'}
                    </Label>
                    <Input
                      type="number"
                      name="toDecimalValue"
                      disabled={showWeightData}
                      value={weight?.toDecimalValue}
                      onChange={(e) => {
                        setWeight({ ...weight, [e.target.name]: e.target.value });
                      }}
                      min={weight.fromValue === weight.toValue ? weight.fromDecimalValue : 0}
                      max={9}
                    >
                      {/* {decimalList.map((value, index) => (
                        <option>{value}</option>
                      ))} */}
                    </Input>
                  </Col>
                </div>
                <Row>
                  <Col md="6" sm="12" className="mb-1">
                    <Label className="form-label " for=" Height From">
                      Weight From Weight To
                    </Label>
                    <div>
                      {'[ ' +
                        weight?.fromValue +
                        '.' +
                        weight?.fromDecimalValue +
                        '  ' +
                        convertUnit(weight?.unit) +
                        ' '}{' '}
                      to{' '}
                      {'' +
                        weight?.toValue +
                        '.' +
                        weight?.toDecimalValue +
                        '  ' +
                        convertUnit(weight?.unit) +
                        ' ]'}
                    </div>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button color="btn btn-outline-danger" onClick={toggledivisionmodal}>
                  Cancel
                </Button>{' '}
                <Button type="submit" color="btn btn-primary">
                  {isDivisionModalEditable ? 'Edit' : 'Save'}
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
      </Fragment>
    </div>
  );
};

export default Layout;
