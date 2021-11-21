import axios from "axios";
import React from "react";
import { useEffect } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Genres from "../../components/Genres";
import useGenres from "../../hooks/useGenre";

function Movies() {
  const [page, setPage] = React.useState(1);
  const [content, setContent] = React.useState([]);
  const [numOfPages, setNumOfPages] = React.useState(true);
  const [selectedGenres, setSelectedGenres] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  const genreforURL = useGenres(selectedGenres)

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
    console.log(data.results);
  };
  useEffect(() => {
     // eslint-disable-next-line
    fetchMovies();
  }, [page, genreforURL]);
  return (
    <div>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <span className="pageTitle">Movies</span>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
}

export default Movies;
