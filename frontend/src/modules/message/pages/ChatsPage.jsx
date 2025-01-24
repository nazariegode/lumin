import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { GroupBar } from "../components/GroupBar"; // Importar el componente de filtros
import { Navbar } from "../components/Navbar"; // Importar el componente de filtros
import axios from "axios";

export const ChatsPage = () => {
  // Definir el estado para la búsqueda
  const [searchQuery, setSearchQuery] = useState(""); // Agregar el estado para la búsqueda
  const [filter, setFilter] = useState("todos");

  //! TODO: este estado gestiona los contactos, podria ser un estado global
  const [conversations, setConversations] = useState([])
  useEffect(() =>{
    //! llamamos a los contactos del usuario
    const conversations = async () => {
      let token = localStorage.getItem("token")
      const res = await axios.get(`http://localhost:3001/api/conversations/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setConversations(res.data.conversations)
    };
    conversations()
  },[])

  // Conversaciones de ejemplo
  // const conversations = [
  //   {
  //     id: "1",
  //     name: "Juan Miranda",
  //     lastMessage: "Hola, ¿cómo estás?",
  //     timestamp: "14:35",
  //     unreadCount: 2,
  //     isFavorite: false,
  //     isGroup: false,
  //     profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
  //   },
  //   {
  //     id: "2",
  //     name: "Equipo Trabajo",
  //     lastMessage: "Revisemos el documento.",
  //     timestamp: "13:20",
  //     unreadCount: 0,
  //     isFavorite: false,
  //     isGroup: true,
  //     profileImage: "https://randomuser.me/api/portraits/lego/2.jpg",
  //   },
  //   {
  //     id: "3",
  //     name: "María Lucas",
  //     lastMessage: "Gracias por la ayuda!",
  //     timestamp: "10:15",
  //     unreadCount: 5,
  //     isFavorite: true,
  //     isGroup: false,
  //     profileImage: "https://randomuser.me/api/portraits/women/3.jpg",
  //   },
  //   {
  //     id: "4",
  //     name: "Fernando León",
  //     lastMessage: "¿Te llamo más tarde?",
  //     timestamp: "08:50",
  //     unreadCount: 0,
  //     isFavorite: false,
  //     isGroup: false,
  //     profileImage: "https://randomuser.me/api/portraits/men/4.jpg",
  //   },
  // ];

  // Filtrar las conversaciones según el filtro seleccionado
  const filteredConversations = conversations?.filter((conversation) => {
    switch (filter) {
      case "noLeidos":
        return conversation.unreadCount > 0;
      case "favoritos":
        return conversation.isFavorite;
      case "grupos":
        return conversation.isGroup;
      default:
        return true; // Todos
    }
  }).filter((conversation) =>
    conversation.Users.some((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  

  //! TODO: manejador de agregar contacto se debe enviar el email del usuario a agregar. esta peticion deberia actualizar la informacion de los contactos y renderizar el nuevo contacto
  const handleAddContact = async ( ) => {
    try {
      let token = localStorage.getItem("token")
      let email = "test@gmail.com"
  
      const res = await axios.post(`http://localhost:3001/api/contacts/`, { email }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
    } catch (error) {
      console.log({error: error.response.data.error})
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Chats</h2>

      {/* //! TODO: Arreglar boton para agregar contactos deberia abrirse un modal que muestre los contactos y un boton de agregar nuevo, ahi colocariamos el mail del usuario a agregar y al confirmar deberia lanzarse handleAddContact*/}
      <button className="bg-cyan-600" onClick={handleAddContact}>AGREGAR(+)</button>

      {/* Barra de búsqueda */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Barra de filtros */}
      <GroupBar onFilterChange={setFilter} />

      {/* Lista de conversaciones */}
      <ul className="space-y-2">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <li key={conversation.id} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
              {/* Imagen de perfil */}
              <img
                src={conversation.profileImage}
                alt={conversation.name}
                className="w-10 h-10 rounded-full"
              />

              {/* Información del chat */}
              <div className="flex-grow">
                <Link
                  to={`/chats/${conversation.name}`}
                  className="flex justify-between text-blue-600 hover:underline"
                >
                  <span className="font-semibold">{conversation.Users[0].username}</span>
                  <span className="text-gray-500 text-sm">
                    {conversation.timestamp}
                  </span>
                </Link>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-sm truncate">
                    {conversation.lastMessage}
                  </p>
                  {conversation.unreadCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              </div>

              {/* Ícono de eliminar */}
              <button
                onClick={() => {
                  console.log(`Eliminar conversación con ID: ${conversation.id}`);
                }}
                className="text-red-500 hover:text-red-700"
                title="Eliminar conversación"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No se encontraron conversaciones.</li>
        )}
      </ul>
      <Navbar/>
    </div>
  );
};




