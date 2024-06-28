import React from "react";
import ImageUploading from "react-images-uploading";
import FaqModal from "./FaqModal";

const TabAddImage = ({ onImageAdd }) => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    if (imageList.length > 0) {
      onImageAdd(imageList[0].data_url); // Pass the first image URL to the parent component
    }
  };

  const handleImageRemove = () => {
    setImages([]); // Clear the images array
    onImageAdd(null, true); // Pass shouldRemove = true to indicate removing the image
  };

  return (
    <div className="add-image mt-1">
      <h4 className="">
        Custom Men's Deluxe T-Shirts
        <span style={{ float: "right" }}>
          <FaqModal />
        </span>
      </h4>
      <ImageUploading
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={
                isDragging ? { color: "red", marginBottom: "20px" } : undefined
              }
              onClick={onImageUpload}
              {...dragProps}
              className="btn btn-primary mt-2"
            >
              Upload Image
            </button>
            &nbsp;
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                {/* <img
                  src={image["data_url"]}
                  alt=""
                  width="100"
                  style={{ marginTop: "20px" }}
                /> */}
                <div className="image-item__btn-wrapper">
                  <button
                    onClick={() => onImageUpdate(index)}
                    className="btn btn-success mt-1"
                    style={{ marginRight: "10px" }}
                  >
                    Update
                  </button>
                  <button
                    onClick={handleImageRemove} // Call handleImageRemove here
                    className="btn btn-danger mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>

      {/* recent image */}
      <div className="">
        <h5
          style={{
            backgroundColor: "rgb(246, 246, 247)",
            padding: "14px 20px",
            marginTop: "15px",
          }}
        >
          Recent Image
        </h5>
        <div className="d-flex mt-1">
          {images.slice(0, 4).map((image, index) => (
            <div key={index} style={{ margin: "0 4px", border: "1px solid#ccc" }}>
              <img src={image.data_url} alt="" width="100%" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabAddImage;
