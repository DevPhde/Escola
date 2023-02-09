import { Teacher } from "../entities/Teacher"
import {AxiosApi} from "../services/RequisitionAPI"

export class TeacherUseCases {
    static async CreateTeacher(fullName, cpf, matter) {
        const teacher = new Teacher(fullName, cpf, matter)
        const connection = await AxiosApi.Post('/professores', teacher)
        return connection.status == 201 ? "Professor criado com sucesso!" : "Erro interno, Tente novamente mais tarde.(error code: 8L TUC)"
    }
    static async DeleteTeacher(id){
        const deleteInfos = await AxiosApi.Delete(id)
       return deleteInfos.status == 200 ? 'Cadastro Excluído' :'Erro interno, tente novamente mais tarde.(error code: 12L TUC)'
    }
}