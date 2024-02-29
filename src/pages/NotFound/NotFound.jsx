import "./NotFound.css";
import { useEffect } from "react";
// sweetalert2
import Swal from "sweetalert2";

export default function NotFound() {
  useEffect(() => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "This page has been deleted!",
      showConfirmButton: false,
      timer: 2000,
    });
  }, []);

  return (
    <div className="not_found_container">
      <h1>404 | Not Found</h1>
    </div>
  );
}
