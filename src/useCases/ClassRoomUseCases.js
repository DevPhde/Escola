import { AxiosApi } from "../services/RequisitionAPI";
import { ClassRoom } from "../entities/ClassRoom";

export class ClassRoomUseCases {
    static async CreateClassRoom(classRoom, year, students, teacher) {
        const newClass = new ClassRoom(parseInt(classRoom), teacher, parseInt(year), students)
        const connection = await AxiosApi.Post('/turmas', newClass)
        return connection.status == 201 ? "200" : "Erro interno, tente novamente mais tarde.(error code: 13L CRUC)"
    }
    static async EditStudent(classRoom, students) {
        for (let index = 0; index < students.length; index++) {
            const element = students[index];
            element.turma = classRoom
            const data = await AxiosApi.Put(`/alunos/${element.id}`, element)
            if (data.status == 200) {
                continue
            } else {
                return "Erro interno, tente novamente mais tarde.(error code: 16L CRUC)"
            }
        }
        return "200"
    }

    static async EditTeacher(classRoom, teacher) {
        teacher.turma = classRoom
        const data = await AxiosApi.Put(`/professores/${teacher.id}`, teacher)
        return data.status == 200 ? "200" : "Erro interno, tenve novamente mais tarde.(error code: L25 CRUC)"
    }

    static async DeleteClassRoom(id) {
        const deleteInfos = await AxiosApi.Delete(id)
        return deleteInfos.status == 200 ? 'Cadastro Excluído' : 'Erro interno, tente novamente mais tarde.(error code: 33L CRUC)'
    }
}