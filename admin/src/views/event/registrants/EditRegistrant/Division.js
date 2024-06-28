// ** React Imports
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// ** Third Party Components
import { Input, Label, Button } from 'reactstrap';
import { Check, X } from 'react-feather';
import { toast } from 'react-toastify';
// ** Store & Actions
import { useSelector } from 'react-redux';
import {
  calculateAge,
  calculateHeight,
  calculateWeight,
  convertUnit
} from '../../../../utility/Utils';

// ** Styles
import '@styles/react/apps/app-invoice.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';

const Division = (props) => {
  const { stepper, payload, setPayload, event, selectMemberData } = props;
  const [divisions, setDivisions] = useState([]);
  const [selectedDivisions, setSelectedDivisions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [checkArr, setCheckArr] = useState([]);

  const [heightOption, setHeightOption] = useState(false);
  const [ageOption, setAgeOption] = useState(false);

  const progressionStore = useSelector((state) => state.progression);
  useEffect(() => {
    let tmp = [];
    selectMemberData &&
      progressionStore.progressionCategoriesDivision &&
      progressionStore.progressionCategoriesDivision.map((division, index) => {
        if (
          event.divisions.filter(
            (item) =>
              item.divisionId.toString() === division._id.toString() && item.isDisabled === false
          ).length === 1
        ) {
          let divisionFee = event.divisions.filter(
            (item) => item.divisionId.toString() === division._id.toString()
          )[0].divisionFee;
          if (
            (ageOption
              ? division.ageFrom < calculateAge(selectMemberData.member[0].dateOfBirth) &&
                division.ageTo > calculateAge(selectMemberData.member[0].dateOfBirth)
              : true) &&
            (heightOption
              ? selectMemberData.member[0].height === undefined
                ? false
                : calculateHeight({ value: division.heightFrom, unit: division.heightUnit }) <
                    calculateHeight(selectMemberData.member[0].height) &&
                  calculateHeight({ value: division.heightTo, unit: division.heightUnit }) >
                    calculateHeight(selectMemberData.member[0].height)
              : true) &&
            calculateWeight({ value: division.weightFrom, unit: division.weightUnit }) <
              calculateWeight(payload.weight) &&
            calculateWeight({ value: division.weightTo, unit: division.weightUnit }) >
              calculateWeight(payload.weight) &&
            division.gender.toLowerCase() == selectMemberData.member[0].gender.toLowerCase()
          ) {
            let newWeightFrom, newWeightTo, newWeightUnit;
            if (payload.weight.unit === 'kilograms') {
              newWeightFrom = Math.ceil(
                calculateWeight({
                  value: division.weightFrom,
                  unit: division.weightUnit
                })
              );
              newWeightTo = Math.ceil(
                calculateWeight({
                  value: division.weightTo,
                  unit: division.weightUnit
                })
              );
              newWeightUnit = 'KG';
            } else if (payload.weight.unit === 'pounds') {
              newWeightFrom = Math.ceil(
                calculateWeight({ value: division.weightFrom, unit: division.weightUnit }) / 0.4536
              );
              newWeightTo = Math.ceil(
                calculateWeight({ value: division.weightTo, unit: division.weightUnit }) / 0.4536
              );
              newWeightUnit = 'LBS';
            }
            let curCategory = '',
              curSport = '';
            progressionStore.sportList.map((sport, index1) => {
              sport.categoryId.map((category, index2) => {
                if (category._id == division.categoryId) {
                  curCategory = category.categoryName;
                  curSport = sport.sportName;
                }
              });
            });
            if (curCategory && curSport) {
              tmp.push({
                ...division,
                weightFrom: newWeightFrom,
                weightTo: newWeightTo,
                weightUnit: newWeightUnit,
                divisionFee: divisionFee,
                category: curCategory,
                sport: curSport
              });
            } else {
              tmp.push(division);
            }
          }
        }
      });
    setDivisions(tmp);
    setCheckArr(new Array(tmp.length).fill(false));
  }, [progressionStore, payload, heightOption, ageOption, selectMemberData]);
  useEffect(() => {
    let count = 0;
    checkArr.map((item, index) => {
      if (item == true) {
        count++;
      }
    });
    if (count + 1 > event.eventLimit) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [selectedDivisions, event, checkArr]);

  // Handlers
  const handleDivisionClick = (e, index) => {
    let tmp = [...checkArr];
    tmp[index] = !tmp[index];
    setCheckArr(tmp);
    if (e.target.checked) {
      setSelectedDivisions([
        ...selectedDivisions,
        {
          _id: e.target.value,
          divisionName: e.target.id,
          divisionFee: e.target.name
        }
      ]);
    } else {
      let newSelectedDivisions = selectedDivisions;
      const indexDivision = newSelectedDivisions.findIndex((divisionItem) => {
        return divisionItem._id === e.target.value;
      });
      newSelectedDivisions.splice(indexDivision, 1);
      setSelectedDivisions(newSelectedDivisions);
    }
  };

  const handleNextClick = () => {
    if (selectedDivisions.length > event.eventFee.length)
      return toast("Can't Select Over Max Event Count");
    setPayload({ ...payload, divisions: selectedDivisions });
    stepper.next();
  };

  return (
    <>
      <div>
        <h4 className="mb-1">Maximum Limit: {event.eventFee.length} divisions</h4>
        <div className="d-flex flex-row align-items-center my-1">
          <div className="form-switch my-1 d-flex flex-row">
            <Input
              type="switch"
              defaultChecked
              id="height-switch"
              name="height-switch"
              checked={heightOption}
              onClick={(e) => {
                setHeightOption(e.target.checked);
              }}
            />
            <Label className="form-check-label" htmlFor="height-switch">
              <span className="switch-icon-left">
                <Check size={14} />
              </span>
              <span className="switch-icon-right">
                <X size={14} />
              </span>
            </Label>
            <Label
              className="form-check-label ps-25 mb-0 font-medium-2 d-flex flex-row ms-1"
              for="height-switch"
            >
              Match Height
            </Label>
          </div>
          <div className="form-switch my-1 ms-2 d-flex flex-row">
            <Input
              type="switch"
              defaultChecked
              id="age-switch"
              name="age-switch"
              checked={ageOption}
              onClick={(e) => {
                setAgeOption(e.target.checked);
              }}
            />
            <Label className="form-check-label" htmlFor="age-switch">
              <span className="switch-icon-left">
                <Check size={14} />
              </span>
              <span className="switch-icon-right">
                <X size={14} />
              </span>
            </Label>
            <Label
              className="form-check-label ps-25 mb-0 font-medium-2 d-flex flex-row ms-1"
              for="age-switch"
            >
              Match Age
            </Label>
          </div>
          {selectMemberData &&
            (!selectMemberData.member[0]?.height?.value ||
              !selectMemberData.member[0]?.dateOfBirth) &&
            (heightOption || ageOption) && (
              <div className="ms-auto d-flex flex-column">
                <Link
                  to={`/other/membership/view/${selectMemberData?.memberId}`}
                  className="text-white ms-auto"
                >
                  <Button color="primary">Edit Profile </Button>
                </Link>
                <p className="text-danger">
                  {!heightOption && ageOption
                    ? 'Need Height, Birthday Value'
                    : (heightOption && 'Need Height Value') || (ageOption && 'Need Birthday Value')}
                </p>
              </div>
            )}
        </div>
        {divisions.length > 0 ? (
          divisions.map((division, index) => (
            <div key={'division-' + index} className="d-flex flex-row mb-1">
              <Input
                type="checkbox"
                value={division._id}
                id={
                  (division.sport ? division.sport : '') +
                  ' - ' +
                  (division.category ? division.category : '') +
                  ' - ' +
                  division.divisionName
                }
                name={division.divisionFee}
                className="me-50"
                onChange={(e) => handleDivisionClick(e, index)}
                disabled={isDisabled && !checkArr[index]}
              />
              <Label
                className="form-check-label ps-25 mb-0 font-medium-2 d-flex flex-row"
                for="select-all"
              >
                {division.sport ? division.sport : ''} -{' '}
                {division.category ? division.category : ''} - {division.divisionName} {'( '}{' '}
                {ageOption === true ? division.ageFrom + ' - ' + division.ageTo + ' th, ' : null}
                {heightOption === true
                  ? division.heightFrom +
                    ' - ' +
                    division.heightTo +
                    ' ' +
                    convertUnit(division.heightUnit) +
                    ', '
                  : null}
                {division.weightFrom} {' - '} {division.weightTo} {division.weightUnit}
                {' ) '}
                {division.divisionFee ? (
                  <text className="text-success ms-1">{division.divisionFee + ' $'} </text>
                ) : null}
              </Label>
            </div>
          ))
        ) : (
          <h4 className="font-medium-1 text-center">
            There are no matching division for this discipline
          </h4>
        )}
      </div>

      <div className="d-flex justify-content-end mt-1">
        <Button color="primary" onClick={(e) => stepper.previous()} className="me-1">
          Previous
        </Button>
        <Button
          color="primary"
          onClick={(e) => handleNextClick()}
          disabled={
            !(
              selectedDivisions?.length > 0 && selectedDivisions?.length < event.eventFee.length + 1
            )
          }
        >
          NEXT
        </Button>
      </div>
    </>
  );
};

export default Division;
