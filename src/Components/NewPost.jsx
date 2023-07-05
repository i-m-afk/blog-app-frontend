import "../Styles/styles.css";
import { useForm } from "react-hook-form";
import Navbar from "./Navbar";
// npm install react-hook-form
const NewPost = () => {
  const { register, handleSubmit } = useForm({});
  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <>
      <Navbar />
      <div className="form-wrapper login">
        <div className="form-container">
          <h2 className="form-subheader">Create New Blog</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input_grp">
              <label htmlFor="title">Title:</label>
              <input
                {...register("title", { required: true })}
                type="text"
                id="title"
                name="title"
                required
              />
            </div>
            <div className="input_grp">
              <label htmlFor="text">Text:</label>
              <textarea
                {...register("text", { minLength: 5 })}
                id="text"
                name="content"
                rows={5}
                required
                defaultValue={""}
              />
            </div>
            <div className="input_grp">
              <label htmlFor="image-url">Image URL:</label>
              <input
                {...register("image-url")}
                type="text"
                id="image-url"
                name="image-url"
                required
              />
            </div>
            <div className="input_grp">
              <label htmlFor="categories">Categories:</label>
              <input
                {...register("image-url")}
                type="text"
                id="image-url"
                name="image-url"
                required
              />
            </div>

            <button type="submit" className="primary_btn">
              Publish
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default NewPost;
