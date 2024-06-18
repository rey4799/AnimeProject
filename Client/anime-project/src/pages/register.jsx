import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'


export default function RegisterPage() {

  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("")
  const [username, SetUserName] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/register', {email, password, username}, {
      })
      navigate('/login')
    } catch (error) {
      console.log(error);
      // alert(error.response.error)
    }
  }

  return (
    <>
      <section className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-12">
            <div className="pt-3 pb-2 mb-3 border-bottom">
              <form onSubmit={handleRegister} id="register-form">
                <h1 className="h3 mb-3 display-1 text-center">Register User</h1>
                <div className="mb-3">
                  <label htmlFor="register-username" className="form-label">
                    Username <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="register-username"
                    name = "username"
                    value={username}
                    onChange={(e) => SetUserName(e.target.value)}
                    placeholder="Enter username ..."
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="register-email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="register-email"
                    name= "email"
                    value={email}
                    onChange={(e) => SetEmail(e.target.value)}
                    placeholder="Enter email address ..."
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="register-password" className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="register-password"
                    name="password"
                    value={password}
                    onChange={(e) => SetPassword(e.target.value)}
                    placeholder="Enter password ..."
                    autoComplete="off"
                    required
                  />
                </div>
                <button
                  className="btn btn-lg btn-primary rounded-pill w-100 p-2 mt-3"
                  type="submit"
                >
                  Sign Up
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
              Already have an account?{" "}
              <Link to="/login" className="link-danger">
                Login
              </Link>
            </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
