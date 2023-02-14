import Card from '../Card/Card'
import styles from './CardsList.module.scss'
import { useSelector } from 'react-redux'
import { getMovies } from '../../Store/MovieSlice'
import { useRouter } from 'next/router'
import { getSavedMovies } from '../../Store/SaveSlice'

const CardsList = () => {
  const router = useRouter()
  let  movies = useSelector(getMovies) 
  let savedMovies = useSelector(getSavedMovies)

  

  console.log(movies)
  
  return <>
        <div className={styles.cards_list}>
          {router.pathname != '/Saved' ? movies ? movies.map(( {Poster , Title , imdbID})  => {
              if(Poster !== 'N/A') {
                return <Card id={imdbID} key={imdbID} img={Poster} title={Title}/>
              } else {
                return
              }
            } ) : 'Not Found'  : savedMovies ? savedMovies.map(( {Poster , Title , imdbID})  => {
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