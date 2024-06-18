import { Link, useNavigate } from "react-router-dom"

export default function NavBar(){
const navigate = useNavigate()

    const handleLogout = async () => {
      localStorage.removeItem('token')
       return navigate("/")
    }

    return (
    <>
<nav>
  <div className="left">
    <Link to={'/'}>
      <img
        src="/—Pngtree—anime eyes blue_8409414.png"
        alt=""
      />
    </Link>
    <div className="middle-1">
      <ul>
        <li>About</li>
        <li><Link to={'/ai'} className="text-white text-decoration-none">AI (beta)</Link></li>
        <li><Link to={'/favorites'} className="text-white text-decoration-none">Favorites</Link></li>
      </ul>
    </div>
  </div>
  <Link to={'/'} className="logo">
    <img src="/logo1.png" alt="Logo" />
  </Link>
  <div className="right">
    <div className="middle-2">
      <ul>
        <li><Link to={'/login'} className="text-white text-decoration-none">Login</Link></li>
        <li onClick={handleLogout}>Log Out</li>
        <li><Link to={'/register'} className="text-white text-decoration-none">SignUp</Link></li>
      </ul>
    </div>
    <input
      type="search"
      name="search"
      id="search"
      placeholder="Search your anime"
    />
  </div>
</nav>
    </>
    )   
}




