let id = document.getElementById("student-id");
let name = document.getElementById("student-name");
let g1 = document.getElementById("grade1");
let g2 = document.getElementById("grade2");
let g3 = document.getElementById("grade3");
let att = document.getElementById("student-attendance");
let analyzeBtn = document.getElementById("analyze-btn");
let resultBody = document.getElementById("results-body");

// قواعد العمل
const MIN_ATTENDANCE = 75;
const PASS_MARK = 50;

// دالة حساب التقدير
function getGradeLetter(average) {


if (average >= 90) return "A";
if (average >= 80) return "B";
if (average >= 70) return "C";
if (average >= 60) return "D";
if (average >= PASS_MARK) return "E";

return "F";


}

// دالة حساب النتيجة
function getFinalResult(average, attendance) {


if (average >= PASS_MARK && attendance >= MIN_ATTENDANCE) {
    return "ناجح (Pass)";
} else {
    return "يحتاج مراجعة (Needs Review)";
}


}

// مصفوفة الطلاب
let studata
if(localStorage.student != null){
    studata = JSON.parse(localStorage.student);
}else{
    studata =[];
}


// عند الضغط على الزر
analyzeBtn.onclick = function () {


// حساب مجموع الدرجات
const total =
    Number(g1.value) +
    Number(g2.value) +
    Number(g3.value);

// حساب المتوسط
let average = total / 3;

// حساب التقدير
let letter = getGradeLetter(average);

// حساب النتيجة
let result = getFinalResult(average, Number(att.value));

// إنشاء كائن الطالب
let newstu = {

    id: id.value,
    name: name.value,
    avg: average,
    grade: letter,
    finalresult: result

};

// إضافة الطالب للمصفوفة
studata.push(newstu);

localStorage.setItem('student',JSON.stringify(studata))
clearForm()
showdata()
};


function clearForm() {
id.value = "";
name.value = "";
g1.value = "";
g2.value = "";
g3.value = "";
att.value = "";
}
// read 
function showdata(){
    let table = "";
    for (let i = 0; i < studata.length; i++) {
        table += `<tr>
        <td>${studata[i].id}</td>
        <td>${studata[i].name}</td>
        <td>${studata[i].avg}</td>
        <td>${studata[i].grade}</td>
        <td>${studata[i].finalresult}</td>
        <td><button onclick="editStudent(${i})">تعديل</button></td>
        <td><button onclick="deleteStudent(${i})">حذف</button></td>
    </tr>`;
    }
    resultBody.innerHTML = table;
}
function deleteStudent(index) {
    studata.splice(index, 1);
    localStorage.setItem('student', JSON.stringify(studata));
    showdata();
}
function editStudent(index) {
    let student = studata[index];
    id.value = student.id;
    name.value = student.name;
    g1.value = student.g1;
    g2.value = student.g2;
    g3.value = student.g3;
    att.value = student.attendance;
}
showdata();