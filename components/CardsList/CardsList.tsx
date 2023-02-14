import Card from '../Card/Card'
import styles from './CardsList.module.scss'
import { useSelector } from 'react-redux'
import { getMovies } from '../../Store/MovieSlice'
import { useRouter } from 'next/router'
import { getSavedMovies } from '../../Store/SaveSlice'

const CardsList = () => {
  const router = useRouter()
  let movies 

  if(router.pathname == '/Saved') {
    movies = useSelector(getSavedMovies)
  } else {
    movies = useSelector(getMovies)
  }

  console.log(movies)
  
  return <>
        <div className={styles.cards_list}>
            {movies ? movies.map(( {Poster , Title , imdbID})  => {
              if(Poster !== 'N/A') {
                return <Card id={imdbID} key={imdbID} img={Poster} title={Title}/>
              } else {
                return
              }
            } ) : 'Not Found' }
      </div>
  </>
}

export default CardsList