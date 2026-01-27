
const TitleForm = () => {

    return (
        <div className="w-2/5 bg-gray-100 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300">
            <textarea
                name="title"
                placeholder="Titre de la discussion"
                rows={1}
                className="p-3 w-full rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-300  resize-none max-h-32"
            />
        </div>

    )
}

export default TitleForm;