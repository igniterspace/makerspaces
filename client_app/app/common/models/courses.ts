export class ListCourses {
    
    courses_id                   : number;
    courses_name                 : string;
    courses_year                 : string;
    courses_from_date            : string;
    courses_to_date              : string;
    courses_day                  : string;
    
    }

export class Course {
    
        id                   : number;
        batch                : string;
        name                 : string;
        year                 : string;
        from_date            : string;
        to_date              : string;
        day                  : string;
        
        }

export class CourseDetails {
    
    id       : number;
    itemName : string;
       
    }


export class Year {
    
         year   : string;
           
    }


export class CourseName {

        name   : string;
          
   }

export class AddCourses {

    courses_name                 : string;
    courses_year                 : string;
    courses_from_date            : string;
    courses_to_date              : string;
    courses_day                  : string;

    }    


export class AddLesson {
    
    lesson_name              : string;
    date                     : string;
        
    } 

export class ListLesson {
    
    lessons_id                : number;
    lessons_name              : string;
    lessons_date              : string;
        
    } 

export class ListStudent {
    
    courses_id                : number;
    students_id               : number;
    students_name             : string;
    courses_name              : string;
    } 