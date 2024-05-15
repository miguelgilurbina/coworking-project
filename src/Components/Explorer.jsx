import '../Styles/Explorer.css'

const Explorer = () => {

  return (
    <div className='explorer'>
      <h3>Where do you want to work today?</h3>
      <form action="GET">
        <input type="text" placeholder='Direction'/>
        <input type="date" placeholder='Duration'  />
        <input type="number" placeholder='Add Persons' />
        <button>Search</button>
      </form>
      
    </div>
  )
}

export default Explorer