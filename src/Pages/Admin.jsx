// TODO: DELETE se debe cambiar por un icono para gestionar
const Admin = () => {
  return (
    <div className="contenedorBody">
      <h2>Place Management</h2>
      <div className="separador"></div>
      <button type="button " class="btn btn-warning" className="genericButton">
        Add
      </button>
      <div className="separador"></div>

      <table class="table align-middle mb-0 bg-white">
        <thead class="bg-light">
          <tr>
            <th class="text-secondary">Name</th>
            <th class="text-secondary">Category</th>
            <th class="text-secondary">Capacity</th>
            <th class="text-secondary">Price</th>
            <th class="text-secondary">Status</th>
            <th class="text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">Harmony</p>
                </div>
              </div>
            </td>
            <td>
              <p class="fw-normal mb-1">Private Office</p>
              <p class="text-muted mb-0">1 person</p>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-normal mb-1">1</p>
                </div>
              </div>
            </td>
            <td>65</td>
            <td>
              <span class="btn btn-warning d-inline is-not-btn">Active</span>
            </td>

            <td>
              <button
                type="button"
                class="btn btn-link btn-sm btn-rounded fw-bold"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">Serenity</p>
                </div>
              </div>
            </td>
            <td>
              <p class="fw-normal mb-1">Meeting Room</p>
              <p class="text-muted mb-0">2-12 persons</p>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-normal mb-1">5</p>
                </div>
              </div>
            </td>
            <td>65</td>
            <td>
              <span class="btn btn-secondary d-inline d-inline is-not-btn">
                Disabled
              </span>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-link btn-rounded btn-sm fw-bold"
                data-mdb-ripple-color="dark"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
