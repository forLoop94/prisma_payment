import { useState, useEffect } from "react";
import axios from "axios";

interface Users {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  password: string;
  role: string;
  state: string;
  gender: string;
  age: number;
  yearAdmitted: number;
}

interface Pagination {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const users = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 0,
    pageSize: 0,
    totalPages: 0,
  });
  const [selectedStates, setSelectedStates] = useState<string[]>([
    // "Texas",
    // "Maine",
    // "Utah",
  ]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedGender, setSelectedGender] = useState("MALE");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState("1");
  const [pageSize, setPageSize] = useState("3");

  const [file, setFile] = useState<any>(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", "d85f078f-53cf-4db1-908b-f14eb724c5a3");

    try {
      setUploading(true);
      const res = await axios.post(
        "http://localhost:5000/api/users/image_upload",
        formData
      );
      alert("Image uploaded: " + res.data.imageUrl);
      setPreview("");
      getUsersPaginated();
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const queryParams = new URLSearchParams();

  if (selectedStates.length) {
    queryParams.set("states", selectedStates.join(","));
  }

  if (selectedRole) queryParams.set("role", selectedRole);
  if (selectedGender) queryParams.set("gender", selectedGender);
  if (searchTerm) queryParams.set("search", searchTerm);
  if (page) queryParams.set("page", page);
  if (pageSize) queryParams.set("pageSize", pageSize);

  useEffect(() => {
    getUsersPaginated();
  }, [page]);

  const getUsersPaginated = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/paginated?${queryParams.toString()}`
      );
      const { data, pagination } = await response.json();
      setUsers(data);
      setPagination(pagination);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <h5>Dsecription</h5>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ab
        blanditiis, iure vero eius error culpa.
      </p>
      <div>
        <input type="file" onChange={handleFileChange} />
        {preview && <img src={preview} alt="Preview" width="150" />}
        <button onClick={handleUpload} disabled={!file || uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
      <h5>List</h5>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h6>{user.name}</h6>
            <img src={user.profileImage} alt={user.name} width="150" />
            <p>{user.gender}</p>
            <p>{user.state}</p>
            <p>{user.role}</p>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: pagination.totalPages }, (_, index) => (
          <button
            key={index + 1}
            style={{
              margin: "0 5px",
              backgroundColor: pagination.page === index + 1 ? "gray" : "",
            }}
            onClick={() => setPage(String(index + 1))}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default users;
