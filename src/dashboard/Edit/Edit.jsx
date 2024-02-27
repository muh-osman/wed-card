import "./Edit.css";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// API
import api from "../../api";
// MUI icon
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
// sweetalert
import Swal from "sweetalert2";
// useContext
import { TrigerContext } from "../../context/trigerProvider";

export default function Edit() {
  // useContext
  const { triger, setTriger } = useContext(TrigerContext);
  //
  const nav = useNavigate();

  // const [pageLink, setPageLink] = useState(null);
  // const [copyDone, setCopyDone] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [clickedButton, setClickedButton] = useState(false);
  // image
  const [apiSheet, setApiSheet] = useState("");
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedFile);
    setImage(imageUrl);
  };

  const { id } = useParams();

  // const domain = window.location.origin; //Ex: http://localhost:3000

  async function fetchData() {
    try {
      const res = await api.get(`api/cards/${id}`);
      // console.log(res.data);
      setImage(res.data.image);
      setApiSheet(res.data.api);
      setLink(res.data.link);
      setTitle(res.data.title);

      // setPageLink(`${domain}/card/${id}`);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    // setCopyDone(false);
    setImage(null);
    document.getElementsByTagName("form")[0].reset();
    fetchData();
  }, [id]);

  async function submitData(e) {
    e.preventDefault();
    setClickedButton(true);
    const form = document.getElementById(`edit-form-${id}`);
    const formData = new FormData(form);
    try {
      await api.post(`api/cards/${id}?_method=PATCH`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Stop button animation
      setClickedButton(false);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "All changes saved",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      console.error(err);
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

  // const handleCopy = () => {
  //   console.log(pageLink);

  //   navigator.clipboard
  //     .writeText(pageLink)
  //     .then(() => {
  //       console.log("Page link copied to clipboard");
  //     })
  //     .catch((error) => {
  //       console.error("Failed to copy page link to clipboard", error);
  //     });

  //   // Show sccusess icon
  //   setCopyDone(true);
  // };

  return (
    <div className="images-container">
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

        {/* Location */}
        <div className="mb-3 d-none">
          <label htmlFor="exampleInputTitle" className="form-label">
            Edit location link:
          </label>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            name="link"
            type="text"
            className="form-control"
            id="exampleInputTitle"
            aria-describedby="emailHelp"
            required
          />
        </div>

        {/* API */}
        <div className="mb-3">
          <label htmlFor="exampleInputLink" className="form-label">
            Edit google sheets API:
          </label>
          <input
            value={apiSheet}
            onChange={(e) => setApiSheet(e.target.value)}
            name="api"
            type="text"
            className="form-control"
            id="exampleInputLink"
            aria-describedby="emailHelp"
            required
          />
        </div>

        {/* Image */}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">
            Edit image:
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            name="image"
            className="form-control"
            id="exampleInputEmail"
            aria-describedby="emailHelp"
            // defaultValue={image}
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

          <div>
            {/* Copy Button */}
            {/* <IconButton
              onClick={handleCopy}
              aria-label="copy"
              sx={{ "&:hover": { color: "#000" } }}
            >
              {copyDone ? <DoneOutlineIcon /> : <ContentCopyIcon />}
            </IconButton> */}

            {/* Delete Button */}
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
