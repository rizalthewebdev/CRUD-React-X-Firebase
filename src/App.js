import { useState, useEffect, useRef } from 'react'
import { db } from './config/firebaseConfig'
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'

import { HiOutlinePencilAlt, HiTrash } from 'react-icons/hi'
import { RiCloseLine } from 'react-icons/ri'

function App() {
  const [createName, setCreateName] = useState('')
  const [createAge, setCreateAge] = useState(0)
  const [updated, setUpdated] = useState({
    id: '',
    name: '',
    age: 0
  })
  const [destroy, setDestroy] = useState({
    id: '',
    name: '',
    age: 0
  })

  const [popupModal, setPopupModal] = useState(false)
  const [popupDelete, setpopupDelete] = useState(false)

  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")

  const nameInput = useRef()
  const ageInput = useRef()

  // Clear the input after submit 
  const clearInput = () => { 
    nameInput.current.value = ''
    ageInput.current.value = '' 
  }

  // Show Update Popup after click the action button
  const reqUpdate = (id, name, age) => {
    setUpdated({id, name, age})
    setPopupModal((prev) => !prev)
  }

  const reqDelete = (id, name, age) => {
    setDestroy({id, name, age})
    setpopupDelete((prev) => !prev)
  }

  // Update a data
  const updateUser = async () => {
    const userDoc = doc(db, "users", updated.id)
    const newFields = {
      name: updated.name,
      age : updated.age
    }
    await updateDoc(userDoc, newFields)
    setPopupModal(prev => !prev)
    alert('User Updated Successfully')
  }

  // Add data to Firebase
  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      name: createName,
      age: Number(createAge)
    })
    alert('User Created Successfully')
    clearInput()
  }

  // Delete user
  const deleteUser = async () => {
    const userDoc = doc(db, "users", destroy.id)
    await deleteDoc(userDoc)
    setpopupDelete(prev => !prev)
    alert("Deleted Successfully")
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
    <div className={popupModal ? "relative inset-0 h-screen overflow-hidden" : "relative inset-0 h-screen overflow-x-hidden"}>
      <nav className='w-screen p-4 text-center bg-gray-800 text-white shadow-md shadow-gray-500'>
        <p>Simple CRUD with React + Firebase</p>
      </nav>
      <div className="grid md:grid-cols-2 md:grid-row-2 gap-10">
        {/* Create New Data Form */}
        <div className="md:mx-10 xs:mx-5 mt-5">
          <div className="flex flex-col gap-5">
            <h1 className="text-xl font-bold text-center mb-4">Create new Data</h1>
            <input 
              type="text" 
              placeholder="Name . . ." 
              className="input--field" 
              onChange={(e) => {
                setCreateName(e.target.value)
              }}
              ref={nameInput}
            />
            <input 
              type="number" 
              placeholder="Age . . ." 
              className="input--field" 
              onChange={(e) => {
                setCreateAge(e.target.value)
              }}
              ref={ageInput}
            />
            <button 
              type="button"
              className="button--submit" 
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
                  <th className="w-10 table--head">No</th>
                  <th className="w-64 table--head">Name</th>
                  <th className="w-44 table--head">Age</th>
                  <th className="w-32 table--head">Action</th>
                </tr>
              </thead>
              <tbody>
                  {users.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td className="w-10 text-center table--body" >{index +1}</td>
                        <td className="w-64 text-left table--body" >{user.name}</td>
                        <td className="w-44 text-left table--body" >{user.age}</td>
                        <td className="w-44 text-left table--body" >
                          <div className="flex gap-2 justify-center items-center">
                            <button onClick={() => reqUpdate(user.id, user.name, user.age)}>{/*() => updateUser(user.id, user.age) */}
                              <HiOutlinePencilAlt className="action--button" />
                            </button>
                            <button onClick={() => reqDelete(user.id, user.name, user.age)}>
                              <HiTrash className="action--button hover:text-red-600" />
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
      {/* Popup for Update User */}
      { popupModal && (
        <div className="absolute inset-0 bg-black/90">
          <div className="absolute inset-0 bg-gray-100 xs:my-40 sm:mx-8 md:mx-48 lg:mx-96 rounded-lg">
            <div className="flex justify-between items-center bg-gray-800 p-3 md:px-5">
              <h1 className="text-xl font-bold text-white">Update Data</h1>
              <button className='p-2 -mr-2 rounded-lg hover:bg-gray-700' onClick={() => setPopupModal(prev => !prev)}>
                <RiCloseLine fontSize={20} color='white'/>
              </button>
            </div>
            <div className="flex flex-col gap-5 mt-10 mx-4 md:mx-5">
            <input 
              type="text" 
              placeholder="Name . . ." 
              className="input--field" 
              onChange={(e) => {
                setUpdated({...updated, name: e.target.value})
              }}
              value={updated.name}
              ref={nameInput}
            />
            <input 
              type="number" 
              placeholder="Age . . ." 
              className="input--field" 
              onChange={(e) => {
                setUpdated({...updated, age: e.target.value})
              }}
              value={updated.age}
              ref={ageInput}
            />
            <button 
              type="button"
              className="button--submit" 
              onClick={updateUser}
            >
              Update
            </button>
          </div>
          </div>
        </div>
      )}
      {/* Popup for Delete User */}
      {popupDelete && (
        <div className="absolute inset-0 bg-black/90">
          <div className="absolute inset-0 bg-gray-100 xs:my-40 sm:mx-8 md:mx-48 lg:mx-96 rounded-lg">
            <div className="text-xl font-bold text-center text-white p-3 bg-gray-800">Delete This User ?</div>
              <table className="table-fixed border-collapse mx-auto mt-14">
                <thead>
                  <tr>
                    <td className="table--head w-44">Name</td>
                    <td className="table--head w-20">Age</td>
                  </tr>
                </thead>
                <tbody>
                  <tr className='text-center'>
                    <td className='table--body'>{destroy.name}</td>
                    <td className='table--body'>{destroy.age}</td>
                  </tr>
                </tbody>
              </table>
              <div className="p-14 flex justify-center items-center gap-5">
                <button className="button--submit w-24 bg-red-600 hover:bg-red-700" onClick={deleteUser}>Delete</button>
                <button className="button--submit w-24 bg-transparent text-red-500 hover:bg-transparent hover:border-red-500 hover:text-red-500" onClick={() => setpopupDelete(prev => !prev)}>Cancel</button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
