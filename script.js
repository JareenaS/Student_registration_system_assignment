const form = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');
let students = JSON.parse(localStorage.getItem('students')) || [];

function displayStudents() {
    studentList.innerHTML = students.map((student, index) => `
        <tr>
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>
    `).join('');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('studentName').value;
    const id = document.getElementById('studentID').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contactNo').value;
    
    if (!name || !id || !email || !contact) return;

    const student = { name, id, email, contact };
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
    form.reset();
    displayStudents();
});

function editStudent(index) {
    const student = students[index];
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contactNo').value = student.contact;
    students.splice(index, 1);
}

function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}

window.onload = displayStudents;
