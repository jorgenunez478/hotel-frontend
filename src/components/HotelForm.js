import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import RoomForm from './RoomForm';

const HotelForm = ({ hotel }) => {
  const [formData, setFormData] = useState(hotel || {
    name: '',
    tax_id: '',
    city: '',
    address: '',
    nit: '',
    max_rooms: '',
    rooms: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hotel) {
      await api.put(`/hotels/${hotel.id}`, formData);
    } else {
      await api.post('/hotels', formData);
    }
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Nombre del hotel" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tax ID</label>
          <input type="text" name="tax_id" value={formData.tax_id} onChange={handleChange} required placeholder="Tax ID del hotel" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ciudad</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="Ciudad del hotel" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Dirección</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="Dirección del hotel" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">NIT</label>
          <input type="text" name="nit" value={formData.nit} onChange={handleChange} required placeholder="NIT del hotel" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Máximo de Habitaciones</label>
          <input type="number" name="max_rooms" value={formData.max_rooms} onChange={handleChange} required placeholder="Número máximo de habitaciones" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <RoomForm rooms={formData.rooms} setRooms={(rooms) => setFormData({ ...formData, rooms })} maxRooms={formData.max_rooms} />
        {formData.rooms.length === 0 && (
          <p className="text-red-500 text-sm">Debe agregar al menos una habitación antes de guardar.</p>
        )}
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={formData.rooms.length === 0}>Guardar</button>
          <button type="button" onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default HotelForm;