export class Teacher {
    constructor(fullName, cpf, matter, turma) {
        this.nome = fullName;
        this.cpf = cpf;
        this.materia = matter
        this.turma = turma || false
    }
}



