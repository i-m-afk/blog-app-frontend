import "../Styles/error.css";
import { Link } from "react-router-dom";
export default function ErrorPage() {
  return (
    <div id="error-page">
      <h1>Opps!</h1>
      <p>Something's is wrong I can feel it.</p>
      <p>
        <i>
          <Link to={"/"}>Click here</Link>to go back to front page.
        </i>
      </p>
    </div>
  );
}
