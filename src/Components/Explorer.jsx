import "../Styles/Explorer.css";

const Explorer = () => {
  return (
    <div className="explorer">
      <h4>Where do you want to work today?</h4>
      <form action="GET">
        <input type="text" placeholder="Direction" />
        <input type="date" placeholder="Duration" />
        <input type="number" placeholder=" Add Persons" />
      </form>
      <div className="d-flex justify-content-end pt-2">
        <button className="buttonSearchExplorer">Search</button>
      </div>
    </div>
  );
};

export default Explorer;
