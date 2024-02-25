import "./AddPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// API
import api from "../../api";
// sweetalert
import Swal from "sweetalert2";

export default function AddPage() {
  // Store image to show
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedFile);
    setImage(imageUrl);
  };

  const [clickedButton, setClickedButton] = useState(false);

  // navigate
  const nav = useNavigate();

  async function submitData(e) {
    e.preventDefault();
    setClickedButton(true);
    const form = document.getElementById("create-form");
    const formData = new FormData(form);
    try {
      const res = await api.post("api/cards", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Stop button animation
      setClickedButton(false);
      // Show alert
      Swal.fire({
        title: "Page created successfully!",
        icon: "success",
        confirmButtonColor: "#b6ac9a",
      }).then(() => {
        // Navigate to /
        nav("/");
      });
    } catch (err) {
      console.error(err);
      setClickedButton(false);
    }
  }
  return (
    <div className="images-container">
      {/* form */}
      <form
        onSubmit={submitData}
        encType="multipart/form-data"
        id="create-form"
      >
        {image && (
          <div className="form-image-box">
            <img src={image} alt="card image" />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="exampleInputTitle" className="form-label">
            Add title:
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="exampleInputTitle"
            aria-describedby="emailHelp"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">
            Add image:
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            name="image"
            className="form-control"
            id="exampleInputEmail"
            aria-describedby="emailHelp"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputTitle" className="form-label">
            Add location link:
          </label>
          <input
            // defaultValue={location}
            name="link"
            type="text"
            className="form-control"
            id="exampleInputTitle"
            aria-describedby="emailHelp"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputLink" className="form-label">
            Add google sheets API:
          </label>
          <input
            // defaultValue={api}
            name="api"
            type="text"
            className="form-control"
            id="exampleInputLink"
            aria-describedby="emailHelp"
            required
          />
        </div>

        <div className="btn_box">
          <button
            type="submit"
            className="btn btn-primary mt-2 mb-2"
            style={{ width: "120px" }}
          >
            {clickedButton ? (
              <div
                className="spinner-border spinner-border-sm"
                role="status"
              ></div>
            ) : (
              "Create page"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
