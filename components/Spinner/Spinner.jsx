import Image from "next/image"
import style from './Spinner.module.scss'

const Spinner = ({width , height}) => {
  return (
    <div className={style.loading}>
        <Image
         src={'/gif/loading.gif'}
         alt='loading'
         width={width}
         height={height}   
        />
    </div>
  )
}

export default Spinner