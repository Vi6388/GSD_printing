import React, { useState } from 'react';
import AvatarGroup from '@components/avatar-group';
import { Edit, Trash } from 'react-feather';
import Swal from 'sweetalert2';
import { categoriesDeleteAction } from '../../store/actions';
import { useDispatch } from 'react-redux';

function Card(props) {
  // const colourOptions=[{value:"Neeraj",label:"neeraj"}]
  const dispatch = useDispatch();
  const avatarGroupArr = [
    {
      imgWidth: 25,
      imgHeight: 25,
      title: 'Billy Hopkins',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default
    }
  ];
  const {
    title,
    togglemodal,
    isCategoryEditable,
    setIsCategoryEditable,
    categoryData,
    setCategoryData,
    agefrom,
    ageto,
    description,
    id,
    rule
  } = props;
  return (
    <div className="card-body">
      <div className="d-flex justify-content-between">
        <AvatarGroup data={avatarGroupArr} size="sm" rajat={title} />
        <div>
          <h3>{title}</h3>{' '}
        </div>
      </div>
      <div className="d-flex justify-content-between py-1">
        <div>
          Age : {agefrom} to {ageto}{' '}
        </div>
        <div>
          {/* <div>Rule : {rule}</div> */}
          <div>Rule : by D.O.B</div>
        </div>
      </div>
      <div className="d-flex justify-content-between ">
        <div>Description : {description} </div>
      </div>
      <div className="d-flex justify-content-between pt-1">
        <Edit
          size={18}
          className=" cursor-pointer me-50"
          onClick={() => {
            setCategoryData({
              ...categoryData,
              sportId: id,
              categoryName: title,
              ageFrom: agefrom,
              ageTo: ageto
            });
            setIsCategoryEditable(true);
            togglemodal();
          }}
        />
        <div>
          <Trash
            className="cursor-pointer"
            size={16}
            onClick={() => {
              Swal.fire({
                title: 'Are you sure?',
                text: `Are you delete ${title} ?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete !'
              }).then((willDelete) => {
                if (willDelete.isConfirmed) {
                  dispatch(categoriesDeleteAction(id));
                }
              });
            }}
          ></Trash>
        </div>
      </div>
      <div className="d-flex justify-content-between ">
        <div></div>
        <div>
          <h6 className="text-primary cursor-pointer" onClick={togglemodal}></h6>{' '}
        </div>
      </div>
    </div>
  );
}

export default Card;
