import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await api.get('/hotels');
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Hoteles</h1>
      <Link to="/add-hotel" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Agregar Hotel</Link>
      {loading ? (
        <p className="mt-4">Cargando listado de hoteles...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Nombre</th>
                <th className="px-4 py-2 border-b">Ciudad</th>
                <th className="px-4 py-2 border-b">Dirección</th>
                <th className="px-4 py-2 border-b">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel) => (
                <tr key={hotel.id}>
                  <td className="px-4 py-2 border-b">{hotel.name}</td>
                  <td className="px-4 py-2 border-b">{hotel.city}</td>
                  <td className="px-4 py-2 border-b">{hotel.address}</td>
                  <td className="px-4 py-2 border-b text-center">
                    <Link to={`/edit-hotel/${hotel.id}`} className="text-blue-500">
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HotelList;