import React, { useState, useEffect } from 'react';

const RoomForm = ({ rooms, setRooms, maxRooms }) => {
  const [roomData, setRoomData] = useState({
    type: 'Estándar',
    accommodation: 'Sencilla',
    quantity: 1,
  });

  const [accommodationOptions, setAccommodationOptions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    updateAccommodationOptions(roomData.type);
  }, [roomData.type]);

  const updateAccommodationOptions = (type) => {
    let options = [];
    switch (type) {
      case 'Estándar':
        options = ['Sencilla', 'Doble'];
        break;
      case 'Junior':
        options = ['Triple', 'Cuádruple'];
        break;
      case 'Suite':
        options = ['Sencilla', 'Doble', 'Triple'];
        break;
      default:
        options = [];
    }
    setAccommodationOptions(options);
    setRoomData((prevData) => ({
      ...prevData,
      accommodation: options[0],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  const handleAddRoom = () => {
    const totalRooms = rooms.reduce((sum, room) => sum + room.quantity, 0) + roomData.quantity;
    if (totalRooms > maxRooms) {
      alert(`La cantidad total de habitaciones no puede superar el máximo de ${maxRooms} habitaciones.`);
      return;
    }

    const duplicateRoom = rooms.find(
      (room, index) => room.type === roomData.type && room.accommodation === roomData.accommodation && index !== editIndex
    );

    if (duplicateRoom) {
      alert('Ya existe una habitación con este tipo y acomodación.');
      return;
    }

    if (editIndex !== null) {
      const updatedRooms = rooms.map((room, index) => (index === editIndex ? roomData : room));
      setRooms(updatedRooms);
      setEditIndex(null);
    } else {
      setRooms([...rooms, roomData]);
    }

    setRoomData({
      type: 'Estándar',
      accommodation: 'Sencilla',
      quantity: 1,
    });
  };

  const handleEditRoom = (index) => {
    setRoomData(rooms[index]);
    setEditIndex(index);
  };

  const handleDeleteRoom = (index) => {
    const updatedRooms = rooms.filter((_, i) => i !== index);
    setRooms(updatedRooms);
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium">Agregar Habitación</h3>
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700">Tipo</label>
        <select name="type" value={roomData.type} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          <option value="Estándar">Estándar</option>
          <option value="Junior">Junior</option>
          <option value="Suite">Suite</option>
        </select>
      </div>
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700">Acomodación</label>
        <select name="accommodation" value={roomData.accommodation} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          {accommodationOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700">Cantidad</label>
        <input type="number" name="quantity" value={roomData.quantity} onChange={handleChange} min="1" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
      </div>
      <button type="button" onClick={handleAddRoom} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
        {editIndex !== null ? 'Actualizar Habitación' : 'Agregar Habitación'}
      </button>
      {rooms.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Tipo</th>
                <th className="px-4 py-2 border-b">Acomodación</th>
                <th className="px-4 py-2 border-b">Cantidad</th>
                <th className="px-4 py-2 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-b">{room.type}</td>
                  <td className="px-4 py-2 border-b">{room.accommodation}</td>
                  <td className="px-4 py-2 border-b">{room.quantity}</td>
                  <td className="px-4 py-2 border-b text-center">
                    <button type="button" onClick={() => handleEditRoom(index)} className="text-blue-500 mr-2">Editar</button>
                    <button type="button" onClick={() => handleDeleteRoom(index)} className="text-red-500">Eliminar</button>
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

export default RoomForm;