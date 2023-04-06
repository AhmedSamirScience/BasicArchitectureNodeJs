const students = [{name: 'Ali', dept:'PD',id:'1'},
                  {name: 'Ahmed', dept:'PS',id:'2'},
                  {name: 'Mohamed', dept:'PD',id:'3'},
                  {name: 'Omar', dept:'PS',id:'4'}];


module.exports=class Student {

    constructor({name: nm, dept: dept})
    {
        this.name = nm 
        this.dept = dept
        this.id = students.length +1 
    }

    saveStudent ()
    {
        students.push(this)
    }

    static fetchAllStudent()
    {
        return students
    }

    static getStudentById(id)
    {
        return students.find((val, idx,arr)=>{return val.id == id})
    }

    static getIfThereIsStudentWithSpecificId(id )
    {
        return students.findIndex((val => {return val.id== id}))
    }

    static deleteStudent(id)
    {
        students.splice(id, 1);
    }

    static updateStudentById(reqBody, idx)
    {
        let i = 0 
        for (i in reqBody)
        {
            students[idx][i]= reqBody[i]
        }
    }
}