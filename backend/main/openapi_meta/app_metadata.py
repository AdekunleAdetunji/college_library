#!/usr/bin/python3
"""
This module contains the metadata variables of the main app
"""
# Overview description of the College Library application
description = """
# Overview
The College Library application serves as a comprehensive platform for managing
library resources within educational institutions.

It streamlines the process of book management for librarians while providing
students with convenient access to check book availability and make
reservations.

# Subapplications
The College Library application comprises three distinct subapplications, each
tailored to cater to specific user roles and functionalities:
1. **Admin Subapplication**:
    - The Admin subapplication is dedicated to administering all actions
    related to library management at an administrative level.
    - Administrators have access to a range of functions essential for
    overseeing and controlling library operations effectively.
    
    For detailed information and documentation regarding the Admin
    subapplication, please refer to the
    [Admin Documentation](http://localhost:8000/admin/docs).

2. **Librarian**:
    - The Librarian subapplication facilitates actions and operations
      specifically designed for librarians.
    - Librarians utilize this subapplication to manage various aspects of book
      inventory, borrower requests, and library resources efficiently.
    
    Further details and documentation regarding the Librarian subapplication
    can be found [here.](http://localhost:8000/librarian/docs)

3. **User**:
    - The User subapplication caters to library users, primarily students
      and faculty members, providing them with access to library services and
      functionalities.
    - Users can utilize this subapplication to search for books,
      check availability, make reservations, and manage their borrowing
      activities seamlessly.
    
    For comprehensive information and documentation regarding the User
    subapplication, please visit [this link.](http://localhost:8000/user/docs)

By integrating these subapplications, the College Library application offers a
unified and user-friendly interface, empowering both administrators and library
patrons to efficiently manage and utilize library resources, thereby enhancing
the overall library experience within educational institutions.
"""

# Contact information for the developer
contact = {
    "name": "Adekunle Adetunji",
    "url": "https://www.linkedin.com/in/adetunji-adekunle-835755233/",
    "email": "adekunleadetunjiwilson@gmail.com"
}


admin_description = """
# Overview
The admin application serves as the central control hub for all administrative
functions within the library system. It is exclusively accessible to the chief
librarian, who holds the highest authority in managing the library's
operations.

Within this application, critical functionalities are embedded to
ensure efficient management and organization of library resources.

## Key Functionalities:
- **Addition of New Library Faculty**: In cases where new books are acquired
  that do not align with existing categories or schools within the university's
  structure, the admin can seamlessly add new faculty entries to the library
  database.
  
  This ensures that all books are appropriately categorized and
  accessible to library users.

- **Registration of New Librarians**: The admin has the authority to register
  new librarians, granting them access to the librarian application and its
  functionalities.
  
  By controlling librarian registrations, the admin maintains
  oversight and ensures that only authorized personnel manage library
  operations.

For more detailed insights into the functionalities of the admin application,
refer to the admin routes documented below.
"""

librarian_description = """
# Overview
Upon registration by the library admin, librarians gain access to the librarian
application, which empowers them to efficiently manage day-to-day library
operations.

From cataloging new book arrivals to facilitating book borrowals
and returns, the librarian application streamlines processes to enhance user
experience and library efficiency.

## Key Functionalities:
- **Addition of New Book Arrivals**: Librarians can easily add newly acquired
  books to the library inventory, ensuring that the catalog remains up-to-date
  and comprehensive.
  
  This functionality includes specifying book details such
  as title, author, genre, and availability status.

- **Borrowal Monitoring and Approval**: Librarians oversee the borrowal
  process, monitoring requests from library users and approving or denying them
  based on availability and library policies.
  
  This ensures fair and efficient
  distribution of library resources.

- **Book Return Management**: Librarians facilitate the return process, checking
  in borrowed books and updating their availability status in the library
  system.
  
  This functionality helps maintain accurate records of book borrowals
  and returns, optimizing library resource utilization.

Explore the librarian application routes below for a comprehensive
understanding of its functionalities and capabilities.
"""

user_desciption = """
The User subapplication within the College Library application is tailored to
meet the needs of library patrons, including students, faculty members, and
other university personnels.

With a user-friendly interface and a range of intuitive features, this
subapplication empowers users to access and utilize library resources
efficiently.

## Key Features
- **Book Search and Availability**: Users can easily search for books within
  the library's inventory and check their availability status in real-time.
  
  This feature enables users to locate desired books quickly and plan their
  library visits effectively.

- **Reservation Management**: Users have the ability to reserve books and go
  pick it up within a 24hour period. By placing reservations, users can
  secure their access to desired books.

- **Borrowing History**: The subapplication provides users with access to
  their borrowing history, allowing them to track the books they have borrowed
  in the past and their respective due dates.
  
  This feature promotes
  accountability and helps users manage their borrowing activities effectively.

- **User Profile Management**: Users can manage their profiles within the
  subapplication, including updating personal information, changing passwords,
  and configuring notification preferences.
  
  This feature enhances user
  experience and ensures personalized interaction with the library system.

- **Feedback and Support (coming in future versions)**: The subapplication
  offers a platform for users to provide feedback, report issues, or seek
  assistance from library staff.
  
  This proactive approach to user support
  fosters a collaborative environment and ensures timely resolution of user
  queries and concerns

For a detailed understanding of the User subapplication api, explore the routes
below.
"""