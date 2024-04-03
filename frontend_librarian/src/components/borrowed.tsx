"use client";
import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { BookBorrowedInterface } from "@/types/book";

const BorrowedBookList = ({ rows }: { rows: BookBorrowedInterface[] }) => {
  const router = useRouter();
  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "book.uni_id", headerName: "ID", width: 90 },
    {
      field: "book.title",
      headerName: "Title",
      width: 150,
      sortable: true,
      valueGetter: (value, row) => `${row.book.uni_id}`,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      sortable: true,
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <div className="w-full flex h-full items-center">
          <p
            className={`rounded text-white h-6 leading-none flex items-center px-2 ${
              params.row.overdue
                ? "bg-red-500"
                : params.row.active
                ? "bg-green-500"
                : "bg-blue-500"
            }`}
          >
            {params.row.overdue
              ? "Overdue"
              : params.row.active
              ? "Active"
              : "Returned"}
          </p>
        </div>
      ),
    },
    {
      field: "expire_time",
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
            onClick={() => router.push(`/books/${params.row.book.uni_id}`)}
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

export default BorrowedBookList;
