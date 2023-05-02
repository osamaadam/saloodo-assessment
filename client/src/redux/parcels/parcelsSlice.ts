import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Parcel } from "../../api/types/Parcel";

interface ParcelsState {
  parcels: Parcel[];
}

const initialState: ParcelsState = {
  parcels: [],
};

export const parcelsSlice = createSlice({
  name: "parcels",
  initialState,
  reducers: {
    loadParcels: (state, action: PayloadAction<Parcel[]>) => {
      state.parcels = [...action.payload].sort((a, b) => b.id - a.id);
    },
    clearParcels: (state) => {
      state.parcels = [];
    },
    updateParcel: (state, action: PayloadAction<Parcel>) => {
      state.parcels =
        state.parcels?.map((parcel) => {
          if (parcel.id === action.payload.id) return action.payload;
          return parcel;
        }) ?? null;
    },
    addParcel: (state, action: PayloadAction<Parcel>) => {
      state.parcels = [...state.parcels, action.payload].sort(
        (a, b) => b.id - a.id
      );
    },
    reset: () => initialState,
  },
});

export const { loadParcels, clearParcels, updateParcel, addParcel } =
  parcelsSlice.actions;

export default parcelsSlice.reducer;
