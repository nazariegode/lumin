import React from "react";
import { motion, AnimatePresence } from "framer-motion"; // Importar AnimatePresence y motion

export const ChatModal = ({ isOpen, onClose, onAction, conversationId }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }} // Comienza con opacidad 0
          animate={{ opacity: 1 }}  // Transición a opacidad 1
          exit={{ opacity: 0 }}     // Desaparece con opacidad 0
          transition={{ duration: 0.3 }} // Duración de la animación
        >
          <motion.div
            className="bg-violet-500 rounded-2xl pt-3"
            initial={{ scale: 0.8 }} // Comienza más pequeño
            animate={{ scale: 1 }}   // Escala a su tamaño normal
            exit={{ scale: 0.8 }}    // Se reduce al salir
            transition={{ duration: 0.3 }} // Duración de la animación
          >
            <div className="bg-violet-500 rounded-2xl">
              <div className="bg-violet-500 bg-white rounded-2xl w-72 shadow-lg">
                <h3 className="text-lg font-bold text-white m-5">Options</h3>
                <ul className="bg-white text-gray-900 rounded-2xl p-4 space-y-2">
                  <li>
                    <button
                      onClick={() => onAction("silent", conversationId)}
                      className="w-full text-left text-violet-900 hover:text-violet-700"
                    >
                      Silent Chat
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onAction("info", conversationId)}
                      className="w-full text-left text-violet-900 hover:text-violet-700"
                    >
                      Contact Info
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onAction("bloquear", conversationId)}
                      className="w-full text-left text-violet-900 hover:text-violet-700"
                    >
                      Blocked Chat
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onAction("favorito", conversationId)}
                      className="w-full text-left text-violet-900 hover:text-violet-700"
                    >
                      Add to Favorites
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onAction("eliminar", conversationId)}
                      className="w-full text-left text-red-500 hover:text-red-700"
                    >
                      Delete Chat
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={onClose}
                      className="mt-4 text-sm text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
