import thisIsUs from '../../images/this_is_us.jpg'

function PageHeader() {
  return (
    <header
      className="overlay grey"
      style={{
        backgroundImage: `url("${thisIsUs}")`,
        width: '100%',
        height: '25vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    ></header>
  )
}

export default PageHeader
