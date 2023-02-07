
function NewClass() {
    return (
        <main>
            <div className="mb-5">
                <h5 className="text-white text-center"> Gerador De Turma</h5>
            </div>
            <section className="mt-5 d-flex justify-content-between">
                <div className="div_list__registry border ms-5 bg-light rounded">
                    <div className="text-center">
                        <b className="text-center mt-2">Alunos</b>
                    </div>
                    <hr />
                    <div>
                        {/* AQUI FICA OS ALUNOS */}
                    </div>
                </div>
                <div className="div_list__registry border me-5 bg-light rounded">
                    <div className="text-center">
                        <b className="text-center mt-2">Professores</b>
                    </div>
                    <hr />
                    <div>
                        {/* AQUI FICA OS PROFESSORES */}
                    </div>
                </div>
            </section>
            <form action="">
            </form>
        </main>
    )
}

export default NewClass