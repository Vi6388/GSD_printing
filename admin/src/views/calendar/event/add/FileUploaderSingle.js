// ** React Imports
import { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

// ** Third Party Imports
import { useDropzone } from 'react-dropzone';
import { FileText, X, DownloadCloud } from 'react-feather';

const FileUploaderSingle = ({ files, setFiles }) => {
  // ** State
  // const [files, setFiles] = useState([])

  // Current path
  const currentPath = useSelector((state) => state.filemanager.currentPath);

  const dispatch = useDispatch();

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles.map((file) => Object.assign(file))]);
    }
  });

  const renderFilePreview = (file) => {
    if (file.type.startsWith('image')) {
      return (
        <img
          className="rounded"
          alt={file.name}
          src={URL.createObjectURL(file)}
          height="148"
          width="148"
        />
      );
    } else {
      return <FileText size="28" />;
    }
  };

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
  };

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`;
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`;
    }
  };

  const fileList = files.map((file, index) => (
    <ListGroupItem
      key={`${file.name}-${index}`}
      className="d-flex align-items-center justify-content-between"
    >
      <div className=" d-flex align-items-center">
        <div className="">{renderFilePreview(file)}</div>
        {/* <div> */}
        {/* <p className="file-name mb-0">{file.name}</p> */}
        {/* <p className="file-size mb-0">{renderFileSize(file.size)}</p> */}
        {/* </div> */}
      </div>
      <Button
        color="danger"
        outline
        size="sm"
        className="btn-icon"
        onClick={() => handleRemoveFile(file)}
      >
        <X size={14} />
      </Button>
    </ListGroupItem>
  ));

  return (
    <div className="mb-1">
      <div
        {...getRootProps({ className: '' })}
        style={{
          display: 'flex',
          alignitems: 'center',
          justifyContent: 'center',
          border: `1px dashed  #b8c2cc`,
          minHeight: '200px'
        }}
      >
        <input {...getInputProps()} />
        <div className="d-flex align-items-center justify-content-center flex-column">
          <DownloadCloud size={64} />
          <h5>Drop Banner here or click to upload</h5>
          <p className="text-secondary">
            Drop Banner here or click{' '}
            <a href="/" onClick={(e) => e.preventDefault()}>
              browse
            </a>{' '}
            thorough your machine
          </p>
        </div>
      </div>
      {files.length ? (
        <Fragment>
          <ListGroup className="my-2">{fileList}</ListGroup>
        </Fragment>
      ) : null}
    </div>
  );
};

export default FileUploaderSingle;
