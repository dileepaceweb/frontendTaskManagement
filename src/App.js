import  React, { useState, useEffect } from "react";
  import axios from "axios";
  import "./App.css"; 
  
  function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
      name: "",
      vendor: "",
      price: "",
      quantity: "",
    });
    const [editTask, setEditTask] = useState({
      name: "",
      vendor: "",
      price: "",
      quantity: "",
    });
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    console.log("Number of tasks:", tasks.length);

 
    useEffect(() => {
      fetchTasks();
    }, []);
  
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/fetched");
        if (Array.isArray(response.data.fetchedData)) {
          setTasks(response.data.fetchedData);
          setFilteredTasks(response.data.fetchedData);
        } else {
          console.error("Invalid response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditTask((prevTask) => ({
        ...prevTask,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:4000/create", newTask);
        setNewTask({ name: "", vendor: "", price: "", quantity: "" });
        fetchTasks();
      } catch (error) {
        console.error("Error adding Data:", error);
      }
    };
  
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:4000/delete/${id}`);
        fetchTasks();
      } catch (error) {
        console.error("Error deleting Data:", error);
      }
    };
  
    const handleUpdate = async (id) => {
      try {
        await axios.put(`http://localhost:4000/update/${id}`, editTask);
        setEditingTaskId(null);
        fetchTasks();
      } catch (error) {
        console.error("Error updating Data:", error);
      }
    };
  
    const handleEditClick = (task) => {
      setEditingTaskId(task._id);
      setEditTask({ name: task.name, vendor: task.vendor, price: task.price, quantity: task.quantity });
    };
  
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Task Management</h1>
  
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name "
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            required
          />
          <br />
          <input
            type="text"
            name="vendor"
            placeholder="Enter Vendor"
            value={newTask.vendor}
            onChange={(e) => setNewTask({ ...newTask, vendor: e.target.value })}
            required
          />
          <br />
          
          <input
            type="text"
            name="price"
            placeholder=" Enter Price"
            value={newTask.price}
            onChange={(e) => setNewTask({ ...newTask, price: e.target.value })}
            required
          />
          <br />
          <input
            type="text"
            name="quantity"
            placeholder=" Enter quantity "
            value={newTask.quantity}
            onChange={(e) => setNewTask({ ...newTask, quantity: e.target.value })}
            required
          />
          <br />
          <button type="submit" className="action-btn add-btn">Add Task</button>
        </form>
  
        <table className="task-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Vendor</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
  
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task._id}>
                <td>
                  {editingTaskId === task._id ? (
                    <input
                      type="text"
                      name="name"
                      value={editTask.name}
                      onChange={handleChange}
                    />
                  ) : (
                    task.name
                  )}
                </td>
                <td>
                  {editingTaskId === task._id ? (
                    <input
                      type="text"
                      name="vendor"
                      value={editTask.vendor}
                      onChange={handleChange}
                    />
                  ) : (
                    task.vendor
                  )}
                </td>
                <td>
                  {editingTaskId === task._id ? (
                    <input
                      type="text"
                      name="price"
                      value={editTask.price}
                      onChange={handleChange}
                    />
                  ) : (
                    task.price
                  )}
                </td>
                <td>
                  {editingTaskId === task._id ? (
                    <input
                      type="text"
                      name="quantity"
                      value={editTask.quantity}
                      onChange={handleChange}
                    />
                  ) : (
                    task.quantity
                  )}
                </td>
                <td>
                  {editingTaskId === task._id ? (
                    <button className="action-btn save-btn" onClick={() => handleUpdate(task._id)}>Save</button>
                  ) : (
                    <button className="action-btn edit-btn" onClick={() => handleEditClick(task)}>Edit</button>
                  )}
                  <button className="action-btn delete-btn" onClick={() => handleDelete(task._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default App;
  


