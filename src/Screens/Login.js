import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setcredentails] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({

          email: credentials.email,
          password: credentials.password

        })
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const json = await response.json();
      ;

      if (json.success) {
        const { name, location, email } = json;

        localStorage.setItem("Name", name);
        localStorage.setItem("Location", location);
        localStorage.setItem("Email", email);
        // localStorage.getItem("Location:", json.location);

        localStorage.setItem("authtoken", json.authtoken);
        navigate('/');
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
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="FormControlInput1" placeholder="Enter Email" name='email' value={credentials.email} onChange={onChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="FormControlInput2" placeholder="Enter Password" name='password' value={credentials.password} onChange={onChange} />
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
              <Link type="button" to="/sign-up">Sign Up In</Link>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
