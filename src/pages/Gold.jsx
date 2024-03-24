import React, { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const Gold = () => {
  const [formData, setFormData] = useState({
    Open: 0,
    High: 0,
    Low: 0,
    Volume: 0,
  });
  const [errors, setErrors] = useState({});
  const [prediction, setPrediction] = useState(null); // New state for prediction

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const numericValue = parseFloat(value);
    setFormData({ ...formData, [name]: isNaN(numericValue) ? 0 : numericValue });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.Open) tempErrors.Open = "Open Price is required";
    if (!formData.High) tempErrors.High = "High Price is required";
    if (!formData.Low) tempErrors.Low = "Low Price is required";
    if (!formData.Volume) tempErrors.Volume = "Volume Price is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
     const response =  await axios.post(`/predict-gold`, formData)
     const { prediction } = response.data;
      setPrediction(prediction); // Set the prediction in state
    } catch (error) {
      console.error("Error Submitting form: ", error);
    }
  };

  return (
    <>
      <div className="card my-5">
        <div className="card-header">
          <h4>Gold Prediction</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Open
              </label>
              <input
                type="number"
                className="form-control"
                name="Open"
                value={formData.Open}
                onChange={handleInputChange}
                id="exampleInputEmail1"
              />
              {errors.Open && <div className="error">{errors.Open}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                High
              </label>
              <input
                type="number"
                className="form-control"
                name="High"
                value={formData.High}
                onChange={handleInputChange}
                id="exampleInputEmail1"
              />
              {errors.High && <div className="error">{errors.High}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Low
              </label>
              <input
                type="number"
                className="form-control"
                name="Low"
                value={formData.Low}
                onChange={handleInputChange}
                id="exampleInputEmail1"
              />
              {errors.Low && <div className="error">{errors.Low}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Volume
              </label>
              <input
                type="number"
                className="form-control"
                name="Volume"
                value={formData.Volume}
                onChange={handleInputChange}
                id="exampleInputEmail1"
              />
              {errors.Volume && <div className="error">{errors.Volume}</div>}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>

          {prediction !== null && (
            <div className="mt-3">
              <h3>Gold Predicted Closing Price: {prediction}</h3>
            </div> 
          )}
        </div>
      </div>
    </>
  );
};

export default Gold;
