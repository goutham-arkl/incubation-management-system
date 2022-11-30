import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { userUrl } from "../../constants/constant";
import { useEffect } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'

const Datatable = () => {
  const [data, setData] = useState([]);
  const [status,setStatus]=useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const userColumns = [ { field: "_id", headerName: "ID", width: 230 }, {
    field: "name",
    headerName: "User name",
    width: 200,
  }, {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "createdAt",
    headerName: "Joined on",
    width: 200,
  },]
  useEffect(() => {
     axios.get(`${userUrl}/api/users/getUsers`).then((res)=>{
      console.log(res);
      console.log(res.data);
      setData(res.data)
     })
    //  setData(['Id'])
  }, [status])
  
  function handleBlock(userId){
    axios.get(`${userUrl}/api/admin/block/${userId}`).then(({data})=>{
        if(data.users){
          Swal.fire({
            title: 'Blocked!',
            text: 'user blocked successfully',
            icon: 'success',
            confirmButtonText: 'ok'
          })
       setStatus(data.users)
      //  console.log(data.users);
      //  console.log('blocked');
   }else{
       setErrorMessage(data.err)
       Swal.fire({
        title: 'Error!',
        text: 'something went wrong',
        icon: 'error',
        confirmButtonText: 'ok'
      })
   }
   }) 
}
function handleUnblock(userId){
  axios.get(`${userUrl}/api/admin/unblock/${userId}`).then(({data})=>{
      if(data.users){
        Swal.fire({
          title: 'Unblocked!',
          text: 'user unblocked successfully',
          icon: 'success',
          confirmButtonText: 'ok'
        })
     setStatus(data.users)
    //  console.log(data.users);
    //  console.log('blocked');
 }else{
     setErrorMessage(data.err)
     Swal.fire({
      title: 'Error!',
      text: 'something went wrong',
      icon: 'error',
      confirmButtonText: 'ok'
    })
 }
 }) 
}
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        console.log("params",params);
        return (
          <div className="cellAction">
      {params.row.isBlocked?
       
           <div className="viewButton" onClick={()=>handleUnblock(params.id)}>unblock</div>:
           <div className="viewButton2" onClick={()=>handleBlock(params.id)}>Block</div>
           
          
      
          }
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
       {errorMessage && <div className="p-4 mb-4 text-sm text-center text-red-800 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMessage}</div>}
      <div className="datatableTitle">
        Users
       
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId ={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
