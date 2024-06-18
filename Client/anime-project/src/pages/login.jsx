import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export default function LoginPage() {


  async function handleCredentialResponse(response) {
    try {
      const {data} = await axios({
        method: "post",
        url: "http://localhost:3000/google-login",
        headers: {
          google_token: response.credential
        }
      })

      localStorage.setItem('token', data.access_token)
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
  loadGoogleButton()
  }, [])
  function loadGoogleButton () {
      window.google.accounts.id.initialize({
        client_id: "957453033436-1hpgemaiq4vd2ihc918m8f4mcljlssb3.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });
      window.google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    }
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      let res = await axios.post('http://localhost:3000/login', {username, password} )
      let {data} = res;
      console.log(res);
      localStorage.setItem('token', data.token)
      navigate('/')
    } catch (error) {
      // alert(error.response.error)
      console.log(error);
    }
  }

  return (
    <>
      <section className="container" id="login-section">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 my-5"> 
            <div className="row">
              <div className="col-12 p-5 text-center">
              </div>
              <div className="col-12 p-5 text-left">
                <div className="form-signin m-auto">
                  <form id="login-form" onSubmit={handleLogin}>
                    <h1 className="h3 mb-3 display-1">Log in to your account</h1>
                    <div className="mb-3 mt-3">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-username">username</label>
                        <label className="text-danger text-end fw-bold">*</label>
                      </div>
                      <input
                        type="username"
                        className="form-control"
                        id="login-username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username address ..."
                        autoComplete="off"
                        required=""
                      />
                    </div>
                    <div className="mb-4">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-password">Password</label>
                        <label className="text-danger text-end fw-bold">*</label>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        id="login-password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password ..."
                        autoComplete="off"
                        required=""
                      />
                    </div>
                    <button
                      className="btn btn-lg btn-primary rounded-pill w-100 p-2"
                      type="submit"
                    >
                      Log In
                    </button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">
              Didn't have an account?{" "}
              <Link to="/register" className="link-danger">
                Register
              </Link>
            </p>
                  </form>
                <div id="buttonDiv"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
