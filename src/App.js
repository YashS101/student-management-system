import React, { useState, useEffect } from "react";
import "./App.css";
import Loading from "./components/Loading";
import { studentsData } from "./data";
import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";

function App() {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [search, setSearch] = useState("");

  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  const editStudent = (student) => {
    setEditing(true);
    setCurrentStudent(student);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(
      students.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
    setEditing(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setStudents(studentsData);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="container fade-in" style={{ textAlign: "center" }}>

      <h1>Students Management System</h1>

      <StudentForm
        addStudent={addStudent}
        editing={editing}
        currentStudent={currentStudent}
        updateStudent={updateStudent}
      />

      <input
        placeholder="Search student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginTop: "20px", padding: "10px", width: "300px" }}
      />

      <StudentTable
        students={filteredStudents}
        deleteStudent={deleteStudent}
        editStudent={editStudent}
      />

    </div>

  );
}

export default App;
