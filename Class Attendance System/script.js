let students = JSON.parse(localStorage.getItem("students")) || [];
let totalClasses = localStorage.getItem("totalClasses") 
    ? parseInt(localStorage.getItem("totalClasses")) 
    : 0;

let editIndex = -1;

// ADD CLASS
function addClass() {
    totalClasses++;
    localStorage.setItem("totalClasses", totalClasses);
    updateUI();
}

// SAVE STUDENT
function saveStudent() {
    let name = document.getElementById("name").value;

    let student = {
        name,
        present: 0
    };

    if (editIndex === -1) {
        students.push(student);
    } else {
        students[editIndex].name = name;
        editIndex = -1;
    }

    localStorage.setItem("students", JSON.stringify(students));
    window.location.href = "index.html";
}

// DISPLAY
function displayStudents() {
    let table = document.getElementById("studentTable");
    if (!table) return;

    table.innerHTML = "";

    students.forEach((s, index) => {

        let absent = totalClasses - s.present;
        let percent = totalClasses === 0 
            ? 0 
            : ((s.present / totalClasses) * 100).toFixed(1);

        table.innerHTML += `
        <tr>
            <td>${s.name}</td>
            <td>${s.present}</td>
            <td>${absent}</td>
            <td>${percent}%</td>
            <td>
                <button class="present" onclick="markPresent(${index})">P</button>
                <button class="absent" onclick="markAbsent(${index})">A</button>
            </td>
            <td>
                <button class="edit" onclick="editStudent(${index})">Edit</button>
                <button class="delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>`;
    });
}

// MARK PRESENT
function markPresent(index) {
    students[index].present++;
    save();
}

// MARK ABSENT
function markAbsent(index) {
    save(); // absent auto calculated
}

// DELETE
function deleteStudent(index) {
    students.splice(index, 1);
    save();
}

// EDIT
function editStudent(index) {
    localStorage.setItem("editIndex", index);
    window.location.href = "add.html";
}

// LOAD EDIT
window.onload = function () {
    displayStudents();
    updateUI();

    let index = localStorage.getItem("editIndex");

    if (index !== null && document.getElementById("name")) {
        document.getElementById("name").value = students[index].name;
        editIndex = index;
        localStorage.removeItem("editIndex");
    }
};

// SAVE
function save() {
    localStorage.setItem("students", JSON.stringify(students));
    updateUI();
    displayStudents();
}

// UPDATE UI
function updateUI() {
    let el = document.getElementById("totalClasses");
    if (el) el.innerText = totalClasses;
}