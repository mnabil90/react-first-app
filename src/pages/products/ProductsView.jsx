import React, { useEffect, useState } from 'react';
import { DataGrid ,GridActionsCellItem,GridToolbar,GridToolbarContainer } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import ProductInfoForm from './ProductInfoForm';
import { deleteProduct ,loadProducts, patchProduct} from '../../api/products';
import { toast } from 'react-toastify';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';



const initialProducts = [
    {id:1,productName : 'Fries',productPrice: 10,quantity: 0},
    {id:2,productName : 'Pepsi',productPrice: 5,quantity: 0},
    {id:3,productName : 'Chicken',productPrice: 30,quantity: 0},
];

function ProductsView(props) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [state, setState] = useState({ 
        selectedId : null,
        selectedRow :[],
        operationType : 'ADD',
        showForm : false,
        data:[],
        message : null 
   });
  const [selectionModel, setSelectionModel] = useState([]);
  const [selectedRow, setSelectedRow] = useState([])
  const [contextMenu, setContextMenu] = useState(null);

  useEffect(() =>{
    loadProductsData();
  },[])


  useEffect(() => {
    calculateProductsTotal(state.data);
  }, [state.data]);
 
  const columns = [
    { field: "id", headerName: "ID" , width: 0},
    { field: "productName", headerName: "Name" , width: 250},
    { field: "productPrice", headerName: "Price" , width: 150},
    { field: "quantity", headerName: "Quantity", width: 150 } ,
    {
      field: 'actions2',
      type: 'actions',
      flex:1,
      //width: 400,
      align :"left", 
      getActions: (params) => [
          <GridActionsCellItem
            sx={{ backgroundColor: 'green' }}
            icon={<AddIcon/>}
            label="Add"
            onClick={()=>{modifyQuantity(params.row.id,1)}}
          />,
          <GridActionsCellItem
            sx={{ backgroundColor: 'red' }}
            icon={<RemoveIcon />}
            onClick={()=>{modifyQuantity(params.row.id,-1)}}
            //showInMenu
          />
        ],
      },
];

  const modifyQuantity = (id,value) => {
    let newProducts=[...state.data];
    let productIndex = newProducts.findIndex(ele => ele.id === id);
    console.log("index",productIndex);
    let product= {...state.data[productIndex]}
    product.quantity = product.quantity + value;

    patchProduct(product)
    .then(response => {
        console.log("newProducts",newProducts);
        loadProductsData();
        /*setState({...state, selectedId: null, selectedRow: [],
            data:newProducts
        });*/
        
    })
    .catch(error => {
        console.log(error);
    });
  }
  
  const calculateProductsTotal = function(){
    let data = [...state.data]
    let {totalAmount,totalQuantity} = props?.cartState;
    totalAmount = data.reduce(function (acc, product) { return acc + (product.quantity*product.productPrice); }, 0);
    totalQuantity = data.reduce(function (acc, product) { return acc + product.quantity; }, 0);

    props.setCartState({totalAmount,totalQuantity});
    //console.log(props.cartState)
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Box sx={{ flexGrow: 1 }}>
        <IconButton color="primary" aria-label="Add User" component="label" onClick={handleAddAction} sx={{ backgroundColor: colors.greenAccent[500] }}>
            <AddIcon />
        </IconButton>
        <IconButton color="primary" aria-label="Edit User" component="label" onClick={handleEditAction} sx={{ backgroundColor: colors.greenAccent[500]}}>
            <EditIcon/>
        </IconButton>
        <IconButton color="primary" aria-label="Edit User" component="label" onClick={handleDeleteAction} sx={{ backgroundColor: colors.redAccent[500] }}>
            <DeleteIcon/>
        </IconButton>
        </Box>
        <IconButton color="primary" aria-label="Refresh Grid" component="label" onClick={loadProductsData} sx={{ backgroundColor: colors.greenAccent[500]}}>
            <RefreshIcon />
        </IconButton>
      </GridToolbarContainer>
    );
}

const loadProductsData = () =>{
    loadProducts()
    .then(response => {
        setState({...state,showForm:false,
          data:response.data
        });
        calculateProductsTotal();
    })
    .catch(error => {
        console.log(error);
    });
}

const handleAddAction = () => {
  setState({...state, operationType: 'ADD' ,showForm : true});
}

const handleEditAction = () => {
  setState({...state, operationType: 'EDIT',showForm : true});
}

const handleDeleteAction = () => {
    if(state.selectedId != null){
      deleteProduct(state.selectedId)
      .then(response => {
          toast("Product Deleted Successfully");
          loadProductsData();
      })
      .catch(error => {
          console.log(error);
      });
    }
}


const handleContextMenu = (event) => {
  event.preventDefault();
  setSelectedRow(Number(event.currentTarget.getAttribute('data-id')));
  setState({...state, selectedId: Number(event.currentTarget.getAttribute('data-id')), selectedRow: []});
  setContextMenu(
    contextMenu === null
      ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
      : null,
  );
};

const handleClose = () => {
  setContextMenu(null);
};
  return (
    <>
    <Box
        m="40px 0 0 0"
        height="85vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            fontSize : 'large'
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
            components={{
                Toolbar: CustomToolbar,
            }}
            componentsProps={{
              row: {
                onContextMenu: handleContextMenu,
                style: { cursor: 'context-menu' },
              },
            }}
            getRowId={row => row.id}
            sortingOrder={["desc", "asc"]}
          //  sortModel={sortModel}
            rows={state.data}
            columns={columns}
            pageSize={100}
            rowHeight={38}
            selectionModel={selectionModel}
            checkboxSelection
            disableRowSelectionOnClick 
            onRowSelectionModelChange ={(ids) => {
             console.log(ids);
             let  selectedId = 0;
                if (ids.length > 1) {
                    const selectionSet = new Set(selectionModel);
                    const result = ids.filter((s) => !selectionSet.has(s));
                    selectedId = [result[0]];
                    setSelectionModel(result);
                } else {
                    selectedId =[ids[0]];
                    setSelectionModel(ids);
                }
                
                const selectedIDs = new Set(selectedId);
                const selectedRows = state.data.filter((row) =>
                    selectedIDs.has(row.id),
                );
                //setSelectedRows(selectedRows);
               
                if(selectedRows.length>0)
                setState({...state, selectedId: selectedRows[0].id, selectedRow: selectedRows[0]});
            }}
          />

      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        componentsProps={{
          root: {
            onContextMenu: (e) => {
              e.preventDefault();
              handleClose();
            },
          },
        }}
      >
        <MenuItem onClick={handleEditAction}><EditIcon /> Edit</MenuItem>
        <MenuItem onClick={handleDeleteAction}><DeleteIcon/> Delete</MenuItem>
      </Menu>

      </Box>
      {
        state.showForm && 
        <ProductInfoForm id={state.selectedId} operationType={state.operationType} showFormWin={state.showForm} loadProductsData={loadProductsData} state={state} setState={setState}/>
      }
    </>
  )
}

export default ProductsView