import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import "../styles/LoginPage.css"; 

const LoginPage = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', userData);
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      alert("Login successful!");

      // Correct route path
      if (data.user.type === "admin") {
        navigate('/dashboard');  
      } else {
        navigate('/home');
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5 login-page">
      <MDBRow className="justify-content-center">
        <MDBCol md='6'>
          <form onSubmit={handleSubmit} className="login-form">
            <h2>🌾 Farmora Login</h2>

            <MDBInput
              wrapperClass='mb-4'
              label='Email Address'
              type='email'
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />

            <MDBInput
              wrapperClass='mb-4'
              label='Password'
              type='password'
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='Remember me' />
              <a href="#!">Forgot password?</a>
            </div>

            <MDBBtn
              type="submit"
              className="mb-4 w-100"
              size="lg"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </MDBBtn>

            <div className="text-center mb-4">
              <span>Don't have an account? </span>
              <a href="/signup" className="signup-link">Sign Up</a>
            </div>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>

            <MDBBtn className="mb-3 w-100" size="lg" style={{ backgroundColor: '#3b5998' }}>
              <MDBIcon fab icon="facebook-f" className="mx-2" />
              Continue with Facebook
            </MDBBtn>

            <MDBBtn className="w-100" size="lg" style={{ backgroundColor: '#55acee' }}>
              <MDBIcon fab icon="twitter" className="mx-2" />
              Continue with Twitter
            </MDBBtn>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginPage;
