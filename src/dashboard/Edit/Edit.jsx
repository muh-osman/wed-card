import "./Edit.css";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// API
import api from "../../api";
// MUI icon
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
// sweetalert
import Swal from "sweetalert2";
// useContext
import { TrigerContext } from "../../context/trigerProvider";

export default function Edit() {
  // useContext
  const { triger, setTriger } = useContext(TrigerContext);
  //
  const nav = useNavigate();

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [clickedButton, setClickedButton] = useState(false);
  // image
  const [title, setTitle] = useState(null);
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedFile);
    setImage(imageUrl);
  };

  const { id } = useParams();

  async function fetchData() {
    try {
      const res = await api.get(`api/cards/${id}`);
      // console.log(res.data);
      setImage(res.data.image);
      setTitle(res.data.title);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    setImage(null);
    document.getElementsByTagName("form")[0].reset();
    fetchData();
  }, [id]);

  async function submitData(e) {
    e.preventDefault();
    setClickedButton(true);

    const formData = new FormData(document.getElementById(`edit-form-${id}`));

    try {
      let res = await api.post(`api/cards/${id}?_method=PATCH`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        onUploadProgress: function (progressEvent) {
          let progress = (progressEvent.loaded / progressEvent.total) * 100;

          console.log(progress);

          if (progress === 100) {
            setTimeout(() => {
              setClickedButton(false);

              // Reset the form after submission
              document.getElementsByTagName("form")[0].reset();

              // Stop button animation
              setClickedButton(false);

              Swal.fire({
                position: "center",
                icon: "success",
                title: "All changes saved",
                showConfirmButton: false,
                timer: 2000,
              }).then(() => {
                nav("/dashboard");
              });
            }, 3000);
          }
        },
      });
    } catch (err) {
      setClickedButton(false);
      // Handle network errors
      console.error(err);
      // Display an error message to the user
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
    }
  }

  const deleteAlert = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      }
    });
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await api.delete(`api/cards/${id}`);
      setTriger((prev) => prev + 1);
      nav("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="edit-page-container">
      <h1
        style={{ color: "#757575", marginBottom: "16px", textAlign: "center" }}
      >
        Edit {title && <span style={{ color: "#000" }}>"{title}"</span>} page
      </h1>
      {/* form */}
      <form
        onSubmit={submitData}
        encType="multipart/form-data"
        id={`edit-form-${id}`}
      >
        <div className="form-image-box">
          {image && <img src={image} alt="card image" />}
        </div>

        {/* Image */}
        <div className="mb-3">
          <label htmlFor="exampleInputImage" className="form-label">
            Image:
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            name="image"
            accept="image/*"
            className="form-control"
            id="exampleInputImage"
            aria-describedby="emailHelp"
            // defaultValue={image}
          />
        </div>

        {/* Location */}
        <div className="mb-3">
          <label htmlFor="exampleInputLocation" className="form-label">
            Location:
          </label>
          <input
            dir="ltr"
            type="text"
            name="location"
            className="form-control"
            id="exampleInputLocation"
          />
        </div>

        {/* Audio */}
        <div className="mb-3">
          <label htmlFor="exampleInputAudio" className="form-label">
            Audio:
          </label>
          <input
            type="file"
            accept="audio/*"
            name="audio"
            className="form-control"
            id="exampleInputAudio"
            aria-describedby="emailHelp"
          />
        </div>

        {/* Submit button */}
        <div className="btn_box">
          <button
            type="submit"
            className="btn btn-primary mt-2 mb-2"
            style={{ width: "60px" }}
          >
            {clickedButton ? (
              <div
                className="spinner-border spinner-border-sm"
                role="status"
              ></div>
            ) : (
              "Edit"
            )}
          </button>

          {/* Delete Button */}
          <div>
            <IconButton
              onClick={deleteAlert}
              aria-label="delete"
              sx={{ "&:hover": { color: "red" } }}
            >
              {deleteLoading ? (
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              ) : (
                <DeleteIcon />
              )}
            </IconButton>
          </div>
        </div>
      </form>

      {/* add page fixed icon */}
      <Link
        to="/dashboard/create"
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
        }}
      >
        <Fab
          sx={{
            color: "#fff",
            backgroundColor: "#b6ac9a",
            "&:hover": { backgroundColor: "#837966 " },
          }}
          aria-label="create"
        >
          <AddIcon />
        </Fab>
      </Link>
    </div>
  );
}
