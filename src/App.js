import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import { NotificationManager } from "react-notifications";
import { useEffect, useState } from "react";

import SingleCard from "./SingleCard";
import { PlusOutlined } from "@ant-design/icons";

const baseURL = "http://localhost:5000";

function App() {
  const [users, setUsers] = useState([]);
  const [entry, setEntry] = useState({
    name: "",
    description: "",
  });

  const fetchUsers = () => {
    axios.get(`${baseURL}/`).then((response) => {
      // console.log(response.data.users);

      setUsers(response.data.users);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, [users]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEntry((prevEntry) => {
      return {
        ...prevEntry,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const addData = axios.post(`${baseURL}/`, entry).then((response) => {
      // alert(response.data.message);
      NotificationManager.success(response.data.message, "Success!", 2000);
    });

    setEntry({
      name: "",
      description: "",
    });
  };

  const handleEdit = (id, editEntryData) => {
    console.log(id, editEntryData);

    axios
      .patch(`${baseURL}/${id}`, editEntryData)
      .then((response) => {
        NotificationManager.success(response.data.message, "Success!", 2000);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`${baseURL}/${id}`).then((response) => {
      NotificationManager.warning(response.data.message, "Deleted!", 2000);
    });

    console.log("delete");
  };

  return (
    <div className="App">
      <h1>Sharing Thoughts made Easier....</h1>

      <div className="form-content">
        <input
          onChange={(e) => handleChange(e)}
          placeholder="Title"
          type="text"
          value={entry.name}
          name="name"
        ></input>
        <textarea
          onChange={(e) => handleChange(e)}
          placeholder="Description . . ."
          type="textarea"
          value={entry.description}
          name="description"
        ></textarea>
        <button className="add-post" onClick={(e) => handleSubmit(e)}>
          <PlusOutlined style={{ fontSize: "20px" }} />
        </button>
      </div>

      <div className="entries-content">
        {users.map((userItem) => {
          return (
            <SingleCard
              key={userItem._id}
              userItem={userItem}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
      <NotificationContainer />
    </div>
  );
}

export default App;
