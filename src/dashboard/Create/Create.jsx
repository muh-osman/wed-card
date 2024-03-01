import "./Create.css";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// API
import api from "../../api";
// sweetalert
import Swal from "sweetalert2";
// useContext
import { TrigerContext } from "../../context/trigerProvider";
// .env
const apiUrl = process.env.REACT_APP_API_URL;

export default function Create() {
  // useContext
  const { triger, setTriger } = useContext(TrigerContext);
  // Store image to show
  const [title, setTitle] = useState(null);
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedFile);
    setImage(imageUrl);
  };

  const [clickedButton, setClickedButton] = useState(false);

  useEffect(() => {
    setImage(null);
    setTitle(null);
    setAudio(null);
    document.getElementsByTagName("form")[0].reset();
  }, []);

  // navigate
  const nav = useNavigate();

  // async function submitData(e) {
  //   e.preventDefault();
  //   setClickedButton(true);
  //   const formData = new FormData(e.target);

  //   try {
  //     let res = await api.post("api/cards", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Connection: "close",
  //       },
  //     });

  //     // Check if the response is successful
  //     if (res.status === 201) {
  //       // Reset the form after submission
  //       document.getElementsByTagName("form")[0].reset();

  //       // Show alert
  //       Swal.fire({
  //         title: "Page created successfully!",
  //         icon: "success",
  //         confirmButtonColor: "#b6ac9a",
  //       }).then(() => {
  //         // refetch sidebar data
  //         setTriger((prev) => prev + 1);
  //         // Navigate to /dashboard
  //         nav("/dashboard");
  //       });
  //     }
  //   } catch (err) {
  //     // Show error alert
  //     Swal.fire({
  //       title: "Error",
  //       text: "Failed to create page",
  //       icon: "error",
  //       confirmButtonColor: "#b6ac9a",
  //     });
  //   } finally {
  //     // Stop button animation
  //     setClickedButton(false);
  //   }
  // }

  

  function submitData() {
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("image", image);
    formdata.append("audio", audio);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`${apiUrl}api/cards`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }

  return (
    <div className="images-container">
      <h1 style={{ color: "#757575", marginBottom: "16px" }}>
        Create a new page
      </h1>
      {/* form */}
      <form
        onSubmit={submitData}
        id="create-form"
        encType="multipart/form-data"
      >
        {image && (
          <div className="form-image-box">
            <img src={image} alt="card image" />
          </div>
        )}

        {/* Title */}
        <div className="mb-3">
          <label htmlFor="exampleInputTitle" className="form-label">
            Title<span>*</span>
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            dir="auto"
            type="text"
            name="title"
            className="form-control"
            id="exampleInputTitle"
            aria-describedby="emailHelp"
            required
          />
        </div>

        {/* Image */}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">
            Image<span>*</span>
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            name="image"
            accept="image/*"
            className="form-control"
            id="exampleInputEmail"
            aria-describedby="emailHelp"
            required
          />
        </div>

        {/* Audio */}
        <div className="mb-3">
          <label htmlFor="exampleInputAudio" className="form-label">
            Audio (optional)
          </label>
          <input
            onChange={(e) => setAudio(e.target.files[0])}
            type="file"
            name="audio"
            accept="audio/*"
            className="form-control"
            id="exampleInputAudio"
            aria-describedby="emailHelp"
          />
        </div>

        {/* submit btn */}
        <div className="btn_box">
          <button
            type="submit"
            className="btn btn-primary mt-2 mb-2"
            style={{ width: "76.91px" }}
          >
            {clickedButton ? (
              <div
                className="spinner-border spinner-border-sm"
                role="status"
              ></div>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
