import '../Styles/Explorer.css'

const Explorer = () => {

  return (
    <div className='explorer'>
      <h3>Where do you want to work today?</h3>

      <form action="GET">
        <input type="text" />
        <input type="date" name="" id="" />
        <input type="number" name="" id="" />
        <button>Search</button>
      </form>
      
    </div>
  )
}

export default Explorer