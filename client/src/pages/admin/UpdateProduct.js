import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { loadsingleProduct } from '../../redux/actions/productaction';

const UpdateProduct = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const dispatch = useDispatch();
  const sing = useSelector((state) => state.singleprod);
  const { loading, single } = sing;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [stock, setStock] = useState('');
  const [feature, setFeature] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [rating, setRating] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [img, setImg] = useState('');
  const [disc, setDisc] = useState('');
  useEffect(() => {
    const load = async () => {
      dispatch(loadsingleProduct(id));
    };
    load();

    // setSingle(sing && sing)
  }, [location, id]);

  const navigate = useNavigate();
  useEffect(() => {
    const sets = async () => {
      setName(!loading && single.name);
      setPrice(!loading && single.price);
      setBrand(!loading && single.brand);
      setCategory(!loading && single.category);
      setFeature(!loading && single.feature);
      setStock(!loading && single.stock);
      setDesc(!loading && single.desc);
      setDisc(!loading && single.disc);
      setSize(!loading && single.size);
      setColor(!loading && single.color);
      setRating(!loading && single.rating);
      setImg(!loading && single.img);
    };
    sets();
  }, [id, location, sing]);

  const updateProduct = async () => {
    try {
      const { data } = await axios.put(
        `https://mern-helmart-website.vercel.app/api/v1/update/${id}`,
        {
          name,
          price,
          desc,
          disc,
          color,
          size,
          stock,
          category,
          img,
          brand,
          feature,
        }
      );
      if (data) {
        toast.success('Product Updated');
        setName('');
        setPrice('');
        setDesc('');
        setBrand('');
        setCategory('');
        setRating('');
        setStock('');
        setFeature('');
        setImg([]);
        navigate('/adminpanel');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const setimg = (e) => {
    e.preventDefault();
    const position = e.target.name;
    const files = e.target.files[0];
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
    <div className="create-container">
      <Link to="/adminpanel">Go Back</Link>
      {loading == false && (
        <div className="create-form">
          <div className="ad-up-img">
            {single &&
              single.img.map((ele) => {
                return <img src={ele.url} alt="img"></img>;
              })}
          </div>
          <div className="create-inputs">
            <label>Name: </label>
            <input
              type="text"
              placeholder="Product Name.."
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
          </div>
          <div className="create-inputs">
            <label>Price: </label>
            <input
              type="number"
              placeholder="Price"
              required
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            ></input>
          </div>
          <div className="create-inputs">
            <label>Discount: </label>
            <input
              type="number"
              placeholder="Product Category.."
              required
              onChange={(e) => setDisc(e.target.value)}
              value={disc}
            ></input>
          </div>
          <div className="create-inputs">
            <label>Size: </label>
            <input
              type="text"
              placeholder="Product Category.."
              required
              onChange={(e) => setSize(e.target.value)}
              value={size}
            ></input>
          </div>
          <div className="create-inputs">
            <label>Color: </label>
            <input
              type="text"
              placeholder="Product Category.."
              required
              onChange={(e) => setColor(e.target.value)}
              value={color}
            ></input>
          </div>
          <div className="create-inputs">
            <label>Category: </label>
            <input
              type="text"
              placeholder="Product Category.."
              required
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            ></input>
          </div>
          <div className="create-inputs">
            <label>Brand: </label>
            <input
              type="text"
              placeholder="Product Brand.."
              required
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
            ></input>
          </div>
          <div className="create-inputs">
            <label>Rating: </label>
            <input
              type="number"
              placeholder="Product rating.."
              required
              onChange={(e) => setRating(e.target.value)}
              value={rating}
            ></input>
          </div>
          <div className="create-inputs">
            <label>Stock: </label>
            <input
              type="number"
              placeholder="Product stock.."
              required
              onChange={(e) => setStock(e.target.value)}
              value={stock}
            ></input>
          </div>
          <div className="create-inputs">
            <label>Feature: </label>
            <select
              onChange={(e) => setFeature(e.target.value)}
              value={feature}
            >
              <option value="top">Top</option>
              <option value="newarrival">NewArrival</option>
              <option value="trending">Trending</option>
            </select>
          </div>
          <div className="create-inputs">
            <label>Description: </label>
            <textarea
              cols="40"
              rows="10"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            ></textarea>
          </div>
          {/* <div className='cre-img'>
                    <input type='file' onChange={(e)=>setimg(e)} name="0"></input>
                    <img src={img[0] && img[0]} alt=''></img>
                    
            </div>
            <div className='cre-img'>
                    <input type='file' onChange={(e)=>setimg(e)} name="1"></input>
                    <img src={img[1]&&img[1]} alt=''></img>
            </div>
            <div className='cre-img'>
                    <input type='file' onChange={(e)=>setimg(e)} name="2" ></input>
                    <img src={img[2]&& img[2]} alt=''></img>
            </div>
            <div className='cre-img'>
                    <input type='file' onChange={(e)=>setimg(e)} name="3"></input>
                    <img src={img[3]&&img[3]} alt=''></img>
            </div>
            
         */}
          <div className="create-btn">
            <button onClick={updateProduct}>Update Product</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
