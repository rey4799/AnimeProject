import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card2 from "../components/Card2";
import NavBar from "../components/NavBar";

export default function FavoritesPage() {
  const [animesData, setAnimesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
  try {
    let  {data}  = await axios({
      method: 'get',
      url: `http://localhost:3000/favorites`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      }
    });
    console.log(data);
    setAnimesData(data);
  } catch (error) {
    console.log(error);
  }finally {
    setLoading(false);
  }
};
  useEffect(() => {
   

    

   
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure want to delete?")) {
        await axios.delete("http://localhost:3000/favorites/" + id, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
      }
        
    fetchData()
    } catch (error) {
        // alert(error.response.message)
        console.log(error);
    }
}
if (loading) {
  return <h3>Loading...</h3>;
}

  return (
    <>
  <section className="home">
    <div className="carrd-grid">
    {animesData &&
            animesData.map((item, index) => {
              return <Card2 key={index} item={item} handleDelete={() => handleDelete(item.id)} />;
            })}
    </div>
  </section>
  <a href="#" className="back-to-top">
    <img
      src="keyboard_arrow_up_40dp_FILL0_wght400_GRAD0_opsz40.svg"
      alt="Back to Top"
    />
  </a>
</>

  );
}
