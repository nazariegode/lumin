import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../../context/context";

export const MessageList = ({ messages, senderImage, receiverImage }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll al último mensaje cuando cambien los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { userInfo } = useContext(AppContext);

  return (
    <div
      className="flex-1 overflow-y-auto p-2 space-y-2"
      style={{ maxHeight: "calc(100vh - 150px)" }}
    >
      {messages &&
        messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start ${
              message.senderId === `${userInfo.id}` ? "flex-row-reverse" : ""
            }`}
          >
            {/* Foto del usuario */}
            <img
              src={
                message.senderId === `${userInfo.id}`
                  ? senderImage
                  : receiverImage
              }
              alt="User Avatar"
              className="w-10 h-10 rounded-lg object-cover mx-2"
            />

            {/* Mensaje */}
            <div
              className={`max-w-xs p-3 rounded-lg shadow-md flex ${
                message.senderId !== `${userInfo.id}`
                  ? "bg-violet-200 text-gray-800"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-[9px] text-gray-500 mt-1 block pl-3">
                {new Date(message.updatedAt).toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
      {/* Este div mantiene el scroll en el último mensaje */}
      <div ref={messagesEndRef} />
    </div>
  );
};
