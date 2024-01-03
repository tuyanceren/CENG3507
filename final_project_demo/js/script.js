
class Student {
  constructor(id, name, surname, midterm, final, avg, statu, letterGrade) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.midterm = midterm;
    this.final = final;
    this.avg = avg;
    this.statu= statu;
    this.letterGrade =letterGrade;
  }

  createElement() {
    const div = document.createElement('div');
    div.innerHTML = `<div>ID: ${this.id}, NAME: ${this.name}, SURNAME: ${this.surname}, MIDTERM: ${this.midterm}, FINAL: ${this.final},AVG: ${this.avg}, STATUS:${this.statu}, LETTER GRADE: ${this.letterGrade}</div>`

    return div;
  }
}

class Course {
  constructor(name, scale) {
    this.name = name;
    this.scale = scale;
    this.students = [];
    this.failedList = [];
    this.passedList = [];
    this.container = null;
    this.formContainer = null;

    this.showAddForm = this.showAddForm.bind(this);
    this.hideAddForm = this.hideAddForm.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.showStudents = this.showStudents.bind(this);
    this.failedStudents = this.showFailed.bind(this);
    this.passedStudents = this.showPassed.bind(this);
  } 

  calculateLetterGrade(scale,avg) {
    if (scale == 10) {
      if (avg >= 90) {
        return 'A';
      } else if (avg >= 80) {
        return 'B';
      } else if (avg >= 70) {
        return 'C';
      } else if (avg >= 60) {
        return 'D';
      } else {
        return 'F';
      }
    } else if (scale == 7) {
      if (avg >= 93) {
        return 'A';
      } else if (avg >= 85) {
        return 'B';
      } else if (avg >= 77) {
        return 'C';
      } else if (avg >= 70) {
        return 'D';
      } else {
        return 'F';
      }
    }
    console.log("selam");
  }
  


  getElement() {
    const div = document.createElement('div');
    this.container = div;

    const courseInfo = document.createElement('div');

    div.classList.add('course');
    
    courseInfo.innerText = 'Course Name: ' + this.name + ' | ' + 'Point Scale: ' + this.scale;


    const addStudentButton = document.createElement('button');
    addStudentButton.innerText = 'Add Student';

    const showStudentButton = document.createElement('button');
    showStudentButton.innerText = 'Show Students';

    const failedStudentButton = document.createElement('button');
    failedStudentButton.innerText = 'Failed Students';

    const passedStudentButton = document.createElement('button');
    passedStudentButton.innerText = 'Passed Students';

    courseInfo.appendChild(addStudentButton);
    courseInfo.appendChild(showStudentButton);

    courseInfo.appendChild(failedStudentButton);
    courseInfo.appendChild(passedStudentButton);

    addStudentButton.addEventListener('click', (e)=> this.showAddForm(e));
    showStudentButton.addEventListener('click', (e)=>this.showStudents(e));
    failedStudentButton.addEventListener('click',(e)=>this.showFailed(e));
    passedStudentButton.addEventListener('click',(e)=>this.showPassed(e));
    
    div.appendChild(courseInfo)

    return div;
  }

  showAddForm(e) {
    e.preventDefault();

    const courseName = document.getElementById('add_student_course_name');
    courseName.innerText = this.name;

    const form = document.getElementById('add_student');
    form.classList.remove('hidden');

    const cancel = document.getElementById('add_student_cancel');
    //cancel.addEventListener('click', this.hideAddForm);
    cancel.onclick = this.hideAddForm;
    const save = document.getElementById('add_student_btn');
    //save.addEventListener('click', this.addStudent);
    save.onclick = this.addStudent;
  }

  hideAddForm(e) {
    e.preventDefault();

    const form = document.getElementById('add_student');
    form.classList.add('hidden');

    const cancel = document.getElementById('add_student_cancel');
    cancel.removeEventListener('click', this.hideAddForm);

    const save = document.getElementById('add_student_btn');
    save.removeEventListener('click', this.addStudent);
  }

