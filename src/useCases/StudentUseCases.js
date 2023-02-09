import { AxiosApi } from "../services/RequisitionAPI";
import { Student } from "../entities/Student";
import { registrationGenerator } from "../services/RegistrationGen"
export class StudentUseCases {

    static async StudentRegistration() {
        const registration = await registrationGenerator()
        const connection = await AxiosApi.Get(`/alunos?matricula=${registration}`)
        return connection.status == 200 ? connection.data.length != 0 ? this.StudentRegistration() : registration : "Falha Interna, tente novamente"

    }
    static async CreateStudent(fullName, cpf, birthday, registration) {
        const student = new Student(fullName, cpf, birthday, registration)
        const connection = await AxiosApi.Post('/alunos', student)
        return connection.status == 201 ? "Aluno Criado com sucesso!" : "Erro interno, Tente novamente mais tarde.(error code: 15L SUC)"
    }
    static async DeleteStudent(){

    }
}