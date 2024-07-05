import { useState, useEffect } from "react";
import "../Styles/Form.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import IsMobile from "./IsMobile";
import Alert from "./Alert";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
} from "@mui/material";
import Modal from "./Modal";

const CategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [showRemoveSuccess, setShowRemoveSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [srcImg, setSrcImg] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editIdx, setEditIdx] = useState(-1);
  const [draftData, setDraftData] = useState({
    title: "",
    description: "",
    srcImg: null,
  });
  const isMobile = IsMobile();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://sxay9vvf7e.execute-api.us-east-2.amazonaws.com/categoryDataGET");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert image to base64
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    let base64Image = "";
    if (srcImg) {
      base64Image = await toBase64(srcImg);
    }

    const formData = {
      title,
      description,
      srcImg: base64Image,
    };

    try {
      const response = await axios.post(
        "https://sxay9vvf7e.execute-api.us-east-2.amazonaws.com/categoryDataPOST",
        formData
      );
      console.log(response.data);
      setShowAddSuccess(true);
      setTitle("");
      setDescription("");
      setSrcImg(null);

      setCategories((prevCategories) => [...prevCategories, response.data]);

      setTimeout(() => setShowAddSuccess(false), 3000);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleFileChange = (e) => {
    setSrcImg(e.target.files[0]);
  };

  const openModal = (index) => {
    setCurrentRow(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentRow(null);
  };

  const confirmDelete = async () => {
    const categoryId = categories[currentRow].id;
    try {
      const response = await axios.delete(
        `https://sxay9vvf7e.execute-api.us-east-2.amazonaws.com/categoryDataDELETE${categoryId}`
      );
      console.log(response.data);
      const updatedCategories = categories.filter(
        (_, index) => index !== currentRow
      );
      setCategories(updatedCategories);
      setShowRemoveSuccess(true);
      setTimeout(() => setShowRemoveSuccess(false), 3000);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
    closeModal();
  };

  const startEdit = (index, row) => {
    setEditIdx(index);
    setDraftData({ ...row });
  };

  const cancelEdit = () => {
    setEditIdx(-1);
    setDraftData({});
  };

  const saveEdit = async (index) => {
    const updatedCategory = { ...categories[index], ...draftData };
    try {
      const response = await axios.put(
        `https://sxay9vvf7e.execute-api.us-east-2.amazonaws.com/categoryDataPUT${updatedCategory.id}`,
        updatedCategory
      );
      console.log(response.data);
      const updatedCategories = [...categories];
      updatedCategories[index] = updatedCategory;
      setCategories(updatedCategories);
      setEditIdx(-1);
      setDraftData({});
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="contenedorBody">
      <div className="containerButton">
        <Link to="/admin" className="genericButton link-flex">
          <FaArrowLeft className="iconSpace" /> Go back
        </Link>
      </div>
      <h2 className="mb-4">List & Add Categories</h2>

      {isMobile ? (
        <div className="mobile-message-card">
          <div className="mobile-message-icon">
            <FaExclamationTriangle />
          </div>
          <h2>This view is not available on mobile devices.</h2>
        </div>
      ) : (
        <div className="d-flex">
          <div className="form-column">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        TITLE
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        DESCRIPTION
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        ACTIONS
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {editIdx === index ? (
                          <input
                            value={draftData.title}
                            onChange={(e) =>
                              setDraftData({
                                ...draftData,
                                title: e.target.value,
                              })
                            }
                            maxLength={22}
                          />
                        ) : (
                          category.title
                        )}
                      </TableCell>
                      <TableCell>
                        {editIdx === index ? (
                          <input
                            value={draftData.description}
                            onChange={(e) =>
                              setDraftData({
                                ...draftData,
                                description: e.target.value,
                              })
                            }
                            maxLength={90}
                          />
                        ) : (
                          category.description
                        )}
                      </TableCell>
                      <TableCell>
                        {editIdx === index ? (
                          <>
                            <Button onClick={() => saveEdit(index)}>
                              Save
                            </Button>
                            <Button onClick={cancelEdit}>Cancel</Button>
                          </>
                        ) : (
                          <>
                            <Button onClick={() => startEdit(index, category)}>
                              Edit
                            </Button>
                            <Button onClick={() => openModal(index)}>
                              Delete
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="form-column">
            {showAddSuccess && (
              <Alert
                type="success"
                message={
                  <span>
                    Category
                    <strong> ADDED</strong> successfully.
                  </span>
                }
              />
            )}
            {showRemoveSuccess && (
              <Alert
                type="success"
                message={
                  <span>
                    Category
                    <strong> REMOVED</strong> successfully.
                  </span>
                }
              />
            )}
            <form className="formProduct" onSubmit={handleSubmit}>
              <div className="form-column">
                <h4>Enter the new category for the products</h4>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  name="title"
                  maxLength={22}
                />
                <small className="d-flex mb-2">
                  {22 - title.length} characters{" "}
                </small>

                <label htmlFor="description">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  name="description"
                  maxLength={90}
                />
                <small className="d-flex mb2">
                  {90 - description.length} characters{" "}
                </small>

                <label htmlFor="srcImg">Image</label>
                <input
                  className="d-flex mb2"
                  type="file"
                  onChange={handleFileChange}
                  name="srcImg"
                />

                <div className="containerButton centerContaniner">
                  <button className="genericButton" type="submit">
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {showModal && (
        <Modal
          title="Confirm Delete"
          body={
            <div>
              <p>You are about to delete a category.</p>
              <p>
                This action will also{" "}
                <strong>
                  eliminate the products associated with this category
                </strong>
                .
              </p>
              <p>Are you sure you want to continue?</p>
            </div>
          }
          onClose={() => setShowModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default CategoryForm;
