import Card from '../Card/Card'
import styles from './CardsList.module.scss'
import { useSelector } from 'react-redux'
import { getMovies } from '../../Store/MovieSlice'
import { useRouter } from 'next/router'
import { getSavedMovies } from '../../Store/SaveSlice'
import { StaticImageData } from 'next/image'

const CardsList = () => {
  const router = useRouter()
  let  movies = useSelector(getMovies) 
  let savedMovies = useSelector(getSavedMovies)

  

  
  return <>
        <div className={styles.cards_list}>
          {router.pathname != '/Saved' ? movies ? movies.map(( {Poster , Title , imdbID}:{Poster:StaticImageData | string, Title:string, imdbID:string})  => {
              if(Poster !== 'N/A') {
                return <Card id={imdbID} key={imdbID} img={Poster as StaticImageData} title={Title}/>
              } else {
                return
              }
            } ) : 'Not Found'  : savedMovies ? savedMovies.map(( {Poster , Title , imdbID}:{Poster:StaticImageData | string, Title:string, imdbID:string})  => {
              if(Poster !== 'N/A') {
                return <Card id={imdbID} key={imdbID} img={Poster as StaticImageData} title={Title}/>
              } else {
                return
              }
            } ) : 'Not Found' } 
            
      </div>
  </>
}

export default CardsList