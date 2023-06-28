import { loadProducts,saveProduct,updateProduct,deleteProduct, patchProduct } from "../api/products";
export const LOAD_PRODUCT = 'LOAD_PRODUCT';
export const SAVE_PRODUCT = 'SAVE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const PATCH_PRODUCT = 'PATCH_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';


export const getAllProducts = () =>async( dispatch) => {
    const res=await loadProducts();
    dispatch({
        type:LOAD_PRODUCT,
        payload:res.data
    })
}

export const handleSaveProduct = (values) =>async(dispatch,values) => {
    const res=await saveProduct(values);
    dispatch({
        type:SAVE_PRODUCT,
        payload:res.data
    })
}

export const handleUpdateProduct = (values) =>async(dispatch,values) => {
    const res=await updateProduct();
    dispatch({
        type:UPDATE_PRODUCT,
        payload:res.data
    })
}

export const handlePatchProduct = (values) =>async(dispatch) => {
    debugger;
    const promise=await patchProduct(values);
    const data = await promise.data;
    dispatch({
        type:PATCH_PRODUCT,
        payload:data
    })
}


export const handleDeleteProduct = (values) =>async(dispatch) => {
    const res=await deleteProduct(values);
    dispatch({
        type:DELETE_PRODUCT,
        payload:res.data
    })
}