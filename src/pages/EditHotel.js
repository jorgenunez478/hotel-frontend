import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import HotelForm from '../components/HotelForm';

const EditHotel = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      const response = await api.get(`/hotels/${id}`);
      setHotel(response.data);
    };

    fetchHotel();
  }, [id]);

  return (
    <div>
      <h1>Editar Hotel</h1>
      {hotel ? <HotelForm hotel={hotel} /> : <p>Cargando...</p>}
    </div>
  );
};

export default EditHotel;