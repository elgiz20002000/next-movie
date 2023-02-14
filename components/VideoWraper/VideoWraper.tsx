import ReactPlayer from "react-player"
import style from './VideoWraper.module.scss';
const VideoWraper = ({videoUrl , exitClick}) => {
  return <>
    <ReactPlayer controls style={
        {
        'position':'absolute' ,
        'left':'50%',
        'top':'50%',
        'transform':'translate(-50%,-50%)'
    }
     } url={videoUrl}/>
     <div onClick={exitClick} className={style.exit_btn}>
     <i className={"fa-solid fa-xmark" + ' ' + style.color}></i>
     </div>
  </>
}

export default VideoWraper