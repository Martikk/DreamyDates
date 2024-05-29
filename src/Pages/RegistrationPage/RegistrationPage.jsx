// import React, { useState } from 'react';
// import './RegistrationPage.scss';

// const RegistrationPage = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     password1: '',
//     name: '',
//     lastname: '',
//     citizenship: false,
//     identityType: '1',
//     identityNumber: '',
//     day: '1',
//     month: '1',
//     year: '1',
//     country: '1',
//     operator: '1',
//     phone: '',
//     agreeToPolicies1: false,
//     agreeToPolicies2: false,
//     agreeToPolicies3: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Data:', formData);
//   };

//   return (
//     <div className="registration-container">
//       <div className="form-logo center">
//         <img src="/react-crypto-exchange/images/logo.png" alt="Crypto Exchange" draggable="false" />
//       </div>
//       <h1 className="form-title center">Create Account</h1>
//       <p className="form-desc center">Please enter the following information. We will send activation details to your phone number.</p>
//       <form className="form" onSubmit={handleSubmit} novalidate="">
//         <div className="form-elements">
//           <div className="form-line">
//             <div className="full-width">
//               <label htmlFor="email">Email Address</label>
//               <input id="email" name="email" type="email" autocomplete="off" placeholder="Enter your email address" value={formData.email} onChange={handleChange} />
//             </div>
//           </div>
//           <div className="form-line">
//             <div className="full-width">
//               <label htmlFor="password">Password</label>
//               <input id="password" name="password" type="password" autocomplete="off" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
//             </div>
//           </div>
//           <div className="form-line">
//             <div className="full-width">
//               <label htmlFor="password1">Confirm Password</label>
//               <input id="password1" name="password1" type="password" autocomplete="off" placeholder="Re-enter your password" value={formData.password1} onChange={handleChange} />
//             </div>
//           </div>
//           <div className="form-line">
//             <div className="full-width">
//               <label htmlFor="name">First Name</label>
//               <input id="name" name="name" type="text" autocomplete="off" placeholder="Enter your first name" value={formData.name} onChange={handleChange} />
//             </div>
//           </div>
//           <div className="form-line">
//             <div className="full-width">
//               <label htmlFor="lastname">Last Name</label>
//               <input id="lastname" name="lastname" type="text" autocomplete="off" placeholder="Enter your last name" value={formData.lastname} onChange={handleChange} />
//             </div>
//           </div>

//           <div className="form-line clearfix">
//             <div className="three-width">
//               <label htmlFor="day">Date of Birth</label>
//               <select name="day" id="day" value={formData.day} onChange={handleChange}>
//                 <option value="1">Day</option>
//               </select>
//             </div>

            
//             <div className="three-width">
//               <label htmlFor="month">&nbsp;</label>
//               <select name="month" id="month" value={formData.month} onChange={handleChange}>
//                 <option value="1">Month</option>
//               </select>
//             </div>
//             <div className="three-width">
//               <label htmlFor="year">&nbsp;</label>
//               <select name="year" id="year" value={formData.year} onChange={handleChange}>
//                 <option value="1">Year</option>
//               </select>
//             </div>
//           </div>


//           <div className="form-line">
//             <div className="full-width">
//               <label className="checkbox-container">
//                 I have read and agree to the KVVK Information Text and user agreement.
//                 <input type="checkbox" id="agreeToPolicies1" name="agreeToPolicies1" checked={formData.agreeToPolicies1} onChange={handleChange} />
//                 <span className="checkmark"></span>
//               </label>
//             </div>
//           </div>
//           <div className="form-line">
//             <div className="full-width">
//               <label className="checkbox-container">
//                 I have read and reviewed the KVVK Explicit Consent Text. I approve the processing and transfer of my personal data within the scope of this text.
//                 <input type="checkbox" id="agreeToPolicies2" name="agreeToPolicies2" checked={formData.agreeToPolicies2} onChange={handleChange} />
//                 <span className="checkmark"></span>
//               </label>
//             </div>
//           </div>
//           <div className="form-line">
//             <div className="full-width">
//               <label className="checkbox-container">
//                 I agree to receive commercial electronic messages via email, phone, and electronic communication channels within the scope of the KVVK Information Text regarding products and services.
//                 <input type="checkbox" id="agreeToPolicies3" name="agreeToPolicies3" checked={formData.agreeToPolicies3} onChange={handleChange} />
//                 <span className="checkmark"></span>
//               </label>
//             </div>
//           </div>
//           <div className="form-line">
//             <div className="buttons">
//               <button type="submit" className="button button-purple button-medium">Create Account</button>
//             </div>
//           </div>
//           <div className="form-line">
//             <div className="center">
//               <p>Already have an account? <a href="#/">Login</a>.</p>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default RegistrationPage;
