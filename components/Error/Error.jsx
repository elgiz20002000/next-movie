import Image from "next/image"
import style from  './Error.module.scss'

const Error = () => {
  return (
        <div className={style.error}>
            <Image src={'/img/error.gif'}
            alt='error'
            width={800}
            height={600}
            />
        </div>
  )
}

export default Error