export class ListCourses {
    
    courses_id                   : number;
    courses_name                 : string;
    courses_year                 : string;
    courses_from_date            : string;
    courses_to_date              : string;
    courses_day                  : string;
    }


export class AddCourses {
    
    course_batch                 : string;
    courses_name                 : string;
    courses_year                 : string;
    courses_from_date            : string;
    courses_to_date              : string;
    courses_day                  : string;

}    


export class AddLesson {
    
    course_id                : number;
    l_id                     : number;
    lesson_name              : string;
    date                     : string;
        
} 

export class AddALesson {
    
    //course_id                     : number;
    l_id                     : number;
    lesson_name              : string;
    //date                     : string;
        
} 

export class AddSelectedLesson {
    
    c_id                     : number;
    l_id                     : number;
    date                     : string;
    lesson_name              : string;    
} 

export class AddStudent {
    
    c_id                     : number;
    s_id                     : number;
    students_name            : string;
        
} 

export class UpdateLesson {
    c_id                     : number;
    l_id                     : number;
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

export class DeleteLId {
    //c_id: number;
    l_id: number;
    // lesson_name : string;
    // date : string ;
}

export class DeleteSId {
    c_id: number;
    id: number;
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

export class studentArray {
    c_id : number;
    s_id : number;
    students_name : any;
}