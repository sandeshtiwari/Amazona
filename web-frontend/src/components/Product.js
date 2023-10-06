import React, { useContext } from 'react';
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
      <div className="flex flex-col justify-center items-center w-80 p-2 h-full mt-32 mb-20 md:mb-10 md:mt-24 sm:mt-10 rounded-md bg-yellow-50">
        <Link
          to={`/product/${product.slug}`}
          className="flex justify-center items-center w-full h-96"
        >
          <img
            src={product.image}
            className="p-0.5 w-full h-full rounded-sm"
            alt={product.name}
          />
        </Link>

        <div className="mt-5 flex flex-col justify-around items-center flex-auto w-full space-y-0">
          <Link to={`/product/${product.slug}`}>
            <h2 className="text-2xl overflow-hidden w-72 text-center truncate px-3">
              {product.name}
            </h2>
          </Link>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          <h2 className="text-lg m-0">${product.price}</h2>
          <Link
            to={`/seller?seller_id=${product.seller._id}`}
            className="text-gray-500 m-0"
          >
            {product.seller.name}
          </Link>
          {product.countInStock === 0 ? (
            <Button className="w-1/2 m-0" type="secondary" disabled={true}>
              Out of Stock
            </Button>
          ) : (
            <Button className="w-1/2" onClick={() => addToCartHandler(product)}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
