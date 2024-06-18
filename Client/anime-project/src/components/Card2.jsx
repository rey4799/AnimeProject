import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Card2({item, handleDelete}) {

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
            src= {item.anime.images.jpg.image_url}
            alt="Hibike! Euphonium 3"
          />
          <div className="title">
            <figcaption className="text-truncate">{item.anime.title}</figcaption>
            <figcaption className="text-truncate">{item.anime.studios[0].name}</figcaption>
          </div>
        </div>
        <div className="right">
          <div className="information">
            <p>{item.anime.status}</p>
            <p>{item.anime.episodes} Episodes</p>
            <p>{item.anime.source}</p>
          </div>
          <p className="synopsys ">
            {item.anime.synopsis}
          </p>
          <div className="genreDetails">
            <div className="genre">
              <button disabled="disabled">{item.anime.genres[0].name}</button>
            </div>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </>
)
}
