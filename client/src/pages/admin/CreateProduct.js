import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import './css/productcard.css';

const CreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [stock, setStock] = useState('');
  const [feature, setFeature] = useState('top');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [rating, setRating] = useState(5);
  const [dis, setDis] = useState(0);
  const [size, setSize] = useState('');
  const [colors, setColors] = useState('');
  const [img, setImg] = useState([]);
  const [prodimg, setProdimg] = useState([]);
  const createProduct = async (e) => {
    setLoading(true);
    const sizes = size.split(',');
    const colours = colors.split(',');
    const cate = category.split(',');
    if (name && price && desc && stock && category && img && brand && feature) {
      const form = new FormData();
      form.append('name', name);
      form.append('price', price);
      form.append('size', sizes);
      form.append('disc', dis);
      form.append('color', colours);
      form.append('category', cate);
      form.append('brand', brand);
      form.append('stock', stock);
      form.append('desc', desc);
      form.append('feature', feature);
      form.append('rating', rating);

      for (const sing in prodimg) {
        form.append('img', prodimg[sing]);
      }
      const { data } = await axios.post(
        'http://localhost:4000/api/v1/createproducts',
        form,
        {
          withCredentials: true,
        }
      );
      if (data) {
        toast.success('Product Created');
        navigate('/adminpanel');
        setLoading(false);
      } else {
        setLoading(false);
        toast.error('Error occured');
        navigate('/adminpanel');
      }
    } else {
      setLoading(false);
      alert('Please fill all the details');
    }
  };
  const setimg = (e) => {
    const position = e.target.name;
    const files = e.target.files[0];
    prodimg[Math.floor(position)] = files;
    imageDisplay(files, position);
  };
  const imageDisplay = (file, pos) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        img.length >= 4
          ? (img[+pos] = reader.result)
          : setImg([...img, reader.result]);
      }
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className={`create-container ${loading ? 'blur' : ''}`}>
      <Link to="/adminpanel"> G0 BACK</Link>
      <div className="create-form">
        <h1>Create Product</h1>
        <div className="create-inputs">
          <label className="label">Name: </label>
          <input
            type="text"
            placeholder="Product Name.."
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="create-inputs">
          <label className="label">Price: </label>
          <input
            type="number"
            placeholder="Price"
            required
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>
        <div className="create-inputs">
          <label className="label">Dsicount: </label>
          <input
            type="number"
            placeholder="Price"
            onChange={(e) => setDis(e.target.value)}
          ></input>
        </div>
        <div className="create-inputs">
          <label className="label">Size: </label>
          <input
            type="text"
            placeholder="Size"
            required
            onChange={(e) => setSize(e.target.value)}
          ></input>
        </div>
        <div className="create-inputs">
          <label className="label">Colors: </label>
          <input
            type="text"
            placeholder="Colors"
            required
            onChange={(e) => setColors(e.target.value)}
          ></input>
        </div>
        <div className="create-inputs">
          <label className="label">Category: </label>
          <input
            type="text"
            placeholder="Product Category.."
            required
            onChange={(e) => setCategory(e.target.value)}
          ></input>
        </div>
        <div className="create-inputs">
          <label className="label">Brand: </label>
          <input
            type="text"
            placeholder="Product Brand.."
            required
            onChange={(e) => setBrand(e.target.value)}
          ></input>
        </div>
        <div className="create-inputs">
          <label className="label">Rating: </label>
          <input
            type="number"
            placeholder="Product rating.."
            required
            max="5"
            min="1"
            onChange={(e) => setRating(e.target.value)}
          ></input>
        </div>
        <div className="create-inputs">
          <label className="label">Stock: </label>
          <input
            type="number"
            placeholder="Product stock.."
            required
            onChange={(e) => setStock(e.target.value)}
          ></input>
        </div>
        <div className="create-inputs">
          <label className="label">Feature: </label>
          <select onChange={(e) => setFeature(e.target.value)}>
            <option value="top">Top</option>
            <option value="newarrival">NewArrival</option>
            <option value="trending">Trending</option>
          </select>
        </div>
        <div className="create-inputs">
          <div>
            <label className="label">Description: </label>
          </div>
          <textarea
            cols="40"
            rows="10"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <div className="img-inputs">
          <div className="cre-img">
            <input
              type="file"
              multiple
              onChange={(e) => setimg(e)}
              name="0"
            ></input>
            <img src={img[0] && img[0]} alt=""></img>
          </div>
          <div className="cre-img">
            <input
              type="file"
              onChange={(e) => setimg(e)}
              name="1"
              multiple
            ></input>
            <img src={img[1] && img[1]} alt=""></img>
          </div>
          <div className="cre-img">
            <input
              type="file"
              onChange={(e) => setimg(e)}
              name="2"
              multiple
            ></input>
            <img src={img[2] && img[2]} alt=""></img>
          </div>
          <div className="cre-img">
            <input
              type="file"
              onChange={(e) => setimg(e)}
              name="3"
              multiple
            ></input>
            <img src={img[3] && img[3]} alt=""></img>
          </div>
        </div>

        <div className="create-btn">
          <button onClick={(e) => createProduct(e)}>CreateProduct</button>
        </div>
      </div>
      {loading && <div className="ad-loading"></div>}
    </div>
  );
};

export default CreateProduct;
