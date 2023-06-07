import React, { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, remove, update } from "firebase/database";
import { database } from "../../Firebase/Firebase";

const AdminCareerPath = () => {
  const [careerPaths, setCareerPaths] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingCareerPath, setEditingCareerPath] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const careerPathRef = ref(database, "Admin/careerpath");
    onValue(careerPathRef, (snapshot) => {
      const paths = snapshot.val();
      if (paths) {
        const careerPathsList = Object.keys(paths).map((key) => ({
          id: key,
          ...paths[key],
        }));
        setCareerPaths(careerPathsList);
      }
    });
  }, []);

  const addCareerPath = () => {
    if (name && description) {
      const careerPathRef = ref(database, "Admin/careerpath");
      const newCareerPath = {
        name: name,
        description: description,
      };
      if (editingCareerPath) {
        // If editingCareerPath exists, update the career path
        const careerPathToUpdate = ref(database, `Admin/careerpath/${editingCareerPath}`);
        setEditingCareerPath(null);
        update(careerPathToUpdate, newCareerPath);
      } else {
        // If editingCareerPath doesn't exist, add a new career path
        push(careerPathRef, newCareerPath);
      }

      setName("");
      setDescription("");
    }
  };

  const editCareerPath = (id) => {
    const careerPathToEdit = careerPaths.find((careerPath) => careerPath.id === id);
    if (careerPathToEdit) {
      setName(careerPathToEdit.name);
      setDescription(careerPathToEdit.description);
      setEditingCareerPath(id);
    }
  };

  const deleteCareerPath = (id) => {
    const careerPathToDelete = ref(database, `Admin/careerpath/${id}`);
    remove(careerPathToDelete);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = careerPaths.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <header>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg px-5">
          <div className="container-fluid d-flex justify-content-center">
            <a className="navbar-brand text-white" href="#">Career Pathing</a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-center"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link text-white" href="admin_user.html">User Management</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="admin.performance.html">Performance Management</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="admin_careerpath.html">Career Pathing</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="admin_report.html">Reports</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="General/main.html">Logout</a>
                </li>
              </ul>
            </div>
            <div className="user ms-auto">
              <p>Welcome, <span className="username">Admin</span></p>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div className="container">
          <h2>Career Paths</h2>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((careerPath) => (
                <tr key={careerPath.id}>
                  <td>{careerPath.name}</td>
                  <td>{careerPath.description}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => editCareerPath(careerPath.id)}>Edit</button>
                    <button className="btn btn-primary" style={{ marginLeft: "10px" }} onClick={() => deleteCareerPath(careerPath.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="pagination">
            {Array.from({ length: Math.ceil(careerPaths.length / itemsPerPage) }, (_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
              </li>
            ))}
          </ul>
          <hr />
          <h2>Add New Career Path</h2>
          <form action="add_career_path.php" method="post">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required /><br />
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea><br />
            <label htmlFor="file">Upload File:</label>
            <input type="file" id="file" name="file" /><br />

            <button className="btn btn-primary" type="submit" onClick={addCareerPath}>
              Add Career Path
            </button>
          </form>

        </div>
      </main >
      <footer>
        <p>All rights reserved.</p>
      </footer>
    </div >
  );
}

export default AdminCareerPath;
