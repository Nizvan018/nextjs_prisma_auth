import Navbar from "../components/Navbar"

export default function RootLayout({ children }) {
    return (
        <div className="w-full">
            <Navbar />

            {children}
        </div>
    )
}
