export class ListCourses {
    
    courses_id                   : number;
    courses_name                 : string;
    courses_year                 : string;
    courses_from_date            : string;
    courses_to_date              : string;
    courses_day                  : string;
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

export class DeleteId {
    courses_id: number;
}

export class ListAllStudents {
    
    students_id             : number;
    students_name           : string;
    // students_last_name      : string;
    // students_date_of_birth  : string;
    // students_g_name         : string;
    // students_home_address   : string;
    // students_gender         : string;
    // g_id                    : any ;
    }