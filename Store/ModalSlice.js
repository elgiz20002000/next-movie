import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalActive: false,
    modalText:''
  },
  reducers: {
    showModal: (state) => {
      state.modalActive = true;
    },
    hideModal: (state) => {
      state.modalActive = false;
    },
    setModalText: (state, action) => {
        state.modalText = action.payload
    }
  },
});

export const useModalActive = (state) => state.modal.modalActive;
export const useModalText = (state) => state.modal.modalText;
export const {showModal , hideModal , setModalText} = modalSlice.actions
export default modalSlice.reducer;
