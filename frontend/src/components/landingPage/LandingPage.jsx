import { CiSearch } from "react-icons/ci";
export default function LandingPage() {
    return (
        <>
            <div className="m-5">
                <div className="flex justify-between bg-green-950 text-white rounded">
                    <h2 className="text-xl ml-2">logo</h2>

                    <div className="flex   p-1 bg-green-950">
                    <input type="text" className="border-1 rounded-xl" />
                    <CiSearch size="30"/>
                    </div>

                    <div className="flex  bg-green-200 p-1 bg-green-950">
                    <h2>login</h2>
                    <img src="" alt="" className="ml-5 border-1 size-5 rounded-xl pt-5 mt-1" />
                    </div>
                </div>
            </div>
        </>
    )
}