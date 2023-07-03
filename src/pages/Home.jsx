import React, { useState } from "react";

const Home = () => {
    const[inputs, setInputs] = useState({
        name: "",
        email: "",
    });
    const [tableData, setTableData] = useState([])
    const [editClick, setEditClick] = useState(false)
    const [editIndex, setEditIndex] = useState("")
    const handleChange=(e)=> {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit=(e)=> {
        e.preventDefault();
        if(editClick){
            const tempTableData = tableData;
            Object.assign(tempTableData[editIndex], inputs)
            setTableData([...tempTableData]);
            setEditClick(false);
            setInputs({
                name: "",
                email: "",
            });
          }  else {  
        setTableData([...tableData, inputs]);
        setInputs({
            name: "",
            email: "",
        });
    }
    };
    const handleDelete = (index) => {
        const filterData = tableData.filter((item, i)=>i !==index);
        setTableData(filterData);
    };
    const handleEdit = (index) => {
        const tempData = tableData[index]
        console.log("tableData", tableData)
        setInputs(
            {
            name:tempData.name,
            email:tempData.email
            });
            setEditClick(true);
            setEditIndex(index)
    }
    return (
        <div>
            <h1>Crud App</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                        name="name"
                        value={inputs.name}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                        name="email"
                        value={inputs.email}
                        onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Add</button>
                </form>
            </div>
            <div>
                <table className="w-full text-center">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData.map((item, i) => (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>   
                                    <td>
                                      <button onClick={()=>handleEdit(i)}>Edit</button>
                                      <button onClick={()=>handleDelete(i)}>Delete</button>  
                                      {editClick?"update":""}  
                                    </td>                              
                                </tr>
                            ))
                            }
                    </tbody>
                </table>
            </div>
        </div>
    )
   }
   
export default Home;