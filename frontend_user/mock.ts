// mockData.ts

interface Author {
  firstname: string;
  lastname: string;
  middlename?: string;
  email: string;
}

interface Book {
  id: string;
  title: string;
  summary: string;
  faculties: string[];
  publisher: string;
  publish_year: string;
  authors: Author[];
}

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "Book 1",
    summary: "Summary of Book 1",
    faculties: ["Faculty 1", "Faculty 2"],
    publisher: "Publisher A",
    publish_year: "2024-01-01",
    authors: [
      {
        firstname: "John",
        lastname: "Doe",
        middlename: "Middle",
        email: "john.doe@example.com",
      },
      {
        firstname: "Jane",
        lastname: "Doe",
        email: "jane.doe@example.com",
      },
    ],
  },
  {
    id: "2",
    title: "Book 2",
    summary: "Summary of Book 2",
    faculties: ["Faculty 3", "Faculty 4"],
    publisher: "Publisher B",
    publish_year: "2024-02-01",
    authors: [
      {
        firstname: "Jane",
        lastname: "Smith",
        email: "jane.smith@example.com",
      },
    ],
  },
  {
    id: "3",
    title: "Book 3",
    summary: "Summary of Book 3",
    faculties: ["Faculty 5"],
    publisher: "Publisher C",
    publish_year: "2024-03-01",
    authors: [
      {
        firstname: "Bob",
        lastname: "Johnson",
        email: "bob.johnson@example.com",
      },
      {
        firstname: "Alice",
        lastname: "Johnson",
        email: "alice.johnson@example.com",
      },
    ],
  },
  // Add more mock data as needed
];
