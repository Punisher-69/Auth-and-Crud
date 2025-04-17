import React, { useEffect, useState } from "react";
import {
  getProducts,
  postProduct,
  deleteProduct,
  updateProducts,
} from "../AxiosApi/Axios";
import { Card, CardBody, Button, Input, Pagination } from "@heroui/react";

import { useNavigate } from "react-router-dom";

import { displayToast } from "./Toast";
import Modal1 from "./Modal";

function Data() {
  const token = JSON.parse(localStorage.getItem("access_token"));
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  const navigate = useNavigate();
  if (!token) {
    navigate("/");
  }

  const [items, setItems] = useState([]);
  const [newData, setNewData] = useState({
    title: "",
    description: "",
  });
  const [updateData, setUpdateData] = useState({});

  const getApiData = async () => {
    const res = await getProducts();
    setItems(res.data);
  };
  useEffect(() => {
    updateData && setNewData(updateData);
  }, [updateData]);
  const handleUpdate = (curr) => {
    setUpdateData(curr);
  };
  const EditData = async () => {
    try {
      const res = await updateProducts(updateData.id, newData);

      if (res.status === 200) {
        setItems((d) => {
          return d.map((curr) => {
            return curr.id === res.data.id ? res.data : curr;
          });
        });
        setNewData({ title: "", description: "" });
        setUpdateData({});
        displayToast("Editted successfully", "success");
      }
    } catch ({ error }) {
      console.log(error);
    }
  };
  const addData = async () => {
    const res = await postProduct(newData);
    if (res.status === 200) {
      setItems([...items, res.data]);
      setNewData({ title: "", description: "" });
      displayToast("Added Succesfully", "success");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;

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
      const res = await deleteProduct(id);
      if (res.status === 200) {
        displayToast("Deleted SuccessFully", "warning");
        const newUpdatedData = items.filter((curr) => {
          return curr.id !== id;
        });
        setItems(newUpdatedData);
      }
    } catch (error) {
      console.error(error);
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

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const currentData = items.slice(start, end);

  return (
    <div className="bg-sky-400 h-[100%]">
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
        {currentData.map((curr) => {
          const { id, title, description, image, price } = curr;

          return (
            <div>
              <Card className="w-[550px] h-[550px] mb-4">
                <CardBody>
                  <ol>
                    <li key={id}>
                      <p>Id : {id}</p>
                      <p>Title : {title}</p>
                      <img src={image} alt="Pic" width={150} />
                      <p>Price : ${price}</p>
                      <p>Description :{description}</p>
                      <div className="mt-3 flex">
                        <Button
                          color="success"
                          variant="shadow"
                          className="mr-4"
                          onPress={() => handleUpdate(curr)}
                        >
                          Edit
                        </Button>

                        <Modal1 func={() => handleDelete(id)} />
                      </div>
                    </li>
                  </ol>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center ml-[45%] items-center h-[60px] w-[300px]">
        {totalPages === 0 ? (
          ""
        ) : (
          <Pagination
            className="mb-0"
            total={totalPages}
            page={page > totalPages ? setPage(page - 1) : page}
            onChange={setPage}
            showControls
            color="primary"
          />
        )}
      </div>
    </div>
  );
}

export default Data;
