import { useState, useEffect } from 'react'
import { db } from './config/firebaseConfig'
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'

import { HiOutlinePencilAlt, HiTrash } from 'react-icons/hi'

function App() {
  const [newName, setNewName] = useState('')
  const [newAge, setNewAge] = useState(0)

  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")

  // Update a data
  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id)
    const newFields = {age : age + 1}
    await updateDoc(userDoc, newFields)
  }

  // Add data to Firebase
  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      name: newName,
      age: Number(newAge)
    })
  }

  // Delete user
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)
  }

  // Get Data from Firebase
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))
    }
    getUsers()
  }, [usersCollectionRef])

  return (
    <div className="grid md:grid-cols-2 md:grid-row-2 gap-10">
      {/* Create New Data Form */}
      <div className="md:mx-10 xs:mx-5 mt-5">
        <div className="flex flex-col gap-5">
          <h1 className="text-xl font-bold text-center mb-4">Create new Data</h1>
          <input 
            type="text" 
            placeholder="Name . . ." 
            className="outline-none border-2 border-gray-400 p-2 focus:border-gray-800 rounded-md" 
            onChange={(e) => {
              setNewName(e.target.value)
            }} 
          />
          <input 
            type="number" 
            placeholder="Age . . ." 
            className="outline-none border-2 border-gray-400 p-2 focus:border-gray-800 rounded-md" 
            onChange={(e) => {
              setNewAge(e.target.value)
            }} 
          />
          <button 
            type="button"
            className="border w-32 bg-gray-800 rounded-lg p-2 mt-3 text-white hover:bg-gray-900 hover:text-white " 
            onClick={createUser}
          >
            Create
            </button>
        </div>
      </div>
      {/* Table Show Data */}
      <div className="md:mx-10 xs:mx-5 mt-5">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-center mb-8">Show Data</h1>
          <table className="table-fixed border-collapse">
            <thead>
              <tr>
                <th className="w-10 p-2 text-center border bg-gray-800 text-white">No</th>
                <th className="w-64 p-2 text-center border bg-gray-800 text-white">Name</th>
                <th className="w-44 p-2 text-center border bg-gray-800 text-white">Age</th>
                <th className="w-32 p-2 text-center border bg-gray-800 text-white">Action</th>
              </tr>
            </thead>
            <tbody>
                {users.map((user, index) => {
                  return (
                    <tr>
                      <td className="w-10 p-2 text-center border bg-gray-100 border-gray-300">{index +1}</td>
                      <td className="w-64 p-2 text-left border bg-gray-100 border-gray-300">{user.name}</td>
                      <td className="w-44 p-2 text-left border bg-gray-100 border-gray-300">{user.age}</td>
                      <td className="w-44 p-2 text-left border bg-gray-100 border-gray-300">
                        <div className="flex gap-2 justify-center items-center">
                          
                          <button
                            type="button"
                            onClick={() => {
                              updateUser(user.id, user.age)
                            }} >
                            <HiOutlinePencilAlt className="cursor-pointer text-xl" />
                          </button>
                          <button
                            onClick={() => {
                              deleteUser(user.id)
                            }}
                          >
                            <HiTrash className="cursor-pointer text-xl" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
