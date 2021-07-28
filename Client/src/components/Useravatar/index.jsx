
const Useravatar = (props) => {
    return(
        <img src={props.img || 'https://gblobscdn.gitbook.com/spaces%2F-M5x1LJiRQvXWpt04_ee%2Favatar-1589202873787.png?alt=media'} 
        style={{
           width: props.width+'px',
           height: props.height+'px'
        }}>
        </img>
    )
}

export default Useravatar