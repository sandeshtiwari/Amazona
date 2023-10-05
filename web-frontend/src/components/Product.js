import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { Store } from '../Store';
import Button from '../UI/Button';

const Product = (props) => {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  return (
    <>
      <div className="border-1 border-gray-700 rounded-md md:w-64 md:h-96 overflow-visible">
        <Link
          to={`/product/${product.slug}`}
          className="h-full w-full flex-3 transition duration-200 hover:opacity-80"
        >
          <img
            src={product.image}
            className="card-img-top object-cover w-full h-full p-0.5"
            alt={product.name}
          />
        </Link>
        <div className="mt-5 flex flex-col justify-between flex-1">
          <Link to={`/product/${product.slug}`}>
            <h2 className="text-2xl overflow-hidden max-w-20 truncate">
              {product.name}
            </h2>
          </Link>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          <h2 className="text-lg">${product.price}</h2>
          <Link
            to={`/seller?seller_id=${product.seller._id}`}
            className="text-gray-500"
          >
            {product.seller.name}
          </Link>
          {product.countInStock === 0 ? (
            <Button type="secondary" disabled={true}>
              Out of Stock
            </Button>
          ) : (
            <Button onClick={() => addToCartHandler(product)}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
