import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import CardsList from "../components/CardsList/CardsList";
import Menu from "../components/Menu/Menu";
import Navbar from "../components/Navbar/Navbar";
import Error from "../components/Error/Error";
import Spinner from "../components/Spinner/Spinner";
import { hideMenu } from "../Store/MenuSlice";
import {getError, getLoading, getMovies } from "../Store/MovieSlice";
import { useSession } from "next-auth/react";
import { Container } from "reactstrap";
import { getSavedMovies, setSavedMovies } from "../Store/SaveSlice";
import { setLikedMovies } from "../Store/LikedMovie";

export default function Home() {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading)
  const error = useSelector(getError)
  const movies = useSelector(getMovies)
  const {data:session,status} = useSession()
  const saved = useSelector(getSavedMovies)
// 

  
  
  useEffect( () => {
      dispatch(hideMenu());
  },[]);

  useEffect(() => {
    if(session && session?.user) {
      fetch('/api/save-movie/' + session.user.name)
      .then(res => res.json())
      .then(res => {
        if(res.ok) {
          dispatch(setSavedMovies(res.data.movies))
        } else {
          dispatch(setSavedMovies([]))
        }
      } 
  )}

  if(session && session?.user) {
    fetch('/api/like-movie/' + session.user.name)
    .then(res => res.json())
    .then(res => {
      if(res.ok) {
        dispatch(setLikedMovies(res.data.movies))
      } else {
        dispatch(setLikedMovies([]))
      }
    } 
)}
  }, [session?.user])


  
  return (
    <Container >
      <Menu />
      <header>
        <Navbar />
      </header>
      <main>
        
        {error  ? <Error/> : loading ? <div style={{'position':'absolute', "transform":"translate(-50%,-50%)", 'left':'50%',"top":'50%'}}><Spinner  width={100} height={100}/></div> : movies.length ?  <CardsList/> : <div className="notification">Search something</div>}
      </main>
    </Container>
  );
}
