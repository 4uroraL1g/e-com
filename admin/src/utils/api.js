import axios from "axios";

const token = localStorage.getItem("token");

const headers = {
  Authorization: `Bearer ${token}`, // Include your API key in the Authorization header
  "Content-Type": "application/json", 
};

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}${url}`, {
      headers,
    });
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
};

export const uploadImage = async (url, formData) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}${url}`,
      formData,
      { headers }
    );
    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    return error;
  }
};

export const postData = async (url, formData) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${url}`, {
      method: "POST",
      headers,
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.error("Error posting data:", error);
    return error;
  }
};

export const editData = async (url, updatedData) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}${url}`,
      updatedData,
      { headers }
    );
    return data;
  } catch (error) {
    console.error("Error editing data:", error);
    return error;
  }
};

export const deleteData = async (url) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}${url}`,
      { headers }
    );
    return data;
  } catch (error) {
    console.error("Error deleting data:", error);
    return error;
  }
};

export const deleteImages = async (url, image) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}${url}`,
      {
        headers,
        data: image,
      }
    );
    return data;
  } catch (error) {
    console.error("Error deleting image:", error);
    return error;
  }
};