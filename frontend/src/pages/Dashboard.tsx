import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { addDoc, collection, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";

interface Personnel {
  id: string;
  name: string;
  rank: string;
  status: string;
  age: string; // Changed to string for input
  phone: string;
  address: string;
  email: string;
  purpose: string;
  serialNumber: string;
  date: string;
}

const Dashboard: React.FC = () => {
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [newPerson, setNewPerson] = useState<Omit<Personnel, "id">>({
    name: "",
    rank: "",
    status: "",
    age: "",
    phone: "",
    address: "",
    email: "",
    purpose: "",
    serialNumber: "",
    date: "",
  });
  const [editPerson, setEditPerson] = useState<Personnel | null>(null);

  // Fetch personnel data from Firestore
  useEffect(() => {
    const fetchPersonnel = async () => {
      const querySnapshot = await getDocs(collection(db, "personnel"));
      const data: Personnel[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Personnel);
      });
      setPersonnel(data);
    };

    fetchPersonnel();
  }, []);

  // Handle the form submission to add or update personnel
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editPerson) {
      const docRef = doc(db, "personnel", editPerson.id);
      await updateDoc(docRef, newPerson);
      setPersonnel(
        personnel.map((person) =>
          person.id === editPerson.id ? { id: person.id, ...newPerson } : person
        )
      );
      setEditPerson(null);
    } else {
      const personnelCollection = collection(db, "personnel");
      const docRef = await addDoc(personnelCollection, newPerson);
      setPersonnel([...personnel, { id: docRef.id, ...newPerson } as Personnel]);
    }
    setNewPerson({
      name: "",
      rank: "",
      status: "",
      age: "",
      phone: "",
      address: "",
      email: "",
      purpose: "",
      serialNumber: "",
      date: "",
    });
  };

  const handleEdit = (person: Personnel) => {
    setEditPerson(person);
    setNewPerson({
      name: person.name,
      rank: person.rank,
      status: person.status,
      age: person.age,
      phone: person.phone,
      address: person.address,
      email: person.email,
      purpose: person.purpose,
      serialNumber: person.serialNumber,
      date: person.date,
    });
  };

  const handleDelete = async (id: string) => {
    const docRef = doc(db, "personnel", id);
    await deleteDoc(docRef);
    setPersonnel(personnel.filter((person) => person.id !== id));
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Personnel Dashboard
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          {editPerson ? "Update Personnel" : "Add New Personnel"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">Name</label>
            <input
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              value={newPerson.name}
              onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value.toUpperCase() })}
            />
          </div>
          <div>
            <label className="block text-gray-600">Rank</label>
            <input
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              value={newPerson.rank}
              onChange={(e) => setNewPerson({ ...newPerson, rank: e.target.value.toUpperCase() })}
            />
          </div>
          <div>
            <label className="block text-gray-600">Status</label>
            <input
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              value={newPerson.status}
              onChange={(e) => setNewPerson({ ...newPerson, status: e.target.value.toUpperCase() })}
            />
          </div>
          <div>
            <label className="block text-gray-600">Age</label>
            <input
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              value={newPerson.age}
              onChange={(e) => setNewPerson({ ...newPerson, age: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-600">Phone</label>
            <input
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              value={newPerson.phone}
              onChange={(e) => setNewPerson({ ...newPerson, phone: e.target.value.toUpperCase() })}
            />
          </div>
          <div>
            <label className="block text-gray-600">Address</label>
            <input
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              value={newPerson.address}
              onChange={(e) => setNewPerson({ ...newPerson, address: e.target.value.toUpperCase() })}
            />
          </div>
          <div>
            <label className="block text-gray-600">Email Address</label>
            <input
              type="email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              value={newPerson.email}
              onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value.toUpperCase() })}
            />
          </div>
          <div>
            <label className="block text-gray-600">Purpose</label>
            <select
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              value={newPerson.purpose}
              onChange={(e) => setNewPerson({ ...newPerson, purpose: e.target.value.toUpperCase() })}
            >
              <option value="Re-Enlistment">Re-Enlistment</option>
              <option value="Promotion">Promotion</option>
              <option value="Schooling">Schooling</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600">Serial Number</label>
            <input
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              value={newPerson.serialNumber}
              onChange={(e) => setNewPerson({ ...newPerson, serialNumber: e.target.value.toUpperCase() })}
            />
          </div>
          <div>
            <label className="block text-gray-600">Date</label>
            <input
              type="datetime-local"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              value={newPerson.date}
              onChange={(e) => setNewPerson({ ...newPerson, date: e.target.value })}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          {editPerson ? "Update Personnel" : "Add Personnel"}
        </button>
      </form>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Personnel List</h2>
      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-left text-sm text-gray-700">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Rank</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Age</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">Email Address</th>
              <th className="px-6 py-3">Purpose</th>
              <th className="px-6 py-3">Serial Number</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {personnel.map((person) => (
              <tr key={person.id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4">{person.name}</td>
                <td className="px-6 py-4">{person.rank}</td>
                <td className="px-6 py-4">{person.status}</td>
                <td className="px-6 py-4">{person.age}</td>
                <td className="px-6 py-4">{person.phone}</td>
                <td className="px-6 py-4">{person.address}</td>
                <td className="px-6 py-4">{person.email}</td>
                <td className="px-6 py-4">{person.purpose}</td>
                <td className="px-6 py-4">{person.serialNumber}</td>
                <td className="px-6 py-4">{person.date}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => handleEdit(person)}
                    className="px-4 py-2 text-sm text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(person.id)}
                    className="px-4 py-2 text-sm text-red-500 border border-red-500 rounded-lg hover:bg-red-100"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
