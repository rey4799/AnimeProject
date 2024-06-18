import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function DetailPage() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const AnimeId = id
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`http://localhost:3000/pub/animes/${id}`, {timeout: 6000});
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    

    fetchData();
  }, [id]);

  const handleSave = async (animeId) => {
    try {
     await axios.post("http://localhost:3000/favorites", {
       animeId
     },{
       headers: {
         'Authorization': `Bearer ${localStorage.getItem('token')}` 
       }
       })
 
       navigate("/");
     
    } catch (error) {
     console.log(error);
    }
   };
  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
  <div className="left-bg"></div>
    <div className="right-bg"></div>
  <section className="home">
    <p>{data.title}</p>
    <main>
      <img
        src={data?.images?.jpg?.image_url}
        alt=""
      />
      <div className="information">
        <p>Aired: {data?.aired?.string}</p>
        <p>Rating: {data.rating}</p>
        <p>Rank: {data.rank}</p>
        <p>Score: {data.rank}</p>
        <p>Scored By: {data.scored_by}</p>
        <p>Popularity: {data.popularity}</p>
        <p>Status: {data.status}</p>
        <p>Source: {data.source}</p>
        <p>Season: {data.season}</p>
        <p>Duration: {data.duration}</p>
      </div>
      <div className="synopsys">
        {data.synopsis}
      </div>
      <div className="trailer">
        <p>Trailer</p>
        <iframe
          width={381}
          height={230}
          src={data?.trailer?.embed_url}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen=""
        />
      </div>
      <div className="favorites">
        <img onClick={()=>{handleSave(AnimeId)}}
          src="/favorite_40dp_FILL0_wght400_GRAD0_opsz40.svg"
          alt="Add to Favorite"
        />
      </div>
    </main>
  </section>
  <a href="#" className="back-to-top">
    <img
      src="/keyboard_arrow_up_40dp_FILL0_wght400_GRAD0_opsz40.svg"
      alt="Back to Top"
    />
  </a>
    </>
  );
}
