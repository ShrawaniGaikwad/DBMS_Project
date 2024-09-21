import React, { useState } from 'react';
import './FillDetails.css'; // Import the CSS file
import { Link ,useNavigate} from "react-router-dom";

const FillDetails = () => {
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Ladakh",
    "Jammu and Kashmir"
  ];
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    contact: '',
    gender: '',
    state: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value});

  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = 'First Name is required';
    if (!formData.lastname.trim()) newErrors.lastname = 'Last Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.contact.trim()) newErrors.contact = 'Phone Number is required';
    else if (!/^\d{10}$/.test(formData.contact)) newErrors.contact = 'Phone Number must be 10 digits';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.state) newErrors.state = 'State is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
        try {
            const response = await fetch('http://localhost:3000/api/form', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                alert("Form submitted succesfully");
                console.log('Form data submitted:', data);
                navigate("/"); 
            } else {
                console.error('Error submitting form:', data.error);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }
};

  return (
    <>
      <div className="container1">
        <div className="form-box">
          <h1 className="heading">Enter Your Details</h1>
          <form onSubmit={handleSubmit} className="form">
          
            <div className="form-group">
              <label htmlFor="firstname" className="label">First Name</label>
              <input
                type="text"
                name="firstname"
                placeholder="Enter First Name"
                value={formData.firstname}
                onChange={handleChange}
                className={`input ${errors.firstname ? 'input-error' : ''}`}
              />
              {errors.firstname && <span className="error-message">{errors.firstname}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastname" className="label">Last Name</label>
              <input
                type="text"
                name="lastname"
                placeholder="Enter Last Name"
                value={formData.lastname}
                onChange={handleChange}
                className={`input ${errors.lastname ? 'input-error' : ''}`}
              />
              {errors.lastname && <span className="error-message">{errors.lastname}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="label">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className={`input ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="contact" className="label">Phone Number</label>
              <input
                type="text"
                name="contact"
                placeholder="Enter Phone Number"
                value={formData.contact}
                onChange={handleChange}
                className={`input ${errors.contact ? 'input-error' : ''}`}
              />
              {errors.contact && <span className="error-message">{errors.contact}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="gender" className="label">Gender</label>
              <div className="radio-group">
                <label className="radio">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                  /> Male
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                  /> Female
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="gender"
                    value="Prefer not to say"
                    onChange={handleChange}
                  /> Prefer not to say
                </label>
              </div>
              {errors.gender && <span className="error-message">{errors.gender}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="state" className="label">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`input ${errors.state ? 'input-error' : ''}`}
              >
                <option value="" disabled>Select your state</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && <span className="error-message">{errors.state}</span>}
            </div>

            <button className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FillDetails;
