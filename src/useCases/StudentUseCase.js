import { AxiosApi } from "../services/RequisitionAPI";
import { User } from "../entities/User";
import { registrationGenerator } from "../services/RegistrationGen"
export class CreateStundentUseCase {

    static async StudentRegistration() {
        const registration = await registrationGenerator()
        const connection = await AxiosApi.Get(`/alunos?matricula=${registration}`)
        return connection.status == 200 ? connection.data.length != 0 ? this.StudentRegistration() : registration : "Falha Interna, tente novamente"

    }
    static async Create(fullName, cpf, birthday, registration) {
        const user = new User(fullName, cpf, birthday, registration)
        const connection = await AxiosApi.Post('/alunos', user)
        return connection.status == 201 ? "Aluno Criado com sucesso!" : "Erro interno, Tente novamente mais tarde."
    }
    static async 
}