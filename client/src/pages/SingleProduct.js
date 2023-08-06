import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './css/single.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  loadrelatedProduct,
  loadsingleProduct,
} from '../redux/actions/productaction';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { AiFillStar, AiFillBackward } from 'react-icons/ai';
import ReactStars from 'react-rating-stars-component';
import Card from '../components/card/Card';
import { Link } from 'react-router-dom';
import { addtocart, removeFromcart } from '../redux/actions/cartActions';
import Footer from '../components/footer/Footer';
import axios from 'axios';
import toast from 'react-hot-toast';

const SingleProduct = () => {
  const [showatcb, setShowatcb] = useState(true);
  const [star, setStar] = useState(0);
  const [revmes, setRevmes] = useState('');
  //getting the number of star
  const ratingChanged = (newRating) => {
    setStar(newRating);
  };
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const sing1 = useSelector((state) => state.singleprod);
  const relat = useSelector((state) => state.related);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const scrolltotop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    dispatch(loadsingleProduct(id));
  }, [dispatch, id, loading]);

  useEffect(() => {
    dispatch(loadrelatedProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [id]);

  const addToCart = (id) => {
    dispatch(addtocart(id));
  };
  const removeFromCart = (id) => {
    dispatch(removeFromcart(id));
  };

  const { single } = sing1;
  const { related } = relat;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checking = () => {
    const found = cart.cart.find((x) => x.id === single._id);
    found ? setShowatcb(false) : setShowatcb(true);
  };

  //for submitting review
  const submitRev = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/review/${id}`,
        {
          star,
          text: revmes,
        },
        { withCredentials: true }
      );
      if (data) {
        setLoading(false);
        toast.success(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    single && cart.cart.length >= 0 && checking();
  }, [cart, sing1, single, checking]);
  return (
    <>
      <div className="sing-link">
        <Link to="/products" className="link">
          <AiFillBackward />
          Go Back
        </Link>
      </div>
      {single?._id && (
        <>
          <div className="single">
            <div className="container">
              <div className="single-image">
                <Carousel
                  showArrows={true}
                  showThumbs={true}
                  className="crousel"
                >
                  {single.img ? (
                    single.img.map((x, ind) => {
                      return (
                        <div key={ind} className="slide-images">
                          <img src={x.url} alt={ind} />
                        </div>
                      );
                    })
                  ) : (
                    <>
                      <h1>Loading...</h1>
                    </>
                  )}
                </Carousel>
              </div>
              <div className="single-desc">
                <div className="name">
                  <h3>{single.name}</h3>
                </div>
                <div className="price">
                  <h3>Price:</h3>
                  {single.disc > 0 ? (
                    <p className="flex">
                      Rs.
                      <span className="underline">{single.price}</span>
                      <span>
                        {single.price - (single.disc * single.price) / 100}
                      </span>
                    </p>
                  ) : (
                    <p className="flex">
                      Rs.
                      {single.price}
                    </p>
                  )}
                </div>
                <div className="price">
                  <h3>Brand: </h3>
                  <p> {single.brand}</p>
                </div>
                <div className="cat centerv">
                  <h3>Size: </h3>

                  {single.size &&
                    single.size.map((ele) => {
                      return <span>{ele}</span>;
                    })}
                </div>

                <div className="rating centerv">
                  <h3>Rating:</h3>
                  <span className="star">
                    {Array(single.rating)
                      .fill(0)
                      .map((x, i) => {
                        return (
                          <p key={i}>
                            <AiFillStar />
                          </p>
                        );
                      })}
                    <p>
                      ({single.reviews.length > 0 ? single.reviews.length : 0}{' '}
                      reviews)
                    </p>
                  </span>
                </div>
                <div className="cat centerv">
                  <h3>Color: </h3>

                  {single.color &&
                    single.color.map((ele) => {
                      return <span>{ele}</span>;
                    })}
                </div>
                <div className={single.stock >= 1 ? 'inStock' : 'oStock'}>
                  {single.stock >= 1 ? 'In Stock' : 'Out Of Stock'}
                </div>
                <div className="pdes">
                  <h3>Description: </h3>
                  <span>{single.desc}</span>
                </div>
                <div className="deli">
                  <h3>Return Policy :</h3>
                  <span>
                    This product can only be returned within one week from the
                    day of delivery.
                  </span>
                </div>
                {showatcb ? (
                  single.stock > 0 ? (
                    <div className="abtn">
                      <button onClick={() => addToCart(single._id)}>
                        Add To Cart
                      </button>
                    </div>
                  ) : (
                    <div className="abtn">
                      <button>Out Of Stock</button>
                    </div>
                  )
                ) : (
                  <div className="abtn">
                    <button onClick={() => removeFromCart(single._id)}>
                      Remove From Cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* container for related products */}
          <div className="related-prod">
            <h1 className="rel-title">Related Products</h1>
            <div className="rel-card-div">
              {related ? (
                related.map((x) => {
                  return <Card x={x} />;
                })
              ) : (
                <>
                  <h1>"No Products Added"</h1>
                </>
              )}
            </div>
          </div>
          {/* review container */}
          <div className="review-container">
            <h3>Reviews</h3>
            {single.reviews ? (
              single.reviews.map((rev) => {
                return (
                  <div className="review">
                    <div className="rev-img">
                      <img src={rev.img} alt="user"></img>
                    </div>
                    <div className="rev-content">
                      <div className="user">{rev.name}</div>
                      <div className="user">
                        {Array(rev.star)
                          .fill(0)
                          .map((x) => {
                            return (
                              <p className="stars">
                                <AiFillStar />
                              </p>
                            );
                          })}
                      </div>
                      <div className="user">{rev.text}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <h3>No reviews Yet</h3>
              </>
            )}
          </div>

          {/* for adding review */}
          <div className="review-from">
            <h3>Submit Your Own Review</h3>
            <form className="rev-form" onSubmit={submitRev}>
              <div className="star flex-center">
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                />
              </div>

              <textarea
                cols="70"
                rows="5"
                type="text"
                placeholder="Leave Comment For The Product..."
                onChange={(e) => setRevmes(e.target.value)}
              ></textarea>
              <input type="submit"></input>
            </form>
          </div>
          <div className="fix-back"></div>
        </>
      )}
      <Footer />
    </>
  );
};

export default SingleProduct;
