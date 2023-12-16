import React, { useState } from 'react'
import { Link } from 'react-router-dom';


export default function SignUp() {

  const [credentials, setcredentails] = useState({ name: "", email: "", password: "", location: "" });

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.location
        })
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const json = await response.json();
      console.log(json);

      if (json.success) {
        alert("you Are signed up");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const onChange = (event) => {
    setcredentails({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <>
      <div className="container center-card mt-5">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handlesubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="FormControlInput1" placeholder="Enter Name" name='name' value={credentials.name} onChange={onChange} />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="FormControlInput1" placeholder="Enter Email" name='email' value={credentials.email} onChange={onChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="FormControlInput2" placeholder="Enter Password" name='password' value={credentials.password} onChange={onChange} />
              </div>
              <div className="form-group">
                <label htmlFor="location">Address</label>
                <input type="text" className="form-control" id="FormControlInput3" placeholder="Enter Address" name='location' value={credentials.location} onChange={onChange} />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
              <Link type="button" to="/login">Login In</Link>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
