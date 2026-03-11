import React from "react";
import * as XLSX from "xlsx";

function StudentTable({ students, deleteStudent, editStudent })
 {

  const downloadExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(students);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    XLSX.writeFile(workbook, "students.xlsx");
  };

  return (

    <div style={{marginTop:"30px"}}>

      <button onClick={downloadExcel}>
        Download Excel
      </button>

      <table border="1" style={{margin:"20px auto", padding:"10px"}}>

        <thead>

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {students.map((student) => (

            <tr key={student.id}>

              <td>{student.name}</td>

              <td>{student.email}</td>

              <td>{student.age}</td>

              <td>

               <button className="edit-btn" onClick={() => editStudent(student)}>
                 Edit
               </button>

               <button className="delete-btn" onClick={() => deleteStudent(student.id)}>
                 Delete
               </button>


              </td>


            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default StudentTable;
