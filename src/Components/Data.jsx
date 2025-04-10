import React, { useEffect, useState } from "react";
import { getData, postApi } from "../AxiosApi/Axios";
import { Card, CardBody } from "@heroui/react";
import { Button } from "@heroui/react";
import { Input } from "@heroui/react";
import { deletePost } from "../AxiosApi/Axios";
import { updateApi } from "../AxiosApi/Axios";
import { useNavigate } from "react-router-dom";
function Data() {
  const token = JSON.parse(localStorage.getItem("access_token"));
  const navigate = useNavigate();
  if (!token) {
    navigate("/")
  } 
  const [items, setItems] = useState([]);
  const [newData, setNewData] = useState({
    title: "",
    description: "",
  });
  const [updateData, setUpdateData] = useState({});
  const getApiData = async () => {
    const res = await getData();
    console.log(res.data.products);
    setItems(res.data.products);
  };
  useEffect(() => {
    updateData &&
      setNewData({
        title: updateData.title || "",
        description: updateData.description || "",
      });
  }, [updateData]);
  const handleUpdate = (curr) => {
    setUpdateData(curr);
  };
  const EditData = async () => {
    try {
      const res = await updateApi(updateData.id, newData);
      console.log(res);
      if (res.status === 200) {
        setItems((d) => {
          return d.map((curr) => {
            return curr.id === res.data.id ? res.data : curr;
          });
        });
        setNewData({ title: "", body: "" });
        setUpdateData({});
      }
    } catch ({ error }) {
      console.log(error);
    }
  };
  const addData = async (e) => {
    const res = await postApi(newData);
    if (res.status === 201) {
      setItems([...items, res.data]);
      setNewData({ title: "", description: "" });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    console.log(action);
    if (action === "Add") {
      addData();
    } else {
      EditData();
    }
  };
  let isEmpty = Object.keys(updateData).length === 0;

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewData((n) => {
      return {
        ...n,
        [name]: value,
      };
    });
  };
  const handleDelete = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newUpdatedData = items.filter((curr) => {
          return curr.id !== id;
        });
        setItems(newUpdatedData);
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  if (token) {
    useEffect(() => {
      getApiData();
    }, []);
  }

  return (
    <div className="bg-sky-400">
      <div className="absolute ml-[90%] mt-[5px]">
        <Button color="danger" variant="shadow" onPress={handleLogOut}>
          Log Out
        </Button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inline-flex ml-[500px] pt-[80px]">
          <Input
            className="w-[350px] mr-4"
            label="Title"
            type="text"
            value={newData.title}
            name="title"
            id="title"
            onChange={handleInputChange}
            isRequired
          />
          <Input
            className="w-[350px] mr-4"
            label="Description"
            type="text"
            id="description"
            name="description"
            value={newData.description}
            onChange={handleInputChange}
            isRequired
          />
          <Button
            className="h-[4em] "
            color="primary"
            variant="shadow"
            value={isEmpty ? "Add" : "Edit"}
            type="submit"
          >
            {isEmpty ? "Add" : "Edit"}
          </Button>
        </div>
      </form>
      <div className="grid grid-cols-3 pt-[80px] pl-[100px]">
        {items.map((curr) => {
          const { id, title, description, images, price } = curr;
          return (
            <div>
              <Card className="w-[500px] h-[400px] mb-4">
                <CardBody>
                  <ol>
                    <li key={id}>
                      <p>Id : {id}</p>
                      <p>Title : {title}</p>
                      <img src={images} alt="Pic" width={150} />
                      <p>Price : ${price}</p>
                      <p>Description :{description}</p>
                      <div className="mt-3">
                        <Button
                          color="success"
                          variant="shadow"
                          className="mr-4"
                          onPress={() => handleUpdate(curr)}
                        >
                          Edit
                        </Button>
                        <Button
                          color="warning"
                          variant="shadow"
                          onPress={() => handleDelete(id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </li>
                  </ol>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Data;
