import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

export default function HomePage() {
  const [animesData, setAnimesData] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  useEffect(() => {
    setLoading(true);
    const fetchData = async (page = 1) => {
      try {
        let  {data}  = await axios({
          method: 'get',
          url: `http://localhost:3000/pub/animes?page=${page}&query=${query}`,
        });
        console.log(data);
        setAnimesData(data.data);
        setTotalPages(data.pagination.last_visible_page);
        // setCurrentPage(data.pagination.current_page);
      } catch (error) {
        console.log(error);
      }finally {
        setLoading(false);
      }
    };
   

    fetchData(currentPage);
  }, [query, currentPage]);

  const handlePagination = async (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };  
  if (loading) {
    return <h3>Loading...</h3>;
  }

  const handleSubscribe = async () => {
    try {
     const {data} = await axios ({
         url: "http://localhost:3000/generate-midtrans-token",
         method: "post",
         headers: {
             'Authorization': `Bearer ${localStorage.getItem('token')}` 
         }
     })
     console.log(data);
     window.snap.pay(data.token, {
         embedId: 'snap-container',
         onSuccess: function (result) {
           /* You may add your own implementation here */
           alert("payment success!"); console.log(result);
         },
       });
    } catch (error) {
     console.log(error);
    };
     }
  return (
    <>
  <section className="home">
    <div className="carrd-grid">
    {animesData &&
            animesData.map((item, index) => {
              return <Card key={index} item={item} />;
            })}
    </div>
  </section>
  <div>
                <ul className="pagination">
                    <li className="page-item-prev">
                        <Link to="/" className="page-link">
                            &lt;
                        </Link>
                    </li>
                    <li className="page-item">
                        <button
                            to="/"
                            className="page-link"
                            onClick={() => handlePagination('1')}
                        >
                            1
                        </button>
                    </li>
                    <li className="page-item">
                        <button
                            to="/"
                            className="page-link"
                            onClick={() => handlePagination('2')}
                        >
                            2
                        </button>
                    </li>
                    <li className="page-item">
                        <button
                            to="/"
                            className="page-link"
                            onClick={() => handlePagination('3')}
                        >
                            3
                        </button>
                    </li>
                    <li className="page-item">
                        <button
                            to="/"
                            className="page-link"
                            onClick={() => handlePagination('4')}
                        >
                            4
                        </button>
                    </li>
                    <li className="page-item">
                        <button
                            to="/"
                            className="page-link"
                            onClick={() => handlePagination('5')}
                        >
                            5
                        </button>
                    </li>
                    <li className="page-item">
                        <button
                            to="/"
                            className="page-link"
                            onClick={() => handlePagination('6')}
                        >
                            6
                        </button>
                    </li>
                    <li className="page-item">
                        <button
                            to="/"
                            className="page-link"
                            onClick={() => handlePagination('7')}
                        >
                            7
                        </button>
                    </li>
                    <li className="page-item">
                        <button
                            to="/"
                            className="page-link"
                            onClick={() => handlePagination('8')}
                        >
                            8
                        </button>
                    </li>
                    <li className="page-item">
                        <button
                            to="/"
                            className="page-link"
                            onClick={() => handlePagination('9')}
                        >
                            9
                        </button>
                    </li>
                    <li className="page-item-link">
                        <Link to="/" className="page-link">
                            &gt;
                        </Link>
                    </li>
                </ul>
            </div>
  <a href="#" className="back-to-top">
    <img
      src="keyboard_arrow_up_40dp_FILL0_wght400_GRAD0_opsz40.svg"
      alt="Back to Top"
    />
  </a>
  <button className="btn btn-primary" onClick={()=> handleSubscribe()}>Subscribe</button>
</>
  );
}

