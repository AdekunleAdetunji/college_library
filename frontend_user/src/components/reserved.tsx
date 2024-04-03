"use client";
import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { BookReservedInterface } from "@/types/book";

const ReservedBookList = ({ rows }: { rows: BookReservedInterface[] }) => {
  const router = useRouter();
  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "uni_id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 150,
      sortable: true,
    },
    {
      field: "expire_date",
      headerName: "Due date",
      sortable: true,
      width: 160,
      valueGetter: (value, row) => `${new Date(value).toDateString()}`,
    },
    {
      field: "view",
      headerName: "",
      sortable: false,
      width: 160,
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <div className="w-full flex h-full items-center">
          <Button
            onClick={() => router.push(`/books/${params.row.uni_id}`)}
            className="rounded text-white h-6 leading-none flex items-center px-2 bg-slate-500"
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default ReservedBookList;
