import React from 'react';
// ** Custom Hooks
import { useSkin } from '@hooks/useSkin';

function Emptypage() {
  // ** Hooks
  const { skin } = useSkin();
  const illustration = skin === 'dark' ? 'error-dark.svg' : 'error.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default;
  const backgroundColor = skin === 'dark' ? 'bg-gray-dark' : 'bg-white';
  return (
    <div className={`p-6 ${backgroundColor} d-flex flex-column`}>
      <div className="d-flex justify-content-center mt-5 mb-5">
        <img className="img-fluid" src={source} alt="Not Data page" />
      </div>{' '}
      <div className="text-center mt-5 mb-5">
        <span className="p-6 h1 text-center">No Data</span>
      </div>{' '}
    </div>
  );
}

export default Emptypage;