  addStudent(e) {
    e.preventDefault();

    const idInput = document.getElementById('student_id');
    const nameInput = document.getElementById('student_name');
    const surnameInput = document.getElementById('student_surname');
    const midtermInput = document.getElementById('student_midterm');
    const finalInput = document.getElementById('student_final');

    const id = idInput.value;
    const name = nameInput.value;
    const surname = surnameInput.value;
    const midterm = midtermInput.value;
    const final = finalInput.value;
    const avg = (midterm *0.4 + final*0.6)
    const letterGrade = this.calculateLetterGrade(this.scale,avg);
    const statu = letterGrade== "F" ? "FAILED" : "PASSED";
    const existingStudent = this.students.some((student) => student.id == id) ;


    if (existingStudent) {
      alert("Bu öğrenci zaten listede var.");
    } else {

      const student = new Student(id, name, surname, midterm, final,avg,statu,letterGrade);
      this.students.push(student);
      if(statu=="FAILED"){
        const studentf = new Student(id, name, surname, midterm, final,avg,statu,letterGrade);
        this.failedList.push(studentf);
      } else {
        const studentp = new Student(id, name, surname, midterm, final,avg,statu,letterGrade);
        this.passedList.push(studentp);
      }
    }
    console.log(this.students);
    console.log( "passed" +this.passedList);
  }

  showStudents() {
    const course_name = document.getElementById('student_list_course_name');
    const student_list = document.getElementById('student_list');

    course_name.innerHTML = '';
    student_list.innerHTML = '';
    
    course_name.innerText = this.name + ' Students';

    for (let i = 0; i < this.students.length; i++) {
      const student = this.students[i];

      const studentEl = student.createElement();
      student_list.appendChild(studentEl);  
    }
  }
  showFailed(){
    const courseName = document.getElementById('student_course_name_f');
    const student_fail = document.getElementById('student_failed');

    courseName.innerHTML = '';
    student_fail.innerHTML = '';
    
    courseName.innerText = this.name + ' Failed Students';

    for (let i = 0; i < this.failedList.length; i++) {
      const failed = this.failedList[i];

      const studentF = failed.createElement();
      student_fail.appendChild(studentF);  
    }
  }
  showPassed(){
    const courseName = document.getElementById('student_course_name_p');
    const student_passed = document.getElementById('student_passed');

    courseName.innerHTML = '';
    student_passed.innerHTML = '';
    
    courseName.innerText = this.name + ' Passed Students';

    for (let i=0; i<this.passedList.length; i++) {
      const passed = this.passedList[i];

      const studentP = passed.createElement();
      student_passed.appendChild(studentP);  
    }
  }
}

class CourseList {
  constructor(container, form) {
    this.courses = [];
    this.form = form;
    this.container = container;

    this.addCourse = this.addCourse.bind(this);

    this.savebutton = document.getElementById('add_course_btn');
    this.savebutton.addEventListener('click', (e) =>this.addCourse(e));
  }

  addCourse(e) {
    e.preventDefault();

    const nameInput = document.getElementById('course_name');
    const pointScaleInput = document.getElementById('point_scale');

    const name = nameInput.value;
    const pointScale = pointScaleInput.value;

    if (pointScale != 7 && pointScale != 10 ) {
      alert("Point scale must be 7 or 10.")
    } else {
      if (name != '' && pointScale != '') {
        this.courses.push(new Course(name, pointScale));
      }
    }
    nameInput.value = '';
    pointScaleInput.value = '';

    console.log(this.courses);
    this.showCourses();
  }

  showCourses() {
    this.container.innerHTML = '';
    for (let i = 0; i < this.courses.length; i++) {
      const course = this.courses[i];
      const courseEl = course.getElement();
      this.container.appendChild(courseEl);
    }
  }
}

class AddCourse {
  constructor(form) {
  }
}




function main() {
  const pageElement = document.getElementById('page');
  const addCourseForm = document.getElementById("add_course");

  const courses = new CourseList(pageElement, addCourseForm);

  console.log(addCourseForm)

}

main();