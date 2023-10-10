import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SingleCard = ({ userItem, handleDelete, handleEdit }) => {
  const [editEntry, setEditEntry] = useState({
    name: "",
    description: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [show, setShow] = useState(false);

  const shortDesc = editEntry.description.substring(0, 100);

  useEffect(() => {
    setEditEntry({
      name: userItem.name,
      description: userItem.description,
    });
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEntry((prevEditEntry) => {
      return {
        ...prevEditEntry,
        [name]: value,
      };
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleEdit(userItem._id, editEntry);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div key={userItem._id} className="single-card">
      <h3>{userItem.name}</h3>
      <p>
        {userItem.description.length <= 100
          ? userItem.description
          : show
          ? userItem.description
          : shortDesc}{" "}
        {userItem.description.length > 100 && ( // Show links only when description is longer
          <span className="read" onClick={() => setShow(!show)}>
            {show ? ". . . Read Less" : ". . . Read More"}
          </span>
        )}
      </p>
      <div className="button-group">
        <button onClick={showModal}>
          <EditOutlined
            style={{
              fontSize: "24px",
            }}
          />
        </button>
        <button onClick={() => handleDelete(userItem._id)}>
          <DeleteOutlined
            style={{
              fontSize: "24px",
            }}
          />
        </button>
      </div>

      <Modal
        title="Edit your Post"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        width="1000px"
        okButtonProps={{
          style: {
            backgroundColor: "rgb(73, 53, 121",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
          },
        }}
        okText="Save"
        cancelButtonProps={{
          style: {
            display: "none",
          },
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="title"
          value={editEntry.name}
          onChange={(e) => handleEditChange(e)}
        ></input>
        <textarea
          type="textarea"
          name="description"
          placeholder="description"
          value={editEntry.description}
          onChange={(e) => handleEditChange(e)}
        ></textarea>
      </Modal>
    </div>
  );
};

export default SingleCard;
