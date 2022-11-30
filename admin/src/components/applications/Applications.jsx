import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { userUrl } from "../../constants/constant";
import { useEffect } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'

const Applications = () => {
    const [status, setStatus] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState([]);
  const userColumns = [ { field: "_id", headerName: "ID", width: 200 }, {
    field: "name",
    headerName: "Registered by",
    width: 150,
  }, {
    field: "company_name",
    headerName: "Company",
    width: 150,
  },
  {
    field: "incubation_type",
    headerName: "Type",
    width: 150,
  }, {
    field: "state",
    headerName: "Origin",
    width: 150,
  },
  , {
    field: "isApproved",
    headerName: "Is approved",
    width: 150,
  },]
  useEffect(() => {
     axios.get(`${userUrl}/api/admin/applications`).then((res)=>{
      console.log(res);
      console.log(res.data);
      setData(res.data)
     })
    //  setData(['Id'])
  }, [status])
  
 
 
  function handleApprove(item){
    axios.get(`${userUrl}/api/admin/approve/${item}`).then((response) => {
      // console.log(response);
      
        if (response.data) {
          Swal.fire({
            title: 'Approve?',
            text: 'Are you sure ?',
            icon: 'success',
            confirmButtonText: 'ok',
            showCancelButton:true
          }).then((result)=>{
            if(result.value){
              setStatus(new Date())
            }
            else{
              setStatus('')
            }
          })
            
            
        } else {
            setErrorMessage('Something went wrong')
        }
    }).catch((err) => {
        setErrorMessage(err)

    })
}
function handleDeclined(item){
  axios.get(`${userUrl}/api/admin/decline/${item}`).then((response) => {
      if (response.data) {
        Swal.fire({
          title: 'Decline',
          text: 'Are you sure?',
          icon: 'error',
          confirmButtonText: 'ok',
          showCancelButton:true
        }).then((result)=>{
          if(result.value){
            setStatus(new Date())
          }
          else{
            setStatus('')
          }
        })
          
        
      } else {
          setErrorMessage('Something went wrong')
      }
  }).catch((err) => {
      setErrorMessage(err)

  })
}
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        // console.log(params,"params apps");
        return (
         
          <div className="cellAction">
            
       {params.row.isDeclined ? <div
              className="deleteButton"
            >
              Declined
            </div>:(params.row.isApproved ?
              <div className="viewButton">Approved</div>
            :
            
            <div className="viewButton" onClick={()=>{handleApprove(params.id)}}>Approve</div>
            )
            }
               {params.row.isDeclined ? <div
              
            >
             
            </div>:(params.row.isApproved?
              <div></div>
            :
            <div className="deleteButton" onClick={()=>{handleDeclined(params.id)}}>Decline</div>
            )
            }
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
    Applications
        
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

export default Applications;
