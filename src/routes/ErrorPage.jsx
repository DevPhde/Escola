import notFound from "../assets/notFound.webp"
import Header from "../components/Header"
function ErrorPage() {
    return (
        <div>
            <Header />
            <div className="text-center mt-5">
                <img src={notFound} className="w-50 rounded"></img>
            </div>
        </div>
    )
}

export default ErrorPage