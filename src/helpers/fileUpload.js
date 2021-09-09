const fileUpload = async (file) => {
  const cloudUrl = "https://api.cloudinary.com/v1_1/ansango/upload/";
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "react-journal");
  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    if (resp.ok) {
      const data = await resp.json();
      return data.url;
    } else {
      throw await resp.json();
    }
  } catch (error) {
    throw error;
  }
};

export default fileUpload;
