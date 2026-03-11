import React, { useState, useEffect } from "react";

function StudentForm({ addStudent, editing, currentStudent, updateStudent }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (editing && currentStudent) {
      setName(currentStudent.name);
      setEmail(currentStudent.email);
      setAge(currentStudent.age);
    }
  }, [editing, currentStudent]);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !age) {
      alert("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      alert("Enter a valid email");
      return;
    }

    if (editing) {

      updateStudent({
        id: currentStudent.id,
        name,
        email,
        age
      });

    } else {

      const newStudent = {
        id: Date.now(),
        name,
        email,
        age
      };

      addStudent(newStudent);

    }

    setName("");
    setEmail("");
    setAge("");
  };

  return (

    <div style={{marginTop:"30px"}}>

      <h3>{editing ? "Edit Student" : "Add Student"}</h3>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e)=>setAge(e.target.value)}
        />

        <button className="add-btn" type="submit">

          {editing ? "Update Student" : "Add Student"}
        </button>

      </form>

    </div>

  );
}

export default StudentForm;
