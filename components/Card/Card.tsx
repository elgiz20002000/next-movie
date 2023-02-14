import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import styles from './Card.module.scss'

type card_type = {
    id:string
    img:StaticImageData,
    title:string
}

const Card = ({img , title , id}:card_type) => {
  
  return (
   <Link href={'/' + id} className={styles.card}>
        <Image loading='lazy' width={440} height={673} src={img} alt={title}/>
        <div className={styles.title}>
            {title}
        </div>
   </Link>
  )
}

export default Card