import '../Styles/styles.css'
import { useForm } from 'react-hook-form'
// npm install react-hook-form
const NewPost = () => {
  const { register, handleSubmit } = useForm({})
  const onSubmit = async (data) => {
    console.log(data);
  }
  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2 className="form-subheader">Create New Blog</h2>
        <h1 className="form-header">Blog Details</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">Title:</label>
          <input  {...register("title", { required: true })} type="text" id="title" name="title" required />
          <label htmlFor="text">Text:</label>
          <textarea {...register("text", { minLength: 5 })} id="text" name="content" rows={5} required defaultValue={""} />
          <label htmlFor="image-url">Image URL:</label>
          <input  {...register("image-url")} type="text" id="image-url" name="image-url" required />
          <label htmlFor="categories">Categories:</label>
          <select  {...register("categories")} id="categories" name="categories" required>
            <option value>Select a category</option>
            <option value="technology">Technology</option>
            <option value="travel">Travel</option>
            <option value="food">Food</option>
            {/* Add more categories here */}
          </select>
          <button type="submit" className="btn-publish">Publish</button>
        </form>
      </div>
    </div>
  );
}
export default NewPost;