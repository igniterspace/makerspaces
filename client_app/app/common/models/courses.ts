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
    
    l_id                     : number;
    lesson_name              : string;
        
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
    l_id: number;
}

export class DeleteSId {
    c_id: number;
    id: number;
}

export class ListAllStudents {
    
    students_id             : number;
    students_name           : string;
    }

export class studentArray {
    c_id : number;
    s_id : number;
    students_name : any;
}