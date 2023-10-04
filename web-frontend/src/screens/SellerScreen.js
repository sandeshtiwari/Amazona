import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { getError } from '../utils';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, sellerInfo: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const SellerScreen = () => {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const seller = sp.get('seller_id');

  const [{ loading, error, sellerInfo }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/users/sellerinfo/${seller}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
        toast.error('Failed to get seller informaiton.');
      }
    };
    fetchData();
  }, [seller]);
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Row>
                <img src={sellerInfo.logo} alt={sellerInfo.seller.name} />
              </Row>
              <Row>
                <h1>{sellerInfo.seller.name}</h1>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Row className="flex md:flex-row justify-between">
            {sellerInfo.products.map((product) => (
              <Col key={product.slug} className="mb-72">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SellerScreen;
