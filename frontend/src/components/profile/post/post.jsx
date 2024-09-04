import { Suspense } from "react"
import { Link } from "react-router-dom"

export const PostMap = ({api}) => {
    return (
        <>
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 px-4">
            {api.rows?.map((r, index) =>
            {
                return (
                  <Suspense fallback={<p>Loading</p>} key={index}>
                    <Link to={`#/${r.postId}`} className="cursor-pointer text-color-dark dark:text-color-primary hover:text-color-accent transition-all">
                        <img src={r.ContentUrl} alt="..." width={350} height={350} className="w-full max-h-64 object-cover" />
                    </Link>
                  </Suspense>
                )
            })}
        </div>
        </>
    )
}