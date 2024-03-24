import React, { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const Orchid = () => {
  const [formData, setFormData] = useState({
    image: null, // Add image property to state
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [prediction, setPrediction] = useState(null);
  
  const navigate = useNavigate();


  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];

    // Display image preview
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }

    setFormData({ ...formData, image: imageFile });
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();
    
      formDataToSend.append("file", formData.image);

      const response = await axios.post(`/predict_orchid`, formDataToSend);

      const { prediction } = response.data;
      setPrediction(prediction);
    } catch (error) {
      console.error("Error Submitting form: ", error);
    }
  };

  return (
    <>
      <div className="card my-5">
        <div className="card-header">
          <h4>Orchid Prediction</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Other form fields */}
            
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={handleImageChange}
                id="image"
              />
              <div className="text-center">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="img-thumbnail mt-2"
                  style={{ maxWidth: "200px" }}
                />
              )}
              </div>
            </div>
                <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            </div>
          </form>

          {prediction !== null && (
            <div className="mt-3 ">
              <h3>The Orchid Classification is : {prediction}</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orchid;
