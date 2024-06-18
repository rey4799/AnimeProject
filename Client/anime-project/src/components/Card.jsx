import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Card({item}) {

  function episode() {
    if (item.episodes === null || item.episodes === undefined){
      return "Ongoing"
    }else{ return item.episodes}
  }

return (
    <>
<div className="carrd">
        <div className="left">
          <img
            src= {item.images.jpg.image_url}
            alt="Hibike! Euphonium 3"
          />
          <div className="title">
            <figcaption className="text-truncate">{item.title}</figcaption>
            <figcaption className="text-truncate">{item.studios[0].name}</figcaption>
          </div>
        </div>
        <div className="right">
          <div className="information">
            <p>{item.status}</p>
            <p>{item.episodes} Episodes</p>
            <p>{item.source}</p>
          </div>
          <p className="synopsys ">
            {item.synopsis}
          </p>
          <div className="genreDetails">
            <div className="genre">
              <button disabled="disabled">{item.genres[0].name}</button>
            </div>
            <Link to={`/pub/${item.mal_id}`} >
              <button className="details">. . .</button>
            </Link>
          </div>
        </div>
      </div>
    </>
)
}
